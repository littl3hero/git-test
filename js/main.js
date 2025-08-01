const menu = document.querySelector('.menu');
const burger = document.querySelector('.menu-button');
const search = document.querySelector('.search');
const searchForm = document.querySelector('.search-form');
const hiddenForSearch = document.querySelector('.overflow-hidden-search');
const hidden = document.querySelector('.overflow-hidden');
const header = document.querySelector('.nav');
const subMenu = document.querySelector('.sub-menu');
const thisOpener = document.querySelector('.has-children-icon');
const closerOpener = document.querySelector('.has-children-icon.active');
const thisLi = document.querySelector('.menu-item-has-children');
const searchButton = document.querySelector('.search');
const breakpoint = window.matchMedia("(max-width: 767px)");
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
const updateBreakpoint = () => {
    const breakpoint = window.matchMedia("(max-width: 767px)");
};
breakpoint.addEventListener('change', updateBreakpoint);

if(isMobile.any()){
	document.body.classList.add('mobile');
    document.body.addEventListener('click', function (e) {
    if (!e.target.closest('.has-children-icon') && !breakpoint.matches) {
        subMenu.classList.remove('active');
        thisOpener.classList.remove('active');
        thisLi.classList.remove('active');
    }
});
}else{
	document.body.classList.add('not-mobile');
}
const subMenuFunction = () => {
    const openerMenu=document.querySelectorAll('.has-children-icon');
        for(i=0; i<openerMenu.length; i++){
            let subMenu=openerMenu[i].nextElementSibling;
            let thisOpener=openerMenu[i];
            let thisLi = openerMenu[i].parentElement;
            openerMenu[i].addEventListener('click', function(){
                if ((document.body.classList.contains('not-mobile') && breakpoint.matches && !subMenu.classList.contains('active')) || (document.body.classList.contains('mobile') && !subMenu.classList.contains('active'))) {
                    subMenu.classList.add('active');
                    thisOpener.classList.add('active');
                    thisLi.classList.add('active');
                } else {
                    subMenu.classList.remove('active');
                    thisOpener.classList.remove('active');
                    thisLi.classList.remove('active');
                }
            });
        };
};
subMenuFunction();
const insertEventListenersFooter = () => {
    let titleContainers=document.querySelectorAll('.h2-footer-mobile');
	for(i=0; i<titleContainers.length; i++){
        let thisOpener=titleContainers[i].lastElementChild;
		let linksMenu=titleContainers[i].nextElementSibling;
		thisOpener.addEventListener('click', function(){
            thisOpener.classList.toggle('active');
			linksMenu.classList.toggle('active');
		});
};
};
insertEventListenersFooter();
const countHeightHeader = () => {
    headerMetrics = header.getBoundingClientRect();
    finalHeaderMetrics = headerMetrics.top + headerMetrics.height
    menu.style.height += "calc(100% - "+finalHeaderMetrics+"px)";
};
burger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!menu.classList.contains('active')) {
        countHeightHeader();
        menu.classList.toggle('active');
        burger.classList.toggle('active');
        hidden.classList.toggle('active');
        document.body.classList.toggle('lock');
    } else {
        menu.classList.remove('active');
        burger.classList.remove('active');
        hidden.classList.remove('active');
        document.body.classList.remove('lock');
        let deleteTimeout = setTimeout(function() {
            menu.removeAttribute('style');
            deleteTimeout = clearTimeout(deleteTimeout);
        }, 200);
    }
})
search.addEventListener('click', (e) => {
    e.stopPropagation();
    searchForm.classList.toggle('active');
    hiddenForSearch.classList.toggle('active');
    document.body.classList.toggle('lock-for-search');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        burger.classList.remove('active');
        hidden.classList.remove('active');
        document.body.classList.remove('lock');
        let deleteTimeout = setTimeout(function() {
        menu.removeAttribute('style');
        deleteTimeout = clearTimeout(deleteTimeout);
        }, 200);
    }
});
hiddenForSearch.addEventListener('click', (e) => {
    e.stopPropagation();
    searchForm.classList.remove('active');
    hiddenForSearch.classList.remove('active');
    document.body.classList.remove('lock-for-search');
});
hidden.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.remove('active');
    burger.classList.remove('active');
    hidden.classList.remove('active');
    document.body.classList.remove('lock');
    let deleteTimeout = setTimeout(function() {
        menu.removeAttribute('style');
        deleteTimeout = clearTimeout(deleteTimeout);
    }, 200);
});





const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const pagination = document.querySelector('.pagination');

let currentIndex = 0;
const totalSlides = slides.length;
let isTransitioning = false;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

sliderWrapper.appendChild(firstClone);
sliderWrapper.insertBefore(lastClone, slides[0]);
sliderWrapper.style.transform = `translateX(-100%)`;

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  pagination.appendChild(dot);
}

const updatePagination = () => {
  const adjustedIndex = currentIndex % totalSlides;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === adjustedIndex);
  });
};

// Переключение слайдов
const updateSlider = () => {
  if (isTransitioning) return;
  isTransitioning = true;

  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  sliderWrapper.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

  sliderWrapper.addEventListener('transitionend', () => {
    isTransitioning = false;

    if (currentIndex === totalSlides) {
      sliderWrapper.style.transition = 'none';
      currentIndex = 0; // Перемещаемся на первый слайд
      sliderWrapper.style.transform = `translateX(-100%)`;
    }
    if (currentIndex === -1) {
      sliderWrapper.style.transition = 'none';
      currentIndex = totalSlides - 1; // Перемещаемся на последний слайд
      sliderWrapper.style.transform = `translateX(-${totalSlides * 100}%)`;
    }

    updatePagination(); // Убедимся, что пагинация обновлена
  });
};

const goToSlide = (index) => {
  if (isTransitioning) return;
  currentIndex = index;
  updateSlider();
};

rightArrow.addEventListener('click', () => {
  if (isTransitioning) return;
  currentIndex++;
  updateSlider();
});

leftArrow.addEventListener('click', () => {
  if (isTransitioning) return;
  currentIndex--;
  updateSlider();
});