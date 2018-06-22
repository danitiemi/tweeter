  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
$(document).ready(function() {


// responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
  function renderTweets (tweets) {

    let $html= $("<div>");
    // loops through tweets calls createTweetElement for each tweet
    tweets.forEach (function(tweet) {
      $html = $html.prepend(createTweetElement(tweet));
     });

    $('#tweetsContainer').html($html);
  }


//  function that takes in a tweet object and returns a tweet <article> element containing the HTML structure of the tweet
  function createTweetElement (tweet) {
    // returns a tweet <article>
    let $tweet = $("<article>").addClass("tweet");
    let now = moment(tweet.created_at).startOf('hour').fromNow();

    let tweetData = `<header><img class="logo" src="${tweet.user.avatars.small}">
                    <span class="user">${tweet.user.name}</span>
                    <span class="user_nickname">${tweet.user.handle}</span></header>
                    <section class="tweet_text"><p>${tweet.content.text}</p></section>
                    <footer><span class="date">${now}</span><span class= "flag">
                    <i class="fas fa-flag"></i></span><span class= "retweet">
                    <i class="fas fa-retweet"></i></span><span class="like">
                    <i class="fas fa-heart"></i></span></footer>`;

    $tweet =  $tweet.append(tweetData);

    return $tweet;
  }

// ----- Form Submission ----- //

  $("form").on("submit", function(e) {

    e.preventDefault();
    let data = $('form').serialize();
    let inputArea = $('#input').val();
    // 1. Get the data from the from
    if (!inputArea) {
      alert("Maybe you wanna type a few words...")
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


// It will use jQuery to make a request and receive the array of tweets as JSON.
  function loadTweets () {
    $.ajax("/tweets", {
      method: "GET",
      success: renderTweets
    });
  }

  loadTweets();

// ----- Toggle button ----- //
  $("button").click(function() {
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });

});
