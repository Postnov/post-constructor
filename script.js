
/*==============================
		Start DP Slider
================================*/

function DPSlider (selector, options) {
	
	this.selector        = document.querySelector(selector) || document.querySelector('.dp-slider');
	this.options         = options || {};

	var slider           = this.selector,
	    sliderOldContent = this.selector.innerHTML,
	    sliderNewContent = '<div class="dp-slider__wrapper">' + sliderOldContent + '</div>';

		//wrap old content in my element
		this.selector.innerHTML = sliderNewContent;

	    var wrapperSlider = slider.querySelector('.dp-slider__wrapper'),
		slides            = wrapperSlider.children,
		sliderWidth        = 0,
		selectorWidth       = slider.clientWidth,

		//opitons
		slidePerView      = this.options.slidePerView || 1,
		dots              = this.options.dots || false,
		nav               = this.options.nav || false,
		navSpeed          = this.options.navSpeed || 500,

		translateWidth    = selectorWidth / slidePerView,
	    initialTranslate  = 0;



	//Each slides for set width slide and calc common width
	Object.keys(slides).forEach(function(i) {

		//get item width
		slides[i].style.width = (selectorWidth / slidePerView) + 'px';

		//calc width all slide
		sliderWidth += parseFloat(slides[i].style.width);
	});



	// Methods

	this.resetWidth = function() {
		sliderWidth = 0;

		//Each slides for set width slide and calc common width
		Object.keys(slides).forEach(function(i) {

			//get item width
			slides[i].style.width = (selectorWidth / slidePerView) + 'px';

			//calc width all slide
			sliderWidth += parseFloat(slides[i].style.width);
		});

		//set common width
		wrapperSlider.style.width = sliderWidth + 'px';		
	};


	this.translateToEnd = function() {
		var translateLast = parseFloat(wrapperSlider.style.width) - (selectorWidth / slidePerView);
		wrapperSlider.style.transform = "translateX(-"+ translateLast + "px)";
	}

	this.translateToStart = function() {
		initialTranslate = 0;
		wrapperSlider.style.transform = "translateX(-"+ 0 + "px)";
	}



	//set common width
	wrapperSlider.style.width = sliderWidth + 'px';


	//set transition duration
	wrapperSlider.style.transitionDuration = navSpeed + 'ms';


	//if parametr dots is true
	if (dots === true) {

		var dotsEl = document.createElement('div');
		dotsEl.classList.add('dp-slider__dots');



		Object.keys(slides).forEach(function(i) {
			//add dots
			var dotsBtn = document.createElement('button');
			dotsBtn.innerText = ++i;
			dotsEl.appendChild(dotsBtn);
		});

		slider.appendChild(dotsEl);


		/* Dots Translate */
		slider.querySelectorAll('.dp-slider__dots button').forEach(function(item) {

			item.addEventListener('click', function() {
				var translateDot = this.innerText * translateWidth;
				translateDot -= translateWidth;
				if (translateDot > wrapperSlider.style.width) {
					wrapperSlider.style.transform = "translateX(-"+ wrapperSlider.style.width +")";
				}else {
					wrapperSlider.style.transform = "translateX(-"+ translateDot + "px)";
				}

				initialTranslate = translateDot;
			});
		});			

	}//end condition dots


	//if parametr nav is true
	if (nav === true) {

		var navEl 	= document.createElement('div'),
		    prevEl  	= document.createElement('button'),
		    nextEl 	= document.createElement('button');
		
		navEl.classList.add('dp-slider__nav');
		prevEl.classList.add('dp-slider__prev');
		nextEl.classList.add('dp-slider__next');

		prevEl.innerHTML = 'prev';
		nextEl.innerHTML = 'next';

		navEl.appendChild(prevEl);
		navEl.appendChild(nextEl);
		slider.appendChild(navEl);

		//event next slide
		nextEl.addEventListener('click', function () {

			//the coordinates of the penultimate element
			var penultimateCoord = parseFloat(wrapperSlider.style.width) - translateWidth;

			if (+penultimateCoord.toFixed() > +initialTranslate.toFixed()) {
				initialTranslate += translateWidth;
				wrapperSlider.style.transform = "translateX(-"+ initialTranslate + "px)";
			}

		});			

		//event prev slide
		prevEl.addEventListener('click', function () {

			if (initialTranslate.toFixed() === translateWidth.toFixed()) {
				wrapperSlider.style.transform = "translateX(0px)";
				initialTranslate = 0;
			}else {
				if (initialTranslate > 0) initialTranslate -= translateWidth;
				wrapperSlider.style.transform = "translateX(-"+ initialTranslate + "px)";
			}

		});	

	}//end condition nav
};// end constructor



// Slider init
var slider = new DPSlider('.preview-slider__list', {
	dots: false,
	nav: true,
	sliderPerView: 1
});



/*==============================
		End DP Slider
================================*/





/*==============================
		Start Render text
================================*/


var inputsType = document.querySelectorAll('.js-typeText');

inputsType.forEach(function(item) {
   var selector = item.getAttribute('data-target'),
       typeElem = document.querySelector(selector),
       oldContent = typeElem.innerHTML;

   item.addEventListener('change', function() {
      typeElem.innerHTML = item.value;

      if (!item.value.length) {
         typeElem.innerHTML = oldContent;
      }
   });
});



/*==============================
		End Render text
================================*/




/*==============================
			Droparea
================================*/

var dropzone = document.querySelector('#dropzone'),
	droplist = document.querySelector('#droplist'),
	sliderList = document.querySelector('.dp-slider__wrapper'),
	queue = [],
	counterAmountFiles = 0;



// Prevent default drop document
;['drop', 'dragenter', 'dragleave', 'dragover'].forEach(function(eventName) {

	document.addEventListener(eventName, function(e) {
		e.preventDefault();
		e.stopPropagation();
	}, false)

});


// Add hightlight border
;['dragover', 'dragenter'].forEach(function(eventName) {

	dropzone.addEventListener(eventName, function() {
		this.classList.add('hightlight');
	});

});


// Remove hightlight border
;['dragleave', 'drop'].forEach(function(eventName) {

	dropzone.addEventListener(eventName, function() {
		this.classList.remove('hightlight');
	});

});



// get files from drop
dropzone.addEventListener('drop', function drop(e) {
	var files = e.dataTransfer.files;
	handleDropImage(files);
});


// get file from input type is file
document.querySelector('#fileElem').addEventListener('change', function() {
	var files = this.files;
	handleDropImage(files);
});


//conditions amount image
function handleDropImage(files) {
	if (counterAmountFiles <= 10) handleImage(files);

	if (counterAmountFiles >= 10 || (files.length > 10 && counterAmountFiles == 0)  ) alert('Нельзя загрузить больше 10 файлов');

	if (files.length > (10 - counterAmountFiles) && counterAmountFiles < 10 && counterAmountFiles > 0) {
		alert('Всего можно загрузить 10 файлов. Вы уже загрузили ' + counterAmountFiles + '.\nВы загружаете ' + files.length + ' файлов.\nИз вашей группы были загружены первые ' + (10 - counterAmountFiles) + ' файлов.');
	}
}



function handleImage(files) {

	for( file of files) {
		var reader =  new FileReader();

		reader.onload = function (e) {
			if (counterAmountFiles < 10) {
				queue.push(e.target.result);
				++counterAmountFiles;
				renderImageList(queue); // массив
			}else {
				reader.abort();
				return;
			}
		};

		reader.readAsDataURL(file);
	}

}



function renderImageList(imageArray) {

	droplist.innerHTML = '';
	sliderList.innerHTML = '';
	// document.querySelector('.dp-slider__wrapper').innerHTML = '';

	imageArray.forEach(function(src, i) {

		var constructorItem = document.createElement('li'),
			sliderItem = document.createElement('li');


		var img = document.createElement('img');
		img.src = src;

		var img2 = img.cloneNode();

		constructorItem.setAttribute('data-id', i);
		sliderItem.setAttribute('data-id', i);

		constructorItem.classList.add('droparea__item');
		sliderItem.classList.add('preview-slider__item');
		sliderItem.classList.add('dp-slide');

		constructorItem.appendChild(img);
		sliderItem.appendChild(img2);

		droplist.appendChild(constructorItem);
		//document.querySelector('.dp-slider__wrapper').appendChild(sliderItem)
		sliderList.appendChild(sliderItem);

		// calculation width of slider
		slider.resetWidth();


		if (!droplist.classList.contains('active')) {
			droplist.classList.add('active');
		}

		constructorItem.addEventListener('click', function() {

			--counterAmountFiles;

			var id = this.getAttribute('data-id');
			queue = queue.filter(function(item, i) {
				return i != +id;
			});

			renderImageList(queue);

			// translate to begin slider
			slider.translateToStart();

			if(droplist.children.length == 0) {
				droplist.classList.remove('active');
			};
		});

	});
}





/*

	Survey

*/


	var btnAddSurvey		  = document.querySelector('#add-survey'),
		btnDeleteSurvey       = document.querySelector('#delete-survey'),
		btnAddOption          = document.querySelector('#add-option'),

		previewSurvey         = document.querySelector('.preview__survey'),
		surveyContent         = document.querySelector('#survey-content'),
		surveyTitle           = document.querySelector('#title-survey'),
		surveyPreviewTitle    = document.querySelector('.preview-survey__title'),
		optionConstructorList = document.querySelector('.create-survey__list'),
		optionPreviewList     = document.querySelector('.preview-survey__list');

		

btnAddSurvey.addEventListener('click', (e) => {
	surveyContent.classList.remove('hidden');
	e.target.classList.add('hidden');
	previewSurvey.classList.remove('hidden');
});

btnDeleteSurvey.addEventListener('click', () =>  {
	surveyContent.classList.add('hidden');
	btnAddSurvey.classList.remove('hidden');
	previewSurvey.classList.add('hidden');

	surveyTitle.value = '';
	surveyPreviewTitle.innerHTML = '';
	optionConstructorList.innerHTML = '';
	optionPreviewList.innerHTML = '';
});


btnAddOption.addEventListener('click', () => {
	if (optionConstructorList.children.length < 5) {
		addOption();
	}else {
		alert('Можно добавить только 5 вариантов');
	}
});




function addOption() {
	var li    = document.createElement('li'),
		input = document.createElement('input'),
		x     = document.createElement('i');

	// Constructor options

	li.classList.add('create-survey__item');
	li.setAttribute('data-id', optionConstructorList.children.length);

	x.classList.add('create-survey__delete-option');
	x.innerHTML = 'x';

	input.setAttribute('data-id', optionConstructorList.children.length);
	input.setAttribute('placeholder', 'Option name');
	input.setAttribute('type', 'text');
	input.classList.add('create-survey__field');

	li.appendChild(input);
	li.appendChild(x);

	optionConstructorList.appendChild(li);

	x.addEventListener('click', (e) => {
		var id = e.target.parentNode.getAttribute('data-id'),
			li = optionConstructorList.querySelector('.create-survey__item[data-id="'+ id +'"'),
			label = optionPreviewList.querySelector('.preview-survey__label[data-id="'+ id +'"');

		optionConstructorList.removeChild(li);
		optionPreviewList.removeChild(label);
	});

	input.addEventListener('change', (e) => {
		var id = e.target.getAttribute('data-id'),
			radioElem = document.querySelector('.preview-survey__label[data-id="'+id+'"] span');

			console.log(id);
		
		radioElem.innerHTML = e.target.value;
	});



	//Preview options

	var label = document.createElement('label'),
		radio = document.createElement('input'),
		span = document.createElement('span');

	label.classList.add('preview-survey__label');
	radio.classList.add('preview-survey__radio');
	span.classList.add('preview-survey__label-text');

	label.setAttribute('for', 'option-' + optionPreviewList.children.length);
	label.setAttribute('data-id', optionPreviewList.children.length);
	
	radio.setAttribute('name', 'survey-answer');
	radio.id = 'option-' + optionPreviewList.children.length;
	radio.setAttribute('type', 'radio');

	label.appendChild(radio);
	label.appendChild(span);

	optionPreviewList.appendChild(label);
}


