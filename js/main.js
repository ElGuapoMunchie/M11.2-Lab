window.onload = loadData;

// Load the data using GET
function loadData() {
    let lambda = document.getElementById("itemsInTable");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        lambda.innerHTML = ""   // make sure there aren't any duplicates
        const items = JSON.parse(xhr.response); // parse the item

        items.forEach(item => {
            var row = lambda.insertRow();
            var id = row.insertCell(0);
            var name = row.insertCell(1);
            var price = row.insertCell(2)
            var action = row.insertCell(3);

            id.innerText = item.id;
            name.innerText = item.name;
            price.innerText = item.price;

            // Create the DELETE button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteItem(item.id);    // Delete the specified item
            };
            action.appendChild(deleteButton);
        });
    });

    xhr.open("GET", "https://5zol9aa2td.execute-api.us-east-2.amazonaws.com/items");
    xhr.send;
}

// Delete the item using DELETE
function deleteItem(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://5zol9aa2td.execute-api.us-east-2.amazonaws.com/items" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

// Add the item using PUT
function addItem() {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://5zol9aa2td.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");

    var id = document.getElementById("id");
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var check = document.getElementById("check");

    // Check that input fields are valid (i.e. not NULL or empty)
    if (id.value != "" && id.name != "" && id.price != "") {

        xhr.send(JSON.stringify({
            "id": id.value,
            "price": price.value,
            "name": name.value
        }));

        check.textContent = "Added Item"; // Tell user item was added
        loadData(); // Refresh the table (because why hit load unless we have to)
    } else {
        check.textContent = "Cannot have empty fields. Ensure all items have a name, price, and id."
    }

}