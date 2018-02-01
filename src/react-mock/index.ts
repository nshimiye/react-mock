// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import faker from 'faker'
import Pretender, { ResponseData } from 'pretender'

import DataGeneratorClass, { IDataGenerator } from './data-generator'

// END helper functions

export default class ServerClass {
  private pretender: Pretender
  private routeMapList: Array<() => void> = []

  constructor(
    private dataGenerator: IDataGenerator = new DataGeneratorClass()
  ) {}

  on(): Promise<null | Error> {
    return new Promise(resolve => {
      this.pretender = new Pretender(...this.routeMapList)
      return resolve()
    })
  }

  off(): Promise<null | Error> {
    return new Promise(resolve => {
      this.pretender && this.pretender.shutdown()
      return resolve()
    })
  }

  mockGet(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...rest: Array<any>
  ): void {
    // START save handler to our pretender map
    let dataGenerator = this.dataGenerator
    this.routeMapList.push(function routeMap(this: Pretender) {
      this.get(
        endPoint,
        (req: Object) => {
          return handler(req, dataGenerator)
        },
        ...rest
      )
    })
    // END save handler to our pretender map
  }
}

export const Faker = faker
export { uid } from './uid'
export { IDataGenerator } from './data-generator'
export const Server = new ServerClass()
