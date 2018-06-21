  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
$(document).ready(function() {

  const tweetData = {
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
  }

  // responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
  function renderTweets (tweets) {

    // loops through tweets calls createTweetElement for each tweet
    for (tweet in tweets) {
      let singleTweet = createTweetElement(tweet);
      $('#tweetsContainer').prepend(singleTweet);
    }
    // takes return value and appends it to the tweets container
    return $('#tweetsContainer');
  }

  // function that takes in a tweet object and is responsible for returning
  // a tweet <article> element containing the entire HTML structure of the tweet
  function createTweetElement (tweet) {
    // returns a tweet <article>
    let tweetData = $("<article>").addClass("tweet");
    let username = tweet.user.name;
    let image = tweet.user.avatars.small;
    let nickname = tweet.user.handle;
    let content = tweet.content.text;
    let tweetDate = tweet.created_at;

    tweetData = $("<article>").addClass("tweet");
    tweetData = `<header>${image}<span>${username}</span><span>${nickname}</span></header><section><p>${content}</p></section><footer><span>${tweetDate}</span>`;
// console.log(tweet);
    return tweetData;
  }

  var $tweet = createTweetElement(tweetData);
  console.log($tweet);
  renderTweets();

  // form submission
  // Flash-messages: form submit handler to disallow form submission in the event that the tweet area is empty or exceeds the 140 character limit.
  $("input").on("submit", function(e) {

    e.preventDefault();
    // 1. Get the data from the from
    if ($(".new-tweet").val().length > 0 && $(".new-tweet").val().length < 140) {
      let data = $('form').serialize();
      // 2. Make a AJAX request using that data
      $.ajax("/tweets", {
        method: "POST",
        data: data
      }).done(function(data) {
        $("#tweetsContainer").load(loadTweets());
        $("form textarea").val("");
      });
    } else if ($(".new-tweet").val().length > 140) {
      console.error("Sorry! It's more than 140.");
    } else {
      console.error("Maybe you forgot something...");
    }
  });

  // It will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  function loadTweets () {
    $.ajax("/tweets", {
      // url: "http://localhost:8080/tweets",
      method: "GET",
      success: function(tweet){
        renderTweets(tweet);
      },
      error: function() {
        console.error("No Tweet for you...")
      }
    })
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
