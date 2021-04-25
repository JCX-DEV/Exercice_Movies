# Exercice REACT - Liste de films

## UI et responsiveness

### **Enoncé :**
- 1. Lister les films dans des cartes avec le titre en gras, la catégorie et une jauge type Youtube indiquant le ratio likes/dislikes. Les cartes doivent être côtes à côtes et responsive (lorsque la fenêtre se réduit, les cartes sautent à la ligne suivante)

### **Réponse proposée :**
- Le composant carte a été fait en composant réutilisable, principalement à partir de Material-UI.
- La jauge indiquant le ratio likes/dislikes est un composant réutilisable écrit pour cet exercice. Le calcul du ratio est passé dans le style css pour être représenté.
- L'application est pensée de façon responsive : header et footer fixes. La partie centrale avec les cartes occupe l'espace disponible et la scrollbar ne s'applique qu'à cet espace (afin de garder header et footer toujours visibles)
- Les cartes passent à la ligne suivante lorsque la largeur de l'écran se réduit. Dans cet exercice, on s'est imposé des dimensions minimales en pixels de 390x410.

## Interactions avec le store

### **Enoncé :**
- 2. Ajouter un bouton dans les cartes permettant de supprimer celle-ci
- 3. Ajouter un bouton toggle like/dislike

### **Réponse proposée :**
- Chaque carte disponse d'un bouton permettant de supprimer du store l'élément correspondant.
- Ainsi qu'un bouton pour chaque action de like ou dislike permettant d'ajouter ou retirer son like ou son dislike. (Si une carte a déjà été likée, cliquer sur le dislike entraînera la suppression dans le store du précédent like). Le nombre total de likes/dislikes associé à l'élément sera également maintenu à jour dans le store au travers de ces actions.

## Interactions avec l'UI

### **Enoncé :**
- 4. Ajouter un filtre par catégorie (de type multiselect) en supposant qu'on ne les connaisse pas à l'avance (il faut donc les récupérer dynamiquement depuis les films). Si tous les films d'une catégorie sont supprimés, celle-ci ne doit plus appraître.
- 5. Ajouter un système de pagination avec les fonctionnalités suivantes:
-- Boutons précédent/suivant
-- Choix du nombre d'élements affichés par page (4, 8 ou 12).

### **Réponse proposée :**
- Ajout dans le header d'un multiselect (Composition de composants Material-UI) alimenté dynamiquement avec les catégories disponibles dans le store. Affichage sous forme de chip des catégories choisies et gestion de la suppression élément par élément.
- Ajout d'une pagination dans le footer (Material-UI). A gauche : accès directs aux pages ou navigation via les boutons précédent/suivant. A droite : composant select pour choisir le nombre d'éléments à afficher par page. (4, 8, ou 12 défini dans les constantes du projet).

## **A propos de Redux**
Utilisation de redux pour le store, en utilisant les hooks mais aussi reselect et redux-thunk. 

## **Quelques initiatives**
Pour le confort UI quelques éléments en plus :
- Un loader lors du chargement des données dans le store.
- Le nombre total d'éléments trouvés est affiché sous la pagination.
- Le nombre total de votes est affiché sous la jauge de like.
- Un écran d'erreur apparaît pour indiquer qu'il n'y a aucune carte à afficher.
- Un écran d'erreur apparaît pour indiquer que les dimensions de la fenêtre sont en-dessous des minima requis.