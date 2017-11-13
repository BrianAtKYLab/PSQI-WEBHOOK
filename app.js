// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
const http = require('http').Server(app);
const io = require('socket.io')(http);

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('<h1>KYLAB</h1>');
});

app.post('/psqi', (req, res) => {
  var datas = req.body;
  console.log('datas from google form',datas)
  for (var j = 0; j < datas.length; j++) {
    var data = datas[j];   
    console.log('data object',j, ':', data)  }
  res.status(200).send('true');
});

// [END hello_world]
// WEb socket events

io.on('connection', function (socket) {
  console.log('a user connected');
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = http.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = http;
