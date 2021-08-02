let flag = true;

function throttle(){
    /* limit network api requests by 200 ms */

    //check input
    //get keyword
    const keyword = document.getElementById("search").value;
    if(keyword == ""){
        /* hide div */
        hideResults();
        return;
    }

    if(flag){
        triggerSearch();
        setTimeout(() => {
            flag = true;
        }, 200);
    }

}
function triggerSearch(){
    /* start search action */
    search();
    flag = false;
}
async function search(){
    /* show autosuggestions for results */
    
    //get keyword
    const keyword = document.getElementById("search").value;

    const characterData = await request(keyword);

    if(characterData){
        console.log(characterData);

        //append data to append results
        document.getElementById("searchResults").innerHTML = "";
        characterData.forEach( ({ name, image, location:{name:origin} }) => {
            appendData(name, image, origin);
        });
    }
    else{
        appendError();
    }
}

async function request(keyword){
    /* make request to fetch data from api */
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${keyword}`);
    const data = await response.json();
    return data.results;
}

function appendData(name, image, origin){
    /* append data to search results div */
    
    //get div
    const div = document.getElementById("searchResults");

    //create wrapper div
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.display = "flex";
    wrapper.style.gap = "8px";
    wrapper.style.alignItems = "center";
    wrapper.style.borderBottom = "0.5px solid silver";

    //div left
    const divLeft = document.createElement("div");
    divLeft.style.width = "100%";
    divLeft.style.display = "flex";
    divLeft.style.alignItems = "center";
    divLeft.style.gap = "8px";
    divLeft.style.justifyContent = "start";   

    //div right
    const divRight = document.createElement("div");
    divRight.style.width = "100%";
    divRight.style.display = "flex";
    divRight.style.alignItems = "center";
    divRight.style.justifyContent = "end"; 


    //create img
    const img = document.createElement("img");
    img.style.width = "20%";
    img.style.borderRadius = "5px";
    img.setAttribute("src", image);


    //create name
    const title = document.createElement("h5");
    title.innerHTML = name;

    //create location
    const location = document.createElement("p");
    location.style.fontSize = "9px";
    location.innerHTML = origin;

    //left div
    divLeft.append(img, title);

    //right div
    divRight.append(location);

    //append to wrapper div
    wrapper.append(divLeft, divRight);

    //append to div
    div.append(wrapper);

    div.style.visibility = "visible";
}

function appendError(){
    /* api call failed */
    //get div
    const div = document.getElementById("searchResults");
    div.innerHTML = "";
    const errorMsg = document.createElement("h4");
    errorMsg.style.marginTop = "20px";
    errorMsg.style.textAlign = "center"; 
    errorMsg.innerHTML = "Aw Jeez! Could not find that character."
    div.append(errorMsg);
    div.style.visibility = "visible";
}

function hideResults(){
    /* hide search results */
    const div = document.getElementById("searchResults");
    div.style.visibility = "hidden";    
}