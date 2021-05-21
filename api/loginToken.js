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
    email: params.email,
    password: (params.password).toString(),
  };
  const request = {
    method: 'POST',
    url: `${params.baseUrl}/api/users/tokens`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    timeout: 60000,
  };
  instance(request)
    .then((res) => {
      logger.info('loginToken req: ', request.url, body);
      logger.info('loginToken res: ', res.data);
      assert.equal(res.status, 200);
      assert.exists(res.data.data.token);
      params.token = res.data.data.token;
      done();
    })
    .catch((err) => {
      utils.handleErrorResponse(request.url, err, params, logger);
      utils.assertErrorResponse(400, 'Either email or password is invalid', true, params);
      done(err);
    });
};
