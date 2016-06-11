// base controller

exports.reloadListView = function (collection, e, opts) {
    // $el = e.source

    if (!opts) {
        opts = {};
    }

    if (e) {
        if (opts.success) {
            var successCallback = opts.success;
            opts.success = function() {
                e.hide();
                successCallback.call(this, arguments);
            }
        } else {
            opts.success = e.hide;
        }
        
        if (opts.error) {
            var errorCallback = opts.error;
            opts.error = function() {
                e.hide();
                errorCallback.call(this, arguments);
            }
        } else {
            opts.error = e.hide;
        }
    }

    return collection.first(opts);
}
