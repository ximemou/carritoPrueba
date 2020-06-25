
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoader', ready);
} else {
    ready();
}

function ready(){
    var removeCartItemButton= document.getElementsByClassName('btn-danger')
    for ( var i=0; i<removeCartItemButton.length;i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click',removeCartItem);
    } 
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for ( var i=0; i<quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    } 
    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for ( var i=0; i<addToCartButton.length;i++){
        var button = addToCartButton[i];
        button.addEventListener('click',addToCartClicked);
    } 
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);

}

function purchaseClicked(event){
    alert('Gracias por su compra!!!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while( cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if( isNaN(input.value) || input.value <= 0 ){
        input.value = 1;   
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target;
    //este es el shopdiv
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i=0; i< cartItemsNames.length ; i++){
        if(cartItemsNames[i].innerText == title){
            //si es igual ya lo habiamos agregado al carrito
            alert('Ya se agrego el item al carrito');
            // return no sigue ejecutando la funcion
            return
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);

}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for( var i=0; i<cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' +total;
}