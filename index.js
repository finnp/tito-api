var request = require('hyperquest')
var JSONStream = require('JSONStream')

module.exports = Tito

function Tito (authToken) {
  if (!(this instanceof Tito)) return new Tito(authToken)
  this.authToken = authToken
}

Tito.prototype.tickets = function () {
  return this.request('tickets').pipe(JSONStream.parse('tickets.*'))
}

Tito.prototype.events = function () {
  return this.request('timeline').pipe(JSONStream.parse('events.*'))
}

Tito.prototype.accounts = function () {
  return this.request('accounts').pipe(JSONStream.parse('accounts.*'))
}

Tito.prototype.request = function (endpoint) {
  var uri = 'https://api.tito.io/' + endpoint + '?auth_token=' + this.authToken
  return request(uri, { headers: { 'accept': 'application/json' } })
}
