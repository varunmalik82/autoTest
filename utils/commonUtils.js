const { assert } = require('chai');

module.exports.handleErrorResponse = (requestType, error, params, logger) => {
  if (error.response && error.response.data) {
    if ([400, 401].includes(error.response.status)) {
      params.error = error.response.data;
      params.errorCode = error.response.data.error.code;
      params.errorMessgae = error.response.data.error.message;
      params.requestStatus = error.response.status;
      logger.warn(params.requestStatus);
      logger.warn(params.errorMessgae);
    } else if (error.response.status === 403) {
      params.error = `${requestType} - Forbidden Error: ${error.response.status}`;
    } else if (error.response.status === 500) {
      params.error = `${requestType} - Internal Server Error: ${error.response.status}`;
    }
  } else {
    // assertion error
    params.error = `${error}`;
    logger.warn(requestType);
  }
  logger.warn(params.error);
};

module.exports.assertErrorResponse = (status, msg, flag, params) => {
  assert.equal(params.requestStatus, status);
  assert.equal(params.errorMessgae, msg);
  if (flag) {
    assert.exists(params.errorCode);
  }
};
