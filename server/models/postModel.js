const { Schema, model } = require('mongoose');
const validator = require('validator');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        enum: [
            "Agriculture",
            "Business",
            "Education",
            "Entertainment",
            "Art",
            "Investment",
            "Uncategorized",
            "Weather"
        ],
        validate: {
            validator: function (value) {
                return validator.isIn(value, [
                    "Agriculture",
                    "Business",
                    "Education",
                    "Entertainment",
                    "Art",
                    "Investment",
                    "Uncategorized",
                    "Weather"
                ]);
            },
            message: 'Please enter a valid category'
        },
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required'],
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

}, { timestamps: true });




// EDIT POST....
postSchema.statics.editPost = async function (postId, title, category, description, thumbnail) {
    const updatedPost = await this.findByIdAndUpdate(postId, {
        title,
        category,
        description,
        thumbnail
    }, { new: true });

    if (!updatedPost) {
        throw new Error('Post could not be updated.');
    }

    return updatedPost;
};

const Post = model('Post', postSchema);

module.exports = Post;



