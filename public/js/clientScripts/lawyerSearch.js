    $(document).ready(function(){
        $('#queryLawyers').on('click',(function(){
            let incidentId = $('#incident').val();
            var url = '/user/client/findLawyer';
            $.ajax({
                type: 'GET',
                url: url,
                data: {'incident': incidentId},
                dataType: 'json',
                success: function(data){
                    $('#queryResults').html('');
                    $('#queryResults').append('<h3>Suggested Lawyers</h3>');
                    for(i in data){
                        console.log(url);
                        //- <form method='GET' action='${url}/reqapt'>
                        $('#queryResults').append(`
                        <form name='reqapt' method='GET' action='${url}/reqapt'>
                            <div class='form-group'>
                                ${data[i].firstName} ${data[i].lastName} <a href="mailto:${data[i].email}">${data[i].email}</a> ${data[i].phoneNumber} ${data[i].country}
                                <button class=requestBtn type='submit' name='reqid' value=${data[i].id}>Request Appointment</button>
                            </div>
                        </form>`);
                    }
                }
            });
        }));
    })