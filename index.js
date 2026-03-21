const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// --- Key validation ---
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

// --- Nametag storage (in-memory for now) ---
const nametags = {}

// Set a nametag
app.post('/nametag', (req, res) => {
    const { userId, nametag, key } = req.body

    // Validate key before allowing nametag to be set
    if (!key || !KEYS[key]) return res.json({ success: false, reason: "invalid key" })

    if (!userId || !nametag) return res.json({ success: false, reason: "missing fields" })

    nametags[userId] = nametag
    res.json({ success: true })
})

// Get one player's nametag
app.get('/nametag/:userId', (req, res) => {
    const tag = nametags[req.params.userId]
    res.json({ nametag: tag || "Unknown" })
})

// Get ALL nametags (so players can see each other)
app.get('/nametags', (req, res) => {
    res.json(nametags)
})

app.get('/', (req, res) => res.send('Soul V1 API is running'))

app.listen(PORT, () => console.log('Running on port ' + PORT))
