const express = require("express");
const app = express();
const { v4: uuid } = require('uuid');
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
// app.use(methodOverride('_method'));
const path = require("path");
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
port = 3000;

let comments = [
    {
        id: uuid(),
        username:"Elin",
        comment:"great job"
    },
    {
        id:uuid(),
        username:"Yusuke",
        comment:"difficult"
    },
    {
        id:uuid(),
        username:"a",
        comment:"easy"
    },
    {
        id:uuid(),
        username:"Simran",
        comment:"I'm crazy"
    }
]


app.get("/comments",(req,res)=>{
    res.render("comments/index",{comments});
});

//create
app.get("/comments/new",(req,res)=>{
    res.render("comments/new");
});

app.post("/comments",(req,res)=>{
    const {username,comment} = req.body;
    comments.push({comment,username,id:uuid()});
    res.redirect("/comments");
});

//Read
app.get("/comments/:id",(req,res)=>{
    const {id} =req.params;
    const comment = comments.find(c => (c.id) === id);
    res.render("comments/show",{comment});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//Edit & Update
//Edit
app.patch("/comments/:id",(req,res)=>{
    const { id } = req.params; //idを取得
    const newCommentText = req.body.comment; //フォームで送ったコメントを取得
    const foundComment = comments.find(c => c.id === id); //idと一致したコメントを取得

    foundComment.comment = newCommentText //修正コメントをコメントで置き換えする
    res.redirect("/comments");
});
//Update
app.get("/comments/:id/edit", (req,res)=>{
    const {id} =req.params;
    const comment = comments.find(c => (c.id) === id);
    res.render("comments/edit",{comment});
});


//Delete
app.delete("/comments/:id",(req,res)=>{
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
});