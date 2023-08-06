$(document).ready(function () {
  const amenityObj = {};

  $('.amenities input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).data('id')] = $(this).data('name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).data('id')];
    }
  });
  const names = Object.values(amenityObj);
  $('.amenities h4').text(names.sort().join(', '));

  apiStatus();
});

function apiStatus () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
