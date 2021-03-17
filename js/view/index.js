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
                <div class="section02_product">
                    <a href="#"><img src="${src}" alt="arr"></a>
                    <a href="#"><h1 class="section02_title">${text}</h1></a>
                    <h1 class="section02_title">${des}</h1>
                </div>
                `;
                $(`${dom}`).append(template)
            }
        });
    }
    getAjax('./js/model/hotProduct.json','#section02');
})();
