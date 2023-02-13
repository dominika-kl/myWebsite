//Create an empty array to store all comment objects 
let commentsArr = [];
//Select the table where the comments will be displayed.
let tableHtmlSelector = document.getElementById("comments-table");

/* Create a function to check if the page is loaded for the first time; if so initialise the values that will be stored in sessionStorage. 
Otherwise use comments that already exist in SessionStorage to crate HTML elements that will be displayed in the table 
(the table is hidden as long as the SessionStorage is empty). */
function load() {
    tableHtmlSelector.style.visibility = "hidden";

    if (sessionStorage.getItem("hasRun") === null) {
        sessionStorage.setItem("comments", JSON.stringify(commentsArr));
        sessionStorage.setItem("hasRun", true);
    } else {
        //Get the array of comment objects from sessionStorage and assign it to the array "commentArr"
        commentsArr = sessionStorage.getItem("comments");
        commentsArr = JSON.parse(sessionStorage.getItem("comments"));
        // console.log(typeof(commentsArr))
        let i = 0;
        /*Loop thourgh the comments in the comment array. It will provide data to feed into the table: comment and name. 
        When there is at least one Comment object added make the table visible.*/
        commentsArr.forEach(function(comment) {
            //Create table row by index and add to each a class with the index as a name
            let tableRow = document.createElement("tr");
            tableRow.setAttribute("id", i);
            // Create table data: row with name
            let tableDataName = document.createElement("td");
            tableDataName.innerHTML = comment.name;
            tableDataName.setAttribute("id", `name${i}`);
            tableDataName.style.width = "10%";
            // Create table data: row with text of the comment
            let tableDataText = document.createElement("td");
            tableDataText.innerHTML = comment.text;
            tableDataText.setAttribute("id", `text${i}`);
            // Increase index by one for each element created
            i = i + 1;
            // Append all the child elements. 
            tableHtmlSelector.appendChild(tableRow);
            tableRow.appendChild(tableDataName);
            tableRow.appendChild(tableDataText);
        });
        if (i > 0) {
            tableHtmlSelector.style.visibility = "visible";
        }
    }
}
// Add the constructor function to create Comment objects.
function Comment(name, text) {
    this.name = name;
    this.text = text;
}

/* Create a function that add a new comment to the table with comments. It will be triggered every time the user clicks "Add" button. 
The comments will be retrieved from the form filloud out by the user on the webpage. New Comment objects will be created with 
the constructor function. All the objets will be added to the comment array created on the top of the code. 
The array in the SessionStirage will be also updated.*/
function addComment() {
    commentsArr = JSON.parse(sessionStorage.getItem("comments"));
    let newComment = new Comment(
        document.getElementById("name").value,
        document.getElementById("text").value,
    );
    commentsArr.push(newComment);
    sessionStorage.setItem("comments", JSON.stringify(commentsArr));
}
// clear() function can be used for testing purposes. 
// sessionStorage.clear();