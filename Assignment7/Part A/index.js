var regExNum = /[^\d.-]/;

$(document).ready(function(){

    var params = new URLSearchParams(window.location.search);
    var user = params.get('uname');

    $('#user').text('Username: ' + user);

    $('button').click((event) => {
        event.preventDefault();
        cal(event.target.id);
    });


    $('#num1, #num2').on('input', function() {
        val($(this));
    });


    const val = (input) => {
        var value = input.val();
        if (!isNaN(value) && parseFloat(value).toString() === value) {
            input.next('.err_txt').text('');
        } 
        else if(value === null || value === '') {
            input.next('.err_txt').text('Please enter a number');
        }
        else if(regExNum.test(value)) {
            input.next('.err_txt').text('Please enter a valid number');
        }
        else if(value === 'Infinity' || value === '-Infinity') {
            input.next('.err_txt').text('Please enter a finite number');
        }
        else {
            input.next('.err_txt').text('Please enter a valid number');
        }
    };
    

    const cal = (opt_id) => {
        var num1 = parseFloat($('#num1').val());
        var num2 = parseFloat($('#num2').val());
        var result;

        switch(opt_id) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    result = 'Error!DividedByZeroNotValid!';
                } 
                else {
                    result = num1 / num2;
                }   
                break;
            default:
                result = 'Invalid operation';
        }
        $('#display').val(result);
    };
});




