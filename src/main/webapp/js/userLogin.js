var PROJECT = {};//当前项目信息
var tempProjectID = '';

function gotoLogin() {
    var URL = window.location.href;
    if (URL.charAt(URL.length - 1) === '#') {
        URL = URL.substring(0, URL.length - 1)
    }
    this.location = URL + ".login";
}

function logout() {
    //获取当前URL
    var URL = window.location.href;
    //清楚token
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    //设置cookie过期
    document.cookie = "token" + "=a;domain=" + ";path=/; expires=" + date.toGMTString();
    //强制刷新当前页面
    location.reload(true)
}


var reg = new RegExp("(^|&)" + "tempProjectID" + "=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r != null) {
    tempProjectID = unescape(r[2]);
} else {
    tempProjectID = '';
}

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '.login',
        mehtod: 'get',
        async: false,
        data: {
            "rq": "getUserInfo"
        },
        success: function (data) {
            if (data.state === false || data.username !== 'admin') {//匿名用户
                gotoLogin();
            }
            else {//登录用户
                $("#userName").html(data.username);
                $("#userDropDown").html(' <li><a href="#" onclick="gotoUserInfo()"><i class="icon-user"></i> 个人资料</a></li><li class="divider"></li><li><a href="#" onclick="logout()" style="cursor:pointer;"><i class="icon-off"></i> 退出</a></li>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
            console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
            console.log("textStatus是：" + textStatus);
            console.log("errorThrown是：" + errorThrown);
        }
    })
}