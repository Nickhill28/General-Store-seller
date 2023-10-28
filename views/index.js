let form = document.getElementById("addItemForm");

form.addEventListener("submit", saveData);

// Function to save data in crudcrud
async function saveData(event) {
  event.preventDefault(); // Prevent the default form submission

  var itemName = document.getElementById("itemname").value;
  var description = document.getElementById("description").value;
  var price = parseFloat(document.getElementById("price").value);
  var quantity = parseInt(document.getElementById("quantity").value);

  var formData = {
    itemName: itemName,
    description: description,
    price: price,
    quantity: quantity,
  };

  try {
    // Send a POST request to your server to save the data
    const response = await axios.post(
      "http://localhost:4000/product/save",
      formData
    );

    console.log("Data saved successfully:", response.data.newProduct);

    document.getElementById("addItemForm").reset();

    display(response.data.newProduct);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

function display(obj) {
  let items = document.getElementById("items");
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent =
    obj.itemName +
    " " +
    obj.description +
    "  " +
    obj.price +
    "rs" +
    "  " +
    obj.quantity;

  let buyButton1 = document.createElement("button");
  buyButton1.textContent = "Buy One";
  buyButton1.className = "btn btn-primary button";
  buyButton1.addEventListener("click", function () {
    buyOne(obj.id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let buyButton2 = document.createElement("button");
  buyButton2.textContent = "Buy two";
  buyButton2.className = "btn btn-primary button";
  buyButton2.addEventListener("click", function () {
    buyTow(obj.id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let buyButton3 = document.createElement("button");
  buyButton3.textContent = "Buy three";
  buyButton3.className = "btn btn-primary button";
  buyButton3.addEventListener("click", function () {
    buyThree(obj.id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let updateButton = document.createElement("button");
  updateButton.textContent = "Update item";
  updateButton.className = "btn btn-primary button";
  updateButton.addEventListener("click", function () {
    updateItem(obj.id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let deleteItemButton = document.createElement("button");
  deleteItemButton.textContent = "Delete item";
  deleteItemButton.className = "btn btn-danger button";
  deleteItemButton.addEventListener("click", () => {
    var itemIdToDelete = obj.id;
    deleteItem(itemIdToDelete);
  });

  // Append the newly created 'li' element to the 'items' container
  li.appendChild(deleteItemButton);
  li.appendChild(updateButton);
  li.appendChild(buyButton3);
  li.appendChild(buyButton2);
  li.appendChild(buyButton1);

  items.appendChild(li);
}
async function deleteItem(itemId) {
  console.log("Deleting item with ID:", itemId);

  try {
    const response = await axios.delete(
      `http://localhost:4000/product/delete/${itemId}`
    );
    console.log("Deleted successfully:", response.data);
    window.location.reload();
  } catch (error) {
    console.log("Error deleting item:", error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:4000/product/fetch");

    // Clear any existing items
    document.getElementById("items").innerHTML = "";

    res.data.forEach((item) => {
      display(item);
    });
  } catch (err) {
    console.log(err);
  }
});

async function buyOne(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    return;
  }

  try {
    // Update the quantity using Axios
    const response = await axios.put(
      `http://localhost:4000/product/update/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 1,
      }
    );

    // Reload and display the updated items
    const itemsResponse = await axios.get(
      "http://localhost:4000/product/fetch"
    );
    const items = itemsResponse.data;

    // Clear any existing items
    document.getElementById("items").innerHTML = "";

    // Iterate over the retrieved data and display each item
    items.forEach((item) => {
      display(item);
    });
  } catch (error) {
    console.log(error);
  }
}

async function buyTow(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    // Quantity is already zero or negative, no further action needed
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:4000/product/update/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 2,
      }
    );

    const itemsResponse = await axios.get(
      "http://localhost:4000/product/fetch"
    );
    const items = itemsResponse.data;

    // Clear any existing items
    document.getElementById("items").innerHTML = "";

    // Iterate over the retrieved data and display each item
    items.forEach((item) => {
      display(item);
    });
  } catch (error) {
    console.log(error);
  }
}

async function buyThree(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:4000/product/update/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 3,
      }
    );

    const itemsResponse = await axios.get(
      "http://localhost:4000/product/fetch"
    );
    const items = itemsResponse.data;

    document.getElementById("items").innerHTML = "";

    // Iterate over the retrieved data and display each item
    items.forEach((item) => {
      display(item);
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateItem(id, itemName, description, price, quantity) {
  document.getElementById("itemname").value = itemName;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
  document.getElementById("quantity").value = quantity;

  form.removeEventListener("submit", saveData); // Remove the previous listener

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var updatedItemName = document.getElementById("itemname").value;
    var updatedDescription = document.getElementById("description").value;
    var updatedPrice = parseFloat(document.getElementById("price").value);
    var updatedQuantity = parseInt(document.getElementById("quantity").value);

    var updatedFormData = {
      itemName: updatedItemName,
      description: updatedDescription,
      price: updatedPrice,
      quantity: updatedQuantity,
    };

    try {
      // Send a PUT request to update the data
      const response = await axios.put(
        `http://localhost:4000/product/update/${id}`,
        updatedFormData
      );

      console.log("Data updated successfully:", response.data);

      document.getElementById("addItemForm").reset();

      window.location.reload();

      // Reattach the original form submit listener
      form.removeEventListener("submit", arguments.callee);
      form.addEventListener("submit", saveData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  });
}
