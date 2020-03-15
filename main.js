
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

var app=new Vue({
    el: '#app',
    data:{
        product:'Socks',
        image:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        description:'This product mantains your feet hot and confee, has an extra bonus, helps you to learn faster about vue js',
        url:"https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
        // inStock:true        
        inventory:100
    }
})