import express from "express";
// import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

const port = 3000;
const app =  express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



function qrGenerator(req, res, next) {
    

    const userInput = req.body["userInput"];
    var qr_svg = qr.image(userInput);
    const imgPath = "public/images/qr_img.png";
    
        qr_svg.pipe(fs.createWriteStream(imgPath));

        // fs.writeFile("genUserTextFile.txt", userInput, (err) => {
        //     if (err) throw err;
        //     console.log("The file has been saved!");
        // });

        res.locals.imgPath = "/images/qr_img.png";
        // res.locals.userText
        res.locals.userInput = userInput;

    next();
}



app.get("/", (req, res) =>{
    res.render("index.ejs")
})

app.use(qrGenerator);

app.post("/submit", qrGenerator, (req, res)=> {
    res.render("index.ejs", {
        qrImagePath : res.locals.imgPath,
        userInput : res.locals.userInput
    });
});

app.listen(port, () =>{
    console.log(`Server running at ${port}`)
});