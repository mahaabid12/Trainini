const nodemailer=require('nodemailer'); 

const sendEmail=(options)=>{
   

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b2a9ebd5ab7be4",
          pass: "96f91040994eda"
        }
      });

    const mailOptions={
        from: process.env.EMAIL_FROM, 
        to:options.to, 
        subject:options.subject, 
        html:options.text
    }

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

module.exports=sendEmail

