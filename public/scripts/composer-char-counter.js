// runs a callback when the DOM is ready to be manipulated with jQuery.
$(document).ready(function() {
  //console.log("the DOM is ready for jQuery")
// Set a variable for the max number of characters:
  var maxLength = 140;
  var counter = $(".counter").parent("form");
  // Use the keyup event on the textarea, which fires each time a key is pressed when the textarea is in focus. Ideal:
  $('textarea').on('keyup', function ( event ) {

    var charactersRemaining = maxLength - $(this).val().length;
    $('.counter').text(charactersRemaining);
    if (charactersRemaining < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });

});


