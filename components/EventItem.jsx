import { Delete } from "@mui/icons-material"
import { IconButton, ListItemButton, ListItemIcon, ListItem, Stack } from "@mui/material"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router"
import * as React from "react"
import { fDateTime } from "../utils/fDateTime"

export default function EventItem({ title, id, start, end, description }) {
  const route = useRouter()
  const handleDelete = async e => {
    try {
      const data = await await fetch(`/api/events/${id}`, { method: "DELETE" })
      if (data.status === 200) route.replace(route.asPath)
      else throw Error(data.statusText)
    } catch (r) {
      window.alert(r)
      console.error(r)
    }
  }
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete} color="error" edge="end">
            <Delete />
          </IconButton>
        }
        disablePadding>
        <ListItemButton component="div" onClick={() => route.push(`/admin/events/${1}`)} alignItems="flex-start">
          <ListItemIcon sx={{ mt: 0.1 }}>
            <Stack>
              <Typography variant="h6" component="p" color="text.secondary">
                {fDateTime(start, "DD")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fDateTime(start, "MMM")}
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
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
