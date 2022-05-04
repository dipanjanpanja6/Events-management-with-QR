import { Box, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import Login from "../components/Login"

export default function AuthLayout(props) {
  const [authenticate, setAuthenticate] = useState(null)

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token")
      if (token) setAuthenticate(true)
      else setAuthenticate(false)
    })()
  }, [])

  if (authenticate === null) return <CircularProgress />
  if (!authenticate) return <Login {...{ setAuthenticate }} />
  return <Box {...props} />
}
