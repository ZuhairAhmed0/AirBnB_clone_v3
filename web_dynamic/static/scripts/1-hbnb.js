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
});
