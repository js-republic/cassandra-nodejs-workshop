const chalk = require('chalk');
const log = console.log;
const br = () => log('');

log(chalk.white.bgGreen.bold("Cassandra :: PRET"));
br();
log(chalk.red.bold.underline("Manuel d'utilisation :"));
br();
log(chalk.blue('- ') + chalk.blue.underline("Pour se connecter en cqlsh :"));
log(chalk.white("docker exec -ti cassandra-db sh -c \"cqlsh\""));
br();
log(chalk.blue('- ') + chalk.blue.underline("Doc pour découvrir une base cassandra avec cqlsh :"));
log(chalk.white.underline("https://www.pluralsight.com/courses/cassandra-developers"));
log(chalk.white.underline("https://docs.datastax.com/en/archived/cql/3.0/cql/cql_reference/describe_r.html"));
