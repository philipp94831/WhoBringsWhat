/* GET home page. */
module.exports.get_index = function(req, res, next) {
  res.render('index', { title: 'WhoBringsWhat' });
};