var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;


server.listen(3000, function() {
    console.log("Node listen on port 3000");
});
app.use(express.static(__dirname));
app.use(express.static('node_modules'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});



var requestoptions = {
    url: '',
    method: 'GET',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Charset': 'utf-8',
        'Host': 'railway.hinet.net',
        'Origin': 'http://railway.hinet.net',
        'Referer': 'http://railway.hinet.net/Foreign/TW/etno_roundtrip.html',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3423.2 Safari/537.36'
    }
};


var bookoptions = [
  "from_station",
  "to_station",
  "getin_date",
  "getin_date2",
  "order_qty_str"
];

app.get('/getalloptions',function(req, res){
    requestoptions.url = 'http://railway.hinet.net/Foreign/TW/etno_roundtrip.html';
    request(requestoptions, function(err, response, body){
      console.log(body);
      //res.send(body);
      //console.log(parseSelect(body, "from_station"));
      var parseresult = {};
      bookoptions.forEach(opt => {
        parseresult[opt] = parseSelect(body, opt);
      }) ;
      res.send(parseresult);
    });
});


function parseSelect(body, selectid) {
  var dom = new JSDOM(body);
  var collectedSelect = [];
  var sel = dom.window.document.querySelector('select[id="' + selectid + '"]');
  for (var i=0, n=sel.options.length;i<n;i++) { 
    if (sel.options[i].value) {
      var obj = {
        text: sel.options[i].text,
        value: sel.options[i].value
      };
      collectedSelect.push(obj);
    }
  }
  return collectedSelect;
}
