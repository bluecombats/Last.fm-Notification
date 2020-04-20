// ==UserScript==
// @name		Youtube Music Notification JPC
// @author		James Clare
// @namespace		http://www.bluecombats.blogspot.com
// @updateURL		https://github.com/bluecombats/Last.fm-Notification/raw/master/YouTube%20Music%20Notification.user.js
// @downloadURL		https://github.com/bluecombats/Last.fm-Notification/raw/master/YouTube%20Music%20Notification.user.js
// @supportURL		https://github.com/bluecombats/Last.fm-Notification/issues
// @run-at		document-end
// @description		Sends notifications from the youtube music website when the currently playing track changes. Changes to when track is changed, also scrobble notification should work better.
// @icon		https://s.ytimg.com/yts/img/music/web/favicon-vflntJm16.ico
// @grant		none
// @include		https://music.youtube.com/*
// @include		http*music.youtube.com/*
// @version		1.4
// ==/UserScript==
function LastFMGrowlinterval(title){
   try{
      var track, artist, ArtistPic, options, notification;
         if(document.getElementsByTagName("ytmusic-player-bar")[0]){
            if (document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[0]){
                track=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[0].innerHTML;
            }else{track="Unknown"}
            if(document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[1]){
                //console.log(document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[1].innerHTML);
                if(document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[1].getElementsByTagName("a")[0]){
                   artist=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[1].getElementsByTagName("a")[0].innerHTML;
                }else{artist="Unknown"}
            }else{artist="Unknown"}
			ArtistPic=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("img")[0].src;
        	}
        	else{
            		track="Unknown";
            		artist="Unknown";
		}
		if ((artist !== title)&&(artist!=="Unknown")) {
			//console.log('Sent Last.fm notification');
			//https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
			title=artist;
			options ={
				body:track
				//renotify:true
				//,requireInteraction: true
				//,tag:"YoutubeMusic Notification"
				,icon:ArtistPic
				,silent:true
			}
			notification=new Notification(title,options);
		}
        	else{
            		//console.log('same song');
		}
		return title;
    	}
	catch(err){
		var txt="There was an error on this page.\n";
		txt+="Error description: " + err.message + "\n";
		txt+="Error line"+err.lineNumber+ "\n";
		txt+="Click OK to continue.\n\n";
		console.log(txt);
	}
}
function NotifyCheck() {
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		console.log("This browser does not support desktop notification");
		return false;
	}
	// Let's check whether notification permissions have alredy been granted
	else if (Notification.permission === "granted") {
		console.log("notification permission is already granted");
		return true;
	}
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied' || Notification.permission === "default") {
		Notification.requestPermission(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
				console.log("permission is granted");
				return true;
			}
		});
	}
	// At last, if the user has denied notifications, and you 
	// want to be respectful there is no need to bother them any more.
}
//Main Script starts here
var check=NotifyCheck();
var title = "not playing yet";
if(check===true){
	//console.log("Original Title:"+title);
	var MyVar=setInterval(function(){
		title=LastFMGrowlinterval(title);
	},3000);
};
//console.log("end of loop");
