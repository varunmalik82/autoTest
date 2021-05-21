const {
  baseUrl, registerUser, tokens, addNewGiftCard, getGiftCards, getSpecificGiftCard, deleteCard,
} = require('../utils/unifiedCommonSpecs');
const params = require('../utils/defaultParams');

describe('E2E test covering the whole workflow', () => {
  it('Validate Api Key', (done) => {
    baseUrl.submitRequest(done, params);
  });

  it('Register a New User', (done) => {
    registerUser.submitRequest(done, params);
  });

  it('Generate Login Token', (done) => {
    tokens.submitRequest(done, params);
  });

  it('Add New Gift Card', (done) => {
    addNewGiftCard.submitRequest(done, params);
  });

  it('Get All Gift Cards', (done) => {
    getGiftCards.submitRequest(done, params);
  });

  it('Get a Specific Gift Cards by ID', (done) => {
    getSpecificGiftCard.submitRequest(done, params);
  });

  it('Delete a Specific Gift Card by ID', (done) => {
    deleteCard.submitRequest(done, params);
  });
});
