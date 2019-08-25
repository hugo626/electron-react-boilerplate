const knex = require('./index');

const dbApi = {
  fetchAll : ()=>(knex.select().from('todos'))
}
export default dbApi;
