import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import React from "react"

export default function Calender({ events }) {
  return (
    <FullCalendar
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "timeGridDay,timeGridWeek,dayGridMonth",
      }}
      plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      nowIndicator
      weekends
      editable={false}
      events={events}
      height={"100%"}
    />
  )
}
