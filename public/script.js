// an array with all of our cart items
var cart = [];
var total = 0;

var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $('.cart-list').empty();
  var source = $('#new-item').html();
  var template = Handlebars.compile(source);
  var newHtml = template(cart);
  $('.cart-list').append(newHtml);
  $('.total').html(total);
}


var addItem = function (item) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
  var temp = item.closest('.item')
  var newItem = {
    name: temp.data().name,
    price: temp.data().price
  }
  total += newItem.price;
  cart.push(newItem);
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  cart = [];
  total = 0;
  $('.total').html(total);
  updateCart();
}

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  addItem($(this));
  updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
updateCart();
