var request = require('hyperquest')
var JSONStream = require('JSONStream')

module.exports = v2

function v2 (authToken) {
  if (!(this instanceof v2)) return new v2(authToken)
  this.authToken = authToken
}

/*
  This endpoint retrieves all Events for the given Account.

  curl --request GET \
  --url 'https://api.tito.io/account/events' \
  --header 'Authorization: Token token=secret-api-key' \
  --header 'Accept: application/json' \
*/
v2.prototype.events = function (account) {
  return this.request(account + '/events').pipe(JSONStream.parse('events.*'))
}

/*
  This endpoint retrieves all Releases for the given Event.

  curl --request GET \
  --url 'https://api.tito.io/account/event/releases' \
  --header 'Authorization: Token token=secret-api-key' \
  --header 'Accept: application/json' \
*/
v2.prototype.releases = function (account, event) {
  return this.request(account + '/' + event + '/releases').pipe(JSONStream.parse('releases.*'))
}


v2.prototype.request = function (endpoint) {
  var uri = 'https://api.tito.io/v2/' + endpoint
  return request(uri, {
    headers: {
      'accept': 'application/vnd.api+json',
      'authorization': 'Token token=' + this.authToken,
    }
  })
}
