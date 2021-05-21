/* eslint-disable no-underscore-dangle */
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
  timeout: 12000,
});

function getOneGiftId(data) {
  return data.data[0]._id;
}

module.exports.submitRequest = (done, params) => {
  const request = {
    method: 'GET',
    url: `${params.baseUrl}/api/giftcards`,
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-type': 'application/json; charset=utf-8',
    },
    timeout: 60000,
  };
  instance(request)
    .then((res) => {
      logger.info('getGiftCards: ', request.url);
      logger.info('getGiftCards response', res.data);
      params.id = getOneGiftId(res.data);
      assert.equal(res.status, 200);
      const obj = res.data.data;
      _.forEach(obj, ((e) => {
        assert.exists(e._id);
        assert.exists(e.owner);
        assert.exists(e.vendor);
      }));
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      done(err);
    });
};
