CREATE KEYSPACE workshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1 }
CREATE TABLE workshop.users(id uuid PRIMARY KEY,  username text, password text);