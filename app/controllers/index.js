
Alloy.Globals.$container = $.container;

// demo
function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

$.drawer.open();

//$.activityIndicator.show();

//$.win.addEventListener('close', function() {});
