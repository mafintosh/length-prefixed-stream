# length-prefixed-stream

Streaming equivalent of [length-prefixed-message](https://github.com/sorribas/length-prefixed-message).
This module allow you to send `Buffer`s with a varint length prefix to ensure that they will arrive unpartioned

```
npm install length-prefixed-stream
```

[![build status](https://travis-ci.org/mafintosh/length-prefixed-stream.svg?branch=master)](https://travis-ci.org/mafintosh/length-prefixed-stream)

## Usage

``` js
var lpstream = require('length-prefixed-stream')

var encode = lpstream.encode() // create an encode stream to send data
var decode = lpstream.decode() // create an decode stream to receive data

encode.write('hello world') // send "hello world"

decode.on('data', function(data) {
  console.log(data.toString()) // will always print "hello world"
})

encode.pipe(decode) // for testing just pipe to our selves
```

## Encoding format

This library encodes each chunks as follows:

```
<length-of-chunk-1> <chunk-1> <length-of-chunk-2> <chunk-2> …
```

The length of the following chunk is encoded using [`varint`](https://github.com/chrisdickinson/varint#readme), which follows the [protobuf-style varint encoding](https://developers.google.com/protocol-buffers/docs/encoding#varints).

As an example, we're going to encode two ASCII chunks:

```
1st chunk:
68 65 79                            hey
2nd chunk:
68 65 6c 6c 6f 20 77 6f 72 6c 64    hello world
```

Encoded using `length-prefixed-stream`, they look like this:

```
03                                  varint-encoded length of 1st chunk
68 65 79                            1st chunk (3 bytes)
0b                                  varint-encoded length ()of 2nd chunk
68 65 6c 6c 6f 20 77 6f 72 6c 64    2nd chunk (11 bytes)
```

## API

#### `transformStream = lpstream.encode()`

Creates a new encoder transform stream.

#### `transformStream = lpstream.decode()`

Creates a new decoder transform stream.

## License

MIT
