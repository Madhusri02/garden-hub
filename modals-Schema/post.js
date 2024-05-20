const mong = require('mongoose')

const post = new mong.Schema({
    username : {
        type : String ,
        // required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        // required : true
    },
    image : {
        type : String,
        // required : true
    },
    like : {
        type : Number,
        default : 0


    },
    comment : {
        type : String
    }
})

const post_detail = mong.model("post-details" , post)

module.exports = {post_detail}
