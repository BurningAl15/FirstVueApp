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

//v-model -> two way data binding

var eventBus = new Vue();

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
      <info-tabs :shipping="shipping" :details="details"></info-tabs>

      <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
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

      <product-tabs :reviews="reviews"></product-tabs>

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
          variantId: 2232,
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
      reviews: []
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
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

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</p>

  <p>
    <label for="name">Name: </label>
    <input id="name" v-model="name">
    </p>
    <p>
    <label for="review">Review: </label>
    <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
    <label for="rating">Rating: </label>
    <select id="rating" v-model.number="rating">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    </p>

    <p>
      <label for="recommend">Would you recommend this product?</label><br>
      <input style="margin: 5px;padding:0;max-width:20%;" type="radio" id="yes" name="recommend" value="yes" v-model="recommend">
      <label style="margin: auto;" for="yes">Yes</label><br>
      <input style="margin: 5px;padding:0;max-width:20%;" type="radio" id="no" name="recommend" value="no" v-model="recommend">
      <label style="margin: auto;" for="no">No</label><br>
    </p>

    <p>
        <input type="submit" value="Submit">
    </p>

  </form>
     `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <span class="tab"
        :class="{activeTab:selectedTab===tab}"
        v-for="(tab,index) in tabs" 
        :key="index"
        @click="selectedTab=tab">
          {{tab}}
        </span>


    <div v-show="selectedTab==='Reviews'">
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet.</p>
    <ul>
      <li v-for="review in reviews">
      <p>{{ review.name }}</p>
      <p>Rating: {{ review.rating }}</p>
      <p>Recommend: {{ review.recommend }}</p>
      <p>{{ review.review }}</p>
      </li>
    </ul>
   </div>

   <product-review v-show="selectedTab === 'Make a Review'"
   ></product-review>

  </div>`,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
      reviews: []
    };
  }
});

Vue.component('info-tabs', {
  props: {
    shipping: {
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >{{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Shipping'">
        <p>{{ shipping }}</p>
      </div>

      <div v-show="selectedTab === 'Details'">
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
  
    </div>
  `,
  data() {
    return {
      tabs: ['Shipping', 'Details'],
      selectedTab: 'Shipping'
    }
  }
})
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
