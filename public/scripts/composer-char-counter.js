// runs a callback when the DOM is ready to be manipulated with jQuery.
$(document).ready(function() {
  //console.log("the DOM is ready for jQuery")
// Set a variable for the max number of characters:
  var maxLength = 140;
  // var counter = $(this)$('.counter');
  // Use the keyup event on the textarea, which fires each time a key is pressed when the textarea is in focus. Ideal:

  $('textarea').keyup(function ( event ) {
    // Check the value and get the length of it, store it in a variable:
    var length = $(this).val().length;
    // // Take that value away from your max width:
    var length = maxLength-length;
    // //  Put the result somewhere on the page:
    $('.counter').text(length);
  // });
    if (length <= maxLength){
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('background-color', 'black');
    }
  });

});


