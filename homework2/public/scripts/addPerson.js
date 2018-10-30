var validateForm = function(array) {
  for (let i = 0; i < 3; i++) {
    if (!array[i] == null && array[i].value == "") {
      return false;
    }
  }
  return true;
}

$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  var formData = form.serializeArray();

  if (!validateForm(formData)) {
    return;
  }

  var fName = formData[0].value;
  var lName = formData[1].value;
  var startDate = formData[2].value;
  var id = Date.now();

  let passedData = form.serialize();
  // {
  //   "firstName" : fName,
  //   "lastName" : lName,
  //   "startDate" : startDate,
  //   "personId" : id
  // }
  passedData = passedData + "&personId=" + id;

  $.ajax({
    type: 'POST',
    url: '/people/',
    data: passedData,
    dataType: 'json',
    success: function( resp ) {
      window.alert("Person added to database!");
    },
    error: function( resp ) {
      if (resp.status == 201) {
        window.alert("Person added to database!");
      } else {
        window.alert("Error creating database entry, please try again later.");
      }
    }

  });

  $( 'form' )[0].reset();
});
