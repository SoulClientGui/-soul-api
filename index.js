const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const KEYS = {
    "key12345":       { type: "temp",  owner: "public" },
    "key123455667@":  { type: "perm",  owner: "Soul"   },
}

app.get('/validate', (req, res) => {
    const key = req.query.key
    if (!key) return res.json({ valid: false, reason: "no key" })
    const entry = KEYS[key]
    if (!entry) return res.json({ valid: false, reason: "invalid" })
    res.json({ valid: true, type: entry.type, owner: entry.owner })
})

app.get('/', (req, res) => res.send('Soul V1 API is running'))

app.listen(PORT, () => console.log('Running on port ' + PORT))