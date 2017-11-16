// ==UserScript==
// @name          Last FM Notification JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Sends notifications from the Last.fm website when the currently playing track changes. Changes to when track is changed, also scrobble notification should work better.
// @icon      		http://www.growlforwindows.com/gfw/images/plugins/lastfm.png
// @grant			none
// @include       http://last.fm/*
// @include       http://www.last.fm/*
// @include       http*last.fm/*
// @include       http*www.last.fm/*
// @version        0.5
// ==/UserScript==
function LastFMGrowlinterval(originalTitle,artist,track){
	try{
        	var creator,name,ArtistPic;
		//console.log("current Title:"+newTitle);
        	//console.log("original title: "+originalTitle);
		if(document.getElementsByClassName("player-bar-artist-name")[0]){
			creator=document.getElementsByClassName("player-bar-artist-name")[0].innerHTML;
			name=document.getElementsByClassName("player-bar-track-name")[0].innerHTML;
			ArtistPic=document.getElementsByClassName("player-bar-artwork js-artwork")[0].getElementsByTagName("img")[0].src;
        	}
        	else{
            		creator="Unknown";
            		name="Unknown";
		}
		//var  albumImage=null;
		//console.log("ARTIST "+creator);
		//console.log("TRACK "+name);
		if ((creator !== originalTitle)&&(creator!=="Unknown")) {
			originalTitle=creator;
			//console.log('Sent Last.fm notification');
			var notification=new Notification(creator,{
				icon: ArtistPic,
				body: name,
			});
			//notification.onclick = function () {
			//window.open("http://stackoverflow.com/a/13328397/1269037");
			//};
			scrobble="UNKNOWN";
		}
        	else{
            		//console.log('same song');
		}
		return [originalTitle,creator,name];
    	}
	catch(err){
		txt="There was an error on this page.\n";
		txt+="Error description: " + err.message + "\n";
		txt+="Error line"+err.lineNumber+ "\n";
		txt+="Click OK to continue.\n\n";
		console.log(txt);
	}
}
function removeHtml(tweet){
	//find 1st occurence of <
	var lessthan=tweet.indexOf("<");
	while(lessthan!=-1){
		//console.log("check: "+tweet);
		//find 1st occurence of >
		var greaterthan=tweet.indexOf(">");
		//the html stuff
		var htmlstuff=tweet.substring(lessthan,greaterthan+1);
		//replacing html with nothing
		//console.log("<:"+lessthan+" >:"+greaterthan+" htmlstuff:"+htmlstuff);
		tweet=tweet.replace(htmlstuff,"");
		//console.log("newtweet: "+tweet);
		//update lessthan
		lessthan=tweet.indexOf("<");
	}
	//console.log("end of if statements");
	return tweet;
}
//Main Script starts here
var originalTitle,scrobble,creator="Unknown",track="Unknown";
document.addEventListener('DOMContentLoaded', function () {
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.');
		return;
	}
	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}
});
originalTitle = "not playing yet";
//console.log("Original Title:"+originalTitle);
scrobble="UNKNOWN";
//var count=0;
MyVar=setInterval(function(){
	var returnVar=LastFMGrowlinterval(originalTitle,creator,track);
	originalTitle=returnVar[0];
	creator=returnVar[1];
	track=returnVar[2];
	//count++;
	//console.log(count);
	//if(count>20){
		//clearInterval(MyVar);
	//}
},3000);
//console.log("end of loop");
