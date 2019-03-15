var express = require('express');
var app = express();
const PORT=process.env.PORT || 3000
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// app.get('/api/timestamp/:date',function(req,res,next){

//   var date=req.params.date;
//   var regEx = /^\d{4}-\d{2}-\d{2}$/;
 
//   next()
// })
app.get('/api/timestamp',function(req,res){
   res.json({unix:new Date().getTime(), utc:new Date().toUTCString()})
})


app.get('/api/timestamp/:date',function(req,res){
      
  var date=new Date(req.params.date);

 
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(req.params.date.match(regEx)){
     res.json({unix:date.getTime(), utc:date.toUTCString()})
  }
  if(parseInt(req.params.date) === new Date(parseInt(req.params.date)).getTime()){
    res.json({unix:req.params.date, utc:new Date(parseInt(req.params.date)).toUTCString()})
  }
  else{
    res.json({error:'Invalid date'})
  }

})



// listen for requests :)
app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});