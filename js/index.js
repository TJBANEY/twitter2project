'use strict';
var templates = require('./template')


$(function () {  // Start of EVERYTHING

  var currentUser = {
    handle: '@bradwestfall',
    img: 'brad.png',
    id: 1
  };

  function renderTweet(currentUser, message) {  // Function 1
    var currentUserData = {
      image: "../images/" + currentUser.img,
      handle: currentUser.handle,
      id: currentUser.id,            // first tweet
      message: message
    }

    return templates.tweet(currentUserData);
  }

  var usersPath = "http://localhost:3000/users/"
  var repliesPath = "http://localhost:3000/replies/"
  var tweetsPath = "http://localhost:3000/tweets/"

  $('#main').on('click', '.compose', function(){
    $(this).addClass('expand')   // State Management Function 1
    $(this).attr('maxlength', '140')
  })

  $('#tweets').on('click', '.tweet', function (){
   $(this).parent().toggleClass('expand')   // State Management Function 2
   $(this).attr('maxlength', '140')
  })


  $.get(tweetsPath)  // Start of Tweet Render Function
    .done(function (tweets) { 
      tweets.forEach(function (tweets){ 
        $.get(usersPath + tweets.userId)
          .done(function (users){  
             var tweetData = {
              id: tweets.id,
              image: "../images/" + users.img,
              handle: users.handle,
              message: tweets.message
             }
             var tweet = (templates.tweet(tweetData))  
             var compose = templates.compose;
             var threadData = {
              tweet: tweet,
              compose: compose
             }
             var thread = (templates.thread(threadData))
             $('#tweets').append(thread)
           })  
         }) 
       })    // End of Tweet Render Function




  $.get(repliesPath)  // Start of Reply Render Function
    .done(function (replies) { 
     replies.forEach(function (replies){ 
      $.get(usersPath + replies.userId)
        .done(function (users){  
           var replyData = {
            id: replies.tweetId,
            image: "../images/" + users.img,
            handle: users.handle,
            message: replies.message
           }
           var reply = (templates.tweet(replyData))  
           $('#' + replies.tweetId).siblings(".replies").append(reply)
         })  
       }) 
     })    // End of Reply Render Function


  $('#main').on('click', 'button', function (event){   // Start of MAIN FUNCTION
  var location = $(this).parents('.compose')
  var message = location.find('textarea').val()
  var data2 = templates.thread({
      tweet: renderTweet(currentUser, message),
      compose: templates.compose
    })
  var reply = renderTweet(currentUser, message)
  var replyTweet = $(this).parents('.replies')

  if(!!replyTweet.length) {
    replyTweet.append(reply)
  } else {
    // $("#tweets").append(data2)
    console.log("waka waka")
  }


  location.find('textarea').val('')
  location.find('.count').val(140)
  $(this).parents('.compose').removeClass('expand')

  return false;
})  // End of MAIN FUNCTION

  $('#main').on('click', 'button', function (event){  // Start of PUSH TESTING
    $.post(usersPath, {
    handle: '@bradwestfall',
    img: 'brad.png',
    id: 1,
    }).done(console.log("this works"))

    return false;
  }) // End of PUSH TESTING

});  // End of EVERYTHING