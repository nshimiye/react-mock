// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import faker from 'faker'
import Pretender, { ResponseData } from 'pretender'

import DataGeneratorClass, { IDataGenerator } from './data-generator'

import { createGetRoute } from './methods/get'
import { createHeadRoute } from './methods/head'
import { createDeleteRoute } from './methods/delete'
import { createOptionsRoute } from './methods/options'
import { createPatchRoute } from './methods/patch'
import { createPostRoute } from './methods/post'
import { createPutRoute } from './methods/put'

/**
 * type guard
 * check to see if passed in object implements IDataGenerator
 * @param instance 
 */
function implementsIDG(instance: any): instance is IDataGenerator {
  return 'next' in instance && typeof instance.next === 'function'
}

export default class ServerClass {
  private pretender: Pretender
  private routeMapList: Array<() => void> = []

  constructor(
    private dataGenerator: IDataGenerator = new DataGeneratorClass()
  ) {
    console.assert(
      implementsIDG(dataGenerator),
      'generator has to be an object with a next function in it'
    )
  }

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
    ...others: Array<any>
  ): void {
    // START save handler to our pretender map
    let dataGenerator = this.dataGenerator
    this.routeMapList.push(
      createGetRoute(this.dataGenerator, endPoint, handler, ...others)
    )
    // END save handler to our pretender map
  }

  mockPost(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    let dg = this.dataGenerator
    this.routeMapList.push(
      createPostRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }

  mockPut(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    this.routeMapList.push(
      createPutRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }
  mockPatch(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    this.routeMapList.push(
      createPatchRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }
  mockDelete(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    this.routeMapList.push(
      createDeleteRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }
  mockHead(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    this.routeMapList.push(
      createHeadRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }
  mockOptions(
    endPoint: string,
    handler: (
      req: Object,
      generator: IDataGenerator
    ) => ResponseData | Promise<ResponseData>,
    ...others: Array<any>
  ): void {
    this.routeMapList.push(
      createOptionsRoute(this.dataGenerator, endPoint, handler, ...others)
    )
  }
}

export const Faker = faker
export { uid } from './uid'
export { IDataGenerator } from './data-generator'
export const Server = new ServerClass()
