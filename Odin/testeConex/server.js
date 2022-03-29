var express = require('express');
var path = require('path');
var url = require('url');
ddd = express()
ddd.use(express.static(path.join(__dirname, 'static')));
ddd.listen(3030)