// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getKnex } from "../../../knex"

export default async function handler(req, res) {
  try {
    const { event_id } = req.query
    console.log(req.query)
    if (req.method === "DELETE" && event_id) {
      console.log(req.query)

      const knex = getKnex()
      const event = await knex("events").where({ id: event_id }).first().delete()
      res.status(200).send("Success")
    } else res.status(404).send("Not Found")
  } catch (r) {
    console.error(r)
    res.status(500).json(r)
  }
}
