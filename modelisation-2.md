# Modélisation - 2

:::info
Nous sommes consulté par une société de développeur pour avoir un second avis sur leur MCD par rapport à un projet. \n L'entreprise nous fourni le cahier des charges client ainsi que leur MCD et MLD. \n objectif: Corriger le MCD ou de MLD fourni.\n Pour chaque erreur : 

* Décrire son impact sur le fonctionnement du système
* Proposer une correction appropriée en justifiant votre choix
* Expliquer comment cette correction améliore/corrige le système

:::


# Cahier des charges client

thème: **==Système de Gestion d'une Bibliothèque Universitaire.==**

La bibliothèque universitaire souhaite mettre en place un système de gestion informatisé pour gérer son fonds documentaire, ses usagers et toutes les opérations quotidiennes.

Voici les règles de gestion à prendre en compte : 

## Gestion des Ouvrages : 

Un livre est identifié par son ISBN et caractérisé par son titre, son résumé, sa date de publication, sa langue et son nombre de pages. Chaque livre est publié par un unique éditeur, identifié par son code éditeur et possédant une raison sociale, une adresse et des coordonnées de contact. Un livre peut être écrit par plusieurs auteurs, et un auteur (identifié par un code auteur) peut avoir écrit plusieurs livres. Pour chaque auteur, on conserve son nom, son prénom et sa nationalité. 

## Gestion des Exemplaires : 

La bibliothèque peut posséder plusieurs exemplaires d'un même livre. Chaque exemplaire est identifié par un code-barres unique et caractérisé par son état (neuf, bon, usé, à réparer), sa date d'acquisition et son prix d'achat. Les exemplaires sont rangés dans des emplacements physiques identifiés par un code rayon, avec indication de l'étage et de la section. Un emplacement peut contenir plusieurs exemplaires, et un exemplaire ne peut être qu'à un seul emplacement à la fois. 

## Gestion des Usagers : 

Les étudiants sont les principaux usagers de la bibliothèque. Chaque étudiant est identifié par son numéro étudiant et caractérisé par son nom, prénom, adresse email universitaire, numéro de téléphone et filière d'études. Un étudiant peut emprunter jusqu'à 5 documents simultanément pour une durée maximale de 3 semaines. 

## Gestion des Emprunts : 

Chaque emprunt est identifié par un numéro unique et concerne un exemplaire spécifique emprunté par un étudiant à une date donnée, pour une date de retour prévue. L'emprunt est géré par un bibliothécaire (identifié par son matricule, avec nom, prénom et poste). La date de retour effective est enregistrée lors du retour. En cas de retard, une pénalité est appliquée. 

## Gestion des Réservations : 

Un étudiant peut réserver un livre s'il n'y a plus d'exemplaires disponibles. La réservation est identifiée par un numéro unique et comporte une date de réservation et une date d'expiration (48h après la disponibilité de l'exemplaire). Un étudiant ne peut pas réserver un livre s'il en a déjà un exemplaire emprunté ou s'il a atteint le quota de réservations (3 maximum).

## Gestion des Sanctions : 

Les retards répétés ou les dégradations d'ouvrages entraînent des sanctions. Une sanction est identifiée par un numéro unique et comporte une date de début, une date de fin, un motif et éventuellement un montant à payer. Un étudiant sous le coup d'une sanction ne peut pas emprunter de documents tant que la sanction n'est pas levée. 

## Suivi Historique : 

Le système doit conserver un historique complet des emprunts et des sanctions pour chaque étudiant. Ces données servent à produire des statistiques sur l'utilisation de la bibliothèque et à évaluer la fiabilité des étudiants.

## Classification des Ouvrages : 

Chaque livre appartient à une ou plusieurs catégories (Roman, Manuel, Thèse, etc.). Une catégorie est identifiée par un code unique et possède un libellé et une description. Cette classification permet d'organiser les ouvrages et de faciliter les recherches.


On souhaite pouvoir répondre aux questions suivantes :

* Quels sont les livres disponibles à l'emprunt ?
* Quels sont les emprunts en retard ?
* Quels sont les étudiants actuellement sous le coup d'une sanction ?
* Quel est l'historique des emprunts d'un étudiant donné ?
* Quels sont les ouvrages les plus empruntés ?
* Combien d'exemplaires sont disponibles pour un livre donné ?


---

# MCD


```mermaidjs
erDiagram
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
        string titre PK
        string resume
        date datePublication
        string langue
    }

    EDITEUR {
        string raisonSociale PK
        string adresse
    }

    AUTEUR {
        string nom PK
        string prenom
        string nationalite
    }

    EXEMPLAIRE {
        date dateAcquisition
        float prixAchat
        string etat
    }

    EMPLACEMENT {
        string section PK
        int etage
    }

    ETUDIANT {
        string nom
        string prenom
        string emailUniv
        string telephone
    }

    EMPRUNT {
        date dateEmprunt
        date dateRetourPrevue
        float penalite
    }

    BIBLIOTHECAIRE {
        string nom PK
        string prenom
        string poste
    }

    RESERVATION {
        date dateReservation
    }

    SANCTION {
        string motif
        float montant
    }

    CATEGORIE {
        string libelle
        string description
    }
```

```mermaidjs
erDiagram
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
        string titre PK
        string resume
        date datePublication
        string langue
    }

    EDITEUR {
        string raisonSociale PK
        string adresse
    }

    AUTEUR {
        string nom PK
        string prenom
        string nationalite
    }

    EXEMPLAIRE {
        date dateAcquisition
        float prixAchat
        string etat
    }

    EMPLACEMENT {
        string section PK
        int etage
    }

    ETUDIANT {
        string nom
        string prenom
        string emailUniv
        string telephone
    }

    EMPRUNT {
        date dateEmprunt
        date dateRetourPrevue
        float penalite
    }

    BIBLIOTHECAIRE {
        string nom PK
        string prenom
        string poste
    }

    RESERVATION {
        date dateReservation
    }

    SANCTION {
        string motif
        float montant
    }

    CATEGORIE {
        string libelle
        string description
    }
```

# MLD

```mermaidjs
erDiagram
    BOOK ||--|| COPY : "has"
    BOOK }|--|| PUBLISHER : "published by"
    BOOK }o--o{ AUTHOR : "written by"
    COPY }o--o{ LOCATION : "stored in"
    COPY_LOCATION }o--|| COPY : "links"
    COPY_LOCATION }o--|| LOCATION : "links"
    LOAN }|--|| COPY : "involves"
    LOAN }o--o{ LIBRARIAN : "managed by"
    STUDENT }|--|{ LOAN : "makes"
    STUDENT }|--|{ RESERVATION : "places"
    PENALTY ||--|| STUDENT : "receives"

    BOOK {
        string title PK
        string summary
        date publicationDate
        string language
        string publisherName FK
    }

    PUBLISHER {
        string name PK
        string address
    }

    AUTHOR {
        string lastName PK
        string firstName
        string nationality
    }

    COPY {
        date acquisitionDate
        float purchasePrice
        string condition
        string bookTitle FK
    }
    COPY_LOCATION {
        date placementDate PK
        string copyAcquisitionDate FK
        string locationSection FK
    }

    LOCATION {
        string section PK
        int floor
    }

    LOAN {
        date loanDate
        date dueDate
        float lateFee
        string studentEmail FK
        string copyAcquisitionDate FK
        string librarianLastName FK
    }

    STUDENT {
        string universityEmail
        string lastName
        string firstName
        string phone
    }

    LIBRARIAN {
        string lastName PK
        string firstName
        string position
    }

    RESERVATION {
        date reservationDate
        string bookTitle FK
        string studentEmail FK
    }

    PENALTY {
        string reason
        float amount
        string studentEmail FK
    }
```


```mermaidjs
erDiagram
    BOOK ||--|| COPY : "has"
    BOOK }|--|| PUBLISHER : "published by"
    BOOK }o--o{ AUTHOR : "written by"
    COPY }o--o{ LOCATION : "stored in"
    COPY_LOCATION }o--|| COPY : "links"
    COPY_LOCATION }o--|| LOCATION : "links"
    LOAN }|--|| COPY : "involves"
    LOAN }o--o{ LIBRARIAN : "managed by"
    STUDENT }|--|{ LOAN : "makes"
    STUDENT }|--|{ RESERVATION : "places"
    PENALTY ||--|| STUDENT : "receives"

    BOOK {
        string title PK
        string summary
        date publicationDate
        string language
        string publisherName FK
    }

    PUBLISHER {
        string name PK
        string address
    }

    AUTHOR {
        string lastName PK
        string firstName
        string nationality
    }

    COPY {
        date acquisitionDate
        float purchasePrice
        string condition
        string bookTitle FK
    }
    COPY_LOCATION {
        date placementDate PK
        string copyAcquisitionDate FK
        string locationSection FK
    }

    LOCATION {
        string section PK
        int floor
    }

    LOAN {
        date loanDate
        date dueDate
        float lateFee
        string studentEmail FK
        string copyAcquisitionDate FK
        string librarianLastName FK
    }

    STUDENT {
        string universityEmail
        string lastName
        string firstName
        string phone
    }

    LIBRARIAN {
        string lastName PK
        string firstName
        string position
    }

    RESERVATION {
        date reservationDate
        string bookTitle FK
        string studentEmail FK
    }

    PENALTY {
        string reason
        float amount
        string studentEmail FK
    }
```