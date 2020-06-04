
var routes = [
	"Home",
	"Search",
	"Category",
	"Cart"
]

function navigate( destination, categ = false, msg ) {
	for( const route of routes ) {
		document.getElementById(route).style.display = "none";
	}
	if ( categ ) {
		let elem = document.getElementById("cat");
		msg = msg === undefined ? getCatString(): msg;
		if (elem.length) {
			for ( const ele in elem ) {
				ele.innerHTML = msg;	
			}
		} else {
			elem.innerHTML = msg;
		}
	} else {
		catmsg = undefined;
	}
	if (destination == "Category") {
		populateListProductChoices( '{"sort": "price", "ascending": true}' );
	}
	document.getElementById(destination).style.display = "block";
}

function search() {
	let chosenSearch = [];
	for (let accordion of acc) {
		if (accordion.classList.contains("active")) {
			chosenSearch.push(accordion);
		}
	}

	if ( chosenSearch.length === 0 ) {
		alert("Please select a search method");
	} else if ( chosenSearch.length === 1 ) {
		// correct flow
		let choice = chosenSearch[0].name;
		if (choice == "Advanced search") {
			if (document.getElementById("advancedSearchInput").value == "") {
				alert("please input the " + (document.getElementById("advancedSearchInput").type == "text" ? "name": "price") + " of the product you are looking for");
			} else {
				let msg = "";
				if (document.getElementById("advancedSearchInput").type == "number") {
					msg += "Products for " + document.getElementById("advancedSearchInput").value + "$" ;
				} else if (document.getElementById("advancedSearchInput").type == "text") {
					msg += document.getElementById("advancedSearchInput").value;
				}
				catmsg = msg;
				navigate( "Category", true );
			}
		} else if (choice == "Preferences") {
			cat = [];
			for ( let pref of document.getElementsByName("preferenceSearch") ) {
				if ( pref.checked ) {
					cat.push(pref.value);
				}
			}
			if (cat.length === 0) {
				alert("Please select at least one product preference");
			} else {
				catmsg = getCatString();
				navigate("Category", true);
			}
		} else if (choice == "Categories") {
			cat = [];
			for ( let categor of document.getElementsByName("categorySearch")) {
				if (categor.checked) {
					cat.push(categor.value);
				}
			}
			navigate("Category", true);
		}
	} else {
		alert("An error has occured please select again");
		clearAccordions();
	}
}

function getCatString() {
	let result = "";
	for ( let c of cat ) {
		result += prefMap[c] + " + ";
	}
	return result.length === 0 ? "" : result.slice(0, result.length - 3);
}

function getCurrentCategory() {
	return cat;
}
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices( order ) {	
    var s2 = document.getElementById('displayProduct');
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts();

    if ( order !== undefined ) {
    	const ord = JSON.parse(order);
	    sortArrayByAttribute( ord.sort, optionArray, ord.ascending );
    }

    quantityMap = [];
    for ( const o of optionArray ) {
    	quantityMap[o.name] = 0;
    }

	for (let p of optionArray ) {
		injectProduct(s2, p);		    
	}
}

function injectProduct( destination, product, showInput = false ) {

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
		let add = document.createElement('input');
		add.type = "checkbox";
		add.name = "product";
		add.value = product.name;
		add.style.marginTop = "20px"
		add.checked = chosenProducts.indexOf(product) > 0;
		div.appendChild(add);
	}
	// else {
	// 	let lb = document.createElement('label');
	// 	lb.innerHTML = "Quantity: " + quantityMap[product.name];
	// 	div.appendChild(lb);
	// }

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
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// get items and order them
	// for (i = 0; i < ele.length; i++) {
	// 	if (ele[i].childNodes[2].value > 0) {
	// 		quantityMap[ele[i].getAttribute("value")] = ele[i].childNodes[2].value;
	// 		chosenProducts.push( getProductByName(ele[i].getAttribute("value")) );
	// 	}
	// }

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

function update( elem ,checked ){
	choiceMap[elem] = checked;
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