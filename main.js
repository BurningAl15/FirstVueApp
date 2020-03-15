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

//Vue.component(Name,Options)
//Vue.component('product',{})

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
    <div class="product-image">
      <img v-bind:src="image" />
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <h2>{{description}}</h2>
      <!-- v-if, v-else-if, v-else -->
      <!-- <p v-if="inStock">In Stock</p> -->
      <!-- <p v-if="inventory > 10">In Stock</p>
      <p v-else-if="inventory <= 10 && inventory>0">Almost sold out!</p>
      <p v-else>Out of Stock</p> -->

      <p v-if="inStock">In Stock {{inStock}}</p>
      <p :class="{outStock:!inStock}" v-else>Out of Stock</p>

      <!-- v-show -->
      <p v-show="onSale">We Got!</p>

        <p>Shipping: {{shipping}}</p>

      <a :href="url">Vuy it here!</a>
      <div class="properties">
        <!-- Details -->
        <div>
          <product-details :details="details"></product-details>

        </div>

        <!-- Colors -->
        <div>
          <h2>Colors</h2>
          <div
            class="center color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)"
          >
          </div>
        </div>

        <!-- Sizes -->
        <div>

        <product-sizes :sizes="sizes"></product-sizes>
        </div>
      </div>

      <div class="properties">

        <div>
          <div>
            <button v-on:click="addToCart"
             :disabled="!inStock"
             :class="{disabledButton:!inStock}">Add to Cart</button>
          </div>

          <div>
            <button
            v-on:click="takeFromCart"
            :disabled="!inStock"
            :class="{disabledButton:!inStock,redButton:inStock}">
              Take from Cart
            </button>
          </div>
        </div>
       
      </div>
    </div>
  </div>
    `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      onSale: true,
      description:
        "This product mantains your feet hot and confee, has an extra bonus, helps you to learn faster about vue js",
      url:
        "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
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
      ]
    };
  },
  methods: {
    addToCart: function() {
      //   this.cart += 1;
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    takeFromCart: function() {
      this.$emit(
        "take-from-cart",
        this.variants[this.selectedVariant].variantId
      );
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
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return "$2.99";
      }
    }
  }
});

Vue.component("product-details", {
  props: {
    details: {
      type: String,
      required: true
    }
  },
  template: `
  <div>
    <h2>Details:</h2>
    <ul>
        <li v-for="detail in details" >{{detail}}</li>
    </ul>
  </div>`
});

Vue.component("product-sizes", {
  props: {
    sizes: {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <h2>Sizes:</h2>
      <ul>
          <li v-for="size in sizes" :key="size.sizeId">{{size.size}}</li>
      </ul>
    </div>`
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCartPos(id) {
      this.cart.push(id);
    },
    updateCartNeg(id) {
      if (this.cart.length > 0) this.cart.pop(id);
    }
  }
});
