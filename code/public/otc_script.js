/****************************************************************************
 * Author: Riley Kraft
 * Date: 08/07/2018
 * Description: This script enables the photo carousel on the home page to
 * 				operate automatically on a timed loop.
 * Resources:
 * 		
 ***************************************************************************/
document.getElementById('addOTC').addEventListener('click',function(event){	// Add event listener to the Add Entry button on the home page
	var newEntry = document.getElementById("newOTC");							// Get form to add prescription
	var req = new XMLHttpRequest();													    // Generate request

	/*var frequency = newEntry.elements.frequency.value;
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
	}*/
	
	var qparams = "name="+newEntry.elements.name.value+				                    // Create qparams package
					"&start_date="+newEntry.elements.start_date.value+
					"&expir_date="+newEntry.elements.expir_date.value+
					"&quantity=NULL"+
					"&quantity_unit=NULL"+
					"&dosage="+newEntry.elements.dosage.value+
					"&dosage_unit="+newEntry.elements.dosage_unit.value+
					"&instructions="+newEntry.elements.instructions.value; /*+
					"&duration="newEntry.elements.duration.value+
					"&frequency="+frequency;*/

	req.open("GET", "/otc/insertmed?"+qparams, true);							     // Open insert request
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		     // Set request to URL Encoded type
	req.send("/otc/insertmed?"+qparams);	
	event.preventDefault();
});
