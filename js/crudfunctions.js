var hostUrl = 'http://localhost:16537';
var apiUrl = hostUrl+ '/api/';
var odataUrl = hostUrl + '/odata/';
function CreateAccount(account) {
    jQuery.support.cors = true;


    $.ajax({
        url: apiUrl + 'Businesses',
        type: 'POST',
        data: JSON.stringify(account),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alertify.alert("Account Created");
            ShowLogin();
        },
        error: function (x, y, z) {
            alertify.alert(x.responseText + '\n' + y + '\n' + z);
        }
    });
 
}
  
function UpdateBusinessProfile(data) {
    jQuery.support.cors = true;
    var email = localStorage.getItem("account");
   
    $.ajax({
        url:  apiUrl+  'Businesses/' + email+ "/",
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function () {
            alertify.alert("You have successfully update your profile... \r\n please make sure ALL other Configurations are to your liking");




        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });
}
function GetAccount(email) {
    var result
    $.support.cors = true;
    var url = odataUrl+ 'Businesses?$filter=EmailAddress eq '+"'"+email +"'";
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $.each(data, function (i, info) {
                result = info;
            });
            //Add code here
            alertify.log("Request Succussful");

        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });
   
}
function CreateDefualtSettings(email){
    if (email.length<=1){
        alertify.alert("Member ID Empty!");
        return;
    }
    jQuery.support.cors = true;
    var data = {BusinessId:email,Commission:10,Discount:10,Validity:30};
    $.ajax({
        url: apiUrl + 'Settings/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alertify.log("You have successfully updated your settings...");
            localStorage.setItem("settings", JSON.stringify(data));

        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });
}
function CreateDefualtAddress(email){
    if (email.length<=1){
        alertify.alert("Member ID Empty!");
        return;
    }
    jQuery.support.cors = true;
    var data = {Street:"Not Defined Yet",AccountId:email,City:"Not Defined Yet",Country:"Not Defined Yet"};
    $.ajax({
        url: apiUrl + 'Addresses/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alertify.log("You have successfully updated your settings...");
            localStorage.setItem("address", JSON.stringify(data));

        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });
}
function UpdateLocalAddress(Street ,City,Country){
    var g = JSON.parse(localStorage.getItem("address"));
     
       var  s={AddressId:g.AddressId,BusinessId:g.BusinessId,Street:Street ,City:City,Country:Country };
    
        localStorage.setItem("address", JSON.stringify(s));
        alertify.alert("Location Updated");
      //  g.AutoReferral = autoreferral;
      //  g.AutoRequest = autorequest;
        UpdateOnlineAddress();
}
function UpdateOnlineAddress(){
    var g = JSON.parse(localStorage.getItem("address"));
      $.support.cors = true;
    var url = apiUrl+ 'Addresses/'+g.AddressId+"/";
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(g),
         contentType: "application/json;charset=utf-8",
        success: function (data) {
           
            //Add code here
            alertify.log("Public location updated");
        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });

}
function UpdateOnlineSettings(){
    var g = JSON.parse(localStorage.getItem("settings"));
     
     $.support.cors = true;
    var url = apiUrl+ 'Settings/'+g.SettingsId+"/";
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(g),
         contentType: "application/json;charset=utf-8",
        success: function (data) {
           
            //Add code here
            alertify.log("Online settings updated");
        },
        error: function (x, y, z) {
            alert(x.responseText + '\n' + y + '\n' + z);
        }
    });

}
function UpdateLocalIncentives(comm,dis,valid){
    var g = JSON.parse(localStorage.getItem("settings"));
     
       var  s={SettingsId:g.SettingsId,BusinessId:g.BusinessId,Discount:dis,Commission:comm,AutoReferral:g.AutoReferral, AutoRequest:g.AutoRequest,Validity:valid };
    
        localStorage.setItem("settings", JSON.stringify(s));
        alertify.alert("Incentives Updated");
      //  g.AutoReferral = autoreferral;
      //  g.AutoRequest = autorequest;
     
}

 function readURL(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();

                  reader.onload = function (e) {
                      $('#logo')
                      .attr('src', e.target.result)
                      .width(128);
                      $('#logobytes').val(e.target.results);
                  };

                  reader.readAsDataURL(input.files[0]);
              }
          }
function clearImage() {
              $('#logo').attr('src', "../images/noimage.png");
              $('#logobytes').val(null);
          }
 