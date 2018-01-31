// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import * as uuidV4 from 'uuid/v4'
import * as faker from 'faker'
import * as pretender from 'pretender'

// START helper functions
export interface IDataGenerator {
  next<T>(
    count: number,
    schema: T,
    returnObject?: boolean
  ): Array<T> | { [id: string]: T }
}
class DataGenerator implements IDataGenerator {
  nextObject<T>(count: number, schema: T): { [id: string]: T } {
    throw new Error('NOT Implemented')
  }
  nextArray<T>(count: number, schema: T): Array<T> {
    throw new Error('NOT Implemented')
  }
  next<T>(
    count: number,
    schema: T,
    returnObject = false
  ): Array<T> | { [id: string]: T } {
    if (returnObject) {
      return this.nextObject<T>(count, schema)
    }
    return this.nextArray<T>(count, schema)
  }
}
function* Uid() {
  while (true) {
    yield uuidV4()
  }
}
// END helper functions

export default class ServerClass {
  on(): Promise<null | Error> {
    return Promise.reject(new Error('NOT Implemented'))
  }

  mockGet(
    endpoint: string,
    handler: (req: Object, generator: IDataGenerator) => void
  ): void {
    throw new Error('NOT Implemented')
  }
}

export const Faker = faker
export const uid = Uid()
export const Server = new ServerClass()
