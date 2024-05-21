const moong =require('mongoose');
const ex = require('express');
const body_parser = require('body-parser')
const cor = require('cors')
const {post_detail} = require('./modals-Schema/post.js')
const {user_detail} = require('./modals-Schema/user.js')

// image uplodaer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

 
const run = ex()
run.use(ex.json());
run.use(cor());
run.use(body_parser.json());

async function connecto_data(){
    try{
    await moong.connect('mongodb+srv://user123:user123@cluster0.dfxtlcr.mongodb.net/Gardenhivehub?retryWrites=true&w=majority&appName=Cluster0')     
    const port = process.env.PORT  || 8000
    run.listen(port , function(){
        // console.log("1")
        console.log("listening at",port , " !")
        })
    }
    catch(error){
        console.log("error : ",error)
    }
}

connecto_data()

run.get('/get-post' , async function(request , response){
    try{
        const exp_data = await post_detail.find()
        response.status(200).json(exp_data)
        console.log("done everything !")
        }
        catch(error) {
            response.status(500).json({
                "status" : "not connected" ,
                "context" : "entry not available !"
            })
        }
})

run.get('/get-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await post_detail.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: 'failure',
                content: 'Post not found'
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            content: 'corrupted',
            error: error.message
        });
    }
});

run.patch('/get-post/update' , async function(request , response){
    try{
        const new_data = post_detail.findById(request.body.id)
        try{
            if(new_data){
                await new_data.updateOne({
                    "username" : request.body.username,
                    "title" : request.body.title ,
                    "image" : request.body.image ,
                    "like" : request.body.like ,
                    "comment" : request.body.comment
                })
                response.status(200).json({
                    "status" : "updated !"
                })
            }
        }
        catch(error){
            response.status(500).json({
                "status" : "error4" , 
                "error" : error 
            })
        }
    }
    catch(error){
        response.status(500).json({
            "status" : "error !" , 
            "error" : error
        })
    }
})


run.post('/create-post', async (req, res) => {
    try {
        console.log("2");
        const title = req.body.title;
        const description =  req.body.description;
        const image = req.body.image;
        await post_detail.create({title : title , description : description , image : image});
        return res.status(200).json({ status: 'success', content: 'created' });
    } 
    catch (er) {
       return  res.status(500).json({ status: 'failure', content: 'corrupted', error: er.message });
    }
});


run.post('/create-user' , async function(request , response){
    try{
        console.log("15")
        await user_detail.create({
            "username" : request.body.username,
            "password" : request.body.password ,
            "email" : request.body.email
        })
        response.status(200).json({
            "status" : "success" ,
            "content" : "created"
        })
    }
    catch(er){
        response.status(500).json({
            "status" : "failure" , 
            "content" : "corrupted" ,
            "error" : er
        })
    }
})