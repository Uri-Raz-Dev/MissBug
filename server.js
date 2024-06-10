import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()


app.use(express.static('public'))
app.use(cookieParser())

app.get('/api/car', (req, res) => {
    carService.query()
        .then(cars => res.send(cars))
        .catch(err => {
            loggerService.error(`Couldn't get cars...`)
            res.status(500).send(`Couldn't get cars...`)
        })
})

app.get('/api/car/save', (req, res) => {
    const { _id, vendor, speed } = req.query
    const carToSave = { _id, vendor, speed: +speed }

    carService.save(carToSave)
        .then(savedCar => res.send(savedCar))
})

app.get('/api/car/:id', (req, res) => {
    const { id } = req.params

    carService.getById(id)
        .then(car => res.send(car))
})

app.get('/api/car/:id/remove', (req, res) => {
    const { id } = req.params

    carService.remove(id)
        .then(() => res.send(`Car ${id} deleted...`))
})

app.get('/puki', (req, res) => {
    var visitCount = req.cookies.visitCount || 0
    // res.cookie('visitCount', ++visitCount)
    res.cookie('visitCount', ++visitCount, { maxAge: 3000 })
    res.send(`<h1>Hello Puki ${visitCount}</h1>`)
})

app.get('/nono', (req, res) => res.redirect('/puki'))

const port = 3030
app.listen(port, () => loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))
