CREATE KEYSPACE workshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1 }
CREATE TABLE workshop.characters(id uuid PRIMARY KEY,  name text, house text, allegiance text)