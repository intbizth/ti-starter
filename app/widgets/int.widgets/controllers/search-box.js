var hasSearch = false,
    collection = Alloy.Collections[$.args.collection]
;

// setup via other controller.
$.setup = function(config) {
    _.extend($.args, config);
};

if (OS_IOS) {
} else if (OS_ANDROID) {
}

$.search.addEventListener('return', function(e) {
    hasSearch = true;
    collection.search(e.value);
});

// TODO: implement delay change support `return|enter` for seach
$.search.addEventListener('change', function(e) {
    if (hasSearch && !e.value) {
        hasSearch = false;

        setTimeout(function () {
            collection.search(null);
        }, null === $.args.delay ? 2000 : $.args.delay);
    }
});
