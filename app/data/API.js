import $ from 'jquery';
//import auth from './auth.json';
import endpointData from './endpoints.json';
import Auth from './Auth.js';

/*
*
*
*/

export default function (endpoint, params, callback)  {
  var endpointObj = endpointData.endpoints[endpoint],
  fullUrl,
  postData;



  if(endpointObj) {
    fullUrl = endpointData.rootUrl + endpointObj.url;
    postData = params;

    var doPost = function() {
      $.post({
        url: fullUrl,
        dataType: 'json',
        data: postData,
        success: function(data) {
          if(data.responseStatus && data.responseStatus.errorCode) {
            callback(data.responseStatus.errorText, data);
          } else {
            callback(null, data);
          }
        },
        error: function(xhr, status, err) {
          console.error("Error calling API");
          callback(err, null);
        },
      });
    }

    if(endpoint != 'login') {
      Auth.get(function(data) {
        console.log(data);
        postData = Object.assign(params, data);
        doPost();
      })

    } else {
      doPost();
    }

  }
}
