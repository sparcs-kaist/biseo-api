module.exports = (App, User, Room, Vote) =>
{
  App.get('/', (req, res) => {
    json_test = {response: 'Hello, world'};
    res.json(json_test.response);
/* DB UPDATE TEST...
    var mango = new User({nickname: "mango",
                          email: "mango@sparcs.org",
                          is_admin: false,
                          type: -1});
    mango.save(function(err, mango){
      if(err) return console.error(err);
    });
*/
  });
}
