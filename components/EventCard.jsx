import React from "react"
import { Box, Button, Card, CardActions, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material"
import { fDateTime } from "../utils/fDateTime"
import Countdown from "react-countdown"

export default function EventCard({ title, start, end, description, id }) {
  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Countdown
            date={new Date(start)}
            renderer={({ hours, minutes, seconds, completed }) =>
              completed ? <Chip color="error" label={"closed"} size="small" /> : <Chip size="small" color="success" label={`${hours} : ${minutes} : ${seconds}`} />
            }
          />
        </Box>
        <Typography variant="h5" component="div">
          {fDateTime(start, "MMM DD ddd")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {fDateTime(start, "h:mm a")} to {fDateTime(end, "h:mm a")}
        </Typography>
        <Typography variant="body2">{description?.slice(0, 70)?.concat("...")}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/admin/events/${id}`}>
          View
        </Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  )
}
