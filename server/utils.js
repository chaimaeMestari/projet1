// Dependencies
const nodemailer = require("nodemailer")
const { google } = require("googleapis")

// Library container
const lib = {}

/**
 * Random string generator
 * @param length 
 * @returns 
 */
lib.randomString =  (length) => {
    const charSet = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890"
    let res = ""
    for(let i = 0; i < length; i++){
        res += charSet[Math.floor(Math.random()*charSet.length)]
    }

    return res
}

/**
 * 
 */
lib.generateEmailVerificationCode = () => {
    const charSet = "1234567890"
    let res = ""
    for(let i = 0; i < 6; i++){
        res += charSet[Math.floor(Math.random()*charSet.length)]
    }

    return res
}

/**
 * Send email
 */
lib.sendMail = async ({from, to, subject, text, html}) => {
    try{
        const oAuth2Client = new google.auth.OAuth2(process.env.OAUTH2_CLIENT_ID, process.env.OAUTH2_CLIENT_SECRET, process.env.OAUTH2_REDIRECT_URI)
        oAuth2Client.setCredentials({
            refresh_token: process.env.OAUTH2_REFRESH_TOKEN
        })
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: "no-reply@socializus.net",
                clientId: process.env.OAUTH2_CLIENT_ID,
                clientSecret: process.env.OAUTH2_CLIENT_SECRET,
                refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const options = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html
        }

        const result = await transport.sendMail(options)
        return result

    } catch(err) {
        return err
    }
}

module.exports = lib