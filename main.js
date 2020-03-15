// var product='Socks';
//v-bind -> Dynamically binds an attribute to an expression
//v-bind:attribute="expression"
//Can be shorcutted using :attribute:"expression"
/*
Examples:
:alt:"description"
:href:"url"
:title:"toolTip"
:class:"isActive"
:style:"isStyled"
:disabled:"isDisabled"
*/

//v-if, v-else-if, v-else
//v-show -> true, shows ; false, hides

//v-for:"detail in details"
//detail is the alias of the elements that were iterating on as we loop in the collection
//we use this alias to render every element in the list

//v-on -> shortcut @
//can handle events
/*Example
<button @click="addToCart">Add to Cart</button>
<div @mouseover="updateProduct">Color</div>
<form @submit="addToCart">...</form>
<input @keyup.enter="send">

*/

var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    brand: "Vue Mastery",
    selectedVariant: 0,
    onSale: true,
    description:
      "This product mantains your feet hot and confee, has an extra bonus, helps you to learn faster about vue js",
    url: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
    inventory: 8,
    // inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "Green",
        variantImage:
          "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
        variantQuantity: 5
      },
      {
        variantId: 2235,
        variantColor: "Blue",
        variantImage:
          "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      }
    ],
    sizes: [
      {
        sizeId: 0,
        size: "M"
      },
      {
        sizeId: 1,
        size: "L"
      },
      {
        sizeId: 2,
        size: "XL"
      },
      {
        sizeId: 3,
        size: "XXL"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    takeFromCart: function() {
      if (this.cart > 0) this.cart -= 1;
    }
  },
  computed: {
    title() {
      return this.onSale ? this.brand + " " + this.product : "";
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }
});
