const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { villainsList, singleVillain, singleNotVillain, wrongVillain } = require('../mocks/villains')
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

    it('Returns a 500 error with a message', async () => {
      stubbedFindAll.throws('ERROR')
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }

      await getAllVillains({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('Unable to retrieve list of villains')
    })
  })

  describe('Get One Villain', () => {
    it('Returns a villain using response.send() when called with a corresponding slug', async () => {
      const request = { params: { slug: 'gaston' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      stubbedFindOne.returns(singleVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gaston' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 404 error when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }
      const stubbedSendStatus = sinon.stub()
      const response = { sendStatus: stubbedSendStatus }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 error with a message', async () => {
      stubbedFindOne.throws('ERROR')
      const request = { params: { slug: 'error-id' } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'error-id' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('unable to retrieve villain, please try again')
    })
  })
})
