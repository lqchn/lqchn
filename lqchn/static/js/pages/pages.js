var global_userid = "";
var gloabl_code = "";

$(document).ready(function(){
    inituser();

    $("#createact").click(function(){
        activityCreate();
    });

    $("#club").click(function(){
        $("#modeul").children().remove();
        var file_name = "/static/file/pages/myclub.txt";
        var myclubcode = "";
        $.ajax({
            url: file_name,
            dataType: 'text',
            success: function(data) {
                myclubcode = data;
            }
        });

        var myclublist = "/club/list/create/?u_id=" + global_userid;

        //user clublustalladd replace
        $.getJSON("/club/list/create/?u_id=" + global_userid ,function(data){
            for(var i = 0; i < data.length; i++)
            {
                var clubname = data[i].club_name;
                var detail = data[i].club_introduction;
                var clubid = data[i].club_id;
                var clubph = data[i].club_logo;
                $("#modeul").append(myclubcode);
                $(".club_detail:eq("+ String(i) +")").html(detail);
                $(".club_name:eq("+ String(i) +")").html(clubname);
                $(".club_name:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + clubid);
                $(".club_img:eq("+ String(i) +")").attr("src", clubph);
                $(".imghref:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + clubid);
                $(".myclubbtn:eq("+ String(i) +")").val(clubid);

            }

            $(".myclubbtn").click(function(){
                initchangeclubinfo($(this).val());
            });

            var file_name = "/static/file/pages/club.txt";
            var clubcode = "";
            $.ajax({
                url: file_name,
                dataType: 'text',
                success: function(data) {
                    clubcode = data;
                }
            });

            var clublistalladd = "/club/list/join/?u_id=" + global_userid;

            //user clublustalladd replace
            $.getJSON("/club/list/join/?u_id=" + global_userid ,function(data){
                for(var i = 0; i < data.length; i++)
                {
                    var clubname = data[i].club_name;
                    var detail = data[i].club_introduction;
                    var clubid = data[i].club_id;
                    var clubph = data[i].club_logo;
                    $("#modeul").append(clubcode);
                    $(".club_detail:eq("+ String(i) +")").html(detail);
                    $(".club_name:eq("+ String(i) +")").html(clubname);
                    $(".club_name:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + clubid);
                    $(".club_img:eq("+ String(i) +")").attr("src", clubph);
                    $(".imghref:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + clubid);
                    $(".delete").last().val(clubid);
                }

                $(".delete").click(function(){
                    if(confirm_deleteclub())
                    {
                        $(this).parent().parent().parent().parent().parent().hide();
                        var delclubadd = "/club/quit/?c_id="+ $(this).val();
                        $.get("/club/quit/?c_id="+ $(this).val(),function(data,status){
                            if(String(status) == "1")
                                alert("delete success");
                            else
                                alert("delete failed");
                        });
                    }
                });
            });
        });

    });


    $("#act").click(function(){

        $("#modeul").children().remove();
        var file_name = "/static/file/pages/activity.txt";
        var clubcode = "";
        $.ajax({
            url: file_name,
            dataType: 'text',
            success: function(data) {
                clubcode = data;
            }
        });

        var myactlist = "/activity/list/create/?u_id=" + global_userid;

        //user actlistalladd replace
        $.getJSON("/activity/list/create/?u_id=" + global_userid ,function(data){
            var j = 0;

            for(j = 0; j < data.length; j++)
            {
                var acttitle = data[j].title;
                var actbrief = data[j].brief;
                var actlogo = data[j].image_url;
                var actid = data[j].id;
                $("#modeul").append(clubcode);
                $(".act_title:eq("+ String(j) +")").html(acttitle);
                $(".act_title:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + String(actid));
                $(".imghref:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + String(actid));
                $(".act_intro:eq("+ String(j) +")").html(actbrief);
                $(".act_logo:eq("+ String(j) +")").attr("src", actlogo);
            }

            var actlistall = "/activity/list/club/?u_id=" + global_userid;
            $.getJSON("/activity/list/club/?u_id=" + global_userid ,function(data){
                for(var i = 0; i < data.length; i++, j++)
                {
                    var acttitle = data[i].title;
                    var actbrief = data[i].brief;
                    var actlogo = data[i].image_url;
                    var actid = data[i].id;
                    $("#modeul").append(clubcode);
                    $(".act_title:eq("+ String(j) +")").html(acttitle);
                    $(".act_title:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + actid);
                    $(".imghref:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + actid);
                    $(".act_intro:eq("+ String(j) +")").html(actbrief);
                    $(".act_logo:eq("+ String(j) +")").attr("src", actlogo);
                }

            });

        });

    });


    $("#info").click(function(){
        $("#modeul").children().remove();
        var file_name = "/static/file/pages/info.txt";
        $.ajax({
            url: file_name,
            dataType: 'text',
            success: function(data) {
                $("#modeul").append(data);
                    initself();
                $("#change_info").click(function(){
                    initchangeinfo();
                });
            }
        });
    });


    $("#com").click(function(){
        $("#modeul").children().remove();
        var file_name = "/static/templates/comment/comment.html";
        $.ajax({
            url: file_name,
            dataType: 'html',
            success: function(data) {
                $("#modeul").append(data);
            }
        });
    });

    $("#logtitle").blur(function(){
        checkTitleNull();
    });

    $("#logsubmit").click(function(){
        editor.post();
        var textAreaHtml = editor.t.value;
    });

    $("#managefriendbtn").click(function(){
        manageFriend();
    });

    $("#manageactivitybtn").click(function(){
        manageActivity();
    });


    $("#attfriend").click(function(){
        alert("关注ta么？");

        var folloadd = "/user/social/follow/?f_id=" + $(this).val();
        $.get("/user/social/follow/?f_id=" + $(this).val(),function(data,status){
            if(String(status) == "1")
                alert("你已经成功关注了ta哦!");
            else
                alert("不好意思关注失败请重试!");
        });

    });

    $("#writelogbtn").click(function(){
        loadactivity();
    });

    $("#createclubbtn").click(function(){
        $("#createclubuserid").val(global_userid);
    });

    $("#createactbtn").click(function(){
        activityCreate();
        loadclubname();
    });

    $("#manageclubbtn").click(function(){
        managemyclub();
    });

    $("editclubbtn").click(function(){
        sendeditclubinfo();
    });

    onloadprovince();
    onloadyear();
    onloadschool();


});

function confirm_deleteclub()
{
    var f = confirm("你确定要删除这个无趣得社团吗？");
    return f;
}




function inituser()
{
    var allinfoadd = "";
    $.getJSON("/user/info/",function(data){

        global_userid = data.id;
        var uname = data.name;
        var upurl = data.photo_url;
        gloabl_code = data.code;
        $("#user_photo").attr("src",upurl);
        $("#user_name").html(uname);
        allinfoadd = "/user/allinfo/?id=" + String(global_userid);

        //user allinfoadd replace
        $.getJSON("/user/allinfo/?id=" + String(global_userid),function(data){
            var sf = data.self;
            var n = data.name;
            var nn = data.nickname;
            var s = data.sign;
            var se = data.sex;
            var pro = data.home;
            var y = data.birthday;
            var sp = data.schoolpro;
            var co = data.code;
            var en = data.entrance;
            var f = data.interest;
            var t = data.tel;
            var q = data.qq;
            var wc = data.wechat;
            var wb = data.weibo;
            var em = data.email;

            if(t != "")
                $("#pn").html("电话: <br/>"  + t);
            else
                $("#pn").html("电话: 暂无");

            if(f != "")
            {
                if(f == "01")
                    $("#fe").html("爱好:户外运动");
                else if(f == "02")
                    $("#fe").html("爱好:社会服务");
                else if(f == "03")
                    $("#fe").html("爱好:文学");
                else if(f == "04")
                    $("#fe").html("爱好:艺术");
                else
                    $("#fe").html("爱好:电子竞技");
            }
            else
                $("#fe").html("爱好: 暂无");


            if(y != "")
            {
                var bir = y.split("/");
                $("#bd").html("生日:<br/> "+ bir[0] + "年" + bir[1] + "月" + bir[2] +"日");
            }
            else
                $("#bd").html("生日: 暂无");


            if(q != "")
                $("#qq").html("QQ: <br/>"  + q);
            else
                $("#qq").html("QQ: 暂无");

            if(wc != "")
                $("#wc").html("微信: <br/>"  + wc);
            else
                $("#wc").html("微信: 暂无");

            if(nn != "")
                $("#user_name").html(nn);
            else
                $("#user_name").html("绿圈中国");

            if(s != "")
                $("#user_sign").html(s);
            else
                $("#user_sign").html("延续青春、放飞梦想");

            if(sf == "0")
            {
                $("#info").hide();
                $("#functionbar").hide();
                $("#attfriend").val(global_userid); //设置a标签的值为用户id 方便关注
            }
            else
                $("#attfriend").hide();

            begin();
            initFriendList();
            initAllinfo();

        });

    });



}

function initself()
{

    var allinfoadd =  "/user/allinfo/?id=" + global_userid;

                //use allinfoadd replace
    $.getJSON("/user/allinfo/?id=" + String(global_userid),function(data){

        var n = data.name;
        var nn = data.nickname;
        var s = data.sign;
        var se = data.sex;
        var pro = data.home;
        var y = data.birthday;
        var sp = data.schoolpro;
        var co = data.code;
        var en = data.entrance;
        var f = data.interest;
        var t = data.tel;
        var q = data.qq;
        var wc = data.wechat;
        var wb = data.weibo;
        var sch = data.school;
        var lc = data.location;

        if(n != "")
            $("#info_name").html("姓名:"  + n);
        else
            $("#info_name").html("姓名: 暂无");


        if(se != "")
            $("#info_gender").html("性别:"  + se);
        else
            $("#info_gender").html("性别: 暂无");

        if(pro != "")
            $("#info_homeland").html("家乡:" + pro);
        else
            $("#info_homeland").html("家乡: 暂无");

        if(sp != "" && co != "")
        {

            var a = provinceName.indexOf(sp) + 1;
            var b = eval("schoolcode" + String(a));
            var c = eval("school" + String(a));
            var n = b.indexOf(co);
            $("#info_school").html("学校:"  + c[n]);
        }
        else
            $("#info_school").html("学校: 暂无");

        if(en != "")
            $("#info_entrance").html("入学年份:"  + en);
        else
            $("#info_entrance").html("入学年份: 暂无");

        if(wb != "")
            $("#info_weibo").html("微博:"  + wb);
        else
            $("#info_weibo").html("微博: 暂无");


        if(t != "")
            $("#info_tel").html("电话:"  + t);
        else
            $("#info_tel").html("电话: 暂无");


        if(f != "")
        {
            if(f == "01")
                $("#info_interest").html("爱好:户外运动");
            else if(f == "02")
                $("#info_interest").html("爱好:社会服务");
            else if(f == "03")
                $("#info_interest").html("爱好:文学");
            else if(f == "04")
                $("#info_interest").html("爱好:艺术");
            else
                $("#info_interest").html("爱好:电子竞技");
        }
        else
            $("#info_interest").html("爱好: 暂无");


        if(y != "")
            $("#info_birthday").html("生日: " + y);
        else
            $("#info_birthday").html("生日: 暂无");


        if(q != "")
            $("#info_qq").html("QQ: "  + q);
        else
            $("#info_qq").html("QQ: 暂无");


        if(wc != "")
            $("#info_wechat").html("微信: "  + wc);
        else
            $("#info_wechat").html("微信: 暂无");


        if(nn != "")
            $("#info_nick").html("昵称: " + nn);
        else
            $("#info_nick").html("昵称: 绿圈中国");


        if(s != "")
            $("#info_sign").html("个性签名:" + s);
        else
            $("#info_sign").html("个性签名: 延续青春、放飞梦想");

    });
}

function begin()
{


    $("#modeul").children().remove();
    var file_name = "/static/file/pages/activity.txt";
    var clubcode = "";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            clubcode = data;
        }
    });

    var myactlist = "/activity/list/create/?u_id=" + global_userid;

    //user actlistalladd replace
    $.getJSON("/activity/list/create/?u_id=" + global_userid ,function(data){
        var j = 0;

        for(j = 0; j < data.length; j++)
        {
            var acttitle = data[j].title;
            var actbrief = data[j].brief;
            var actlogo = data[j].image_url;
            var actid = data[j].id;
            $("#modeul").append(clubcode);
            $(".act_title:eq("+ String(j) +")").html(acttitle);
            $(".act_title:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + String(actid));
            $(".imghref:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + String(actid));
            $(".act_intro:eq("+ String(j) +")").html(actbrief);
            $(".act_logo:eq("+ String(j) +")").attr("src", actlogo);
        }

        var actlistall = "/activity/list/club/?u_id=" + global_userid;
        $.getJSON("/activity/list/club/?u_id=" + global_userid ,function(data){
            for(var i = 0; i < data.length; i++, j++)
            {
                var acttitle = data[i].title;
                var actbrief = data[i].brief;
                var actlogo = data[i].image_url;
                var actid = data[i].id;
                $("#modeul").append(clubcode);
                $(".act_title:eq("+ String(j) +")").html(acttitle);
                $(".act_title:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + actid);
                $(".imghref:eq("+ String(j) +")").attr("href", "/activity_home/?a_id=" + actid);
                $(".act_intro:eq("+ String(j) +")").html(actbrief);
                $(".act_logo:eq("+ String(j) +")").attr("src", actlogo);
            }

        });

    });
}


function initchangeinfo()
{

    $("#editinfoid").val(global_userid);

    var allinfoadd = "/user/allinfo/?id=" + global_userid;
            //use allinfoadd replace
    $.getJSON("/user/allinfo/?id=" + global_userid,function(data){
        var n = data.name;
        var nn = data.nickname;
        var s = data.sign;
        var se = data.sex;
        var pro = data.home;
        var y = data.birthday;
        var sp = data.schoolpro;
        var co = data.code;
        var en = data.entrance;
        var f = data.interest;
        var t = data.tel;
        var q = data.qq;
        var wc = data.wechat;
        var wb = data.weibo;


        if(n != "")
            $("#inputName1").val(n);

        if(se != "")
        {
            if(se == "male")
                $("#inlineRadio1").attr("checked","checked");
            else
                $("#inlineRadio2").attr("checked","checked");
        }

        if(pro != "")
        {
            var a = pro.split("-");
            $("#province").val(a[0]);
            cityName(a[0]);
            $("#city").val(a[1]);
        }

        if(y != "")
        {
            var a = y.split("/");
            $("#year").val(a[0]);
            var b = parseInt(a[0]) - 1980;
            monthName(b);
            $("#month").val(a[1]);
            dayName(a[1]);
            $("#day").val(a[2]);
        }

        if(sp != "" && co != "" && en != "")
        {
            $("#schoolpro").val(sp);
            schoolName(sp);
            $("#university").val(co);
            $("#dateday").val(en);
        }

        if(wb != "")
            $("#inputWeibo").val(wb);

        if(t != "")
            $("#inputPhoneNum").val(t);

        if(f != "")
            $("#interest").val(f);


        if(q != "")
            $("#inputQQ").val(q);


        if(wc != "")
            $("#inputWechat").val(wc);


        if(nn != "")
            $("#inputNickName").val(nn);


        if(s != "")
            $("#inputSign").val(s);

    });
}


<!-- tinyEditor tinyEditor tinyEditor tinyEditor tinyEditor  -->

function check()
{
    var name = document.form.clubname.value;
    var title = document.form.title.value;
    editor.post();
    var textAreaHtml = editor.t.value;
    if(title == "")
    {
        $("#tinywarnning").show();
        $("#recordlog").addClass("has-error");
        return false;
    }
    if(name == "" || textAreaHtml == "" || title == "")
    {
        $("#recordlog").addClass("has-error");
        return false;
    }
    $('#myModal').modal('hide');
    return true;
}

function checkTitleNull()
{
    var title = document.form.title.value;
    if(title == "")
        $("#recordlog").addClass("has-error");
    else
        $("#recordlog").removeClass("has-error");
}


function cancel1() {
    var obj = document.getElementById('choosepic1') ;
    obj.outerHTML=obj.outerHTML;
}
function cancel2() {
    var obj = document.getElementById('choosepic2') ;
    obj.outerHTML=obj.outerHTML;
    $("#choosepart2").hide();
}
function cancel3() {
    var obj = document.getElementById('choosepic3') ;
    obj.outerHTML=obj.outerHTML;
    $("#choosepart3").hide();
}
function cancel4() {
    var obj = document.getElementById('choosepic4') ;
    obj.outerHTML=obj.outerHTML;
    $("#choosepart4").hide();
}
function cancel5() {
    var obj = document.getElementById('choosepic5') ;
    obj.outerHTML=obj.outerHTML;
    $("#choosepart5").hide();
}
function shownext1()
{
    $("#choosepart2").show();
}
function shownext2()
{
    $("#choosepart3").show();
}
function shownext3()
{
    $("#choosepart4").show();
}
function shownext4()
{
    $("#choosepart5").show();
}
<!-- tinyEditor tinyEditor tinyEditor tinyEditor tinyEditor  -->



<!--------------------------- Editor Information ----------------------->
//~~~~~~~~~省份 城市选择~~~~~~~~~~~~
function getObj(id) {
    return document.getElementById(id);
}

//全国省市县级联
// JavaScript Document

//北京市辖区名称
var city1 = ["东城区","西城区","崇文区","宣武区","朝阳区","海淀区","丰台区","石景山区","房山区","通州区","顺义区","门头沟区","昌平区","大兴区","怀柔区","平谷区","密云县","延庆县"];
//上海市辖区名称
var city2 = ["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县"];
//天津市辖区名称
var city3 = ["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","宁河县","静海县","蓟县"];
//重庆市辖区名称
var city4 = ["渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万县区","涪陵区","永川市","合川市","江津市","南川市","长寿县","綦江县","潼南县","荣昌县","壁山县","大足县","铜梁县","梁平县","城口县","垫江县","武隆县","丰都县","忠 县","开 县","云阳县","青龙镇青龙嘴","奉节县","巫山县","巫溪县","南宾镇","中和镇","钟多镇","联合镇","汉葭镇"];
//河北省主要城市名称
var city5 = ["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"];
//山西省主要城市名称
var city6 = ["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"];
//辽宁省主要城市名称
var city7 = ["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"];
//吉林省主要城市名称
var city8 = ["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"];
//河南省主要城市名称
var city9 = ["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","济源市"];
//江苏省主要城市名称
var city10 = ["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"];
//浙江省主要城市名称
var city11 = ["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"];
//安徽省主要城市名称
var city12 = ["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市"];
//福建省主要城市名称
var city13 = ["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"];
//江西省主要城市名称
var city14 = ["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"];
//山东省主要城市名称
var city15 = ["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","威海市","济宁市","泰安市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"];
//湖北省主要城市名称
var city16 = ["武汉市","黄石市","襄樊市","十堰市","荆州市","宜昌市","荆门市","鄂州市","孝感市","黄冈市","咸宁市","随州市","恩施州","仙桃市","潜江市","天门市","神农架林区"];
//湖南省主要城市名称
var city17 = ["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西州"];
//广东省主要城市名称
var city18 = ["广州市","深圳市","珠海市","汕头市","韶关市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"];
//海南省主要城市名称
var city19 = ["海口市","龙华区","秀英区","琼山区","美兰区","三亚市"];
//四川省主要城市名称
var city20 = ["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","宜宾市","广安市","达州市","眉山市","雅安市","巴中市","资阳市","阿坝州","甘孜州","凉山州"];
//贵州省主要城市名称
var city21 = ["贵阳市","六盘水市","遵义市","安顺市","铜仁地区","毕节地区","黔西南州","黔东南州","黔南州"];
//云南省主要城市名称
var city22 = ["昆明市","大理市","曲靖市","玉溪市","昭通市","楚雄市","红河市","文山市","思茅市","西双版纳市","保山市","德宏市","丽江市","怒江市","迪庆市","临沧市"];
//陕西省主要城市名称
var city23 = ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"];
//甘肃省主要城市名称
var city24 = ["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏州","甘南州"];
//青海省主要城市名称
var city25 = ["西宁市","海东地区","海北州","黄南州","海南州","果洛州","玉树州","海西州"];
//黑龙江省主要城市名称
var city26 = ["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"];
//内蒙古自治区主要城市名称
var city27 = ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒盟","阿拉善盟"];
//广西壮族自治区主要城市名称
var city28 = ["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"];
//西藏自治区主要城市名称
var city29 = ["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"];
//宁夏回族自治区主要城市名称
var city30 = ["银川市","石嘴山市","吴忠市","固原市","中卫市"];
//新疆维吾尔自治区主要城市名称
var city31 = ["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","和田地区","阿克苏地区","喀什地区","克孜勒苏柯尔克孜自治州","巴音郭楞蒙古自治州","昌吉回族自治州","博尔塔拉蒙古自治州","伊犁哈萨克自治州","塔城地区","阿勒泰地区","石河子市","阿拉尔市","图木舒克市","五家渠市"];
//台湾省主要城市名称
var city32 = ["台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市","台北县","宜兰县","桃园县","新竹县","苗栗县","台中县","彰化县","南投县","云林县","嘉义县","台南县","高雄县","屏东县","澎湖县","台东县","花莲县"];
//香港特别行政区主要辖区名称
var city33 = ["中西区","东区","九龙城区","观塘区","南区","深水埗区","黄大仙区","湾仔区","油尖旺区","离岛区","葵青区","北区","西贡区","沙田区","屯门区","大埔区","荃湾区","元朗区"];
//澳门地区
var city34 = ["澳门地区"];
//其它地区
var city35 = ["其它地区"];

//全国省会，直辖市，自治区名称
var provinceName = ["北京市","上海市","天津市","重庆市","河北省","山西省","辽宁省","吉林省","河南省","江苏省","浙江省","安徽省","福建省","江西省","山东省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","黑龙江省","内蒙古自治区","广西壮族自治区","西藏自治区","宁夏回族自治区","新疆维吾尔自治区","台湾省","香港特别行政区","澳门特别行政区","其它"];

function province()
{
    var e = getObj('province');
    for (var i=0; i<provinceName.length; i++) {
        e.options.add(new Option(provinceName[i],provinceName[i]));
    }
}
function cityName(n)
{
    var e = getObj('city');
    var num = provinceName.indexOf(n) + 1;
    for (var i=e.options.length; i>0; i--) e.remove(i);
    if (String(num) == "") return;
    var a = eval("city"+ String(num)); //得到城市的数组名
    for (var i=0; i<a.length; i++) e.options.add(new Option(a[i], a[i]));
}
function onloadprovince()
{
    province(); //初始时给省名下拉菜单赋内容
}

<!--~~~~~~~~Birthday choose~~~~~~~~~-->
var yearChoose = ["1980","1981","1982","1983","1984","1985","1986","1987","1988","1989",
    "1990","1991","1992","1993","1994","1995","1996","1997","1998","1999",
    "2000","2001","2002","2003","2004","2005","2006","2007","2008","2009",
    "2010","2011","2012","2013","2014"];

var monthChoose = ["1","2","3","4","5","6","7","8","9","10","11","12"];

var bigDay = ["1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29",
    "30","31"];
var smallDay = ["1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29",
    "30"];
var leapTwo = ["1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29"];
var notLeapTwo = ["1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28"];

function year()
{
    var a = document.getElementById('year');
    var y = document.form1.year.value;
    for (var i=0; i<yearChoose.length; i++) {
        a.options.add(new Option(yearChoose[i], String(parseInt(i) + 1980)));

    }
}

function monthName(n)
{
    var e = getObj('month');
    for (var i=e.options.length; i>0; i--) e.remove(i);
    if (n == "") return;

    var a = eval("monthChoose");
    for (var i=0; i<a.length; i++) e.options.add(new Option(a[i], a[i]));
}

function dayName(n)
{
    var getY = document.form1.year.value;
    var getM = document.form1.month.value;
    var e = document.getElementById("day");
    for (var i=e.options.length; i>0; i--) e.remove(i);
    if (n == "") return;
    var getYear = parseInt(getY) + 1979;
    var getMonth = parseInt(getM);
    if(((getYear % 4 == 0) && (getYear % 100 != 0)) || (getYear % 400 == 0))
    {
        if(getMonth == 2)
            var a = eval("leapTwo");
        else
        {
            if(getMonth == 1 || getMonth == 3 || getMonth == 5 || getMonth == 7 || getMonth == 8 || getMonth == 10 || getMonth == 12)
                var a = eval("bigDay");
            else
                var a = eval("smallDay");
        }
    }
    else
    {
        if(getMonth == 2)
            var a = eval("notLeapTwo");
        else
        {
            if(getMonth == 1 || getMonth == 3 || getMonth == 5 || getMonth == 7 || getMonth == 8 || getMonth == 10 || getMonth == 12)
                var a = eval("bigDay");
            else
                var a = eval("smallDay");
        }
    }
    for (var i=0; i<a.length; i++) e.options.add(new Option(a[i], a[i]));
}


function onloadyear()
{
    year();
}
<!--~~~~~~~~~~Birthday choose~~~~~~~~~~-->


<!--~~~~~~~~~University choose~~~~~~~~~~~-->
var school16 = ["湖北汽车工业学院","湖北医药学院","湖北工业职业技术学院","郧阳师范高等专科学校"];
var schoolcode16 = ["10525","10929","11334","10518"];
function schoolprovince()
{
    var e = getObj('schoolpro');
    for (var i=0; i<provinceName.length; i++) {
        e.options.add(new Option(provinceName[i],provinceName[i]));
    }
}
function entryDate()
{
    var e = getObj('dateday');
    var y = document.form1.entrance.value;
    for (var i=0; i<yearChoose.length; i++) {
        e.options.add(new Option(yearChoose[i],String(parseInt(i) + 1980)));
    }
}
function schoolName(n)
{
    var num = provinceName.indexOf(n) + 1;
    var e = getObj('university');
    for (var i=e.options.length; i>0; i--) e.remove(i);
    if (String(num) == "") return;

    var a = eval("school"+ String(num));
    var b = eval("schoolcode" + String(num));
    for (var i=0; i<a.length; i++) e.options.add(new Option(a[i], b[i]));
}
function onloadschool()
{
    schoolprovince();
    entryDate();
}
<!--~~~~~~~~~~~University choose~~~~~~~~~~-->

function checkInfo()
{
    var scp = document.form1.schoolpro.value;
    var uni = document.form1.university.value;
    var da = document.form1.dateday.value;
    var ni = document.form1.nickname.value;

    if(scp == "" || uni == "" || da == "" || ni == "")
    {
        $("#editwarnning").show();
        return false;
    }
    return true;
}
<!----------------------------------edit information----------------------------------- -->

<!----------------------------------crate club part-------------------------------------->
function checkclub()
{
    var clubimg = document.form2.logo.value;
    var name = document.form2.club_name.value;
    var intro = document.form2.club_intro.value;
    var comm = document.form2.club_tel.value;
    var mail = document.form2.club_email.value;
    var ctype = document.form2.club_type.value;
    var cbn = document.form2.c_name.value;
    if(clubimg == "" || name == "" || intro == "" || comm == "" || mail == "" || ctype == "" || cbn == "")
    {
        $("#clubwarnning").show();
        return false;
    }
    return true;

}

<!----------------------------------crate club part-------------------------------------->


<!----------------------------------All information part-------------------------------------->

function initAllinfo()
{

    $("#allinfo").children().remove();

    var allinfocode = "";

    var file_name = "/static/file/pages/dynamicinfo.txt";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            allinfocode = data;
        }
    });

    var allinfoadd = "/news/list/school/?code=" + gloabl_code;
    //user userlistfolloadd replace
    $.getJSON("/news/list/school/?code=" + gloabl_code ,function(data){
        for(var i = 0; i < data.length; i++)
        {
            var actname = data[i].s_name;
            var actid = data[i].s_id;
            var pername = data[i].o_name;
            var perid = data[i].o_id;
            var pertime = data[i].when;
            var pertype = data[i].what;
            $("#allinfo").append(allinfocode);

            if(pertype == "1")
            {
                $(".acttype:eq("+ String(i) +")").html("创建了");
                $(".acttime:eq("+ String(i) +")").html(pertime);
                $(".actclub:eq("+ String(i) +")").html(actname);
                $(".actclub:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + actid);
                $(".clubact:eq("+ String(i) +")").html(pername);
                $(".clubact:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + perid);
            }
            else if(pertype == "2")
            {
                $(".acttype:eq("+ String(i) +")").html("修改了");
                $(".acttime:eq("+ String(i) +")").html(pertime);
                $(".actclub:eq("+ String(i) +")").html(actname);
                $(".actclub:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + actid);
                $(".clubact:eq("+ String(i) +")").html(pername);
                $(".clubact:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + perid);
            }
            else if(pertype == "3")
            {
                $(".acttype:eq("+ String(i) +")").html("发布了");
                $(".acttime:eq("+ String(i) +")").html(pertime);
                $(".actclub:eq("+ String(i) +")").html(actname);
                $(".actclub:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + actid);
                $(".clubact:eq("+ String(i) +")").html(pername);
                $(".clubact:eq("+ String(i) +")").attr("href", "/activity_home/?a_id=" + perid);
            }
            else
            {
                $(".acttype:eq("+ String(i) +")").html("发布了");
                $(".acttime:eq("+ String(i) +")").html(pertime);
                $(".actclub:eq("+ String(i) +")").html(actname);
                $(".actclub:eq("+ String(i) +")").attr("href", "/club_home/?c_id=" + actid);
                $(".clubact:eq("+ String(i) +")").html(pername + "日志");
            }

        }

    });
}

function initFriendList()
{
    $("#friendlist").children().remove();

    var friendlistcode = "";

    var file_name = "/static/file/pages/friendlist.txt";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            friendlistcode = data;
        }
    });

    var userlistfolloadd = "/user/list/following/?u_id=" + global_userid;
                //user userlistfolloadd replace
    $.getJSON("/user/list/following/?u_id=" + global_userid ,function(data){
        for(var i = 0; i < data.length; i++)
        {
            var friendname = data[i].user_name;
            var friendnick = data[i].user_nick;
            var friendid = data[i].user_id;
            var friendphoto = data[i].user_photo;
            $("#friendlist").append(friendlistcode);

            $(".friendname:eq("+ String(i) +")").html(friendname);
            $(".friendnickname:eq("+ String(i) +")").html(friendnick);
            $(".friendnickname:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + friendid);
            $(".friendphoto:eq("+ String(i) +")").attr("src", friendphoto);
            $(".frph:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + friendid);

        }
    });
}




//-----------------------------------All information part----------------------------------

//------------------------------------manage friend part------------------------------------
function manageFriend()
{

    $("#managefriend").children().remove();

    var friendlistcode = "";

    var file_name = "/static/file/pages/deletefriend.txt";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            friendlistcode = data;
            var userlistfolloadd = "/user/list/following/?u_id=" + global_userid;
        }
    });
            // use userlistfolloadd replace
    $.getJSON("/user/list/following/?u_id=" + global_userid ,function(data){
        for(var i = 0; i < data.length; i++)
        {
            var friendname = data[i].user_name;
            var friendnick = data[i].user_nick;
            var friendid = data[i].user_id;
            var friendphoto = data[i].user_photo;
            $(".friendname:eq("+ String(i) +")").html(friendname);
            $(".friendname:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + friendid);
            $(".friendnickname:eq("+ String(i) +")").html(friendnick);
            $(".friendnickname:eq("+ String(i) +")").attr("href", "/user_home/?u_id=" + friendid);
            $(".friendphoto").attr("src", friendphoto);
            $(".delfriend").last().val(friendid);
            $("#managefriend").append(friendlistcode);
        }

        $(".delfriend").click(function(){
            if(confirm_deletefriend())
            {
                $(this).parent().hide();
                var uid = $(this).val();
                add = "/user/social/unfollow/?f_id=" + String(uid); //$(this).val()里存储uid
                $.get(add,function(data,status){

                });
            }
        });
    });
}

function confirm_deletefriend()
{
    var f = confirm("确定要删除这个没良心得好友么?");
    return f;
}


//------------------------------------manage friend part------------------------------------


//------------------------------------manage activity part---------------------------------

function manageActivity()
{
    $("#manageactivity").children().remove();
    var file_name = "/static/file/pages/activityinfo.txt";
    var actinfocode = "";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            actinfocode = data;
        }
    });

    var myactivity = "/activity/list/create/?u_id=" + global_userid;
    $.getJSON("/activity/list/create/?u_id=" + global_userid ,function(data){
        for (var i=0; i<data.length; i++) {
            var acttitle = data[i].title;
            var actid = data[i].id;
            var actimgurl = data[i].image_url;

            $("#manageactivity").append(actinfocode);
            $(".activityname:eq("+ String(i) +")").html(acttitle);
            $(".activityname:eq("+ String(i) +")").attr("href", "/activity_home/?a_id=" + actid);
            $(".actimg:eq("+ String(i) +")").attr("href", actimgurl);
            $(".signupinfo:eq("+ String(i) +")").val("href","#");//这个跳转需要更改

        }
    });


}

//------------------------------------manage activity part---------------------------------


//-----------------------------------Create Activity part----------------------------------

function activityCreate(){
    var current = 1;
    $(".modul_basic").show();
    $("#modul_next").click(function(){
        if(current == 1){
            $("#modal-nav-title").html("活动简介（2/4)");
            $(".modul_basic").hide('fast');
            $(".modul_intro").show('fast');
            current++;
        }else if(current == 2){
            $("#modal-nav-title").html("活动详情（3/4)");
            $(".modul_intro").hide('fast');
            $(".modul_detail").show('fast');
            current++;
        }else if(current == 3){
            $("#modal-nav-title").html("其他（4/4)");
            $(".modul_detail").hide('fast');
            $(".modul_other").show('fast');
            current++;
        }else {
            if (inputAllFilled()) {
                $("#createActivity").submit();
            }else{
                $("#notFilled").show();
            }
        }
    });
    $("#modul_prev").click(function(){
        if(current == 4){
            $("#modal-nav-title").html("活动详情（3/4)");
            $(".modul_detail").show('fast');
            $(".modul_other").hide('fast');
            current--;
        }else if(current == 3){
            $("#modal-nav-title").html("活动简介（2/4)");
            $(".modul_intro").show('fast');
            $(".modul_detail").hide('fast');
            current--;
        }else if(current == 2){
            $("#modal-nav-title").html("基本资料（1/4)");
            $(".modul_basic").show('fast');
            $(".modul_intro").hide('fast');
            current--;
        }
    });
}
function inputAllFilled(){
    if(!$("#inputName").val()){
        return 0;
    }
    if(!$("#inputHost").val()){
        return 0;
    }
    if(!$("#inputUndertake").val()){
        return 0;
    }
    if(!$("#inputTime").val()){
        return 0;
    }
    if(!$("#inputType").val()){
        return 0;
    }
    if(!$("#inputTel").val()){
        return 0;
    }
    if(!$("#inputEmail").val()){
        return 0;
    }
    if(!$("#inputIntro").val()){
        return 0;
    }
    if(!$("#inputDetail").val()){
        return 0;
    }
    if(!$("#inputNumber").val()){
        return 0;
    }
    if(!$("#inputImage").val()){
        return 0;
    }
    if(!$("#inputFile").val()){
        return 0;
    }
    return 1;
}

//---------------------------------Create Activity part---------------------------------

//---------------------------------load activity name for tinyeditor------------------

function loadactivity()
{
    var e = getObj('chooseactivityname');

    $("#chooseactivityname").empty();

    var loadmyact = "/activity/list/club/?u_id" + global_userid;
    $.getJSON("/activity/list/club/?u_id" + global_userid ,function(data){
        for (var i=0; i<data.length; i++) {
            e.options.add(new Option(data[i].title, data[i].id)); // value not sure
        }

        var loadactivityadd = "/activity/list/create/?u_id=" + global_userid;
        $.getJSON(loadactivityadd ,function(data){
            for (var i=0; i<data.length; i++) {
                e.options.add(new Option(data[i].title, data[i].id)); // value not sure
            }
        });

    });
}

//---------------------------------load activity name for tinyeditor------------------

//---------------------------------load club name for create activity------------------

function loadclubname()
{
    var e = getObj('c_id');
    var loadmyclub = "/club/list/create/?u_id=" + global_userid;
    $.getJSON("/club/list/create/?u_id=" + global_userid ,function(data){
        for (var i=0; i<data.length; i++) {
            e.options.add(new Option(data[i].club_name, data[i].club_id)); // value not sure
        }

        var loadclubadd = "/club/list/join/?u_id=" + global_userid;
        $.getJSON("/club/list/join/?u_id=" + global_userid ,function(data){
            for (var i=0; i<data.length; i++) {
                e.options.add(new Option(data[i].club_name, data[i].club_id)); // value not sure
            }
        });

    });
}

//---------------------------------load club name for create activity------------------

//---------------------------------manage club which is user created--------------------
function managemyclub()
{
    var loadmyclub = "/club/list/create/?u_id=" + global_userid;
    $.getJSON("/club/list/create/?u_id=" + global_userid ,function(data){
        for (var i=0; i<data.length; i++) {
            e.options.add(new Option(data[i].club_name, data[i].club_id)); // value not sure
            $("#manageactivity").append(actinfocode);
            $(".activityname:eq("+ String(i) +")").html(data[i].title);
            $(".activityname:eq("+ String(i) +")").attr("href", data[i].club_id);
            $(".signupinfo:eq("+ String(i) +")").val("href","#");//这个跳转需要更改
        }
    });
}
//---------------------------------manage club which is user created----------------------

//--------------------------------edit club infomation----------------------

var editclubid = "";

function initchangeclubinfo(clubid)
{

    editclubid = clubid;

    var clubinfoadd = "/club/detail/?id=" + String(clubid);

    $.getJSON("/club/detail/?id=" + String(clubid) ,function(data){

        var clubname = data.name;
        var clubintro = data.introduction;
        var clubcname = data.c_name;
        var ctel = data.tel;
        var clubemail = data.email;
        var clubtype = data.c_type;
        var clubnum = data.numMembers;


        $("#editclubname").val(clubname);
        $("#editclubintroduction").val(clubintro);
        $("#editbeginname").val(clubcname);
        $("#editclubcomm").val(ctel);
        $("#editclubemail").val(clubemail);
        $("#edittype").val(clubtype);
        $("#editclubnum").val(clubnum);

    });
}

function sendeditclubinfo()
{
    $("#clubid").val(editclubid);
}

function checkeditclub()
{
    var clubname = document.form3.club_name.value;
    var clubintro = document.form3.club_intro.value;
    var ctel = document.form3.club_tel.value;
    var clubemail = document.form3.club_email.value;
    var clubtype = document.form3.club_type.value;
    var clubnum = document.form3.numMembers.value;
    if(clubname == "" || clubintro == "" || ctel == "" || clubemail == "" || clubtype == "" || clubnum == "")
    {
        $("#editclubwarnning").show();
        return false;
    }
    return true;
}


//---------------------------------edit club infomation----------------------