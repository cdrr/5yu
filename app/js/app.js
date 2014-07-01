/*
 * leer
 * 2014/4/20
 * */
//博丽神社
//星座集合
app.controller("signGet",["$scope","$timeout",function($scope,$timeout){
    var mainCon = document.querySelector('#mainCon');
    var signGet = document.querySelector('#signGet');
    $scope.signitems = [{id:0,name:'白羊座'},{id:1,name:'金牛座'},
        {id:2,name:'双子座'},{id:3,name:'巨蟹座'},{id:4,name:'狮子座'},{id:5,name:'处女座'},{id:6,name:'天秤座'},{id:7,name:'天蝎座'},
        {id:8,name:'射手座'},{id:9,name:'魔羯座'},{id:10,name:'水瓶座'},{id:11,name:'双鱼座'}];
    //判断是否得到星座
    if(localStorage.getItem("signId") == null){
        angular.element(mainCon).css("display","none");
        angular.element(signGet).css("display","block");
    }
    else{
        angular.element(signGet).css("display","none");
    }
    $scope.getID = function($event){
        var signId = $event.target.getAttribute('data');
        localStorage.setItem("signId",signId);
        var li = angular.element($event.target);
        li.addClass("on");
        $timeout(function(){
            angular.element(signGet).css("display","none");
            angular.element(mainCon).css("display","block");},1000);
    }
}]);
//卡片以及占卜数据呈现
app.controller("cardGet",["$scope","$http","$timeout","signGet",function($scope, $http, $timeout, signGet){
    //获取数组
    var cardmodeldata =[];
    if(localStorage.getItem("cardData") == null){
        $http.get('data/moe.json').success(function(data){
            cardmodeldata = data;
            var carddata = angular.toJson(data);
            localStorage.setItem("cardData",carddata);
        });
    }else{
        cardmodeldata = angular.fromJson(localStorage.getItem("cardData"));
    }


    //定义卡片对象
    var cardInfo = {
        "timedata":0,
        "cardgone":[],
        "time":0
    };

    var cardNone = document.querySelector('#cardNone');
    var cardCon = document.querySelector('#cardCon');
    var cardLoad = document.querySelector('#cardLoad');
    //读取本地存储判断页面
    if(localStorage.getItem("cardInfo") == null){
        //显示喇叭子
        angular.element(cardNone).css("display","block");
        angular.element(cardCon).css("display","none");
    }
    else{
        var cardnumlocal = angular.fromJson(localStorage.getItem("cardInfo"))["timedata"];
        var cardnumday = angular.fromJson(localStorage.getItem("cardInfo"))["time"];
        $scope.signData = angular.fromJson(localStorage.getItem("signData"));
        //判断第二天
        var now = new Date().getDate();
        if(now <= cardnumday ){
            $scope.imgurl = cardmodeldata[cardnumlocal]["imageUrl"];
            angular.element(cardNone).css("display","none");
            angular.element(cardCon).css("display","block");
        }else{
            angular.element(cardNone).css("display","block");
            angular.element(cardCon).css("display","none");
        }
    }
    //动画效果
    function loadChange(){
        var front = document.querySelector('#front');
        var back = document.querySelector('#back');
        if(angular.element(front).hasClass("fliped")){
            angular.element(front).removeClass().addClass("flip");
            angular.element(back).removeClass().addClass("fliped");
        }
        else{
            angular.element(front).removeClass().addClass("fliped");
            angular.element(back).removeClass().addClass("flip");
        }
    }
    //重复进行

    //占卜点击事件
    $scope.cardPlan= function(){
        //取得星座
        //定义星级对应评语过滤器;
        var signResult = signGet.signGetalldata();
        signResult.then(function(data){
            $scope.signData = data;
            localStorage.setItem("signData",angular.toJson(data));
        });
        angular.element(cardNone).css("display","none");
        angular.element(cardCon).css("display","none");
        angular.element(cardLoad).css("display","block");
        var loadChangeid = setInterval(loadChange,300);
        var m = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
        if(localStorage.getItem("cardInfo") != null){
            m = angular.fromJson(localStorage.getItem("cardInfo"))["cardgone"]
        }

        function randArray(m, len) {
            m.sort(function () {
                return Math.random() - 0.5;
            });
            return m.slice(0, len);
        }
        //得到随机数
        var cardnum =  randArray(m,1);
        //更改卡片显示
        var cardnum1 = cardnum - 1;
        $scope.imgurl =cardmodeldata[cardnum1]["imageUrl"];
        m.splice(0,1);
        //判断剩余数组个数
        if(m.length ==0 )
        {
            m = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
        }
        cardInfo.cardgone = m;
        cardInfo.time = new Date().getDate();
        cardInfo.timedata = cardnum1;
        localStorage.setItem("cardInfo",angular.toJson(cardInfo));
        //组合呈现视图
        $timeout(function(){
            clearInterval(loadChangeid);
            angular.element(cardLoad).css("display","none");
            angular.element(cardCon).css("display","block");}, 3000);
    }
}]);

//博客订阅数据呈现
app.controller("blogGer", ["$http", "$scope", "$sce", function($http, $scope, $sce){
    $http.get('/list').
        success(function(data, status, headers, config) {
            $scope.blogsData = data;
        });
    //返回html
    $scope.contentHtml = function(e) {
        return $sce.trustAsHtml(e);
    };
}]);