// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, {
  Server,
  Faker,
  uid,
  IDataGenerator
} from '../../src/react-mock'

describe('Get Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/guides'

  const schema = {
    description: Faker.lorem.sentence(),
    createdAt: Faker.date.past(),
    favoredCount: Faker.random.number(),
    isPublic: Faker.random.boolean(),
    author: {
      id: uid.next(),
      name: Faker.name.findName(),
      picture: Faker.internet.avatar()
    }
  }

  const id = uid.next()
  it('mocks post request with an object response that has id', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      const guide = { ...schema, id }
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(guide)
      ]
    }

    Server.mockPost(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.post('/api/v1/guides').then(({ data }) => {
          // console.log('[axios] /api/v1/guides', data)
          // we assert that data is an object that has an id value in it
          return expect(data.id).toEqual(id)
        })
      })
      .then(() => {
        return Server.off()
      })
  })
})
