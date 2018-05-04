// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, {
  Server,
  Faker,
  uid,
  IDataGenerator
} from '../../src/react-mock'

describe('Head Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/guides'

  /**
   * Usecase: User wants to easily see how many guides are in the system and
   * the time of the last entry.
    HEAD /api/v1/guides
    => {
      totalCount: 50,
      lastUpdate: 12:00PM, 
    }
  */
  const schema = {
    totalCount: Faker.random.number(),
    lastUpdate: Faker.date.past()
  }

  it('mocks head request to get status of our guides resource', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      const status = { ...schema }
      return [
        202,
        { 'Content-Type': 'application/json' },
        JSON.stringify(status)
      ]
    }

    Server.mockHead(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.head(`/api/v1/guides`).then(({ data }) => {
          // we assert that data is an object whose totalCount is equal to previously created in the schema
          return expect(data.totalCount).toEqual(schema.totalCount)
        })
      })
      .then(() => {
        return Server.off()
      })
  })
})
