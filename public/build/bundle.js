var app=function(){"use strict";function e(){}function t(e){return e()}function s(){return Object.create(null)}function n(e){e.forEach(t)}function r(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function o(e,t){e.appendChild(t)}function i(e,t,s){e.insertBefore(t,s||null)}function l(e){e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function u(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function p(e){return document.createTextNode(e)}function d(){return p(" ")}function m(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}function f(e,t){t=""+t,e.data!==t&&(e.data=t)}function v(e,t,s,n){e.style.setProperty(t,s,n?"important":"")}let g;function h(e){g=e}function $(e){(function(){if(!g)throw new Error("Function called outside component initialization");return g})().$$.on_mount.push(e)}const _=[],w=[],y=[],b=[],x=Promise.resolve();let q=!1;function S(e){y.push(e)}function z(){const e=new Set;do{for(;_.length;){const e=_.shift();h(e),k(e.$$)}for(;w.length;)w.pop()();for(let t=0;t<y.length;t+=1){const s=y[t];e.has(s)||(s(),e.add(s))}y.length=0}while(_.length);for(;b.length;)b.pop()();q=!1}function k(e){if(null!==e.fragment){e.update(),n(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const T=new Set;let C;function I(e,t){e&&e.i&&(T.delete(e),e.i(t))}function A(e,t,s,n){if(e&&e.o){if(T.has(e))return;T.add(e),C.c.push((()=>{T.delete(e),n&&(s&&e.d(1),n())})),e.o(t)}}function M(e){e&&e.c()}function j(e,s,a){const{fragment:o,on_mount:i,on_destroy:l,after_update:c}=e.$$;o&&o.m(s,a),S((()=>{const s=i.map(t).filter(r);l?l.push(...s):n(s),e.$$.on_mount=[]})),c.forEach(S)}function W(e,t){const s=e.$$;null!==s.fragment&&(n(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function E(e,t){-1===e.$$.dirty[0]&&(_.push(e),q||(q=!0,x.then(z)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function L(t,r,a,o,i,l,c=[-1]){const u=g;h(t);const p=r.props||{},d=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:i,bound:s(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:s(),dirty:c};let m=!1;d.ctx=a?a(t,p,((e,s,n=s)=>(d.ctx&&i(d.ctx[e],d.ctx[e]=n)&&(d.bound[e]&&d.bound[e](n),m&&E(t,e)),s))):[],d.update(),m=!0,n(d.before_update),d.fragment=!!o&&o(d.ctx),r.target&&(r.hydrate?d.fragment&&d.fragment.l(function(e){return Array.from(e.childNodes)}(r.target)):d.fragment&&d.fragment.c(),r.intro&&I(t.$$.fragment),j(t,r.target,r.anchor),z()),h(u)}class N{$destroy(){W(this,1),this.$destroy=e}$on(e,t){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(t),()=>{const e=s.indexOf(t);-1!==e&&s.splice(e,1)}}$set(){}}function H(t){let s;return{c(){s=c("section"),s.innerHTML='<div class="hero svelte-157o2q0"><div class="hero__white-bg svelte-157o2q0"></div> \n    <div class="hero__content svelte-157o2q0"><h1 class="hero__header red-header svelte-157o2q0">Easy Tune Up Mechanic Shop!</h1> \n      <p class="hero__text light-text svelte-157o2q0">\n        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores ad\n        ratione repudiandae, dolorem officia sunt voluptatibus optio adipisci\n        dolore harum culpa. Architecto, provident explicabo! Iusto, esse, rem\n        pariatur quibusdam ab quidem molestias nihil quo commodi provident vel\n        temporibus. Ex quia est placeat quasi deleniti. In.\n      </p> \n      <a class="diagonal-button hero__button svelte-157o2q0" href="#contact-us"><span class="button-slanted-content">Contact Us</span></a></div></div> \n  <div class="main-bg-img svelte-157o2q0"></div>',m(s,"class","hero-container d-flex-nw svelte-157o2q0"),m(s,"id","hero")},m(e,t){i(e,s,t)},p:e,i:e,o:e,d(e){e&&l(s)}}}class F extends N{constructor(e){super(),L(this,e,null,H,a,{})}}function P(t){let s,n,r;return{c(){s=c("div"),n=c("h1"),r=p(t[0]),m(n,"class","red-header"),m(s,"class","piston-header svelte-12rydgg")},m(e,t){i(e,s,t),o(s,n),o(n,r)},p(e,[t]){1&t&&f(r,e[0])},i:e,o:e,d(e){e&&l(s)}}}function D(e,t,s){let{title:n="Header Title"}=t;return e.$set=e=>{"title"in e&&s(0,n=e.title)},[n]}class R extends N{constructor(e){super(),L(this,e,D,P,a,{title:0})}}function U(t){let s,n,r,a,u,v,g,h,$,_,w;return{c(){s=c("div"),n=c("div"),r=c("img"),u=d(),v=c("div"),g=c("h1"),h=p(t[1]),$=d(),_=c("p"),w=p(t[2]),m(r,"class","service__icon "),r.src!==(a=t[0])&&m(r,"src",a),m(r,"alt",""),m(n,"class","service__icon-container svelte-9ejykm"),m(g,"class","service__title svelte-9ejykm"),m(_,"class","service__text svelte-9ejykm"),m(v,"class","service__body svelte-9ejykm"),m(s,"class","service svelte-9ejykm")},m(e,t){i(e,s,t),o(s,n),o(n,r),o(s,u),o(s,v),o(v,g),o(g,h),o(v,$),o(v,_),o(_,w)},p(e,[t]){1&t&&r.src!==(a=e[0])&&m(r,"src",a),2&t&&f(h,e[1]),4&t&&f(w,e[2])},i:e,o:e,d(e){e&&l(s)}}}function B(e,t,s){let{serviceIcon:n="/assets/brakes.svg"}=t,{serviceTitle:r="Service Title"}=t,{serviceText:a="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique."}=t;return e.$set=e=>{"serviceIcon"in e&&s(0,n=e.serviceIcon),"serviceTitle"in e&&s(1,r=e.serviceTitle),"serviceText"in e&&s(2,a=e.serviceText)},[n,r,a]}class G extends N{constructor(e){super(),L(this,e,B,U,a,{serviceIcon:0,serviceTitle:1,serviceText:2})}}function O(t){let s,n,r,a,u,p,f,v,g;const h=new R({props:{title:"How We Can Help"}}),$=new G({props:{serviceTitle:"CEL Diagnosis",serviceIcon:"/assets/engine.svg"}}),_=new G({props:{serviceTitle:"Smog Check",serviceIcon:"assets/exhaust.svg"}}),w=new G({props:{serviceTitle:"Brake Repairs",serviceIcon:"assets/brakes.svg"}}),y=new G({props:{serviceTitle:"Oil Change",serviceIcon:"assets/oil.svg"}});return{c(){s=c("section"),M(h.$$.fragment),n=d(),r=c("div"),M($.$$.fragment),a=d(),M(_.$$.fragment),u=d(),M(w.$$.fragment),p=d(),M(y.$$.fragment),f=d(),v=c("div"),v.innerHTML='<span class="button-slanted-content">More Services</span>',m(r,"class","services__grid svelte-1q56vl7"),m(v,"class","diagonal-button svelte-1q56vl7"),m(s,"class","services d-flex-nw svelte-1q56vl7"),m(s,"id","services")},m(e,t){i(e,s,t),j(h,s,null),o(s,n),o(s,r),j($,r,null),o(r,a),j(_,r,null),o(r,u),j(w,r,null),o(r,p),j(y,r,null),o(s,f),o(s,v),g=!0},p:e,i(e){g||(I(h.$$.fragment,e),I($.$$.fragment,e),I(_.$$.fragment,e),I(w.$$.fragment,e),I(y.$$.fragment,e),g=!0)},o(e){A(h.$$.fragment,e),A($.$$.fragment,e),A(_.$$.fragment,e),A(w.$$.fragment,e),A(y.$$.fragment,e),g=!1},d(e){e&&l(s),W(h),W($),W(_),W(w),W(y)}}}class V extends N{constructor(e){super(),L(this,e,null,O,a,{})}}function Q(e){let t,s,n,r,a,u,p,f,v,g,h,$,_,w,y,b,x,q,S,z,k;const T=new R({props:{title:"Brands We Service"}});return{c(){t=c("section"),M(T.$$.fragment),s=d(),n=c("div"),r=c("img"),u=d(),p=c("img"),v=d(),g=c("img"),$=d(),_=c("img"),y=d(),b=c("img"),q=d(),S=c("img"),m(r,"class","cars-serviced__logo img-padding-bottom svelte-19498q"),r.src!==(a=e[0].volkswagen)&&m(r,"src",a),m(r,"alt","Volkswagen logo"),m(p,"class","cars-serviced__logo svelte-19498q"),p.src!==(f=e[0].honda)&&m(p,"src",f),m(p,"alt","Honda logo"),m(g,"class","cars-serviced__logo svelte-19498q"),g.src!==(h=e[0].ford)&&m(g,"src",h),m(g,"alt","Ford logo"),m(_,"class","cars-serviced__logo svelte-19498q"),_.src!==(w=e[0].nissan)&&m(_,"src",w),m(_,"alt","Nissan logo"),m(b,"class","cars-serviced__logo svelte-19498q"),b.src!==(x=e[0].dodge)&&m(b,"src",x),m(b,"alt","Dodge logo"),m(S,"class","cars-serviced__logo svelte-19498q"),S.src!==(z=e[0].subaru)&&m(S,"src",z),m(S,"alt","Subaru logo"),m(n,"class","cars-serviced__gallery svelte-19498q"),m(t,"class","cars-serviced svelte-19498q"),m(t,"id","cars")},m(e,a){i(e,t,a),j(T,t,null),o(t,s),o(t,n),o(n,r),o(n,u),o(n,p),o(n,v),o(n,g),o(n,$),o(n,_),o(n,y),o(n,b),o(n,q),o(n,S),k=!0},p(e,[t]){(!k||1&t&&r.src!==(a=e[0].volkswagen))&&m(r,"src",a),(!k||1&t&&p.src!==(f=e[0].honda))&&m(p,"src",f),(!k||1&t&&g.src!==(h=e[0].ford))&&m(g,"src",h),(!k||1&t&&_.src!==(w=e[0].nissan))&&m(_,"src",w),(!k||1&t&&b.src!==(x=e[0].dodge))&&m(b,"src",x),(!k||1&t&&S.src!==(z=e[0].subaru))&&m(S,"src",z)},i(e){k||(I(T.$$.fragment,e),k=!0)},o(e){A(T.$$.fragment,e),k=!1},d(e){e&&l(t),W(T)}}}function Y(e,t,s){let{carLogos:n={volkswagen:"./assets/volkswagen.png",honda:"./assets/honda.png",ford:"./assets/ford.png",nissan:"./assets/nissan.png",dodge:"./assets/dodge.png",subaru:"./assets/subaru.png"}}=t;return e.$set=e=>{"carLogos"in e&&s(0,n=e.carLogos)},[n]}class Z extends N{constructor(e){super(),L(this,e,Y,Q,a,{carLogos:0})}}function J(t){let s,n,r,a,u,p;return{c(){s=c("section"),n=c("div"),r=c("div"),r.innerHTML='<h1 class="about-us__content__title svelte-vh6jv6">About Us</h1> \n      <p class="about-us__content__text svelte-vh6jv6">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo sit non\n        corporis optio quod possimus numquam voluptatem earum molestiae\n        accusantium excepturi totam, aut incidunt veniam itaque distinctio\n        aliquam culpa sequi neque quam vero vitae officiis dolorum facilis.\n        Tempore dolore id fuga pariatur praesentium labore perspiciatis,\n        deserunt obcaecati deleniti beatae itaque assumenda sunt voluptates,\n        doloribus modi impedit dolorum. Pariatur aperiam, quae nostrum enim\n        corrupti perspiciatis maiores sit amet, harum expedita quas voluptates\n        possimus perferendis!\n      </p> \n      <a class="diagonal-button hero__button" href="#reviews"><span class="button-slanted-content">Reviews</span></a>',a=d(),u=c("img"),m(r,"class","about-us__content svelte-vh6jv6"),m(u,"class","about-us__img svelte-vh6jv6"),u.src!==(p=t[0])&&m(u,"src",p),m(u,"alt","mechanic bending over to look under car"),m(n,"class","about-us__mw d-flex-nw svelte-vh6jv6"),m(s,"class","about-us blue-gradient svelte-vh6jv6"),m(s,"id","about")},m(e,t){i(e,s,t),o(s,n),o(n,r),o(n,a),o(n,u)},p(e,[t]){1&t&&u.src!==(p=e[0])&&m(u,"src",p)},i:e,o:e,d(e){e&&l(s)}}}function K(e,t,s){let{aboutImg:n="./assets/img-1.jpg"}=t;return e.$set=e=>{"aboutImg"in e&&s(0,n=e.aboutImg)},[n]}class X extends N{constructor(e){super(),L(this,e,K,J,a,{aboutImg:0})}}function ee(t){let s;return{c(){s=c("div"),m(s,"class","map svelte-th00ad")},m(e,n){i(e,s,n),t[3](s)},p:e,i:e,o:e,d(e){e&&l(s),t[3](null)}}}function te(e,t,s){let n,r,a={lat:37.3385,lng:-121.9534};return $((async()=>{r=new google.maps.Map(n,{zoom:14,center:a,gestureHandling:"none",zoomControl:!1})})),[n,r,a,function(e){w[e?"unshift":"push"]((()=>{s(0,n=e)}))}]}class se extends N{constructor(e){super(),L(this,e,te,ee,a,{})}}function ne(t){let s,n,r,a,u,p;const f=new R({props:{title:"Contact Us"}}),v=new se({});return{c(){s=c("section"),M(f.$$.fragment),n=d(),r=c("div"),a=c("div"),a.innerHTML='<div class="contact__hours"><p><b>Monday-Friday:</b>\n          9:30am-5:00pm\n        </p> \n        <p><b>Saturday:</b>\n          9:30am-3:00pm\n        </p></div> \n      <p class="contact__phone"><b>Phone:</b>\n        (831)012-3456\n      </p> \n      <p class="contact__address">\n        123 W. Union St\n        <br>\n        Watsonville, CA 95076\n      </p>',u=d(),M(v.$$.fragment),m(a,"class","contact-us__details svelte-1ukma7x"),m(r,"class","contact-us__container d-flex-nw svelte-1ukma7x"),m(s,"class","contact-us svelte-1ukma7x"),m(s,"id","contact-us")},m(e,t){i(e,s,t),j(f,s,null),o(s,n),o(s,r),o(r,a),o(r,u),j(v,r,null),p=!0},p:e,i(e){p||(I(f.$$.fragment,e),I(v.$$.fragment,e),p=!0)},o(e){A(f.$$.fragment,e),A(v.$$.fragment,e),p=!1},d(e){e&&l(s),W(f),W(v)}}}class re extends N{constructor(e){super(),L(this,e,null,ne,a,{})}}function ae(e,t,s){const n=e.slice();return n[8]=t[s],n}function oe(e){let t,s,n,r,a,c,p,d,f,g,h,$,_,w,y,b,x;return{c(){t=u("svg"),s=u("polygon"),r=u("defs"),a=u("linearGradient"),c=u("stop"),f=u("stop"),$=u("stop"),y=u("stop"),m(s,"points",n=e[4]()),v(s,"fill-rule","nonzero"),m(c,"id","stop1"),m(c,"offset",p=e[8].percent),m(c,"stop-opacity","1"),m(c,"stop-color",d=e[5](e[8])),m(f,"id","stop2"),m(f,"offset",g=e[8].percent),m(f,"stop-opacity","0"),m(f,"stop-color",h=e[5](e[8])),m($,"id","stop3"),m($,"offset",_=e[8].percent),m($,"stop-opacity","1"),m($,"stop-color",w=e[2].styleEmptyStarColor),m(y,"id","stop4"),m(y,"offset","100%"),m(y,"stop-opacity","1"),m(y,":stop-color",b=e[2].styleEmptyStarColor),m(a,"id",x="gradient"+e[8].raw),m(t,"class","star-svg"),v(t,"fill","url(#gradient"+e[8].raw+")"),v(t,"height",e[2].styleStarWidth),v(t,"width",e[2].styleStarWidth)},m(e,n){i(e,t,n),o(t,s),o(t,r),o(r,a),o(a,c),o(a,f),o(a,$),o(a,y)},p(e,s){8&s&&p!==(p=e[8].percent)&&m(c,"offset",p),8&s&&d!==(d=e[5](e[8]))&&m(c,"stop-color",d),8&s&&g!==(g=e[8].percent)&&m(f,"offset",g),8&s&&h!==(h=e[5](e[8]))&&m(f,"stop-color",h),8&s&&_!==(_=e[8].percent)&&m($,"offset",_),4&s&&w!==(w=e[2].styleEmptyStarColor)&&m($,"stop-color",w),4&s&&b!==(b=e[2].styleEmptyStarColor)&&m(y,":stop-color",b),8&s&&x!==(x="gradient"+e[8].raw)&&m(a,"id",x),8&s&&v(t,"fill","url(#gradient"+e[8].raw+")"),4&s&&v(t,"height",e[2].styleStarWidth),4&s&&v(t,"width",e[2].styleStarWidth)},d(e){e&&l(t)}}}function ie(e){let t,s;return{c(){t=c("div"),s=p(e[0]),m(t,"class","indicator svelte-p3zdxf")},m(e,n){i(e,t,n),o(t,s)},p(e,t){1&t&&f(s,e[0])},d(e){e&&l(t)}}}function le(t){let s,n,r,a=t[3],u=[];for(let e=0;e<a.length;e+=1)u[e]=oe(ae(t,a,e));let p=t[1]&&ie(t);return{c(){s=c("div"),n=c("div");for(let e=0;e<u.length;e+=1)u[e].c();r=d(),p&&p.c(),m(n,"class","star-rating svelte-p3zdxf"),m(s,"class","star-container svelte-p3zdxf")},m(e,t){i(e,s,t),o(s,n);for(let e=0;e<u.length;e+=1)u[e].m(n,null);o(n,r),p&&p.m(n,null)},p(e,[t]){if(60&t){let s;for(a=e[3],s=0;s<a.length;s+=1){const o=ae(e,a,s);u[s]?u[s].p(o,t):(u[s]=oe(o),u[s].c(),u[s].m(n,r))}for(;s<u.length;s+=1)u[s].d(1);u.length=a.length}e[1]?p?p.p(e,t):(p=ie(e),p.c(),p.m(n,null)):p&&(p.d(1),p=null)},i:e,o:e,d(e){e&&l(s),function(e,t){for(let s=0;s<e.length;s+=1)e[s]&&e[s].d(t)}(u,e),p&&p.d()}}}function ce(e){return 100*e.raw+"%"}function ue(e,t,s){let{rating:n=0}=t,{isIndicatorActive:r=!0}=t,{style:a={styleStarWidth:50,styleEmptyStarColor:"#737373",styleFullStarColor:"#ffd219"}}=t,o=[];return $((()=>{!function(){for(let e=0;e<5;e++)o.push({raw:0,percent:"0%"})}(),function(){let e=Math.floor(n);for(let t=0;t<o.length;t++){if(0===e){let e=Math.round(n%1*10)/10,r=Math.round(10*e)/10;return s(3,o[t].raw=r,o),s(3,o[t].percent=ce(o[t]),o)}s(3,o[t].raw=1,o),s(3,o[t].percent=ce(o[t]),o),e--}}()})),e.$set=e=>{"rating"in e&&s(0,n=e.rating),"isIndicatorActive"in e&&s(1,r=e.isIndicatorActive),"style"in e&&s(2,a=e.style)},[n,r,a,o,function(){let e=a.styleStarWidth/2,t=a.styleStarWidth/2,s=a.styleStarWidth/5;return function(e,t,s,n,r){let a=Math.PI/s,o=2*s,i="";for(let s=0;s<o;s++){let o=s%2==0?r:n;i+=e+Math.cos(s*a+60)*o+","+(t+Math.sin(s*a+60)*o)+" "}return i}(e,t,5,s,2.5*s)},function(e){return 0!==e.raw?a.styleFullStarColor:a.styleEmptyStarColor}]}class pe extends N{constructor(e){super(),L(this,e,ue,le,a,{rating:0,isIndicatorActive:1,style:2})}}function de(e){let t,s,n,r,a,u,v,g;const h=new pe({props:{rating:e[2],style:e[3],isIndicatorActive:me}});return{c(){t=c("div"),s=c("p"),n=p(e[1]),r=d(),M(h.$$.fragment),a=d(),u=c("h3"),v=p(e[0]),m(s,"class","review__text svelte-69oahw"),m(u,"class","review__title svelte-69oahw"),m(t,"class","review blue-gradient svelte-69oahw")},m(e,l){i(e,t,l),o(t,s),o(s,n),o(t,r),j(h,t,null),o(t,a),o(t,u),o(u,v),g=!0},p(e,[t]){(!g||2&t)&&f(n,e[1]);const s={};4&t&&(s.rating=e[2]),h.$set(s),(!g||1&t)&&f(v,e[0])},i(e){g||(I(h.$$.fragment,e),g=!0)},o(e){A(h.$$.fragment,e),g=!1},d(e){e&&l(t),W(h)}}}let me=!1;function fe(e,t,s){let{reviewerName:n="Persons Name"}=t,{reviewParagraph:r="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio veniamquasi iure doloremque enim dolore maxime omnis labore voluptate,reiciendis nesciunt! Labore itaque quod atque ipsam possimus dicta nihilpariatur. At odio vel accusamus accusantium?"}=t,{rating:a="3.5"}=t;return e.$set=e=>{"reviewerName"in e&&s(0,n=e.reviewerName),"reviewParagraph"in e&&s(1,r=e.reviewParagraph),"rating"in e&&s(2,a=e.rating)},[n,r,a,{styleStarWidth:18,styleEmptyStarColor:"#d4d4d4",styleFullStarColor:"#ffd219"}]}class ve extends N{constructor(e){super(),L(this,e,fe,de,a,{reviewerName:0,reviewParagraph:1,rating:2})}}function ge(t){let s,n,r,a,u,p,f,v;const g=new R({props:{title:"Reviews"}}),h=new ve({props:{reviewerName:"Alex Garcia",rating:"4.2"}}),$=new ve({props:{rating:"3.5",reviewerName:"Sooz Garcia"}}),_=new ve({props:{rating:"4.8"}}),w=new ve({props:{rating:"4.8"}}),y=new ve({props:{rating:"4.4"}});return{c(){s=c("div"),M(g.$$.fragment),n=d(),r=c("div"),M(h.$$.fragment),a=d(),M($.$$.fragment),u=d(),M(_.$$.fragment),p=d(),M(w.$$.fragment),f=d(),M(y.$$.fragment),m(r,"class","reviews-container svelte-bcwoar"),m(s,"class","reviews svelte-bcwoar"),m(s,"id","reviews")},m(e,t){i(e,s,t),j(g,s,null),o(s,n),o(s,r),j(h,r,null),o(r,a),j($,r,null),o(r,u),j(_,r,null),o(r,p),j(w,r,null),o(r,f),j(y,r,null),v=!0},p:e,i(e){v||(I(g.$$.fragment,e),I(h.$$.fragment,e),I($.$$.fragment,e),I(_.$$.fragment,e),I(w.$$.fragment,e),I(y.$$.fragment,e),v=!0)},o(e){A(g.$$.fragment,e),A(h.$$.fragment,e),A($.$$.fragment,e),A(_.$$.fragment,e),A(w.$$.fragment,e),A(y.$$.fragment,e),v=!1},d(e){e&&l(s),W(g),W(h),W($),W(_),W(w),W(y)}}}class he extends N{constructor(e){super(),L(this,e,null,ge,a,{})}}function $e(t){let s;return{c(){s=c("footer"),s.innerHTML='<div class="footer__mw svelte-1m1esp7"><ul class="footer__nav"><li><a href="#hero" class="footer__nav__item svelte-1m1esp7">Home</a></li> \n      <li><a href="#services" class="footer__nav__item svelte-1m1esp7">Services</a></li> \n      <li><a href="#cars" class="footer__nav__item svelte-1m1esp7">What We Service</a></li> \n      <li><a href="#about" class="footer__nav__item svelte-1m1esp7">About</a></li> \n      <li><a href="#contact-us" class="footer__nav__item svelte-1m1esp7">Contact</a></li> \n      <li><a href="#reviews" class="footer__nav__item svelte-1m1esp7">Reviews</a></li> \n      <li class="designer-tag svelte-1m1esp7">Designed by Alejandro Garcia</li></ul></div>',m(s,"class","footer blue-gradient svelte-1m1esp7")},m(e,t){i(e,s,t)},p:e,i:e,o:e,d(e){e&&l(s)}}}class _e extends N{constructor(e){super(),L(this,e,null,$e,a,{})}}function we(t){let s;return{c(){s=c("nav"),s.innerHTML='<div class="menuToggle svelte-1mpwzlh"><input type="checkbox" class="svelte-1mpwzlh"> \n    <span class="svelte-1mpwzlh"></span> \n    <span class="svelte-1mpwzlh"></span> \n    <span class="svelte-1mpwzlh"></span> \n\n    <ul class="menu blue-gradient svelte-1mpwzlh" aria-hidden="”true”"><li class="svelte-1mpwzlh"><a href="#hero" class="svelte-1mpwzlh">Home</a></li> \n      <li class="svelte-1mpwzlh"><a href="#services" class="svelte-1mpwzlh">Services</a></li> \n      <li class="svelte-1mpwzlh"><a href="#cars" class="svelte-1mpwzlh">What We Service</a></li> \n      <li class="svelte-1mpwzlh"><a href="#about" class="svelte-1mpwzlh">About</a></li> \n      <li class="svelte-1mpwzlh"><a href="#contact-us" class="svelte-1mpwzlh">Contact</a></li> \n      <li class="svelte-1mpwzlh"><a href="#reviews" class="svelte-1mpwzlh">Reviews</a></li></ul></div>',m(s,"class","nav svelte-1mpwzlh"),m(s,"role","navigation")},m(e,t){i(e,s,t)},p:e,i:e,o:e,d(e){e&&l(s)}}}class ye extends N{constructor(e){super(),L(this,e,null,we,a,{})}}function be(e){let t;const s=new re({});return{c(){M(s.$$.fragment)},m(e,n){j(s,e,n),t=!0},i(e){t||(I(s.$$.fragment,e),t=!0)},o(e){A(s.$$.fragment,e),t=!1},d(e){W(s,e)}}}function xe(e){let t,s,r,a,u,p,f,v,g,h,$,_,w,y,b,x,q,S,z;const k=new ye({}),T=new F({}),E=new V({}),L=new Z({}),N=new X({});let H=e[0]&&be();const P=new he({}),D=new _e({});return{c(){t=c("script"),r=d(),M(k.$$.fragment),a=d(),M(T.$$.fragment),u=d(),M(E.$$.fragment),p=d(),f=c("hr"),v=d(),M(L.$$.fragment),g=d(),h=c("hr"),$=d(),M(N.$$.fragment),_=d(),H&&H.c(),w=d(),y=c("hr"),b=d(),M(P.$$.fragment),x=d(),q=c("hr"),S=d(),M(D.$$.fragment),t.defer=!0,t.async=!0,t.src!==(s="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhnRVZfDUED8k2cFQjT8FluYWed5qrzFo&callback=initMap")&&m(t,"src","https://maps.googleapis.com/maps/api/js?key=AIzaSyBhnRVZfDUED8k2cFQjT8FluYWed5qrzFo&callback=initMap")},m(e,s){o(document.head,t),i(e,r,s),j(k,e,s),i(e,a,s),j(T,e,s),i(e,u,s),j(E,e,s),i(e,p,s),i(e,f,s),i(e,v,s),j(L,e,s),i(e,g,s),i(e,h,s),i(e,$,s),j(N,e,s),i(e,_,s),H&&H.m(e,s),i(e,w,s),i(e,y,s),i(e,b,s),j(P,e,s),i(e,x,s),i(e,q,s),i(e,S,s),j(D,e,s),z=!0},p(e,[t]){e[0]?H?I(H,1):(H=be(),H.c(),I(H,1),H.m(w.parentNode,w)):H&&(C={r:0,c:[],p:C},A(H,1,1,(()=>{H=null})),C.r||n(C.c),C=C.p)},i(e){z||(I(k.$$.fragment,e),I(T.$$.fragment,e),I(E.$$.fragment,e),I(L.$$.fragment,e),I(N.$$.fragment,e),I(H),I(P.$$.fragment,e),I(D.$$.fragment,e),z=!0)},o(e){A(k.$$.fragment,e),A(T.$$.fragment,e),A(E.$$.fragment,e),A(L.$$.fragment,e),A(N.$$.fragment,e),A(H),A(P.$$.fragment,e),A(D.$$.fragment,e),z=!1},d(e){l(t),e&&l(r),W(k,e),e&&l(a),W(T,e),e&&l(u),W(E,e),e&&l(p),e&&l(f),e&&l(v),W(L,e),e&&l(g),e&&l(h),e&&l($),W(N,e),e&&l(_),H&&H.d(e),e&&l(w),e&&l(y),e&&l(b),W(P,e),e&&l(x),e&&l(q),e&&l(S),W(D,e)}}}function qe(e,t,s){let{ready:n}=t;return e.$set=e=>{"ready"in e&&s(0,n=e.ready)},[n]}const Se=new class extends N{constructor(e){super(),L(this,e,qe,xe,a,{ready:0})}}({target:document.body,props:{ready:!1}});return window.initMap=function(){Se.$set({ready:!0})},Se}();
//# sourceMappingURL=bundle.js.map
