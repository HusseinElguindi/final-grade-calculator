var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function l(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(e,t){e.appendChild(t)}function i(e,t,n){e.insertBefore(t,n||null)}function o(e){e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function g(){return u(" ")}function f(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function d(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function p(e){return""===e?null:+e}function h(e,t){e.value=null==t?"":t}let m;function v(e){m=e}const k=[],$=[],b=[],y=[],_=Promise.resolve();let x=!1;function w(e){b.push(e)}let M=!1;const T=new Set;function E(){if(!M){M=!0;do{for(let e=0;e<k.length;e+=1){const t=k[e];v(t),L(t.$$)}for(v(null),k.length=0;$.length;)$.pop()();for(let e=0;e<b.length;e+=1){const t=b[e];T.has(t)||(T.add(t),t())}b.length=0}while(k.length);for(;y.length;)y.pop()();x=!1,M=!1,T.clear()}}function L(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(w)}}const H=new Set;function A(e,t){-1===e.$$.dirty[0]&&(k.push(e),x||(x=!0,_.then(E)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function C(r,a,i,c,u,g,f=[-1]){const d=m;v(r);const p=a.props||{},h=r.$$={fragment:null,ctx:null,props:g,update:e,not_equal:u,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:f,skip_bound:!1};let k=!1;if(h.ctx=i?i(r,p,((e,t,...n)=>{const s=n.length?n[0]:t;return h.ctx&&u(h.ctx[e],h.ctx[e]=s)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](s),k&&A(r,e)),t})):[],h.update(),k=!0,s(h.before_update),h.fragment=!!c&&c(h.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);h.fragment&&h.fragment.l(e),e.forEach(o)}else h.fragment&&h.fragment.c();a.intro&&(($=r.$$.fragment)&&$.i&&(H.delete($),$.i(b))),function(e,n,r){const{fragment:a,on_mount:i,on_destroy:o,after_update:c}=e.$$;a&&a.m(n,r),w((()=>{const n=i.map(t).filter(l);o?o.push(...n):s(n),e.$$.on_mount=[]})),c.forEach(w)}(r,a.target,a.anchor),E()}var $,b;v(d)}function N(t){let n,l,r,m,v,k,$,b,y,_,x,w,M,T,E,L,H,A,C,N,G,O,j,S,B,F,I,P,W,q,D,Y,z,J,K,Q,R,U,V,X,Z,ee=0===t[3]?"Anything":t[5]+"%";return{c(){n=g(),l=c("main"),r=c("header"),r.innerHTML='<h1 class="svelte-g7nikg">Final Grade Calculator</h1>',m=g(),v=c("section"),k=c("form"),$=c("table"),b=c("tr"),y=c("td"),y.innerHTML='<p class="svelte-g7nikg">My current grade is</p>',_=g(),x=c("td"),w=c("input"),M=g(),T=c("td"),T.innerHTML='<p class="svelte-g7nikg">%</p>',E=g(),L=c("tr"),H=c("td"),H.innerHTML='<p class="svelte-g7nikg">The grade I want is</p>',A=g(),C=c("td"),N=c("input"),G=g(),O=c("td"),O.innerHTML='<p class="svelte-g7nikg">%</p>',j=g(),S=c("tr"),B=c("td"),B.innerHTML='<p class="svelte-g7nikg">My final is worth</p>',F=g(),I=c("td"),P=c("input"),W=g(),q=c("td"),q.innerHTML='<p class="svelte-g7nikg">%</p>',D=g(),Y=c("section"),z=c("h1"),J=u("Your must score at least "),K=c("span"),Q=u(ee),R=u("!"),U=g(),V=c("footer"),V.innerHTML='<a href="https://HusseinElguindi.github.io" target="_blank" rel="noopener noreferrer" class="svelte-g7nikg"><p class="svelte-g7nikg">Hussein Elguindi</p></a>',document.title="Final Grade Calculator",d(r,"class","svelte-g7nikg"),d(y,"class","svelte-g7nikg"),d(w,"name","currGrade"),d(w,"type","number"),d(w,"label","Current grade"),d(w,"class","grade svelte-g7nikg"),d(w,"placeholder","0"),d(w,"autocomplete","off"),d(x,"class","svelte-g7nikg"),d(T,"class","svelte-g7nikg"),d(b,"class","svelte-g7nikg"),d(H,"class","svelte-g7nikg"),d(N,"name","wantGrade"),d(N,"type","number"),d(N,"label","Target grade"),d(N,"class","grade svelte-g7nikg"),d(N,"placeholder","0"),d(N,"autocomplete","off"),d(C,"class","svelte-g7nikg"),d(O,"class","svelte-g7nikg"),d(L,"class","svelte-g7nikg"),d(B,"class","svelte-g7nikg"),d(P,"name","finalWeight"),d(P,"type","number"),d(P,"label","Worth of final"),d(P,"class","grade svelte-g7nikg"),d(P,"placeholder","0"),d(P,"autocomplete","off"),d(I,"class","svelte-g7nikg"),d(q,"class","svelte-g7nikg"),d(S,"class","svelte-g7nikg"),d($,"class","form svelte-g7nikg"),d(v,"class","main svelte-g7nikg"),d(K,"class","grade svelte-g7nikg"),d(z,"class","svelte-g7nikg"),d(Y,"class","result svelte-g7nikg"),d(V,"class","svelte-g7nikg"),d(l,"class","svelte-g7nikg")},m(e,s){i(e,n,s),i(e,l,s),a(l,r),a(l,m),a(l,v),a(v,k),a(k,$),a($,b),a(b,y),a(b,_),a(b,x),a(x,w),h(w,t[0]),a(b,M),a(b,T),a($,E),a($,L),a(L,H),a(L,A),a(L,C),a(C,N),h(N,t[1]),a(L,G),a(L,O),a($,j),a($,S),a(S,B),a(S,F),a(S,I),a(I,P),h(P,t[2]),a(S,W),a(S,q),t[10](k),a(l,D),a(l,Y),a(Y,z),a(z,J),a(z,K),a(K,Q),a(z,R),a(l,U),a(l,V),X||(Z=[f(w,"keydown",t[6]),f(w,"input",t[7]),f(N,"keydown",t[6]),f(N,"input",t[8]),f(P,"keydown",t[6]),f(P,"input",t[9])],X=!0)},p(e,[t]){1&t&&p(w.value)!==e[0]&&h(w,e[0]),2&t&&p(N.value)!==e[1]&&h(N,e[1]),4&t&&p(P.value)!==e[2]&&h(P,e[2]),40&t&&ee!==(ee=0===e[3]?"Anything":e[5]+"%")&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(Q,ee)},i:e,o:e,d(e){e&&o(n),e&&o(l),t[10](null),X=!1,s(Z)}}}function G(e,t,n){let s,l,r,a,i;let o;return e.$$.update=()=>{var t;4&e.$$.dirty&&n(3,s=i?i/100:0),11&e.$$.dirty&&n(5,(t=((a||0)-(1-s)*(r||0))/s,l=Math.round(100*(t+Number.EPSILON))/100))},[r,a,i,s,o,l,e=>{let t="Backspace"===e.code&&e.target.value.length<=0,n="Enter"===e.code;if(!t&&!n)return;let s=-1;for(let t=0;t<o.elements.length;t++)if(o.elements[t].name===e.target.name){s=t;break}if(!(s<0))if(n){if(++s>=o.elements.length)return void e.target.blur();o.elements[s].focus()}else t&&--s>=0&&(o.elements[s].focus(),e.preventDefault())},function(){r=p(this.value),n(0,r)},function(){a=p(this.value),n(1,a)},function(){i=p(this.value),n(2,i)},function(e){$[e?"unshift":"push"]((()=>{o=e,n(4,o)}))}]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),C(this,e,G,N,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
