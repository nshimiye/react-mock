import Server, { Server as ServerClass } from '../src/react-mock'

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
