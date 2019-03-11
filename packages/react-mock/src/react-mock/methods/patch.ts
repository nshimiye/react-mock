import Pretender, { ResponseData } from 'pretender'
import { IDataGenerator } from '../data-generator'

/**
 * @param dg 
 * @param endPoint 
 * @param handler 
 * @param others 
 */
export function createPatchRoute(
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
  return function putRouteMap(this: Pretender) {
    this.patch(
      endPoint,
      (req: Object) => {
        return handler(req, dg)
      },
      ...others
    )
  }
}

export default createPatchRoute
