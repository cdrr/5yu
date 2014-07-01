//定义过滤器
app.filter('rank',function(){
    return function(e){
        switch(e)
        {
            case 1:
                return   "小吉";
                break;
            case 2:
                return   "中吉";
                break;
            case 3:
                return  "大吉";
                break;
            case 4:
                return  "王老吉";
                break;
            case 5:
                return  "王老吉吉";
                break;
            default:
                return   "";
        };
    }
});
//回车过滤
