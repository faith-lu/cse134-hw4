let items = JSON.parse(localStorage.getItem("blog-entries")) || [];

const entryList = document.getElementById('entryList'); // div containing all entries
let addButton = document.getElementById('add');

let postDialog = document.getElementById('postDialog'); // get the post dialog
    const titleInput = document.getElementById('titleInput');
    const dateInput = document.getElementById('dateInput');
    const sumInput = document.getElementById('sumInput');

    const dialogCancel = document.getElementById('dialogCancel');
    const dialogOK = document.getElementById('dialogOK');

let titleItem = "";
let dateItem = "";
let sumItem = "";

function loadHandler() {
    listEntries();

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
            listEntries();
        });
    });

}
function editItem(index) {
    postDialog.showModal();
    titleInput.defaultValue = items[index].title;
    dateInput.defaultValue = items[index].date;
    sumInput.defaultValue = items[index].sum;

    titleItem = items[index].title;
    dateItem = items[index].date;
    sumItem = items[index].sum;

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
        if(titleItem === "" || dateItem === "" || sumItem === "") { // not every entry filled
            alert("Missing entries, please fill everything.")
        }
        else {
            items[index].title = titleItem;
            items[index].date = dateItem;
            items[index].sum = sumItem;
            localStorage.setItem("blog-entries", JSON.stringify(items));
            postDialog.close();
        }
    });

    dialogCancel.addEventListener('click', () => {
        postDialog.close();
    })

    postDialog.addEventListener('close', () => {
        listEntries();
    });
}

function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("blog-entries", JSON.stringify(items));
    listEntries();
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
        list += "<p class='entry'><div>Post title: <span id='title'>" + itemTitle + "</span></div><div id='date'>Post date: <span id='title'>" + itemDate + "</span></div><div id='sum'>Post sum: <span id='title'>" + itemSum + "</span></div><button id='edit' onclick='editItem(" + i + ")'>Edit</button><button id='del' onclick='deleteItem(" + i + ")'>Delete</button></p><hr />"
    }
    document.querySelector("#entryList").innerHTML = list;
}

window.addEventListener('DOMContentLoaded', loadHandler);
window.editItem = editItem;
window.deleteItem = deleteItem;