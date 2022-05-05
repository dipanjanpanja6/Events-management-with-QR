import { Add } from "@mui/icons-material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import MailIcon from "@mui/icons-material/Mail"
import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import moment from "moment"
import * as React from "react"
import EventCard from "../../../components/EventCard"
import EventItem from "../../../components/EventItem"
import PrimaryAppBar from "../../../components/PrimaryAppBar"
import AuthLayout from "../../../Layouts/AuthLayout"
import { getEventsData } from "../../api/events"

const drawerWidth = 240

export default function Admin({ events }) {
  return (
    <AuthLayout sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar title="Admin" />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={"a"} href="/admin/events">
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Events"} />
            </ListItem>

            <ListItem button component={"a"} href="/admin/events/calender">
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Calender"} />
            </ListItem>

            <ListItem button component={"a"} href="/admin/events/create">
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"New Events"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {events ? (
          <>
            <Typography>Upcoming events</Typography>
            <Stack direction="row" m={2}>
              {events
                .filter(e => moment(e.start).isAfter())
                ?.slice(0, 4)
                ?.map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
            </Stack>

            <Typography>All events</Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {events.map(event => (
                <EventItem key={event.id} {...event} />
              ))}
            </List>
          </>
        ) : (
          "No event found!"
        )}
      </Box>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()

  return { props: JSON.parse(JSON.stringify({ events })) }
}
