var BaseCollection = require('collection');

exports.definition = BaseCollection.initCollection({
	api: '/members/',
	config: {
		columns: {
			"id": "integer",
		    "fullname": "string"
		},
		adapter: {
			collection_name: "members",
		}
	}
});
