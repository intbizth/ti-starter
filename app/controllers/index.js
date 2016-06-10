$.drawer.open();

function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

//var group = new Alloy.Collections.groups.model({name: 'Sample'});

function groupListReload(e) {
    Alloy.Collections.groups.fetch({
        success: e.hide,
        error: e.hide
    });
}

function memberListReload(e) {
	Alloy.Collections.members.next({
		success: e.hide,
		error: e.hide
	});
}
