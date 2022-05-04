import { Box, Typography } from "@mui/material"
import Head from "next/head"
import React from "react"

const Home = () => {
  return (
    <>
      <Head>
        <title>Event Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ fontFamily: "'Water Brush', cursive;", fontSize: 70 }}>Events Management</Typography>
      </Box>
    </>
  )
}

export default Home
