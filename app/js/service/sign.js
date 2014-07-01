/*
* 公共服务
* 路由服务
* leer2014.5.6
* */
var app = angular.module("myApp",["ngRoute"]);

//占卜数据服务
app.factory("signGet", function ($http, $q) {
    return {
      signGetalldata : function () {
// 定义回调
          var deferred = $q.defer();
// 取得ID
          var signId = localStorage.getItem("signId");
          $http.post("http://api.uihoo.com/astro/astro.http.php?fun=day&id=" + signId + "&format=json")
              .success(function (data, status, headers, config) {
                    deferred.resolve(data);
              }).error(function (data, status, headers, config) {
              var data = {"title" : "博丽结界不安定...获取不到天界的消息"};
              deferred.reject(data);
          });
          return deferred.promise;
      }
    };
});

//路由设置
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/list", {
            controller : 'blogGer',
            templateUrl : 'view/bloglist.html'
        })
        .otherwise({
            redirectTo : '/'
        });
}]);