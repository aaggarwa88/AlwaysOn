/*
  User Settings:
    @settopbox: User selected set top box
*/
const userKey = "user";

function store(settingName, data, callback) {
  var obj = {};
  obj[authKey] = data;
  chrome.storage.sync.set(obj, function () {
      console.log('Saved Auth');
      callback();
  });
}

function get(settingName, callback) {
  chrome.storage.sync.get(authKey, function (data) {
      callback(data.auth);
  });
}

module.exports = {
  store: store,
  get: get,
  logout: logout
}
