var varint = require('varint')
var stream = require('readable-stream')
var util = require('util')

var pool = new Buffer(10*1024)

var Encoder = function() {
  if (!(this instanceof Encoder)) return new Encoder()
  stream.Transform.call(this)
}

util.inherits(Encoder, stream.Transform)

Encoder.prototype._transform = function(data, enc, cb) {
  varint.encode(data.length, pool)
  this.push(pool.slice(0, varint.encode.bytes))

  pool = pool.slice(varint.encode.bytes)
  if (pool.length < 100) pool = new Buffer(10*1024)

  this.push(data)
  cb()
}

module.exports = Encoder