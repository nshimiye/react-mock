import Pretender, { ResponseData } from 'pretender'
import { IDataGenerator } from '../data-generator'

/**
 * @param dg 
 * @param endPoint 
 * @param handler 
 * @param others 
 */
export function createGetRoute(
  dg: IDataGenerator,
  endPoint: string,
  handler: (
    req: Object,
    generator: IDataGenerator
  ) => ResponseData | Promise<ResponseData>,
  ...others: Array<any>
) {
  /**
   * routeMap refers to "pretenderjs" based map of routes that can be passed to an instance of pretenderjs
   */
  return function getRouteMap(this: Pretender) {
    this.get(
      endPoint,
      (req: Object) => {
        return handler(req, dg)
      },
      ...others
    )
  }
}

export default createGetRoute
