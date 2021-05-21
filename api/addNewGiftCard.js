const { assert } = require('chai');
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
  const body = {
    title: 'Amazon Gift Card',
    vendor: 'Amazon',
    amount: 1000,
    year: 2021,
  };

  const request = {
    method: 'POST',
    url: `${params.baseUrl}/api/giftcards`,
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-type': 'application/json; charset=utf-8',
    },
    data: body,
  };
  instance(request)
    .then((res) => {
      logger.info('addNewGiftCard req: ', request.url, body);
      logger.info('addNewGiftCard res: ', res.data);
      assert.equal(res.status, 201);
      assert.exists(res.data.data._id);
      assert.exists(res.data.data.amount);
      assert.equal(res.data.data.vendor, body.vendor);
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      done(err);
    });
};
