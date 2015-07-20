'use strict';
var templates = require('./template')
var $ = require('jquery')

  var currentUser = {
    handle: '@timbaney',
    img: '../images/world.png',
    id: 4
  };

$(function () {  // DOM READY FUNCTION

  var baseURL = "http://localhost:3000/";

  function getTweets() {
    return $.get(baseURL + "tweets/")
  }

  function getReplies() {
    return $.get(baseURL + "replies/")
  }

  function tweetObject(id, image, handle, message) {
    return   { id: id,
               image: image,
               handle: handle, 
               message: message
             }
  }

  function renderThread(tweet, compose) {
    return { tweet: tweet, 
             compose: compose
           }
  }

  function getTweetUsers(id) {
    return $.get(baseURL + "users/" + id)
  }

  function getReplyUsers(id) {
    return $.get(baseURL + "users/" + id)
  }

  function repliesData(userId, tweetId, message) {
    return {
      userId: userId,
      tweetId: tweetId,
      message: message
    }
  }

  var getTweets = getTweets();
  var getReplies = getReplies();
  var compose = templates.compose;

  $('#main').on('click', '.compose', function(){
    $(this).addClass('expand')   // State Management Function 1
    $(this).attr('maxlength', '140')
  })

  $('#tweets').on('click', '.tweet', function (){
   $(this).parent().toggleClass('expand')   // State Management Function 2
   var repliesExist = $(this).closest('#tweets').find('.replies .tweet').length
   if (repliesExist == 0) {  //if #tweets has no replies, get replies
     getReplies.done(function (replies) { 
       replies.forEach(function (replies){ 
        getReplyUsers(replies.userId).done(function (users){  
          var reply = templates.tweet(tweetObject(replies.tweetId, "../images/" + users.img, users.handle, replies.message))
          $('#' + replies.tweetId).siblings(".replies").append(reply)
          })  
        }) 
      })   
    }
  })

  getTweets
   .done(function (tweets) {     //get tweets, and tweets users based on their userId
    tweets.forEach(function (tweets){ 
      getTweetUsers(tweets.userId)
       .done(function (users){  
         var tweet = templates.tweet(tweetObject(tweets.id, users.img, users.handle, tweets.message))
         var thread = templates.thread(renderThread(tweet, compose))
         $('#tweets').append(thread)
        })  
      }) 
    })  

  $('#main').on('click', 'button', function (event){   //Main function for when text is entered in compose area, and button is clicked
  var location = $(this).parents('.compose')
  var message = location.find('textarea').val()
  var replyTweet = $(this).parents('.replies')
  var thisId = $(this).parents('.thread').find('.tweet').attr('id')

  if(!!replyTweet.length) {  //if this button parents don't have a replies section post and append to #tweets, otherwise append to that buttons thread
    
    $.post(baseURL + "replies/", repliesData(currentUser.id, thisId, message))
      .done(function (currenUser, data){
      var swaka = templates.tweet(tweetObject(currentUser.id, currentUser.img, currentUser.handle, message))
      $(replyTweet).append(swaka)
    }).fail(function(){
      console.log("This doesn't work")
    })

  } else {
    
    $.post(baseURL + "tweets/", {
      userId: 4,
      message: message
    }).done(function (currenUser, data){
      var waka = templates.tweet(tweetObject(currentUser.id, currentUser.img, currentUser.handle, message))
      var wakaThread = templates.thread(renderThread(waka, compose))
      $('#tweets').append(wakaThread)
    }).fail(function(){
      console.log('ERROR')
    })
  }

  location.find('textarea').val('')
  location.find('.count').val(140)
  $(this).parents('.compose').removeClass('expand')

  return false;
}) 



});  // End of DOM READY FUNCTION