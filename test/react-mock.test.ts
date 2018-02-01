// import ServerClass, { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
import ServerClass, {
  Server,
  Faker,
  uid,
  IDataGenerator
} from '../src/react-mock'

/**
 * ServerClass test
 */
describe('Initialization', () => {
  afterEach(() => {
    return Server.off()
  })
  it('exposes Server instance', () => {
    expect(Server).toBeInstanceOf(ServerClass)
  })

  it('allows users to pass in their own generator', () => {
    // a generator is an object with "next" function in it (it returns array or JSON object)
    let customDataGenerator: IDataGenerator = {
      next() {
        return []
      }
    }

    let customServer = new ServerClass(customDataGenerator)

    expect(customServer).toBeInstanceOf(ServerClass)
  })
})
