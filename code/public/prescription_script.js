/****************************************************************************
 * Author: Riley Kraft
 * Date: 08/08/2018
 * Description: This script enables the photo carousel on the home page to
 * 				operate automatically on a timed loop.
 * Resources:
 * 		
 ***************************************************************************/

document.getElementById('addPrescription').addEventListener('click',function(event){	// Add event listener to the Add Entry button on the home page
	var newEntry = document.getElementById("newPrescription");							// Get form to add prescription
	var req = new XMLHttpRequest();													    // Generate request

	var frequency = newEntry.elements.frequency.value;
	if (frequency == "every") {
		frequency = "every " + newEntry.elements.count.value + " days";
	}
	elif (frequency == "custom") {
		frequency = "every ";
		if (newEntry.elements.sun.value == true) {
			frequency += newEntry.elements.sun.value + ", ";
		}
		if (newEntry.elements.mon.value == true) {
			frequency += newEntry.elements.mon.value + ", ";
		}
		if (newEntry.elements.tue.value == true) {
			frequency += newEntry.elements.tue.value + ", ";
		}
		if (newEntry.elements.wed.value == true) {
			frequency += newEntry.elements.wed.value + ", ";
		}
		if (newEntry.elements.thu.value == true) {
			frequency += newEntry.elements.thu.value + ", ";
		}
		if (newEntry.elements.fri.value == true) {
			frequency += newEntry.elements.fri.value + ", ";
		}
		if (newEntry.elements.sat.value == true) {
			frequency += newEntry.elements.sat.value + ", ";
		}
	}
	
	var qparams = "name="+newEntry.elements.name.value+				                    // Create qparams package
					"&date_entered="+Date.now()+
					"&start_date="+newEntry.elements.start_date.value+
					"&expir_date="+newEntry.elements.expir_date.value+
					"&quantity="+newEntry.elements.quantity.value+
					"&quantity_unit="+newEntry.elements.quantity_unit.value+
					"&dosage="+newEntry.elements.dosage.value+
					"&dosage_unit="+newEntry.elements.dosage_unit.value+
					"&frequency="+frequency;

	req.open("GET", "/prescription/insertmed?"+qparams, true);							     // Open insert request
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		     // Set request to URL Encoded type
	req.send("/prescription/insertmed?"+qparams);	
	event.preventDefault();
	
	
	req = new XMLHttpRequest();													    // Generate request
	var medID = mysql.pool.query('SELECT LAST_INSERT_ID()');
	
	qparams = "medication_ide="+medID+				                                // Create qparams package
				"&rx_number="+newEntry.elements.rx_number.value+
				"&rx_date="+newEntry.elements.rx_date.value+
				"&rx_expir="+newEntry.elements.rx_expir.value+
				"&refills="+newEntry.elements.refills.value+
				"&reminder_dosage="+newEntry.elements.reminder_dosage.value+
				"&reminder_time="+newEntry.elements.reminder_time.value+
				"&doctor_id="+newEntry.elements.doctor_id.value;

	req.open("GET", "/prescription/insertscript?"+qparams, true);							     // Open insert request
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		     // Set request to URL Encoded type
	req.send("/prescription/insertscript?"+qparams);	
	event.preventDefault();
});