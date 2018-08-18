// RENDER TEXT

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
