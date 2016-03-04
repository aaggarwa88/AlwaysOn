const authKey = "auth";
const authData = null;

function store(data, callback) {
  var obj = {};
  obj[authKey] = data;
  chrome.storage.sync.set(obj, function () {
      console.log('Saved Auth');
      callback();
  });
}

function get(callback) {
  chrome.storage.sync.get(authKey, function (data) {
      callback(data.auth);
  });
}

function logout(callback) {
  chrome.storage.sync.remove(authKey, function (data) {
      callback();
  });
}


module.exports = {
  store: store,
  get: get,
  logout: logout
}
