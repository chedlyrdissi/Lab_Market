
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices( order ) {
	
	console.log(order);

    var s1 = document.getElementById('dietSelect');
    var s2 = document.getElementById('displayProduct');
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, s1.value);

    if ( order !== undefined ) {
	    sortArrayByAttribute( "price", optionArray, order == "0"? false: true );
    }

    quantityMap = [];
    for ( const o of optionArray ) {
    	quantityMap[o.name] = 0;
    }
	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
	for (let p of optionArray ) {
		injectProduct(s2, p);		    
	}
	
}

function injectProduct( destination, product, showInput = true ) {

	let div = document.createElement("div");
	div.setAttribute("class", "row");
	div.setAttribute("name", "product");
	div.setAttribute("value", product.name);
	
	let img = document.createElement("img");
	img.src = product.imageSrc;
	img.alt = product.name;
	div.appendChild(img);

	let div2 = document.createElement("div");
	div2.setAttribute("class", "col");

	// create a label for the checkbox, and also add in HTML DOM
	let label = document.createElement('label')
	label.htmlFor = product.name;
	label.setAttribute("class", "product-name");
	label.appendChild(document.createTextNode(product.name));
	div2.appendChild(label);

	let price = document.createElement('label');
	price.innerHTML = "Price: " + product.price + "$";
	div2.appendChild(price);	

	div.appendChild(div2);

	if ( showInput ) {
		let qtt = document.createElement('input');	
		qtt.type = "number";
		qtt.min = 0;
		qtt.value = quantityMap[product.name];
		qtt.name = "quantity";
		qtt.setAttribute("class", "quantity");
		div.appendChild(qtt);
	} else {
		let lb = document.createElement('label');
		lb.innerHTML = "Quantity: " + quantityMap[product.name];
		div.appendChild(lb);
	}

	if ( product.organic ) {
		let organic = document.createElement("img");
		organic.src = organicFoodIcon;
		organic.alt = "organic";
		organic.setAttribute("class","icon");
		div.appendChild(organic);
	}

	destination.appendChild(div);
}

function getProductByName( name ) {
	for ( let p of products ) {
		if ( p.name === name ) {
			return p;
		}
	}
	return null;
}

	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// get items and order them
	for (i = 0; i < ele.length; i++) {
		if (ele[i].childNodes[2].value > 0) {
			quantityMap[ele[i].getAttribute("value")] = ele[i].childNodes[2].value;
			chosenProducts.push( getProductByName(ele[i].getAttribute("value")) );
		}
	}
	// sort
	sortArrayByAttribute( "price", chosenProducts );

	// show the items
	// build list of selected item
	var div = document.createElement("div");
	div.innerHTML = "You selected : ";
	div.appendChild(document.createElement("br"));
	for (i = 0; i < chosenProducts.length; i++) { 
		injectProduct(div, chosenProducts[i], false);
		div.appendChild(document.createElement("br"));
	}
	console.log(quantityMap);
	// add paragraph and total price
	c.appendChild(div);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}

function updateOnly( elem ,checked ){
	if (elem == 'organic') {
		organicOnly = checked;
	} else if ( elem == 'lactose') {
		lactoseIntolerentOnly = checked;
	}
	populateListProductChoices();
}

function sortArrayByAttribute( attribute, products, ascending = true ) {
	products.sort(function(a,b) {
		if ( a[attribute] === b[attribute] ) {
			return 0;
		} else if ( a[attribute] > b[attribute] ) {
			return 1;
		} else {
			return -1;
		}
	});
	if (!ascending) products.reverse();
}
