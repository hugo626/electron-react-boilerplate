
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movie').del()
    .then(function () {
      // Inserts seed entries
      return knex('movie').insert([
        {id: 1,
          path:'\\\\SERVER\\video\\myVideo\\4-17 新作33連發',
          entry: 'PPPD463.avi',
          code: 'PPPD463',
          cover:'PPPD463.jpg',
          createDateTime:'',
          watchDateTime:'',
          rating:''},
      ]);
    });
};
