// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, {
  Server,
  Faker,
  uid,
  IDataGenerator
} from '../../src/react-mock'

describe('Patch Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/guides/:id'

  const schema = {
    description: Faker.lorem.sentence(),
    createdAt: Faker.date.past(),
    favoredCount: Faker.random.number(),
    isPublic: false,
    author: {
      id: uid.next(),
      name: Faker.name.findName(),
      picture: Faker.internet.avatar()
    }
  }

  it('mocks patch request', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      const id = request.params.id
      const isPublic = request.data.isPublic
      const guide = { ...schema, isPublic, id }
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(guide)
      ]
    }

    Server.mockPatch(apiRoute, requestHandler, 1000)

    const guideId = uid.next()
    const guideObject = {
      isPublic: true
    }
    return Server.on()
      .then(() => {
        return axios
          .patch(`/api/v1/guides/${guideId}`, guideObject)
          .then(({ data }) => {
            // we assert that data is an object whose id is equal to guideId and "isPublic" is true
            return expect(data.id).toEqual(guideId)
          })
      })
      .then(() => {
        return Server.off()
      })
  })
})
