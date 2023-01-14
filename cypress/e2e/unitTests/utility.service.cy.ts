import { UtilityService } from 'src/app/shared/services/utility.service'

import { Account } from 'src/app/shared/types/account'
import { CategoryGroup, Category } from 'src/app/shared/types/category'


describe('Unit Test Utility Service', function () {
  const us = new UtilityService

  before(() => {
    expect(us.checkavailableCategories, 'checkavailableCategories').to.be.a('function')
    expect(us.calculateCurrentValue, 'calculateCurrentValue').to.be.a('function')
  })

  context('current Value Calculation', function() {
    it('on Account with no transactions', function() {
      cy.fixture('AccountNoTransactions').then((acc: Account) => {
        expect(us.calculateCurrentValue(acc)).to.eq(
          Number(acc.initialValue).toFixed(2)
        )
      })
    })

    it('on Account with a transaction', function() {
      cy.fixture('AccountWithTransactions').then((acc: Account) => {
        expect(us.calculateCurrentValue(acc)).to.eq(
          Number(0).toFixed(2)
        )
      })
    })
  })

  context('Category availability', function() {
    it('without any data', function() {
      expect(us.checkavailableCategories([], [])).to.be.empty
    })
    
    it('with valid categories + groups', function() {
      cy.fixture('ValidCategoriesAndGroups').then((cat: {groups: CategoryGroup[], categories: Category[]}) => {
        us.checkavailableCategories(cat.groups, cat.categories).forEach(group => {
          if (group.name == 'hasNoChildren') {
            expect(group.categories).to.eq(false)
          }
          if (group.name == 'hasChildren') {
            expect(group.categories).to.eq(true)
          }
        })
      })
    })
  })
})
