import { Box, Divider } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"
import EventDetails from "../../components/EventDetails"
import { getEventData } from "../api/events"
const EventRegister = dynamic(() => import("../../components/EventRegister"), { ssr: false })

export default function EventOverview({ event, ...props }) {
  return (
    <Box pb={"220px"} minHeight={"100vh"} position="relative">
      <EventDetails {...event} />
      <Divider />
      <EventRegister {...event} />
      <Footer />
    </Box>
  )
}
const Footer = props => <Box sx={{ background: `url("/footer.png")` }} width={1} height={220} position="absolute" bottom={0} {...props} />
export const getServerSideProps = async ({ params }) => {
  const event = await getEventData(params.event_id)

  if (!event) {
    return { notFound: true }
  }
  return { props: JSON.parse(JSON.stringify({ event })) }
}
