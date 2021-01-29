var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function o(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function i(t){return document.createTextNode(t)}function p(){return i(" ")}function f(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function d(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function x(t){return""===t?null:+t}function y(t,e){t.value=null==e?"":e}let h;function v(t){h=t}const $=[],g=[],k=[],m=[],z=Promise.resolve();let b=!1;function _(t){k.push(t)}let M=!1;const T=new Set;function H(){if(!M){M=!0;do{for(let t=0;t<$.length;t+=1){const e=$[t];v(e),L(e.$$)}for(v(null),$.length=0;g.length;)g.pop()();for(let t=0;t<k.length;t+=1){const e=k[t];T.has(e)||(T.add(e),e())}k.length=0}while($.length);for(;m.length;)m.pop()();b=!1,M=!1,T.clear()}}function L(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const E=new Set;function w(t,e){-1===t.$$.dirty[0]&&($.push(t),b||(b=!0,z.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function A(r,o,a,u,i,p,f=[-1]){const d=h;v(r);const x=o.props||{},y=r.$$={fragment:null,ctx:null,props:p,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:f,skip_bound:!1};let $=!1;if(y.ctx=a?a(r,x,((t,e,...n)=>{const s=n.length?n[0]:e;return y.ctx&&i(y.ctx[t],y.ctx[t]=s)&&(!y.skip_bound&&y.bound[t]&&y.bound[t](s),$&&w(r,t)),e})):[],y.update(),$=!0,s(y.before_update),y.fragment=!!u&&u(y.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);y.fragment&&y.fragment.l(t),t.forEach(c)}else y.fragment&&y.fragment.c();o.intro&&((g=r.$$.fragment)&&g.i&&(E.delete(g),g.i(k))),function(t,n,r){const{fragment:o,on_mount:a,on_destroy:c,after_update:u}=t.$$;o&&o.m(n,r),_((()=>{const n=a.map(e).filter(l);c?c.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(_)}(r,o.target,o.anchor),H()}var g,k;v(d)}function C(e){let n,l,r,h,v,$,g,k,m,z,b,_,M,T,H,L,E,w,A,C,j,F,N,O,G,S,q,B,I,P,Y,D,J,K,Q,R,U,V,W,X,Z=0===e[3]?"Anything":e[4]+"%";return{c(){n=p(),l=u("main"),r=u("header"),r.innerHTML='<h1 class="svelte-pxxkzy">Final Grade Calculator</h1>',h=p(),v=u("section"),$=u("table"),g=u("tr"),k=u("td"),k.innerHTML='<p class="svelte-pxxkzy">My current grade is</p>',m=p(),z=u("td"),b=u("input"),_=p(),M=u("td"),M.innerHTML='<p class="svelte-pxxkzy">%</p>',T=p(),H=u("tr"),L=u("td"),L.innerHTML='<p class="svelte-pxxkzy">The grade I want is</p>',E=p(),w=u("td"),A=u("input"),C=p(),j=u("td"),j.innerHTML='<p class="svelte-pxxkzy">%</p>',F=p(),N=u("tr"),O=u("td"),O.innerHTML='<p class="svelte-pxxkzy">My final is worth</p>',G=p(),S=u("td"),q=u("input"),B=p(),I=u("td"),I.innerHTML='<p class="svelte-pxxkzy">%</p>',P=p(),Y=u("section"),D=u("h1"),J=i("Your must score at least "),K=u("span"),Q=i(Z),R=i("!"),U=p(),V=u("footer"),V.innerHTML='<a href="https://HusseinElguindi.github.io" target="_blank" rel="noopener noreferrer" class="svelte-pxxkzy"><p class="svelte-pxxkzy">Hussein Elguindi</p></a>',document.title="Final Grade Calculator",d(r,"class","svelte-pxxkzy"),d(k,"class","svelte-pxxkzy"),d(b,"type","number"),d(b,"class","grade svelte-pxxkzy"),d(b,"placeholder","0"),d(z,"class","svelte-pxxkzy"),d(M,"class","svelte-pxxkzy"),d(g,"class","svelte-pxxkzy"),d(L,"class","svelte-pxxkzy"),d(A,"type","number"),d(A,"class","grade svelte-pxxkzy"),d(A,"placeholder","0"),d(w,"class","svelte-pxxkzy"),d(j,"class","svelte-pxxkzy"),d(H,"class","svelte-pxxkzy"),d(O,"class","svelte-pxxkzy"),d(q,"type","number"),d(q,"class","grade svelte-pxxkzy"),d(q,"placeholder","0"),d(S,"class","svelte-pxxkzy"),d(I,"class","svelte-pxxkzy"),d(N,"class","svelte-pxxkzy"),d($,"class","form svelte-pxxkzy"),d(v,"class","main svelte-pxxkzy"),d(K,"class","grade svelte-pxxkzy"),d(D,"class","svelte-pxxkzy"),d(Y,"class","result svelte-pxxkzy"),d(V,"class","svelte-pxxkzy"),d(l,"class","svelte-pxxkzy")},m(t,s){a(t,n,s),a(t,l,s),o(l,r),o(l,h),o(l,v),o(v,$),o($,g),o(g,k),o(g,m),o(g,z),o(z,b),y(b,e[0]),o(g,_),o(g,M),o($,T),o($,H),o(H,L),o(H,E),o(H,w),o(w,A),y(A,e[1]),o(H,C),o(H,j),o($,F),o($,N),o(N,O),o(N,G),o(N,S),o(S,q),y(q,e[2]),o(N,B),o(N,I),o(l,P),o(l,Y),o(Y,D),o(D,J),o(D,K),o(K,Q),o(D,R),o(l,U),o(l,V),W||(X=[f(b,"input",e[5]),f(A,"input",e[6]),f(q,"input",e[7])],W=!0)},p(t,[e]){1&e&&x(b.value)!==t[0]&&y(b,t[0]),2&e&&x(A.value)!==t[1]&&y(A,t[1]),4&e&&x(q.value)!==t[2]&&y(q,t[2]),24&e&&Z!==(Z=0===t[3]?"Anything":t[4]+"%")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(Q,Z)},i:t,o:t,d(t){t&&c(n),t&&c(l),W=!1,s(X)}}}function j(t,e,n){let s,l,r,o,a;return t.$$.update=()=>{4&t.$$.dirty&&n(3,s=a?a/100:0),11&t.$$.dirty&&n(4,l=(((o||0)-(1-s)*(r||0))/s).toFixed(2))},[r,o,a,s,l,function(){r=x(this.value),n(0,r)},function(){o=x(this.value),n(1,o)},function(){a=x(this.value),n(2,a)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),A(this,t,j,C,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
