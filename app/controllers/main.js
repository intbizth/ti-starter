var base = require('controller');
var members = Alloy.Collections.members;

function reload(e) {
    base.listView.reload(members, e);
}

function loadMore(e) {
    base.listView.more(members, e);
}

// infiniteScroll init
$.ISList.init($.listView);
