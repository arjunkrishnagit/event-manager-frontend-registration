const express = require('express');
const path = require('path');
const app = express();

exports.index = function (req, res) {
    var subdomain = getSubdomain(req.headers.host);
    // console.log(subdomain);
  };
app.use(express.static(__dirname + '/dist/event-manager'));
app.get('/*', function(req,res)

{res.sendFile(path.join(__dirname+'/dist/event-manager/index.html'));});

app.listen(process.env.PORT || 8080);

function getSubdomain(h) {
    var parts = h.split(".");
    if (parts.length == 2) return "www";
    return parts;
  }

