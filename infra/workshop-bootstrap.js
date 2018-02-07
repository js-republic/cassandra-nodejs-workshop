const chalk = require('chalk');
const c = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: require('fs').createReadStream('infra/dataset.cql')
});

const log = console.log;
const br = () => log('');

br();
log(chalk.white.bgGreen.bold('CLUSTER READY !'));
br();
log(chalk.red.bold.underline('Manuel d\'utilisation :'));
br();
log(chalk.blue('- ') + chalk.blue.underline('Pour se connecter en shell :'));
log(chalk.white('docker exec -ti cassandra-db bash'));
br();
log(chalk.blue('- ') + chalk.blue.underline('Doc pour découvrir une base cassandra avec cqlsh :'));
log(chalk.white.underline('https://www.datastax.com/dev'));
log(chalk.white.underline('https://docs.datastax.com/en/cql/3.3/cql/cqlIntro.html'));
log(chalk.white.underline('https://docs.datastax.com/en/archived/cql/3.0/cql/cql_reference/describe_r.html'));
br();
log(chalk.gray('Insertion du dataset...'));

rl
  .on('line', function (line) {
    c.exec(`docker exec -t cassandra-db sh -c "cqlsh -e \\"${line}\\""`);
  });
