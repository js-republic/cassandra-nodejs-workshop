"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cassandra_driver_1 = require("cassandra-driver");
exports.CassandraClient = new cassandra_driver_1.Client({ contactPoints: ['127.0.0.1'], keyspace: "examples" });
//# sourceMappingURL=cassandra-client.database.js.map