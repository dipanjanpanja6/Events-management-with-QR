import { ListItemButton, ListItemIcon, Stack } from "@mui/material"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router"
import * as React from "react"
import { fDateTime } from "../utils/fDateTime"

export default function EventItem({ title, id, start, end, description }) {
  const route = useRouter()
  return (
    <>
      <ListItemButton onClick={() => route.push(`/admin/events/${1}`)} alignItems="flex-start">
        <ListItemIcon sx={{ mt: 0.1 }}>
          <Stack>
            <Typography variant="h6" component="p" color="text.secondary">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              May
            </Typography>
          </Stack>
        </ListItemIcon>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                Starts in
              </Typography>{" "}
              {fDateTime(start)} - {fDateTime(end)}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  )
}
