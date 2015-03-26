
var dataSet = [ { Serial: 1, Client: 'UNIV_MO', Alarams: '50', Details: '<a href=#>Details</a>' },
                { Serial: 2, Client: 'REX_NC', Alarams: '20', Details: '<a href=#>Details</a>' },
                { Serial: 3, Client: 'BAY_FL', Alarams: '05', Details: '<a href=#>Details</a>' } ];


$(document).ready(function() {
    $('#example').dataTable( {
        "aaData": dataSet,
        "aoColumns": [
            { "mDataProp": "Serial" },
            { "mDataProp": "Client" },
            { "mDataProp": "Alarams" },
            { "mDataProp": "Details" }
        ]
     });
}); 
