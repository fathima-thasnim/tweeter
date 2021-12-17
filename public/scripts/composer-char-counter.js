$(document).ready(function() {
  
  console.log("compose counter");
  $("#tweet-text").on('input',function () {
    const characterLength = 140 - $(this).val().length;
    let $form = $(this).closest('form');
    let $counter = $form.find('.counter');
    $counter.html(characterLength);

    if(characterLength < 0) {
      $counter.css('color', 'red')
    } else {
      $counter.css('color', 'gray')
    }
    
  });
});
