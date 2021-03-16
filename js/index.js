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

    aside
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
            publicKind[x].style.transform = `translateX(0%)`;
            // publicKind[x].style.display = `block`;
        });
    }
    


    
})();
