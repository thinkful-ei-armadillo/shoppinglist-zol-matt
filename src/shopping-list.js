require('dotenv').config();
const knex = require('knex');

const knex1 = knex({
  client: 'pg',
  connection: "postgresql://dunder_mifflin_admin@localhost/dunder"
});

function search(searchTerm){
  knex1('shopping_list')
    .select('*')
    .where({'name': searchTerm })
    .then(data => console.log(data))
};

function page(pageNumber){
  const offset = (pageNumber-1)* 6;

  knex1('shopping_list')
    .select('*')
    .limit(6)
    .offset(offset)
    .then(data => console.log(data))
}

page(3);