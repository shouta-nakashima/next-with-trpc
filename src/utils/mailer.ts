import nodemailer from 'nodemailer'

export const sendEmail = async ({email,url,token}:{email:string,url:string,token:string}) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
      user:testAccount.user,
      pass:testAccount.pass
    }
  })

  const info = await transporter.sendMail({
    from:'"Shota Nakashima" <fantajista5.6nakaji.s@gmail.com>',
    to:email,
    subject:'ログインするにはクリックしてください。',
    html:` <a href="${url}/login#token=${token}">クリック</a>`
  })

  console.log(nodemailer.getTestMessageUrl(info))
}