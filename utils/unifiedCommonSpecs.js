const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
exports.tokens = require('../api/loginToken');
exports.addNewGiftCard = require('../api/addNewGiftCard');
exports.getGiftCards = require('../api/getGiftCards');
exports.getSpecificGiftCard = require('../api/getSpecificGiftCard');
exports.deleteCard = require('../api/deleteGiftCard');
exports.baseUrl = require('../api/baseUrl');
exports.registerUser = require('../api/registerUser');
