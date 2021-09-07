const Car = require('./cars-model')

const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if(!car) {
      next({ status: 404, message:`car with id ${req.params.id} is not found`})
    } else {
      next()
    }
  }catch (err) {
    next (err)
  }
  }

const checkCarPayload = async (req, res, next) => {
const { vin, make, model, mileage} = await req.body
if(!vin ){
  next({ status: 400,  message: `vin is missing`})
} else if(!make){
  next({ status: 400,  message: `make is missing`})
} else if(!model){
  next({ status: 400,  message: `model is missing`})
} else if(!mileage){
  next({ status: 400,  message: `mileage is missing`})
}else {
  next()
}
}

const checkVinNumberValid = async (req, res, next) => {
const { vin } = await req.body
if(vin.length < 17){
  next({ status: 400, message: `vin ${vin} is invalid`})
} else {
  next()
}
}

const checkVinNumberUnique = async (req, res, next) => {
try {
  const already = await db('cars').where('vin', req.body.vin).first()
  if(already){
    next({ status: 400, message:`vin ${req.body.vin} already exists`})
  } else {
    next()
  }
} catch (err) {
  next(err)
}
}
module.exports = {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique}