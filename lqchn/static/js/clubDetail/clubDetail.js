$(document).ready(function(){
    var c_id = $("#c_id").html();

    //get full information of club
    url = "/club/detail/?id="+c_id;
    $.getJSON(url,function(data){
        $(".img-circle").attr('src',data.logo);
        $("#name").html(data.name);
        $("#brief").html(data.introduction);
        $("#contact").html('联系方式：'+data.tel);
        $("#c_name").children('a').html(data.c_name);
        $("#l_name").children('a').html(data.founder_name);
        if(data.c_type == '1'){
            $("#type").children('a').html('户外运动');
        }else if(data.c_type == '1'){
            $("#type").children('a').html('社会服务');
        }else if(data.c_type == '1'){
            $("#type").children('a').html('文学类');
        }else if(data.c_type == '1'){
            $("#type").children('a').html('艺术类');
        }else{
            $("#type").children('a').html('特色类');
        }

    });

    //get recent activity of club
    $.getJSON("/club/recent/activity/?c_id="+c_id,function(data){
        for(var i=0;i<data.length;i++){
            string = "<div class='activity'>"+
                "<p class='time'>"+data[i].time+"</p>"+
                "<a href='#' class='title'>"+data[i].title+"</a>"+
                "</div>";
            $(".block-activity").append(string);
        }
    });

    //get recent journal of club
    $.getJSON("/club/recent/journal/?c_id="+c_id,function(data){
        for(var i=0;i<data.length;i++){
            string = "<div>"+
                "<p class='time'>"+data[0].a_title+"</p>"+
                "<a href='#'>"+data[0].title+"</a>"+
                "</div>";
            $('.block-journal').append(string);
        }
    });


    $.ajax({
        url: '../comment/comment.html',
        dataType: 'text',
        success: function(data) {
            $(".block-comment").append(data);
        }
    });

    $("#follow").click(function(){
        alert(" cukcck!!!");
        var joinadd = "/club/join/?c_id=" + c_id;
        $.getJSON("/club/join/?c_id=" + c_id, function(data, status){
            alert("follow!!!!");
        });
    });
});