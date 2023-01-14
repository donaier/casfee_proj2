import { TransactionService } from 'src/app/shared/services/transaction.service'
import { Account } from 'src/app/shared/types/account'
import { csvMask } from 'src/app/shared/types/csvMask'

describe('Unit Test Transaction Service', () => {
  const ts = new TransactionService

  before(() => {
    expect(ts.extractMonths).to.be.a('function')
    expect(ts.resolveCsvMask).to.be.a('function')
    expect(ts.cookTransactions).to.be.a('function')
  })

  context('transaction cooking', () => {
    it('returns transactions with normalized date', () => {
      cy.fixture('csvMask').then((mask: csvMask) => {
        cy.fixture('pastedCsvTransactions').then((paste) => {
          ts.cookTransactions(paste, mask).forEach(t => {
            // date format wanted is "dd.mm.yyyy"
            expect(t.date).to.match(/^\d{2}.\d{2}.\d{4}$/)
          })
        })
      })
    })

    it('returns the transactions reversed (should then be oldest first)', () => {
      cy.fixture('csvMask').then((mask: csvMask) => {
        cy.fixture('pastedCsvTransactions').then((paste) => {
          expect(ts.cookTransactions(paste, mask).at(0)?.date).to.eq('01.01.2020')
        })
      })
    })
  })

  context('csv mask resolving', () => {
    it('returns null if no amount is found', () => {
      cy.fixture('csvMaskInvalid').then((mask: csvMask) => {
        expect(ts.resolveCsvMask(mask)).to.be.null
      })
    })

    it('returns positions if all values are present', () => {
      cy.fixture('csvMask').then((mask: csvMask) => {
        expect(ts.resolveCsvMask(mask)).to.deep.eq(
          {"datePos": 0, "descriptionPos": 1, "amountPos": [2,3]}
        )
      })
    })
  })

  context('month extraction', () => {
    it('with no transactions', () => {
      expect(ts.extractMonths([])).to.be.empty
    })

    it('with all the same month', () => {
      cy.fixture('AccountWithTransactions').then((acc: Account) => {
        expect(ts.extractMonths([acc])).to.have.lengthOf(1)
      })
    })

    it('with three different months', () => {
      cy.fixture('AccountWithTransactionsOfDifferentMonths').then((acc: Account) => {
        expect(ts.extractMonths([acc])).to.have.lengthOf(3)
      })
    })
  })
})
