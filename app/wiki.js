$(document).ready(function() {
  var baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=';
  var callback = '&callback=?';

  // User search for topic
  $('#mainSearch').on('click', function(e) {
    e.preventDefault();
    var searchRequest = $('#searchRequest').val();
    var fullRequest = baseUrl + searchRequest + callback;
    $.getJSON(baseUrl + searchRequest + callback, function(json) {
      console.log(json);
      $('#searchResults').children().remove();
      $.each(json.query.pages, function(key, page) {
        $('#searchResults').show();
        $('#randomResults').hide();
        $('#searchResults').append("<div id='resultsDiv' class='well'><h2 class='text-center'>" + page.title + "</h2><p id='innerWell' class='text-center well'>" + page.extract.substring(0, 1000) + "</br>view the full Wikipedia article<a href='http://en.wikipedia.org/?curid=" + page.pageid + page.title + "'> here</a></p></div>").finish();
      });
    });
  });
  
  // Grab a random article
  $('#search').on('click', function(e) {
    e.preventDefault();
    var randomUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=&callback=?';
    $.getJSON(randomUrl, function(json) {
      $('#randomResults').children().remove();
      $.each(json.query.pages, function(key, page) {
        $('#searchResults').hide();
        $('#randomResults').show();
        $('#randomResults').append("<div id='resultsDiv' class='well'><h2 class='text-center'>" + page.title + "</h2><p id='innerWell' class='text-center well'>" + page.extract.substring(0, 1000) + "</br>view the full Wikipedia article<a href='http://en.wikipedia.org/?curid=" + page.pageid + page.title + "'> here</a></p></div>");
      });
    });
  });
});