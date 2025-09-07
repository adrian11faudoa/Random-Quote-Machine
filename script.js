
const projectName = 'random-quote-machine';
let quotesData;

/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
  Modified by Adrian Faudoa to use the newer version of Twitter (rebranded to X) to make post 
    and open the call in a new tag, with the corresponding security & performance protection
*/

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];
var currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/adrian11faudoa/4d2495b406e486319d5371ad818c4328/raw/52ae67ce0c3a3e8e99a1c9a86e91a354f7c47273/poems.json',
    dataType: 'json', // ensures it returns an object
    success: function (data) {
      quotesData = data;
      console.log('quotesData loaded:', quotesData);
    },
    error: function (err) {
      console.error('Failed to load quotes:', err);
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.text;
  currentAuthor = randomQuote.author;
  currentBook = randomQuote.book;
  currentTitle = randomQuote.title;

    //new version: x.com/compose/post
  $('#tweet-quote').attr({
  href:
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent(currentBook + ' : ' + currentTitle + '. -' + currentAuthor),
  target: '_blank',
  rel: 'noopener noreferrer'
  });

  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#title').text(currentTitle);
    $('#text').html(randomQuote.text.replace(/\n/g, '<br>'));
    //$('#text').text(randomQuote.text);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#book').html(currentBook);
    $('#author').html(currentAuthor);

  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
