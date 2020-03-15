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

var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image:
      "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
    description:
      "This product mantains your feet hot and confee, has an extra bonus, helps you to learn faster about vue js",
    url: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
    inventory: 8,
    inStock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "Green"
      },
      {
        variantId: 2235,
        variantColor: "Blue"
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
  }
});
