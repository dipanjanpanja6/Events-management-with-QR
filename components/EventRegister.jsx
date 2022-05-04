import React, { useState } from "react"
import Countdown from "react-countdown"
import { Alert, Box, Button, Card, CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material"

export default function EventRegister({ start, end, description, id, title }) {
  const [state, setState] = useState({ name: "", email: "", event_id: id })
  const [loading, setLoading] = useState(false)
  const [participant, setParticipant] = useState()
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const resp = await fetch("/api/participants", { method: "POST", body: JSON.stringify(state), headers: { "Content-Type": "application/json" } })
    const data = await resp.json()
    setParticipant(data.participant)
    setLoading(false)
  }
  return (
    <Stack>
      <Countdown
        date={new Date(start)}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) return <Alert severity="error">Registration closed</Alert>
          return (
            <>
              {participant ? (
                <Alert>You have successfully join.</Alert>
              ) : (
                <Stack component="form" onSubmit={handleSubmit} direction={"row"} spacing={2} alignItems="center" justifyContent={"center"} p={6}>
                  <TextField label="Name" size="small" required value={state.name} onChange={handleChange} name="name" />
                  <TextField label="Email" type="email" size="small" required value={state.email} onChange={handleChange} name="email" />

                  <Button disabled={loading} variant="contained" type="submit">
                    {loading && <CircularProgress size={20} />} Join Now!
                  </Button>
                </Stack>
              )}

              <Typography variant="caption" textAlign={"center"}>
                Event starts in
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                {hours} : {minutes} : {seconds}
              </Typography>
            </>
          )
        }}
      />
    </Stack>
  )
}
