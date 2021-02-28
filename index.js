const express = require('express');
const rescue = require('express-rescue');
const personaModel = require('./models/Persona')
const erroHandler = require('./middleware/erroHandler')
const validations = require('./middleware/validations')
const app = express();
const PORT = 3000;

app.use(express.json());

// Caso não aja authorization aplicação o validations.token vai quebrar, por isso usado o rescue
app.get('/persona', rescue(validations.token), async (req, res) => {
    const peeps = await personaModel.getAll()
    res.json(peeps)
})
// Bonus: validate ID mongo :D
app.get('/persona/:id', /* rescue(validations.mongoId), */rescue(validations.token),rescue(async (req, res, next) => {
    const peep = await personaModel.findById(req.params.id);
    res.json(peep)
}))

app.post('/persona', validations.token, rescue(validations.personagem), async(req, res) => {
    const { name, cartoon } = req.body
    const peep = await personaModel.create(name, cartoon);
    res.status(201).json(peep)
})

app.use(erroHandler)

app.listen(3000, () => console.log(`ouvindo na ${PORT}`))
