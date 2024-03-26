// Retrieving elements
let productName = document.getElementById("productName");
let price = document.getElementById("Price");
let taxes = document.getElementById("Taxes");
let ADS = document.getElementById("ADS");
let disscount = document.getElementById("Disscount");
let total = document.getElementById("total");
let productCategory = document.getElementById("productCategory");
let productCount = document.getElementById("productCount");
let add = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");
let tableBody = document.getElementById("tableBody"); // Added reference to table body element

// Function to calculate total
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ADS.value) - +disscount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.innerHTML = " ";
        total.style.background = "red";
    }
}

// Retrieving or initializing product data from localStorage
let dataProduct;
if (localStorage.products != null) {
    dataProduct = JSON.parse(localStorage.products);
} else {
    dataProduct = [];
}

// Function to add a new product
add.onclick = function create() {
    // Check if any of the input fields are empty
    if (!productName.value || !price.value ) {
        // Create error message alert
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger', 'mt-3', 'd-flex', 'justify-content-between', 'align-items-center');
        
        // Error message text
        errorMessage.innerHTML = 'Please Enter Product Data';

        // Insert error message before the button
        add.parentNode.insertBefore(errorMessage, add);

        // Add event listeners to input fields to hide the error message when typing
        productName.addEventListener('input', hideErrorMessage);
        price.addEventListener('input', hideErrorMessage);
        taxes.addEventListener('input', hideErrorMessage);
        ADS.addEventListener('input', hideErrorMessage);
        disscount.addEventListener('input', hideErrorMessage);

        // Exit the function since inputs are empty
        return;
    }

    // If inputs are not empty, continue with creating the product
    let newProduct = {
        name: productName.value,
        price: price.value,
        taxes: taxes.value,
        ADS: ADS.value,
        disscount: disscount.value,
        total: total.innerHTML,
        productCategory: productCategory.value,
        productCount: productCount.value,
    }
    dataProduct.push(newProduct);
    localStorage.setItem("products", JSON.stringify(dataProduct));
    clearData();
    displayData();
}

function hideErrorMessage() {
    let errorMessage = document.querySelector('.alert-danger');
    if (errorMessage) {
        errorMessage.remove();
    }
}



// Function to clear the form
function clearData() {
    productName.value = '';
    price.value = '';
    taxes.value = '';
    ADS.value = '';
    disscount.value = '';
    total.innerHTML = '';
    productCategory.value = '';
    productCount.value = '';
}

// Function to display product data
function displayData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
    
        table += `<tr>
            <td>${i}</td>
            <td>${dataProduct[i].name}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ADS}</td>
            <td>${dataProduct[i].disscount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].productCategory}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-primary font-weight-bolder" id="upd">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger font-weight-bolder" id="del">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = table ; // Update table body content
}
displayData();
//delete data 
function deleteProduct(i){
dataProduct.splice(i , 1);
localStorage.products = JSON.stringify(dataProduct);
displayData();
}