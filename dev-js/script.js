var typed;

// Changes the text of the typed.js
function changeTyped(text1,text2) {
	typed.destroy();
		typed = new Typed(".typed", {
		strings: [text1, text2],
		typeSpeed: 70,
		loop: true,
		startDelay: 1000,
		showCursor: false
	});
};

// Highlights the languages menu if clicked
$(window).on("load", function() {

	$(".loader .inner").fadeOut(500, function() {
		$(".loader").fadeOut(750);
	});

});

function iso(selector) {
	$(".items").isotope({
		filter: selector,
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});
}

window.onload = function() {
	// this will fire after the entire page is loaded, including images
	// Calling isotope directly after pageload with all the elements
	iso('*');
};

// Setup plugins if the page is loaded
$(document).ready(function(e) {

	// Setup superslides 
	$('#slides').superslides({
		animation: 'fade',
		play: 3000,
		pagination: false
	});

	typed = new Typed(".typed", {
		strings: ["Angestrebtes Studium:", "angewandte Informatik"],
		typeSpeed: 70,
		loop: true,
		startDelay: 1000,
		showCursor: false
	});

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    items: 4,
	    autoplay:true,
		autoplayTimeout:1750,
		autoplayHoverPause:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        480:{
	            items:2
	        },
	        768:{
	            items:3
	        },
	        938:{
	            items:4
	        }
	    }
	});

	// Setup 'easyPieChart' and 'countUp' plugins

	var skillsTopOffset = $(".skillsSection").offset().top;
	var statsTopOffset = $(".statsSection").offset().top;
	var countUpFinished = false;

	// Start them after scrolling there
	$(window).scroll(function() {

		if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

			$('.chart').easyPieChart({
		        easing: 'easeInOut',
		        barColor: '#fff',
		        trackColor: false,
		        scaleColor: false,
		        lineWidth: 6,
		        size: 152,
		        onStep: function(from, to, percent) {
		        	$(this.el).find('.percent').text(Math.round(percent));
		        }
		    });

		}

		if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
			$(".counter").each(function() {
				var element = $(this);
				var endVal = parseInt(element.text());

				element.countup(endVal);
			})

			countUpFinished = true;
		}

	});

	$("[data-fancybox]").fancybox();

	// setup isotope
	
	$("#filters a").click(function() {

		$("#filters .current").removeClass("current");
		$(this).addClass("current");

		var selector = $(this).attr("data-filter");

		iso(selector);

		return false;

	});

	// Handling the navigation bar item clicked event
	$("#navigation a").click(function(e) {
		e.preventDefault();

		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
		$("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");

	});

	// Make the navigation bar "sticky"
	const nav = $("#navigation");
	const navTop = nav.offset().top;

	$('.js--nav').waypoint(function(direction) {

        const body = $("html, body");

        if (direction == "down") {
			body.css("padding-top", nav.outerHeight()/2 + "px");
            body.addClass("fixedNav");
        } else {
			body.css("padding-top", 0);
			body.removeClass("fixedNav");
        }

    }, {
        offset: '0px;'
    });

	// Initialize the msDropdown for the languages menu
	try {
		$("#languages").msDropdown({});
	} catch(e) {
		alert(e.message);
	};

	// Highlight the languages menu if clicked
	function langMenuClick() {
		$("#languages, .ddChild").click(function() {
				$(".dd .ddTitle").toggleClass("highlighted");
		});
	};

	langMenuClick();
	
	// Initialize the languages
	rT().addLang('de', DE())
		.addLang('en', EN())
		.addLang('hu', HU())
		.setLanguage('#languages');
		changeTyped(rT().getTyped('#languages')[0], rT().getTyped('#languages')[1]);
	// Languages selection changed listener
    $("#languages").change(function(){
        rT().setLanguage('#languages');
        changeTyped(rT().getTyped('#languages')[0], rT().getTyped('#languages')[1]);
    });

});