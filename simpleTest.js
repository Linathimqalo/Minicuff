if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

//Button function of the purchase button and the alert that displays and clears the cart once done
function purchaseClicked() {
    alert(`Thank you for your purchase.`)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

//Removing the item from the cart
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//Function to change the quantity of the items chosen
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//Button function to add to cart 
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

//The add to cart function to allow it to be updated to the cart form
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//delivery select option
$("#shippingmethod").change(function() {
    // Get the value from dropdown
    var shippingPrice = $(this).val()
    // Get the value from id="shippingqty" td content
    var shippingQty = $("#shippingqty").html();
  
    // strings to floats, multiply, round to 2 decimals
    var shippingTotal = (parseFloat(shippingPrice) * parseFloat(shippingQty)).toFixed(2);
    // strings to float, add, round to 2 decimals
    var grandTotal = (parseFloat(shippingTotal) + parseFloat(shippingPrice)).toFixed(2);
  
    // Set id="shippingprice" td content
    $("#shippingprice").html("R" + shippingPrice);
    // set id='grandtotal" td content
    $("#grandtotal").html("R" + grandTotal);
  });

  //generate reference number
  (function() {
    function IDGenerator() {
    
        this.length = 8;
        this.timestamp = +new Date;
        
        var _getRandomInt = function( min, max ) {
           return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        
        this.generate = function() {
            var ts = this.timestamp.toString();
            var parts = ts.split( "" ).reverse();
            var id = "";
            
            for( var i = 0; i < this.length; ++i ) {
               var index = _getRandomInt( 0, parts.length - 1 );
               id += parts[index];	 
            }
            return id;
        }
    }
    document.addEventListener( "DOMContentLoaded", function() {
       var btn = document.querySelector( "#generate" ),
           output = document.querySelector( "#output" );
           
       btn.addEventListener( "click", function() {
           var generator = new IDGenerator();
           output.innerHTML = generator.generate();
       }, false); 
    });
})();

//The will run when the purchase button is clicked, displaying the calculated amounts and items selected
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('R', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    
    let vat = (total * 15) / 100;
    total = Math.round((total * 100) / 100) + vat;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + total + '.00';
    document.getElementsByClassName('cart-total-vat-price')[0].innerText = 'R' + vat + '.00';
    document.getElementsByClassName('cart-total-ship-price')[0].innerText = 'R' + grandTotal + '.00';
}


//accordion function for the dropdown menu
var acc = document.getElementsByClassName("accordion");
        var i;
        
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
            });
        }

        //The coupon which will validate whether the coupon is valid or not
function validate(coupon) { 
    codes = new Object();
    codes.GOLD20 = 20;
    codes.GOLD = 30;
    codes.GOLD40 = 40;
    codes.GOLD50 = 50;
    
    if (codes[coupon]) 
        { 
        window.alert("Coupon Code Accepted! Click the Order button!"); 
        } 
    else 
        { 
        window.alert("Sorry, The Coupon Code you entered is invalid. Please check and try again!"); 
        } 
    } 

    //The header color change.
$(document).ready(function() {
    setInterval(changecolors, 4000);

var counter = 0;
function changecolors() { //Changing the background color of the body 
        var colors = ["blue", "red", "green", "pink", "black", "purple", "brown", "orange"];
        
        if (counter < colors.length) {
            $("header").css("background-color", colors[counter], 1000);
            console.log("Counter: " + counter + " Colors Length: " + colors.length + " Colors: " + colors);
            counter++;
        } else {
            counter = 0;
        }
        console.log(colors.length);
    }
    changecolors();
});