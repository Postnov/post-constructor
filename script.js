/*==============================
		Start DP Slider
================================*/


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
	queue = [];


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

	if (files.length > 10 && queue.length === 0) {
		alert('Можно загрузить только 10 файлов.\nСейчас вы загружаете - ' + files.length + '.\nБудут загружены первые 10 файлов.');
	}else if (queue.length === 10) {
		alert('Можно загрузить только 10 файлов.\nСейчас в дропзоне уже 10 файлов');
	}else if (files.length + queue.length > 10) {
		alert('Можно загрузить только 10 файлов. Сейчас в дропзоне уже ' + queue.length + '.\nСейчас вы загружаете - ' + files.length + '.\nБудут загружены ' + (10 - queue.length) +' файлов.');
	}

	handleImage(files);
}



function handleImage(files) {

	Object.keys(files).forEach(function (file, index) {
		var reader =  new FileReader();

		reader.onload = function (e) {
			if (index < 10 && queue.length < 10) {
				queue.push(e.target.result);
				renderImageList(queue); // массив
			}else {
				reader.abort();
				return;
			}
		};

		reader.readAsDataURL(files[file]);
	});

}



function renderImageList(imageArray) {

	droplist.innerHTML = '';
	sliderList.innerHTML = '';

	imageArray.forEach(function(src, i) {
		var constructorItem = createElement('li', { 'data-id': i }, 'droparea__item'),
			sliderItem = createElement('li', { 'data-id': i }, 'preview-slider__item dp-slide'),
			constructorImg = createElement('img', {'data-id': i,'src': src}),
			sliderImg = constructorImg.cloneNode();


		constructorItem.appendChild(constructorImg);
		sliderItem.appendChild(sliderImg);


		droplist.appendChild(constructorItem);
		sliderList.appendChild(sliderItem);

		// calculation width of slider
		slider.resetWidth();


		if (!droplist.classList.contains('active')) {
			droplist.classList.add('active');
		}

		constructorItem.addEventListener('click', (e) => {

			var id = e.target.getAttribute('data-id');

			queue = queue.filter(function (item, i) {
				return i != +id;
			});

			renderImageList(queue);

			// translate to begin slider
			slider.translateToStart();

			if (droplist.children.length == 0) {
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
	surveyPreviewTitle.innerHTML = 'Input survey title';
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
	var optionsConsrLength = optionConstructorList.children.length,
		optionsPrevLength = optionPreviewList.children.length;

	var li = createElement('li', { 'data-id': optionsConsrLength}, 'create-survey__item'),
		input = createElement('input', { 'data-id': optionsConsrLength, 'placeholder': 'Option name' }, 'create-survey__field', 'text'),
		x = createElement('span', undefined, 'create-survey__delete-option', undefined, 'delete option');


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

		radioElem.innerHTML = e.target.value;
	});



	//Preview options

	var label = createElement('label', { 'data-id': optionsPrevLength, 'for': 'option-' + optionsPrevLength }, 'preview-survey__label'),
		radio = createElement('input', { 'data-id': optionsPrevLength, 'id': 'option-' + optionsPrevLength, 'name': 'survey-answer'}, 'preview-survey__radio', 'radio'),
		span = createElement('span', undefined, 'preview-survey__label-text');

	label.appendChild(radio);
	label.appendChild(span);

	optionPreviewList.appendChild(label);
}


function createElement(node, attr, classList, type, innerHtml) {
	var elem = document.createElement(node);

	if (attr) {
		Object.keys(attr).forEach((item) => {
			elem.setAttribute(item, attr[item])
		})
	}
	if (classList) elem.classList += classList;
	if (type) 	   elem.setAttribute('type', type);
	if (innerHtml) elem.innerHTML  = innerHtml;

	return elem;
}
