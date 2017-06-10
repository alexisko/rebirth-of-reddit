var containerDiv = document.getElementById("main");

//BUTTON/LINK VARIABLES
var random, myBoards, getTheApp, clear;
random = document.getElementById('random');
myBoards = document.getElementById('myBoards');
getTheApp = document.getElementById('getTheApp');
clear = document.getElementById('clear');

//REQUEST VARIABLES
var subredditReq, subredditLink, myBoardsLink, getAppLink, randomLink;
subredditLink = "https://www.reddit.com/r/sanfrancisco.json";
randomLink = "";
myBoardsLink = "https://www.reddit.com/r/ft86.json";
getAppLink = "";

//ARTICLE VARIABLES
var articleDiv, img, title, otherInfo, summary;

function getSubreddit(link) {
  subredditReq = new XMLHttpRequest();
  subredditReq.addEventListener('load', getMainArticles);
  subredditReq.open('GET', link);
  subredditReq.send();
}

function getMainArticles() {
  var response = JSON.parse(this.responseText);
  for(var i = 2; i < 6; i++) {
    articleDiv = document.createElement('div');
    articleDiv.className = 'article';
    //insert images here
    title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = response.data.children[i].data.title;
    otherInfo = document.createElement('div');
    otherInfo.className = 'otherInfo';
    otherInfo.innerHTML = 'by ' + response.data.children[i].data.author;
    otherInfo.innerHTML += ' ' + response.data.children[i].data.created;
    otherInfo.innerHTML += ' views'; //need to figure out view count
    summary = document.createElement('div');
    summary.className = 'summary';
    summary.innerHTML = response.data.children[i].data.selftext;
    articleDiv.appendChild(title);
    articleDiv.appendChild(otherInfo);
    articleDiv.appendChild(summary);
    console.log(articleDiv);
    containerDiv.appendChild(articleDiv);
  }
}

getSubreddit(subredditLink);