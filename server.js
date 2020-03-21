const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookie = require('cookie')
const port = parseInt(process.env.PORT, 10) || 9002
const remoteServer = 'http://47.96.129.81:8081'
const server = express()
const axios = require('axios')

server.use(bodyParser.json())
server.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false
}))

server.use('*', (req, res, next) => {
  const _cookie = req.headers.cookie
  const cookieData = cookie.parse(_cookie || '')
  if (cookieData.authtype === 'admin') {
    console.log('logout')
    return next()
  }
  res.writeHead(404)
  res.end()
})

server.all(/\/f\/v1/, (req, res, next) => {
  const _cookie = req.headers.cookie
  const cookieData = cookie.parse(_cookie || '')
  try {
    const url = `${remoteServer}${req.path}`
    console.log(req.method, req.headers, req.query)
    axios({
      url,
      method: req.method,
      headers: req.headers,
      params: {
        ...req.query,
        token: cookieData.token
      }
    }).then(res => res.data).then(rt => {
      res.status(200).json(rt)
    })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

server.get('/account/logout', (req, res) => {
  res.redirect('http://localhost:9001/account/logout')
})

server.use(express.static('build'))

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Server ready on http://localhost:${port}`)
})