# Simple Dashboard

Un tableau de bord minimal : une page HTML servie par un petit serveur Node.js,
avec les métriques système en direct.

## Fonctionnalités

- Métriques système en temps réel via `systeminformation`
- Mise à jour par WebSocket — pas de rechargement de page
- Serveur Express qui sert aussi la page statique

## Stack

- **Node.js** + **Express**
- **systeminformation** — métriques CPU, mémoire, disque, réseau
- **ws** — WebSocket

## Démarrage

```bash
npm install
node server.js
```

Puis ouvrez <http://localhost:3000>.

## Licence

MIT
