import { Box } from "@mui/material"
import React, { useState } from "react"
import Login from "../components/Login"

export default function AuthLayout(props) {
  const [authenticate, setAuthenticate] = useState(false)

  if (!authenticate) return <Login {...{ setAuthenticate }} />
  return <Box {...props} />
}
