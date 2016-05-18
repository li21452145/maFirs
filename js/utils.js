var getXHR = function () {
    var list = [
        function () {
            return new XMLHttpRequest;//->IE7+、标准浏览器
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    ];
    var temp = null;
    for (var i = 0; i < list.length; i++) {
        var tempFn = list[i];
        try {
            temp = tempFn();
        } catch (e) {
            continue;
        }
        getXHR = tempFn;
        break;
    }
    if (!temp) {
        throw new Error("您的当前浏览器不支持AJAX!");
    }
    return temp;
};
var utils = (function () {
    var flag = "getComputedStyle" in window;

    //->listToArray:把类数组集合转换为数组
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0);
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }

    //->formatJSON:把JSON格式字符串转换为JSON格式对象
    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    //->offset:获取页面中任意元素距离BODY的偏移
    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: disLeft, top: disTop};
    }

    //->win:操作浏览器的盒子模型信息
    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //->children:获取所有的元素子节点
    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
            }
            nodeList = null;
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }


    //->prev:获取上一个哥哥元素节点
    //->首先获取当前元素的上一个哥哥节点,判断是否为元素节点,不是的话基于当前的继续找上面的哥哥节点...一直到找到哥哥元素节点为止,如果没有哥哥元素节点,返回null即可
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    //->next:获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    //->prevAll:获取所有的哥哥元素节点
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    //->nextAll:获取所有的弟弟元素节点
    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    //->sibling:获取相邻的两个元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary;
    }

    //->siblings:获取所有的兄弟元素节点
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    //->index:获取当前元素的索引
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    //->firstChild:获取第一个元素子节点
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

    //->lastChild:获取最后一个元素子节点
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    //->append:向指定容器的末尾追加元素
    function append(newEle, container) {
        container.appendChild(newEle);
    }

    //->prepend:向指定容器的开头追加元素
    //->把新的元素添加到容器中第一个子元素节点的前面,如果一个元素子节点都没有,就放在末尾即可
    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    //->insertBefore:把新元素(newEle)追加到指定元素(oldEle)的前面
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    //->insertAfter:把新元素(newEle)追加到指定元素(oldEle)的后面
    //->相当于追加到oldEle弟弟元素的前面,如果弟弟不存在,也就是当前元素已经是最后一个了,我们把新的元素放在最末尾即可
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }


    //->hasClass:验证当前元素中是否包含className这个样式类名
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //->addClass:给元素增加样式类名
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    //->removeClass:给元素移除样式类名
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    //->getElementsByClass:通过元素的样式类名获取一组元素集合
    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        //->IE6~8
        var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    //->getCss:获取元素的样式值
    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->setCss:给当前元素的某一个样式属性设置值(增加在行内样式上的)
    function setCss(attr, value) {
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        this["style"][attr] = value;
    }

    //->setGroupCss:给当前元素批量的设置样式属性值
    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    //->css:此方法实现了获取、单独设置、批量设置元素的样式值
    function css(curEle) {
        var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary);
            }
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }
    //图片延迟加载
    function  lzy(curEle){
        for(var k=0;k<curEle.length;k++){
            ~function (k){
                var curImg=curEle[k];
                var oImg=new Image;
                oImg.src=curImg.getAttribute("trueImg");
                oImg.onload=function(){
                    curImg.style.display="block";
                    curImg.src=this.src;
                    oImg=null;;
                }
            }(k)
        }
    }
    //ajax数据加载
    function  ajax(str){
        var jsonData=null;
        ~function() {
            var xhr = new XMLHttpRequest;
            xhr.open("get", str+"?_" + Math.random(), false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    var strs = xhr.responseText;
                    jsonData = utils.formatJSON(strs);
                }
            };
            xhr.send(null);
        }();
        return jsonData;
    }

    function  ajax1(apiurl,bool,callback){
        var jsonData=null;
        if(bool!=false){
            bool=true;
            ~function() {
                var xhr = getXHR();
                apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
                xhr.open("get", apiurl, bool);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                        var val = xhr.responseText;
                        jsonData = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                        callback(jsonData)
                    }
                };
                xhr.send(apiurl);
            }();
        }
        else {
            if(callback){
                callback=null;
            }
            ~function() {
                var xhr = getXHR();
                apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
                xhr.open("get", apiurl, bool);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                        var val = xhr.responseText;
                        jsonData = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                    }
                };
                xhr.send(null);
            }();
            return jsonData;
        }
        console.log(bool);
    }
    //->把外界需要使用的方法暴露给utils
    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        css: css,
        getCss:getCss,
        lzy:lzy,
        ajax1:ajax1,
        ajax:ajax
    }
})();

var uts=(function (){
    //三个相同块用 内容拼接
    function conImg(curEleS,json){
        var curEle=utils.children(curEleS,"div")[1];
        var cur=null,cur1=null,cur2=null,cur3=null,cur4=null,cur5=null,cur6=null,cur7=null,cur8=null;
        if(json.length===9){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3],cur4=json[4],cur5=json[5],cur6=json[6],cur7=json[7],cur8=json[8];
        }else if(json.length===8){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3],cur4=json[4],cur5=json[5],cur6=json[6],cur7=json[7];
        }else if(json.length===7){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3],cur4=json[4],cur5=json[5],cur6=json[6];
        } else if(json.length===6){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3],cur4=json[4],cur5=json[5];
        }else if(json.length===5){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3],cur4=json[4];
        }else if(json.length===4){
            cur=json[0],cur1=json[1],cur2=json[2],cur3=json[3];
        }else if(json.length===3){
            cur=json[0],cur1=json[1],cur2=json[2];
        }else if(json.length===2){
            cur=json[0],cur1=json[1];
        }else if(json.length===1){
            cur=json[0];
        }else if(json.length===0){return;}

        var str="",str1="",str2="",str3="",str4="",str5="",str6="",str7="",str8="";
        str+="<div class='leftImg fl'>";
        for(var i=0;i<cur.length;i++){
            var curs=cur[i];
            str+="<div>";
            str+="<a href='"+curs["ah"]+"'>";
            str+="<img src='' tureImg='"+curs["img"]+"'/>";
            str+="</a>";
            str+="</div>";
        }
        str+="</div>";

        //var cur11=cur1[0];
        function strs(obj){
            if(obj===null){
                return "";
            }
            var obj1=obj[0],str2="";
            str2+="<div class='box'>";
            for(i=0;i<obj1.length;i++){
                var cur1s=obj1[i];
                str2+="<li>";
                str2+="<div class='div1'>";
                str2+="<a href='"+cur1s["ah"]+"'>";
                str2+="<img src='' tureImg='"+cur1s["img"]+"'/>";
                str2+="</a>";
                str2+="</div>";
                str2+="<h4>";
                str2+="<a href='"+cur1s["ah1"]+"'>"+cur1s["hcon"]+"</a>";
                str2+="</h4>";
                str2+="<p class='p2'>"+"<b>"+cur1s["p2b"]+"</b>"+"<i>"+cur1s["p2i"]+"</i>"+"</p>";
                str2+="<p class='p1'>"+cur1s["p1"]+"</p>";
                str2+="<span>"+cur1s["sp"]+"</span>";
                str2+="<div class='div2'>";
                str2+="<p class='p1'>"+cur1s["p3"]+"</p>";
                str2+="<p class='p3'>"+cur1s["p4"]+"</p>";
                str2+="</div>";
                str2+="</li>";
            }
            var cur12=obj[1][0];
            str2+="<div class='lists'>";
            str2+="<div>";
            str2+="<h5>";
            str2+="<a href='"+cur12["ah"]+"'>"+cur12["hcon"]+"</a>";
            str2+="<p>"+cur12["p1"]+"</p>";
            str2+="</h5>";
            str2+="<a href='"+cur12["ah1"]+"'>";
            str2+="<img src='' tureImg='"+cur12["img1"]+"'/>";
            str2+="</a>";
            str2+="</div>";

            str2+="<div>";
            str2+="<h5>";
            str2+="<a href='"+cur12["ah1"]+"'>"+cur12["p2"]+"</a>";
            str2+="<p>"+cur12["p2s"]+"</p>";
            str2+="</h5>";
            str2+="<a href='"+cur12["ah1"]+"'>";
            str2+="<img src='' tureImg='"+cur12["img2"]+"'/>";
            str2+="</a>";
            str2+="</div>";
            str2+="</div>";
            str2+="</div>";

            return str2
        }
        str2=strs(cur1);
        str3=strs(cur2)
        str4=strs(cur3);
        str5=strs(cur4);
        str6=strs(cur5);
        str7=strs(cur6);
        str8=strs(cur8);

        str1="<ul class='rightImg fr clear'>"+str2+str3+str4+str5+str6+str7+str8+"</ul>";
        curEle.innerHTML=(str+str1);
    }

    //单独 智能设备
    function conImgs(curEleS,json){
        var curEle=utils.children(curEleS,"div")[1];
        var cur=json[0][0],cur1=json[1],str="",str1="";
        str+="<div class='leftImg fl'>";
        str+="<a href='"+cur["ah"]+"'>";
        str+="<img src='' tureImg='"+cur["img"]+"'/>";
        str+="</a>";
        str+="</div>";
        str1+="<ul class='rightImg fr clear'>";
        for(var i=0;i<cur1.length;i++){
            var curs=cur1[i];
            str1+="<li>";
            str1+="<div class='div1'>";
            str1+="<a href='"+curs["ah"]+"'>";
            str1+="<img src='' tureImg='"+curs["img"]+"'/>";
            str1+="</a>";
            str1+="</div>";
            str1+="<h4>";
            str1+="<a href='"+curs["ah1"]+"'>"+curs["hcon"]+"</a>";
            str1+="</h4>";
            str1+="<p class='p1'>"+curs["p1"]+"</p>";
            str1+="<p class='p2'>"+"<b>"+curs["p2b"]+"</b>"+"<i>"+curs["p2i"]+"</i>"+"</p>";
            str1+="<span>"+curs["sp"]+"</span>";
            str1+="</li>";
        }
        str1+="</ul>";
        str+=str1;
        curEle.innerHTML=str;
    }

    //通用  新 折 邮
    function shows(curEleS){
        var curEle=utils.children(curEleS,"div")[1];
        var curEleUl=utils.children(curEle,"ul")[0];
        var divs=utils.children(curEleUl,"div");
        var spans=curEleUl.getElementsByTagName("span");
        for(var i=0;i<divs.length;i++){
            i==0?divs[i].style.display="block":null;
        }
        for(var j=0;j<spans.length;j++){
            var span=spans[j];
            span.innerHTML=="新品"?span.className="bg2":(span.innerHTML=="享9折"?span.className="bg3":(span.innerHTML=="享8折"?span.className="bg3":(span.innerHTML=="享7折"?span.className="bg3":(span.innerHTML=="享7折"?span.className="bg3":(span.innerHTML=="享5折"?span.className="bg3":(span.innerHTML=="免邮费"?span.className="bg1":null))))));
        }
    }

    //通用 hover
    function moveSS(curEleS){
        if(arguments[1]==="function"){
            var ar=arguments[1];
            ar(b);
        }
        var curEle=utils.children(curEleS,"div")[1];
        var div=utils.children(curEle,"div")[0],oa=div.getElementsByTagName("a");
        var li=curEle.getElementsByTagName("li");
        for(var i=0;i<oa.length;i++){
            var oA=oa[i];
            oA.onmouseover=function (){
                window.zhufengAnimate(this,{
                    top: -2,
                    boxShadow: " 0px 5px 10px 5px #e1e1e1"
                },200);
            };
            oA.onmouseout=function (){
                window.zhufengAnimate(this,{
                    top: 0,
                    boxShadow: " 0px 0px 0px 0px #e1e1e1"
                },200);
            };
        }
        for(var k=0;k<li.length;k++){
            var oLi=li[k];
            oLi.onmouseover=function (){
                window.zhufengAnimate(this,{
                    top: -2,
                    boxShadow: " 0px 5px 10px 5px #e1e1e1"
                },200);
                if(utils.children(this,"div").length===2){
                    var div=utils.children(this,"div")[1];
                    window.zhufengAnimate(div,{
                        display: "block"
                    },10,function(){
                        window.zhufengAnimate(div,{
                            top: 224
                        },200)
                    });
                }
            };
            oLi.onmouseout=function (){
                window.zhufengAnimate(this,{
                    top: 0,
                    left:0,
                    boxShadow: " 0px 0px 0px 0px #e1e1e1"
                },200);
                if(utils.children(this,"div")[1]){
                    var div=utils.children(this,"div")[1];
                    window.zhufengAnimate(div,{
                        top: 300
                    },200,function(){
                        window.zhufengAnimate(div,{
                            display: "none"
                        },10)
                    });
                }
            }
        }
    }

    //最后三个图片list用
    function moveSSs(curEleS){
        var curEle=utils.children(curEleS,"div");
        if(curEleS===HotComList){
            for(var i=0;i<curEle.length;i++){
                var oA=curEle[i];
                oA.onmouseenter=function (){
                    var op=this.getElementsByTagName("p")[0];
                    var op1=utils.children(op,"a")[0];
                    window.zhufengAnimate(op1,{
                        textShadow:"3px 3px #c6c6c6"
                    },100,function (){
                        window.zhufengAnimate(
                            op1,{
                                textShadow:"0 0 #c6c6c6"
                            },100
                        )
                    });
                    window.zhufengAnimate(this,{
                        top: -3,
                        boxShadow: " 0px 5px 10px 5px #e1e1e1"
                    },200);
                };
                oA.onmouseleave=function (){
                    window.zhufengAnimate(this,{
                        top: 0,
                        boxShadow: " 0px 0px 0px 0px #e1e1e1"
                    },200);
                };
            }
        }
        else  if(curEleS===HotComList1){
            for(var i=0;i<curEle.length;i++){
                var oA=curEle[i];
                oA.onmouseenter=function (){
                    var op=utils.children(this,"p")[0];
                    window.zhufengAnimate(op,{
                        display: "block"
                    },100);
                    window.zhufengAnimate(this,{
                        top: -2,
                        boxShadow: " 0px 5px 10px 5px #e1e1e1"
                    },200);
                };
                oA.onmouseleave=function (){
                    var op=utils.children(this,"p")[0];
                    window.zhufengAnimate(op,{
                        display: "none"
                    },100);
                    window.zhufengAnimate(this,{
                        top: 0,
                        boxShadow: " 0px 0px 0px 0px #e1e1e1"
                    },200);
                };
            }
        }
        else {
            for( i=0;i<curEle.length;i++){
                var oaa=curEle[i];
                oaa.onmouseover=function (){
                    window.zhufengAnimate(this,{
                        top: -3,
                        boxShadow: " 0px 5px 10px 5px #e1e1e1"
                    },200);
                };
                oaa.onmouseout=function (){
                    window.zhufengAnimate(this,{
                        top: 0,
                        boxShadow: " 0px 0px 0px 0px #e1e1e1"
                    },200);
                };
            }
        }

    }
    //选项卡
    function tabs(curEleS){
        var curEle0=utils.children(curEleS,"div")[0];
        var curEle1=utils.children(curEleS,"div")[1];
        var ul0=curEle0.getElementsByTagName("ul")[0];
        var ul1=curEle1.getElementsByTagName("ul")[0];

        var oLis=ul0.getElementsByTagName("li");
        var oDivs=utils.children(ul1,"div");

        for(var i=0;i<oLis.length;i++){
            oLis[i].sss=i;
            var oli=oLis[i];
            oli.onmouseenter=function(){
                var sibilngs=utils.siblings(this);
                console.log(sibilngs);
                utils.removeClass(this,"bg");
                window.zhufengAnimate(this,{
                    color:" #ff6700",
                    borderBottom:" 2px solid #ff6700"
                },150,function (){
                    for(var i=0;i<sibilngs.length;i++){
                        window.zhufengAnimate(sibilngs[i],{
                            color:" #424242",
                            borderBottomColor:"#f5f5f5"

                        },300)
                    }
                });
                var div=oDivs[this.sss];
                var sibilngs1=utils.siblings(div);
                oDivs[this.sss].style.display="block";
                for(var k=0;k<sibilngs1.length;k++){
                    sibilngs1[k].style.display="none";
                }
            }
        }
    }

    //没用
    function showMove(curEleS){
        var oli=curEleS.getElementsByTagName("li");
        for(var i=0;i<oli.length;i++){
            oli[i].index=i;
            var oLi=oli[i];
            oLi.onmouseover=function (){
                var div=utils.children(this,"div")[1];

            }
            oLi.onmouseout=function (){

            }
        }
    }

    //为您推荐 内容拼接
    function conImgss(curEle,json){
        var str="",str1="";
        for(var i=0;i<json.length;i++){
            var cur=json[i];
            str1+="<li>";
            str1+="<a href='"+cur["ah1"]+"'>";
            str1+="<img src='"+cur["img"]+"' trueImg='"+cur["img"]+"'/>";
            str1+="</a>";
            str1+="<p class='p1'>";
            str1+="<a href='"+cur["ah2"]+"'>"+cur["p1"]+"</a>";
            str1+="</p>";
            str1+="<p class='p2'>";
            str1+=cur["p2"];
            str1+="<b>"+cur["p2b"]+"</b>";
            str1+="</p>";
            str1+="<p class='p3'>";
            str1+=cur["p3"];
            str1+="</p>";
            str1+="<span>"+cur["sp"]+"</span>";
            str1+="</li>";

        }
        str+="<ol id='ol'>"+str1+"</ol>";
        curEle.innerHTML=str;
    }

    //左右切换
    function moveLR(curEle,kuang){
        var oLits=utils.children(curEle)[0];
        var le=utils.children(kuang)[0];
        var ri=utils.children(kuang)[1];
        var oi1=utils.children(le)[0];
        var oi2=utils.children(ri)[0];
        var curW=oLits.offsetWidth;
        var curL=oLits.offsetLeft;
        var W=curW/4;
        var mxaL=-(curW-W);
        function aa(){
            var curL=oLits.offsetLeft;
            if(curL===0){
                ri.style.cursor="default";
                oi2.style.color="#e0e0e1";
            }else{
                ri.onmouseenter=function(){
                    oi2.style.color="#ff6700";
                };
                ri.onmouseleave=function(){
                    oi2.style.color="#ccc";
                };
                ri.style.cursor="pointer";
                oi2.style.color="#ccc";
            }
            if(curL===mxaL){
                le.style.cursor="default";
                oi1.style.color="#e0e0e1";
            }else{
                le.onmouseenter=function(){
                    oi1.style.color="#ff6700";
                };
                le.onmouseleave=function(){
                    oi1.style.color="#ccc";
                };
                le.style.cursor="pointer";
                oi1.style.color="#ccc";
            }
        }
        aa();
        le.onclick=function(){
            aa();
            var curL=oLits.offsetLeft;
            if(curL==mxaL){
                oLits.style.left=-3720;
                return;
            }else {
                if(curL>=mxaL){
                    console.log(curL===mxaL)
                    le.time=window.zhufengAnimate(oLits,{
                        left:curL+(-W)
                    },150,function(){
                        if(curL<=mxaL){
                            oLits.style.left=-mxaL;
                            return
                        }})
                }
            }
        };

        ri.onclick=function(){
            aa();
            var curL=oLits.offsetLeft;
            if(curL==0){
                return;
            }else {
                if(curL<=0){
                    window.zhufengAnimate(oLits,{
                        left:curL+W
                    },150,function(){
                        if(curL<=mxaL){
                            oLits.style.left=-mxaL;
                            return
                        }})
                }
            }
        }

    }

    function moveRL(curEle,kuang){
        var oLits=curEle;
        var le=utils.children(kuang)[0];
        var ri=utils.children(kuang)[1];
        var oi1=utils.children(le)[0];
        var oi2=utils.children(ri)[0];
        var curW=oLits.offsetWidth;
        var curL=oLits.offsetLeft;
        var W=curW/2;
        var mxaL=-(curW-W);
        function aa(){
            var curL=oLits.offsetLeft;
            if(curL===0){
                ri.style.cursor="default";
                oi2.style.color="#e0e0e1";
            }else{
                ri.onmouseenter=function(){
                    oi2.style.color="#ff6700";
                };
                ri.onmouseleave=function(){
                    oi2.style.color="#ccc";
                };
                ri.style.cursor="pointer";
                oi2.style.color="#ccc";
            }
            if(curL===mxaL){
                le.style.cursor="default";
                oi1.style.color="#e0e0e1";
            }else{
                le.onmouseenter=function(){
                    oi1.style.color="#ff6700";
                };
                le.onmouseleave=function(){
                    oi1.style.color="#ccc";
                };
                le.style.cursor="pointer";
                oi1.style.color="#ccc";
            }
        }
        aa();
        le.onclick=function(){
            aa();
            var curL=oLits.offsetLeft;
            if(curL==mxaL){
                oLits.style.left=mxaL;
                return;
            }else {
                if(curL>=mxaL){
                    console.log(curL===mxaL)
                    le.time=window.zhufengAnimate(oLits,{
                        left:curL+(-W)
                    },150,function(){
                        if(curL<=mxaL){
                            oLits.style.left=-mxaL;
                            return
                        }})
                }
            }
        };

        ri.onclick=function(){
            aa();
            var curL=oLits.offsetLeft;
            if(curL==0){
                return;
            }else {
                if(curL<=0){
                    window.zhufengAnimate(oLits,{
                        left:curL+W
                    },150,function(){
                        if(curL<=mxaL){
                            oLits.style.left=-mxaL;
                            return
                        }})
                }
            }
        }
    }
    return{
        conImg:conImg,
        conImgs:conImgs,
        shows:shows,
        moveSS:moveSS,
        tabs:tabs,
        showMove:showMove,
        conImgss:conImgss,
        moveLR:moveLR,
        moveRL:moveRL,
        moveSSs:moveSSs
    }
})();