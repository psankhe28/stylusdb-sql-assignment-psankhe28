const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    try {
        const { fields, table } = parseQuery(query);
        const data = await readCSV(`${table}.csv`);

        // If the file is empty or data is not in expected format
        if (!Array.isArray(data) || data.length === 0) {
            return { error: 'Empty or invalid data in CSV file' };
        }

        // Filter the fields based on the query
        return data.map(row => {
            const filteredRow = {};
            fields.forEach(field => {
                filteredRow[field] = row[field];
            });
            return filteredRow;
        });
    }
    catch (error) {
        return { error: 'An error occurred while processing the query' };    }
}

module.exports = executeSELECTQuery;