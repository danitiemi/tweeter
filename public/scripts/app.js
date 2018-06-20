/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
function renderTweets (tweets) {
  let singleTweet = {};
  let data = $('#tweetsContainer');
  // let data = [];
  // loops through tweets calls createTweetElement for each tweet
  for (tweet in tweets) {
    singleTweet = createTweetElement(tweet);
    data = data.append(singleTweet);
  }
  // takes return value and appends it to the tweets container
  return data;
}

// function that takes in a tweet object and is responsible for returning
// a tweet <article> element containing the entire HTML structure of the tweet
function createTweetElement (tweet) {
  // returns a tweet <article>
  let $tweet = $("<article>").addClass("tweet");
  let username = tweet.user.name;
  let image = tweet.user.avatars.small;
  let nickname = tweet.user.handle;
  let content = tweet.content.text;
  let tweetDate = tweet.created_at;
  let markedTweet = `<header>${image}<span>${username}</span><span>${nickname}</span></header><section><p>${content}</p></section><footer><span>${tweetDate}</span>`;

  $tweet = $tweet.append(markedTweet)

  return $tweet;
}


renderTweets();



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

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
// $('#tweetsContainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
