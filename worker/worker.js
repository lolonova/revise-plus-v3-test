/* Révise+ V4 — Worker Cloudflare (passerelle IA)
   Rôle : recevoir la question de l'application, l'envoyer à un service IA
   (exemple : l'API Mistral) avec la clé secrète stockée côté Cloudflare,
   et renvoyer la réponse. La clé API n'est JAMAIS dans l'application Android.

   Déploiement (à faire par un parent, une seule fois) :
   1. Créer un compte gratuit sur cloudflare.com -> Workers & Pages.
   2. Créer un Worker (par ex. reviseplus-tutor) et coller ce code.
   3. Ajouter un secret AI_KEY : via le tableau de bord (Settings -> Variables
      -> AI_KEY, type "Secret") ou avec: wrangler secret put AI_KEY
   4. Déployer, puis copier l'URL du worker (https://reviseplus-tutor.compte.workers.dev).
   5. Dans l'application Révise+ : Réglages -> coller cette URL dans le champ tuteur.

   Coûts : Mistral propose un niveau gratuit limité ; au-delà, le tarif dépend de
   l'usage (ordre de quelques centimes pour des milliers de questions).

   Protection des mineurs : le prompt système restreint le tuteur aux questions
   scolaires uniquement, sans données personnelles. */

const SYSTEM_PROMPT = 'Tu es un tuteur scolaire bienveillant pour un élève français de 6e à Terminale. ' +
  'Tu réponds uniquement aux questions de cours et de méthodes scolaires (français, maths, histoire-géo, sciences, langues, philosophie). ' +
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
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: question }
          ],
          max_tokens: 400,
          temperature: 0.4
        })
      });
      const d = await r.json();
      const answer = d.choices && d.choices[0] && d.choices[0].message
        ? d.choices[0].message.content : null;
      if (!answer) return json({ error: 'réponse IA vide' }, 502);
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
