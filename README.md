Workshop NodeJS & Cassandra Database
===

Le but de ce Workshop (séance de traveaux pratiques) est de permettre à des participants 
avec un minimum de connaissance en développement JavaScript et en base de données d'apprendre
ce qu'est la base de données Cassandra, comment l'utiliser seule et avec NodeJS.

Le workshop commence par une introduction des animateurs à ce qu'est Cassandra, comment elle fonctionne et ses différences par rapport à d'autres types de base données.
Cette présentation dura environ 15 min et sera suivie de mises en pratique alternées avec des explications.

Vous pouvez retrouver la présentation ici :
<a href="./presentation/No-to-SQL-with-Cassandra.pdf" target="_blank">Click here</a>

Rassurez-vous, nous commençons avec les premiers pas pour finir avec des cas plus avancés et les animateurs restent disponibles pour vous accompagner.

Au total, ce workshop dure en moyenne 2h.

**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Workshop NodeJS & Cassandra Database](#)
- [Pré-requis](#)
- [Installation & démarrage](#)
- [Structure du projet](#)
	- [Prise en main](#)
	- [Passons au code !](#)
	- [Replication, résiliance, allons plus loin !](#)
		- [Et ça marche si on tue un noeud ?](#)
	- [Conclusion](#)

## Pré-requis

Ce workshop nécessite pour être accomplie :
 - Un ordinateur ...
 - Un éditeur/IDE JavaScript (Webstorm, Visual Studio Code, etc)
 - [Git](https://git-scm.com/) correctement installé et maitrisé
 - [NodeJS](https://nodejs.org/en/) en version 8 minimum correctement installé et maitrisé
 - [Docker](https://www.docker.com/) correctement installé
 
Au cours de ce workshop, nous lancerons un cluster cassandra. Ce type de processus
nécessite beaucoup de mémoire allouée au container docker installé sur votre ordinateur.
Merci de veiller à ce que votre container docker est au **minimum 7Go** de mémoire vive allouée, en suivant les indications suivantes :

- Pour mac : <https://docs.docker.com/docker-for-mac/#memory>
- Pour windows : <https://docs.docker.com/docker-for-windows/#advanced>

> De par son fonctionnement Cassandra est assez gourmand en RAM. La communauté s'accorde
à dire qu'un noeud nécessite au moins 4Go pour fonctionner normalement. Dans le cadre de ce workshop
nous avons limité la consomation mémoire des noeuds à 2Go afin que cela reste utilable sur
un ordinateur classique.
  

## Installation & démarrage

Une fois les pré-requis remplient, pour commencer le TP, il vous faut cloner ce repo sur votre machine :
```bash
git clone git@github.com:js-republic/cassandra-nodejs-workshop.git
```

Ce rendre dans le dossier nouvellement créé :
```bash
cd cassandra-nodejs-workshop
```

Installer les dépendences :
```bash
npm install
```

Lancer la base de données :
```bash
npm run db:start
```

Cette opération prend de 3 à 5 min. En effet, le démarrage d'un cluster cassandra 
nécessite un petit moment et nous devons attendre que l'intégralité des deux 
noeuds soient prêts séquentiellement.

> Pour les utilisateurs de Windows, une erreur dévrait subvenir juste après le démarrage
des deux noeuds, car le détecteur de démarrage du cluster n'a pour l'instant été développé 
que pour Linux et Mac. Merci de bien vouloir exécuter à la main la commande `npm run db:init` pour
insérer le dataset du workshop.


## Structure du projet

- **/infra**: Contient les fichiers dockers et shell nécessaires au démarrage du cluster cassandra. Vous y retrouverez aussi le dataset de données dans le fichier `init.cql`
- **/src**: Contient les sources JavaScript du projet utilisés pour communiquer avec la base de données.
- **package.json** & **package-lock.json** : Habituels fichiers de définition des dépendances.

    
### Prise en main

Pour commencer, nous vous invitons d'abord à vérifier si votre cluster est en bonne santé.
Pour cela, connectez-vous au bash d'un des noeuds cassandra à l'aide de la commande docker suivante :
```bash
docker exec -ti cassandra-db bash
```

Et utiliser la commande `nodetool` expliquée ici :
<https://docs.datastax.com/en/cassandra/2.1/cassandra/tools/toolsStatus.html>
<details>
<summary><i>Découvrer la solution ici</i></summary>
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
UN  172.18.0.2  80.2 KiB   256          50.0%             08c3c767-ad6c-4ce9-80eb-5b8ff1bc63d6  rack1
UN  172.18.0.3  101.23 KiB  256          50.0%             1732b9df-9464-4e20-8389-5d2acc10bdcc  rack1
</pre>

Comme vous pouvez le voir, nous vous avons préparé pour le workshop un cluster cassandra composé de trois noeuds, respectivement
identifiés par 172.18.0.2 (instance docker "cassandra-db") et 172.18.0.3 (instance docker "cassandra-db-1").
Les ips peuvent être différentes en fonction des machines, mais cela n'a pas d'importance
</p>
</details>

---

Découvrons maintenant le contenu de notre base de données, pour cela, toujours dans le bash d'un des noeuds cassandra, utilisez
le `cqlsh`, deuxième outil de base dans cassandra pour lui demander une description des `keyspaces`. 
Pour le workshop, nous avons créé un keyspace du même nom `workshop`.
La documentation ci-dessous, devrait vous aider :
- <https://docs.datastax.com/en/archived/cql/3.0/cql/cql_reference/cqlsh.html>
- <https://docs.datastax.com/en/archived/cql/3.0/cql/cql_reference/describe_r.html>

<details>
<summary><i>Découvrer la solution ici</i></summary>
<p>
<pre>
oot@38eccacd2dd4:/# cqlsh
Connected to Test Cluster at 127.0.0.1:9042.
[cqlsh 5.0.1 | Cassandra 3.11.1 | CQL spec 3.4.4 | Native protocol v4]
Use HELP for help.
cqlsh> describe keyspaces
</pre>
<pre>
system_schema  system_auth  system  workshop  system_distributed  system_traces
</pre>
<pre>
cqlsh> describe workshop
</pre>
<pre>
CREATE KEYSPACE workshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TABLE workshop.characters (
    id uuid PRIMARY KEY,
    allegiance text,
    house text,
    name text
) WITH bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND crc_check_chance = 1.0
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99PERCENTILE';
</pre>

Un Keyspace est une sorte de regroupement de colonne en NoSQL, à l'image des shémas dans les bases relationnelles, il permet d'appliquer
une politique de replication à l'ensemble des colonnes qu'il contient.

Pour en savoir plus :
<https://en.wikipedia.org/wiki/Keyspace_(distributed_data_store)>  
</p>
</details>

---

Nous y voyons un peu plus clair maitenant sur le contenu de notre base de données. Tentons
désormais de faire nos premières requêtes CQL permettant de manipuler la données à l'intérieur
de cette base.

Grâce à la documentation ci-dessous, faite une requête permettant de lire tous les personnages de la table `characters` dans le keyspace `workshop`.

<https://docs.datastax.com/en/cql/3.1/cql/cql_reference/select_r.html>
<details>
<summary><i>Découvrer la solution ici</i></summary>
<p>
<pre>
SELECT * FROM workshop.characters;
</pre>
<pre>
 id                                   | allegiance                  | house     | name
--------------------------------------+-----------------------------+-----------+-----------------------
 a6e8f2de-45d0-46b8-a185-03a58115d5c1 |                       Stark |     Stark |         Catelyn Stark
 b99aff27-1e02-49b9-9bf9-050327973c14 |                       Stark |     Stark |            Robb Stark
 d93aaa6c-5b8c-417e-a277-41275165ffcb |                             |           |                 Hodor
 047199db-b7be-4fa7-affc-e2df3fa9d683 |                             |           |                 Gilly
 4a843700-930d-4b8a-aad0-0500e79d90cb |                             |           |         Rodrik Cassel
 394e64dd-45a8-48a0-8fb6-9830fdbf6cf3 |                   Baratheon | Baratheon |     Shireen Baratheon
</pre>
</p>
</details>

---

Puis insérer un nouveau personnage, disons au hasard "Jon Snow". (Nous laissons à votre
discretion le choix de sa maison...)

<https://docs.datastax.com/en/cql/3.1/cql/cql_reference/insert_r.html>

<details>
<summary><i>Découvrer la solution ici</i></summary>
<p>
<pre>
INSERT INTO workshop.characters (id, name, house, allegiance) VALUES (uuid(), 'Jon Snow', 'Targaryen', 'Stark');
</pre>
</p>
</details>

---

Vous l'aurez compris maintenant, notre table liste tous les personnes de la série Game Of Thrones. Un usage assez 
évident pour être de demander tous les personnages d'une maison. Cette information, stockée dans la 
colone `house` est donc une parfaite candidate à la pose d'un index pour accélérer ce type de requête.
<https://docs.datastax.com/en/cql/3.1/cql/ddl/ddl_when_use_index_c.html>
<https://docs.datastax.com/en/cql/3.3/cql/cql_reference/cqlCreateIndex.html>

<details>
<summary><i>Découvrer la solution ici</i></summary>
<p>
<pre>
CREATE INDEX houses ON workshop.characters( house );
</pre>
</p>
</details>

### Passons au code !

Maintenant, que nous avons notre base de données Cassandra préparée avec nos personnages préférés (GoT ou pas), 
il est temps de passer à la partie Node.JS de l'histoire. 

Dans le dossier **src** vous avez déjà en place une API avec les méthodes CRUD basiques pour les personnages organisés comme suit:
```
$ tree src
src                                 
├── character
│   ├── __mocks__
│   │   └── cassandra-driver.js         <- Mock utilisé dans les test unitaires
│   ├── __test__
│   │   └── character.da.spec.js        <- Tests unitaires du fichier character.da.js
│   ├── character.da.js                 <- C'est ici que ça va se passer ! la couche d'accès aux données Cassandra 
│   ├── character.db.model.js           <- Modèle en base de données de character
│   ├── character.model.js              <- Modèle de character
│   ├── character.route.js              <- Router exposant l'API CRUD
│   └── character.service.js            <- Service business (passe plat dans notre cas)
├── database
│   └── cassandra-client.database.js    <- Client se connectant à la base Cassandra
└── index.js                            <- Fichier d'entrée à l'application Express
```

Le but est de vous familiariser avec le driver Cassandra et implémenter les différentes requêtes sur la base de données 
que nous avons déjà préparée.

Lancer donc la commande :
```bash
npm test
```

Laissez vous guider par les tests unitaires implémentés dans `character.da.spec.js` 
et remplissez les fonctions du fichier `character.da.js`.

Pour vous aider dans votre tâche, vous pouvez jeter un oeil à la doc du driver Cassandra for NodeJS :
<https://github.com/datastax/nodejs-driver>

TDD style, guys!

<details>
<summary><i>Découvrer la solution ici</i></summary>
<p>
<pre>
const {types} = require('cassandra-driver');
const {mapToCharacterDB} = require('./character.db.model');
const {CassandraClient} = require('../database/cassandra-client.database');

module.exports = {
  getAllCharactersDB() {
    const query = 'SELECT * FROM workshop.characters';
    return CassandraClient.execute(query).then(resQuery => {
      return resQuery.rows.map((row) =>
        mapToCharacterDB(row['id'], row['name'], row['house'], row['allegiance'])
      )
    });
  },

  getCharacterById(id) {
    const params = [types.Uuid.fromString(id)];
    const query = 'SELECT * FROM workshop.characters WHERE id=?';
    return CassandraClient.execute(query, params).then(resQuery => {
      const row = resQuery.first();
      return mapToCharacterDB(row['id'], row['name'], row['house'], row['allegiance']);
    });
  },

  insertCharacter(characterToAdd) {
    const query = 'INSERT INTO workshop.characters(id,name,house,allegiance) VALUES (?,?,?,?)';
    const newId = types.TimeUuid.now();
    const params = [newId, characterToAdd.name, characterToAdd.house,characterToAdd.allegiance];
    return CassandraClient.execute(query, params).then(() => {
      return newId.toString();
    });
  },

  updateCharacter(id, characterToUpdate) {
    const query = 'UPDATE workshop.characters SET name=?, house=?, allegiance=? WHERE id=?';
    const params = [characterToUpdate.name, characterToUpdate.house, characterToUpdate.allegiance, types.Uuid.fromString(id)];
    return CassandraClient.execute(query, params).then(resQuery => !!resQuery);
  },

  deleteCharacter(characterIdToDelete) {
    const query = 'DELETE FROM workshop.characters WHERE id=?';
    return CassandraClient.execute(query, [characterIdToDelete]).then(resQuery => !!resQuery)
  }
};
</pre>
</p>
</details>

---

### Replication, résiliance, allons plus loin !

Notre "cluster" Cassandra n'est pour l'instant constitué que de deux noeuds. Vous en conviendrez, cela est compliqué
 de continuer à l'appeler "cluster" avec si peu d'instance.
 
Nous allons donc plus loin dans notre utilisation de Cassandra en ajoutant un nouveau noeud au cluster. Pour ce faire, faite
appel à la commande :

```bash
npm run db:add:node
```

Celle-ci lance le fichier `infra/add-new-node.js` qui lui même lance une commande docker pour ajouter un noeud en lui précisant
quel est le noeud `seed` du cluster (l'instance docker `cassandra-db` dans notre cas).

Le(s) `seed(s)` sont une liste de noeud responsable d'introniser les nouveaux noeuds dans un cluster. C'est à lui/eux que viendront s'addresser chaque noeuds
désireux de rejoindre le cluster. Il faut donc au minimum un `seed` par cluster (notre cas) mais on peut en avoir beaucoup plus, il ne faut pas pour autant que tous les noeuds du cluster soient des `seed`.

Pour en savoir plus :

<https://docs.datastax.com/en/cassandra/2.1/cassandra/architecture/architectureGossipAbout_c.html>

#### Et ça marche si on tue un noeud ?

Cassandra est une base de données, particulièrement résistante à la panne. Pour vous le démontrer nous allons nous amuser
à tuer un noeud et pas n'importe lequel puisse que nous allons tué le `seed`. Cela démontra que le seed n'est vraiment
pas un Single Point Of Failure.

D'abord lancer l'application avec :
```bash
npm start
```

Rendez-vous à l'adresse : `http://localhost:3000/character`
Et vous verrez la liste des `characters` retournés par la base au travers du serveur NodeJS.

Tuer maintenant le seed :

```bash
npm run db:kill:seed
```

Et rafraichissez votre page. Le résultat est toujours disponible !

**Comment cela est possible ?**

La première raison pour laquelle cela continu à fonctionner est d'abord le taux de replication. En effet, si vous regardez 
la première ligne du fichier `infra/dataset.cql` vous verrez ceci :
```sql
CREATE KEYSPACE workshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2 };
```

Si vous prêtez attention à la fin de la ligne, vous verrez que le taux de replication est positionné à deux. Cela signifie 
que Cassandra va copier la données dans deux noeuds différents (Dans notre cas sur `cassandra-db` et `cassandra-db-1`)

La deuxième raison pour laquelle cela fonctionne est notre stratégie de load balancing configurée dans le driver Cassandra pour NodeJS.
Rendez-vous maintenant dans le fichier `src/character/database/cassandra-client-database.js` pour comprendre :
```javascript
const {Client, policies} = require('cassandra-driver');

const localDatacenter = 'datacenter1';

module.exports = {
  CassandraClient: new Client({
    contactPoints: ['127.0.0.1:9042', '127.0.0.1:9142'],
    keyspace: 'workshop',
    policies: {
      loadBalancing: new policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter, 1)
    }
  })
};
```

Nous précisons à la 10ième ligne que nous voulons adopter une stratégie de RoundRobin sur les différentes instances d'un seul
data center. Cela tombe bien, car comme nous l'avons vu grace à la commande `nodetool status`, nous n'avons qu'un seul
datacenter : "datacenter1" => notre poste :)
A cela, nous avons configuré ligne 7 plusieurs noeuds d'accès au driver. Grâce à ces deux configurations, si le driver n'arrive
pas à accéder à l'un des noeuds, il essaira les autres noeuds du même datacenter.

Pour en savoir plus si les différentes stratégie de load balancing offertes par le driver :
<https://docs.datastax.com/en/developer/nodejs-driver/3.4/features/tuning-policies/#load-balancing-policy>


## Conclusion

Le workshop est terminé, vous pouvez executer la commande `npm run db:stop` pour laisser refroidir votre machine :)

Nous esperons que ce workshop vous a plus et qu'il vous a permis de vous familiariser avec la base de données Cassandra.


N'hésitez pas à le partager :
<a href="https://twitter.com/home?status=Venez%20jeter%20un%20oeil%20%C3%A0%20ce%20Workshop%20%40cassandra%20%26%20%23nodejs%20fait%20par%20la%20team%20%40jsrepublic%20https%3A//github.com/js-republic/cassandra-nodejs-workshop">Share on Twitter</a>
