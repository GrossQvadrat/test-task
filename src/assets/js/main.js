// Шаблон списка товаров
var productList = function(img, title, price){
    return '<div class="product_list_item">'+
                    '<img class="item_img" src="./assets/images/'+ img + '" alt="'+ title +'">'+
                    '<div class="item_description">'+
                        '<div class="item_title">'+ title +'</div>'+
                        '<span class="product_item_price">'+ price +' руб.</span>'+
                    '</div>'+
                    '<div class="item_buttons">'+
                        '<a class="product_list_button order_button">Закозать</a>'+
                        '<a class="product_list_button shopping_cart_button">В корзину</a>'+
                    '</div>'+
                '</div>';
}
// Шаблон попапа добавления в корзину
var popup = function(img, title, price){
    return '<div class="popup_cart">'+
                '<div class="popup_head">'+
                    '<span class="popup_head_title">Вы добавили товар в корзину</span>'+
                '</div>'+
                '<div class="popup_body">'+
                    '<img class="popup_item_img" src="./assets/images/'+ img + '" alt="'+ title +'">'+
                    '<div class="item_description">'+
                        '<div class="item_title">'+ title +'</div>'+
                        '<span class="popup_item_price">'+ price +' руб.</span>'+
                    '</div>'+
                    '<span class="popup_close_button"></span>'+
                '</div>'+
                '<div class="popup_buttons">'+
                    '<a class="popup_cart_button">Перейти в корзину</a>'+
                '</div>'+
            '</div>';
}
// Шаблон оформления заказа
var orderPopup = function(img, title, price){
    return '<div class="order">'+
                '<form class="order_popup" action="/">'+
                    '<div class="order_popup_head">'+
                        '<span class="order_popup_title">'+ title +'</span>'+
                        '<span class="order_popup_close_button"></span>'+
                    '</div>'+
                    '<div class="order_popup_body">'+
                        '<div class="order_popup_body_left">'+
                            '<img src="./assets/images/'+ img + '" alt="'+ title +'" class="order_popup_img">'+
                            '<span class="order_popup_price">'+ price +' руб.</span>'+
                        '</div>'+
                        '<div class="order_popup_body_right">'+
                            '<label class="order_popup_body_text" for="comments">Комментарий к заказу:</label>'+
                            '<textarea class="order_popup_body_textarea" name="comments" id="comments" maxlength="300" cols="30" rows="10"></textarea>'+
                        '</div>'+
                    '</div>'+
                    '<div class="order_popup_footer">'+
                        '<div class="order_popup_number">'+
                            '<label for="order_number">Ваш телефон *:</label>'+
                            '<input class="order_number" id="order_number" type="tel" required>'+
                        '</div>'+
                        '<button class="order_submit" type="submit">Отправить</button>'+
                    '</div>'+
                '</form>'+
            '</div>';
}
// получение товаров
var db = API.products;
// Удаленние попапа корзины
var closePopup = function(t){
    document.querySelector('.popup_close_button').addEventListener('click', function(){
        document.querySelector('.popup_cart').remove();
        clearTimeout(t);
    });
};
// удаленние попапа заказа
var closeOrderPopup = function(){
    document.querySelector('.order_popup').parentNode.addEventListener('click', function(e){
        if (e.target === document.querySelector('.order')) {
            document.querySelector('.order').remove();
        };
    });
    document.querySelector('.order_popup_close_button').addEventListener('click', function(){
        document.querySelector('.order').remove();
    });
};
// вывод товаров
var addProductList = function(){
    var container = document.querySelector('#main');
    var productDiv = document.createElement('div');
    productDiv.classList.add('product_list');
    container.appendChild(productDiv);
    db.forEach(function(x, i){
        productDiv.insertAdjacentHTML('beforeend', productList(x.img, x.title, x.price));
        productDiv.querySelectorAll('.order_button')[i].addEventListener('click', function(){
            document.body.insertAdjacentHTML('beforeend', orderPopup(x.img, x.title, x.price));
            closeOrderPopup();
        });
        productDiv.querySelectorAll('.shopping_cart_button')[i].addEventListener('click', function(){
            var elPopup = document.querySelector('.popup_cart'),
                timer = setTimeout(function(){document.querySelector('.popup_cart').remove()}, 5000);
            if (!elPopup) {
                document.body.insertAdjacentHTML('beforeend', popup(x.img, x.title, x.price));
                closePopup(timer);
                timer;
            } else {
                document.querySelector('.popup_cart').remove();
                clearTimeout(timer);
                document.body.insertAdjacentHTML('beforeend', popup(x.img, x.title, x.price));
                closePopup(timer);
                timer;
            };
        });
    });
};
addProductList();