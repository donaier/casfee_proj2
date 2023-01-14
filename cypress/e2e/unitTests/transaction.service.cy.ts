import { TransactionService } from '../../../src/app/shared/services/transaction.service'

describe('Unit Test Transaction Service', function () {
  const ts = new TransactionService

  before(() => {
    expect(ts.extractMonths, 'extractMonths').to.be.a('function')
    expect(ts.resolveCsvMask, 'resolveCsvMask').to.be.a('function')
    expect(ts.cookTransactions, 'cookTransactions').to.be.a('function')
  })

  context('month extraction', function() {
    it('with no transactions', function() {
      expect(ts.extractMonths([])).to.be.empty
    })
  })
})
