// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import faker from 'faker'
import { uid } from './uid'

export type Primitive = string | number | boolean

export const isObject = (input: any) => typeof input === 'object'
export const isFunction = (input: any) => typeof input === 'function'

// START helper functions
export interface IDataGenerator {
  next<T>(count: number, schema: T, returnObject?: boolean): Array<T> | { [id: string]: T }
}

export function createFromObject(schema: { [id: string]: any }, i: number): { [id: string]: any } {
  return Object.keys(schema).reduce((ac: any, key: string) => {
    const value = schema[key]
    if (Array.isArray(value)) return { ...ac, [key]: createFromArray(value, i) }
    if (isObject(value)) return { ...ac, [key]: createFromObject(value, i) }
    if (isFunction(value)) return { ...ac, [key]: createFromFunction(value, i) }
    return { ...ac, [key]: createFromPrimitive(value) }
  }, {})
}
export function createFromArray(schema: Array<any>, i: number): Array<any> {
  return schema.map(value => {
    if (Array.isArray(value)) return createFromArray(value, i)
    if (isObject(value)) return createFromObject(value, i)
    if (isFunction(value)) return createFromFunction(value, i)
    return createFromPrimitive(value)
  })
}
export function createFromFunction(schema: Function, i: number): any {
  const value = schema() // @TODO how to pass i for non-Faker functions?
  if (Array.isArray(value)) return createFromArray(value, i)
  if (isObject(value)) return createFromObject(value, i)
  if (isFunction(value)) return createFromFunction(value, i)
  return createFromPrimitive(value)
}
export function createFromPrimitive(schema: Primitive): Primitive {
  return schema
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
    // START create object based on the schema
    let createData = (schema: any, i: number) => {
      return {
        id: uid.next(),
        ...createFromObject(schema, i)
      }
    }
    // END create object based on the schema

    // @ts-ignore
    return Array.apply(null, { length: count }).map((_, i: number) => createData(schema, i))
  }
  next<T>(count: number, schema: T, returnObject = false): Array<T> | { [id: string]: T } {
    if (returnObject) {
      return this.nextObject<T>(count, schema)
    }
    return this.nextArray<T>(count, schema)
  }
}
