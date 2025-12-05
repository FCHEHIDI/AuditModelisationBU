export const auditData = {
  stats: [
    { label: 'Erreurs Critiques', value: '11', icon: 'AlertCircle', color: 'ruby', trend: '-100%' },
    { label: 'Erreurs Majeures', value: '7', icon: 'AlertTriangle', color: 'orange', trend: '-100%' },
    { label: 'Conformité CDC', value: '42%', icon: 'Target', color: 'yellow', target: '100%' },
    { label: 'Requêtes Validées', value: '0/6', icon: 'CheckCircle', color: 'ruby', target: '6/6' }
  ],

  erreursCritiques: [
    {
      id: 'E1',
      titre: 'Clé Primaire LIVRE = titre',
      impact: 'Impossible d\'avoir deux livres avec le même titre',
      severite: 5,
      correction: 'Utiliser ISBN comme PK'
    },
    {
      id: 'E2',
      titre: 'Clé Primaire EDITEUR = raisonSociale',
      impact: 'Changements de raison sociale = cascade complexe',
      severite: 5,
      correction: 'Utiliser code_editeur comme PK'
    },
    {
      id: 'E6',
      titre: 'Cardinalité LIVRE ||--|| EXEMPLAIRE (1:1)',
      impact: 'Un livre ne peut avoir qu\'un seul exemplaire',
      severite: 5,
      correction: 'LIVRE ||--o{ EXEMPLAIRE (1:n)'
    },
    {
      id: 'E7',
      titre: 'Cardinalité EXEMPLAIRE ||--|| EMPRUNT (1:1)',
      impact: 'Un exemplaire ne peut être emprunté qu\'une fois',
      severite: 5,
      correction: 'EXEMPLAIRE ||--o{ EMPRUNT (1:n)'
    },
    {
      id: 'E5',
      titre: 'EMPRUNT sans date_retour_effective',
      impact: 'Impossible de distinguer emprunts en cours/terminés',
      severite: 5,
      correction: 'Ajouter dateRetourEffective (nullable)'
    }
  ],

  conformiteData: [
    { critere: 'Clés primaires', client: 0, corrige: 11, max: 11 },
    { critere: 'Cardinalités', client: 0, corrige: 8, max: 8 },
    { critere: 'Attributs', client: 37, corrige: 52, max: 52 },
    { critere: 'Relations', client: 5, corrige: 10, max: 10 },
    { critere: 'Requêtes', client: 0, corrige: 6, max: 6 }
  ],

  planAction: [
    {
      phase: 'Phase 1: Correction MCD',
      duree: '2-3 jours',
      priorite: 'critique',
      taches: [
        'Corriger toutes les clés primaires',
        'Ajuster les cardinalités critiques',
        'Ajouter attributs manquants essentiels'
      ]
    },
    {
      phase: 'Phase 2: Implémentation BD',
      duree: '3-4 jours',
      priorite: 'haute',
      taches: [
        'Créer les tables avec bonnes PK',
        'Ajouter contraintes d\'intégrité',
        'Implémenter triggers métier'
      ]
    },
    {
      phase: 'Phase 3: Migration données',
      duree: '2 jours',
      priorite: 'haute',
      taches: [
        'Extraire données existantes',
        'Transformer vers nouveau schéma',
        'Valider l\'intégrité'
      ]
    },
    {
      phase: 'Phase 4: Code applicatif',
      duree: '5-7 jours',
      priorite: 'moyenne',
      taches: [
        'Adapter les requêtes SQL',
        'Mettre à jour les API',
        'Tester les interfaces'
      ]
    },
    {
      phase: 'Phase 5: Tests',
      duree: '3-4 jours',
      priorite: 'moyenne',
      taches: [
        'Tests unitaires',
        'Tests d\'intégration',
        'Tests de performance'
      ]
    },
    {
      phase: 'Phase 6: Documentation',
      duree: '2 jours',
      priorite: 'moyenne',
      taches: [
        'Documentation technique',
        'Guide utilisateur',
        'Formation équipe'
      ]
    }
  ],

  sqlImplementation: {
    tables: 13,
    contraintes: 35,
    triggers: 6,
    vues: 4,
    procedures: 2
  }
};
