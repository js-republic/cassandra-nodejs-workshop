const {execSync} = require('child_process');

const buildCmd = `docker build infra -t workshop-cassandra-node`;
const runCmd = `docker run --name cassandra-db-${Date.now()} --link cassandra-db --net infra_default -m 2G -d workshop-cassandra-node`;

execSync(buildCmd, {stdio:[0,1,2]});
execSync(runCmd, {stdio:[0,1,2]});