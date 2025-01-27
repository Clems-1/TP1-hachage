# Serveur NodeJS : Charité & Blockchain

Ce projet implémente un serveur NodeJS permettant d'enregistrer les dons de donateurs en utilisant le principe de la Blockchain. L'API REST répond aux verbes `GET` et `POST`, et la sauvegarde des dons s'effectue dans le fichier `blockchain.json`. Tous les traitements s'effectuent en asynchrone à travers des `Promises`.

## Fonctionnalités

- Enregistrement des dons en utilisant la Blockchain.
- API REST avec les verbes `GET` et `POST`.
- Sauvegarde des dons dans un fichier JSON (`blockchain.json`).
- Traitements asynchrones avec `Promises`.

## Description de l'API

- Le serveur écoute sur le port `3000`.
- Le Endpoint est `/blockchain`.

### GET

Lister tous les dons.

```shell
curl --request GET 'http://localhost:3000/blockchain'
```
