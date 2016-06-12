var BaseCollection = require('collection');

exports.definition = BaseCollection.initCollection({
    api: "/groups/",
    config: {
        columns: {
            "id": "integer",
            "name": "string",
            "enabled": "boolean"
        },
        adapter: {
            collection_name: "groups",
        }
    },
    validator: function (builder) {
        return builder
            .validates('name')
                .required("You must enter a group name.")
        ;
    },

    extendModel: {
        /*serialize: function(method) {
            // create your own serialize
        }*/
    }
});
