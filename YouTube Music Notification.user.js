// ==UserScript==
// @name          Youtub Music Notification JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Sends notifications from the youtube music website when the currently playing track changes. Changes to when track is changed, also scrobble notification should work better.
// @icon      		https://s.ytimg.com/yts/img/music/web/favicon-vflntJm16.ico
// @grant			none
// @include       https://music.youtube.com/*
// @include       http*music.youtube.com/*
// @version        1.1
// ==/UserScript==
function LastFMGrowlinterval(originalTitle,artist,track){
	try{
        	var creator,name,ArtistPic,scrobble;
		if(document.getElementsByTagName("ytmusic-player-bar")[0]){
			name=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[0].innerHTML;
			creator=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("yt-formatted-string")[1].getElementsByTagName("a")[0].innerHTML;
			ArtistPic=document.getElementsByTagName("ytmusic-player-bar")[0].getElementsByTagName("img")[0].src;
        	}
        	else{
            		creator="Unknown";
            		name="Unknown";
		}
		if ((creator !== originalTitle)&&(creator!=="Unknown")) {
			originalTitle=creator;
			//console.log('Sent Last.fm notification');
			var notification=new Notification(creator,{
				icon: ArtistPic,
				body: name,
			});
			scrobble="UNKNOWN";
		}
        	else{
            		//console.log('same song');
		}
		return [originalTitle,creator,name];
    	}
	catch(err){
		var txt="There was an error on this page.\n";
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
Notification.requestPermission().then(function(result) {
	if (result === 'denied') {
		console.log('Permission wasn\'t granted. Allow a retry.');
		return;
	}
	if (result === 'default') {
		console.log('The permission request was dismissed.');
		return;
	}
	var scrobble="UNKNOWN",originalTitle,creator,track;
	originalTitle = "not playing yet";
	//console.log("Original Title:"+originalTitle);
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
});
//console.log("end of loop");
