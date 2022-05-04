import { Grid, Stack, Typography } from "@mui/material"
import React from "react"
import { fDateTime } from "../utils/fDateTime"
import ShareEvent from "./ShareEvent"

export default function EventDetails({ title, start, end, description, id, ...props }) {
  return (
    <Grid container bgcolor={"#fff"} height={1} alignItems="center">
      <Grid item md={3} p={6} justifyContent="center" display={"flex"}>
        <img src={`/api/qrcode/${id}`} />
      </Grid>
      <Grid item md={9} p={6}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography gutterBottom>
          {fDateTime(start)} to {fDateTime(end)}
        </Typography>
        <Stack direction="row">
          <ShareEvent event_id={id} />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}
