// base controller

function parseOptions(event, options) {
    if (!options) {
        options = {};
    }

    if (event) {
        if (options.success) {
            var successCallback = options.success;
            options.success = function() {
                event.success();
                successCallback.call(this, arguments);
            }
        } else {
            options.success = function () {
                event.success();
            };
        }

        if (options.error) {
            var errorCallback = options.error;
            options.error = function() {
                event.error();
                errorCallback.call(this, arguments);
            }
        } else {
            options.error = function () {
                event.error();
            };
        }
    }

    return options;
}

// handle infinite scroll with no buffer
exports.listView = {
     reload: function (collection, e, opts) {
        // $el = e.source
        opts = parseOptions(e ? {
            success: e.hide,
            error: e.hide
        } : null, opts);

        if (collection.startup) {
            return collection.first(opts);
        }

        return collection.back(opts);
    },

    more: function(collection, e, opts) {
        opts = parseOptions(e ? {
            success: collection.ended ? e.done : e.success,
            error: function() {
                e.error(L('isError', 'Tap to try again...'));
            }
        } : null, opts);

        if (collection.ended) {
            return collection.last(opts);
        }

        return collection.next(opts);
    }
}
