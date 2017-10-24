const cassandraDriver: any = jest.genMockFromModule('cassandra-driver');

// cassandraDriver.__query = "";
// cassandraDriver.Client.execute = (query : string) => {
//         cassandraDriver.__query = query;
// };

cassandraDriver.__query = "";
cassandraDriver.Client = jest.fn(() => ({  
        execute: (query : string) => {
                console.log(query);
                cassandraDriver.__query = query;
        },
}));

export default cassandraDriver;

