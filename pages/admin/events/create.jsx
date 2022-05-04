import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useState } from "react"
import AuthLayout from "../../../Layouts/AuthLayout"
import { getEventsData } from "../../api/events"

export default function Create({ events }) {
  const router = useRouter()
  const [state, setState] = useState({ title: "", start: "", end: "", description: "" })
  const [loading, setLoading] = useState(false)
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setLoading(true)
      const resp = await fetch("/api/events", { method: "POST", body: JSON.stringify(state), headers: { "Content-Type": "application/json" } })
      const data = await resp.json()
      setLoading(false)
      if (data.event) router.push(`/admin/events/${data.event.id}`)
      else window.alert(JSON.stringify(data))
    } catch (r) {
      console.log(r)
      window.alert(r)
      setLoading(false)
    }
  }
  return (
    <AuthLayout>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={8} p={4} bgcolor={"#fdfdfd"}>
          <FullCalendar plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]} initialView="dayGridMonth" nowIndicator weekends editable={false} events={events} height={"100%"} />
        </Grid>
        <Grid item md={4} component={Paper} elevation={2}>
          <Typography variant="h6" gutterBottom px={6} pt={6}>
            Create Event
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1, width: 1 },
              p: 6,
            }}
            autoComplete="off">
            <div>
              <TextField required name="title" label="Event name" value={state.title} onChange={handleChange} />
              <br />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type="datetime-local"
                required
                name="start"
                label="start Date"
                value={state.start}
                onChange={handleChange}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type="datetime-local"
                required
                name="end"
                label="end date"
                value={state.end}
                onChange={handleChange}
              />
              <br />
              <TextField
                required
                name="description"
                value={state.description}
                onChange={handleChange}
                label="Description"
                multiline
                minRows={4}
                sx={{ width: `100% !important`, maxWidth: 700 }}
              />
            </div>
            <Button disabled={loading} variant="contained" sx={{ m: 1 }} type="submit">
              {loading && <CircularProgress size={20} />} Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()

  return { props: JSON.parse(JSON.stringify({ events })) }
}
