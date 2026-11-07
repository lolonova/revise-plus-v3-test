package fr.reviseplus.app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;\nimport org.json.JSONObject;
import java.util.Set;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private TextToSpeech tts;
    private ValueCallback<Uri[]> filePathCallback;

    private static final int REQ_FILE = 7001;
    private static final int REQ_MIC = 7002;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                configureFrenchSpeech();
            }
        });

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        webView.addJavascriptInterface(new NativeBridge(), "NativeBridge");
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(android.webkit.ConsoleMessage message) {
                final String detail = message.message() + " (ligne " + message.lineNumber()
                        + ", " + message.sourceId() + ")";
                runOnUiThread(() -> webView.evaluateJavascript(
                        "(function(){var d=document.getElementById('rp-native-diagnostic');"
                        + "if(!d){d=document.createElement('div');d.id='rp-native-diagnostic';"
                        + "d.style.cssText='position:fixed;z-index:1000000;left:10px;right:10px;bottom:10px;"
                        + "max-height:42vh;overflow:auto;padding:14px;border-radius:14px;"
                        + "background:#211b35;color:#fff;font:13px/1.45 sans-serif;white-space:pre-wrap';"
                        + "document.body.appendChild(d);}"
                        + "d.textContent='DIAGNOSTIC WEBVIEW\\n'+"
                        + JSONObject.quote(detail) + ";})()", null));
                return true;
            }

            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                             FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = callback;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("image/*");
                i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                startActivityForResult(Intent.createChooser(i, "Choisir une photo de cours"), REQ_FILE);
                return true;
            }
        });
        webView.loadUrl("file:///android_asset/index.html");
        requestMic();
    }

    private void configureFrenchSpeech() {
        if (tts == null) return;
        tts.setLanguage(Locale.FRANCE);
        try {
            Set<Voice> voices = tts.getVoices();
            Voice best = null;
            int bestScore = Integer.MIN_VALUE;
            if (voices != null) {
                for (Voice voice : voices) {
                    Locale locale = voice.getLocale();
                    if (locale == null || !"fr".equalsIgnoreCase(locale.getLanguage())) continue;
                    int score = voice.getQuality() * 10 - voice.getLatency();
                    if (Locale.FRANCE.equals(locale)) score += 1000;
                    if (!voice.isNetworkConnectionRequired()) score += 20;
                    if (score > bestScore) { bestScore = score; best = voice; }
                }
            }
            if (best != null) tts.setVoice(best);
        } catch (Exception ignored) {
            tts.setLanguage(Locale.FRANCE);
        }
        // Un rythme plus posé, avec une intonation douce pour les explications.
        tts.setSpeechRate(0.84f);
        tts.setPitch(1.02f);
    }

    private void requestMic() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.RECORD_AUDIO}, REQ_MIC);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == REQ_FILE && filePathCallback != null) {
            List<Uri> uris = new ArrayList<>();
            if (resultCode == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    for (int i = 0; i < data.getClipData().getItemCount(); i++) {
                        uris.add(data.getClipData().getItemAt(i).getUri());
                    }
                } else if (data.getData() != null) {
                    uris.add(data.getData());
                }
            }
            filePathCallback.onReceiveValue(uris.toArray(new Uri[0]));
            filePathCallback = null;
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public void onBackPressed() {
        if (webView == null) { super.onBackPressed(); return; }
        webView.evaluateJavascript(
                "(function(){return (window.App && App.handleBack) ? App.handleBack() : false;})()",
                value -> {
                    if (!"true".equals(value)) {
                        MainActivity.super.onBackPressed();
                    }
                });
    }

    @Override
    protected void onDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); }
        super.onDestroy();
    }

    private class NativeBridge {
        @JavascriptInterface
        public void speak(String text) {
            if (tts != null) {
                tts.setSpeechRate(0.84f);
                tts.setPitch(1.02f);
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "reviseplus-fiche");
            }
        }

        @JavascriptInterface
        public void stopSpeak() {
            if (tts != null) tts.stop();
        }
    }
}
