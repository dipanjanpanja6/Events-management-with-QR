import * as React from "react"
import MuiAppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

export default function PrimaryAppBar({ title, children }) {
  return (
    <MuiAppBar elevation={0} variant="outlined" color="primary" position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </MuiAppBar>
  )
}
