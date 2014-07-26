$(document).ready(function(){
    $("#attention").hide();
});

$(document).ready(function(){
    $("#mail").blur(function(){
        var data = document.form.un.value;
        if(!checkMail(data) && data != "")
            $("#attention").fadeIn();
        if(checkMail(data))
            $("#attention").fadeOut();
    });
});

function checkMail(mail) {
    var data  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (data.test(mail))
        return true;
    else return false;
}

function checkUsername(name) {
    if(name.length < 6 || name.length > 18)
        return false;
    return true;
}

function checkPassword(password) {
    if(password.length < 6)
        return false;
    return true;
}

function check() {
    var mail = document.form.un.value;
    var password = document.form.pw.value;
    var name = document.form.nick.value;
    if(checkMail(mail) && checkPassword(password) && checkUsername(name))
        return true;
    return false;
}


