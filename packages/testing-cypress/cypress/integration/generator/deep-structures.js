import { Server as ReactMockServer, Faker, FakerGenerator } from "react-mock";

describe('Deep Structures', function() {
    before(function() {
      // runs once before all tests in the block
      console.log('ReactMock', ReactMockServer, Faker);
    })
  
    after(function() {
      // runs once after all tests in the block
    })
  
    beforeEach(function() {
      // runs before each test in the block
    })
  
    afterEach(function() {
      // runs after each test in the block
    })


    context('1 inner obect', function() {
        it('can generate data', function() {

          // Arrange 
          const schema = {
            key : Faker.lorem.word,
            inner: {
              prop1: Faker.lorem.word,
              prop2: Faker.lorem.sentence
            }
          };

          // Act
          const [{ inner }] = FakerGenerator.next(3, schema);

          // Assert
          expect(inner.prop1).to.be.an('string');
          expect(inner.prop2).to.be.an('string');

        });
    })

    context('2 inner obects', function() {
        it('can generate data', function() {
          // Arrange 
          const schema = {
            lang : Faker.lorem.word,
            sentence : Faker.lorem.sentence,
            tanslations: [{
              lang: Faker.lorem.word,
              sentence: Faker.lorem.sentence
            }],
            meta: {
              total: Faker.random.number
            }
          };

          // Act
          const [{ tanslations: [{ lang }] }] = FakerGenerator.next(3, schema);
          const [{ meta }] = FakerGenerator.next(3, schema);

          // Assert
          expect(lang).to.be.an('string');
          expect(meta.total).to.be.an('number');
        });
    })

    context('2 levels down', function() {
        specify('can generate data', function() {
          // Arrange 
          const schema = {
            lang : Faker.lorem.word,
            sentence : Faker.lorem.sentence,
            tanslations: [{
              lang: Faker.lorem.word,
              sentence: Faker.lorem.sentence,
              meta: {
                isFormal: Faker.random.boolean
              }
            }],
          };

          // Act
          const [{ tanslations }] = FakerGenerator.next(3, schema);
          const [{ lang, meta: { isFormal } }] = tanslations;

          // Assert
          expect(lang).to.be.an('string');
          expect(isFormal).to.be.an('boolean');
        });
    })
})