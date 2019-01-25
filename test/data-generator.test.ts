import faker from 'faker'
import ServerClass, { Faker, FakerGenerator } from '../src/react-mock'

// @resource: https://github.com/kentcdodds/react-testing-library/issues/36
// Typescript docs: Declaration Merging
// use global because jest is not imported
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveType(expextedType: string): CustomMatcherResult
      toBeArrayOf(expextedType: string): CustomMatcherResult
    }
  }
}

expect.extend({
  toHaveType(received: any, expected: string) {
    return {
      message: () => `expected a ${expected} but received a ${typeof received}`,
      pass: typeof received === expected
    }
  },
  /**
   * passes if there is at least one string in the received array
   * @param {Array<any>} received
   * @param {string} expected
   */
  toBeArrayOf(received: Array<any>, expected: string) {
    return {
      message: () => `expected a array of ${expected}s`,
      pass: received.length > 0 && received.some((el: any) => typeof el === expected)
    }
  }
})

/**
 * ServerClass test
 */
describe('Data Generator', () => {
  it('generates simple objects', () => {
    const schema = {
      lang: Faker.lorem.word,
      sentence: Faker.lorem.sentence,
      isDialect: Faker.random.boolean,
      isFormal: Faker.random.boolean
    }
    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(record).toBeInstanceOf(Object)

    expect(record.lang).toHaveType('string')
    expect(record.isDialect).toHaveType('boolean')
  })

  it('generates objects with array values', () => {
    const schema = {
      lang: Faker.lorem.word,
      sentence: Faker.lorem.sentence,
      tanslations: [
        {
          lang: Faker.lorem.word,
          sentence: Faker.lorem.sentence
        }
      ],
      langList: [Faker.lorem.word(), Faker.lorem.word],
      isDialect: Faker.random.boolean(),
      region: [
        [Faker.random.number, Faker.random.number],
        [Faker.random.number, Faker.random.number],
        [Faker.random.number, Faker.random.number]
      ] // [lat, lng]
    }

    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(record.tanslations[0].lang).toHaveType('string')
    expect(record.langList).toBeArrayOf('string')
  })

  it('generates objects with function values that yield primitive values', () => {
    const schema = {
      lang: Faker.lorem.word(),
      sentence: Faker.lorem.sentence,
      isDialect: Faker.random.boolean
    }
    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(FakerGenerator.next(2, schema)).toBeInstanceOf(Array)
  })

  it('generates objects with function values that yield functions', () => {
    const schema = {
      lang: () => Faker.lorem.word,
      sentence: Faker.lorem.sentence,
      isDialect: Faker.random.boolean
    }
    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(FakerGenerator.next(2, schema)).toBeInstanceOf(Array)
  })

  it('generates objects with function values that yield objects', () => {
    const schema = {
      lang: Faker.lorem.word,
      sentence: Faker.lorem.sentence,
      tanslations: [
        {
          lang: Faker.lorem.word,
          sentence: Faker.lorem.sentence
        }
      ],
      meta: () => ({
        total: Faker.random.number,
        lastUpdated: Faker.random.number // @TODO generate a Date
      })
    }
    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(record.meta).toBeInstanceOf(Object)
    expect(record.meta.total).toHaveType('number')
  })

  it('generates objects with function values that yield arrays', () => {
    const schema = {
      lang: Faker.lorem.word,
      sentence: Faker.lorem.sentence,
      tanslations: () => [
        {
          lang: () => Faker.lorem.word,
          sentence: Faker.lorem.sentence
        }
      ],
      meta: {
        total: Faker.random.number
      }
    }
    const [record] = FakerGenerator.next(2, schema) as Array<any>

    expect(record.tanslations).toBeInstanceOf(Array)
    expect(record.tanslations[0].lang).toHaveType('string')
  })
})
