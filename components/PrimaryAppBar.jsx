import * as React from "react"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { Logout } from "@mui/icons-material"

export default function PrimaryAppBar({ title, children }) {
  const router = useRouter()
  const handleLogout = () => {
    sessionStorage.clear()
    router.reload()
  }
  return (
    <MuiAppBar elevation={0} variant="outlined" color="primary" position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
        <IconButton onClick={handleLogout} color="inherit">
          <Logout />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}
