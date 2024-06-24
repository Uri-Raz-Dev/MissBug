import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'


const app = express()


app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error(`Couldn't get bugs...`)
            res.status(500).send(`Couldn't get bugs...`)
        })
})

app.post('/api/bug/', (req, res) => {
    const { _id, title, severity, description, createdAt, labels } = req.body

    const bugToSave = {
        _id, title, severity: +severity, createdAt: new Date().toISOString(), description, labels
    }
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error(`Couldn't save bug...`)
            res.status(500).send(`Couldn't save bug...`)
        })
})

app.put('/api/bug/:id', (req, res) => {
    const { id } = req.params
    const { title, severity, description, createdAt, labels } = req.body
    console.log();
    const bugToSave = {
        _id: id, title, severity: +severity, createdAt: new Date().toISOString(), description, labels
    }
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error(`Couldn't save bug...`)
            res.status(500).send(`Couldn't save bug...`)
        })
})

app.get('/api/bug/:id', (req, res) => {
    const { id } = req.params

    bugService.getById(id)
        .then(bug => res.send(bug))
})

app.delete('/api/bug/:id', (req, res) => {
    const { id } = req.params

    bugService.remove(id)
        .then(() => res.send(`Bug ${id} deleted...`))
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})
const PORT = process.env.PORT || 3030
app.listen(PORT, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)