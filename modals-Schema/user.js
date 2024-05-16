const mong = require('mongoose')

const user_details = new mong.Schema({
    username : {
        type : String ,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type: String ,
        require : true
    }
}
)

const user_detail =  mong.model('user_details', user_details)

module.exports = {user_detail}
