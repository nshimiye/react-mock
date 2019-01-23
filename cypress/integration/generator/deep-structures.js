describe('Deep Structures', function() {
    before(function() {
      // runs once before all tests in the block
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
          expect(1 + 2).to.eq(3)
        })
    })

    context('2 inner obects', function() {
        it('can generate data', function() {
            expect(1 + 2).to.eq(3)
        })
    })

    context('2 levels down', function() {
        specify('can generate data', function() {
            expect(27/9).to.eq(3)
        })
    })
})