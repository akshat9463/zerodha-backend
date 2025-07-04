const {model} = require('mongoose');
const {watchlistSchema} = require('../schemas/watchListSchema');

const watchlistModel = new model('watchList', watchlistSchema);

module.exports = {watchlistModel};