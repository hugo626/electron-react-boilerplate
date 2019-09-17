const knex = require('./index');

const dbApi = {
  fetchAll: () => (knex.select().from('todos')),
  findByCode: (codeName) => (knex.select().from('movie').where('code','like',`%${codeName}%`)),
  addMovies : (movies) =>(
    knex.batchInsert('movie', movies)
    .then((ids)=>console.log(ids))
    .catch((error)=>{
      console.log(error);
    }))
}
export default dbApi;
