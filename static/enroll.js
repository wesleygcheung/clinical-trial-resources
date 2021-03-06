// List of countries for autocomplete select
var countryoptions = [{label: "Afghanistan",  value: "Afghanistan"}, {label: "Albania",  value: "Albania"}, {label: "Algeria",  value: "Algeria"}, 
    {label: "Andorra",  value: "Andorra"}, {label: "Angola",  value: "Angola"}, {label: "Antigua and Barbuda",  value: "Antigua and Barbuda"}, 
    {label: "Argentina",  value: "Argentina"}, {label: "Armenia",  value: "Armenia"}, {label: "Australia",  value: "Australia"}, 
    {label: "Austria",  value: "Austria"}, {label: "Azerbaijan",  value: "Azerbaijan"}, {label: "Bahamas",  value: "Bahamas"}, {label: "Bahrain",  value: "Bahrain"}, 
    {label: "Bangladesh",  value: "Bangladesh"}, {label: "Barbados",  value: "Barbados"}, {label: "Belarus",  value: "Belarus"}, {label: "Belgium",  value: "Belgium"}, 
    {label: "Belize",  value: "Belize"}, {label: "Benin",  value: "Benin"}, {label: "Bhutan",  value: "Bhutan"}, {label: "Bolivia",  value: "Bolivia"}, 
    {label: "Bosnia and Herzegovina",  value: "Bosnia and Herzegovina"}, {label: "Botswana",  value: "Botswana"}, {label: "Brazil",  value: "Brazil"}, 
    {label: "Brunei",  value: "Brunei"}, {label: "Bulgaria",  value: "Bulgaria"}, {label: "Burkina Faso",  value: "Burkina Faso"}, {label: "Burundi",  value: "Burundi"}, 
    {label: "Côte d'Ivoire",  value: "Côte d'Ivoire"}, {label: "Cabo Verde",  value: "Cabo Verde"}, {label: "Cambodia",  value: "Cambodia"}, {label: "Cameroon",  value: "Cameroon"}, 
    {label: "Canada",  value: "Canada"}, {label: "Central African Republic",  value: "Central African Republic"}, {label: "Chad",  value: "Chad"}, {label: "Chile",  value: "Chile"}, 
    {label: "China",  value: "China"}, {label: "Colombia",  value: "Colombia"}, {label: "Comoros",  value: "Comoros"}, {label: "Congo",  value: "Congo"}, 
    {label: "Costa Rica",  value: "Costa Rica"}, {label: "Croatia",  value: "Croatia"}, {label: "Cuba",  value: "Cuba"}, {label: "Cyprus",  value: "Cyprus"}, 
    {label: "Czechia",  value: "Czechia"}, {label: "Democratic Republic of the Congo",  value: "Democratic Republic of the Congo"}, {label: "Denmark",  value: "Denmark"}, 
    {label: "Djibouti",  value: "Djibouti"}, {label: "Dominica",  value: "Dominica"}, {label: "Dominican Republic",  value: "Dominican Republic"}, {label: "Ecuador",  value: "Ecuador"}, 
    {label: "Egypt",  value: "Egypt"}, {label: "El Salvador",  value: "El Salvador"}, {label: "Equatorial Guinea",  value: "Equatorial Guinea"}, {label: "Eritrea",  value: "Eritrea"}, 
    {label: "Estonia",  value: "Estonia"}, {label: "Eswatini",  value: "Eswatini"}, {label: "Ethiopia",  value: "Ethiopia"}, {label: "Fiji",  value: "Fiji"}, 
    {label: "Finland",  value: "Finland"}, {label: "France",  value: "France"}, {label: "Gabon",  value: "Gabon"}, {label: "Gambia",  value: "Gambia"}, {label: "Georgia",  value: "Georgia"}, 
    {label: "Germany",  value: "Germany"}, {label: "Ghana",  value: "Ghana"}, {label: "Greece",  value: "Greece"}, {label: "Grenada",  value: "Grenada"}, {label: "Guatemala",  value: "Guatemala"}, 
    {label: "Guinea",  value: "Guinea"}, {label: "Guinea Bissau",  value: "Guinea Bissau"}, {label: "Guyana",  value: "Guyana"}, {label: "Haiti",  value: "Haiti"}, 
    {label: "Honduras",  value: "Honduras"}, {label: "Hungary",  value: "Hungary"}, {label: "Iceland",  value: "Iceland"}, {label: "India",  value: "India"}, 
    {label: "Indonesia",  value: "Indonesia"}, {label: "Iran",  value: "Iran"}, {label: "Iraq",  value: "Iraq"}, {label: "Ireland",  value: "Ireland"}, {label: "Israel",  value: "Israel"}, 
    {label: "Italy",  value: "Italy"}, {label: "Jamaica",  value: "Jamaica"}, {label: "Japan",  value: "Japan"}, {label: "Jordan",  value: "Jordan"}, {label: "Kazakhstan",  value: "Kazakhstan"}, 
    {label: "Kenya",  value: "Kenya"}, {label: "Kiribati",  value: "Kiribati"}, {label: "Kuwait",  value: "Kuwait"}, {label: "Kyrgyzstan",  value: "Kyrgyzstan"}, {label: "Laos",  value: "Laos"}, 
    {label: "Latvia",  value: "Latvia"}, {label: "Lebanon",  value: "Lebanon"}, {label: "Lesotho",  value: "Lesotho"}, {label: "Liberia",  value: "Liberia"}, {label: "Libya",  value: "Libya"}, 
    {label: "Liechtenstein",  value: "Liechtenstein"}, {label: "Lithuania",  value: "Lithuania"}, {label: "Luxembourg",  value: "Luxembourg"}, {label: "Madagascar",  value: "Madagascar"}, 
    {label: "Malawi",  value: "Malawi"}, {label: "Malaysia",  value: "Malaysia"}, {label: "Maldives",  value: "Maldives"}, {label: "Mali",  value: "Mali"}, {label: "Malta",  value: "Malta"}, 
    {label: "Marshall Islands",  value: "Marshall Islands"}, {label: "Mauritania",  value: "Mauritania"}, {label: "Mauritius",  value: "Mauritius"}, {label: "Mexico",  value: "Mexico"}, 
    {label: "Micronesia",  value: "Micronesia"}, {label: "Moldova",  value: "Moldova"}, {label: "Monaco",  value: "Monaco"}, {label: "Mongolia",  value: "Mongolia"}, 
    {label: "Montenegro",  value: "Montenegro"}, {label: "Morocco",  value: "Morocco"}, {label: "Mozambique",  value: "Mozambique"}, {label: "Myanmar",  value: "Myanmar"}, 
    {label: "Namibia",  value: "Namibia"}, {label: "Nauru",  value: "Nauru"}, {label: "Nepal",  value: "Nepal"}, {label: "Netherlands",  value: "Netherlands"}, 
    {label: "New Zealand",  value: "New Zealand"}, {label: "Nicaragua",  value: "Nicaragua"}, {label: "Niger",  value: "Niger"}, {label: "Nigeria",  value: "Nigeria"}, 
    {label: "North Korea",  value: "North Korea"}, {label: "North Macedonia",  value: "North Macedonia"}, {label: "Norway",  value: "Norway"}, {label: "Oman",  value: "Oman"}, 
    {label: "Pakistan",  value: "Pakistan"}, {label: "Palau",  value: "Palau"}, {label: "Palestine State",  value: "Palestine State"}, {label: "Panama",  value: "Panama"}, 
    {label: "Papua New Guinea",  value: "Papua New Guinea"}, {label: "Paraguay",  value: "Paraguay"}, {label: "Peru",  value: "Peru"}, {label: "Philippines",  value: "Philippines"}, 
    {label: "Poland",  value: "Poland"}, {label: "Portugal",  value: "Portugal"}, {label: "Qatar",  value: "Qatar"}, {label: "Romania",  value: "Romania"}, {label: "Russia",  value: "Russia"}, 
    {label: "Rwanda",  value: "Rwanda"}, {label: "Saint Kitts and Nevis",  value: "Saint Kitts and Nevis"}, {label: "Saint Lucia",  value: "Saint Lucia"}, 
    {label: "Saint Vincent and the Grenadines",  value: "Saint Vincent and the Grenadines"}, {label: "Samoa",  value: "Samoa"}, {label: "San Marino",  value: "San Marino"}, 
    {label: "Sao Tome and Principe",  value: "Sao Tome and Principe"}, {label: "Saudi Arabia",  value: "Saudi Arabia"}, {label: "Senegal",  value: "Senegal"}, {label: "Serbia",  value: "Serbia"}, 
    {label: "Seychelles",  value: "Seychelles"}, {label: "Sierra Leone",  value: "Sierra Leone"}, {label: "Singapore",  value: "Singapore"}, {label: "Slovakia",  value: "Slovakia"}, 
    {label: "Slovenia",  value: "Slovenia"}, {label: "Solomon Islands",  value: "Solomon Islands"}, {label: "Somalia",  value: "Somalia"}, {label: "South Africa",  value: "South Africa"}, 
    {label: "South Korea",  value: "South Korea"}, {label: "South Sudan",  value: "South Sudan"}, {label: "Spain",  value: "Spain"}, {label: "Sri Lanka",  value: "Sri Lanka"}, 
    {label: "Sudan",  value: "Sudan"}, {label: "Suriname",  value: "Suriname"}, {label: "Sweden",  value: "Sweden"}, {label: "Switzerland",  value: "Switzerland"}, 
    {label: "Syria",  value: "Syria"}, {label: "Taiwan",  value: "Taiwan"}, {label: "Tajikistan",  value: "Tajikistan"}, {label: "Tanzania",  value: "Tanzania"}, 
    {label: "Thailand",  value: "Thailand"}, {label: "Timor Leste",  value: "Timor Leste"}, {label: "Togo",  value: "Togo"}, {label: "Tonga",  value: "Tonga"}, 
    {label: "Trinidad and Tobago",  value: "Trinidad and Tobago"}, {label: "Tunisia",  value: "Tunisia"}, {label: "Turkey",  value: "Turkey"}, {label: "Turkmenistan",  value: "Turkmenistan"}, 
    {label: "Tuvalu",  value: "Tuvalu"}, {label: "Uganda",  value: "Uganda"}, {label: "Ukraine",  value: "Ukraine"}, {label: "United Arab Emirates",  value: "United Arab Emirates"}, 
    {label: "United Kingdom",  value: "United Kingdom"}, {label: "United States of America",  value: "United States of America"}, {label: "Uruguay",  value: "Uruguay"}, 
    {label: "Uzbekistan",  value: "Uzbekistan"}, {label: "Vanuatu",  value: "Vanuatu"}, {label: "Venezuela",  value: "Venezuela"}, {label: "Vietnam",  value: "Vietnam"}, 
    {label: "Yemen",  value: "Yemen"}, {label: "Zambia",  value: "Zambia"}, {label: "Zimbabwe",  value: "Zimbabwe"}];

// Autocomplete country setup
var autocompleteDict = {};
autocompleteDict['autocomplete-1'] = new SelectPure("#autocomplete-1", {
    options: countryoptions,
    value: 'Australia',
    placeholder: 'Australia',
    autocomplete: true,
    id: 1,
});

// Color gradients for plotly graphs
var enrollColorGradient = ['#061f68', 	'#0a236c', 	'#0d2770', 	'#112b74', 	'#142f78', 	'#17327c', 	'#1a3680', 	'#1d3a84', 	'#203e88', 	'#23428c', 	'#264790', 	'#294b94', 	'#2c4f97', 	'#2f539b', 	'#32579f', 	'#355ba3', 	'#385fa7', 	'#3b64ab', 	'#3e68af', 	'#416cb3', 	'#4470b7', 	'#4775bb', 	'#4b79be', 	'#4e7dc2', 	'#5182c6', 	'#5586ca', 	'#588ace', 	'#5c8fd2', 	'#5f93d5', 	'#6398d9', 	'#669cdd', 	'#6aa1e1', 	'#6ea5e5', 	'#71aae8', 	'#75aeec', 	'#79b3f0', 	'#7db7f4', 	'#81bcf7', 	'#85c0fb', 	'#89c5ff'];
var enrollColorList = [];
var screenColorGradient = ['#7c023f', 	'#7f0340', 	'#830340', 	'#860441', 	'#8a0541', 	'#8d0642', 	'#910742', 	'#940843', 	'#980a43', 	'#9b0b43', 	'#9e0d44', 	'#a20f44', 	'#a51144', 	'#a91244', 	'#ac1444', 	'#af1644', 	'#b31844', 	'#b61a44', 	'#b91c44', 	'#bd1e44', 	'#c02044', 	'#c32244', 	'#c62443', 	'#ca2643', 	'#cd2843', 	'#d02a42', 	'#d32d42', 	'#d62f42', 	'#d93141', 	'#dc3440', 	'#df3640', 	'#e2383f', 	'#e53b3e', 	'#e83d3e', 	'#eb403d', 	'#ee423c', 	'#f1453b', 	'#f4483a', 	'#f64a39', 	'#f94d38'];
var screenColorList = [];

// Update stop date validation/value based on start date input
function minEndDate(startDate){
var row = startDate.split("-")[1];
var startDate = $('#'+startDate).val();
if ($("[id='enddate-"+String(row)+"'").val() < startDate){
    $("[id='enddate-"+String(row)+"'").val("");
};
$("[id='enddate-"+String(row)+"'").attr("min", startDate);
};

// Add new row to form table
var rowCounter = 1;
function addRow(){
    rowCounter += 1;
    var rows = rowCounter;
    $('#tablebody').append(`
        <tr id="row-`+String(rows)+`">
            <td class="tableCell">
                <span class="autocomplete-select" id="autocomplete-`+String(rows)+`"></span>
                <input class="form-check form-check-inline form-control form-css2 country" required type="text" name="country-`+String(rows)+`" id="country-`+String(rows)+`" style="display:none">
            </td>
            <td class="tableCell">
                <input class="form-control form-control-sm startdate" id="startdate-`+String(rows)+`" name="startdate-`+String(rows)+`" onchange="minEndDate(this.id)" required type="month" value="">
            </td>
            <td class="tableCell">
                <input class="form-control form-control-sm enddate" id="enddate-`+String(rows)+`" name="enddate-`+String(rows)+`" type="month" value="">
            </td>
            <td class="tableCell">
                <input class="form-control form-control-sm sfrate" id="sfrate-`+String(rows)+`" min="0" max ="0.9999" name="sfrate-`+String(rows)+`" required step="0.0001" type="number" value="">
            </td>
            <td class="tableCell">
                <input class="form-control form-control-sm enrollmentrate" id="enrollmentrate-`+String(rows)+`" min="0.0001" name="enrollmentrate-`+String(rows)+`" required step="0.0001" type="number" value="">
            </td>
            <td class="tableCell">
                <button class="xCol" type="button" id="removebutton-`+String(rows)+`" onclick="removeThisRow(this.id)" style="outline: none; border: none;background-color: rgba(0,0,0,0)"><i class="fas fa-times"></i></button>
            </td>
        </tr>`
    );
    // Add new autocomplete object for the new row
    autocompleteDict['autocomplete-'+String(rows)] = new SelectPure("#autocomplete-"+String(rows), {
    options: countryoptions,
    value: 'Australia',
    placeholder: 'Australia',
    autocomplete: true,
    id: 1,
    });
};

// Remove last row of the table
function removeRow(){
var table = document.getElementById('enrolltable');
var rowCount = table.rows.length;
if (rowCount > 2) {
    var id = table.rows[rowCount-1].id.split("-")[1];
    table.deleteRow(rowCount-1);
    delete autocompleteDict['autocomplete-'+String(id)];
}
};

// Remove specific row based on 'X' icon
function removeThisRow(rowID){
var row = rowID.split("-")[1];
var table = document.getElementById('enrolltable');
var rowCount = table.rows.length;
if (rowCount > 2) {
    $("[id='row-"+String(row)+"'").remove();
    delete autocompleteDict['autocomplete-'+String(row)];
}
};

// Split country names greater than 13 characters for horizontal bar plots
function countryRegex(countryName) {
var rxp = /(.{1,13}\b|.{13})/g;
fixedName = countryName.match(rxp).join("<br>");
return fixedName;
};

// CSV file preparation and download trigger
var csvDownload = "Country,Date,Totaled Screened,Totaled Enrolled,\r\n";
var encodedUri = encodeURI(csvDownload);
function downloadCSV(){
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csvDownload]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "Enrollment_Forecast_Data.csv";
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

// Initialize jQuery form validation
$("#enrollform").validate();
function minCurrentEnroll(targetEnrollment){
    if ($('#currentenrollment').val() > targetEnrollment){
        $('#currentenrollment').val("");
    }
    $('#currentenrollment').attr("max", targetEnrollment);
};

// On submit check jQuery form validation and process table data into JSON
function compileData(){
if ($("#enrollform").valid()){

    // Unhide loading wheel
    if ($('#loadingWheel').hasClass('hidden')){
        $('#loadingWheel').removeClass('hidden');
    };

    // Extract data from the start date , end date, sf rate, and enrollment rate columns
    var columns = ['startdate','enddate','sfrate','enrollmentrate']
    var datadict = {'country': [],'startdate': [], 'enddate': [], 'sfrate': [], 'enrollmentrate': []};
    for (column of columns) {
        var allColumn = document.getElementsByClassName(column);
        for (row of allColumn){
            datadict[column].push(row.value);
        }
    }

    // Extract data from the autocomplete country fields
    for (i of Object.keys(autocompleteDict)){
        datadict['country'].push(autocompleteDict[i]['_config']['value']);
    };

    // Create final dictionary for JSON conversion and AJAX submission
    var datadict = {'Country': datadict['country'],'Start Date': datadict['startdate'], 'Stop Date': datadict['enddate'], "Screen Fail Rate": datadict['sfrate'], 'Enrollment Rate': datadict['enrollmentrate']};
    var finaldict = {'Target Enrollment': $('#targetenrollment').val(), 'Current Enrollment': $('#currentenrollment').val(), 'tableData': datadict}

    $.ajax({
        url: "/API/enrollment",
        type: "POST",
        data: JSON.stringify(finaldict),
        contentType: "application/json; charset=utf-8",
        success: function(data) { 

            // Prep the CSV by joining list of lists into CSV
            data['csv'].forEach(function(rowArray) {
                let row = rowArray.join(",");
                csvDownload += row + "\r\n";
            });
            // Hide the loading wheel
            if (!$('#loadingWheel').hasClass('hidden')){
                $('#loadingWheel').addClass('hidden');
            };
            // Update the dashboard BANs
            $('#globalStart').text(data['Global Start Date']);
            $('#globalStop').text(data['Global Stop Date']);
            $('#globalSFRate').text(String(data['Global SF Rate'])+'%');
            $('#globalScreened').text(data['Global Screened']);
            if ($('#currentenrollment').val()=='' || $('#currentenrollment').val()==0){
                $('#globalEnrolled').text(String(data['Global Randomized'])+'/'+String($('#targetenrollment').val()));
            } else{
                $('#globalEnrolled').text(String(parseInt(data['Global Randomized'])+parseInt($('#currentenrollment').val()))+'/'+String($('#targetenrollment').val()));
            }                    
            $('#globalEnrollRate').text(data['Global Enrollment Rate']);

            // Unhide the dashboard section if hidden
            if ($('#section3').hasClass("hidden")){
                $('#section3').removeClass("hidden");
            };
            
            // Scroll to dashboard section
            scrollUp();

            // Add in screening and enrolled area plot data
            // Clear out any existing datasets
            screeningTraces = [];
            enrollTraces = [];
            for (country of Object.keys(data['Area Plot']).reverse()){
                var screenTrace = {x: data['Area Plot'][country]['Dates'], y: data['Area Plot'][country]['Screeners'], name: country, stackgroup: 'one', line: {color: ''}};
                screeningTraces.push(screenTrace);
                var enrollTrace = {x: data['Area Plot'][country]['Dates'], y: data['Area Plot'][country]['Enrolled'], name: country, stackgroup: 'one', line: {color: ''}};
                enrollTraces.push(enrollTrace);
            };

            // Initialize a lookup dictionary for horizontal bar graphs with dataset and layout references per graph
            var horizBarPlots = {'Screeners': [countryScreenPlotData[0],countryScreenPlotLayout], 
                'Screen Fail Rate': [countryScreenFailPlotData[0],countryScreenFailPlotLayout], 
                'Rand': [countryEnrolledPlotData[0],countryEnrolledPlotLayout], 
                'Enrollment Rate': [countryEnrollRatePlotData[0],countryEnrollRatePlotLayout]};
            
            // Add in horizontal bar plot data
            // Clear out any existing datasets
            for (dataset of Object.values(horizBarPlots)){
                dataset[0]['x'] = [];
                dataset[0]['y'] = [];
                dataset[0]['text'] = [];
            }
            for (plot of Object.keys(horizBarPlots)){
                for (country in data[plot]){
                    horizBarPlots[plot][0]['x'].push(data[plot][country][1]);
                    horizBarPlots[plot][0]['y'].push(countryRegex(data[plot][country][0]));
                    if (plot == 'Screen Fail Rate'){
                        horizBarPlots[plot][0]['text'].push(String(data[plot][country][1])+'%');
                    } else{
                        horizBarPlots[plot][0]['text'].push(String(data[plot][country][1]));
                    };
                };
                horizBarPlots[plot][1]['xaxis']['range'] = [0,(Math.max(...horizBarPlots[plot][0]['x'])*1.20)];
            }
            // Update all plot color gradients based on number of countries
            var countrylen = data['Countries'].length;
            var colorstep = Math.floor(40 / countrylen);
            for (i in data['Countries']) {
                enrollColorList.push(enrollColorGradient[(i*colorstep)]);
                screenColorList.push(screenColorGradient[(i*colorstep)]);
                screeningTraces[i]['fillcolor'] = screenColorGradient[(i*colorstep)];
                enrollTraces[i]['fillcolor'] = enrollColorGradient[(i*colorstep)];
                screeningTraces[i]['line']['color'] = screenColorGradient[(i*colorstep)];
                enrollTraces[i]['line']['color'] = enrollColorGradient[(i*colorstep)];

            };
            enrollColorList.reverse();
            screenColorList.reverse();

            // Update all plots
            Plotly.newPlot('screeningPlot',screeningTraces, overTimePlotLayout);
            Plotly.newPlot('enrollPlot',enrollTraces, overTimePlotLayout);
            Plotly.newPlot('countryScreenPlot', countryScreenPlotData, countryScreenPlotLayout, boxConfig, {staticPlot: true});
            Plotly.newPlot('countryScreenFailPlot', countryScreenFailPlotData, countryScreenFailPlotLayout, boxConfig, {staticPlot: true});
            Plotly.newPlot('countryEnrolledPlot', countryEnrolledPlotData, countryEnrolledPlotLayout, boxConfig, {staticPlot: true});
            Plotly.newPlot('countryEnrolledRatePlot', countryEnrollRatePlotData, countryEnrollRatePlotLayout, boxConfig, {staticPlot: true});
        }
    });
};
};

// Configurgation parameters for all plotly graphs
var boxConfig = {responsive: true, displayModeBar: false};

// Area chart layout settings
var overTimePlotLayout = {
showlegend: true,
font: {
    family: 'Roboto',
    size: 16,
    color: '#000000',
},
legend: {"orientation": "h"},
plot_bgcolor: 'rgba(0,0,0,0)',
paper_bgcolor: 'rgba(0,0,0,0)',
margin: {
    r: 25,
    t: 20,
    b: 10,
    l: 10,
    pad: 0,	
},
xaxis: {
    showgrid: false,
    fixedrange: true,
    automargin: true,
},
yaxis: {
    side: 'right',
    showgrid: false,
    fixedrange: true,
    automargin: true,
}
};

// Area chart datasets
var screeningTraces = [];
var enrollTraces = [];

// Create area charts for screened and enrolled
Plotly.newPlot('screeningPlot', screeningTraces, overTimePlotLayout, boxConfig);
Plotly.newPlot('enrollPlot', enrollTraces, overTimePlotLayout, boxConfig);

var countryScreenPlotData = [{
type: 'bar',
x: [],
y: [],
text: [],
textposition: 'outside',
hoverinfo: 'none',
orientation: 'h',
marker: {
    color: screenColorList,
    line: {
        width: 2,
        color: screenColorList,
    },
    opacity: 1,
},
}];

var countryScreenFailPlotData = [{
type: 'bar',
x: [],
y: [],
text: [],
orientation: 'h',
textposition: 'outside',
hoverinfo: 'none',
marker: {
    color: screenColorList,
    line: {
        width: 2,
        color: screenColorList,
    },
    opacity: 1,
},
}];
var countryEnrollRatePlotData = [{
type: 'bar',
x: [],
y: [],
text: [],
orientation: 'h',
textposition: 'outside',
hoverinfo: 'none',
marker: {
    color: enrollColorList,
    line: {
        width: 2,
        color: enrollColorList,
    },
    opacity: 1,
},
}];
var countryEnrolledPlotData = [{
type: 'bar',
x: [],
y: [],
text: [],
orientation: 'h',
textposition: 'outside',
hoverinfo: 'none',
marker: {
    color: enrollColorList,
    line: {
        width: 2,
        color: enrollColorList,
    },
    opacity: 1,
},
}];
var countryScreenPlotLayout = {
autosize: true,
showlegend: false,
paper_bgcolor: 'rgba(0,0,0,0)',
plot_bgcolor: 'rgba(0,0,0,0)',
hovermode: false,
margin: {
    r: 10,
    t: 20,
    b: 10,
    pad: 0,	
},
font: {
    family: 'Roboto',
    size: 16,
    color: '#00000',
},
xaxis: {
    autorange: false,
    range: [],
    tick0: 0,
    dtick: 1,
    showgrid: false,
    showline: false,
    showticklabels: false,
},
yaxis: {
    automargin: true,
    ticksuffix: ' ',
    showgrid: false,
    showline: false,
},
dragmode: false,
clickmode: 'none',
};

var countryScreenFailPlotLayout = {
autosize: true,
showlegend: false,
paper_bgcolor: 'rgba(0,0,0,0)',
plot_bgcolor: 'rgba(0,0,0,0)',
hovermode: false,
margin: {
    r: 10,
    t: 20,
    b: 10,
    pad: 0,	
},
font: {
    family: 'Roboto',
    size: 16,
    color: '#00000',
},
xaxis: {
    autorange: false,
    range: [],
    tick0: 0,
    dtick: 1,
    showgrid: false,
    showline: false,
    showticklabels: false,
},
yaxis: {
    automargin: true,
    ticksuffix: ' ',
    showgrid: false,
    showline: false,
},
dragmode: false,
clickmode: 'none',
};

var countryEnrollRatePlotLayout = {
autosize: true,
showlegend: false,
paper_bgcolor: 'rgba(0,0,0,0)',
plot_bgcolor: 'rgba(0,0,0,0)',
hovermode: false,
margin: {
    r: 10,
    t: 20,
    b: 10,
    pad: 0,	
},
font: {
    family: 'Roboto',
    size: 16,
    color: '#00000',
},
xaxis: {
    autorange: false,
    range: [],
    tick0: 0,
    dtick: 1,
    showgrid: false,
    showline: false,
    showticklabels: false,
},
yaxis: {
    automargin: true,
    ticksuffix: ' ',
    showgrid: false,
    showline: false,
},
dragmode: false,
clickmode: 'none',
};

var countryEnrolledPlotLayout = {
autosize: true,
showlegend: false,
paper_bgcolor: 'rgba(0,0,0,0)',
plot_bgcolor: 'rgba(0,0,0,0)',
hovermode: false,
margin: {
    r: 10,
    t: 20,
    b: 10,
    pad: 0,	
},
font: {
    family: 'Roboto',
    size: 16,
    color: '#00000',
},
xaxis: {
    autorange: false,
    range: [],
    tick0: 0,
    dtick: 1,
    showgrid: false,
    showline: false,
    showticklabels: false,
},
yaxis: {
    automargin: true,
    ticksuffix: ' ',
    showgrid: false,
    showline: false,
},
dragmode: false,
clickmode: 'none',
};

Plotly.newPlot('countryScreenPlot', countryScreenPlotData, countryScreenPlotLayout, boxConfig, {staticPlot: true});
Plotly.newPlot('countryScreenFailPlot', countryScreenFailPlotData, countryScreenFailPlotLayout, boxConfig, {staticPlot: true});
Plotly.newPlot('countryEnrolledPlot', countryEnrolledPlotData, countryEnrolledPlotLayout, boxConfig, {staticPlot: true});
Plotly.newPlot('countryEnrolledRatePlot', countryEnrollRatePlotData, countryEnrollRatePlotLayout, boxConfig, {staticPlot: true});

// Shrink column header text on mobile view
if ($( window ).width() < 500) {
    $('#enrollHeader').text('Enroll. Rate');
    $('#sfHeader').text('S.F. %');
};

// Scroll to the top of dashboard on click
function scrollUp(){
    var element = document.getElementById('section3');
    var headerOffset = 77.25;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
};