 // Create an empty array to store all the items saved for later 
let itemsArr = [];
// Select the table, where all the items will be displayed
let itemsTableHtmlSelector = document.getElementById("saved-for-later-table");

/* Create a function to check if the page is loaded for the first time; if so initialise the values that will be stored in localStorage. 
Otherwise use items that already exist in localStorage to crate HTML elements that will be displayed in the table 
(the table is hidden as long as the localStorage is empty). */
function load() {
    console.log(itemsTableHtmlSelector);
    itemsTableHtmlSelector.style.visibility = "hidden";

    if (localStorage.getItem("hasRun") === null) {
        localStorage.setItem("items", JSON.stringify(itemsArr));
        localStorage.setItem("hasRun", true);
    } else {
        // Get the array of item objects from localStorage and assign it to the array "commentArr". Initialize an index.
        itemsArr = localStorage.getItem("items");
        itemsArr = JSON.parse(localStorage.getItem("items"));
        let i = 0;
        /* Loop thourgh the items in the item array. It will provide data to feed into the table: source of the image to be displayed 
        in the Save for Later section. When there is at least one Item object added make the table visible.*/
        itemsArr.forEach(function(item) {
            // Create table row by index and add to each a class with the index as a name
            let tableRow = document.createElement("tr");
            tableRow.setAttribute("id", i);
            // Create table data: image. Add class to each image.
            let tableData = document.createElement("td");
            let imageSavedForLater = document.createElement("img");
            imageSavedForLater.classList.add("image-saved");
            // Access the source of each image
            let imageSource = itemsArr[i].imgSrc;
            // Test the source
            console.log(`Source: ${imageSource}`)
            // Set "src" attribute which is the source of the image
            imageSavedForLater.setAttribute("src", `${imageSource}`);
            // Increase index by one
            i = i + 1;
            // Append all the child elements
            itemsTableHtmlSelector.appendChild(tableRow);
            tableRow.appendChild(tableData);
            tableData.appendChild(imageSavedForLater);
        });
        // If the is at least one image saved for later, display it on the page.
        if (i > 0) {
            itemsTableHtmlSelector.style.visibility = "visible";
        }
    }
}
// Add the constructor function to create Item objects.
function Item(imgSrc) {
    this.imgSrc = imgSrc;
}

/* Create a function that add a new images to the table with items saved for later. It will be triggered every time the user clicks 
"Save for later" button. The items (images) will be retrieved from the Travels and Walks paged. New Item objects will be created with 
the constructor function. All the items will be added to the item array created on the top of the code. 
The array in the localStorage will be also updated.*/
function saveForLater(image, button) {
    itemsArr = JSON.parse(localStorage.getItem("items"));
    const childElement = document.getElementById(button);
    const parentElement = childElement.closest(`.${image}`);
    let imageSource = parentElement.children[1].src;

    let newItem = new Item(
        imageSource,
    );
    itemsArr.push(newItem);
    localStorage.setItem("items", JSON.stringify(itemsArr));
    alert(`${itemsArr.length} item(s) saved for later`)
}

// Clear() function can be used for testing purposes. 
// localStorage.clear();