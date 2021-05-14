const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains.findAll()

    return response.send(villains)
  } catch (error) {
    return response.send(500).send('Unable to retrieve team list')
  }
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

  return response.status(201).send(villain)
}

module.exports = {
  getAllVillains,
  getVillainBySlug,
  addNewVillain
}
