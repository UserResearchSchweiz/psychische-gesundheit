// Hier die sechs Schritte und ihre Beispielinhalte bearbeiten.
// Unterstützte Typen: intro, promises, choice, tree, complete.
export const steps = [
  {
    id: 'start', type: 'promises', title: 'Versprechen',
    variants: [
      { title: 'Stärke deine psychische Gesundheit', subtitle: 'Entdecke einfache Tipps, die dir im Alltag guttun.' },
      { title: 'Zwischendurch die Psyche stärken?', subtitle: 'Hier findest du kleine Impulse, die du direkt ausprobieren kannst.' },
      { title: 'Tu deiner psychischen Gesundheit etwas Gutes', subtitle: 'Finde heraus, was dich stärkt und wo du Unterstützung bekommst.' }
    ]
  },
  {
    id: 'nutzungsversprechen', type: 'entry', title: 'Einstieg',
    variants: [
    {
        "title": "Psychische Gesundheit stärken:",
        "subtitle": "",
        "cards": [
            {
                "id": "jung",
                "title": "Jugendliche und junge Erwachsene",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Schule und Ausbildung",
                    "Freundschaften und Beziehungen",
                    "Meinen eigenen Weg finden"
                ]
            },
            {
                "id": "erwachsen",
                "title": "Erwachsene",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Alltag und Beruf",
                    "Beziehungen und Familie",
                    "Zeit für mich"
                ]
            },
            {
                "id": "aelter",
                "title": "Menschen ab 65",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Übergang in die Pensionierung",
                    "Kontakte und Begegnungen",
                    "Den Alltag gestalten"
                ]
            },
            {
                "id": "eltern",
                "title": "Eltern",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Mit meinem Kind sprechen",
                    "Belastungen wahrnehmen",
                    "Unterstützung kennenlernen"
                ]
            },
            {
                "id": "angehoerige",
                "title": "Angehörige und Bekannte",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Ein Gespräch beginnen",
                    "Für jemanden da sein",
                    "Eigene Grenzen wahrnehmen"
                ]
            },
            {
                "id": "fachpersonen",
                "title": "Fachpersonen",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Wissen vermitteln",
                    "Gespräche ermöglichen",
                    "Materialien entdecken"
                ]
            },
            {
                "id": "gemeinden",
                "title": "Gemeinden",
                "detail": "Was interessiert dich in dieser Rolle?",
                "items": [
                    "Begegnungen ermöglichen",
                    "Lokale Angebote sichtbar machen",
                    "Aktionen und Veranstaltungen"
                ]
            }
        ],
        "compact": true
    },
    {
        "title": "Psychische Gesundheit stärken:",
        "subtitle": "",
        "cards": [
            {
                "id": "gut",
                "title": "Psychisch gesund bleiben",
                "detail": "Was möchtest du für dich tun?",
                "items": [
                    "Stärkende Gewohnheiten entdecken",
                    "Beziehungen pflegen",
                    "Neues ausprobieren"
                ],
                "group": "mich"
            },
            {
                "id": "belastet",
                "title": "Sorgen und Unsicherheit besser einordnen",
                "detail": "Was könnte dir jetzt helfen?",
                "items": [
                    "Meine Situation einordnen",
                    "Mit jemandem darüber sprechen",
                    "Beratung kennenlernen"
                ],
                "group": "mich"
            },
            {
                "id": "hilfe",
                "group": "mich",
                "title": "Bei Belastung Unterstützung finden",
                "detail": "Was könnte ein nächster Schritt sein?",
                "items": [
                    "Mit einer vertrauten Person sprechen",
                    "Beratungsangebote kennenlernen",
                    "Unterstützung vor Ort finden"
                ]
            },
            {
                "id": "sorge",
                "title": "Jemandem helfen, um den ich mich sorge",
                "detail": "Wo möchtest du ansetzen?",
                "items": [
                    "Passende Worte finden",
                    "Für jemanden da sein",
                    "Unterstützung finden"
                ],
                "group": "jemanden"
            },
            {
                "id": "bewirken",
                "group": "arbeit",
                "title": "Psychische Gesundheit bei der Arbeit stärken",
                "detail": "Wo möchtest du etwas bewirken?",
                "items": [
                    "Gespräche im Arbeitsumfeld ermöglichen",
                    "Mitarbeitende und Teams unterstützen",
                    "Wissen zur psychischen Gesundheit vermitteln"
                ]
            }
        ],
        "groups": [
            {
                "id": "mich",
                "title": "Für mich"
            },
            {
                "id": "jemanden",
                "title": "Für jemanden"
            },
            {
                "id": "arbeit",
                "title": "Für meine Arbeit"
            }
        ]
    },
    {
        "title": "Psychische Gesundheit stärken:",
        "subtitle": "",
        "cards": [
            {
                "id": "gesund",
                "title": "Psychisch gesund bleiben",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "Stärkende Gewohnheiten entdecken",
                    "Erholung im Alltag",
                    "Selbstwert stärken"
                ]
            },
            {
                "id": "verstehen",
                "title": "Gefühle und Belastungen verstehen",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "Gefühle wahrnehmen",
                    "Belastungen einordnen",
                    "Die Situation anderer verstehen"
                ]
            },
            {
                "id": "gespraeche",
                "title": "Gespräche führen und Beziehungen stärken",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "Über Gefühle sprechen",
                    "Zuhören und nachfragen",
                    "Kontakte pflegen"
                ]
            },
            {
                "id": "hilfe",
                "title": "Hilfe und Unterstützung finden",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "Beratung vor Ort",
                    "Online-Beratung",
                    "Austausch mit anderen"
                ]
            },
            {
                "id": "begleiten",
                "title": "Andere begleiten und unterstützen",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "Als Angehörige unterstützen",
                    "Menschen professionell begleiten",
                    "Mitarbeitende unterstützen"
                ]
            },
            {
                "id": "institutionen",
                "title": "Psychische Gesundheit institutionell fördern",
                "detail": "Was interessiert dich zu diesem Thema?",
                "items": [
                    "In Schulen und Betrieben",
                    "In Sozial- und Gesundheitsorganisationen",
                    "In Gemeinden"
                ]
            }
        ],
        "compact": true
    }
]
  },
  {
    id: 'einstieg', type: 'selfcheck', title: 'Selbstcheck',
    questions: [
      'Wie oft hast du dich nervös gefühlt?',
      'Wie häufig warst du so niedergeschlagen, dass dich kaum etwas aufmuntern konnte?',
      'Wie häufig hast du dich ruhig und gelassen gefühlt?',
      'Wie häufig warst du traurig oder bedrückt?',
      'Wie häufig hast du dich glücklich gefühlt?'
    ],
    options: ['Immer', 'Meistens', 'Manchmal', 'Selten', 'Nie']
  },
  {
    id: 'tree-testing', type: 'tree', title: 'Frage Antwort',
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
    id: 'konzept', type: 'choice', title: 'Website',
    description: 'Platzhalter für einen weiteren Click-Dummy: Welches Element würdest du öffnen?',
    options: [
      { id: 'ueberblick', label: 'Überblick ansehen' },
      { id: 'beispiel', label: 'Beispiel ausprobieren' },
      { id: 'details', label: 'Mehr erfahren' }
    ]
  },
  {
    id: 'abschluss', type: 'complete', title: 'Angebote',
    description: 'Du hast das Ende des Beispiel-Prototyps erreicht.',
    body: 'Hier kann später der Abschluss der Research-Session stehen.'
  }
];
