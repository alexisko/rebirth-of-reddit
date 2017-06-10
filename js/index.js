// console.log('sanity check');
var containerDiv = document.getElementById("main");

//REQUEST VARIABLES
var subredditReq, subredditLink, myBoardsLink, getAppLink, randomLink;
subredditLink = "https://www.reddit.com/r/sanfrancisco.json";
myBoardsLink = "https://www.reddit.com/r/ft86.json";

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
    title = document.createElement('h1');
    title.innerHTML = response.data.children[i].data.title;
    otherInfo = document.createElement('div');
    otherInfo.className = 'otherInfo';
    otherInfo.innerHTML = 'by ' + response.data.children[i].data.author;
    otherInfo.innerHTML += ' ' + response.data.children[i].data.created;
    otherInfo.innerHTML += ' views'; //need to figure out view count
    summary = document.createElement('div');
    summary.innerHTML = 'placeholdertext';
    articleDiv.appendChild(title);
    articleDiv.appendChild(otherInfo);
    articleDiv.appendChild(summary);
    console.log(articleDiv);
    containerDiv.appendChild(articleDiv);

  }
}

getSubreddit(subredditLink);