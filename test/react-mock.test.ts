// import ServerClass, { Server, Faker, uid } from 'react-mock'
import ServerClass, { Server, Faker, uid } from '../src/react-mock'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(Server).toBeInstanceOf(ServerClass)
  })
})

describe('Mocking Requests', () => {
  it('mocks get request', () => {
    const apiRoute = '/api/v1/guides'

    const todoSchema = {
      content: Faker.lorem.sentence(),
      createdAt: Faker.date.past()
    }

    const requestHandler = (request, generator) => {
      const todoList = generator.next(10, todoSchema)
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(todoList)
      ]
    }

    Server.mockGet(apiRoute, requestHandler)
    Server.on()
  })
})
