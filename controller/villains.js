const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillain = async (request, response) => {
  const { slug } = request.params

  const villain = await models.villains.findOne({ where: { slug } })

  return villain ? response.send(villain) : response.sendStatus(404)
}

module.exports = {
  getAllVillains,
  getVillain
}
