import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Box } from "@mui/material"
import React from "react"
import { getEventsData } from "../../api/events"

export default function Calender({ events }) {
  return (
    <Box p={2} height="100vh">
      <FullCalendar plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]} initialView="dayGridMonth" nowIndicator weekends editable={false} events={events} height={"100%"} />
    </Box>
  )
}
export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()
  return { props: JSON.parse(JSON.stringify({ events })) }
}
