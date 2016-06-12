var Base = require('controller');
var members = Alloy.Collections.members;

function reload(e) {
    Base.listView.reload(members, e);
}

function loadMore(e) {
    Base.listView.more(members, e);
}

function onListViewGroupItemClick(e) {
    var item = e.source.sections[0].getItemAt(e.itemIndex);

    Base.navicateTo('group/form', {
        $model: Alloy.Collections.groups.get(item.data.id)
    });
}

// infiniteScroll init
$.ISList.init($.listView);
