# Research-Prototyp · Psychische Gesundheit

Statischer Click-Dummy mit sechs Schritten. Reines HTML, CSS und JavaScript, ohne Framework, externe Bibliotheken oder Backend. Sämtliche Inhalte sind Beispiele und noch kein abgestimmtes Research-Konzept.

## Lokal starten

Voraussetzung: Node.js 22 oder neuer. Eine Installation von Paketen ist nicht nötig.

```sh
npm run dev
```

Öffnen: http://localhost:5173. Änderungen an HTML, CSS, JavaScript und lokalen Assets laden die Seite automatisch neu. Dabei werden flüchtige Auswahlen zurückgesetzt. Automatisches Neuladen ist nur im Entwicklungsserver aktiv, nicht in der Vorschau oder auf GitHub Pages. Ein anderer Port lässt sich mit `PORT=5174 npm run dev` wählen.

## Aufbau

- `index.html`: gemeinsame Seitenstruktur
- `src/steps.js`: Reihenfolge, Texte, Auswahloptionen und Tree-Struktur aller sechs Schritte
- `src/app.js`: Darstellung, Navigation und flüchtige Auswahlzustände
- `src/styles.css`: minimale Grundformatierung
- `scripts/`: lokaler Server und Kopieren der statischen Dateien

Schritttypen: `intro`, `choice` (Einzelauswahl), `tree` (aufklappbare Navigation mit auswählbaren Endpunkten), `complete`. Neue Inhalte lassen sich in `src/steps.js` einsetzen. Jeder Schritt braucht eine eindeutige `id`.

## Navigation und Verhalten

Die Schritte sind über URL-Fragmente direkt erreichbar, zum Beispiel `/#tree-testing`. Vor/Zurück im Browser funktioniert ebenfalls. Die Weiter-Schaltfläche bleibt absichtlich immer verfügbar, damit moderierte Tests Schritte überspringen können.

Auswahlen bleiben während des Seitenbesuchs beim Schrittwechsel erhalten. Neuladen oder «Neu starten» setzt sie zurück. Es gibt keine Speicherung, Analyse, Richtig/Falsch-Bewertung, Ergebnisübermittlung oder Erfassung von Klickpfaden. Falls später Research-Daten gebraucht werden, müssen Erfassung und Einwilligung separat konzipiert werden.

## Statisch veröffentlichen

```sh
npm run build
npm run preview
```

Den Inhalt von `dist/` bei einem beliebigen statischen Hosting hochladen. Relative Asset-Pfade und Hash-Navigation funktionieren auch unter einem Unterverzeichnis, ohne serverseitige Routing-Regeln. Der lokale Server dient nur der Entwicklung. Hosting und Veröffentlichung sind noch nicht eingerichtet.

## Nächste Ausbauschritte

Die sechs Testaufgaben und Texte konkretisieren, danach das Web-Konzept und die Gestaltung ergänzen. Weitere Interaktionstypen können im Renderer in `src/app.js` hinzugefügt werden.
