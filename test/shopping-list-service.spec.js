require('dotenv').config();
const shoppingListService = require('../src/shopping-list-service')
const knex = require('knex')
const expect = require('chai').expect;

describe(`testing Shopping-list`, function () {

  let db;

  let items1 = [
    {
      id: 1,
      name: 'first test item!',
      date_added: new Date('2000-05-22T16:28:32.615Z'),
      checked: false,
      price: '21.00',
      category: 'Breakfast'
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-06-22T16:28:32.615Z'),
      checked: false,
      price: '1.00',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'third test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: false,
      price: '5.00',
      category: 'Main'
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  
  context('testing shopping list with test data', function () {

    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(items1)
    })

    it('should delete ', () => {
      const id = 1;
      return shoppingListService.deleteItem(db, id)
        .then(() => shoppingListService.getAllItems(db))
        .then(items => {
          const expected = items1.filter(item => item.id !== id)
          expect(items).to.eql(expected)
        })

    })

    it('should update', () => {
      const id = 1;
      const field = {
        name: 'Second test item!',
        date_added: new Date('2100-06-22T16:28:32.615Z'),
        checked: false,
        price: '1.00',
        category: 'Snack'
      };

      return shoppingListService.updateItem(db, id, field)
        .then(() => shoppingListService.getItemById(db, id))
        .then(item => {
          // expect(item).to.eql(Object.assign({}, id,field))
          expect(item).to.eql([{
            id: id,
            ...field
          }])
        })
    })

    it('should get item by id', () => {

      return shoppingListService.getItemById(db, 1)
        .then(data => {
          expect(data).to.eql([{
            id: 1,
            name: 'first test item!',
            date_added: new Date('2000-05-22T16:28:32.615Z'),
            checked: false,
            price: '21.00',
            category: 'Breakfast'
          }])
        })
    })

  })

  context('testing shopping list with no data', () => {
    it('testing insertItem', () => {
      const item = {
        name: 'potatoes',
        date_added: new Date(),
        price: '300.00',
        checked: false,
        category: 'Lunch'
      }
      return shoppingListService.insertItem(db, item)
        .then(data => {
          expect(data).to.eql({
            id: 1,
            name: item.name,
            date_added: item.date_added,
            price: item.price,
            checked: item.checked,
            category: item.category
          })

        })
    })

    it('testing getAllItem', () => {

      return shoppingListService.getAllItems(db)
        .then(data => {
          expect(data).to.eql([])
        })
    })
  })

})