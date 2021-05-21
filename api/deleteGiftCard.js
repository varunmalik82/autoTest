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

module.exports.submitRequest = (done, params) => {
  const request = {
    method: 'DELETE',
    url: `${params.baseUrl}/api/giftcards/${params.id}`,
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-type': 'application/json; charset=utf-8',
    },
    timeout: 60000,
  };
  instance(request)
    .then((res) => {
      logger.info('deleteGiftCard: ', request.url);
      logger.info('deleteGiftCard res: ', res.data);
      assert.equal(res.status, 200);
      assert.exists(res.data.data._id);
      assert.exists(res.data.data.message);
      assert.equal(res.data.data.message, 'Delete Success');
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      utils.assertErrorResponse(400, 'Invalid giftcards id', true, params);
      done(err);
    });
};
