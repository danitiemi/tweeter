  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
$(document).ready(function() {

  const tweetDb = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


  // responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
  function renderTweets (tweets) {
    let $html= $("<div>");
    // loops through tweets calls createTweetElement for each tweet
    tweets.forEach (function(tweet) {
      $html = $html.prepend(createTweetElement(tweet));
     });

    $('#tweetsContainer').html($html);

    // takes return value and appends it to the tweets container
   // return renderTweets;
  }

  // function that takes in a tweet object and is responsible for returning
  // a tweet <article> element containing the entire HTML structure of the tweet
  function createTweetElement (tweet) {
    // returns a tweet <article>
    let $tweet = $("<article>").addClass("tweet");
    let now = moment(tweet.created_at).startOf('hour').fromNow();

    let tweetData = `<header><img class="logo" src="${tweet.user.avatars.small}"><span tweetclass="user">${tweet.user.name}</span><span class="user_nickname">${tweet.user.handle}</span></header><section class="tweet_text"><p>${tweet.content.text}</p></section><footer><span class="date">${now}</span><span class= "flag"><i class="fas fa-flag"></i></span><span class= "retweet"><i class="fas fa-retweet"></i></span><span class="like"><i class="fas fa-heart"></i></span></footer>`;
    $tweet =  $tweet.append(tweetData);
    return $tweet;
    console.log($tweet)
  }

  // var $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  // renderTweets();

  // form submission
  // Flash-messages: form submit handler to disallow form submission in the event that the tweet area is empty or exceeds the 140 character limit.
  $("form").on("submit", function(e) {

    e.preventDefault();
    let data = $('form').serialize();
    let inputArea = $('#input').val();
    // 1. Get the data from the from
    if (!inputArea) {
      alert("Maybe you forgot something...")
    } else if (inputArea.length > 140) {
      alert("Sorry! It's more than 140.")
    } else {
      // 2. Make a AJAX request using that data
      $.ajax("/tweets", {
        method: "POST",
        data: data
      }).done(function(data) {
        $("#tweetsContainer").load(loadTweets());
        $("#input").val("");
        $(".counter").text("140");
      });
    }
  });

  // It will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  function loadTweets () {
    $.ajax("/tweets", {
      // url: "http://localhost:8080/tweets",
      method: "GET",
      success: renderTweets
      });
  }

  loadTweets();


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  $("button").click(function() {
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });

});
  // Test / driver code (temporary)
   // to see what it looks like
  // $('#tweetsContainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
