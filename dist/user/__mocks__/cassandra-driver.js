"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cassandraDriver = jest.genMockFromModule('cassandra-driver');
cassandraDriver.__query = "";
cassandraDriver.Client.execute = (query) => {
    cassandraDriver.__query = query;
};
exports.default = cassandraDriver;
//# sourceMappingURL=cassandra-driver.js.map