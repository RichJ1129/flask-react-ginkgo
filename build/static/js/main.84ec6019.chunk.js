(this["webpackJsonpflask-react-ginkgo"]=this["webpackJsonpflask-react-ginkgo"]||[]).push([[0],{27:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var c=n(4),r=n(0),s=n(17),i=n.n(s),a=(n(27),n(21)),o=n(10),j=(n(28),n(14)),d=n.n(j),h=n(18),u=n(38),b=n(19),l=n(39),O=function(e){var t=e.onNewSequence,n=Object(r.useState)(""),s=Object(o.a)(n,2),i=s[0],a=s[1];return Object(c.jsxs)(u.a,{children:[Object(c.jsx)(u.a.Group,{controlId:"formBasicSequence",children:Object(c.jsx)(b.a,{type:"text",name:"Sequence",placeholder:"Sequence",value:i,onChange:function(e){return a(e.target.value)},required:!0})}),Object(c.jsx)(u.a.Group,{children:Object(c.jsx)(l.a,{onClick:Object(h.a)(d.a.mark((function e(){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={sequence:i},e.next=3,fetch("/api/search_protein",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 3:e.sent.ok&&(console.log("response worked!"),t(i),a(""),setTimeout((function(){return window.location.reload()}),1e4));case 5:case"end":return e.stop()}}),e)}))),children:"Submit"})})]})},x=n(35),f=function(e){var t=e.sequences;return Object(c.jsxs)(x.a,{striped:!0,bordered:!0,hover:!0,children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Search Time "}),Object(c.jsx)("th",{children:"Definition"}),Object(c.jsx)("th",{children:"Search String"}),Object(c.jsx)("th",{children:"Start Position"}),Object(c.jsx)("th",{children:"End Position"})]})}),Object(c.jsx)("tbody",{children:t.map((function(e){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:e.time}),Object(c.jsx)("td",{children:e.name}),Object(c.jsx)("td",{children:e.search_string}),Object(c.jsx)("td",{children:e.start_pos}),Object(c.jsx)("td",{children:e.end_pos})]})}))})]})},p=n(36),g=n(37),m=n(20);var S=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1];return Object(r.useEffect)((function(){fetch("api/get_proteins").then((function(e){return e.json().then((function(e){s(e.sequences)}))}))}),[]),Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)(p.a,{children:Object(c.jsxs)(g.a,{children:[Object(c.jsx)(m.a,{sm:5,children:Object(c.jsx)("div",{className:"search_box",children:Object(c.jsx)(O,{onNewSequence:function(e){return s((function(t){return[e].concat(Object(a.a)(t))}))}})})}),Object(c.jsx)(m.a,{sm:7,children:Object(c.jsx)(f,{sequences:n})})]})})})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),s(e),i(e)}))};n(33);i.a.render(Object(c.jsx)(S,{}),document.getElementById("root")),v()}},[[34,1,2]]]);
//# sourceMappingURL=main.84ec6019.chunk.js.map