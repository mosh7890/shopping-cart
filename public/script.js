// an array with all of our cart items
var cart = [];
var total = 0;

var addItem = function (item) {
  var temp = $(item).closest('.item');
  var newItem = {
    name: temp.data().name,
    price: temp.data().price
  }
  cart.push(newItem);
  total += newItem.price;
}

var deleteItem = function (item) {
  var temp = $(item).closest('.itemIn');
  var num = $(temp).data().price;
  cart.splice(temp.index(), 1);
  total -= num;
}

var updateCart = function () {
  $('.cart-list').empty();
  $.get('new-item.hbs', function (source) {
    var template = Handlebars.compile(source);
    var newHTML = template(cart);
    $('.cart-list').append(newHTML);
  }, 'html');
  $('.total').html(total);
}

var clearCart = function () {
  cart = [];
  total = 0;
}

$('.view-cart').on('click', function () {
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  addItem($(this));
  updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
  updateCart();
});

$('.cart-list').on('click', '.remove-from-cart', function () {
  deleteItem(this);
  updateCart();
});

updateCart();
