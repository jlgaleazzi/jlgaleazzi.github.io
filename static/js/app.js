// from data.js
var tableData = data;

// YOUR CODE HERE!
fillTable(tableData);

// add listener and handler to button
var filterButton = d3.select('#filter-btn');
filterButton.on('click',function(){
    d3.event.preventDefault();
 var inputDate = d3.select('#datetime');
 var inputValue = inputDate.property('value');
  filterTable(inputValue);
});
// function to clear table and filter date by date
function filterTable(val) {
    // clean up table
    var table = d3.selectAll('tbody tr').remove();
    var filteredData= tableData.filter(sighting => sighting.datetime  === val);
    fillTable(filteredData);
}
// function to fill the table
function fillTable(tdata) {
    tdata.forEach(function(sighting){
        var table= d3.select('tbody');
        var row = table.append('tr');
        for (item in sighting) {
            row.append('td').text(sighting[item]);
        };
       }); 
}
