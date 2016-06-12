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
                // TODO: custom message
                e.error(L('isError', 'Tap to try again...'));
            }
        } : null, opts);

        if (collection.ended) {
            return collection.last(opts);
        }

        return collection.next(opts);
    }
}

// TODO: now supported ios: <NavigationWindow>
exports.navicateTo = function (view, options) {
    // $container -> NavigationWindow
    Alloy.Globals.$container.openWindow(
        Alloy.createController(view, options).getView(),
        {
            animated: true
        }
    );
}

exports.create = function (view, options) {
    return Alloy.createController(view, options);
}

// @deprecated so magice ?
exports.applyModelData = function(model, controller, columns) {
    if (!columns) {
        columns = [];

        for(var key in model.config.columns) {
            columns.push(key);
        }
    }

    _.each(columns, function(key) {
        if (controller.hasOwnProperty(key)) {
            model.set(key, controller[key].value); // TODO: value | text ?
        }
    });
}
