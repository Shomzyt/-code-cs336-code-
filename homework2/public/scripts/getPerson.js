var Person = React.createClass({
  render: function() {
    return (
      <div className="person">
        <h2 className="personName">
          {this.props.firstName} {this.props.lastName}
        </h2>
        <p className="startDate">
          Start Date: {this.props.startDate}<br></br>
          Years Worked: {this.props.years}
        </p>
      </div>
    );
  }
});

$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  var id = form.serializeArray()[0].value;

  if (id == "") {
    return;
  }

  console.log(id);

  $.ajax({
    type: 'GET',
    url: '/person/' + id,
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {

      ReactDOM.render(
        <Person firstName={resp.firstName} lastName={resp.lastName} startDate={resp.startDate} years={resp.years} />,
        document.getElementById('content')
      );
    },
    error: function( resp ) {
      window.alert("Person with specified ID not found!");
    }

  });
});
