# Genshin Paimoff

![Build Status](https://github.com/Junizfr/genshin-paimoff/actions/workflows/ci.yml/badge.svg)

> **Genshin Paimoff** is a full-stack web application for managing Genshin Impact data (characters, weapons, materials) with a Express REST API backend and a vanilla JavaScript frontend.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black) ![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)

# Table of contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tasks](#tasks)

## Getting Started

To start this project locally :

1. **Clone the repository**

```bash
git clone git@github.com:Junizfr/genshin-downloader.git
cd genshin-downloader
```

2. Install dependencies

We use Yarn :

```bash
yarn install
```

3. Start the project

To start in development mode :

```bash
yarn start
```

## Project Structure

    ```
    genshin-paimoff/
    ├── frontend/
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── pages/
    │   │   │   ├── login.html
    │   │   │   ├── register.html
    │   │   │   ├── me.html
    │   │   │   └── ...
    │   │   ├── css/
    │   │   │   └── styles.css
    │   │   ├── js/
    │   │   │   ├── main.js
    │   │   │   ├── api.js             # Pour les appels à l'API backend
    │   │   │   └── ...
    │   │   └── assets/
    │   │       ├── images/
    │   │       ├── fonts/
    │   │       └── ...
    │   ├── server.js                  # Serveur pour fichiers statiques
    │   └── package.json
    ├── backend/
    │   │   ├── src/
    │   │   │   ├── models/            # Personnages, objets, donjons
    │   │   │   ├── repositories/      # Accès aux données
    │   │   │   ├── services/          # Logique métier
    │   │   │   ├── controllers/       # Gestion des requêtes
    │   │   │   └── middlewares/       # Sécurité, authentification
    │   │   ├── server.js              # Serveur Express
    │   │   ├── routes.js              # Endpoints API
    │   └── package.json
    ├── docs/
    │   ├── mcd.jpg                    # MCD Draw.io
    │   └── mld.jpg                    # MLD DBDiagram
    └── README.md                      # Documentation
    ```

## Tasks

| Nom             | Statut                                                |
| --------------- | ----------------------------------------------------- |
| **Completed**   | ![Done](https://img.shields.io/badge/DONE-green.svg)  |
| **Not started** | ![Todo](https://img.shields.io/badge/TODO-red.svg)    |
| **Pending**     | ![Todo](https://img.shields.io/badge/TODO-orange.svg) |

## ![Todo](https://img.shields.io/badge/TODO-red.svg) Frontend

- Serveur Node.js natif qui sert des fichiers statiques (HTML, CSS, JS)
- Interface utilisateur en HTML et JavaScript vanilla (sans framework)
- Communication avec l'API backend via Fetch API

## ![Todo](https://img.shields.io/badge/TODO-red.svg) Backend

- API REST avec une architecture en couches:
  - Models: définition des entités de la base de données
  - Repositories: accès aux données
  - Services: logique métier
  - Controllers: gestion des requêtes
  - Routes: définition des endpoints

## ![Todo](https://img.shields.io/badge/TODO-red.svg) Base de données

- Base de données relationnelle avec:
  - Relations entre tables
  - Requêtes avec INNER JOIN
  - Utilisation de clés étrangères (FOREIGN KEY)
  - Au moins une relation many-to-many avec clé composite

## ![Done](https://img.shields.io/badge/DONE-green.svg) Sécurité

- Authentification simple
- Hachage des mots de passe
- Protection contre les injections HTML et JavaScript (XSS, CSRF)

## Instructions générales pour tous les projets

Vous êtes libres de choisir les entités qui correspondent à votre sujet de projet et vos besoins (si par exemple il manque l'entité utilisateur et que vous avez besoin, ajoutez-là), les exemples fournis ne sont que des suggestions pour vous aider. L'essentiel est que votre base de données respecte les consignes concernant les relations, notamment qu'elle contienne au moins une relation many-to-many avec clé composite, et que vos requêtes SQL utilisent des INNER JOIN et des clés étrangères

**Backend:**

- Framework léger : Express.js avec Node.js
- Base de données : SQLite ou ORM de votre choix
- Authentification : Simple (email/mot de passe, JWT en bonus)
- Routes CRUD basiques pour chaque entité principale
- Validation minimale des données

**Frontend:**

- Pas de Framework (Serveur node native)
- HTML/CSS (pas de framework complexe) / JavaScript vanilla
- Formulaires HTML pour les opérations CRUD
- Page de connexion (email/mot de passe)
- Interface d'administration basique

## Instructions spécifiques par projet

**CRUD Backend:**

- Entité Personnage (nom, élément, rareté)
- Entité Arme (nom, type, statistiques)
- Entité Matériau (nom, source, rareté)

**Frontend minimal:**

- Formulaire d'ajout/édition de personnages
- Liste des personnages avec détails basiques
- Interface d'association arme-personnage
