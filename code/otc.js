/****************************************************************************
 * Author: Riley Kraft
 * Date: 08/08/2018
 * Description: This script enables the Submit button on the prescription
 *              medication form.
 * Resources:
 * 		
 ***************************************************************************/

module.exports = function(){
  var express = require('express');
  var router = express.Router();
  var mysql = require('./dbcon.js');
  
  router.get('/', function(req, res, next){																// Default to view schools table
    res.render('otc');																		// Render the context on the home page
  });

  router.get('/insertmed',function(req,res,next){																			// Insert new row into schools table
    var context = {};
    mysql.pool.query("INSERT INTO `medication` (`name`, `start_date`, `expir_date`, `quantity`, `quantity_unit`, `dosage`, `dosage_unit`, `instructions`, `duration`, `frequency`, `date_entered`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 			// Submit query to insert new data into schools table
      [req.query.name, req.query.start_date, req.query.expir_date, req.query.quantity, req.query.quantity_unit, req.query.dosage, req.query.dosage_unit, req.query.instructions, req.query.durations, req.query.frequency, req.query.date_entered], 
      function(err, result){
        if(err){
          next(err);
          return;
        }
      }
    );
    context.inserted = result.insertId;
    res.send(JSON.stringify(context));
  });
  
  return router;
}();

