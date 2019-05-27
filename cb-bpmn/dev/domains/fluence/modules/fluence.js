/**
 * @class Fluences
 */
class Fluences {
    constructor() {
        const self = this;

        self.crudmongo = new CRUDMongo({
            timer: true,
            name: 'fluence'
        });

        self.crudmongo.setSchema({
            processName: { type: String },
            processId: { type: String, required: true, index: true },
            processToken: { type: String },
            properties: { type: Object },
            state: { type: Object },
            pendingTimeouts: { type: Object },
            views: { type: Object }
        });

        let idxs = [
            {type: {'properties.info.orgId': 1, 'history.createdAt': -1, 'history.finishedAt': -1}},
            {type: {'properties.info.orgId': 1, 'history.createdAt': -1}},
            {type: {'properties.info.orgId': 1, 'history.finishedAt': -1}},
            {type: {'properties.info.orgId': 1, 'properties.info.userId': 1}},
            {type: {'properties.info.orgId': 1, 'properties.participants': 1}},
            {
                type: {
                    "$**": "text",
                    "history.historyEntries": "text",
                    "properties": "text"
                },
                options: {
                    "v": 2,
                    "name": "$**_text",
                    "ns": "cloudbrasil.fluences",
                    "weights": {
                        "$**": 1,
                        "history.historyEntries": 10,
                        "properties": 1
                    },
                    "default_language": "portuguese",
                    "language_override": "language",
                    "textIndexVersion": 3
                }
            },
        ];
        self.crudmongo.createIndexes(idxs);
    }
}

module.exports = new Fluences();
