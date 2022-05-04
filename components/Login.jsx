import { LockOutlined } from "@mui/icons-material"
import { Box, Button, Card, CardActions, Container, Stack, TextField, Avatar, Typography, FormControlLabel, Checkbox } from "@mui/material"
import React, { useState } from "react"
import Data from "../data/admins.json"
import Copyright from "./Copyright"

export default function Login({ setAuthenticate }) {
  const [state, setState] = useState({ id: "", password: "" })
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleLogin = e => {
    e.preventDefault()
    const authenticate = Data.admins.find(admin => admin.id === state.id && admin.password === state.password)
    if (!authenticate) return window.alert("Invalid user")
    sessionStorage.setItem("token", JSON.stringify(authenticate))
    setAuthenticate(true)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="id" label="User ID" autoFocus name="id" value={state.id} onChange={handleChange} />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
