import { alpha } from "@mui/material/styles"
import { Box, Button, CircularProgress, FormControl, Grid, InputBase, InputLabel, Paper, styled, ThemeProvider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useState } from "react"
import AuthLayout from "../../../Layouts/AuthLayout"
import { getEventsData } from "../../api/events"
import Calender from "./calender"

export default function Create({ events }) {
  const router = useRouter()
  const [state, setState] = useState({ title: "", start: "", end: "", description: "" })
  const [loading, setLoading] = useState(false)
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleCancel = () => {
    router.back()
  }
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setLoading(true)
      const resp = await fetch("/api/events", { method: "POST", body: JSON.stringify(state), headers: { "Content-Type": "application/json" } })
      const data = await resp.json()
      setLoading(false)
      if (data.event) router.push(`/admin/events/${data.event.id}`)
      else window.alert(JSON.stringify(data))
    } catch (r) {
      console.log(r)
      window.alert(r)
      setLoading(false)
    }
  }
  return (
    <AuthLayout>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={8} p={4} bgcolor={"#fdfdfd"}>
          <Calender events={events} />
        </Grid>
        <Grid item md={4} component={Paper} elevation={2} sx={{ backgroundColor: "primary.light", color: "white" }}>
          <Typography variant="h2" fontSize={"1.75em"} fontWeight={"bold"} gutterBottom px={6} pt={6}>
            Create Event
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1, width: 1, background: "white" },
              p: 6,
            }}
            autoComplete="off">
            <div>
              <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
                <BootstrapInputLabel htmlFor="bootstrap-input" style={{ color: "#fff" }}>
                  Event Name
                </BootstrapInputLabel>
                <BootstrapInput required name="title" value={state.title} onChange={handleChange} />
              </FormControl>
              <br />
              <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
                <BootstrapInputLabel htmlFor="bootstrap-input" style={{ color: "#fff" }}>
                  Start date
                </BootstrapInputLabel>
                <BootstrapInput type="datetime-local" required name="start" value={state.start} onChange={handleChange} />
              </FormControl>
              <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
                <BootstrapInputLabel htmlFor="bootstrap-input" style={{ color: "#fff" }}>
                  End date
                </BootstrapInputLabel>
                <BootstrapInput type="datetime-local" required name="end" label="end date" value={state.end} onChange={handleChange} />
              </FormControl>
              <br />
              <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
                <BootstrapInputLabel htmlFor="bootstrap-input" style={{ color: "#fff" }}>
                  Description
                </BootstrapInputLabel>
                <BootstrapInput
                  required
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  label="Description"
                  multiline
                  minRows={4}
                  sx={{ width: `100% !important`, maxWidth: 700 }}
                />
              </FormControl>
            </div>
            <Button sx={{ m: 1 }} color="inherit" onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={loading} variant="outlined" sx={{ m: 1 }} color="inherit" type="submit">
              {loading && <CircularProgress size={20} />} Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const events = await getEventsData()

  return { props: JSON.parse(JSON.stringify({ events })) }
}

const BootstrapInputLabel = styled(props => <InputLabel shrink {...props} />)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    // marginTop: theme.spacing(2),
    color: "#fff !important",
  },
}))
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    width: "100%",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    // width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))
