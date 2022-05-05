import { Box } from "@mui/material"
import React from "react"
import Calender from "../../../components/Calender"
import { getEventsData } from "../../api/events"

export default function CalenderView({ events }) {
  return (
    <Box p={2} height="100vh">
      <Calender events={events} />
    </Box>
  )
}
export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()
  return { props: JSON.parse(JSON.stringify({ events })) }
}
