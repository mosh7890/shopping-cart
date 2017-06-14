var cart = [];

var addItem = function (item) {
  var temp = $(item).closest('.item');

  var check = false;
  for (i = 0; i < cart.length; i++) {
    if (cart[i].name === temp.data().name) {
      check = true;
      cart[i].quantity++;
      if (cart[i].quantity > 1) {
        cart[i].displayQuantity = true;
      }
      break;
    }
  }
  if (!check) {
    var newItem = {
      name: temp.data().name,
      price: temp.data().price,
      quantity: 1,
      displayQuantity: false
    }
    cart.push(newItem);
  }
}

var deleteItem = function (item) {
  var temp = $(item).closest('.itemIn');
  var hold = temp.index();

  cart[hold].quantity--;

  if (cart[hold].quantity === 0) {
    cart.splice(hold, 1);
  }
  else if (cart[hold].quantity === 1) {
    cart[hold].displayQuantity = false;
  }
}

var updateCart = function () {
  $('.cart-list').empty();
  $.get('new-item.hbs', function (source) {
    var template = Handlebars.compile(source);
    var newHTML = template(cart);
    $('.cart-list').append(newHTML);
  }, 'html');

  var total = 0;
  for (i = 0; i < cart.length; i++) {
    total += (cart[i].price * cart[i].quantity);
  }
  $('.total').html(total);
}

var clearCart = function () {
  cart = [];
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
