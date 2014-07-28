var gloabl_aid = "";
var gloabl_num = "";
var gloabl_cid = "";

$(document).ready(function(){

    gloabl_aid = $("#hideaid").html();

    getallinfo();

    $("#groupsignuop").click(function(){
        removeMember();
    });

    $("#joinclub").click(function(){
        jointheclub();
    });

});

function getcomment()
{
    $("#actcomment").children().remove();
    var file_name = "/static/file/comment/test2.txt";
    $.ajax({
        url: file_name,
        dataType: 'text',
        success: function(data) {
            $("#actcomment").append(data);
        }
    });
}

function getallinfo()
{
    var allinfoadd = "http://192.168.1.107:8080/activity/detail/?a_id=" + gloabl_aid;

    $.getJSON(allinfoadd ,function(data){
        var actbrief = data.a_brief_intro;
        var actdetail = data.a_detail_intro;
        var imgurl = data.a_image_url;
        var safeurl = data.a_safe_url;
        var acttitle = data.a_title;
        var clublogo = data.club_logo;
        var clubname = data.club_name;
        var acttime = data.a_time;
        var actundertake = data.a_undertake;
        var acthost = data.a_host;
        var clubid = data.club_id;
        var actnum = data.a_number;
        var actloc = data.a_place;
        var actrange = data.a_area;

        gloabl_num = data.a_number;
        gloabl_cid = data.club_id;

        $("#clubphoto").attr("src", clublogo);
        $("#clubname").html(clubname);
        $("#acttitle").html(acttitle);
        $("#acttime").html("活动时间:" + acttime);
        $("#actarea").html("活动范围:" + actrange);
        $("#actloc").html("活动地点:" + actloc);
        $("#acthost").html("主办单位:" + acthost);
        $("#actvicehost").html("承办单位:" + actundertake);
        $("#actdetail").html(actdetail);

        if(parseInt(gloabl_num) == 1)
            $("#groupsignup").hide();
        else
            $("#singlesignup").hide();

    });
    getcomment();
}

function removeMember()
{
    var max = 10;
    var a = 5;
    if(a < max)
    {
        for(var i = 10; i > a - 1; i--)
        {
            var str = "#member" + String(i);
            $(str).remove();
        }
    }
}

function checkGroupsignup()
{
    var ln = document.form1.leader_name.value;
    var lc = document.form1.leader_comm.value;
    var le = document.form1.leader_email.value;
    var lm = document.form1.leader_major.value;
    var cb = document.getElementById("groupinfo");

    if(ln == "" || lc == "" || le == "" || lm == "" || !cb.checked)
    {
        $("#groupwarnning").show();
        return false;
    }

    for(var i = 0; i < parseInt(gloabl_num); i++)
    {
        var mname = "m" + String(i) + "_name";
        var mmajor = "m" + String(i) + "_major";
        if(mname == "" || mmajor == "")
            return false;
    }

    return true;
}

function checkSingle()
{
    var ln = document.form.single_name.value;
    var lc = document.form.single_comm.value;
    var le = document.form.single_email.value;
    var lm = document.form.single_major.value;
    var cb = document.getElementById("singleinfo");

    if(ln == "" || lc == "" || le == "" || lm == "" || !cb.checked)
    {
        $("#singlewarnning").show();
        return false;
    }
    return true;
}

function jointheclub()
{
    alert("click join the club");
    var joinadd = "/club/join/?c_id=" + gloabl_cid;
    $.getJSON("/club/join/?c_id=" + gloabl_cid, function(data, status){
        alert("data = " + data);
        if(String(status) == "1")
            alert("success follow");
        else
            alert("failed follow");
    });
}