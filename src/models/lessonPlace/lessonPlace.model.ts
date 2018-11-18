import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';

@MongoModel({
    adapter: 'mongoose',
    collection: 'lessonplaces',
})
export class LessonPlaceModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(LessonPlaceModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            name_teacher: {
                type: String,
                required: true
            },
            email: String,
            phone: String,
            website: String,
            address: {
                street: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: Number,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                }
            },
            description: String,
            numberOfPerson: Number
    }, {
            versionKey: false
        });

        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    return ret;
                }
            }
        );
    }
}
