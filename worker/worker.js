/* Révise+ V4.1 — Worker Cloudflare (passerelle IA)
   La clé API n'est JAMAIS dans l'application Android : elle reste côté Cloudflare.

   Déploiement (parent, une seule fois) :
   1. Compte gratuit sur cloudflare.com -> Workers & Pages.
   2. Créer un Worker (par ex. reviseplus-tutor) et coller ce code.
   3. Settings -> Variables -> AI_KEY (type "Secret") = clé API Mistral.
   4. Déployer, copier l'URL du worker.
   5. Dans l'application : Plus -> Réglages -> coller l'URL. */

const SYSTEM_PROMPT = 'Tu es un tuteur scolaire bienveillant pour un collégien français (5e, 4e ou 3e). ' +
  'Tu réponds uniquement aux questions de cours et de méthodes scolaires (français, maths, histoire-géo, SVT, physique-chimie, anglais). ' +
  'Si la question sort de ce cadre, refuse poliment en une phrase et propose de revenir aux révisions. ' +
  'Explique simplement, avec un exemple concret, puis propose un petit exercice. Reste concis (moins de 200 mots). ' +
  'Ne demande jamais d\u2019informations personnelles. Ton encourageant et positif.';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors() });
    }
    if (request.method !== 'POST') {
      return json({ error: 'POST uniquement' }, 405);
    }
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'JSON invalide' }, 400); }
    const question = (body.question || '').toString().slice(0, 1000);
    const isLesson = body.action === 'lesson';
    const grade = ['5e','4e','3e'].includes(body.niveau) ? body.niveau : '4e';
    const subject = (body.matiere || 'matière scolaire').toString().slice(0, 80);
    if (!question) return json({ error: 'question manquante' }, 400);

    const key = (typeof AI_KEY !== 'undefined') ? AI_KEY : '';
    if (!key) return json({ error: 'AI_KEY non configuré sur le worker' }, 500);

    try {
      const r = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: [
            { role: 'system', content: isLesson ? 'Tu es concepteur pédagogique pour le collège français. Produis un cours fiable, progressif et adapté à la classe demandée. Réponds UNIQUEMENT avec un objet JSON valide, sans Markdown, sans texte avant ou après. Le JSON doit contenir titre (string), express (HTML simple avec 3 à 5 balises li), complet (HTML avec 3 à 5 sections h3 et paragraphes), quiz (tableau de 4 objets {q, choix: [3 réponses], bon: index 0-2, exp}), vf (tableau de 2 objets {q, v: bool, exp}). Ne prétends pas qu’une notion est au programme officiel si tu n’en es pas sûr ; indique les limites dans le cours.' : SYSTEM_PROMPT },
            { role: 'user', content: isLesson ? 'Crée une fiche de cours complète sur : '+question+'. Classe : '+grade+'. Matière : '+subject+'. Niveau collège français. Inclure définitions, méthode, exemples et erreurs fréquentes.' : question }
          ],
          max_tokens: isLesson ? 1800 : 400,
          temperature: 0.4
        })
      });
      const d = await r.json();
      const answer = d.choices && d.choices[0] && d.choices[0].message
        ? d.choices[0].message.content : null;
      if (!answer) return json({ error: 'réponse IA vide' }, 502);
      if (isLesson) {
        try {
          const clean = answer.replace(/^```(?:json)?\\s*/i, '').replace(/\\s*```$/, '');
          const lesson = JSON.parse(clean);
          if (!lesson.titre || !lesson.complet || !Array.isArray(lesson.quiz)) throw new Error('structure incomplète');
          return json({ lesson: lesson });
        } catch (e) { return json({ error: 'La fiche générée n’a pas le format attendu. Réessaie avec une demande plus précise.' }, 502); }
      }
      return json({ answer: answer });
    } catch (e) {
      return json({ error: 'service IA injoignable' }, 502);
    }
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, cors())
  });
}
