import { Share } from "@mui/icons-material"
import { Grid, IconButton, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { fDateTime } from "../utils/fDateTime"

export default function EventDetails({ title, start, end, description, id, ...props }) {
  const [qr, setQr] = useState("")
  useEffect(() => {
    setQr(`${window.location.origin}/admin/events/${id}`)
  }, [])

  return (
    <Grid container bgcolor={"#fff"} height={1} alignItems="center">
      <Grid item md={3} p={6} justifyContent="center" display={"flex"}>
        <QRCode value={qr} />
      </Grid>
      <Grid item md={9} p={6}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography gutterBottom>
          {fDateTime(start)} to {fDateTime(end)}
        </Typography>
        <Stack direction="row">
          <IconButton>
            <Share />
          </IconButton>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}
