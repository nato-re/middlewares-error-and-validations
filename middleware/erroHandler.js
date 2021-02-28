module.exports = (err, req, res, next) => {
    // Erro esperado
    if (err.statusCode) return res.status(err.statusCode).json({ message: err.message })
    // Erro inesperado
    return res.status(500).json({ message: 'Erro interno' })
}