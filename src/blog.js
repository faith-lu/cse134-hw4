let items = JSON.parse(localStorage.getItem("blog-entries")) || [];
function loadHandler() {
    let outputElement = document.getElementById('outputElement');
    let addButton = document.getElementById('add');
    let postDialog = document.getElementById('postDialog'); // get the post dialog

    
    const titleInput = document.getElementById('titleInput');
    const dateInput = document.getElementById('dateInput');
    const sumInput = document.getElementById('sumInput');

    const dialogCancel = document.getElementById('dialogCancel');
    const dialogOK = document.getElementById('dialogOK');

    addButton.addEventListener('click', () => {
        let prevLength = items.length;
        if('content' in document.createElement('template')) {
            const template = document.getElementById('blogTemplate');
            const entries = document.getElementById('entries'); // div containing all entries
    
            const clone = template.content.cloneNode(true); // create a clone of the entry div

            let title = clone.getElementById('title');
            let date = clone.getElementById('date');
            let sum = clone.getElementById('sum');

            let titleItem = "";
            let dateItem = "";
            let sumItem = "";

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
                if(items.length <= prevLength && items.length != 0) { // not every entry filled
                    return alert("Missing entries, please fill everything.")
                }
                items.push({
                    title: titleItem,
                    date: dateItem,
                    sum: sumItem,
                })
                localStorage.setItem("blog-entries", JSON.stringify(items));
                dialogOK.value = items[prevLength];
                postDialog.close();
            });

            postDialog.addEventListener('close', () => {    
                console.log("closing");
                listEntries();
                // title.innerHTML = `Post title: ${items[prevLength].title}`;
                // date.innerHTML = `Post date: ${items[prevLength].date}`;
                // sum.innerHTML = `Post summary: ${items[prevLength].sum}`;
                entries.appendChild(clone);
            });
        }
        else { // template not supported
            postDialog.showModal();
        }
    });
}


window.addEventListener('DOMContentLoaded', loadHandler);
(function () {
    listEntries;
})