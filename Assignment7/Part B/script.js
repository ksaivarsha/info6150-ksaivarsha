


$(document).ready(function() {

    var myInterval;
    var currentTime = 0;

    
    $('#datepicker').datepicker({
        minDate: null,
        maxDate: null,
        onSelect: function() {
            $(this).datepicker('option', 'disabled', true); 
        }
    })
    .prop('readonly', true);


    $('#start').on('click', async function(event) {
        event.preventDefault();
        myInterval = setInterval(async function() {
            currentTime++;
            await updateTime();
        }, 1000);
    });


    $('#stop').on('click', function(event){
        event.preventDefault();
        clearInterval(myInterval);
    });


    $('#reset').on('click', async function(event){
        event.preventDefault();
        clearInterval(myInterval);
        currentTime = 0;
        $('#datepicker').datepicker('setDate', null);
        $('#datepicker').datepicker('option', 'disabled', false); 
        await updateTime();
    });


    async function updateTime() {
        return new Promise(resolve => {
            var hours = Math.floor(currentTime / 3600);
            var minutes = Math.floor((currentTime % 3600) / 60);
            var seconds = currentTime % 60;

            var newTime = (hours < 10 ? '0' : '') + hours + ':' +
                          (minutes < 10 ? '0' : '') + minutes + ':' +
                          (seconds < 10 ? '0' : '') + seconds;
            $('#result').text(newTime);
            resolve();
        });
    }
});






