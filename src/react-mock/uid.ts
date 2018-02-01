// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import Faker from 'faker'

export default class UidClass {
  next(): string {
    return Faker.random.uuid()
  }
}

export const uid = new UidClass()
