import React from "react"
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import createEmotionCache from "../utils/createEmotionCache"
import lightTheme from "../styles/theme"
import "../styles/globals.css"

const clientSideEmotionCache = createEmotionCache()

const MyApp = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
