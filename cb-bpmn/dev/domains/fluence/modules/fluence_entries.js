/**
 * @class Fluences
 */
class FluenceEntries {
    constructor() {
        const self = this;

        self.crudmongo = new CRUDMongo({
            timer: true,
            name: 'fluence'
        });

        self.crudmongo.setSchema({
            orgProcessId: { type: String, required: true, index: true },
            processId: { type: String, required: true, index: true },
            name: { type: String },
            id: { type: String },
            type: { type: Object },
            data: { type: Array },
            begin: { type: Number },
            end: { type: Number }
        });
    }
}

module.exports = new FluenceEntries();
