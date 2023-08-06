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
  searchPlacesAmenities();
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

function searchPlacesAmenities () {
  const placesUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: placesUrl,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ amenities: Object.keys(amenityObj) }),
    success: function (response) {
      for (const res of response) {
        const article = ['<article>',
          '<div class="title_box">',
		`<h2>${res.name}</h2>`,
		`<div class="price_by_night">$${res.price_by_night}</div>`,
		'</div>',
		'<div class="information">',
		`<div class="max_guest">${res.max_guest} Guest(s)</div>`,
		`<div class="number_rooms">${res.number_rooms} Bedroom(s)</div>`,
		`<div class="number_bathrooms">${res.number_bathrooms} Bathroom(s)</div>`,
		'</div>',
		'<div class="description">',
		`${res.description}`,
		'</div>',
		'</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
