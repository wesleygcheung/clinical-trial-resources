var data = [{
    type: "sankey",
    orientation: "h",
    hoverinfo: "none",
    textfont: {
        size: 16,
        color: '#FFFFFF',
    },
    node: {
        thickness: 20,
        line: {
            color: "black",
            width: 0.25,
        },
        label: ["Screening: 100", "Randomized: 80", "Screen Failure: 20", "Active: 60", "Early Terminated: 20"],
        color: ["blue", "blue", "blue", "blue", "blue"],
        x: [0.1,0.5,0.5,0.9,0.9],
        y: [0.5,0.4,0.9,0.3,0.7],
        pad: 10,
        },

    link: {
        source: [0,0,1,1],
        target: [1,2,3,4],
        value:  [80,20,60,20],
        color: ["#F2F2F2","#F2F2F2","#F2F2F2","#F2F2F2"],
    }
}];




var layout = {
title: {
    text: "Basic Sankey",
    font: {
        size: 20,
        color: '#000000',
    },
},
font: {
    family: 'Roboto, sans-serif',
},
plot_bgcolor:"#FFFFFF",
paper_bgcolor:"#FFFFFF",
};

var sankeyArray = [];
var sankeyLabels = [];
var sankeyX = [];
var sankeyY = [];
var sankeySource = [];
var sankeyTarget = [];
var sankeyValue = [];
var sankeyColors = [];
var sankeyFlowColors = [];

$("#sankeyForm").validate();

function updateSankey(){
    if ($("#sankeyForm").valid()){
        sankeyArray = [];
        sankeyLabels = [];
        sankeyX = [];
        sankeyY = [];
        sankeySource = [];
        sankeyTarget = [];
        sankeyValue = [];
        sankeyColors = [];
        sankeyFlowColors = [];
        var numberOfColumns = $('.sankey-column').length;
        $('.sankey-column').each(function(i, obj) {
            var columnId = parseInt(obj.id.split("-").pop());
            $('#columninputs-'+columnId+' input').each(function () {
                if (!$(this).hasClass('colorinput')){
                    var totalSubjects = 0;
                    var labelValue = this.value
                    if (columnId != 1){
                        $('.flowinput-to').each(function(j, obj2){
                            if (obj2.value == labelValue){
                                var flowId = obj2.id.split("-").pop();
                                var subTotalSubjects = parseInt($('#flowCount-'+flowId).val());
                                totalSubjects += subTotalSubjects;
                            }
                        });
                    } else{
                        $('.flowinput-from').each(function(j, obj2){
                            if (obj2.value == labelValue){
                                var flowId = obj2.id.split("-").pop();
                                var subTotalSubjects = parseInt($('#flowCount-'+flowId).val());
                                totalSubjects += subTotalSubjects;
                            }
                        });
                    }
                    var color = document.querySelector('#'+this.id + ' ~ input.colorinput').value;

                    var sankeySubLabel = [labelValue, columnId, totalSubjects, labelValue + ": " + String(totalSubjects), color];
                    sankeyArray.push(sankeySubLabel);
                };
            });
        });
        for (array of sankeyArray){
            sankeyLabels.push(array[3]);
            sankeyColors.push(array[4]);
        }
        var sankeyLabelSteps = parseFloat(1.0 / (numberOfColumns-1));
        for (label of sankeyLabels){
            for (array of sankeyArray){
                if (array[3] == label){
                    sankeyX.push(parseFloat(((parseFloat(array[1])-1)*sankeyLabelSteps).toFixed(2)));
                }
            }
        }
        var columnTotals = [];
        for (let column = 1; column <=numberOfColumns; column++){
            var columnTotal = 0;
            for (array of sankeyArray){
                if (array[1] == column){
                    columnTotal += array[2];
                } 
            }
            columnTotals.push(columnTotal);
        }
        var maxTotalSubjects = Math.max(...columnTotals);
        for (let column = 1; column <=numberOfColumns; column++){
            var columnTotalSubjects = 0;
            for (array of sankeyArray){
                if (array[1] == column){
                    columnTotalSubjects += parseFloat(array[2]);
                } 
            }
            var columnRatio = (columnTotalSubjects / maxTotalSubjects).toFixed(2);
            var columnBlock = 0;
            for (array of sankeyArray){
                if (array[1] == column){
                    var itemValue = parseFloat(array[2]);
                    var itemRatio = (itemValue / columnTotalSubjects);
                    var itemPosition = parseFloat((columnRatio * itemRatio / 2).toFixed(2));
                    var itemPositionNormalized = columnBlock + itemPosition;
                    sankeyY.push(itemPositionNormalized);
                    columnBlock += parseFloat((itemRatio * columnRatio).toFixed(2));
                }
            }
        }
        $('.flow-column').each(function(i, obj) {
            var flowId = obj.id.split("-").pop();
            var fromVisitName = $('#flowFrom-'+flowId).val();
            var toVisitName = $('#flowTo-'+flowId).val();
            for (array in sankeyArray){
                if (sankeyArray[array][0] == fromVisitName){
                    sankeySource.push(array);
                };
                if (sankeyArray[array][0] == toVisitName){
                    sankeyTarget.push(array);

                };

            }
            sankeyValue.push($('#flowCount-'+flowId).val());
            sankeyFlowColors.push($('#flowColor-'+flowId).val());
        });
        data[0]['node']['label'] = sankeyLabels;
        data[0]['node']['color'] = sankeyColors;
        data[0]['node']['x'] = sankeyX;
        data[0]['node']['y'] = sankeyY;
        data[0]['node']['thickness'] = $('#chartColumnWidth').val();
        data[0]['textfont']['size'] = $('#chartLabelSize').val();

        data[0]['link']['source'] = sankeySource;
        data[0]['link']['target'] = sankeyTarget;
        data[0]['link']['value'] = sankeyValue;
        data[0]['link']['color'] = sankeyFlowColors;
        layout['title']['text'] = $('#chartTitle').val();
        layout['title']['font']['size'] = $('#chartTitleSize').val();
        layout['title']['font']['color'] = $('#chartTitleColor').val();
        layout['plot_bgcolor'] = $('#chartBgColor').val();
        layout['paper_bgcolor'] = $('#chartBgColor').val();
        Plotly.react('sankeyPlot', data, layout, {displayModeBar: false})
    };
};

updateSankey();

function downloadSankey(){
    Plotly.downloadImage('sankeyPlot', {format: 'png',filename: 'Sankey_Diagram'});
};

function addColumn(){
    var columnCount = String(document.getElementsByClassName('sankey-column').length+1);
    $('.main-section2').append(`
        <div class="sankey-column" id="column-`+columnCount+`">
            <b><span id="columnheader-`+columnCount+`">Column `+columnCount+`</span></b>
            <button type="button" id="removecolumn-`+columnCount+`" style="float:right; outline: none; border: none;background-color: rgba(0,0,0,0)" onclick="removeColumn(this.id)"><i class="fas fa-times xbutton"></i></button>
            <div id="columninputs-`+columnCount+`" style="margin-top: 1rem;margin-bottom: 1rem;">
                <input class="form-control form-control-sm columninput" name="columnInput-`+columnCount+`-1" id="columnInput-`+columnCount+`-1" required type="text" oninput="updatedFlowChoices()">
                <input class="colorinput" type="color" value="#457CD3">
            </div>
            <button class="column-button" id="addrow-`+columnCount+`" type="button" onclick="addRow(this.id)">Add Row</btn>
            <button class="column-button" id="removerow-`+columnCount+`" type="button" onclick="removeRow(this.id)"" style="float:right">Remove Row</btn>
        </div>
    `);
    updatedFlowChoices();
};
function addRow(id){
    var columnId = "columninputs-"+id.split("-").pop();
    var inputCount = 1 + $('#'+columnId).children('input').length/2;
    $('#'+columnId).append(`
    <input class="form-control form-control-sm columninput" name="columnInput-`+id.split("-").pop()+`-`+inputCount+`" id="columnInput-`+id.split("-").pop()+`-`+inputCount+`" required type="text" oninput="updatedFlowChoices()">
    <input class="colorinput" type="color" value="#457CD3">`);
};
function removeRow(id){
    var columnId = "columninputs-"+id.split("-").pop();
    var columnIdLength = document.getElementById(columnId).getElementsByTagName('input').length;
    if (columnIdLength > 2){
        $("[id='"+columnId+"'").children().last().remove();
        $("[id='"+columnId+"'").children().last().remove();
        updatedFlowChoices();
    };
};
function removeColumn(id){
    var numberOfColumns = $('.sankey-column').length;
    if (numberOfColumns > 2){
        var removedColumnId = id.split("-").pop();
        var removedColumnIdInt = parseInt(removedColumnId);
        document.getElementById("column-"+removedColumnId).remove();
        $('.sankey-column').each(function(i, obj) {
            var columnId = parseInt(obj.id.split("-").pop());
            if (columnId > removedColumnIdInt){
                var newColumnId = columnId - 1;
                $("[id='columnheader-"+String(columnId)+"'").text('Column '+String(newColumnId));
                $("[id='columnheader-"+String(columnId)+"'").attr('id','columnheader-'+String(newColumnId));
                $("[id='column-"+String(columnId)+"'").attr('id','column-'+String(newColumnId));
                $("[id='removecolumn-"+String(columnId)+"'").attr('id','removecolumn-'+String(newColumnId));
                $("[id='columninputs-"+String(columnId)+"'").attr('id','columninputs-'+String(newColumnId));
                $("[id='addrow-"+String(columnId)+"'").attr('id','addrow-'+String(newColumnId));
                $("[id='removerow-"+String(columnId)+"'").attr('id','removerow-'+String(newColumnId));

            }
        });
        $('.sankey-column div .columninput').each(function(i, obj) {
            var columnId = this.id.split("-")[1];
            var rowId = this.id.split("-")[2];
            if (columnId > removedColumnIdInt){
                var newColumnId = String(parseInt(columnId) - 1);
                $("[id='columnInput-"+columnId+"-"+rowId+"'").attr('name','columnInput-'+newColumnId+'-'+rowId);
                $("[id='columnInput-"+columnId+"-"+rowId+"'").attr('id','columnInput-'+newColumnId+'-'+rowId);
                
            }
        });
    };
    updatedFlowChoices();
};
function removeFlow(id){
    var numberOfFlows = $('.flow-column').length;
    if (numberOfFlows > 1){
        var removedFlowId = id.split("-").pop();
        var removedFlowIdInt = parseInt(removedFlowId);
        $("[id='flowcolumn-"+removedFlowId+"'").remove();
        $('.flow-column').each(function(i, obj) {
        var flowId = parseInt(obj.id.split("-").pop());
            if (flowId > removedFlowIdInt){
                var newFlowId = parseInt(flowId) - 1;
                $("[id='flowheader-"+String(flowId)+"'").text('Flow '+String(newFlowId));
                $("[id='flowheader-"+String(flowId)+"'").attr('id','flowheader-'+String(newFlowId));
                $("[id='flowcolumn-"+String(flowId)+"'").attr('id','flowcolumn-'+String(newFlowId));
                $("[id='removeflow-"+String(flowId)+"'").attr('id','removeflow-'+String(newFlowId));
                $("[id='flowFrom-"+String(flowId)+"'").attr('id','flowFrom-'+String(newFlowId));
                $("[id='flowTo-"+String(flowId)+"'").attr('id','flowTo-'+String(newFlowId));
                $("[id='flowCount-"+String(flowId)+"'").attr('id','flowCount-'+String(newFlowId));
                $("[id='flowColor-"+String(flowId)+"'").attr('id','flowColor-'+String(newFlowId));
            }
        });
    }
};
function addFlow(){
    var flowCount = String(document.getElementsByClassName('flow-column').length+1);
    $('.main-section3').append(`
        <div class="flow-column" id="flowcolumn-`+flowCount+`">
            <b><span id="flowheader-`+flowCount+`">Flow `+flowCount+`</span></b>
            <button type="button" id="removeflow-`+flowCount+`" style="float:right; outline: none; border: none;background-color: rgba(0,0,0,0)" onclick="removeFlow(this.id)"><i class="fas fa-times xbutton"></i></button>
            <div class="marginbottom" style="margin-top: 1rem;">
                From
                <select id="flowFrom-`+flowCount+`" class="form-control form-control-sm flowinput-from" onchange="updateToChoices(this.id,this.value)">
                    `+fromChoicesText+`
                </select>
            </div>
            <div class="marginbottom">
                To
                <select id="flowTo-`+flowCount+`" class="form-control form-control-sm flowinput-to">
                    `+toChoicesText+`
                </select>
            </div>
            <div class="marginbottom">
                # Subjects
                <input id="flowCount-`+flowCount+`" class="form-control form-control-sm flowinput-total" type="number" min="0">
            </div>
            <div>
                Color:
                <input id="flowColor-`+flowCount+`" class="flowinput-color" type="color" value="#F2F2F2" style="float:right;">
            </div>
        </div>
    `);
}
var fromChoices = [];
var fromChoicesText = '<option value="Screening">Screening</option><option value="Randomized">Randomized</option><option value="Screen Failure">Screen Failure</option>';
var toChoicesText = '<option value="Randomized">Randomized</option><option value="Screen Failure">Screen Failure</option><option value="Active">Active</option><option value="Early Terminated">Early Terminated</option>';

function updatedFlowChoices(){
    var numberOfColumns = $('.sankey-column').length;
    fromChoices = [];
    fromChoicesText = "";
    $('.sankey-column').each(function(i, obj) {
        var columnId = parseInt(obj.id.split("-").pop());
        if (columnId < numberOfColumns){
            $('#columninputs-'+columnId+' input').each(function () {
                if (!$(this).hasClass('colorinput')){
                    fromChoices.push(this.value);
                }
            });
        }
    });
    $('.flowinput-from').each(function(i, obj) {
        var fromSelection = obj.value;

        obj.options.length = 0;
        for (choice of fromChoices){
            if (choice == fromSelection){
                $(obj).append('<option value="'+choice+'" selected>'+choice+'</option>');
                
            } else{
                $(obj).append('<option value="'+choice+'">'+choice+'</option>');
            };
        }
    });
    for (choice of fromChoices){
        fromChoicesText = fromChoicesText.concat('<option value="'+choice+'">'+choice+'</option>');
    };

    $('.flowinput-to').each(function(i, obj) {
        var toSelection = obj.value;
        obj.options.length = 0;
        var toChoices = [];
        var flowId = obj.id.split("-").pop();
        var flowFromValue = $('#flowFrom-'+flowId).val();
        var fromColumn = [];
        $('.sankey-column').each(function(i, obj) {
            var columnId = parseInt(obj.id.split("-").pop());
            $('#columninputs-'+columnId+' input').each(function () {
                if (this.value == flowFromValue && !$(this).hasClass('colorinput')){
                    fromColumn = columnId;
                }
            });
        });
        $('.sankey-column').each(function(i, obj) {
            var columnId = parseInt(obj.id.split("-").pop());
            if (columnId > fromColumn){
                $('#columninputs-'+columnId+' input').each(function () {
                    if (!$(this).hasClass('colorinput')){
                        toChoices.push(this.value);
                    };
                });
            }
        });
        for (choice of toChoices){
            if (choice == toSelection){
                $(obj).append('<option value="'+choice+'" selected>'+choice+'</option>');
            } else{
                $(obj).append('<option value="'+choice+'">'+choice+'</option>');
            };
        };
    });
    var toChoices = [];
    toChoicesText = '';
    $('.sankey-column').each(function(i, obj) {
        var columnId = parseInt(obj.id.split("-").pop());
        if (columnId > 1){
            $('#columninputs-'+columnId+' input').each(function () {
                if (!$(this).hasClass('colorinput')){
                    toChoices.push(this.value);
                };
            });
        }
    });
    for (choice of toChoices){
        toChoicesText = toChoicesText.concat('<option value="'+choice+'">'+choice+'</option>');
    }
};
function updateToChoices(id, value){
    var id = id.split("-").pop();
    var toChoices = [];
    var fromColumn = [];
    $('.sankey-column').each(function(i, obj) {
        var columnId = parseInt(obj.id.split("-").pop());
        $('#columninputs-'+columnId+' input').each(function () {
            if (this.value == value && !$(this).hasClass('colorinput')){
                fromColumn = columnId;
            }
        });
    });
    $('.sankey-column').each(function(i, obj) {
        var columnId = parseInt(obj.id.split("-").pop());
        if (columnId > fromColumn){
            $('#columninputs-'+columnId+' input').each(function () {
                if (!$(this).hasClass('colorinput')){
                    toChoices.push(this.value);
                };
            });
        }
    });
    var toDropDown = document.getElementById('flowTo-'+id);
    toDropDown.options.length = 0;
    for (choice of toChoices){
        $("[id='flowTo-"+id).append('<option value="'+choice+'">'+choice+'</option>');
    };
};
// Scroll to the top of dashboard on click
function scrollUp(){
    var element = document.getElementById('section1');
    var headerOffset = 77.25;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
};

$('.main-section2').on('change','.columninput',function(event){
    var $current = $(this);
    $('input[id^="columnInput"]').each(function() {
        if ($(this).val() == $current.val() && $(this).attr('id') != $current.attr('id') && $(this).val() != ''){
            alert('Please change duplicate entry "'+$(this).val()+'"');
            $current.val('');
        }
    });
});
