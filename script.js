

/*


	+1) Замени все createElement на простые текстовые шаблоны. Когда ты добавишь их в dom - они станут элементами, которые можно удалить.
	2) Удали счетчик, при первой загзрузке проверяй files.lenght, во все последующие проверяй queue.length


*/




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

	imageArray.forEach(function(src, i) {


		var constructorItem = `<li data-id="`+ i +`" class="droparea__item"><img src="`+ src +`"/></li>`,
			sliderItem = `<li data-id="`+ i +`" class="preview-slider__item dp-slide"><img src="`+ src +`"/></li>`;


		droplist.innerHTML += constructorItem;
		sliderList.innerHTML += sliderItem;

		// calculation width of slider
		slider.resetWidth();


		if (!droplist.classList.contains('active')) {
			droplist.classList.add('active');
		}

		droplist.querySelector('.droparea__item').addEventListener('click', function() {

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
	var li    = document.createElement('li'),
		input = document.createElement('input'),
		x     = document.createElement('i');

	// Constructor options

	li.classList.add('create-survey__item');
	li.setAttribute('data-id', optionConstructorList.children.length);

	x.classList.add('create-survey__delete-option');
	x.innerHTML = 'delete option';

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


