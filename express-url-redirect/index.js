const express = require("express")

const app = express()

app.use(async (req, res, next) => {
  if (req.headers.host.startsWith("yourdomain.com")) {
    return res.redirect(301, `https://www.yourdomain.com${req.originalUrl}`)
  }
  next()
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
