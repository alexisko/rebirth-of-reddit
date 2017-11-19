var containerDiv = document.getElementById("main");

//BUTTON/LINK VARIABLES
var random, myBoards, getTheApp, clear;
random = document.getElementById('random');
myBoards = document.getElementById('myBoards');
getTheApp = document.getElementById('getTheApp');

//REQUEST VARIABLES
var subredditReq, subredditLink, myBoardsLink, getAppLink, randomLink;
subredditLink = "https://www.reddit.com/r/sanfrancisco.json";
randomLink = "";
myBoardsLink = "https://www.reddit.com/r/ft86.json";
getAppLink = "https://www.reddit.com/r/UCSD.json";

//ARTICLE VARIABLES
var articleDiv, imgDiv, imgLink, img, title, titleLink, otherInfo, summary;

//COUNTER
var articleCounter = 0;

//FUNCTIONS
function getSubreddit(link) {
  subredditReq = new XMLHttpRequest();
  subredditReq.addEventListener('load', getArticles);
  subredditReq.open('GET', link);
  subredditReq.send();
}

function getArticles() {
  var response = JSON.parse(this.responseText);
  while(response.data.children[articleCounter].data.stickied) {
    articleCounter++;
  }
  for(var i = articleCounter; i < (articleCounter+4); i++) {
    articleDiv = document.createElement('div');
    articleDiv.className = 'article';

    imgDiv = document.createElement('div');
    imgDiv.className = 'images';
    imgLink = document.createElement('a');
    imgLink.href = response.data.children[i].data.url;
    imgLink.appendChild(imgDiv);
    if(response.data.children[i].data.preview !== undefined) {
      img = new Image();
      img.src = response.data.children[i].data.preview.images[0].source.url;
      imgDiv.appendChild(img);
    } else {
      imgDiv.innerHTML = 'NO IMAGE AVAILABLE';
    }

    titleLink = document.createElement('a');
    titleLink.href = response.data.children[i].data.url;
    title = document.createElement('h1');
    title.className = 'title';
    title.innerHTML = response.data.children[i].data.title;
    titleLink.appendChild(title);

    otherInfo = document.createElement('div');
    otherInfo.className = 'otherInfo';
    otherInfo.innerHTML = 'by ' + response.data.children[i].data.author + " &bull; ";
    otherInfo.innerHTML += ' ' + convertTime(response.data.children[i].data.created_utc) + " &bull; ";
    otherInfo.innerHTML += ' ' + response.data.children[i].data.ups + "+";

    articleDiv.appendChild(imgLink);
    articleDiv.appendChild(titleLink);
    articleDiv.appendChild(otherInfo);
    containerDiv.appendChild(articleDiv);
  }
  articleCounter += 4;
}

function convertTime(t) {
  var curTime = new Date(); //current date
  var time = new Date(0); //article date
  time.setUTCSeconds(t);
  if(time.getFullYear() === curTime.getFullYear() && time.getMonth() === curTime.getMonth() &&
    time.getDay() === curTime.getDay() && time.getHours() === curTime.getHours()) {

    if((curTime.getMinutes() - time.getMinutes()) === 1) {
      return "1 minute ago";
    } else {
      return (curTime.getMinutes() - time.getMinutes()) + " minutes ago";
    }

  } else if(time.getFullYear() === curTime.getFullYear() && time.getMonth() === curTime.getMonth() &&
    time.getDay() === curTime.getDay()) {

    if((curTime.getHours() - time.getHours()) === 1) {
      return "1 hour ago";
    } else {
      return (curTime.getHours() - time.getHours()) + " hours ago";
    }

  } else if(time.getFullYear() === curTime.getFullYear() && time.getMonth() === curTime.getMonth()) {

    if((curTime.getDate() - time.getDate()) === 1) {
      return "1 day ago";
    } else {
      return (curTime.getDate() - time.getDate()) + " days ago";
    }


  } else if(time.getFullYear() === curTime.getFullYear()) {

    if((curTime.getMonth() - time.getMonth()) === 1) {
      return "1 month ago";
    } else {
      return (curTime.getMonth() - time.getMonth()) + " months ago";
    }

  } else {

    if((curTime.getFullYear() - time.getFullYear()) === 1) {

    } else {
      return (curTime.getFullYear() - time.getFullYear()) + " years ago";
    }

  }
}

window.onload = function() {
  getSubreddit(subredditLink);
};

//BUTTON/LINK EVENT LISTENERS
random.addEventListener('click', function() {
  containerDiv.innerHTML = "";
});

myBoards.addEventListener('click', function(event) {
  event.preventDefault();
  containerDiv.innerHTML = "";
  getSubreddit(myBoardsLink);
});

getTheApp.addEventListener('click', function() {
  event.preventDefault();
  containerDiv.innerHTML = "";
  getSubreddit(getAppLink);
});
