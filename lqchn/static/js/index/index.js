var s_code = '';
var u_id = '';

$(document).ready(function(){
    getUserInfo();
    registNavbutton();
});

function getUserInfo(){
    $.get("/user/info/",function(data,status){
        data = JSON.parse(data);
        if(data.code){
            window.s_code = data.code;
            window.u_id = data.id;
            $(".u_name").html(data.name);
            $("#school_code").val(data.code);
            getActivityData();
        }else{
            $("#alert").show('fast');
            getActivityData();
        }
        var photo = "/media/html_image/index/profile.jpg";
        if(data.photo_url){
            photo = data.photo_url;
        }
        $("#u_photo").attr("src",photo);
    });
}

function getActivityData(){
    var url = "";
    if(window.s_code){
        url = "/activity/list/all/?code="+window.s_code;
    }else{

    }
    //get data from server
    $.get(url,function(data,status){
        var ac_list = JSON.parse(data);
        var i=0;
        for(i=0;i<ac_list.length;i++){
            var current = $(".ac-container:eq("+String(i)+")");
            var image = $(".ac_image:eq("+String(i)+")");
            image.attr("src",ac_list[i].image_url);
            $(".ac_title:eq("+String(i)+")").html(ac_list[i].title);
            $(".ac_brief:eq("+String(i)+")").html(ac_list[i].introduction);
            $(".ac_record_views:eq("+String(i)+")").html(ac_list[i].views);
            $(".ac_record_faovr:eq("+String(i)+")").html(ac_list[i].favor);

            ac_obj=new Object();
            ac_obj.id = ac_list[i].id;
            current.data(ac_obj);
        }
        for(i;i<6;i++){
            $(".activity-modeul:eq("+String(i)+")").hide();
        }
    });

    //activity mouse action
    $(".ac-container").mouseenter(function(){
        $(this).children(".ac_intro").fadeIn('fast');
    });

    $(".ac-container").mouseleave(function(){
        $(this).children(".ac_intro").fadeOut('fast');
    });

    $(".ac-container").click(function(){
        alert("a");
        //window.open('/activity_home/?a_id='+$(this).data('id'));
    });
}

function getClubData(){
    var url = "";
    if(window.s_code){
        url = "/club/list/all/?code="+window.s_code;
    }else{

    }
    $.get(url,function(data,status) {
        var club_list = JSON.parse(data);
        for(var i=0;i<club_list.length;i++){
            $(".club-logo:eq("+String(i)+")").attr('src',club_list[i].club_logo);
            $("a.name:eq("+String(i)+")").html(club_list[i].club_name);
            $("a.intro:eq("+String(i)+")").html(club_list[i].club_introduction);
            $(".c-number:eq("+String(i)+")").html("&nbsp"+club_list[i].member);
            $(".c-views:eq("+String(i)+")").html("&nbsp"+club_list[i].views);
            $(".c-favor:eq("+String(i)+")").html("&nbsp"+club_list[i].favor);
            $(".name:eq("+String(i)+")").attr('href','/club_home/?c_id='+club_list[i].club_id);
            $(".intro:eq("+String(i)+")").attr('href','/club_home/?c_id='+club_list[i].club_id);
        }
    });
}

function getJournalData(){
    var url = "";
    if(window.s_code){
        url = "/journal/list/all/?code="+window.s_code;
    }else{

    }
    $.get(url,function(data,status){
        $("#type1").empty();
        $("#type2").empty();
        $("#type3").empty();
        $("#type4").empty();
        $("#type5").empty();
        data = JSON.parse(data);
        type1_list = data.type1;
        type2_list = data.type2;
        type3_list = data.type3;
        type4_list = data.type4;
        type5_list = data.type5;
        $("#sports").html(type1_list.length);
        $("#social").html(type2_list.length);
        $("#chinese").html(type3_list.length);
        $("#art").html(type4_list.length);
        $("#special").html(type5_list.length);
        for(var i=0;i<type1_list.length;i++){

        }
        for(var i=0;i<type1_list.length;i++){

        }
        for(var i=0;i<type1_list.length;i++){

        }
        for(var i=0;i<type1_list.length;i++){

        }
        for(var i=0;i<type5_list.length;i++){
            string = "<li><a href='javascript:void(0)' class='type5detail'>"+type5_list[i].title+"</a></li>";
            obj = new Object();
            obj.id = type5_list[i].activity_id;
            $("#type5").append(string);
            $(".type5detail").last().data(obj);
        }
        $(".type5detail").click(function(){
            var url_detail = "/journal/detail/?a_id="+$(this).data('id');
            $.getJSON(url_detail,function(data){
                title = data.title;
                content = data.html;
                activity_title = data.activity_title;
                activity_id = data.activity_id;
                $(".j-text-title").html(title);
                $(".j-text-activity").html(activity_title);
                $(".j-text-content").html(content);
            });
        });

    });
}

function getRequestData(){
    var url = "";
    if(window.s_code){
        url = "/ground/list/school/?code="+window.s_code;
    }else{

    }
    $.get(url,function(data,status) {
        $(".rq-modeul").empty();
        var rq_list = JSON.parse(data);
        for(var i=0;i<rq_list.length;i++){
            var string = "<div class='rq-main'>"+
                "<div class='rq-user rq-user-face'>"+
                "<p class='rq-name'>"+rq_list[i].name+"</p>"+
                "</div>"+
                "<p class='rq-time'>"+rq_list[i].time+"</p>"+
                "<p class='rq-detail'>"+rq_list[i].content+"</p>"+
                "<div style='padding-top: 20px;text-align: right;'>"+
                "<a class=''>赞</a><a class=''>回复</a>"+
                "</div></div>";
            $(".rq-modeul:eq("+String(i%3)+")").append(string);
        }
    });
}

function registNavbutton(){
    //remove active
    $("#activity").click(function(){
        $(this).parent("li").prevAll().removeClass("active");
        $(this).parent("li").nextAll().removeClass("active");
        $(this).parent("li").addClass("active");
        refreshModel(0);
        stopEvent();
    });
    $("#club").click(function(){
        $(this).parent("li").prevAll().removeClass("active");
        $(this).parent("li").nextAll().removeClass("active");
        $(this).parent("li").addClass("active");
        refreshModel(1);
        stopEvent();
    });
    $("#journal").click(function(){
        $(this).parent("li").prevAll().removeClass("active");
        $(this).parent("li").nextAll().removeClass("active");
        $(this).parent("li").addClass("active");
        refreshModel(2);
        stopEvent();
    });
    $("#request").click(function(){
        $(this).parent("li").prevAll().removeClass("active");
        $(this).parent("li").nextAll().removeClass("active");
        $(this).parent("li").addClass("active");
        refreshModel(3);
        stopEvent();
    });
}

function registRankListbutton(){

}

//refresh modeul
function refreshModel(modeul){
    $(".modeul-main.activity").hide();
    $(".modeul-main.club").hide();
    $(".modeul-main.journal").hide();
    $(".modeul-main.request").hide();
    if(modeul == 0){
        $(".modeul-main.activity").show();
        getActivityData();
    }else if(modeul == 1){
        $(".modeul-main.club").show();
        getClubData();
    }else if(modeul == 2){
        $(".modeul-main.journal").show();
        getJournalData();
    }else{
        $(".modeul-main.request").show();
        getRequestData();
    }
}

function stopEvent(){
    var e=arguments.callee.caller.arguments[0]||event;
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}