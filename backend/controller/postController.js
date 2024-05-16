const {post_detail} = require('../modals-Schema/post.js')

const getPost = async(req, res)=>{
    const postid = req.params.postid;
    console.log(postid)
    if(postid == "" || postid == undefined){
        return res.status(400).json({error:true, 
            message:"Enter proper id"})
    }
    try{
        const doc = await post_detail.findOne({_id:postid});
        if(doc === null){
            return res.status(402).json({error:true, message:"detail not found"});
        }
        return res.status(200).json({error:false, message:doc})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error:true, message:err.message})
    }
}

module.exports = {getPost}