// Slider 

const curNumSlide = document.querySelector('.welcome__slider-number');

let slider = tns({
    container: '.my-slider',
    items: 1,
    mouseDrag: true,
    slideBy: "page",
    swipeAngle: false,
    navContainer: '.welcome__slider-squares',
    controlsContainer: '.welcome__slider-btns',
    controlsPosition: 'bottom',
    navPosition: 'bottom',
    preventActionWhenRunning: true,
});

var customizedFunction = function(info, eventName) {
    let activeIndex = info.index;
    if (activeIndex > 5) activeIndex = 5;
    else if (activeIndex < 1) activeIndex = 1;
    curNumSlide.innerHTML = `0${activeIndex}`;
}

slider.events.on('indexChanged', customizedFunction);

let videoSlider = tns({
    container: '.video__slider',
    mouseDrag: false,
    navAsThumbnails: true,
    navContainer: '.video__slider-circles',
    prevButton: '.video__slider-left',
    nextButton: '.video__slider-right',
    slideBy: 1,
    gutter: 21,
    edgePadding: 0,
    responsive: {
        769: {
            items: 3,
            gutter: 42,
        },
    },
    preventActionWhenRunning: true,
    items: 2,
});


// Gallery 


const imgList = [];
for (let i = 1; i <= 15; i++) {
    imgList.push(
        `<img class="gallery__img" src="./assets/img/galery/galery${i}.jpg" alt="gallery-image">`
    );
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
shuffle(imgList);
putPictures();

function putPictures() {
    for (let i in imgList) {
        switch (true) {
            case i < 5:
                document.querySelector('.gallery__column:nth-child(1)').insertAdjacentHTML('beforeend', imgList[i]);
                break;
            case i < 10 && i > 4:
                document.querySelector('.gallery__column:nth-child(2)').insertAdjacentHTML('beforeend', imgList[i]);
                break;
            case i < 15 && i > 9:
                document.querySelector('.gallery__column:nth-child(3)').insertAdjacentHTML('beforeend', imgList[i]);
                break;
        }
    }
}


const pictureItems = document.querySelectorAll('.gallery__img');

window.addEventListener('scroll', animationGallery);

function animationGallery() {
    for (let i = 0; i < pictureItems.length; i++) {
        const animationImage = pictureItems[i];
        const animationImageHeight = animationImage.offsetHeight;
        const animationImageOffset = offset(animationImage).top;
        const animationStart = 4;

        let animationImagePoint = window.innerHeight - animationImageHeight / animationStart;

        if (animationImageHeight > window.innerHeight) {
            animationImagePoint = window.innerHeight - window.innerHeight / animationStart;
        }

        if ((pageYOffset > animationImageOffset - animationImagePoint) && pageYOffset < (animationImageOffset + animationImageHeight)) {
            animationImage.classList.add('_active');
        } else {
            animationImage.classList.remove('_active');
        }
    }
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

setTimeout(() => {
    animationGallery();
}, 300);


// Диалог
const ticketsContainer = document.querySelector('#Tickets')
const dialog = document.querySelector('.dialog')
const btn = document.querySelector('.tickets__btn')
const closeBtn = document.querySelector('.popup__close-btn')

ticketsContainer.addEventListener('click', e => {
    if (e.target.closest('.tickets__btn')) {
        dialog.showModal()
    } else if (e.target.closest('.popup__close-btn')) {
        dialog.close()
    }
})


// Видеоплеер 

const progress = document.querySelector('.video__controlls-progress');
const volume = document.querySelector('.video__controlls-volume');

progress.addEventListener('input', () => {
    let value = progress.value;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #FFF ${value}%, #FFF 100%)`;
})

volume.addEventListener('input', () => {
    let value = volume.value;
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #FFF ${value}%, #FFF 100%)`;
})

const playBtn = document.querySelector('.video__controlls-play');
const bigPlayBtn = document.querySelector('.video__btn');
const progressBar = document.querySelector('.video__controlls-progress');
const audioBtn = document.querySelector('.video__controlls-audio');
const volumeBar = document.querySelector('.video__controlls-volume');
const fullscreenBtn = document.querySelector('.video__controlls-fullscreen');
const video = document.querySelector('video');
const videoPlayer = document.querySelector('.video__player')

function changePlayIcons() {
    playBtn.style.backgroundImage = video.paused ? 'url("./assets/svg/btn__play.svg")' : 'url("./assets/svg/btn__pause.svg")';
    bigPlayBtn.style.opacity = video.paused ? '1' : '0';
}

function playVideo() {
    video.paused ? video.play() : video.pause();
    changePlayIcons();
}

videoPlayer.addEventListener('click', e => {
    if (e.target.closest('.video__controlls-play') || e.target.closest('video') || e.target.closest('.video__btn')) {
        playVideo()
    }
})

video.addEventListener('timeupdate', () => {
    let videoLength = video.duration;
    let progressValue = video.currentTime * 100 / videoLength ? video.currentTime * 100 / videoLength : 0;
    progressBar.value = progressValue;
    progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressValue}%, #FFF ${progressValue}%, #FFF 100%)`;

    if (progressValue == 100) {
        video.pause();
        changePlayIcons();
    }
})

progressBar.addEventListener('input', () => {
    let videoLength = video.duration;
    let value = progressBar.value;
    video.currentTime = value * videoLength / 100;

    if (value == 100) {
        video.pause();
        changePlayIcons();
    }
})