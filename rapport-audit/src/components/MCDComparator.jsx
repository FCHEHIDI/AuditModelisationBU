import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function MCDComparator() {
  const [activeView, setActiveView] = useState('client');

  const mcdClient = `erDiagram
    LIVRE ||--|| EXEMPLAIRE : "possède"
    LIVRE ||--|| EDITEUR : "est publié par"
    LIVRE }|--o{ AUTEUR : "est écrit par"
    CATEGORIE }o--|| LIVRE : "appartient à"
    EXEMPLAIRE }o--o{ EMPLACEMENT : "est rangé dans"
    EXEMPLAIRE ||--|| EMPRUNT : "est concerné par"
    ETUDIANT }|--|{ EMPRUNT : "effectue"
    RESERVATION }|--|{ ETUDIANT : "fait"
    SANCTION ||--|| ETUDIANT : "reçoit"
    EMPRUNT ||--o{ BIBLIOTHECAIRE : "gère"

    LIVRE {
        string titre PK "❌ ERREUR"
        string resume
        date datePublication
        string langue
    }
    EDITEUR {
        string raisonSociale PK "❌ ERREUR"
        string adresse
    }
    AUTEUR {
        string nom PK "❌ ERREUR"
        string prenom
    }
    EXEMPLAIRE {
        date dateAcquisition "❌ Pas de PK"
        float prixAchat
        string etat
    }`;

  const mcdCorrige = `erDiagram
    LIVRE ||--o{ EXEMPLAIRE : "possède"
    LIVRE }o--|| EDITEUR : "est publié par"
    LIVRE }o--o{ AUTEUR : "ECRIRE"
    LIVRE }o--o{ CATEGORIE : "APPARTENIR"
    EXEMPLAIRE }o--|| EMPLACEMENT : "est rangé dans"
    EXEMPLAIRE ||--o{ EMPRUNT : "est concerné par"
    ETUDIANT ||--o{ EMPRUNT : "effectue"
    ETUDIANT ||--o{ RESERVATION : "fait"
    ETUDIANT ||--o{ SANCTION : "reçoit"
    BIBLIOTHECAIRE ||--o{ EMPRUNT : "gère"

    LIVRE {
        string ISBN PK "✅ Unique"
        string titre
        string resume
        date datePublication
        string langue
        int nbPages
        string codeEditeur FK
    }
    EDITEUR {
        string codeEditeur PK "✅ Stable"
        string raisonSociale
        string adresse
        string coordonnees
    }
    AUTEUR {
        string codeAuteur PK "✅ Stable"
        string nom
        string prenom
        string nationalite
    }
    EXEMPLAIRE {
        string codeBarres PK "✅ Unique"
        string ISBN FK
        string etat
        date dateAcquisition
        float prixAchat
        string codeRayon FK
    }
    EMPLACEMENT {
        string codeRayon PK
        int etage
        string section
    }
    ETUDIANT {
        string numEtudiant PK
        string nom
        string prenom
        string emailUniv
        string telephone
        string filiere
    }
    EMPRUNT {
        int numEmprunt PK
        string codeBarres FK
        string numEtudiant FK
        string matriculeBibliothecaire FK
        date dateEmprunt
        date dateRetourPrevue
        date dateRetourEffective "✅ Ajouté"
        float penalite
    }
    BIBLIOTHECAIRE {
        string matricule PK "✅ Stable"
        string nom
        string prenom
        string poste
    }
    RESERVATION {
        int numReservation PK
        string ISBN FK
        string numEtudiant FK
        date dateReservation
        date dateExpiration
    }
    SANCTION {
        int numSanction PK
        string numEtudiant FK
        date dateDebut
        date dateFin
        string motif
        float montant
    }
    CATEGORIE {
        string codeCategorie PK
        string libelle
        string description
    }
    ECRIRE {
        string ISBN FK
        string codeAuteur FK
    }
    APPARTENIR {
        string ISBN FK
        string codeCategorie FK
    }`;

  const erreurs = [
    {
      id: 'E1',
      entite: 'LIVRE',
      probleme: 'PK = titre',
      impact: 'Impossible d\'avoir 2 livres avec le même titre',
      correction: 'Utiliser ISBN comme PK',
      severite: 5
    },
    {
      id: 'E2',
      entite: 'EDITEUR',
      probleme: 'PK = raisonSociale',
      impact: 'Changement de nom = cascade complexe',
      correction: 'Utiliser codeEditeur comme PK',
      severite: 5
    },
    {
      id: 'E3',
      entite: 'AUTEUR',
      probleme: 'PK = nom',
      impact: 'Homonymes impossibles',
      correction: 'Utiliser codeAuteur comme PK',
      severite: 5
    },
    {
      id: 'E4',
      entite: 'BIBLIOTHECAIRE',
      probleme: 'PK = nom',
      impact: 'Homonymes impossibles',
      correction: 'Utiliser matricule comme PK',
      severite: 5
    },
    {
      id: 'E5',
      entite: 'EXEMPLAIRE',
      probleme: 'Pas de PK définie',
      impact: 'Impossible d\'identifier un exemplaire',
      correction: 'Ajouter codeBarres comme PK',
      severite: 5
    },
    {
      id: 'E6',
      relation: 'LIVRE-EXEMPLAIRE',
      probleme: 'Cardinalité 1:1',
      impact: 'Un livre ne peut avoir qu\'1 exemplaire !',
      correction: 'Changer en 1:n (un livre, plusieurs exemplaires)',
      severite: 5
    },
    {
      id: 'E7',
      relation: 'EXEMPLAIRE-EMPRUNT',
      probleme: 'Cardinalité 1:1',
      impact: 'Un exemplaire ne peut être emprunté qu\'une fois dans sa vie !',
      correction: 'Changer en 1:n (un exemplaire, plusieurs emprunts)',
      severite: 5
    },
    {
      id: 'E8',
      relation: 'ETUDIANT-SANCTION',
      probleme: 'Cardinalité 1:1',
      impact: 'Un étudiant ne peut avoir qu\'une sanction',
      correction: 'Changer en 1:n (un étudiant, plusieurs sanctions)',
      severite: 4
    },
    {
      id: 'E9',
      entite: 'EMPRUNT',
      probleme: 'Pas de dateRetourEffective',
      impact: 'Impossible de savoir si l\'emprunt est terminé',
      correction: 'Ajouter dateRetourEffective (nullable)',
      severite: 5
    },
    {
      id: 'E10',
      relation: 'LIVRE-AUTEUR',
      probleme: 'Relation non matérialisée',
      impact: 'Perte d\'informations sur la relation',
      correction: 'Créer table ECRIRE (ISBN, codeAuteur)',
      severite: 4
    },
    {
      id: 'E11',
      relation: 'LIVRE-CATEGORIE',
      probleme: 'Cardinalité inversée',
      impact: 'Une catégorie ne peut avoir qu\'un livre',
      correction: 'Créer table APPARTENIR (ISBN, codeCategorie)',
      severite: 4
    }
  ];

  return (
    <div className="space-y-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4 w-fit">
        <button
          onClick={() => setActiveView('client')}
          className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          style={{ 
            backgroundColor: 'transparent',
            border: activeView === 'client' ? '2px solid rgb(16, 185, 129)' : '1px solid rgba(229, 231, 235, 0.5)',
            boxShadow: activeView === 'client' ? '0 0 20px rgba(16, 185, 129, 0.4)' : '0 0 10px rgba(229, 231, 235, 0.2)',
            color: activeView === 'client' ? 'rgb(52, 211, 153)' : 'rgb(209, 213, 219)'
          }}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            MCD Client (Erroné)
          </div>
        </button>
        <button
          onClick={() => setActiveView('corrige')}
          className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          style={{ 
            backgroundColor: 'transparent',
            border: activeView === 'corrige' ? '2px solid rgb(16, 185, 129)' : '1px solid rgba(229, 231, 235, 0.5)',
            boxShadow: activeView === 'corrige' ? '0 0 20px rgba(16, 185, 129, 0.4)' : '0 0 10px rgba(229, 231, 235, 0.2)',
            color: activeView === 'corrige' ? 'rgb(52, 211, 153)' : 'rgb(209, 213, 219)'
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            MCD Corrigé
          </div>
        </button>
        <button
          onClick={() => setActiveView('comparaison')}
          className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          style={{ 
            backgroundColor: 'transparent',
            border: activeView === 'comparaison' ? '2px solid rgb(16, 185, 129)' : '1px solid rgba(229, 231, 235, 0.5)',
            boxShadow: activeView === 'comparaison' ? '0 0 20px rgba(16, 185, 129, 0.4)' : '0 0 10px rgba(229, 231, 235, 0.2)',
            color: activeView === 'comparaison' ? 'rgb(52, 211, 153)' : 'rgb(209, 213, 219)'
          }}
        >
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Comparaison
          </div>
        </button>
      </div>

      {/* Content */}
      {activeView === 'comparaison' ? (
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Catalogue des Corrections</h3>
          <div className="space-y-4">
            {erreurs.map((err) => (
              <div key={err.id} className="glass-effect rounded-xl p-4 border-l-4 border-ruby-500 hover:scale-[1.01] transition-transform">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-ruby-500 font-bold text-sm">{err.id}</span>
                    <h4 className="text-white font-bold text-lg">
                      {err.entite || err.relation}
                    </h4>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: err.severite }).map((_, i) => (
                      <span key={i} className="text-ruby-500">★</span>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-ruby-400 font-semibold mb-1">❌ Problème:</p>
                    <p className="text-platinum-300">{err.probleme}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 font-semibold mb-1">⚠️ Impact:</p>
                    <p className="text-platinum-300">{err.impact}</p>
                  </div>
                  <div>
                    <p className="text-emerald-500 font-semibold mb-1">✅ Correction:</p>
                    <p className="text-platinum-300">{err.correction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-effect rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            {activeView === 'client' ? (
              <>
                <AlertCircle className="w-6 h-6 text-ruby-500" />
                <h3 className="text-xl font-bold text-white">MCD Client - 11 erreurs critiques</h3>
              </>
            ) : (
              <>
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-white">MCD Corrigé - 100% conforme</h3>
              </>
            )}
          </div>
          
          <div className="bg-dark-100 rounded-xl p-6 overflow-auto">
            <pre className="text-sm text-platinum-300">
              <code>{activeView === 'client' ? mcdClient : mcdCorrige}</code>
            </pre>
          </div>
          
          {activeView === 'client' && (
            <div className="mt-4 p-4 bg-ruby-500/10 border border-ruby-500/30 rounded-lg">
              <p className="text-ruby-400 text-sm font-semibold">
                ⚠️ Ce modèle contient 11 erreurs critiques qui empêchent le système de fonctionner correctement.
              </p>
            </div>
          )}
          
          {activeView === 'corrige' && (
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-400 text-sm font-semibold">
                ✅ Ce modèle corrige toutes les erreurs et répond à 100% aux exigences du cahier des charges.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
