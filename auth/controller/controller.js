const User = require("../models/user")
const bcrypt = require("bcrypt")
const { findOne } = require("../models/user")
const nodemailer = require("nodemailer")
const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/Users', {
    useNewUrlParser: true, 

    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB bağlantısı başarılı');
    })
    .catch(err => {
        console.error('MongoDB bağlantı hatası:', err);
    });

async function register(req, res) {
    const { username, email, first_name, last_name, password, check_password } = req.body
    if (password == check_password) {
        try {
            const user = User.findOne({ email: email })
            if (user==null) {
                res.send("emaile ait kullanıcı var")
            } else {
               

                res.cookie('u_username', username, { maxAge: 86400000, httpOnly: true });
                res.cookie('u_email', email, { maxAge: 86400000, httpOnly: true });
                res.cookie('u_first_name', first_name, { maxAge: 86400000, httpOnly: true });
                res.cookie('u_last_name', last_name, { maxAge: 86400000, httpOnly: true });
                res.cookie('u_password', password, { maxAge: 86400000, httpOnly: true });

                const randomNumber = Math.floor(100000 + Math.random() * 900000);
                const numberStr=randomNumber.toString()
                res.cookie('factor', numberStr, { maxAge: 86400000, httpOnly: true });
                

                
                const transporter=nodemailer.createTransport({
                    service:'Gmail',
                    auth:{
                      user:'kacarberkee@gmail.com',
                      pass:"tffmrukljpzflefg"
                    }
                  })

                  const mailOption={
                    from:"kacarberkee@gmail.com",
                    to:email,
                    subject:"Verification code",
                    text:numberStr
                  }
                  transporter.sendMail(mailOption,(err,data)=>{
                      if(err){
                        console.log('error')
                      }
                      console.log('mail attım')
                  })
                  res.send("tamam")

            }
        } catch (err) {
            res.send("hata")
        }
    } else {
        res.send("şifreler uyuşmuyor")
    }
}

async function verify(req,res){
    const username = req.cookies.u_username
    const code = req.cookies.factor
    const email = req.cookies.u_email
    const first_name= req.cookies.u_first_name
    const last_name= req.cookies.u_last_name
    const password = req.cookies.u_password

    const {v_code} = req.body

    if(v_code == code){
         const newUser = new User({
                    username: username,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    password: password
                })

                newUser.save()
                    .then(savedUser => {
                        res.send("kaydedilen kullanıcı ")
                    })
                    .catch(err => {
                        res.send("kullanıcı kayıt edilemedi")
                    })
    }else{
        res.send("kimlik doğrulama kodları eşleşmiyor.")
    }
    
}

module.exports = {register,verify}

