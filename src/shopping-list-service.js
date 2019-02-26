const shoppingListService = {
   insertItem(knex1, item){
    return knex1
      .insert(item)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getAllItems(knex){
    return knex
      .from('shopping_list')
      .select('*')
  },

  deleteItem(knex, id){
    return knex
      .from('shopping_list')
      .del()
      .where('id', id)
  },
  
  updateItem(knex, id, field){
    return knex
      .from('shopping_list')
      .where({id})
      .update(field)
  },

  getItemById(knex,id){
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
  }
  
}
module.exports = shoppingListService 



