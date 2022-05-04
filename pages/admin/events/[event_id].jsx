import { Alert, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import EventDetails from "../../../components/EventDetails"
import EventRegister from "../../../components/EventRegister"
import AuthLayout from "../../../Layouts/AuthLayout"
import { getEventData } from "../../api/events"
import { getEventParticipantsData } from "../../api/participants"

export default function Event({ event, users, ...props }) {
  const router = useRouter()
  const handleSubmitSuccess = () => {
    router.replace(router.asPath)
  }
  return (
    <AuthLayout>
      <EventDetails {...event} />
      <Divider />
      <EventRegister {...event} onSubmitSuccess={handleSubmitSuccess} />

      <Box p={2}>
        <Typography variant="h6">Registered users ({users?.length || 0})</Typography>
        {users ? (
          <List dense>
            {users.map(({ name, email }, i) => (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{name.charAt()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={email} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
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
