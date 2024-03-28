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
let deleteAllBtn = document.getElementById("deleteAll");
let tableBody = document.getElementById("tableBody"); // Added reference to table body element
 let mood = 'create'; 
 let tmp ; 
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

add.onclick = function create() {
    // Check if any of the input fields are empty
    if (!productName.value || !price.value || !productCategory.value || parseInt(productCount.value) > 100 ) {
        // Create error message alert
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger', 'mt-3', 'd-flex', 'justify-content-between', 'align-items-center');
        
        // Error message text
        if (!productName.value || !price.value || !productCategory.value) {
            errorMessage.innerHTML = 'Please Enter All Product Data';
        } else if ( parseInt(productCount.value) > 100 ) {
            errorMessage.innerHTML = 'Please Enter a Number Between 1 and 100 for Product Count';
        }

        // Get the parent container of the button
        let parentContainer = add.parentNode;

        // Insert error message before the parent container
        parentContainer.parentNode.insertBefore(errorMessage, parentContainer);

        // Add event listeners to input fields to hide the error message when typing
        productName.addEventListener('input', hideErrorMessage);
        price.addEventListener('input', hideErrorMessage);
        productCategory.addEventListener('input', hideErrorMessage);
        productCount.addEventListener('input', hideErrorMessage);

        // Exit the function since inputs are empty or invalid
        return;
    }

    // If inputs are not empty and count is valid, continue with creating the product
    let newProduct = {
        name: productName.value,
        price: price.value,
        taxes: taxes.value,
        ADS: ADS.value,
        disscount: disscount.value,
        total: total.innerHTML,
        productCategory: productCategory.value,
        productCount: productCount.value,
    };

    // Retrieve count from the input field
    let count = parseInt(productCount.value);

    // Add the new product(s) to the dataProduct array based on the count
    if (mood === 'create') {
        if (count > 1) {
            for (let i = 0; i < count; i++) {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct.push(newProduct);
        }
    } else {
        dataProduct[tmp] = newProduct;
        mood = 'create';
        add.innerHTML = 'add product';
        document.getElementById("count").style.display = "block";
    }

    localStorage.setItem("products", JSON.stringify(dataProduct));
    clearData();
    displayData();
};




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
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-success font-weight-bolder" id="upd">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger font-weight-bolder" id="del">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = table ; // Update table body content

    if (dataProduct.length > 0){
        deleteAllBtn.innerHTML = `
        <button onclick="DeleteAll()" class="btn btn-outline-danger text-light font-weight-bolder mb-3 w-50">
            Delete all items (${dataProduct.length})
        </button>
    `;
        }else {
        deleteAllBtn.innerHTML = " ";
    }
    getTotal();

}
displayData();
//delete data 
function deleteProduct(i){
dataProduct.splice(i , 1);
localStorage.products = JSON.stringify(dataProduct);
displayData();
}
//deleteAll 
function DeleteAll() {
   // Clear localStorage
   localStorage.removeItem("products");
    
   // Empty the dataProduct array
   dataProduct = [];
   
   // Display the updated data
   displayData();
}
// updateProduct 
function updateProduct(i){
    productName.value = dataProduct[i].name;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ADS.value = dataProduct[i].ADS;
    disscount.value = dataProduct[i].disscount;
    productCategory.value = dataProduct[i].productCategory; // Fix: Changed .name to .productCategory
    document.getElementById("count").style.display="none";
    add.innerHTML = "update";
    mood = 'update';
    tmp = i ; 
    scroll({
        top: 0 ,
        behavior:"smooth"
    });
    getTotal(); // Call getTotal to update total value based on the updated product values

}
//search 
// Function to filter products based on search query
function search() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let filteredProducts = dataProduct.filter(product => {
        return product.name.toLowerCase().includes(searchInput) || product.productCategory.toLowerCase().includes(searchInput);
    });
    displayFilteredData(filteredProducts);
    
    
}

// Function to display filtered product data
function displayFilteredData(filteredProducts) {
    let table = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        table += `<tr>
            <td>${i}</td>
            <td>${filteredProducts[i].name}</td>
            <td>${filteredProducts[i].price}</td>
            <td>${filteredProducts[i].taxes}</td>
            <td>${filteredProducts[i].ADS}</td>
            <td>${filteredProducts[i].disscount}</td>
            <td>${filteredProducts[i].total}</td>
            <td>${filteredProducts[i].productCategory}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-success font-weight-bolder" id="upd">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger font-weight-bolder" id="del">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = table;
}

// Event listener for search input changes
document.getElementById("searchInput").addEventListener("input", filterProducts);
