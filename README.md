# Workshop NodeJS & Cassandra Database

🚀🚧 Actively in construction 🚧🚀

Le but de cet atelier est de présenter aux participants qu'est-ce que la base de Cassandra et comment
l'utiliser avec Node.JS pour en tirer pleinement partie.

# Déroulement du workshop

1. Présentation de Cassandra, une base NoSQL.
    - [X] Introduction au NoSQL
    - [X] Présentation des différentes familles, et localisation de Cassandra
    - [X] Forces & faibles de Cassandra
    - [X] Retravailler slides pour pour élager le slides des pros de cassandra
    - [ ] (dans le doc du workshop) Hashtable, stratégie de répartition de données
    - [ ] Présentation du context de l’atelier
    - [ ] Présenter la structure de 'document'
2. Démarrage de la partie pratique
    1. Prise en main de Cassandra au travers de CQLsh
     - [ ] Être capable de lire un enregistrement dans cassandra via CQL
     - [ ] Être capable de lire un enregistrement dans cassandra via index
    2. Premier pas avec NodeJS & Cassandra
     - [X] Implémenter les méthodes de CRUD dans NodeJS avec les test unitaires pour confirmer si ils retournent les bonnes valeurs
    3. Exercices avancés Node JS & Cassandra
     - [ ] Changer la stratégie de Gossip
     - [ ] Ajouter/Supprimer un noeud cassandra pour démontrer la réplication
     
    
Tâches techniques
- [ ] Préparer une image docker de workshop
- [ ] Prépaper un docker compose pour démarrer les cluster.
    - [ ] Tuer le seed, pour voir si on peut toujours ajouter un noeud
    
## Mes premières requêtes CQLsh :


Solution :
```cql
INSERT INTO workshop.users (id, username, password) VALUES (uuid(), 'johndoe', 'pass');
```
```cql
SELECT * FROM workshop.users;
```
    

