$.drawer.open();

function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

//var group = new Alloy.Collections.groups.model({name: 'Sample'});

