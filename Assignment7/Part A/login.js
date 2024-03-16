const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExUserName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regExPassword = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;


const min_email = 22;
const max_email = 40;
const min_uname = 3;
const max_uname = 30;
const min_pwd = 6;
const max_pwd = 30;


$(document).ready(function(){

    $('#email').on('input', function() {
        var email = $(this).val();
        if(!email || !regExEmail.test(email) || !email.endsWith("@northeastern.edu") || email.length < min_email || email.length > max_email){
            $('#err_email').text('Invalid Email Id, Please enter a valid Email Id').show();
        }
        else{
            $('#err_email').hide();
        }      
        validateForm();
    })


    $('#uname').on('input',function() {
        var name = $(this).val();
        if(!name || name.length < min_uname || name.length > max_uname){
            $('#err_uname').text('Invalid User Name, Please enter a valid User Name').show();
        }
        else{
            $('#err_uname').hide();
        }
        validateForm();
    })


    $('#pwd').on('input', function() {
        var password = $(this).val();
        if (!password || password.length < min_pwd || password.length > max_pwd) {
            $('#err_pwd').text('Invalid Password, Please enter a valid Password').show();
        } else {
            $('#err_pwd').hide();
        }
        validateForm();
    });


    $('#cpwd').on('input', function() {
        var password = $('#pwd').val();
        var cnfpwd = $(this).val();
        if (cnfpwd !== password) {
            $('#err_cpwd').text('The Passwords don\'t match').show();
        } else {
            $('#err_cpwd').hide();
        }
        validateForm();
    });


    function validateForm() {
        if ($('#err_email').is(':visible') || $('#err_uname').is(':visible') || $('#err_pwd').is(':visible') || $('#err_cpwd').is(':visible')) {
            $('#btn').attr('disabled', 'disabled');
        } 
        else {
            $('#btn').removeAttr('disabled');
        }
    }
});



