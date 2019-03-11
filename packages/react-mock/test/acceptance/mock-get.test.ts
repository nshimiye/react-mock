// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, { Server, Faker, uid, IDataGenerator } from '../../src/react-mock'

describe('Get Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/guides'

  const schema = {
    description: () => Faker.lorem.sentence(),
    createdAt: () => Faker.date.past(),
    favoredCount: () => Faker.random.number(),
    isPublic: () => Faker.random.boolean(),
    author: {
      id: uid.next(),
      name: Faker.name.findName(),
      picture: Faker.internet.avatar()
    }
  }

  it('mocks get request with array response', () => {
    const requestHandler = (request, generator: IDataGenerator): [number, any, string] => {
      const guides = generator.next(5, schema)
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(guides)]
    }

    Server.mockGet(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.get('/api/v1/guides').then(({ data }) => {
          // console.log('[axios] /api/v1/guides', data)
          // we assert that data is an array of 10 objects in it
          return expect(data.length).toEqual(5)
        })
      })
      .then(() => {
        return Server.off()
      })
  })

  it('mocks get request with map response', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      const guides = generator.next(5, schema, true)
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(guides)]
    }

    Server.mockGet(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.get('/api/v1/guides').then(({ data }) => {
          // console.log('[axios] /api/v1/guides', data)
          // we assert that data is a map of 10 objects where key is the id of each object
          let firstKey = Object.keys(data)[0]
          let firstObject = data[firstKey]
          return expect(firstObject.id).toEqual(firstKey)
        })
      })
      .then(() => {
        return Server.off()
      })
  })
})
