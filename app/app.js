/*

 ### Basic Reqs
- [x] Where to store data? (localstorage)
- [x] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/


$(document).ready(function() {
  // sets the date
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today =  month + "-" + day +"-" +year;
  var Stoday = month + "/" + day +"/" +year;
  // create a global last id varianle

  var lastId = 0;
  // load records;
  var editing = null;
 //   add button
  $('#add_button').click(function(){
    // make add area visible
    $('#expense_date').val(today);
    $('#expense_description').val('');
    $('#expense_amount').val('');
    $('#expense_concept').val('');
    $('.expense_input').show();
  });

  $('#done_button').click(function() {
    write_record();
    $('.expense_input').hide();
    editing = null;
  });

  var edit_record = function(record) {
    editing = record.id;
    $('.expense_input').show();
    $('#expense_date').val(record.date);
    $('#expense_description').val(record.description);
    $('#expense_amount').val(record.amount);
    $('#expense_concept').val(record.concept);
  }

  var create_record_element = function(record) {
    var template = '<div id="expense_'+record.id +'"  class="show-item-container">';
    template += '<div class="info-item-container">';
    template += '<label class="expense_date">'+record.date+'</label>'
    template += '<label class="expense_description" >'+record.description+'</label>';
    template += '<label class="expense_amount">$'+record.amount+'</label>';
    template += '<label class="expense_concept">'+record.concept+'</label>';
    template += '</div>';
    template += '<div class="item_edit_buttons">';
    template += '<button id="edit'+record.id+'">Edit</button>';
    template += '<button id="'+ record.id+ '">Remove</button>';
    template += '</div>';
    template += '</div>';
    $("#movements").append(template);
    $('#edit'+record.id).click(function() {
      console.log("edit "+record.id );
      edit_record(record);
    });
    $('#'+record.id).click(function() {
      //console.log('clicked on :'+this.id);
      $('#expense_'+this.id).remove();
      localStorage.removeItem(this.id);
      load_records();

    });

  }
  // load records
  var load_records = function() {
    var total = 0;
    $('#movements').html('');
    for (var i=localStorage.length; i > 0;i--) {
      var key = localStorage.key(i-1);
      console.log(i + " key "+ key);
      var json = localStorage.getItem(key);
      if (json !== undefined) {

        var record = JSON.parse(json);
        if (lastId < record.id) { lastId = record.id };
        total+= Number(record.amount);
        // clear


        create_record_element(record);
       }
    }
    $("#total_amt").html('Total    $ '+total);
  };


   // saves or edit the  record in local storage
  var write_record = function() {
    var id;
    if (isNaN(lastId)) {
      lastId = 0;
    }
    if (editing === null) {
      // create new record
      id = ++lastId;
    } else
    {
      id = editing;
    }
    var record = {};
    record.id = id;
    record.date = $('#expense_date').val();
    record.description = $('#expense_description').val();
    record.amount = $('#expense_amount').val();
    record.concept = $('#expense_concept').val();

    // save record in localObject;
    localStorage.setItem(id,JSON.stringify(record));
    load_records();

  }

  // load records
  load_records();


});
