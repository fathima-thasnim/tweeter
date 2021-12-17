/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// fetching tweets with Ajax
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then(function (data) {
    renderTweets(data);
  }).catch((error) => {
    console.log(error);
  });
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(const tweet of tweets) {
     const $tweetValue = createTweetElement(tweet);
     $(".tweets-container").prepend($tweetValue);
  }
}



const createTweetElement = function(tweetData) {

const userName = tweetData.user.name;
const userAvatar = tweetData.user.avatars;
const userHandle = tweetData.user.handle;
const contentText = tweetData.content.text;
// const createdAt = tweetData.created_at;
const newTime = (unix) => {
  return timeago.format(unix);
};
const createdAt = newTime(tweetData.created_at);

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



  let $tweet = `
  <article class="tweet">
  <header>
  <div class="header-div">
  <img class="img" src=${escape(userAvatar)}>
  <span class="user">${escape(userName)}</span>
  </div>
  <div class="email">${escape(userHandle)}</div>
  </header>
  <div class="div-body"><p> ${escape(contentText)}</p></div>
       
        <footer>
          <div class="time-icon">
            <h6>${escape(createdAt)}<h6>
          </div>
          <div class="icons">
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-flag"></i> 
          <i class="fa-solid fa-retweet"></i>
          
          </div>
        </footer>
   </article>`;
  
  return $tweet;
}

//form submission using jQuery

$('form').submit(function(event) {
  event.preventDefault(); //prevents the default submit behavior
  const tweetText = $("#tweet-text").val();
  const errorMessage = $("#error");
  if(tweetText.length > 140) {
    errorMessage.show();
    errorMessage.text("🚫 Too long,Please respect our arbitary limit of 140 character");
  }
  else if(tweetText.length === 0) {
    errorMessage.show();
    errorMessage.text("❌ Cannot submit an empty tweet ❌")
  }
  else {
    errorMessage.hide();
    // errorMessage.text("");
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize() //turns form data into query string
    }).then(function(response) {
      $("#tweet-text").val(''); //to empty text after submission
      loadTweets();
      location.reload();
      console.log(response);
    })
  }
  
})
loadTweets();
  // const $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet)
// renderTweets(data);

});



