# Martial

Une base de données pour manipuler et visualiser des oeuvres de Martial,
ainsi que leurs imitations.

## Compilation et exécution

```
npm install -g electron-prebuilt
npm install
electron main.js
```

## Reste à faire

* Déclencher le rafraîchissement sur changement des filtres (Origine de
l'événement ?)
* Livrer les oeuvres et les oeuvres filtrées en asynchrone
* Charger l'index de recherche en asynchrone
* Changer searchHelper en proxy du worksDao ? (worksHelper)
* Page d'ajout/édition d'une oeuvre
