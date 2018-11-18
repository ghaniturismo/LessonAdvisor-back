import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { Schema } from 'mongoose';

@MongoModel({
    adapter: 'mongoose',
    collection: 'lesson',
    options: Config.get('mongodb')
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
            numberOfPerson: Number,
            comments: [{
                user: { type: Schema.Types.ObjectId, ref: 'users' },
                rating: {
                    type: Number,
                    required: true
                },
                text: {
                    type: String,
                    required: true
                }
            }]
        }, {
            versionKey: false
        });

        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    ret.comments.forEach(v => {
                        v.id = v._id.toHexString();
                        delete v._id }
                    );
                    return ret;
                }
            }
        );
    }
}
