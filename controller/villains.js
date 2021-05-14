const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains.findAll()

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('Unable to retrieve list of villains')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const villain = await models.villains.findOne({ where: { slug } })

    return villain ? response.send(villain) : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('unable to retrieve villain, please try again')
  }
}

const addNewVillain = async (request, response) => {
  try {
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
  } catch (error) {
    return response.status(500).send('unable to add new villain, please try again')
  }
}

module.exports = {
  getAllVillains,
  getVillainBySlug,
  addNewVillain
}
