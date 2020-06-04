	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "brocoli",
		imageSrc: "https://www.fermebedardblouin.com/wp-content/uploads/2020/05/brocoli.jpg",
		vegetarian: true,
		glutenFree: true,
		lactoseIntolerent: true,
		organic: true,
		category: [
			"other", "organic", "vegetables", "glutenFree", "vegetarian", "lactose"
		],
		price: 1.99
	},
	{
		name: "bread",
		imageSrc: "https://butterwithasideofbread.com/wp-content/uploads/2019/07/White-Bread_10.bsb_.jpg",
		vegetarian: true,
		glutenFree: false,
		lactoseIntolerent: true,
		category: [
			"other", "vegetarian", "lactose"
		],
		price: 2.35
	},
	{
		name: "salmon",
		imageSrc: "https://static01.nyt.com/images/2016/04/13/dining/13PAIRING/13PAIRING-articleLarge.jpg",
		vegetarian: false,
		glutenFree: true,
		lactoseIntolerent: true,
		category: [
			"other", "sea food", "lactose", "glutenFree"
		],
		price: 10.05
	},
	{
		name: "eggs",
		imageSrc: "https://i5.walmartimages.com/asr/8c9b9170-0c7f-40f2-a366-740d6edfe308_1.ccc95ee672954b6f801ba94fde24bb10.png?odnWidth=612&odnHeight=612&odnBg=ffffff",
		vegetarian: true,
		glutenFree: true,
		lactoseIntolerent: true,
		category: [
			"other", "vegetarian", "glutenFree", "lactose"
		],
		price: 6.00
	},
	{
		name: "cheese",
		imageSrc: "https://3ner1e34iilsjdn1qohanunu-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/BeemsterGouda_ftr.jpg",
		vegetarian: true,
		glutenFree: true,
		lactoseIntolerent: false,
		category: [
			"other", "glutenFree", "vegetarian", "dairy"
		],
		price: 5.35
	},
	{
		name: "chicken nuggets",
		imageSrc: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/9/12/1/FN_Picky-Eaters-Chicken-Nuggets_s4x3.jpg.rend.hgtvcom.826.620.suffix/1383770571120.jpeg",
		vegetarian: false,
		glutenFree: false,
		lactoseIntolerent: true,
		category: [
			"other", "lactose"
		],
		price: 18.99
	},
	{
		name: "milk",
		imageSrc: "data:image/jpeg;base64,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",
		vegetarian: true,
		glutenFree: true,
		lactoseIntolerent: false,
		category: [
			"other", "vegetarian", "dairy", "glutenFree"
		],
		price: 4.25
	},
	{
		name: "cucumber",
		imageSrc: "https://i.ndtvimg.com/mt/cooks/2014-11/cucumber.jpg",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		lactoseIntolerent: true,
		category: [
			"other", "vegetarian", "glutenFree", "lactose", "organic", "vegetables"
		],
		price: 2.12
	},
	{
		name: "tomato",
		imageSrc: "data:image/jpeg;base64,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",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		lactoseIntolerent: true,
		category: [
			"other", "vegetarian", "organic", "lactose", "fruits", "vegetables"
		],
		price: 5.00
	},
	{
		name: "lettuce",
		imageSrc: "data:image/jpeg;base64,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",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		lactoseIntolerent: true,
		category: [
			"other", "vegetarian", "glutenFree", "organic", "lactose", "vegetables", "lactose"
		],
		price: 3.19
	},
];
	
var organicFoodIcon = "https://itsjillicious.com/wp-content/uploads/2014/07/organic.jpeg";

var choiceMap = {
	"vegetarian": false,
	"glutenFree": false,
	"organic": false,
	"lactose": false
}

var quantityMap = {};
var chosenProducts = [];
var cat = [];
var catMsg;

var prefMap = {
	"vegetarian" : "only products for vegetarians",
	"glutenFree" : "only gluten free products",
	"organic" : "only organic products",
	"lactose" : "only products for lactose intolerent customers",
	"fruits" : "fruits",
	"vegetables" : "vegetables",
	"dairy" : "Dairy products",
	"sea food" : "Sea food",
	"other" : "All products"
}
// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts() {
	let list = products.slice();

	const activeAcc = getActiveAccordion();

	if (activeAcc == "Categories") {
		let categoryChosen;
		for ( let categor of document.getElementsByName("categorySearch")) {
			if (categor.checked) {
				categoryChosen = categor.value;
				break;
			}
		}

		list = list.filter( function( item ) {
			return item.category.indexOf(categoryChosen) > -1;
		});

	} else if (activeAcc == "Preferences") {

		for ( let pref of document.getElementsByName("preferenceSearch") ) {
			if ( pref.checked ) {
				list = list.filter( function( item ) {
					return item.category.indexOf(pref.value) > -1;
				});
			}
		}

	} else if (activeAcc == "Advanced search") {
		if (document.getElementById("advancedSearchInput").type == "number") {
			list = list.filter( function(item) {
				return item.price == document.getElementById("advancedSearchInput").value;
			});
		} else if (document.getElementById("advancedSearchInput").type == "text") {
			list = list.filter( function(item) {
				return item.name == document.getElementById("advancedSearchInput").value;
			});
		}
	}

	for ( const restriction in choiceMap ) {
		if ( choiceMap[restriction] ) {
			list = applyFilter(restriction, list);
		}
	}
	return list;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice() {
	totalPrice = 0;
	for (let prod in quantityMap) {
		totalPrice += getProductByName(prod).price * quantityMap[prod];
	}
	return totalPrice;
}

function applyFilter( attribute, list, pass ) {
	return list.filter(function( item ){
		return item[attribute];
	});
}

function advancedSearchClicked( newType ) {
	document.getElementById("advancedSearchInput").value = "";
	document.getElementById("advancedSearchInput").type = newType;
}

function orderProducts( order ) {
	if ( order !== undefined ) {
    	const ord = JSON.parse(order);
	    sortArrayByAttribute( ord.sort, optionArray, ord.ascending );
    }
}