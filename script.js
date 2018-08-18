/*

	Plan:
		1) React render text - done
		2) Droparea
		6) Add and remove images in slider
		8) To check the number of images. Should not more ten images.
		9) Add survey
		10) Add option survey
		11) Add options in preview
		12) Delete option from list survey and from list in preview

*/


/*

	Code point:
		1. Render text
		2. Droparea interactive

*/





/*

	1. Render text

*/


var inputsType = document.querySelectorAll('.js-typeText');

inputsType.forEach(function(item) {
   var selector = item.getAttribute('data-target'),
       typeElem = document.querySelector(selector),
       oldContent = typeElem.innerHTML;

   item.addEventListener('keyup', function() {
      typeElem.innerHTML = item.value;

      if (!item.value.length) {
         typeElem.innerHTML = oldContent;
      }
   });
});






/*

	2. Droparea interactive

*/

var dropzone = document.querySelector('#dropzone'),
	droplist = document.querySelector('#droplist'),
	sliderList = document.querySelector('#preview-slider-list'),
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






/*

	DROP EVENT

*/


dropzone.addEventListener('drop', function(e) {
	var files = e.dataTransfer.files,
		file;

		Object.keys(files).forEach(function(item, i) {
			file = files[i];
			handleImage(file);
		});

		console.log(queue);
		console.log(queue.length)


		// if (queue.length > 10) {
		// 	alert('Можно добавить только 10 изображений');
		// 	return false;
		// }

});




/*

	Handle image: add, remove in list and slider

*/


function handleImage(file) {

	var reader =  new FileReader();

	reader.onload = function (e) {
		queue.push(e.target.result);
		renderImageList(queue); // массив
	};

	reader.readAsDataURL(file);



}

function renderImageList(imageArray) {

	droplist.innerHTML = '';
	sliderList.innerHTML = '';

	imageArray.forEach(function(item, i) {

		var constructorItem = document.createElement('li'),
			sliderItem = document.createElement('li');


		var img = document.createElement('img');
		img.src = item;

		var img2 = img.cloneNode();

		constructorItem.setAttribute('data-id', i);
		sliderItem.setAttribute('data-id', i);

		constructorItem.classList.add('droparea__item');
		sliderItem.classList.add('preview-slider__item');

		constructorItem.appendChild(img);
		sliderItem.appendChild(img2);

		droplist.appendChild(constructorItem);
		sliderList.appendChild(sliderItem);

		if (!droplist.classList.contains('active')) {
			droplist.classList.add('active');
		}
	});
}







function removeImage(file, queue, li) {

	queue = queue.filter(function(item){
		return item.file != file;
	});

	li.parentNode.removeChild(li);

}
