import { getKnex } from "../../knex"
import nodemailer from "nodemailer"
import { getEventData } from "./events"
import { fDateTime } from "../../utils/fDateTime"

export const getEventParticipantsData = async event_id => {
  const knex = getKnex()
  const participant = await knex("participants").where({ event_id })

  if (!participant) {
    return null
  }

  return participant
}

async function sendMail(event, email, url) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <style>
      table,
      td,
      div,
      h1,
      p {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; background: #ffffff">
      <tr>
        <td align="center" style="padding: 0">
          <table role="presentation" style="width: 720px; border-collapse: collapse; border: 1px solid #cccccc; border-spacing: 0; text-align: left">
            <tr>
              <td align="left" style="padding: 40px 30px 0">
                <h1>You're in! Get ready for your upcoming experience</h1>
              </td>
            </tr>
            <tr>
              <td align="left" style="padding: 0 30px 30px">
                <p style="font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif">Everything you need to know all in one place.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 30px 42px 30px">
                <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
                  <tr>
                    <td style="padding: 0 0 36px 0; color: #153643">
                      <h1 style="font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif">${event.title}</h1>
                      <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif; color: #767676">
                        ${event.description}
                      </p>
                    </td>
                    <td>
                      <img src="${url}" width="186px"/>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #153643">
                      <h1 style="font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif">When</h1>
                      <p style="margin: 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif; color: #767676">${fDateTime(event.start)}</p>
                      <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif; color: #767676">${fDateTime(event.end)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
                        <tr>
                          <td style="width: 20px; padding: 0; vertical-align: top; color: #153643">
                            <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_4_2x.png#" height="20px" />
                          </td>
                          <td style="width: 20px; padding: 0; font-size: 0; line-height: 0">&nbsp;</td>
                          <td style="padding: 0; vertical-align: top; color: #153643">
                            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${new Date(event.start).toISOString().replaceAll(/[\.\:\-]+/g, "")}/${new Date(
      event.end
    )
      .toISOString()
      .replaceAll(/[\.\:\-]+/g, "")}&details=${event.description}&text=${event.title}" style="color: #000; text-decoration: underline">Add to google calender</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background: #ee4c50">
                <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; font-size: 9px; font-family: Arial, sans-serif">
                  <tr>
                    <td style="padding: 0; width: 50%" align="left">
                      <p style="margin: 0; font-size: 14px; line-height: 16px; font-family: Arial, sans-serif; color: #ffffff">
                        &reg; Someone, Somewhere 2021<br /><a href="http://www.example.com" style="color: #ffffff; text-decoration: underline">Unsubscribe</a>
                      </p>
                    </td>
                    <td style="padding: 0; width: 50%" align="right">
                      <table role="presentation" style="border-collapse: collapse; border: 0; border-spacing: 0">
                        <tr>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a href="http://www.twitter.com/" style="color: #ffffff"
                              ><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                          <td style="padding: 0 0 0 10px; width: 38px">
                            <a href="http://www.facebook.com/" style="color: #ffffff"
                              ><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height: auto; display: block; border: 0"
                            /></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`, // html body
  })

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, email, event_id } = req.body
      const knex = getKnex()
      const event = await getEventData(event_id)
      if (!event) return res.status(404)
      const participant = await (await knex("participants").insert({ name, email, event_id }).returning("*"))[0]
      const url = `http://${req.headers.host}/api/qrcode/${event_id}`
      sendMail(event, email, url).catch(console.error)

      res.status(200).json({ participant: true })
    }
  } catch (r) {
    console.error(r)
    res.status(500).json(r)
  }
}
