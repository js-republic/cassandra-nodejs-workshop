Workshop NodeJS & Cassandra Database
===

[Reste à faire !](./todo.md)

Le but de ce Workshop (scéance de traveaux pratiques) est de permettre à des participants 
avec un minimum de connaissance en développement JavaScript et en base de données d'apprendre
ce qu'est la base de données Cassandra, comment l'utiliser seule et avec NodeJS.

Le workshop commence par une introduction des animateurs à ce qu'est Cassandra, comment elle fonctionne et ses différences par rapport à d'autres types de base données.
Cette présentation dura environ 15 min et sera suivie de mises en pratique alternée avec des explications.

Rassurez-vous, nous commençons avec les premiers pas pour finir avec des cas plus avancés et les animateurs restent disponibles pour vous accompagner.

Au total, ce workshop dure en moyenne 2h.

# Pré-requis

Ce workshop nécessite pour être accomplie :
 - Un ordinateur ...
 - Un éditeur/IDE JavaScript (Webstorm, Visual Studio Code, etc)
 - [Git](https://git-scm.com/) correctement installé et maitrisé
 - [NodeJS](https://nodejs.org/en/) en version 8 minimum correctement installé et maitrisé
 - [Docker](https://www.docker.com/) correctement installé
 
Au cours de ce workshop, nous lancerons un cluster cassandra. Ce type de processus
nécessite beaucoup de mémoire allouée au container docker installé sur votre ordinateur.
Merci de veiller à ce que votre container docker est au **minimum 5Go** de mémoire vive allouée, en suivant les indications suivantes :

- Pour mac : <https://docs.docker.com/docker-for-mac/#memory>
- Pour windows : <https://docs.docker.com/docker-for-windows/#advanced>
  

# Installation & démarrage

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
npm run start:db
```

Cette opération prend de 3 à 5 min. En effet, le démarrage d'un cluster cassandra 
nécessite un petit moment et nous devons attendre que l'intégralité des trois 
noeuds soient prêts séquentiellement.

> Pour les utilisateurs de Windows, une erreur dévrait subvenir juste après le démarrage
des trois noeuds, car le détecteur de démarrage du cluster n'a pour l'instant été développé 
que pour Linux et Mac. Merci de bien vouloir exécuter à la main la commande `npm run start:workshop` pour
insérer le dataset du workshop.


# Structure du projet

- **/infra**: Contient les fichiers dockers et shell nécessaires au démarrage du cluster cassandra. Vous y retrouverez aussi le dataset de données dans le fichier `dataset.cql`
- **/src**: Contient les sources JavaScript du projet utilisé pour communiquer avec la base de données.
- **package.json** & **package-lock.json** : Habituels fichier de définition des dépendances.

    
## Prise en main

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
UN  172.18.0.2  80.2 KiB   256          35.8%             08c3c767-ad6c-4ce9-80eb-5b8ff1bc63d6  rack1
UN  172.18.0.3  101.23 KiB  256          32.0%             1732b9df-9464-4e20-8389-5d2acc10bdcc  rack1
UN  172.18.0.4  110 KiB    256          32.2%             56ce68c0-de55-4686-8d98-1cf65303d341  rack1
</pre>

Comme vous pouvez le voir, nous vous avons préparé pour le workshop un cluster cassandra composé de trois noeuds, respectivement
identifiés par 172.18.0.2 (instance docker "cassandra-db"), 172.18.0.3 (instance docker "cassandra-db-1") et  172.18.0.4 (instance docker "cassandra-db-2").
Les ips peuvent être différentes en fonction des machines, mais cela n'a pas d'importance
</p>
</details>

---

Découvrons maintenant le contenu de notre base de données, pour cela, toujours dans le bash d'un des noeuds cassandra, utilisez
le `cqlsh`, deuxième outil de base dans cassandra pour lui demander une description des `keyspaces`. 
Pour le workshop, nous avons créé un keyspace du même nom `workshop`.
La documetation ci-dessous, devrait vous aider :
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

system_schema  system_auth  system  workshop  system_distributed  system_traces

cqlsh> describe workshop

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

Dans l'application que nous allons compléter par la suite, nous allons requêter
pour connaitre les personnages d'un maison. Cette information, stcokée dans la 
colone `house` est donc une parfaite candidate à la pose d'un index.
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

## Passons au code !

Maintenant, que nous avons notre base de données Cassandra préparé avec nos personnages préférés (GoT ou pas), il est temps de passer à la partie Node. JS de l'histoire. 

Dans le dossier **src** vous avez déjà en place une API avec les méthodes CRUD basiques pour les personnages plus les différents connectores entre le dernier: les services, et la data access, et c'est sur le **da** que nous allons nous concentrer. 

Le but est de vous rendre à l'aise avec le driver Cassandra et exécuter les différents querys sur la base de donnée que nous avons déjà préparée.

Les teste sont déjà mits en place pour vous guider dans le développement des différentes fonctions, TDD style, guys!


## Replication, résiliance, allons plus loin !

@Mathieu