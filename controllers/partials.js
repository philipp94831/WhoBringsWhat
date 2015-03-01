module.exports.get_partial = function(req, res, next) {
  res.render('partials/' + req.params.partial + '/' + req.params.view, { title: 'WhoBringsWhat' });
};