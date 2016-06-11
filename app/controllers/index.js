var base = require('controller');
var members = Alloy.Collections.members;

function groupListReload(e) {
    groups.first({ success: e.hide, error: e.hide });
}

function memberListReload(e) {
    base.listView.reload(members, e);
}

function memberListLoadMore(e) {
    base.listView.more(members, e);
}

// demo
function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

$.memberListIS.init($.memberList);

$.drawer.open();

//$.activityIndicator.show();

//$.win.addEventListener('close', function() {});
