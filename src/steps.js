// Hier die sechs Schritte und ihre Beispielinhalte bearbeiten.
// Unterstützte Typen: intro, choice, tree, complete.
export const steps = [
  {
    id: 'start', type: 'intro', title: 'Willkommen',
    description: 'In sechs Schritten erkunden wir ein mögliches Web-Konzept. Alle Inhalte sind Platzhalter für die Research-Phase.',
    body: 'Klicke dich durch die Beispiele. Du kannst jederzeit zu einem anderen Schritt wechseln.'
  },
  {
    id: 'nutzungsversprechen', type: 'choice', title: 'Nutzungsversprechen',
    description: 'Welches dieser beispielhaften Angebote spricht dich am ehesten an?',
    options: [
      { id: 'verstehen', label: 'Verstehen, wie es mir geht' },
      { id: 'alltag', label: 'Anregungen für meinen Alltag finden' },
      { id: 'unterstuetzung', label: 'Passende Unterstützung entdecken' }
    ]
  },
  {
    id: 'einstieg', type: 'choice', title: 'Einstieg ins Angebot',
    description: 'Wo würdest du als Erstes klicken?',
    options: [
      { id: 'themen', label: 'Themen entdecken' },
      { id: 'situation', label: 'Meine Situation einordnen' },
      { id: 'hilfe', label: 'Unterstützung finden' }
    ]
  },
  {
    id: 'tree-testing', type: 'tree', title: 'Tree-Testing',
    description: 'Beispielaufgabe: Wo würdest du Informationen zu Beratungsangeboten suchen?',
    tree: [
      { id: 'wissen', label: 'Wissen', children: [
        { id: 'grundlagen', label: 'Grundlagen' },
        { id: 'belastungen', label: 'Belastungen im Alltag' }
      ] },
      { id: 'aktiv', label: 'Selbst aktiv werden', children: [
        { id: 'uebungen', label: 'Übungen' },
        { id: 'gewohnheiten', label: 'Gewohnheiten' }
      ] },
      { id: 'unterstuetzung', label: 'Unterstützung', children: [
        { id: 'beratung', label: 'Beratungsangebote' },
        { id: 'austausch', label: 'Austausch mit anderen' }
      ] }
    ]
  },
  {
    id: 'konzept', type: 'choice', title: 'Weiterführender Konzept-Test',
    description: 'Platzhalter für einen weiteren Click-Dummy: Welches Element würdest du öffnen?',
    options: [
      { id: 'ueberblick', label: 'Überblick ansehen' },
      { id: 'beispiel', label: 'Beispiel ausprobieren' },
      { id: 'details', label: 'Mehr erfahren' }
    ]
  },
  {
    id: 'abschluss', type: 'complete', title: 'Vielen Dank',
    description: 'Du hast das Ende des Beispiel-Prototyps erreicht.',
    body: 'Hier kann später der Abschluss der Research-Session stehen.'
  }
];
