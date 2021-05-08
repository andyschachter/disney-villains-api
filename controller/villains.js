const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillainBySlug = async (request, response) => {
  const { slug } = request.params

  const villain = await models.villains.findOne({ where: { slug } })

  return villain ? response.send(villain) : response.sendStatus(404)
}

const addNewVillain = async (request, response) => {
  const {
    name, movie, slug
  } = request.body

  if (!name || !movie || !slug) {
    return response.status(400)
      .send('The following fields are required: name, movie, slug')
  }

  const newVillain = {
    name, movie, slug
  }

  const villain = await models.villains.create(newVillain)

  // teams.push(newTeam)

  return response.status(201).send(villain)
}

module.exports = {
  getAllVillains,
  getVillainBySlug,
  addNewVillain
}
