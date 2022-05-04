import qr from "qrcode"

export default async function handler(req, res) {
  try {
    const { event_id } = req.query
    if (!event_id) {
      res.status(404).send("Empty Data!")
    }
    qr.toBuffer(`http://${req.headers.host}/events/${event_id}`, { errorCorrectionLevel: "H", scale: 8 }, (err, src) => {
      if (err) res.status(500).send("Error occured")
      res.setHeader("Content-Type", "image/png")
      res.send(src)
    })
  } catch (r) {
    console.error(r)
    res.status(500).send("Internal server error.")
  }
}
