
$.ajax({
  url: 'http://localhost:3000/profile',
  method: 'GET',
  dataType: 'json',
  success: function (profile) {
    $.each(profile, function (index) {
      $('h2').append(profile[index].about)
    })
  }
})
