var base = require('controller');
var members = Alloy.Collections.members;

function groupListReload(e) {
    groups.first({ success: e.hide, error: e.hide });
}

function memberListReload(e) {
    base.reloadListView(members, e);
}

// demo
function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

$.search.addEventListener('return', function(e) {
    console.log(e.value);
});

$.search.addEventListener('change', function(e) {
    console.log(e.value);
});


$.drawer.open();

//$.win.addEventListener('close', function() {});
