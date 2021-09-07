const db = require('../../data/db-config')

const getAll = () => {
return db('cars')
}

const getById = async (id) => {
const carById = await db('cars').where('id', id).first()
return carById
}

const create = async (car) => {
 const [id] = await db('cars').insert(car)
 return getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
}