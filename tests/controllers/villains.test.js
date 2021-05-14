const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { villainsList, singleVillain } = require('../mocks/villains')
const { before, afterEach, describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controller/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Villains Controller', () => {
  let stubbedFindAll
  let stubbedFindOne
  let stubbedCreate

  before(() => {
    stubbedFindAll = sinon.stub(models.villains, 'findAll')
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
    stubbedCreate = sinon.stub(models.villains, 'create')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
    stubbedFindAll.resetBehavior()
    stubbedCreate.resetBehavior()
  })

  describe('Get All Villains', () => {
    it('returns list of all villains in database calling response.send for the specified list', async () => {
      stubbedFindAll.returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
})