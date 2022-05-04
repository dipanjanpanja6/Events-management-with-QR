import React, { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import { getEventsData } from "../../api/events"
import { Box } from "@mui/material"

export default function Calender({ events }) {
  const calendarRef = useRef(null)
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("dayGridMonth")

  return (
    <Box p={2} height="100vh">
      <FullCalendar plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]} initialView="dayGridMonth" nowIndicator weekends editable={false} events={events} height={"100%"} />
    </Box>
  )
}
export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()
  console.log(events)
  // if (!events) {
  //   return { notFound: true }
  // }
  return { props: JSON.parse(JSON.stringify({ events })) }
}
