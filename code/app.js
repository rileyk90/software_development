//init the required packages
const express = require('express');
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');

const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');

// init the view engine
app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

// serving the static pages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('mysql', mysql);

app.use('/prescription', require('./prescription.js'));
app.use('/otc', require('./otc.js'));
// connect to the db

mysql.pool.getConnection(function(err) {
  if (err) throw err;
  else {
     console.log("Connected to the database");
  }
});

//serving the main page
app.get('/', function(req, res, next)  {
   res.status(200);

// get username
   var userName = 'Stan';
   // get name of webpage
   var pageName = 'My Complete Healthcare';
   // get today's date
   var dd = new Date();
   var year = dd.getFullYear();
   var month = dd.getMonth() + 1;
   var day = dd.getDate();
   var curDate = year + '/' + month + '/' + day;
   // fill in template and render
   function fillHomePage(){
       var homeVar ={};
       homeVar.userName = userName;
       homeVar.pageName = pageName;
       homeVar.date = curDate;
       return homeVar;
   }
   res.render('homePage', fillHomePage());
});

app.get('/survey_instructions', function(req, res, next)  {
   res.status(200);
   // res.render('helloWorld.handlebars');

// get username
   var userName = 'Stan';
   // get name of webpage
   var pageName = 'Survey Instructions';
   // get today's date
   var dd = new Date();
   var year = dd.getFullYear();
   var month = dd.getMonth() + 1;
   var day = dd.getDate();
   var curDate = year + '/' + month + '/' + day;
   // fill in template and render
   function fillInstructionPage(){
       var instructionsVar ={};
       instructionsVar.userName = userName;
       instructionsVar.pageName = pageName;
       instructionsVar.date = curDate;
       return instructionsVar;
   }
   res.render('instructionPage', fillInstructionPage());
});

app.get('/survey', function(req, res, next)  {
   res.status(200);
   // if(req.query.qID<=0) { req.query.qID = 1;}
   // console.log(req.query.qID)
   // var questionNumber = req.query.qID;
   var questionNumber = Math.floor(Math.random() * 11) + 1;
   console.log(questionNumber);
   mysql.pool.query("SELECT `description` FROM Question WHERE ID=?", [questionNumber] , function (err, result, fields) {
    if (err) throw err;
    // get username
    var userName = 'Stan';
    // get name of webpage
    var pageName = 'Daily Survey';
     console.log(result[0].description);
     var surveyQuestion = result[0].description;
     //console.log(JSON.parse(result[0]));
     // get today's date
     var dd = new Date();
     var year = dd.getFullYear();
     var month = dd.getMonth() + 1;
     var day = dd.getDate();
     var curDate = year + '/' + month + '/' + day;
     // fill in template and render
     function fillSurveyPage(){
         var surveyVar ={};
         surveyVar.userName = userName;
         surveyVar.pageName = pageName;
         surveyVar.date = curDate;
         surveyVar.questionNumber = questionNumber;
         surveyVar.surveyQuestion = surveyQuestion;
         return surveyVar;
     }
     res.render('surveyPage', fillSurveyPage());
   });

});

app.get('/prescription_page', function(req, res, next)  {
   res.status(200);
   res.render('prescription');
});

app.get('/otc_page', function(req, res, next)  {
   res.status(200);
   res.render('otc');
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//setting the port to the env variable or 3000 as default
 // var port = process.env.PORT || 3000;
 // app.listen(port);


/**************************************************************
 *  alternate listening port
 *   *************************************************************/
app.set('port', 4857);
app.listen(app.get('port'), function(){
    console.log('Express started http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
