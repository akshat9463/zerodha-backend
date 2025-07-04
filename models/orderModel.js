const {model} = require('mongoose');

const {OrderSchema} = require('../schemas/orderSchema');

const OrderModel = new model('Order', OrderSchema);

module.exports = {OrderModel};