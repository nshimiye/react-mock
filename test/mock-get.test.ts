// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, { Server, Faker, uid, IDataGenerator, FakerGenerator } from '../src/react-mock'

describe('Get Request', () => {
  afterEach(() => {
    return Server.off()
  })

  const apiRoute = '/api/v1/todos'

  const todoSchema = {
    author: Faker.internet.email(),
    content: () => Faker.hacker.phrase(),
    createdAt: () => Faker.date.past()
  }

  it('mocks get request with array response', () => {
    const requestHandler = (request, generator): [number, any, string] => {
      const todoList = generator.next(10, todoSchema)
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)]
    }

    Server.mockGet(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.get('/api/v1/todos').then(({ data }) => {
          // console.log('[axios] /api/v1/guides', data)
          // we assert that data is an array of 10 objects in it
          return expect(data.length).toEqual(10)
        })
      })
      .then(() => {
        return Server.off()
      })
  })

  it('mocks get request with map response', () => {
    const requestHandler = (request, generator: IDataGenerator): [number, any, string] => {
      const todoList = FakerGenerator.next(10, todoSchema, true)
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)]
    }

    Server.mockGet(apiRoute, requestHandler, 1000)

    return Server.on()
      .then(() => {
        return axios.get('/api/v1/todos').then(({ data }) => {
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
