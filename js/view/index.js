;(function(){
    //nav 事件委派
    let nav_ul = document.querySelector('ul.left');
    nav_ul.addEventListener('click',navHandler);

    function navHandler(e){
        let nav_aside = document.querySelector('div#aside');
        if(e.target.nodeName === 'A'){
            e.preventDefault();
            nav_aside.style.transform = `translateX(0%)`;
        }

        //清單取消
        let asideCancel = document.querySelector('#asideCancel').addEventListener('click',function(){
            nav_aside.style.transform = `translateX(-100%)`;
        });
    };

    //aside
    let kind_li = document.querySelectorAll('.aside_kind li');
    let publicKind = document.getElementsByClassName('public_kind');
    for(let x = 0 ; x < kind_li.length; x++){
        kind_li[x].addEventListener('mouseenter',function(){
            for(let y = 0 ; y < publicKind.length ; y++){
                publicKind[y].style.transform = `translateX(-10%)`;
                // publicKind[y].style.display = `none`;
                publicKind[y].classList.remove('mouseShow');
            }
            publicKind[x].classList.add('mouseShow');
            publicKind[x].style.transition = `all 1.5s`;
            publicKind[x].style.transform = `translateX(0%)`;
            // publicKind[x].style.display = `block`;
        });
    }
    //section02 ajax load
    function getAjax(sam,dom){
        let src, text, des;
        let arr = [];
        $.ajax({
            url:sam,
            dataType:'json'
        }).done((res)=>{
            arr = res
        }).then(()=>{
            for(let i=0; i < arr.length; i++){
                src = arr[i].img;
                text = arr[i].title;
                des = arr[i].describe;
                let template = `
                <div class="section_product">
                    <a href="#"><img src="${src}" alt="arr"></a>
                    <a href="#"><h1 class="section_title">${text}</h1></a>
                    <h1 class="section_title">${des}</h1>
                </div>
                `;
                $(`${dom}`).append(template)
            }
        });
    }
    getAjax('./js/model/hotProduct.json','#section02');
    
    //sction03
    function scrollHandler(){
        let windowTop = window.scrollY;
        let windowBottom = windowTop + window.innerHeight;
        let s03Container = document.querySelector('.section03Container');
        let imgTop = s03Container.offsetTop;
        let img = document.querySelectorAll('.section03Container > div')
        if(windowBottom > imgTop){
            img[1].classList.add('s03Active');
            img[0].classList.add('s03Active');
            window.removeEventListener('scroll',scrollHandler);
        }
    }
    window.addEventListener('scroll',scrollHandler);
    //section04
    //渲染SLIDER產品至畫面上
    getAjax('./js/model/slider.json','.section04Container');

    let leftButton = document.querySelector('#leftArrow');
    let rightButton = document.querySelector('#rightArrow');
    let section04 = document.querySelector('#section04')
    let sliderContainer = document.querySelector('.section04Container');
    let progressBar = document.querySelector('span.smallBar');
    let imgWidth;
    let nowMode = false;
    function sliderEnterHandler(e){
        if(e.target.nodeName === 'DIV'){
            let sliderProduct = document.querySelectorAll('.section04Container > .section_product');
            imgWidth = sliderProduct[1].clientWidth;
        }
        if(nowMode === false){
            rightButton.style.transform = `translateX(0%)`;
        }else if (nowMode === true){
            leftButton.style.transform = `translateX(0%)`;
        }
    }
    function sliderLeaveHandler(){
        rightButton.style.transform = `translateX(101%)`;
        leftButton.style.transform = `translateX(-101%)`;
    };
    function leftMoveHandler(){
        sliderContainer.style.transform = `translateX(0px)`;
        rightButton.style.transform = `translateX(0%)`;
        leftButton.style.transform = `translateX(-101%)`;
        progressBar.style.transform = `translateX(0%)`;
        nowMode = false;
    };
    function rightMoveHandler(){
        sliderContainer.style.transform = `translateX(${-imgWidth}px)`;
        rightButton.style.transform = `translateX(101%)`;
        leftButton.style.transform = `translateX(0%)`;
        progressBar.style.transform = `translateX(100%)`;
        nowMode = true;
    };


    section04.addEventListener('mouseenter',sliderEnterHandler);
    section04.addEventListener('mouseleave',sliderLeaveHandler);
    leftButton.addEventListener('click',leftMoveHandler);
    rightButton.addEventListener('click',rightMoveHandler);


    //section 05    slider
    const sliderBox = document.querySelector('.carouselSlider');
    const slider = document.querySelectorAll('.carouselSlider img');
    const leftBtn = document.querySelector('#s05left');
    const rightBtn = document.querySelector('#s05right');
    const s05smallBar = document.querySelector('div.s5_progressBar > span.smallBar');

    //Counter
    let counter = 1;
    let barCounter = 0;
    const size = slider[0].clientWidth;
    const barSize = s05smallBar.clientWidth;
    sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';

    function leftmove() {
        if (counter >= slider.length - 1) return;
        sliderBox.style.transition = "transform 0.5s ease-in-out";
        counter++;
        sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';
        if(barCounter >= 2){
            s05smallBar.style.transform = `translateX(0px)`;
            barCounter = -1;
        }
        barCounter++;
        s05smallBar.style.transform = `translateX(${barSize * barCounter}px)`;
    };
    //Button Listeners
    rightBtn.addEventListener('click', () => {
        if (counter >= slider.length - 1) return;
        sliderBox.style.transition = "transform 0.5s ease-in-out";
        counter++;
        sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';
        // sliderBox.style.transform = `translateX(${-size * counter}px)`;
        if(barCounter >= 2){
            s05smallBar.style.transform = `translateX(0px)`;
            barCounter = -1;
        }
        barCounter++;
        s05smallBar.style.transform = `translateX(${barSize * barCounter}px)`;

    });

    leftBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        sliderBox.style.transition = "transform 0.5s ease-in-out";
        counter--;
        sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    sliderBox.addEventListener('transitionend', () => {
        //console.log(slider[counter]);
        if (slider[counter].id == 'lastClone') {
            sliderBox.style.transition = 'none';
            counter = slider.length - 2;
            sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';
        };
        if (slider[counter].id == 'firstClone') {
            sliderBox.style.transition = 'none';
            counter = slider.length - counter;
            sliderBox.style.transform = 'translateX(' + (-size * counter) + 'px)';
        };
    });


    // setInterval(leftmove, 2000);
})();
    
