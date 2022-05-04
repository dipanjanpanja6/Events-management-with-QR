import { CacheProvider } from "@emotion/react"
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import "../styles/globals.css"
import lightTheme from "../styles/theme"
import createEmotionCache from "../utils/createEmotionCache"

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
