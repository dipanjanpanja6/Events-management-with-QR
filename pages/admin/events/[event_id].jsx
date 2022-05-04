import { Alert, Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import React from "react"
import EventDetails from "../../../components/EventDetails"
import EventRegister from "../../../components/EventRegister"
import AuthLayout from "../../../Layouts/AuthLayout"
import { getEventData } from "../../api/events"
import { getEventParticipantsData } from "../../api/participants"

export default function Event({ event, users, ...props }) {
  return (
    <AuthLayout>
      <EventDetails {...event} />
      <Divider />
      <EventRegister {...event} />

      <Box p={2}>
        <Typography variant="h6">Registered users ({users?.length || 0})</Typography>
        {users ? (
          <List dense>
            {users.map(({ name, email }, i) => (
              <>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>{name.charAt()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={email} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        ) : (
          <Alert severity="error">No participants</Alert>
        )}
      </Box>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const event = await getEventData(params.event_id)
  const users = await getEventParticipantsData(params.event_id)

  if (!event) {
    return { notFound: true }
  }
  return { props: JSON.parse(JSON.stringify({ event, users })) }
}
