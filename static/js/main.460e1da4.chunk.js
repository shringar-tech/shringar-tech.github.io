(this["webpackJsonpshringar-tech.github.io"]=this["webpackJsonpshringar-tech.github.io"]||[]).push([[0],{20:function(e,c,s){},21:function(e,c,s){},28:function(e,c,s){},29:function(e,c,s){},30:function(e,c,s){},31:function(e,c,s){},32:function(e,c,s){},33:function(e,c,s){},34:function(e,c,s){"use strict";s.r(c);var t=s(1),a=s(14),n=s.n(a),i=s(3),r=s(2),l=(s(20),s(21),s(0));var j=()=>{const[e,c]=Object(t.useState)(!1),[s,a]=Object(t.useState)(!1),n=Object(r.f)();Object(t.useEffect)((()=>{const e=()=>{a(window.scrollY>50)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}),[]),Object(t.useEffect)((()=>{c(!1)}),[n]);return Object(l.jsx)("nav",{className:"navbar "+(s?"navbar-scrolled":""),children:Object(l.jsxs)("div",{className:"navbar-container",children:[Object(l.jsx)(i.b,{to:"/",className:"navbar-logo",children:Object(l.jsx)("span",{className:"logo-text",children:"Shringaarika"})}),Object(l.jsxs)("div",{className:"navbar-menu-icon "+(e?"active":""),onClick:()=>{c(!e)},children:[Object(l.jsx)("span",{}),Object(l.jsx)("span",{}),Object(l.jsx)("span",{})]}),Object(l.jsxs)("ul",{className:"navbar-menu "+(e?"active":""),children:[Object(l.jsx)("li",{className:"navbar-item",children:Object(l.jsx)(i.b,{to:"/",className:"navbar-link "+("/"===n.pathname?"active":""),children:"Home"})}),Object(l.jsx)("li",{className:"navbar-item",children:Object(l.jsx)(i.b,{to:"/sarees",className:"navbar-link "+(n.pathname.includes("/sarees")?"active":""),children:"Sarees"})}),Object(l.jsx)("li",{className:"navbar-item",children:Object(l.jsx)(i.b,{to:"/lehengas",className:"navbar-link "+(n.pathname.includes("/lehengas")?"active":""),children:"Lehengas"})}),Object(l.jsx)("li",{className:"navbar-item",children:Object(l.jsx)(i.b,{to:"/kurtis",className:"navbar-link "+(n.pathname.includes("/kurtis")?"active":""),children:"Kurtis"})}),Object(l.jsx)("li",{className:"navbar-item",children:Object(l.jsx)(i.b,{to:"/contact",className:"navbar-link "+("/contact"===n.pathname?"active":""),children:"Contact"})})]})]})})};s(28);var o=()=>{const[e,c]=Object(t.useState)(0);return Object(t.useEffect)((()=>{const e=()=>{c(window.pageYOffset)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}}),[]),Object(l.jsx)("section",{className:"hero-section-full",style:{backgroundPositionY:.5*e+"px"}})};s(29);var d=function(){const{category:e,id:c}=Object(r.g)(),[s,a]=Object(t.useState)(null);return Object(t.useEffect)((()=>{fetch(`/data/${e}.json`).then((e=>e.json())).then((e=>{const s=e.find((e=>e.id===parseInt(c)));a(s)}))}),[e,c]),s?Object(l.jsx)("div",{className:"item-detail-container",children:Object(l.jsxs)("div",{className:"item-card",children:[Object(l.jsx)("div",{className:"item-image",children:Object(l.jsx)("img",{src:s.img,alt:s.name})}),Object(l.jsxs)("div",{className:"item-details",children:[Object(l.jsx)("h1",{children:s.name}),Object(l.jsxs)("div",{className:"price-tag",children:["$",s.price]}),Object(l.jsxs)("div",{className:"details-grid",children:[Object(l.jsxs)("div",{className:"detail-item",children:[Object(l.jsx)("span",{className:"label",children:"Date of Manufacture"}),Object(l.jsx)("span",{className:"value",children:s.dateOfManufacture})]}),Object(l.jsxs)("div",{className:"detail-item",children:[Object(l.jsx)("span",{className:"label",children:"Material"}),Object(l.jsx)("span",{className:"value",children:s.material})]})]}),Object(l.jsxs)("div",{className:"description",children:[Object(l.jsx)("h2",{children:"Description"}),Object(l.jsx)("p",{children:s.description})]})]})]})}):Object(l.jsx)("div",{className:"loading",children:"Loading..."})};s(30);var h=e=>{let{item:c,category:s}=e;const[a,n]=Object(t.useState)(!1),r=e=>`\u20b9${e.toLocaleString("en-IN")}`;return Object(l.jsx)("div",{className:"product-card",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:Object(l.jsxs)("div",{className:"product-card-inner",children:[Object(l.jsxs)("div",{className:"product-image-container",children:[Object(l.jsx)("img",{src:c.img,alt:c.name,className:"product-image"}),Object(l.jsx)("div",{className:"product-actions "+(a?"visible":""),children:Object(l.jsx)(i.b,{to:`/${s}/${c.id}`,className:"view-details-btn",children:"View Details"})}),c.isNew&&Object(l.jsx)("span",{className:"product-tag new-tag",children:"New"}),c.discount>0&&Object(l.jsxs)("span",{className:"product-tag discount-tag",children:[c.discount,"% OFF"]})]}),Object(l.jsxs)("div",{className:"product-info",children:[Object(l.jsx)("h3",{className:"product-name",children:c.name}),Object(l.jsx)("div",{className:"product-price-container",children:c.originalPrice&&c.originalPrice>c.price?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{className:"product-price",children:r(c.price)}),Object(l.jsx)("span",{className:"product-original-price",children:r(c.originalPrice)})]}):Object(l.jsx)("span",{className:"product-price",children:r(c.price||2999)})}),Object(l.jsxs)("div",{className:"product-rating",children:[[...Array(5)].map(((e,s)=>Object(l.jsx)("span",{className:"star "+(s<(c.rating||4)?"filled":""),children:"\u2605"},s))),Object(l.jsxs)("span",{className:"rating-count",children:["(",c.ratingCount||24,")"]})]})]})]})})};s(31);var b=function(e){let{category:c}=e;const[s,a]=Object(t.useState)([]),[n,r]=Object(t.useState)(!0);return Object(t.useEffect)((()=>{r(!0),fetch(`/data/${c}.json`).then((e=>e.json())).then((e=>{a(e),r(!1)})).catch((e=>{console.error("Error fetching data:",e),r(!1)}))}),[c]),n?Object(l.jsx)("div",{className:"loading",children:"Loading..."}):Object(l.jsxs)("section",{className:"category-section",children:[Object(l.jsx)("h2",{children:c.charAt(0).toUpperCase()+c.slice(1)}),Object(l.jsx)("div",{className:"category-container",children:s.map((e=>Object(l.jsx)(i.b,{to:`/${c}/${e.id}`,className:"category-link",children:Object(l.jsx)(h,{item:e,category:c})},e.id)))})]})};s(32);var m=function(){return Object(l.jsxs)("div",{className:"contact-container",children:[Object(l.jsx)("div",{className:"contact-header",children:Object(l.jsxs)("div",{className:"header-content",children:[Object(l.jsx)("h1",{children:"Get in Touch"}),Object(l.jsx)("p",{children:"We'd love to hear from you. Let's create something beautiful together."})]})}),Object(l.jsxs)("div",{className:"contact-grid",children:[Object(l.jsxs)("div",{className:"contact-card info-section",children:[Object(l.jsx)("h2",{children:"Contact Information"}),Object(l.jsxs)("div",{className:"contact-details",children:[Object(l.jsxs)("div",{className:"contact-item",children:[Object(l.jsx)("i",{className:"material-icons",children:"email"}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"Email"}),Object(l.jsx)("p",{children:"contact@shringar-tech.com"})]})]}),Object(l.jsxs)("div",{className:"contact-item",children:[Object(l.jsx)("i",{className:"material-icons",children:"phone"}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"Phone"}),Object(l.jsx)("p",{children:"+1 (555) 123-4567"})]})]}),Object(l.jsxs)("div",{className:"contact-item",children:[Object(l.jsx)("i",{className:"material-icons",children:"location_on"}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"Address"}),Object(l.jsx)("p",{children:"123 Tech Street, Innovation City, CA 94016"})]})]})]})]}),Object(l.jsx)("div",{className:"contact-card image-section",children:Object(l.jsx)("div",{className:"contact-image",children:Object(l.jsx)("img",{src:"/images/saree/img_6.png",alt:"Shringar Office"})})})]}),Object(l.jsxs)("div",{className:"terms-content",children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"1. Response Time"}),Object(l.jsx)("p",{children:"We aim to respond to all inquiries within 24 business hours. For urgent matters, please contact us by phone."})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"2. Privacy Policy"}),Object(l.jsx)("p",{children:"Your personal information is protected under our strict privacy policy. We never share or sell your data to third parties."})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"3. Business Hours"}),Object(l.jsx)("p",{children:"Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM EST. Weekend responses may be delayed."})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"4. Communication Guidelines"}),Object(l.jsx)("p",{children:"All communications should be professional and respectful. We reserve the right to cease communication in cases of harassment or abuse."})]})]})]})};s(33);var O=()=>{const[e,c]=Object(t.useState)(!1);Object(t.useEffect)((()=>{const e=()=>{window.pageYOffset>300?c(!0):c(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}),[]);return Object(l.jsx)(l.Fragment,{children:e&&Object(l.jsx)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"scroll-to-top","aria-label":"Scroll to top",children:Object(l.jsx)("span",{className:"arrow-up",children:"\u2191"})})})};var x=function(){const[e,c]=Object(t.useState)([]),[s,a]=Object(t.useState)([]),[n,x]=Object(t.useState)([]);return Object(t.useEffect)((()=>{fetch("/data/sarees.json").then((e=>e.json())).then((e=>c(e))),fetch("/data/lehengas.json").then((e=>e.json())).then((e=>a(e))),fetch("/data/kurtis.json").then((e=>e.json())).then((e=>x(e)))}),[]),Object(l.jsx)(i.a,{basename:"",children:Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{}),Object(l.jsx)("main",{children:Object(l.jsxs)(r.c,{children:[Object(l.jsx)(r.a,{path:"/contact",component:m}),Object(l.jsx)(r.a,{path:"/:category/:id",component:d}),Object(l.jsx)(r.a,{path:"/sarees",children:Object(l.jsx)(b,{category:"sarees"})}),Object(l.jsx)(r.a,{path:"/lehengas",children:Object(l.jsx)(b,{category:"lehengas"})}),Object(l.jsx)(r.a,{path:"/kurtis",children:Object(l.jsx)(b,{category:"kurtis"})}),Object(l.jsxs)(r.a,{path:"/",children:[Object(l.jsx)(o,{}),Object(l.jsxs)("section",{id:"sarees",className:"category-section",children:[Object(l.jsx)("h2",{children:"Sarees"}),Object(l.jsx)("div",{className:"category-container",children:e.slice(0,6).map((e=>Object(l.jsx)(i.b,{to:`/sarees/${e.id}`,className:"category-link",children:Object(l.jsx)(h,{item:e,category:"sarees"})},e.id)))})]}),Object(l.jsxs)("section",{id:"lehengas",className:"category-section",children:[Object(l.jsx)("h2",{children:"Lehengas"}),Object(l.jsx)("div",{className:"category-container",children:s.slice(0,6).map((e=>Object(l.jsx)(i.b,{to:`/lehengas/${e.id}`,className:"category-link",children:Object(l.jsx)(h,{item:e,category:"lehengas"})},e.id)))})]}),Object(l.jsxs)("section",{id:"kurtis",className:"category-section",children:[Object(l.jsx)("h2",{children:"Kurtis"}),Object(l.jsx)("div",{className:"category-container",children:n.slice(0,6).map((e=>Object(l.jsx)(i.b,{to:`/kurtis/${e.id}`,className:"category-link",children:Object(l.jsx)(h,{item:e,category:"kurtis"})},e.id)))})]})]})]})}),Object(l.jsx)(O,{})]})})};n.a.render(Object(l.jsx)(i.a,{basename:"",children:Object(l.jsx)(x,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.460e1da4.chunk.js.map