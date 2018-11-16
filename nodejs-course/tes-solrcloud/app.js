const Solr = require('electric-solr');
const handleError = (msg) => (err) => {
  console.error(msg, err.message); // eslint-disable-line no-console
  return process.exit(1);
};
const endpoints = {
  getSync: () => 'http://solr6-master-blue01-az1.development.tescloud.com:8983?core=internal-recruitment&path=/solr'
//  getSync: () => 'https://solr.development.tescloud.com:8983?collection=internal-recruitment&path=/solr'
};
const solrOptions = {
  "solr": {
    "endpointPattern": "jorges-endpoint",
    // "core": "internal-recruitment",
    // "index": "internal-recruitment",
    "autoCommit": false,
    "useHttps": false,
    "useBasicAuth": false,
    "username": "solr",
    "password": "Q!w2e3r4t5y6"
  }
}
const createSolr = (solrOptions) => () =>
  new Promise((resolve, reject) => {
    const solrComponent = new Solr({ promisify: true });
    solrComponent.start(solrOptions, endpoints, (err, solrClient) => {
      if (err) return reject(err);
      return resolve(solrClient);
    });
  }).catch(handleError('There was a problem creating the Solr client'));
let sc;
let results;
const initSolr = createSolr(solrOptions);
initSolr().then((s) => { sc = s; }).then(() => sc.search('*:*')).then((r) => { results = r; }).catch((e) => console.log(e));
