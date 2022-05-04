import { getKnex } from "../../knex"

export const getEventParticipantsData = async event_id => {
  const knex = getKnex()
  const participant = await knex("participants").where({ event_id })

  if (!participant) {
    return null
  }

  return participant
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, email, event_id } = JSON.parse(req.body)
      const knex = getKnex()
      const participant = await (await knex("participants").insert({ name, email, event_id }).returning("*"))[0]
      res.status(200).json({ participant })
    }
  } catch (r) {
    console.error(r)
    res.status(500).json(r)
  }
}
