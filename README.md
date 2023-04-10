Titre du projet : Music Award NFT
    Un projet de tokens non fongibles (NFT) pour les récompenses musicales.

Description
    Ce projet permet de créer et gérer des tokens non fongibles (NFT) représentant des récompenses musicales.
    Les NFT peuvent être créés pour différents types de récompenses, tels que les disques d'or, de platine ou de diamant.
    Chaque NFT contient des informations sur l'artiste, le titre de la musique, la date de certification, le label, l'album et le type de récompense.

Prérequis
    Node.js
    Hardhat
    Github
    Metamask

Installation
    1- Clonez le dépôt GitHub :
    git clone https://github.com/ivxry/music-award-nft.git

    2- Accédez au répertoire du projet :
    cd music-award-nft
    
    3- Installez les dépendances :
    npm install
    Démarrez Hardhat ainsi que son noeud blockchain et configurez Metamask pour utiliser le réseau local.

    4- Déployez les contrats sur le réseau local :
    npx hardhat run scripts/deploy.js

    5- Démarrez le serveur de développement :
    npm start
    Le projet est maintenant prêt à être utilisé sur http://localhost:3000.

Utilisation
    Utilisez l'interface web pour interagir avec les contrats intelligents et gérer les NFT.
    Vous pouvez créer de nouveaux NFT, consulter les informations des NFT existants et transférer les NFT entre les adresses.

Tests
    Pour exécuter les tests du projet, utilisez la commande suivante :
    npx hardhat test

Remerciements
    Un grand merci à Alyra l'école de la Blockchain pour les compétences transmises.
    OpenZeppelin également pour les bibliothèques utilisées dans ce projet.