const { assert } = require('chai');
const _ = require('lodash');
const axios = require('axios');
const https = require('https');
const utils = require('../utils/commonUtils');
const logger = require('../utils/logger');

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

module.exports.submitRequest = (done, params) => {
  const request = {
    method: 'GET',
    url: `${params.baseUrl}`,
    headers: {
      'x-api-key': params.apiKey,
      'Content-type': 'application/json; charset=utf-8',
    },
  };
  instance(request)
    .then((res) => {
      logger.log('baseUrl: ', request.url);
      logger.log('baseUrl res: ', res.data);
      assert.equal(res.status, 200);
      assert.equal(res.data.STATUS, 'Valid key', `Invalid API Key - ${params.apiKey}`);
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      utils.assertErrorResponse(401, 'Invalid API key', true, params);
      done(err);
    });
};
