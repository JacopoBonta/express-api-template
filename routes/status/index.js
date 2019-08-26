const route = require('express').Router()

route.get('/status', (req, res) => {
    res.json({
        "data": "ok"
    })
})

module.exports = route