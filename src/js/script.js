var typed;function changeTyped(e,t){typed.destroy(),typed=new Typed(".typed",{strings:[e,t],typeSpeed:70,loop:!0,startDelay:1e3,showCursor:!1})}$(window).on("load",function(){$(".loader .inner").fadeOut(500,function(){$(".loader").fadeOut(750)})}),$(document).ready(function(e){$("#slides").superslides({animation:"fade",play:3e3,pagination:!1}),typed=new Typed(".typed",{strings:["Angestrebtes Studium:","angewandte Informatik"],typeSpeed:70,loop:!0,startDelay:1e3,showCursor:!1}),$(".owl-carousel").owlCarousel({loop:!0,items:4,autoplay:!0,autoplayTimeout:1750,autoplayHoverPause:!0,responsive:{0:{items:1},480:{items:2},768:{items:3},938:{items:4}}});var t=$(".skillsSection").offset().top,a=$(".statsSection").offset().top,n=!1;$(window).scroll(function(){window.pageYOffset>t-$(window).height()+200&&$(".chart").easyPieChart({easing:"easeInOut",barColor:"#fff",trackColor:!1,scaleColor:!1,lineWidth:6,size:152,onStep:function(e,t,a){$(this.el).find(".percent").text(Math.round(a))}}),!n&&window.pageYOffset>a-$(window).height()+200&&($(".counter").each(function(){var e=$(this),t=parseInt(e.text());e.countup(t)}),n=!0)}),$("[data-fancybox]").fancybox(),jQuery(function(){var e=jQuery(".items");e.imagesLoaded(function(){e.isotope({itemSelector:".grid-item",sortBy:"random"})})}),$("#filters a").click(function(){$("#filters .current").removeClass("current"),$(this).addClass("current");var e=$(this).attr("data-filter");return $(".items").imagesLoaded(function(){$(".items").isotope({filter:e,animationOptions:{duration:1500,easing:"linear",queue:!1}})}),!1}),$("#navigation a").click(function(e){e.preventDefault();var t=$(this).attr("href"),a=$(t).offset().top;$("html, body").animate({scrollTop:a-50},"slow")});const o=$("#navigation"),i=o.offset().top;$(window).on("scroll",function(){const e=$("body");$(window).scrollTop()>=i?(e.css("padding-top",o.outerHeight()+"px"),e.addClass("fixedNav")):(e.css("padding-top",0),e.removeClass("fixedNav"))});try{$("#languages").msDropdown({})}catch(e){alert(e.message)}$("#languages, .ddChild").click(function(){$(".dd .ddTitle").toggleClass("highlighted")}),rT().addLang("de",DE()).addLang("en",EN()).addLang("hu",HU()).setLanguage("#languages"),$("#languages").change(function(){rT().setLanguage("#languages"),changeTyped(rT().getTyped("#languages")[0],rT().getTyped("#languages")[1])})});