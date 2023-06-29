$(document).ready(function initializeCalendar() {
    $('#calendar').fullCalendar({
        header: {
            right: 'next',
            center: 'title',
            left: 'prev'
        },
        defaultView: 'month',
        locale: 'pt-pt',
        editable: false,
        dayClick: function (date, jsEvent, view) {
            $('#requestModal').modal('show');
            $('#requestForm #startDate').val(moment(date).format('YYYY-MM-DD'));
            $('#requestForm #endDate').val(moment(date).format('YYYY-MM-DD'));
        }

    });

    /*$('#requestForm').submit(function (event) {
        event.preventDefault();
        var name = $('#requestForm #name').val();
        var startDate = $('#requestForm #startDate').val();
        var endDate = $('#requestForm #endDate').val();

        if (name && startDate && endDate) {
            $('#calendar').fullCalendar('renderEvent', {
                title: name,
                start: startDate,
                end: endDate,
                color: '#000'
            }, true);

            $('#requestModal').modal('hide');
            $('#requestForm')[0].reset();
        }
    });*/
});