const { ObjectId } = require('mongodb')
const token = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.length < 16) return next({ statusCode: 422, message: 'token inválido' })
    next();
}

const personagem = (req, res, next) => {
    const { name, cartoon } = req.body;
    if (name.length < 3) return next({ statusCode: 422, message: 'O campo name deve ter ao menos 3 caracteres' })
    if (cartoon.length < 3) return next({ statusCode: 422, message: 'O campo cartoon deve ter ao menos 3 caracteres' })
    next();
}

const mongoId = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) return next({ statusCode: 422, message: 'Id mal formado' })
    next();
}

module.exports = {
    token,
    personagem
}