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
    mango.save(function(err, user){
      if(err) return console.error(err);
    });
*/
  });
  App.post('/api/room/add', (req, res) => {
    const isConf = req.body.is_conf;
    const currentUserId = -1; 
    var _room = new Room({
      _hostId: currentUserId,
      is_conf: isConf,
      is_live: true
    });
  });
}
