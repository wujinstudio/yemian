
// /函数库自制
//1.透明度函数
// dots轮播点的集合
//imgs轮播图的集合
//father轮播图的直接父级元素
//jia  轮播点的选中效果的类名
// /cond 轮播图转换时间 单位：毫秒
// function banner_oi(dots,imgs,father,jia,second) {
//     imgo[0].style.opacity=1;
//     dott[0].classList.add("active");
//     for(let i=0;i<dott.length;i++){
//         dott[i].onclick=function(){
//             for(let j=0;j<dott.length;j++){
//                 imgo[j].style.opacity=0;
//                 dott[j].classList.remove("active");
//             }
//             imgo[i].style.opacity=1;
//             dott[i].classList.add("active");
//             num=i;
//         }
//     }
//     let t=setInterval(tt,1000);
//     let num=0;
//     function tt(){
//         num++;
//         if(num==5){
//             num=0;
//         }
//         for(let j=0;j<dott.length;j++){
//             imgo[j].style.opacity=0;
//             dott[j].classList.remove("active");
//         }
//         imgo[num].style.opacity=1;
//         dott[num].classList.add("active");
//     }
//     bann.onmouseover=function () {
//         clearInterval(t);
//     }
//     bann.onmouseout=function () {
//         t=setInterval(tt,1000);
//     }
// }
function Zlunbo(dots,imgs,father,jia,second){
    dots[0].classList.add(jia);
    imgs[0].style.zIndex=2;
    for(let i=0;i<dots.length;i++){
        dots[i].onmouseover=function(){
            for(let j=0;j<dots.length;j++){
                dots[j].classList.remove(jia);
                imgs[j].style.zIndex=1;
            }
            dots[i].classList.add(jia);
            imgs[i].style.zIndex=2;
            num=i;
        }
    }
    let t=setInterval(move,second);
    let num=0;
    function move(){
        for(let i=0;i<dots.length;i++){
            dots[i].classList.remove(jia);
            imgs[i].style.zIndex=1;
        }
        num++;
        if(num==dots.length){
            num=0
        }
        dots[num].classList.add(jia);
        imgs[num].style.zIndex=2;
    }
    father.onmouseover=function(){clearInterval(t)};
    father.onmouseout=function(){t=setInterval(move,second);};
}
//下拉列表
//lis:所有选项卡的集合
//son:每个选项卡后面的框

function chose(lis,son) {
    for(let i=0;i<lis.length;i++){
        //3.鼠标移入每个li时的操作
        lis[i].onmouseover=function () {
            //4.让其余子元素消失
            for(let j=0;j<son.length;j++){
                son[j].style.display="none";
            }
            //5.当前子元素出现
            son[i].style.display="block";
        }
        lis[i].onmouseout=function () {
            son[i].style.display="none";
        };
    }
}
//遮罩
//box：遮罩层下的盒子
//covr:遮罩层
function Zhezhao(box,covr) {
    box.onmouseover=function () {
        //遮罩出现
        covr.style.display="block";
    };
    // 3.鼠标移出
    box.onmouseout=function () {
        //遮罩消失
        covr.style.display="none";
    };
}



//左右（双下标）轮播图
//imgs:需要轮播的图片
// dots:轮播点集合
//banner：放轮播图的盒子，元素
// left：左箭头 元素；
// right: 右箭头 元素；
// widths：轮播图宽度，整数
//activeclass:轮播点选中时的类名
//secound:轮播时间
function banner_lr(imgs,dots,banner,left,right,widths,activeclass,secound=1500) {
    // 2.初始值
    imgs[0].style.left=0;
    dots[0].classList.add(activeclass);
    let now=0;
    let next=0;
    // 开关：控制左右箭头，默认是开着的 flag=true
    //2.开关：控制快速点击时图片会快速轮播现象
    let flag=true;
    // 3.添加时间函数
    let t=setInterval(move,secound);
    function move() {
        next++;
        if(next==imgs.length){
            next=0;
        }
        //确保下一张图永远在最右侧
        imgs[next].style.left=widths+"px";
        // imgs[now].style.left=wi
        animate(imgs[now],{left:-widths});
        animate(imgs[next],{left:0},function () {
            flag=true;
        });
        dots[now].classList.remove(activeclass);
        dots[next].classList.add(activeclass);
        now=next;
    }
    // 左右箭头
    function moveL() {
        next--;
        if(next<0){
            next=imgs.length-1;
        }
        imgs[next].style.left=-widths+"px";
        animate(imgs[now],{left:widths});
        animate(imgs[next],{left:0},function () {
            flag=true;
        });
        dots[now].classList.remove(activeclass);
        dots[next].classList.add(activeclass);
        now=next;
    }
    left.onclick=function () {
        //开关关闭时，不要点击
        // 判断开关是否开启
        //flag=flase !flag=ture;****
        // 开关开启，则！flag=false，不执行return，执行flag=false和move，move执行完flag=true
        //开关关闭，不要点击（判断表达式的值）
        //！flag==flase;
        if(!flag){
            return;
        }
        flag=false;
        moveL();
    }
    right.onclick=function () {
        if(!flag){
            return;
        }
        flag=false;
        move();
    }
    banner.onmouseover=function () {
        clearInterval(t);
    }
    banner.onmouseout=function () {
        t=setInterval(move,secound);
    }
    //鼠标移入轮播点
    for(let i=0;i<dots.length;i++){
        dots[i].onmouseover=function () {
            for(let j=0;j<dots.length;j++){
                dots[j].classList.remove(activeclass);
                imgs[j].style.left=widths+"px";
            }
            dots[i].classList.add(activeclass);
            imgs[i].style.left=0;
            now=i;
            next=i;
        }
    }
    //窗口失去焦点时，停止时间间隔函数
    window.onblur=function () {
        clearInterval(t);
    }
    //窗口获得焦点时，继续时间间隔函数
    window.onfocus=function () {
        t=setInterval(move,secound);
    }
}
