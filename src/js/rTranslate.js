!function(t){var e=function(){return new e.init},n=function(t){var e=document.querySelectorAll(t);return e=Array.prototype.slice.call(e)},r=[];e.prototype={addLang:function(t,e){return r[t]=e,this},setLanguage:function(t){var e,o=document.querySelector(t),i=o.options[o.selectedIndex].getAttribute("id"),a=r[i],u=n('option[name="translate"]');e=u.map(function(t){return t.id}),n(".ddlabel").forEach(function(t,n){t.setAttribute("name","translate"),t.setAttribute("caption",e[n-1])}),n('[name="translate"]').forEach(function(t){var e=a[t.getAttribute("caption")];t.textContent=e,t.setAttribute("data-title",e)})},getTyped:function(t){var e=document.querySelector(t),n=e.options[e.selectedIndex].getAttribute("id"),o=r[n],i=[];return i[0]=o.typed1,i[1]=o.typed2,i}},e.init=function(){},e.init.prototype=e.prototype,t.rTranslate=t.rT=e}(this);