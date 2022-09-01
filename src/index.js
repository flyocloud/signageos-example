
require('./index.css');
import sos from '@signageos/front-applet';
import Init from './init';

console.log('start')
// Wait on sos data are ready (https://docs.signageos.io/api/sos-applet-api/#onReady)
sos.onReady().then(async function () {
	console.log('ready')
	const loader = new Init(sos)
	const slides = await loader.getSlides()

	// hide loading dialog
	const contentElement = document.getElementById('loader');
	contentElement.style.display = 'none'

	/*
	<div id="slider-container">

		<!-- slides -->
		<div class="slide [fade effect]">
			<div class="qrcode-container">
				<img class="qrcode-image" src="#" />
			</div>
			<img src="..." />
			<div class="footer">
				<div class="title">Mein title</div>
				<div class="teaser">Mein Teaser</div>
			</div>
		</div>
	</div>
	*/

	// create image divs in slider container
	const slider = document.getElementById('slider-container')
	slides.forEach((item,index) => {
		var sliderDiv = document.createElement("div");
		sliderDiv.className = 'slide'
		sliderDiv.id = 'slide-' + index;
		sliderDiv.dataset.metric = item.metric;

		// qrcode div
		var qrcodeContainer = document.createElement('div')
		qrcodeContainer.className = 'qrcode-container'
		sliderDiv.appendChild(qrcodeContainer)

		// image
		var image = document.createElement('img');
		image.src = item.filePath
		image.class = 'slide-image'
		sliderDiv.appendChild(image)

		// items footer element
		var footer = document.createElement('div')
		footer.className = 'footer'
		sliderDiv.appendChild(footer)

		// title
		if (item.title && item.title.length > 0) {
			var title = document.createElement('div')
			title.className = 'title'
			title.innerHTML = item.title
			footer.appendChild(title)
		}

		// teaser
		if (item.teaser && item.teaser.length > 0) {
			var teaser = document.createElement('div')
			teaser.className = 'teaser'
			teaser.innerHTML = item.teaser
			footer.appendChild(teaser)
		}

		// qrcode
		if (item.qrcode && item.qrcode.length > 0) {
			var qrcodeimage = document.createElement('img')
			qrcodeimage.src = item.qrcode
			qrcodeimage.class = 'qrcode-image'
			qrcodeContainer.appendChild(qrcodeimage)
		}

		slider.appendChild(sliderDiv);
	})

	var SLIDEINDEX = 0;

	showSlides(SLIDEINDEX);

	// creating function for showing slides
	function showSlides(index){
		// lets select all the slides and dots using querySelectorAll method
		var slides = document.querySelectorAll(".slide");
		// if slide index value is greater than length of slides then jump to 1st slide
		if (index >= slides.length){
			SLIDEINDEX = 0;
		// if we want to jump at the last of the slide incase the user is at the first one
		} else if (index < 0) {
			SLIDEINDEX = slides.length - 1;
		} else{
			SLIDEINDEX = SLIDEINDEX;
		}
		// before showing slides we must hide all the slides and remove active-dots class using for loop
		for (var i = 0; i < slides.length; i++){
			// hide slide elements
			slides[i].style.display = "none";
			slides[i].classList.remove('effect')
			slides[i].classList.remove('fade')
		}
		// show the slide we want and set the dot class active-dot
		slides[SLIDEINDEX].style.display = "block";
		slides[SLIDEINDEX].classList.add("effect");
		slides[SLIDEINDEX].classList.add("fade");

		//axios.get(slides[SLIDEINDEX].dataset.metric)
	};

	setInterval(function(){
		showSlides(++SLIDEINDEX);
	}, loader.getTimeout());
});