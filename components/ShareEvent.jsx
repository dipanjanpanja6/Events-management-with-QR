import { Share } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import React from "react"

export default function ShareEvent({ event_id, text }) {
  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/events/${event_id}`
      console.log(url)
      const canWebShare = !!window.navigator.share
      if (!canWebShare) {
        await window.navigator.clipboard.writeText(url)
        window.alert("Link copied to clipboard.")
        return
      }
      await window.navigator.share({ title: "Join this event now", text: "I have shared a event pass here: ", url, files: "" })
    } catch (r) {
      console.error(r)
    }
  }
  if (text)
    return (
      <Button size="small" onClick={handleShare}>
        {text}
      </Button>
    )
  return (
    <IconButton onClick={handleShare}>
      <Share />
    </IconButton>
  )
}
