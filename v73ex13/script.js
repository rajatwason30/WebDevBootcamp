function setTitle(title, tempCard){
    tempCard.querySelector(".title").innerHTML = title;
    return tempCard;
}
function setChannelName(cname, tempCard){
    tempCard.querySelector(".channelname").innerHTML = cname;
    return tempCard;
}
function setViews(views, tempCard){
    let ans;
    console.log(views)
    if(Math.floor(views/1000000000) != 0){
        console.log(Math.floor(views/1000000000))
        ans = `${Math.floor(views/1000000000)}B`;
    }else if(Math.floor(views/1000000) != 0){
        console.log(Math.floor(views/1000000))
        ans = `${Math.floor(views/1000000)}M`;
    }else if(Math.floor(views/1000) != 0){
        console.log(Math.floor(views/1000))
        ans = `${Math.floor(views/1000)}K`;
    }else{
        ans = `${views}`;
    }
    ans = `${ans} views`;
    tempCard.querySelector(".views").innerHTML = ans;
    return tempCard;
}
function setOld(monthsOld, tempCard){
    tempCard.querySelector(".old").innerHTML = `${monthsOld} months ago`;
    return tempCard;
}
function setDuration(duration, tempCard){
    tempCard.querySelector(".duration").innerHTML = duration;
    return tempCard;
}
function setThumbnail(thumbnail, tempCard){
    tempCard.querySelector(".thumbnail img").setAttribute('src',thumbnail);
    return tempCard;
}

function getNewCard(title, cName, views, monthsOld, duration, thumbnail){
    let tempCard = document.querySelector(".template");
    let newCard = tempCard.cloneNode(true);
    newCard = setTitle(title,newCard);
    newCard = setChannelName(cName, newCard);
    newCard = setViews(views, newCard);
    newCard = setOld(monthsOld, newCard);
    newCard = setDuration(duration, newCard);
    newCard = setThumbnail(thumbnail, newCard);
    return newCard;
}


function createCard(title, cName, views, monthsOld, duration, thumbnail){
    // Finish this function
    let newCard = getNewCard(title,cName,views,monthsOld,duration,thumbnail);
    document.querySelector(".container").append(newCard);
}


createCard("Mega Project | Buy me a Chai", "CodeWithHarry", 560000, 7, "55:22", "https://i.ytimg.com/vi/QtaorVNAwbI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDQW6QhbVJpandF81U5RtCNN0E0yw")
createCard("Introduction to Backend | Sigma Web Dev video #3", "Rajat Wason", 450239, 7, "10:35", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")
createCard("Introduction to Backend | Sigma Web Dev video #4", "Hustler Coding", 6600000, 7, "14:15", "https://i.ytimg.com/vi/mCx5aSEK8YE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA3ngu7jbOvXrL7iduEAG1hQXnx-g")
createCard("Mega Project | Buy me a Chai", "CodeWithHarry", 560, 7, "55:22", "https://i.ytimg.com/vi/QtaorVNAwbI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDQW6QhbVJpandF81U5RtCNN0E0yw")
createCard("Introduction to Backend | Sigma Web Dev video #3", "Rajat Wason", 4, 7, "10:35", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")
createCard("Introduction to Backend | Sigma Web Dev video #4", "Hustler Coding", 6600000000, 7, "14:15", "https://i.ytimg.com/vi/mCx5aSEK8YE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA3ngu7jbOvXrL7iduEAG1hQXnx-g")