require('dotenv').config(); 
const knex = require('knex'); 
const knexInstance = knex({ client: 'pg', connection: process.env.DB_URL, });

// 1. Get all Items that contain Text

function searchByListItem(searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(results => { console.log(results)});
}

// searchByListItem('Sal');

// 2. Get all items paginated

function paginateList(pageNum){
  const itemsPerPage = 6;
  const offSet = itemsPerPage * (pageNum - 1);

  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offSet)
    .then(results => {console.log(results)})
}

// paginateList(3);

// 3. Get all items added after date

function itemsAddedAfterDate(daysAgo){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(results => {console.log(results)})
}

// itemsAddedAfterDate(2);

// 4. Get the total cost for each category

function totalCost(){
  knexInstance
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .then(results => {console.log(results)})
}

totalCost();