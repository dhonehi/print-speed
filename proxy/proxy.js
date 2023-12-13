const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express()


app.use('/api', createProxyMiddleware({target: 'https://api.forismatic.com/api/1.0/', changeOrigin: true}))
app.use('/', createProxyMiddleware({target: 'http://localhost:8080', changeOrigin: true}))



app.listen(4444, () => void console.log('start'))
