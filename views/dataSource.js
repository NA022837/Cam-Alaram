/*var dataSet = [['1','UNIV_MO','10','<a href="#">Details</a>'],
               ['2','REX_NC','20','<a href="#">Details</a>'],
               ['3','CERN_IDPM','5','<a href="#">Details</a>'],
               ['4','AHS_FL','15','<a href="#">Details</a>'],
               ['5','BAY_FL','25','<a href="#">Details</a>']];

$(document).ready(function() {
    $('#example').dataTable( {
        "data": dataSet,
        "columns": [
            { "title": "Serial Number" },
            { "title": "Client Name" },
            { "title": "Open Alaram Count" },
            { "title": "Details", "class": "center" }],"scrollY": "200px"
     });
}); */

/*var aaData = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8181/mongo/v1/databases/camAlaramDetails/collections/camClients/documents.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
    //document.getElementById("resp").innerText = xhr.responseText;
      console.log(xhr.responseText);
  }
}
xhr.send(); */

   $.ajax({
      url:"http://localhost:8181/mongo/v1/databases/camAlaramDetails/collections/camClients/documents.json",
      success:function(data){
        for(i in data){
             //aaData.push([data[i].property,data[i].property2])
            console.log('hi--');
         }
          console.log('hi');
         //Then create the DataTable object
      }

})