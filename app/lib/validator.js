// @see https://github.com/square/lgtm/wiki
var LGTM = require('lgtm'),
    Q = require('q')
;

LGTM.configure('Promise', Q.Promise);
LGTM.configure('get', function(model, property) {
    return model.get(property);
});

LGTM.helpers.register('isEven', function(message) {
  this.using(function (value) { return value % 2 === 0; }, message);
});

exports.LGTM = LGTM;
