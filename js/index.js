;(function(){
    //nav 事件委派
    let nav_ul = document.querySelector('ul.left');
    nav_ul.addEventListener('click',navHandler);

    function navHandler(e){
        let nav_aside = document.querySelector('div#aside');
        if(e.target.nodeName === 'A'){
            e.preventDefault();
            console.log('ul click',e.target);
            nav_aside.style.transform = `translateX(0%)`;
        }

        //清單取消
        let asideCancel = document.querySelector('#asideCancel').addEventListener('click',function(){
            nav_aside.style.transform = `translateX(-100%)`;
        });
    };
    //aside事件委派
    let aside_ul = document.querySelector('.aside_kind');
    aside_ul.addEventListener('click',asideHandler);

    function asideHandler(e){
        let div_middle = document.querySelector('div#aside > div.middle');
        let ul_kind = document.querySelectorAll('div#aside > div.middle > ul');

        if(e.target.nodeName === 'A'){
            e.preventDefault();
            console.log('123');
            div_middle.style.transform = `translateX(0%)`;
            div_middle.style.opacity = `1`;
            ul_kind[0].style.display = `block`;
        }
    }


    
})();