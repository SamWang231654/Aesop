const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
//end section
const section = document.querySelector('section');
const end = section.querySelector('h1');


function scrollHandler (){
    let windowTop = window.scrollY;
    let windowBottom = windowTop + window.innerHeight;
    let button = document.querySelector('.button');
    let sectionTop = section.offsetTop - 100;
    if(windowTop > sectionTop){
        button.style.opacity = `1`;
    }
}
//scrollmagic
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
    duration:10000, //結束(可依據影片秒數)
    triggerElement:intro,
    triggerHook:0   //起始位置  0~1之間
})
// .addIndicators() //配合CDN-debug.addIndicators.js導入以查看起始 結束線
.setPin(intro)
.addTo(controller);

//Text animation
const textAnim = TweenMax.fromTo(text,3,{opacity:1},{opacity:0});

let scene2 = new ScrollMagic.Scene({
    duration:500,
    triggerElement:intro,
    triggerHook:0
})
.setTween(textAnim)
.addTo(controller);
//video Animation
let accelamount = 0.3;
let scrollpos = 0;
let delay = 0;

scene.on('update',e =>{
    scrollpos = e.scrollPos / 900;//e.scrollPos為事件中的參數
}); 

setInterval(()=>{
    delay += (scrollpos - delay) - accelamount;
    // console.log(scrollpos,delay);

    video.currentTime = scrollpos;
},100);
window.addEventListener('scroll', scrollHandler);
