window.onbeforeunload = function(){
		return "Warning: Navigating from this page or converting format of data will erase all of your patient and variant table data. Please download your .CSV to avoid losing your table data.";
	}

//Category variables
var pvsScore = 0;
var psScore = 0;
var pmScore = 0;
var ppScore = 0;
var baScore = 0;
var bsScore = 0;
var bpScore = 0;
var artScore = 0;

//Functions to add or subtract from each category variable
var addToART = function() {
	artScore += 1;
	};
var subtractFromART = function() {
	artScore -= 1;
	};
var addToPVS = function() {
	pvsScore += 1;
	};
var subtractFromPVS = function() {
	pvsScore -= 1;
	};
var addToPS = function() {
	psScore += 1;
	};
var subtractFromPS = function() {
	psScore -= 1;
	};
var addToPM = function() {
	pmScore += 1;
	};
var subtractFromPM = function() {
	pmScore -= 1;
	};
var addToPP = function() {
	ppScore += 1;
	};
var subtractFromPP = function() {
	ppScore -= 1;
	};
var addToBA = function() {
	baScore += 1;
	};
var subtractFromBA = function() {
	baScore -= 1;
	};
var addToBS = function() {
	bsScore += 1;
	};
var subtractFromBS = function() {
	bsScore -= 1;
	};
var addToBP = function() {
	bpScore += 1;
	};
var subtractFromBP = function() {
	bpScore -= 1;
	};

//Algorithm to assign pathogenicity by ACMG standards	
var pathAssign = "none";
var pathogenicACMG = "VUS";
var acmgPathogenic = function() {
		if (pvsScore == 1 && psScore >= 1) {
			pathogenicACMG = "Pathogenic (Ia)";
			pathAssign = "assigned";
			} else if (pvsScore == 1 && pmScore >= 2) {
			pathogenicACMG = "Pathogenic (Ib)";
			pathAssign = "assigned";
			} else if (pvsScore == 1 && pmScore == 1 && ppScore == 1) {
			pathogenicACMG = "Pathogenic (Ic)";
			pathAssign = "assigned";
			} else if (pvsScore == 1 && ppScore >= 2) {
			pathogenicACMG = "Pathogenic (Id)";
			pathAssign = "assigned";
			} else if (psScore >= 2) {
			pathogenicACMG = "Pathogenic (II)";
			pathAssign = "assigned";
			} else if (psScore == 1 && pmScore >= 3) {
			pathogenicACMG = "Pathogenic (IIIa)";
			pathAssign = "assigned";
			} else if (psScore == 1 && pmScore == 2 && ppScore >= 2) {
			pathogenicACMG = "Pathogenic (IIIb)";
			pathAssign = "assigned";
			} else if (psScore == 1 && pmScore == 1 && ppScore >= 4) {
			pathogenicACMG = "Pathogenic (IIIc)";
			pathAssign = "assigned";
			} else if (pvsScore == 1 && pmScore == 1) {
			pathogenicACMG = "Likely pathogenic (I)";
			pathAssign = "assigned";
			} else if (psScore == 1 && (pmScore == 1 || pmScore == 2)) {
			pathogenicACMG = "Likely pathogenic (II)";
			pathAssign = "assigned";
			} else if (psScore == 1 && ppScore >= 2) {
			pathogenicACMG = "Likely pathogenic (III)";
			pathAssign = "assigned";
			} else if (pmScore >= 3) {
			pathogenicACMG = "Likely pathogenic (IV)";
			pathAssign = "assigned";
			} else if (pmScore == 2 && ppScore >= 2) {
			pathogenicACMG = "Likely pathogenic (V)";
			pathAssign = "assigned";
			} else if (pmScore == 1 && ppScore >= 4) {
			pathogenicACMG = "Likely pathogenic (VI)";
			pathAssign = "assigned";
			} else {
			pathogenicACMG = "VUS";
			pathAssign = "none";
			}
	};

//Algorithm to assign benign status by ACMG standards
var benAssign = "none";
var benignACMG = "VUS";
var acmgBenign = function() {
		if (baScore == 1){
			benignACMG = "Benign (I)";
			benAssign = "assigned";
			} else if (bsScore >= 2) {
			benignACMG = "Benign (II)";
			benAssign = "assigned";
			} else if (bsScore == 1 && bpScore == 1) {
			benignACMG = "Likely benign (I)";
			benAssign = "assigned";
			} else if (bpScore >= 2) {
			benignACMG = "Likely benign (II)";
			benAssign = "assigned";
			} else {
			benignACMG = "VUS";
			benAssign = "none"
			}
	};
	
//Algorithm to assign artifact status by ACMG standards
var artAssign = "none";
var artACMG = "VUS";
var acmgArtifact = function() {
		if (artScore == 1){
			artACMG = "Artifact";
			artAssign = "assigned";
			} else {
			artACMG = "VUS";
			artAssign = "none"
			}
	};

//Function to output pathogenicity to screen
var acmgClass = document.getElementById("acmgclass");
var ClassificationACMG = "";
var acmgCompare = function(){
		if (artAssign == "assigned"){
			ClassificationACMG = artACMG;
			} else if (pathAssign == "assigned" && benAssign == "assigned"){
			ClassificationACMG = "VUS - conflicting evidence";
			} else if (pathAssign == "assigned"){
			ClassificationACMG = pathogenicACMG;
			} else if (benAssign == "assigned"){
			ClassificationACMG = benignACMG;
			} else {
			ClassificationACMG = "VUS - not enough evidence";
			};
		acmgClass.textContent = ClassificationACMG;
	};

//Function to run ACMG algorithms and output pathogenicity
var acmgClassification = function() {
	acmgArtifact();
	acmgPathogenic();
	acmgBenign();
	acmgCompare();
	};

//Button to add to variant table
var allEvidence = "";
var patient = document.getElementById("patient_id");
var variant = document.getElementById("variant_id");
var clicks = 0;
var addRow = function() {
	var table = document.getElementById("myTableData");
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	row.insertCell(0).innerHTML= variant.value;
	row.insertCell(1).innerHTML= ClassificationACMG;
	row.insertCell(2).innerHTML= allEvidence;
	row.insertCell(3).innerHTML= '<input type="button" value="Delete" onClick="deleteRow(this)">';
	};
function deleteRow(obj){
	var index = obj.parentNode.parentNode.rowIndex;
	var table = document.getElementById("myTableData");
	table.deleteRow(index);
	}
var clearData = function() {
	ClassificationACMG = "";
	pathAssign = "none";
	pathogenicACMG = "VUS";
	benignACMG = "VUS";
	benAssign = "none";
	artAssign = "none";
	artACMG = "VUS";
	allEvidence = "";
	pvsScore = 0;
	psScore = 0;
	pmScore = 0;
	ppScore = 0;
	baScore = 0;
	bsScore = 0;
	bpScore = 0;
	artScore = 0;
	artButton.textContent = "_";
	pvs1Button.textContent = "_";
	ps1Button.textContent = "_";
	ps2Button.textContent = "_";
	ps3Button.textContent = "_";
	ps4Button.textContent = "_";
	pm1Button.textContent = "_";
	pm2Button.textContent = "_";
	pm3Button.textContent = "_";
	pm4Button.textContent = "_";
	pm5Button.textContent = "_";
	pm6Button.textContent = "_";
	pp1sButton.textContent = "_";
	pp1mButton.textContent = "_";
	pp1Button.textContent = "_";
	pp2Button.textContent = "_";
	pp3Button.textContent = "_";
	pp4Button.textContent = "_";
	pp5Button.textContent = "_";
	ba1Button.textContent = "_";
	bs1Button.textContent = "_";
	bs2Button.textContent = "_";
	bs3Button.textContent = "_";
	bs4Button.textContent = "_";
	bp1Button.textContent = "_";
	bp2Button.textContent = "_";
	bp3Button.textContent = "_";
	bp4Button.textContent = "_";
	bp5Button.textContent = "_";
	bp6Button.textContent = "_";
	bp7Button.textContent = "_";
	document.getElementById("variant_id").value = "";
	acmgClassification();
	}
	
var tableCaption = document.getElementById("patient_table");
function includeData(){
	if (clicks == 0){
		tableCaption.textContent = document.getElementById("patient_id").value;
		};
	allEvidence = allEvidence.replace(/, $/,"");
	addRow();
	clearData();
	}

//Functions for each select button
var artButton = document.getElementById("artifact");
	var artClick = function() {
		if (artButton.textContent === "_"){
			artButton.textContent = "X";
			allEvidence += "Artifact, ";
			addToART();
			acmgClassification();
			} else {
			artButton.textContent = "_";
			allEvidence = allEvidence.replace("Artifact, ","");
			subtractFromART();
			acmgClassification();
			}
	};
	artButton.addEventListener("click", artClick);
var pvs1Button = document.getElementById("pvs1");
	var pvs1Click = function() {
		if (pvs1Button.textContent === "_"){
			pvs1Button.textContent = "X";
			allEvidence += "PVS1, ";
			addToPVS();
			acmgClassification();
			} else {
			pvs1Button.textContent = "_";
			allEvidence = allEvidence.replace("PVS1, ","");
			subtractFromPVS();
			acmgClassification();
			}
	};
	pvs1Button.addEventListener("click", pvs1Click);
var ps1Button = document.getElementById("ps1");
	var ps1Click = function() {
		if (ps1Button.textContent === "_"){
			ps1Button.textContent = "X";
			allEvidence += "PS1, ";
			addToPS();
			acmgClassification();
			} else {
			ps1Button.textContent = "_";
			allEvidence = allEvidence.replace("PS1, ","");
			subtractFromPS();
			acmgClassification();
			}
	};
	ps1Button.addEventListener("click", ps1Click);
var ps2Button = document.getElementById("ps2");
	var ps2Click = function() {
		if (ps2Button.textContent === "_"){
			ps2Button.textContent = "X";
			allEvidence += "PS2, ";
			addToPS();
			acmgClassification();
			} else {
			ps2Button.textContent = "_";
			allEvidence = allEvidence.replace("PS2, ","");
			subtractFromPS();
			acmgClassification();
			}
	};
	ps2Button.addEventListener("click", ps2Click);
var ps3Button = document.getElementById("ps3");
	var ps3Click = function() {
		if (ps3Button.textContent === "_"){
			ps3Button.textContent = "X";
			allEvidence += "PS3, ";
			addToPS();
			acmgClassification();
			} else {
			ps3Button.textContent = "_";
			allEvidence = allEvidence.replace("PS3, ","");
			subtractFromPS();
			acmgClassification();
			}
	};
	ps3Button.addEventListener("click", ps3Click);
var ps4Button = document.getElementById("ps4");
	var ps4Click = function() {
		if (ps4Button.textContent === "_"){
			ps4Button.textContent = "X";
			allEvidence += "PS4, ";
			addToPS();
			acmgClassification();
			} else {
			ps4Button.textContent = "_";
			allEvidence = allEvidence.replace("PS4, ","");
			subtractFromPS();
			acmgClassification();
			}
	};
	ps4Button.addEventListener("click", ps4Click);
var pm1Button = document.getElementById("pm1");
	var pm1Click = function() {
		if (pm1Button.textContent === "_"){
			pm1Button.textContent = "X";
			allEvidence += "PM1, ";
			addToPM();
			acmgClassification();
			} else {
			pm1Button.textContent = "_";
			allEvidence = allEvidence.replace("PM1, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm1Button.addEventListener("click", pm1Click);
var pm2Button = document.getElementById("pm2");
	var pm2Click = function() {
		if (pm2Button.textContent === "_"){
			pm2Button.textContent = "X";
			allEvidence += "PM2, ";
			addToPM();
			acmgClassification();
			} else {
			pm2Button.textContent = "_";
			allEvidence = allEvidence.replace("PM2, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm2Button.addEventListener("click", pm2Click);
var pm3Button = document.getElementById("pm3");
	var pm3Click = function() {
		if (pm3Button.textContent === "_"){
			pm3Button.textContent = "X";
			allEvidence += "PM3, ";
			addToPM();
			acmgClassification();
			} else {
			pm3Button.textContent = "_";
			allEvidence = allEvidence.replace("PM3, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm3Button.addEventListener("click", pm3Click);
var pm4Button = document.getElementById("pm4");
	var pm4Click = function() {
		if (pm4Button.textContent === "_"){
			pm4Button.textContent = "X";
			allEvidence += "PM4, ";
			addToPM();
			acmgClassification();
			} else {
			pm4Button.textContent = "_";
			allEvidence = allEvidence.replace("PM4, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm4Button.addEventListener("click", pm4Click);
var pm5Button = document.getElementById("pm5");
	var pm5Click = function() {
		if (pm5Button.textContent === "_"){
			pm5Button.textContent = "X";
			allEvidence += "PM5, ";
			addToPM();
			acmgClassification();
			} else {
			pm5Button.textContent = "_";
			allEvidence = allEvidence.replace("PM5, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm5Button.addEventListener("click", pm5Click);
var pm6Button = document.getElementById("pm6");
	var pm6Click = function() {
		if (pm6Button.textContent === "_"){
			pm6Button.textContent = "X";
			allEvidence += "PM6, ";
			addToPM();
			acmgClassification();
			} else {
			pm6Button.textContent = "_";
			allEvidence = allEvidence.replace("PM6, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pm6Button.addEventListener("click", pm6Click);
var pp1sButton = document.getElementById("pp1_s");
	var pp1sClick = function() {
		if (pp1sButton.textContent === "_"){
			pp1sButton.textContent = "X";
			allEvidence += "PP1-S, ";
			addToPS();
			acmgClassification();
			} else {
			pp1sButton.textContent = "_";
			allEvidence = allEvidence.replace("PP1-S, ","");
			subtractFromPS();
			acmgClassification();
			}
	};
	pp1sButton.addEventListener("click", pp1sClick);
var pp1mButton = document.getElementById("pp1_m");
	var pp1mClick = function() {
		if (pp1mButton.textContent === "_"){
			pp1mButton.textContent = "X";
			allEvidence += "PP1-M, ";
			addToPM();
			acmgClassification();
			} else {
			pp1mButton.textContent = "_";
			allEvidence = allEvidence.replace("PP1-M, ","");
			subtractFromPM();
			acmgClassification();
			}
	};
	pp1mButton.addEventListener("click", pp1mClick);
var pp1Button = document.getElementById("pp1");
	var pp1Click = function() {
		if (pp1Button.textContent === "_"){
			pp1Button.textContent = "X";
			allEvidence += "PP1, ";
			addToPP();
			acmgClassification();
			} else {
			pp1Button.textContent = "_";
			allEvidence = allEvidence.replace("PP1, ","");
			subtractFromPP();
			acmgClassification();
			}
	};
	pp1Button.addEventListener("click", pp1Click);
var pp2Button = document.getElementById("pp2");
	var pp2Click = function() {
		if (pp2Button.textContent === "_"){
			pp2Button.textContent = "X";
			allEvidence += "PP2, ";
			addToPP();
			acmgClassification();
			} else {
			pp2Button.textContent = "_";
			allEvidence = allEvidence.replace("PP2, ","");
			subtractFromPP();
			acmgClassification();
			}
	};
	pp2Button.addEventListener("click", pp2Click);
var pp3Button = document.getElementById("pp3");
	var pp3Click = function() {
		if (pp3Button.textContent === "_"){
			pp3Button.textContent = "X";
			allEvidence += "PP3, ";
			addToPP();
			acmgClassification();
			} else {
			pp3Button.textContent = "_";
			allEvidence = allEvidence.replace("PP3, ","");
			subtractFromPP();
			acmgClassification();
			}
	};
	pp3Button.addEventListener("click", pp3Click);
var pp4Button = document.getElementById("pp4");
	var pp4Click = function() {
		if (pp4Button.textContent === "_"){
			pp4Button.textContent = "X";
			allEvidence += "PP4, ";
			addToPP();
			acmgClassification();
			} else {
			pp4Button.textContent = "_";
			allEvidence = allEvidence.replace("PP4, ","");
			subtractFromPP();
			acmgClassification();
			}
	};
	pp4Button.addEventListener("click", pp4Click);
var pp5Button = document.getElementById("pp5");
	var pp5Click = function() {
		if (pp5Button.textContent === "_"){
			pp5Button.textContent = "X";
			allEvidence += "PP5, ";
			addToPP();
			acmgClassification();
			} else {
			pp5Button.textContent = "_";
			allEvidence = allEvidence.replace("PP5, ","");
			subtractFromPP();
			acmgClassification();
			}
	};
	pp5Button.addEventListener("click", pp5Click);
var ba1Button = document.getElementById("ba1");
	var ba1Click = function() {
		if (ba1Button.textContent === "_"){
			ba1Button.textContent = "X";
			allEvidence += "BA1, ";
			addToBA();
			acmgClassification();
			} else {
			ba1Button.textContent = "_";
			allEvidence = allEvidence.replace("BA1, ","");
			subtractFromBA();
			acmgClassification();
			}
	};
	ba1Button.addEventListener("click", ba1Click);
var bs1Button = document.getElementById("bs1");
	var bs1Click = function() {
		if (bs1Button.textContent === "_"){
			bs1Button.textContent = "X";
			allEvidence += "BS1, ";
			addToBS();
			acmgClassification();
			} else {
			bs1Button.textContent = "_";
			allEvidence = allEvidence.replace("BS1, ","");
			subtractFromBS();
			acmgClassification();
			}
	};
	bs1Button.addEventListener("click", bs1Click);
var bs2Button = document.getElementById("bs2");
	var bs2Click = function() {
		if (bs2Button.textContent === "_"){
			bs2Button.textContent = "X";
			allEvidence += "BS2, ";
			addToBS();
			acmgClassification();
			} else {
			bs2Button.textContent = "_";
			allEvidence = allEvidence.replace("BS2, ","");
			subtractFromBS();
			acmgClassification();
			}
	};
	bs2Button.addEventListener("click", bs2Click);
var bs3Button = document.getElementById("bs3");
	var bs3Click = function() {
		if (bs3Button.textContent === "_"){
			bs3Button.textContent = "X";
			allEvidence += "BS3, ";
			addToBS();
			acmgClassification();
			} else {
			bs3Button.textContent = "_";
			allEvidence = allEvidence.replace("BS3, ","");
			subtractFromBS();
			acmgClassification();
			}
	};
	bs3Button.addEventListener("click", bs3Click);
var bs4Button = document.getElementById("bs4");
	var bs4Click = function() {
		if (bs4Button.textContent === "_"){
			bs4Button.textContent = "X";
			allEvidence += "BS4, ";
			addToBS();
			acmgClassification();
			} else {
			bs4Button.textContent = "_";
			allEvidence = allEvidence.replace("BS4, ","");
			subtractFromBS();
			acmgClassification();
			}
	};
	bs4Button.addEventListener("click", bs4Click);
var bp1Button = document.getElementById("bp1");
	var bp1Click = function() {
		if (bp1Button.textContent === "_"){
			bp1Button.textContent = "X";
			allEvidence += "BP1, ";
			addToBP();
			acmgClassification();
			} else {
			bp1Button.textContent = "_";
			allEvidence = allEvidence.replace("BP1, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp1Button.addEventListener("click", bp1Click);
var bp2Button = document.getElementById("bp2");
	var bp2Click = function() {
		if (bp2Button.textContent === "_"){
			bp2Button.textContent = "X";
			allEvidence += "BP2, ";
			addToBP();
			acmgClassification();
			} else {
			bp2Button.textContent = "_";
			allEvidence = allEvidence.replace("BP2, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp2Button.addEventListener("click", bp2Click);
var bp3Button = document.getElementById("bp3");
	var bp3Click = function() {
		if (bp3Button.textContent === "_"){
			bp3Button.textContent = "X";
			allEvidence += "BP3, ";
			addToBP();
			acmgClassification();
			} else {
			bp3Button.textContent = "_";
			allEvidence = allEvidence.replace("BP3, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp3Button.addEventListener("click", bp3Click);
var bp4Button = document.getElementById("bp4");
	var bp4Click = function() {
		if (bp4Button.textContent === "_"){
			bp4Button.textContent = "X";
			allEvidence += "BP4, ";
			addToBP();
			acmgClassification();
			} else {
			bp4Button.textContent = "_";
			allEvidence = allEvidence.replace("BP4, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp4Button.addEventListener("click", bp4Click);
var bp5Button = document.getElementById("bp5");
	var bp5Click = function() {
		if (bp5Button.textContent === "_"){
			bp5Button.textContent = "X";
			allEvidence += "BP5, ";
			addToBP();
			acmgClassification();
			} else {
			bp5Button.textContent = "_";
			allEvidence = allEvidence.replace("BP5, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp5Button.addEventListener("click", bp5Click);
var bp6Button = document.getElementById("bp6");
	var bp6Click = function() {
		if (bp6Button.textContent === "_"){
			bp6Button.textContent = "X";
			allEvidence += "BP6, ";
			addToBP();
			acmgClassification();
			} else {
			bp6Button.textContent = "_";
			allEvidence = allEvidence.replace("BP6, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp6Button.addEventListener("click", bp6Click);
var bp7Button = document.getElementById("bp7");
	var bp7Click = function() {
		if (bp7Button.textContent === "_"){
			bp7Button.textContent = "X";
			allEvidence += "BP7, ";
			addToBP();
			acmgClassification();
			} else {
			bp7Button.textContent = "_";
			allEvidence = allEvidence.replace("BP7, ","");
			subtractFromBP();
			acmgClassification();
			}
	};
	bp7Button.addEventListener("click", bp7Click);
	
$(document).ready(function () {
	console.log("HELLO")
	function exportTableToCSV($table, filename) {
		var $headers = $table.find('tr:has(th)')
			,$rows = $table.find('tr:has(td)')
			,tmpColDelim = String.fromCharCode(11) 
			,tmpRowDelim = String.fromCharCode(0) 
			,colDelim = '","'
			,rowDelim = '"\r\n"';
			var csv = '"';
			csv += formatRows($headers.map(grabRow));
			csv += rowDelim;
			csv += formatRows($rows.map(grabRow)) + '"';
			var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
		$(this)
			.attr({
			'download': filename
				,'href': csvData
		});
		function formatRows(rows){
			return rows.get().join(tmpRowDelim)
				.split(tmpRowDelim).join(rowDelim)
				.split(tmpColDelim).join(colDelim);
		}
		function grabRow(i,row){
			 
			var $row = $(row);
			var $cols = $row.find('td'); 
			if(!$cols.length) $cols = $row.find('th');  
			return $cols.map(grabCol)
						.get().join(tmpColDelim);
		}
		function grabCol(j,col){
			var $col = $(col),
				$text = $col.text();
			return $text.replace('"', '""');
		}
	}
	$("#export").click(function (event) {
		var outputFile = patient.value;
		if (patient.value === ""){
		outputFile = "output"
		}
		outputFile = outputFile.replace('.csv','') + '.csv'
		exportTableToCSV.apply(this, [$('#dvData>table'), outputFile]);
	});
});