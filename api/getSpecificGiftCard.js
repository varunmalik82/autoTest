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
    url: `${params.baseUrl}/api/giftcards/${params.id}`,
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-type': 'application/json; charset=utf-8',
    },
  };
  instance(request)
    .then((res) => {
      logger.info('getSpecificGiftCard req: ', request.url);
      logger.info('getSpecificGiftCard res:  ', res.data);
      assert.equal(res.status, 200);
      assert.exists(res.data.data._id);
      assert.exists(res.data.data.owner);
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      utils.assertErrorResponse(400, 'No match for specified giftcards id.', true, params);
      done(err);
    });
};
