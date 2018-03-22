//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                  BUG辟易
//             佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？
//定义tomcat中自带的项目
var basicApp = ['/', '/docs', '/examples', '/manager', '/webresources', '/host-manager', '/InnovationAppManagementKits'];
var tomcatProjectInfo = [];//初始化tomcat项目
$(document).ready(function () {
    getUserInfo();//获取用户信息
    var width = $(window).get(0).innerWidth;//获取屏幕高度
    $('#pageContent').css("width", width - 230);//分页长度自适应
    $('#sidebar').unbind('click');//取消侧边栏鼠标点击事件
    addAllApp();
});

// 加载所有app
function addAllApp() {
    $.ajax({//获取tomcat中正在运行的App
        type: "post",
        url: "AppManager",
        data: {},
        success: function (data) {
            tomcatProjectInfo = JSON.parse(data);//获取tomcat所有实例
            addApp(JSON.parse(data));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
            console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
            console.log("textStatus是：" + textStatus);
            console.log("errorThrown是：" + errorThrown);
        }
    });
}

// 填充app
function addApp(data) {
    data.forEach(function (element, index, array) {
        if (basicApp.indexOf(element.appPath) === -1) {
            if (element.displayName === undefined) {
                console.log('Tomcat中' + element.appPath + '配置不正确');
            } else {
                $('.gallery-entries.clearfix').prepend('<div><li class="gallery-item"><a href="#"\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  rel="external"><img\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  style="width: 56px; height: 56px;"\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  src="image/productmanager.png" id="' + index + '" onclick="basicInfo(this)"\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ><br>\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="appname-div">' + element.displayName + '</div>\n' +
                     '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  </a></li></div>');
            }
        }
    });
}

//显示所有app信息
function showAllApp() {
    $('.gallery-entries.clearfix').empty();//清空列表
    addAllApp();
}

//显示某个app信息
function showListApp(node) {
    var listArr = [];
    var nodeText = $(node).children()[0].parentElement.innerText;
    tomcatProjectInfo.forEach(function (element, index, array) {
        if (element.webAppCategory === nodeText) {
            listArr.push(element);
        }
    });
    $('.gallery-entries.clearfix').empty();//清空列表
    addApp(listArr);//添加当前列表app
    console.log(listArr);
}

$(window).resize(function () {
    var width = $(window).get(0).innerWidth;//获取屏幕高度
    $('#pageContent').css("width", width - 230);//分页长度自适应
});

//模态框基本信息
function basicInfo(node) {
    $('#manageOftenApp').attr('appId', $(window.event.target).attr('id'));
    $('#appName').html($(node.parentNode).children('div').html());//修改模态框标题
    var curTomcatInstance = tomcatProjectInfo[parseInt($(node).attr('id'))];//获取当前tomcat实例信息数组
    $('#appStatus').html(curTomcatInstance.running);//运行状态
    $('#appVisitNum').html(curTomcatInstance.visitNum);//访问次数
    $('#appAttribute').html(curTomcatInstance.webAppAttributeLabel);//属性标签
    $('#appFunctionDes').html(curTomcatInstance.webAppDescription);//功能描述
    $('#appVersion').html(curTomcatInstance.webAppVersion);//版本号
    $('#manageOftenApp').modal('show');
}

function appManagement(data) {
    $.ajax({//管理tomcat中正在运行的项目
        type: "post",
        url: "AppStatus",
        data: data,
        success: function (data) {
            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
            console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
            console.log("textStatus是：" + textStatus);
            console.log("errorThrown是：" + errorThrown);
        }
    });
}

function enterApp() {
    var appId = parseInt($('#manageOftenApp').attr('appId'));//获取Tomcat项目Id
    window.open('http://' + window.location.host + tomcatProjectInfo[appId].appPath);
}

function startApp() {
    var appId = parseInt($('#manageOftenApp').attr('appId'));//获取Tomcat项目Id
    var data = {'Info': '/start', 'path': tomcatProjectInfo[appId].appPath};
    $('#reloadApp').attr('class', 'btn btn-purple');//打开重启按钮
    appManagement(data);
}

function stopApp() {
    var appId = parseInt($('#manageOftenApp').attr('appId'));//获取Tomcat项目Id
    var data = {'Info': '/stop', 'path': tomcatProjectInfo[appId].appPath};
    $('#reloadApp').attr('class', 'btn disabled btn-purple');//取消重启按钮
    appManagement(data);
}

function reloadApp() {
    var appId = parseInt($('#manageOftenApp').attr('appId'));//获取Tomcat项目Id
    var data = {'Info': '/reload', 'path': tomcatProjectInfo[appId].appPath};
    appManagement(data);
}