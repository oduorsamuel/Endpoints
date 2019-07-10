const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let lessonContentSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    LessonId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Lessons',
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required:true
    },
    POS: {
        type: Number,
        required: true
    },
    Language: {
        type: String,
        default: null
    },
    CanvasWidth: {
        type: Number,
        default: 540
    },
    CanvasHeight: {
        type: Number,
        default: 540
    },
    PartFile: {
        type: String,
    },
    IsDeleted: {
        type: Number,
        default: 0
    },
    DeletedAt: {
        type: Date,
        default: null
    },
    DeletedBy: {
        type: String,
        default: null
    },
    UpdatedAt: {
        type: Date,
        default: null
    },
    UpdatedBy: {
        type: String,
        default: null
    }
},
    { versionKey: false })
module.exports = Lessons = mongoose.model('LessonContent', lessonContentSchema);