import $ from 'jquery';
import auth from './auth.json';
import endpointData from './endpoints.json';

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
      postData = Object.assign(params, auth);

      $.post({
        url: fullUrl,
        dataType: 'json',
        data: postData,
        success: function(data) {
          callback(data);
        },
        error: function(xhr, status, err) {
          console.error("Error calling API");
        },
      });
    }
}
