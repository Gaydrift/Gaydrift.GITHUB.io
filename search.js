filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveGood(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddGood(x[i], "show");
  }
}

function AddGood(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function RemoveGood(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/*var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}*/

const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
});

/* */


            // Утилиты
            
            function toNum(str) {
              const num = Number(str.replace(/ /g, ""));
              return num;
            }
            
            function toCurrency(num) {
              const format = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              }).format(num);
              return format;
            }
            
            // Корзина
            
            const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
            const cartNum = document.querySelector("#cart_num");
            const cart = document.querySelector("#cart");
            
            class Cart {
              products;
              constructor() {
                this.products = [];
              }
              get count() {
                return this.products.length;
              }
              addProduct(product) {
                this.products.push(product);
              }
              removeProduct(index) {
                this.products.splice(index, 1);
              }
              get cost() {
                const prices = this.products.map((product) => {
                  return toNum(product.price);
                });
                const sum = prices.reduce((acc, num) => {
                  return acc + num;
                }, 0);
                return sum;
              }
              get costDiscount() {
                const prices = this.products.map((product) => {
                  return toNum(product.priceDiscount);
                });
                const sum = prices.reduce((acc, num) => {
                  return acc + num;
                }, 0);
                return sum;
              }
              get discount() {
                return this.cost - this.costDiscount;
              }
            }
            
            class Product {
              imageSrc;
              name;
              price;
              priceDiscount;
              constructor(card) {
                this.imageSrc = card.querySelector(".card__image").children[0].src;
                this.name = card.querySelector(".card__title").innerText;
                this.price = card.querySelector(".card__price--common").innerText;
                this.priceDiscount = card.querySelector(".card__price--discount").innerText;
              }
            }
            
            const myCart = new Cart();
            
            if (localStorage.getItem("cart") == null) {
              localStorage.setItem("cart", JSON.stringify(myCart));
            }
            
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            myCart.products = savedCart.products;
            cartNum.textContent = myCart.count;
            
            myCart.products = cardAddArr.forEach((cardAdd) => {
              cardAdd.addEventListener("click", (e) => {
                e.preventDefault();
                const card = e.target.closest(".card");
                const product = new Product(card);
                const savedCart = JSON.parse(localStorage.getItem("cart"));
                myCart.products = savedCart.products;
                myCart.addProduct(product);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
              });
            });
            
            // Попап
            
            const popup = document.querySelector(".popup");
            const popupClose = document.querySelector("#popup_close");
            const body = document.body;
            const popupContainer = document.querySelector("#popup_container");
            const popupProductList = document.querySelector("#popup_product_list");
            const popupCost = document.querySelector("#popup_cost");
            const popupDiscount = document.querySelector("#popup_discount");
            const popupCostDiscount = document.querySelector("#popup_cost_discount");
            
            cart.addEventListener("click", (e) => {
              e.preventDefault();
              popup.classList.add("popup--open");
              body.classList.add("lock");
              popupContainerFill();
            });
            
            function popupContainerFill() {
              popupProductList.innerHTML = null;
              const savedCart = JSON.parse(localStorage.getItem("cart"));
              myCart.products = savedCart.products;
              const productsHTML = myCart.products.map((product) => {
                const productItem = document.createElement("div");
                productItem.classList.add("popup__product");
            
                const productWrap1 = document.createElement("div");
                productWrap1.classList.add("popup__product-wrap");
                const productWrap2 = document.createElement("div");
                productWrap2.classList.add("popup__product-wrap");
            
                const productImage = document.createElement("img");
                productImage.classList.add("popup__product-image");
                productImage.setAttribute("src", product.imageSrc);
            
                const productTitle = document.createElement("h2");
                productTitle.classList.add("popup__product-title");
                productTitle.innerHTML = product.name;
            
                const productPrice = document.createElement("div");
                productPrice.classList.add("popup__product-price");
                productPrice.innerHTML = toCurrency(toNum(product.priceDiscount));
            
                const productDelete = document.createElement("button");
                productDelete.classList.add("popup__product-delete");
                productDelete.innerHTML = "&#10006;";
            
                productDelete.addEventListener("click", () => {
                  myCart.removeProduct(product);
                  localStorage.setItem("cart", JSON.stringify(myCart));
                  popupContainerFill();
                });
            
                productWrap1.appendChild(productImage);
                productWrap1.appendChild(productTitle);
                productWrap2.appendChild(productPrice);
                productWrap2.appendChild(productDelete);
                productItem.appendChild(productWrap1);
                productItem.appendChild(productWrap2);
            
                return productItem;
              });
            
              productsHTML.forEach((productHTML) => {
                popupProductList.appendChild(productHTML);
              });
            
              popupCost.value = toCurrency(myCart.cost);
              popupDiscount.value = toCurrency(myCart.discount);
              popupCostDiscount.value = toCurrency(myCart.costDiscount);
            }
            
            popupClose.addEventListener("click", (e) => {
              e.preventDefault();
              popup.classList.remove("popup--open");
              body.classList.remove("lock");
            });