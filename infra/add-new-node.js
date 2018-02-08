const {execSync} = require('child_process');

const runCmd = `docker run --name cassandra-db-${Date.now()} --net infra_default -e CASSANDRA_SEEDS="$(docker inspect --format='{{ .NetworkSettings.Networks.infra_default.IPAddress }}' cassandra-db)" -m 2G -d cassandra:3.11`;

execSync(runCmd, {stdio:[0,1,2]});