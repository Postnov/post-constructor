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

		Object.keys(files).forEach(function(item, i, arr) {		
			var reader = new FileReader();
			file = files[i];
			handleImage(file, queue);
		});

		if (queue.length > 10) alert('Можно добавить только 10 изображений')

});




/*

	Handle image: add, remove in list and slider

*/


function handleImage(file, files) {

	var reader =  new FileReader();


	if(queue.length < 10) {

		reader.onload = function(e) {
			var imageElem = `<li class="droparea__item">
								<img src="`+ e.target.result +`" alt="" class="droparea__img">
							</li>`,
				sliderImage =  `<li class="preview-slider__item">
							      <img src="`+ e.target.result +`" alt="" class="preview-slider__img">
								</li>`;



			droplist.innerHTML += imageElem;
			sliderList.innerHTML += sliderImage;

			if (!droplist.classList.contains('active')) {
				droplist.classList.add('active');
			}

			queue.push({file: file});

	        droplist.querySelectorAll('.droparea__item').forEach(function(item) {
	        	item.addEventListener('click', function(e) {
		            e.preventDefault();
		            console.log(queue);
		            removeImage(file, queue, e.target);
	        	});
	    	});	

	    	
		};  


		reader.readAsDataURL(file);

	}
}



function removeImage(file, queue, li) {

	queue = queue.filter(function(item){
		return item.file != file;
	});

	console.log(queue);
	li.parentNode.removeChild(li);

}
