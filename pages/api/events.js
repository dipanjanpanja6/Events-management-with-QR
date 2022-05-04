// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getKnex } from "../../knex"

export const getEventsData = async () => {
  const knex = getKnex()
  const events = await knex("events")

  if (!events.length) {
    return null
  }

  return events
}
export const getEventData = async id => {
  const knex = getKnex()
  const event = await knex("events").where({ id }).first()
  if (!event) {
    return null
  }

  return event
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { title, start, end, description } = req.body
      const knex = getKnex()
      const event = await (await knex("events").insert({ title, start, end, description }).returning("*"))[0]
      res.status(200).json({ event })
    }
  } catch (r) {
    console.error(r)
    res.status(500).json(r)
  }
}
