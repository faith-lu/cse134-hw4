let items = JSON.parse(localStorage.getItem("blog-entries")) || [];

const entryList = document.getElementById('entryList'); // div containing all entries
let addButton = document.getElementById('add');

let postDialog = document.getElementById('postDialog'); // get the post dialog
    const titleInput = document.getElementById('titleInput');
    const dateInput = document.getElementById('dateInput');
    const sumInput = document.getElementById('sumInput');

    const dialogCancel = document.getElementById('dialogCancel');
    const dialogOK = document.getElementById('dialogOK');

// const template = document.getElementById('blogTemplate');
//     const clone = template.content.cloneNode(true); // create a clone of the entry div

// let userInput = clone.querySelectorAll('button');
//     let editButton = userInput[0];
//     let delButton = userInput[1];

let editButton = document.getElementById('edit');

function loadHandler() {
    let titleItem = "";
    let dateItem = "";
    let sumItem = "";
    listEntries();

    let edit = document.getElementById('edit');

    addButton.addEventListener('click', () => {
        postDialog.showModal();
        titleInput.addEventListener('change', () => {
            titleItem = DOMPurify.sanitize(titleInput.value);
            if (titleItem === "") {
                return alert("Please enter a title.");
            }
        });
        dateInput.addEventListener('change', () => {
            dateItem = DOMPurify.sanitize(dateInput.value);
            if (dateItem === "") {
                return alert("Please enter a date.");
            }
        });
        sumInput.addEventListener('change', () => {
            sumItem = DOMPurify.sanitize(sumInput.value);
            if (sumItem === "") {
                return alert("Please enter a summary.");
            }
        });

        dialogOK.addEventListener('click', () => {
            console.log(items);
            if(titleItem === "" || dateItem === "" || sumItem === "") { // not every entry filled
                alert("Missing entries, please fill everything.")
            }
            else {
                items.push({
                    title: titleItem,
                    date: dateItem,
                    sum: sumItem,
                });
                // let userInput = clone.querySelectorAll('div');
                // userInput[0].textContent = `Post title: ${items[items.length - 1].title}`;
                // userInput[1].textContent = `Post date: ${items[items.length - 1].date}`;
                // userInput[2].textContent = `Post summary: ${items[items.length - 1].sum}`;

                // entryList.appendChild(clone);

                localStorage.setItem("blog-entries", JSON.stringify(items));
                // dialogOK.value = items[items.length - 1];
                postDialog.close();
            }
            // 
        });

        dialogCancel.addEventListener('click', () => {
            postDialog.close();
        })

        postDialog.addEventListener('close', () => {    
            console.log("closing");
            listEntries();
        });
    });

    editButton.addEventListener('click', () => {
        console.log("clicked");
        postDialog.showModal();
        let siblingNodes = editButton.parentNode.childNodes;
        let sibTitle = siblingNodes[0];
        let sibDate = siblingNodes[1];
        let sibSum = siblingNodes[2];
        console.log("=====");
        console.log(sibTitle);
        console.log(sibDate);
        console.log(sibSum);
        // titleInput.defaultValue = 

        // titleInput.addEventListener('change', () => {
        //     titleItem = DOMPurify.sanitize(titleInput.value);
        //     if (titleItem === "") {
        //         return alert("Please enter a title.");
        //     }
        // });
        // dateInput.addEventListener('change', () => {
        //     dateItem = DOMPurify.sanitize(dateInput.value);
        //     if (dateItem === "") {
        //         return alert("Please enter a date.");
        //     }
        // });
        // sumInput.addEventListener('change', () => {
        //     sumItem = DOMPurify.sanitize(sumInput.value);
        //     if (sumItem === "") {
        //         return alert("Please enter a summary.");
        //     }
        // });
    });
}
function listEntries() {
    console.log("listing entries");
    console.log(items);
    let list = "";
    let itemTitle = "";
    let itemDate = "";
    let itemSum = "";
    for(let i = 0; i < items.length; i++) {
        itemTitle = items[i].title;
        itemDate = items[i].date;
        itemSum = items[i].sum;
        list += "<p class=\"entry\"><div id=\"title\">Post title: " + itemTitle + "</div><div id=\"date\">Post date: " + itemDate + "</div><div id=\"sum\">Post sum: " + itemSum + "</div></p><button id=\"edit\">Edit</button><button id=\"del\">Delete</button><hr />"
    }
    document.querySelector("#entryList").innerHTML = list;
}
window.addEventListener('DOMContentLoaded', loadHandler);
