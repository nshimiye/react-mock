// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { uid } from './uid'

// START helper functions
export interface IDataGenerator {
  next<T>(count: number, schema: T, returnObject?: boolean): Array<T> | { [id: string]: T }
}
export default class DataGenerator implements IDataGenerator {
  nextObject<T>(count: number, schema: T): { [id: string]: T } {
    const map: { [id: string]: T } = this.nextArray(count, schema).reduce(
      (map: { [key: string]: any }, obj) => {
        map[obj.id] = obj
        return map
      },
      {}
    )

    return map
  }
  nextArray<T>(count: number, schema: T): Array<T | any> {
    // throw new Error('NOT Implemented')

    // START create object based on the schema
    let createData = (schema: any) => {
      return {
        id: uid.next(),
        ...Object.keys(schema).reduce((ac: { [key: string]: T }, key) => {
          ac[key] = typeof schema[key] === 'function' ? schema[key]() : schema[key]
          return ac
        }, {})
      }
    }
    // END create object based on the schema

    // @ts-ignore
    return Array.apply(null, { length: count }).map(() => createData(schema))
  }
  next<T>(count: number, schema: T, returnObject = false): Array<T> | { [id: string]: T } {
    if (returnObject) {
      return this.nextObject<T>(count, schema)
    }
    return this.nextArray<T>(count, schema)
  }
}
