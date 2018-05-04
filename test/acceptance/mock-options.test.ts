// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, {
  Server,
  Faker,
  uid,
  IDataGenerator
} from '../../src/react-mock'

describe('Options Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/guides'

  /**
   * Usecase: User wants to see what method are exposed by guides API
   */
  it('mocks head request to get status of our guides resource', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      return [
        202,
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods':
            'POST, GET, PUT, DELETE, HEAD, OPTIONS'
        },
        null
      ]
    }

    Server.mockOptions(apiRoute, requestHandler, 1000)

    const allowedMethods = 'POST, GET, PUT, DELETE, HEAD, OPTIONS'
    return Server.on()
      .then(() => {
        return axios.options(`/api/v1/guides`).then(({ headers }) => {
          console.log('[]', headers)
          // we assert that data is an object whose totalCount is equal to previously created in the schema
          return expect(headers['access-control-allow-methods']).toEqual(
            allowedMethods
          )
        })
      })
      .then(() => {
        return Server.off()
      })
  })
})
