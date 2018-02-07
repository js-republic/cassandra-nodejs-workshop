const chalk = require('chalk');
const c = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: require('fs').createReadStream('infra/dataset.cql')
});

const log = console.log;
const br = () => log('');

rl.on('line', function (line) {
  c.execSync(`docker exec -t cassandra-db sh -c "cqlsh -e \\"${line}\\""`, {stdio:[0,1,2]});
});

log(chalk.white.bgGreen.bold('Cassandra :: PRET'));
br();
log(chalk.red.bold.underline('Manuel d\'utilisation :'));
br();
log(chalk.blue('- ') + chalk.blue.underline('Pour se connecter en shell :'));
log(chalk.white('docker exec -ti cassandra-db sh'));
br();
log(chalk.blue('- ') + chalk.blue.underline('Doc pour découvrir une base cassandra avec cqlsh :'));
log(chalk.white.underline('https://www.pluralsight.com/courses/cassandra-developers'));
log(chalk.white.underline('https://docs.datastax.com/en/archived/cql/3.0/cql/cql_reference/describe_r.html'));
