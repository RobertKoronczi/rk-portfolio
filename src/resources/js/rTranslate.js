!function(t){var e=function(){return new e.init},r=function(t){var e=document.querySelectorAll(t);return e=Array.prototype.slice.call(e)},n=[];e.prototype={addLang:function(t,e){return n[t]=e,this},setLanguage:function(t){var e,o=document.querySelector(t),i=o.options[o.selectedIndex].getAttribute("id"),a=n[i],u=r('option[data-rT="rT"]');e=u.map(function(t){return t.id}),r(".ddlabel").forEach(function(t,r){t.setAttribute("data-rT","rT"),t.setAttribute("data-rT-text",e[r-1]||e[r])}),r('[data-rT="rT"]').forEach(function(t){var e=a[t.getAttribute("data-rT-text")];t.textContent=e,t.setAttribute("data-title",e)})},getTyped:function(t){var e=document.querySelector(t),r=e.options[e.selectedIndex].getAttribute("id"),o=n[r],i=[];return i[0]=o.typed1,i[1]=o.typed2,i}},e.init=function(){},e.init.prototype=e.prototype,t.rTranslate=t.rT=e}(this);