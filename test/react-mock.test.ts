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
  it('Server instance is exposed', () => {
    expect(Server).toBeInstanceOf(ServerClass)
  })
})
