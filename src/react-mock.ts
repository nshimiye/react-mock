// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import faker from 'faker'
import Pretender, { ResponseData } from 'pretender'
import { request } from 'http'

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
    const map: { [id: string]: T } = this.nextArray(
      count,
      schema
    ).reduce((map: { [key: string]: any }, obj) => {
      map[obj.id] = obj
      return map
    }, {})

    return map
  }
  nextArray<T>(count: number, schema: T): Array<T | any> {
    // throw new Error('NOT Implemented')

    // START create object based on the schema
    let createData = (schema: any) => {
      return {
        id: uid.next(),
        ...Object.keys(schema).reduce((ac: { [key: string]: T }, key) => {
          ac[key] =
            typeof schema[key] === 'function' ? schema[key]() : schema[key]
          return ac
        }, {})
      }
    }
    // END create object based on the schema

    return Array.apply(null, { length: count }).map(() => createData(schema))
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
class UidClass {
  next(): string {
    return Faker.random.uuid()
  }
}
// END helper functions

export default class ServerClass {
  private pretender: Pretender
  private routeMapList: Array<() => void> = []

  constructor(private dataGenerator: IDataGenerator = new DataGenerator()) {}

  on(): Promise<null | Error> {
    return new Promise(resolve => {
      this.pretender = new Pretender(...this.routeMapList)
      return resolve()
    })
  }

  off(): Promise<null | Error> {
    return new Promise(resolve => {
      this.pretender.shutdown()
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
export const uid = new UidClass()
export const Server = new ServerClass()
