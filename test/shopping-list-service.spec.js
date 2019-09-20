require('dotenv').config()
const shoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('shopping list service object', () =>{
    let db
    let testList = [
    {id: 1, name: 'Fishies', price: '23.10', category: 'Snack', checked: false, date_added: new Date('2029-01-02T16:28:32.615Z')},
    {id: 2, name: 'trickies', price: '3.10', category: 'Breakfast', checked: false, date_added: new Date('2029-01-02T16:28:32.615Z')},
    {id: 3, name: 'Fricks', price: '10.59', category: 'Main', checked: false, date_added: new Date('2029-01-02T16:28:32.615Z')},
    ]

    before(() =>{
        db=knex({client: 'pg', connection: process.env.TEST_DB_URL})
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context('Given shopping_list has data', () =>{
        beforeEach(() =>{
            return db
            .into('shopping_list')
            .insert(testList)
        })

        it('get all items', () =>{
            return shoppingListService.getAllItems(db)
                .then(actual =>{
                    expect(actual).to.eql(testList.map(item =>({
                        ...item, date_added: new Date('2029-01-02T16:28:32.615Z')
                    })))
                })
        })
        it(`insertItem() inserts an article and resolves the article with an 'id'`, () => {
            const newItem = {name: 'Fricks', price: '10.59', category: 'Main', checked: false, date_added: new Date('2029-01-02T16:28:32.615Z')}
           return shoppingListService.insertItem(db, newItem)
             .then(actual => {
               expect(actual).to.eql({
                 id: newItem.id,
                 name: newItem.name,
                 price: newItem.price,
                 category: newItem.category,
                 checked: newItem.checked,
                 date_added: newItem.date_added
               })
             })
          })
    })
})