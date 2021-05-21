/* eslint-disable no-underscore-dangle */
const { assert } = require('chai');
const axios = require('axios');
const https = require('https');
const chance = require('chance').Chance();
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
    email: chance.email({ domain: 'gmail.com' }),
    password: '123456',
  };

  const request = {
    method: 'POST',
    url: `${params.baseUrl}/api/users/register`,
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    data: body,
  };
  instance(request)
    .then((res) => {
      logger.info('registerUser req: ', request.url, body);
      logger.info('registerUser res: ', res.data);
      params.email = body.email;
      params.password = body.password;
      assert.equal(res.status, 201);
      assert.equal(res.data.data.email, body.email, 'email id didn\'t match');
      assert.exists(res.data.data._id);
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      utils.assertErrorResponse(400, 'Email address already in use', true, params);
      done(err);
    });
};
