const {model} = require('mongoose');

const {positionSchema} = require('../schemas/positionSchema');

const PositionModel = new model('Position', positionSchema);

module.exports = {PositionModel};