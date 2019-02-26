'use strict';
require('dotenv').config();

const knex = require('knex');

const knex1 = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function search(searchTerm){
  knex1('shopping_list')
    .select('*')
    .where({'name': searchTerm })
    .then(data => console.log(data));
}

function page(pageNumber){
  const offset = (pageNumber-1)* 6;

  knex1('shopping_list')
    .select('*')
    .limit(6)
    .offset(offset)
    .then(data => console.log(data));
}

// page(3);

function daysAgo(days){
  knex1('shopping_list')
    .select('*')
    .where('date_added', '>', knex1.raw(`now() - '?? days'::INTERVAL`, days))
    .then(data => console.log(data));
}

// daysAgo(7);

function totalCost(){
  knex1('shopping_list')
    .select('category')
    .sum('price')
    .groupBy('category')
    .then(data => console.log(data));
}

totalCost();