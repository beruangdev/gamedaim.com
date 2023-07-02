import env from "env"
import nodemailer from "nodemailer"

interface SendEmailProps {
  to: string
  subject: string
  text?: string
  html?: string
  amp?: string
}

export async function sendEmail(props: SendEmailProps) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.USER_MAIL,
        pass: env.PASSWORD_MAIL,
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.USER_MAIL,
      ...props,
    }

    const info = await transporter.sendMail(mailOptions)
    return {
      status: true,
      data: info,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: false,
        message: error.message,
      }
    } else {
      return {
        status: false,
        message: "An unknown error occurred.",
      }
    }
  }
}

interface VerifyEmailProps {
  email: string
  verificationCode: string
}

export async function verifyEmail(props: VerifyEmailProps) {
  const { email, verificationCode } = props

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.USER_MAIL,
        pass: env.PASSWORD_MAIL,
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    }

    const info = await transporter.sendMail(mailOptions)
    return {
      status: true,
      data: info,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: false,
        message: error.message,
      }
    } else {
      return {
        status: false,
        message: "An unknown error occurred.",
      }
    }
  }
}

export async function sendVerificationCodeEmail({
  to,
  token,
  baseURL,
}: {
  to: string
  token: string
  baseURL: string
}) {
  const url = `${baseURL}/auth/reset-password?token=${token}`
  const subject = "Reset Password"
  const html = `<!DOCTYPE html>
  <html ⚡4email>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      /* Custom styles for your email */
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 24px;
      }
      p {
        margin-bottom: 20px;
        color: #333333;
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Password</h1>
      <p>Dear ${to},</p>
      <p>We received a request to reset your password. Please click the button below to reset your password:</p>
      <p><a class="button" href="${url}">Reset Password</a></p>
      <p>If you didn't request a password reset, please ignore this email.</p>
    </div>
  </body>
  </html>
  `

  return await sendEmail({
    to,
    subject,
    html: html,
  })
}
