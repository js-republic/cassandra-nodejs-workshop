Workshop NodeJS & Cassandra Database
===

Le but de ce Workshop (scéance de traveaux pratiques) est de permettre à des participants 
avec un minimum de connaissance en développement JavaScript et en base de données d'apprendre
ce qu'est la base de données Cassandra, comment l'utiliser seule et avec NodeJS.

Le workshop commence par une introduction des animateurs à ce qu'est Cassandra, comment elle fonctionne et ses différences par rapport à d'autres types de base données.
Cette présentation dura environ 15 min et sera suivie de mises en pratique alternée avec des explications.

Rassurez-vous, nous commençons avec les premiers pas pour finir avec des cas plus avancés et les animateurs restent disponibles pour vous accompagner.

Au total, ce workshop dure en moyenne 2h.

## Pré-requis

Ce workshop nécessite pour être accomplie :
 - Un ordinateur ...
 - Un éditeur/IDE JavaScript (Webstorm, Visual Studio Code, etc)
 - [Git](https://git-scm.com/) correctement installé et maitrisé
 - [NodeJS](https://nodejs.org/en/) en version 8 minimum correctement installé et maitrisé
 - [Docker](https://www.docker.com/) correctement installé
 
Au cours de ce workshop, nous lancerons un cluster cassandra. Ce type de processus
nécessite beaucoup de mémoire allouée au container docker installé sur votre ordinateur.
Merci de veiller à ce que votre container docker est au **minimum 5Go** de mémoire vive allouée, en suivant les indications suivantes :

- Pour mac : [https://docs.docker.com/docker-for-mac/#memory]
- Pour windows : [https://docs.docker.com/docker-for-windows/#advanced]
  

## Installation & démarrage

Une fois les pré-requis remplient, pour commencer le TP, il vous faut cloner ce repo sur votre machine :
```bash
git clone git@github.com:js-republic/cassandra-nodejs-workshop.git
```

Ce rendre dans le dossier nouvellement créé :
```bash
cd cassandra-nodejs-workshop
```

Installer les dépendances :
```bash
npm install
```

Lancer la base de données :
```bash
npm run start:db
```

Cette opération prend de 3 à 5 min. En effet, le démarrage d'un cluster cassandra 
nécessite un petit moment et nous devons attendre que l'intégralité des trois 
noeuds soient prêts séquentiellement.

> Pour les utilisateurs de Windows, une erreur dévrait subvenir juste après le démarrage
des trois noeuds, car le détecteur de démarrage du cluster n'a pour l'instant été développé 
que pour Linux et Mac. Merci de bien vouloir exécuter à la main la commande `npm run start:workshop` pour
insérer insérer le dataset du workshop.


### Structure du projet

- **/infra**: Contient les fichiers dockers et shell nécessaires au démarrage du cluster cassandra. Vous y retrouverez aussi le dataset de données dans le fichier `dataset.cql`
- **/src**: Contient les sources JavaScript du projet utilisé pour communiquer avec la base de données.
- **package.json** & **package-lock.json** : Habituels fichier de définition des dépendances.

    
### Prise en main :

Pour commencer, nous vous invitons d'abord à vérifier si votre cluster est bonne santé.
Pour cela, connectez-vous à une des noeud à l'aide de la commande docker :
```bash
docker exec -ti cassandra-db bash
```

Et utiliser la commande nodetool, expliquée ici :
[https://docs.datastax.com/en/cassandra/2.1/cassandra/tools/toolsStatus.html]
<details>
<summary><strong>Découvrer la solution ici<strong></summary>
<p>
<pre>
nodetool status
</pre>
<pre>
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load       Tokens       Owns (effective)  Host ID                               Rack
UN  172.18.0.2  80.2 KiB   256          35.8%             08c3c767-ad6c-4ce9-80eb-5b8ff1bc63d6  rack1
UN  172.18.0.3  101.23 KiB  256          32.0%             1732b9df-9464-4e20-8389-5d2acc10bdcc  rack1
UN  172.18.0.4  110 KiB    256          32.2%             56ce68c0-de55-4686-8d98-1cf65303d341  rack1
</pre>
</p>
</details>


Solution :
```cql
INSERT INTO workshop.users (id, username, password) VALUES (uuid(), 'johndoe', 'pass');
```
```cql
SELECT * FROM workshop.users;
```
    
```cql
CREATE INDEX houses ON workshop.characters( name );
```
 
```cql
SELECT * FROM workshop.characters WHERE artist = 'Fu Manchu';
```

[Reste à faire !](./todo.md)
