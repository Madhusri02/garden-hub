const express = require("express")
const route = require("router")
const {getPost} = require('./controller/postController.js')


router.route("/getpost").post("getPost")