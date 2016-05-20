/**
 * Created by Administrator on 2016/5/7.
 * 基于整个页面js合并（方法和动画库例外）
 */


/*
*top.js
*
* 头部导航导航
* */


;(function (){
    var cart1=document.getElementById("cart1");
    var oLs=document.getElementById("listGou");
    var is=utils.children(oLs);
    var pois=document.getElementById("sposi");

    oLs.onmouseover=function (){
        utils.css(oLs,"backgroundColor","#fff");
        for(var i=0;i<is.length;i++){
            var iss=is[i];
            utils.css(is[i],"color","#ff6700");
        }
        zhufengAnimate(pois,{
            display: "block"
        },200,function(){
            zhufengAnimate(pois,{
                top:40
            },200)
        });
    };
    var trime=null;
    oLs.onmouseout=function (){
        trime=null;
        window.clearInterval(trime);
        trime=window.setInterval(zhufengAnimate(pois,{
            top:-100,
            display: "none",
        },200),500);
        utils.css(oLs,"backgroundColor","#424242");
        for(var i=0;i<is.length;i++){
            var iss=is[i];
            utils.css(is[i],"color","#a4a4a4");
        }
    };
    pois.onmouseover=function (){
        zhufengAnimate(pois,{
            top:40
        },200);
        utils.css(oLs,"backgroundColor","#fff");
        for(var i=0;i<is.length;i++){
            var iss=is[i];
            utils.css(is[i],"color","#ff6700");
        }
    };
    pois.onmouseout=function (){
        trime=null;
        trime=window.setInterval(zhufengAnimate(pois,{
            top:-100,
            display: "none",
        },200),500);
        utils.css(oLs,"backgroundColor","#424242");
        for(var i=0;i<is.length;i++){
            var iss=is[i];
            utils.css(is[i],"color","#a4a4a4");
        }
    };

    /*  文本框显示隐藏 */
    function xLista(ele,json){
        var str="";
        var str1="";
        var str2="";
        for(var i= 0,len=json.length;i<len;i++){
            var curData=json[i];
            str+="<li>"+"<a class='clear'>";
            for(var key in curData){
                str1="<span>"+curData["shu"]+"</span>";
                str2="<b>"+curData["con"]+"</b>";
            }
            str+=str1+str2+"</a>"+"</li>";
        }
        ele.innerHTML=str;
    }
    function fangs(){
        var txt=document.getElementById("txt");
        var txt1=document.getElementById("txt1");
        var fang=document.getElementById("fang");
        var blao=document.getElementById("blao");
        var txtPar=txt.parentNode;
        txt.onfocus= function () {
            utils.addClass(txt,"bg");
            utils.addClass(fang,"bg");
            blao.style.display="none";
            xList.style.display="block";
        }
        txt.onblur=function (){
            utils.removeClass(txt,"bg");
            utils.removeClass(fang,"bg");
            val=txt.value;
            if(val.length!=0){
                blao.style.display="none";
                xList.style.display="none";
            }else{
                blao.style.display="block";
                xList.style.display="none";
            }
        };
    }
    var xList=document.getElementById("xList");

    /*下拉菜单*/
    var listDiv=document.getElementById("listDiv");
    var listDiv1=document.getElementById("listDiv1");
    var listDiv2=document.getElementById("listDiv2");
    var listDiv3=document.getElementById("listDiv3");
    var listDiv4=document.getElementById("listDiv4");
    var listDiv5=document.getElementById("listDiv5");
    var listDiv6=document.getElementById("listDiv6");
    var listDivUl0=utils.children(listDiv)[0];
    var listDivUl1=utils.children(listDiv1)[0];
    var listDivUl2=utils.children(listDiv2)[0];
    var listDivUl3=utils.children(listDiv3)[0];
    var listDivUl4=utils.children(listDiv4)[0];
    var listDivUl5=utils.children(listDiv5)[0];
    var listDivUl6=utils.children(listDiv6)[0];
    function listDivUl(ele,json) {
        var str="";
        for(var i= 0,len=json.length;i<len;i++){
            var cur=json[i];
            i===(json.length-1)?str+="<li class='lists'>":null
            i!=(json.length-1)?str+="<li>":null;
            str+="<div>";
            str += "<a href='###'><img src='' trueImg='" + cur["src"] + "'/></a>";
            str+="</div>";
            str+="<a href='###'>"+cur["tota"]+"</a>";
            str+="<span>"+cur["$$"]+"</span>";
            str+="</li>";
        }
        ele.innerHTML=str;

        var Img=ele.getElementsByTagName("img");
        function zlay(){
            for(var i=0;i<Img.length;i++){
                ~function (i){
                    var curImg=Img[i];
                    var oImg=new Image;
                    oImg.src=curImg.getAttribute("trueImg");
                    oImg.onload=function(){
                        curImg.style.display="block";
                        curImg.src=oImg.src;
                        oImg=null;
                    }
                }(i);
            }
        }
        window.setTimeout(zlay,1000);
    };
    function navLists(){
        var navList=document.getElementById("navList");
        var navListLi=utils.children(navList,"li");
        var navListdiv=document.getElementById("boxx");
        navList.onmouseenter=function (){
            window.zhufengAnimate(navListdiv,{
                display: "block"
            },1,function (){
                window.zhufengAnimate(navListdiv,{
                    height:230
                },40)
            });
        };
        navList.onmouseleave=function() {
            window.zhufengAnimate(navListdiv,{
                height:0
            },50,function(){
                window.zhufengAnimate(navListdiv,{
                    display: "none"
                },2)
            });
        };
        for(i=0;i<navListLi.length;i++){
            navListLi[i].ss=i;
            navListLi[i].onmouseenter=function() {
                var oDiv=this.getElementsByTagName("div")[0];
                var sibilngs=utils.siblings(this);
                window.zhufengAnimate(oDiv,{
                    display: "block"
                },2,function (){
                    window.zhufengAnimate(oDiv,{
                        height:230
                    },50)
                });
            };
            navListLi[i].onmouseleave=function() {
                var oDiv=this.getElementsByTagName("div")[0];
                var sibilngs=utils.siblings(this);
                window.zhufengAnimate(oDiv,{
                    height:0
                },45,function(){
                    window.zhufengAnimate(oDiv,{
                        display: "none"
                    },1)
                });
            }
        }
    }

    var str="json/json.json";
    var jsonData=null;
    utils.ajax1(str,"ss",function(val){
        jsonData=val[0];
        var txt1=jsonData.txt1;
        xLista(xList,txt1);
        fangs();
        var img1=jsonData.img1;
        var img2=jsonData.img2;
        var img3=jsonData.img3;
        var img4=jsonData.img4;
        var img5=jsonData.img5;
        var img6=jsonData.img6;
        var img7=jsonData.img7;
        listDivUl(listDivUl0,img1);
        listDivUl(listDivUl1,img2);
        listDivUl(listDivUl2,img3);
        listDivUl(listDivUl3,img4);
        listDivUl(listDivUl4,img5);
        listDivUl(listDivUl5,img6);
        listDivUl(listDivUl6,img7);
        navLists();
        console.log(jsonData);
    });
})();


/*
* Carousel.js
*
* 轮播图---小米明星
* */
~function (){

    var listNva=document.getElementById("listNva");
    var listNvaLi=utils.children(listNva);
    var oDiv=listNva.getElementsByTagName("div");
    /* 带选购的按钮的 */
    function div1(ele,json){
        var str2="";
        for(var i= 0,len=json.length;i<len;i++) {
            var cur = json[i];
            var str1="";
            for (var k = 0, lena = cur.length; k < lena; k++) {
                var curData=cur[k];
                var str = "";
                str +="<li>";
                str += "<a href='" + curData["href"] + "' class='a1'><img src='" + curData["src"] + "' tureImg='" + curData["src"] + "' alt=''></a>";
                str += "<a href='" + curData["href1"] + "' class='a2'>" + curData["con"] + "</a>";
                str+= "<a href='" + curData["href1"] + "' class='a3'>" +"选购"+"</a>";
                str +="</li>";
                str1+=str;
            }
            str2+="<ul>"+str1+"</ul>";
        }
        ele[0].innerHTML+=str2;
        var ul=utils.children(ele[0])[0];
        var aa=ele[0].getElementsByTagName("a");
        for(var b=0;b< aa.length;b++){
            if(b==aa.length-1){
                aa[b].style.display="none";
                break;
            }
        }
    };

    /* 不带选购的九个列表 */
    function divs(ele,json){
        var str2="";
        for(var i= 0,len=json.length;i<len;i++) {
            var cur = json[i];
            var str1="";
            for (var k = 0, lena = cur.length; k < lena; k++) {
                var curData=cur[k];
                var str = "";
                str +="<li>";
                str += "<a href='" + curData["href"] + "' class='a1'><img src='" + curData["src"] + "' tureImg='" + curData["src"] + "' alt=''></a>";
                str += "<a href='" + curData["href1"] + "' class='a2'>" + curData["con"] + "</a>";
                str +="</li>";
                str1+=str;
            }
            str2+="<ul>"+str1+"</ul>";
        }

        ele.innerHTML+=str2;
    }
    function listDIV(){
        var tatol=0;
        for( i=0;i<listNvaLi.length;i++){
            listNvaLi[i].ss=i;
            listNvaLi[i].onmouseenter=function(){
                var listNvaLiDiv=utils.children(this,"div")[0];
                listNvaLiDiv.style.display="block";
                var ul=listNvaLiDiv.getElementsByTagName("ul");
                var str=ul.length;
                str=(str*265);
                listNvaLiDiv.style.width=str+"px";
            };
            listNvaLi[i].onmouseleave=function(){
                var listNvaLiDiv=utils.children(this,"div")[0];
                listNvaLiDiv.style.display="none";
            }
        }
    }

    //MOVE轮播图
    var CarouseCan=document.getElementById("CarouseCan");
    function MOVE (ele,json){
        var oul=utils.children(ele)[0];
        var oOl=utils.next(ele);
        var jsonData = null,count=null;
        ~function() {
            var str="";
            var str1="";
            if(json){
                for(var i= 0,len=json.length;i<len;i++){
                    var curData=json[i];
                    str+="<li>";
                    str+="<a href='"+curData["con"]+"'>";
                    str+="<img src='' trueImg='"+curData["img"]+"' alt='"+curData["talt"]+"'>";
                    str+="</a>";
                    str+="</li>";
                    i===0?str1+="<li class='bg'></li>":str1+="<li></li>";
                }
                str+="<li>";
                str+="<a href='"+json[0]["con"]+"'>";
                str+="<img src='' trueImg='"+json[0]["img"]+"' alt='"+json[0]["talt"]+"'>";
                str+="</a>";
                str+="</li>";
            }
            oul.innerHTML+=str;
            oOl.innerHTML+=str1;
            count=json.length+1;
            utils.css(oul, "width", count * 1226);
            var imgList=oul.getElementsByTagName("img");
            function  lzy(){
                for(var k=0;k<imgList.length;k++){
                    ~function (k){
                        var curImg=imgList[k];
                        var oImg=new Image;
                        oImg.src=curImg.getAttribute("trueImg");
                        oImg.onload=function(){
                            curImg.style.display="block";
                            curImg.src=this.src;
                            oImg=null;
                            //window.setInterval(time);
                        }
                    }(k)
                }
            }
            //var time=
            window.setInterval(lzy,1000)
        }();

        //4、实现自动轮播
        //->记录的是步长(当前是哪一张图片,零是第一张图片)
        var step = 0, interval = 2600, autoTimer = null;
        autoTimer = window.setInterval(autoMove, interval);
        function autoMove() {
            // count=jsonData.length;
            if (step >= (count - 1)) {
                step = 0;
                oul.style.left = 0;
            }
            step++;
            zhufengAnimate(oul, {left: -step *1226}, 500);
            changeTip();
        }

        //5、实现焦点对齐
        var rightCarouse=document.getElementById("rightCarouse");
        //var oOl=utils.children(rightCarouse,"ol");
        var oLis=utils.children(oOl);
        function changeTip() {
            var tempStep = step >= oLis.length ? 0 : step;
            for (var i = 0, len = oLis.length; i < len; i++) {
                var curLi = oLis[i];
                i === tempStep ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
            }
        }

        //->6、停止和开启自动轮播
        rightCarouse.onmouseover = function () {
            window.clearInterval(autoTimer);
            //bannerLeft.style.display = bannerRight.style.display = "block";
        };
        rightCarouse.onmouseout = function () {
            autoTimer = window.setInterval(autoMove, interval);
            //bannerLeft.style.display = bannerRight.style.display = "none";
        };

        //->7、单击焦点实现轮播图的切换
        ~function () {
            for (var i = 0, len = oLis.length; i < len; i++) {
                var curLi = oLis[i];
                curLi.index = i;
                curLi.onclick = function () {
                    step = this.index;
                    changeTip();
                    zhufengAnimate(oul, {left: -step * 1226}, 500);
                }
            }
        }();

        //8、实现左右切换
        //btnL btnR
        var btn=document.getElementById("btn")
        var btnL=btn.getElementsByTagName("a")[0];
        var btnR=btn.getElementsByTagName("a")[1];
        btnR.onclick = autoMove;
        btnL.onclick = function () {
            if (step <= 0) {
                step = count - 1;
                utils.css(oul, "left", -step * 1226);
            }
            step--;
            zhufengAnimate(oul, {left: -step * 1226}, 500);
            changeTip();
        }

    }

    /* 推荐部分 */
    function tuijianCON(){
        var tuijianCon=document.getElementById("tuijianCon");
        var oUl=utils.children(tuijianCon,"ul")[0];
        var imgS=oUl.getElementsByTagName("img");
        ;(function (){
            var jsonData=null,txt="json/tuijian.txt",str="";
            jsonData=utils.ajax(txt);
            for(var i=0;i<jsonData.length;i++){
                var cur=jsonData[i];
                str+="<li>";
                str+="<a href='"+cur["ahf"]+"'>";
                str+="<img src='' trueImg='"+cur["img"]+"' alt='"+cur["titel"]+"'/>";
                str+="</a>";
                str+="</li>";
            }
            oUl.innerHTML=str;
        })();
        var imgS=oUl.getElementsByTagName("img");
        var oA=oUl.getElementsByTagName("a");
        setTimeout(function(){
            for(var i=0;i<oA.length;i++){
                oA[i].style.display="block";
            }
        },1000);

        var ss=utils.lzy(imgS);

    };

    /* 小米明星 */
    function StarImgs(StarImg,json){
        var str="";
        for(var i=0;i<json.length;i++){
            var cur=json[i];
            var a=i+1;
            a===6?a=1:(a===7?a=2:(a===8?a=3:(a===9?a=4:(a===10?a=5:i))));
            str+="<li class='li"+a+"'>";
            str+="<a href='"+cur["ahf1"]+"'>";
            str+="<img src='' trueImg='"+cur["img"]+"'/>";
            str+="</a>";
            str+="<div class='conT'>";
            str+="<h3>";
            str+="<a href='"+cur["ahf2"]+"'>"+cur["h3s"]+"</a>";
            str+="</h3>";
            str+="<p class='p1'>"+cur["p1"]+"</p>";
            str+="<p class='p2'>"+cur["p2"]+"</p>";
            str+="</div>";
            str+="</li>";
        }
        StarImg.innerHTML=str;
        var imgLis=StarImg.getElementsByTagName("img");
        var StarImgT = utils.offset(StarImg).top;
        var clientH = utils.win("clientHeight");
        function lazyImg() {
            var curTop = utils.win("scrollTop");
            if (StarImg.zhufengIsLoad) {
                return;
            }
            if (StarImgT<= (clientH + curTop)) {
                time = window.setTimeout(function () {
                    utils.lzy(imgLis, time)
                }, 1000);
                StarImg.zhufengIsLoad = true;
            }
        }
        window.onscroll = lazyImg;
        mos(StarImg);
        function  mos(StarImg){
            ~function(){
                var left=(StarImg.offsetWidth)/2;
                var step = 0, interval = 2600, autoTimer = null;
                function autoMove() {
                    if (step >= 0) {
                        step = 0;
                        StarImg.style.left =0 *left;
                        return;
                    }
                    else {
                        step++;
                        zhufengAnimate(StarImg, {left: step *left}, 300);
                    }
                }
                //实现左右切换
                var btn=document.getElementById("RL")
                var btnL=btn.getElementsByTagName("li")[0];
                var btnR=btn.getElementsByTagName("li")[1];
                btnR.onclick = autoMove;
                btnL.onclick = function () {
                    if (step <= -1) {
                        step = -1;
                        utils.css(StarImg, "left", step *left);
                        return
                    }
                    else {
                        step--;
                        zhufengAnimate(StarImg, {left: step * left}, 300);
                    }
                }
                window.setInterval(function(){
                    var a=StarImg.offsetLeft;
                    if(a===0){
                        zhufengAnimate(StarImg, {left: -left}, 300);
                    }else  if(a===-left){
                        zhufengAnimate(StarImg, {left: 0}, 300);
                    }
                },6000)
            }();
        }
    };

    var str="json/json.json";
    var jsonData=null;
    var jsons=utils.ajax1(str,"ss",function(val) {
        jsonData = val[0];
        var nav=jsonData.nav1;
        var nav1=jsonData.nav2,listdiv1=oDiv[1];
        var nav2=jsonData.nav3,listdiv2=oDiv[2];
        var nav3=jsonData.nav4,listdiv3=oDiv[3];
        var nav4=jsonData.nav5,listdiv4=oDiv[4];
        var nav5=jsonData.nav6,listdiv5=oDiv[5];
        var nav6=jsonData.nav7,listdiv6=oDiv[6];
        var nav7=jsonData.nav8,listdiv7=oDiv[7];
        var nav8=jsonData.nav9,listdiv8=oDiv[8];
        var nav9=jsonData.nav10,listdiv9=oDiv[9];

        var carousel=jsonData.carousel;

        div1(oDiv,nav);
        divs(listdiv1,nav1);
        divs(listdiv2,nav2);
        divs(listdiv3,nav3);
        divs(listdiv4,nav4);
        divs(listdiv5,nav5);
        divs(listdiv6,nav6);
        divs(listdiv7,nav7);
        divs(listdiv8,nav8);
        divs(listdiv9,nav9);
        MOVE(CarouseCan,carousel);
        listDIV();
        tuijianCON();

        var StarImg=document.getElementById("StarImg");
        var Star=jsonData.Star;
        StarImgs(StarImg,Star);
    });
}();
/*
* conImg.js
*
* 主体内容
* */
;(function () {
    var hardware=document.getElementById("hardware")
    var str="json/json.json";
    var jsonD=utils.ajax1(str,false,function(val){});
    var jsonData=jsonD[0];
    var hardwares=jsonData.hardware;
    console.log(hardwares);
    uts.conImgs(hardware,hardwares);
    uts.shows(hardware);
    uts.moveSS(hardware);
    //相同的三个大块；

    //搭配
    var hardware1=document.getElementById("hardware1");
    var conimga=jsonData.conimga;
    uts.conImg(hardware1,conimga);
    uts.shows(hardware1);
    uts.moveSS(hardware1);
    uts.tabs(hardware1);
    //配件
    var hardware2=document.getElementById("hardware2");
    var conimgs=jsonData.conimgs;
    uts.conImg(hardware2,conimgs);
    uts.shows(hardware2);
    uts.moveSS(hardware2);
    uts.tabs(hardware2);

    //周边
    var hardware3=document.getElementById("hardware3");
    var conimgd=jsonData.conimgd;
    uts.conImg(hardware3,conimgd);
    uts.shows(hardware3);
    uts.moveSS(hardware3);
    uts.tabs(hardware3);

    //为您推荐
    var hardwareDiv5=document.getElementById("hardwareDiv5");
    var kuang=document.getElementById("kuang");
    var conIss=jsonData.conIss;
    uts.conImgss(hardwareDiv5,conIss);
    uts.moveLR(hardwareDiv5,kuang);
    tops(hardwareDiv5);
    function tops(hardwareDiv5){
        var li=hardwareDiv5.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            var oLi=li[i];
            oLi.onmouseenter=function(){
                var op=utils.children(this,"p")[0];
                var oa=utils.children(op)[0];
                window.zhufengAnimate(oa,{
                    fontWeight: 900
                },100,function(){
                    window.zhufengAnimate(oa,{
                        fontWeight: 300
                    },100)
                });
                window.zhufengAnimate(this,{
                    top:-2
                },200)
            }
            oLi.onmouseleave=function(){
                var op=utils.children(this,"p")[0];
                var oa=utils.children(op)[0];
                window.zhufengAnimate(oa,{
                    fontWeight: 900
                },100,function(){
                    window.zhufengAnimate(oa,{
                        fontWeight: 300
                    },100)
                });
                window.zhufengAnimate(this,{
                    top:0
                },200)
            }
        }
    };

    var HotComList=document.getElementById("HotComList");
    uts.moveSSs(HotComList);


    var HotComList1=document.getElementById("HotComList1");
    uts.moveSSs(HotComList1);
    var odivM=utils.children(HotComList1,"div");
    for(var i=0;i<odivM.length;i++){
        var divs=odivM[i];
        mos(divs)
    }


    var HotComList2=document.getElementById("HotComList2");
    moveSSs(HotComList2);
    function moveSSs(Ele){
        var li=HotComList2.getElementsByTagName("li");
        for(var i=0;i<li.length;i++){
            var oli=li[i];
            oli.onmouseenter=function(){
                window.zhufengAnimate(this,{
                    position: "relative",
                    top: -2,
                    boxShadow: " 0px 5px 10px 5px #e1e1e1"
                },200);
            }
            oli.onmouseleave=function(){
                window.zhufengAnimate(this,{
                    top: 0,
                    boxShadow: " 0px 0px 0px 0px #e1e1e1"
                },200);
            }
        }
    }


    function  mos(qietu){
        ;(function (){
            var oul=utils.children(qietu)[0];
            var oOl=utils.children(qietu,"ol")[0];
            var jsonData = null,count=null;
            var step = 0, interval = 2600, autoTimer = null;
            function autoMove() {
                if (step >= 3) {
                    step = 3;
                    oul.style.left =3 *296;
                    return;
                }
                else {
                    step++;
                    zhufengAnimate(oul, {left: -step *296}, 500);
                    changeTip();
                }
            }

            //焦点对齐
            var oLis=utils.children(oOl);
            function changeTip() {
                var tempStep = step >= oLis.length ? 0 : step;
                for (var i = 0, len = oLis.length; i < len; i++) {
                    var curLi = oLis[i];
                    i === tempStep ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
                }
            }
            //单击焦点切换
            ~function () {
                for (var i = 0, len = oLis.length; i < len; i++) {
                    var curLi = oLis[i];
                    curLi.index = i;
                    curLi.onclick = function () {
                        step = this.index;
                        changeTip();
                        zhufengAnimate(oul, {left: -step * 296}, 500);
                    }
                }
            }();

            //实现左右切换
            var btn=utils.children(qietu,"p")[0];
            var btnL=btn.getElementsByTagName("i")[0];
            var btnR=btn.getElementsByTagName("i")[1];
            btnR.onclick = autoMove;
            btnL.onclick = function () {
                if (step <= 0) {
                    step = 0;
                    utils.css(oul, "left", -step * 296);
                    return
                }
                else {
                    step--;
                    zhufengAnimate(oul, {left: -step * 296}, 500);
                    changeTip();
                }
            }

        })();
    }
})();
var hardware=document.getElementById("hardware");
var imgList=hardware.getElementsByTagName("img");

var hardware1=document.getElementById("hardware1");
var imgList1=hardware1.getElementsByTagName("img");

var hardware2=document.getElementById("hardware2");
var imgList2=hardware2.getElementsByTagName("img");

var hardware3=document.getElementById("hardware3");
var imgList3=hardware3.getElementsByTagName("img");
function zasy(curImg){
    if(curImg.aaa){
        return;
    }
    var curDiv=curImg.parentNode;
    var a=utils.offset(curDiv).top;
    var b=utils.win("clientHeight")+utils.win("scrollTop");
    if(a<b){
        var oImg=new Image;
        oImg.src=curImg.getAttribute("tureimg");
        curImg.aaa=true;
        oImg.onload=function (){
            curImg.style.display="block";
            curImg.src=oImg.src;
            oImg=null;
        }
    }
    //window.clearInterval(times);
}
function handleAllImg(){
    for(var i=0;i<imgList.length;i++){
        zasy(imgList[i]);
    }
};
function handleAllImg1(){
    for(var i=0;i<imgList1.length;i++){
        zasy(imgList1[i]);
    }
};
function handleAllImg2(){
    for(var i=0;i<imgList2.length;i++){
        zasy(imgList2[i]);
    }
};
function handleAllImg3(){
    for(var i=0;i<imgList3.length;i++){
        zasy(imgList3[i]);
    }
};
window.setInterval(handleAllImg,1000);
window.onscroll=handleAllImg;

window.setInterval(handleAllImg1,1000);
window.onscroll=handleAllImg1;

window.setInterval(handleAllImg2,1000);
window.onscroll=handleAllImg2;

window.setInterval(handleAllImg3,1000);
window.onscroll=handleAllImg3;

move(hardware3);
move(hardware2);
move(hardware1);
function move(ele){
    var oul=ele.getElementsByTagName("ul")[1];
    var box=utils.children(oul,"div");
    for(var i=0;i<box.length;i++){
        var obox=box[i];
        var div=utils.children(obox,"div");
        for(var j=0;j<div.length;j++){
            var odiv=div[j];
            var divs=utils.children(odiv,"div")[0];
            var divds=utils.children(odiv,"div")[1];
            divds.onmouseenter=divs.onmouseenter=function(){
                window.zhufengAnimate(this,{
                    position: "relative",
                    top: -2,
                    boxShadow: " 0px 5px 10px 5px #e1e1e1"
                },200);
            }
            divds.onmouseleave=divs.onmouseleave=function(){
                window.zhufengAnimate(this,{
                    top: 0,
                    boxShadow: " 0px 0px 0px 0px #e1e1e1"
                },200);
            }
        }
    }
}