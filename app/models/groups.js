var BaseCollection = require('collection');

exports.definition = BaseCollection.initCollection({
	config: {
		URL: "http://demo.moboque.com/api/appregist/groups/",
		columns: {
			"id": "integer",
		    "name": "string",
		    "enabled": "boolean"
		},
		adapter: {
			collection_name: "groups",
		}
	}
});
