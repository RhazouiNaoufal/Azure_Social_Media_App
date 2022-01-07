import React, { useState } from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { render } from "@testing-library/react";
import $ from "jquery";
import { ajax } from "jquery";
import { ImageForm } from "./components/PageLayout";
import { UploadPost } from "./components/UploadImage";
import { UploadStatus } from "./components/UploadStatus";


//The URIs of the REST endpoint
const IUPS = "https://prod-06.eastus.logic.azure.com:443/workflows/486826b425b6480d9ff985e4ec0ddbb4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m8AQLMjxMwCKM7w98ajJ7Z8i6L97NiF58qcxEi_d6Z0";
const RAI = "https://prod-61.eastus.logic.azure.com:443/workflows/2a4bcc3052c9458ca50fbe3f3b49cd74/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pOk_Ma8kn5trzmaAYj-dl-3y4KXaAOZ16nn23I79-tE";
const DUI = "https://prod-24.eastus.logic.azure.com:443/workflows/0f71e8c0770742e8ba69a09aff1b7e47/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B1JYcK2k0O0uPO70AatHDf11w7w0jL2D5nNjlZW_W1E"

const BLOB_ACCOUNT = "https://blobstorageb00741944.blob.core.windows.net";

function App() {
  return (
      <PageLayout>
          <AuthenticatedTemplate>
              <ProfileContent />
              <UploadPost/>
              <UploadStatus/>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <p>You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </PageLayout>
  );
}

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              callMsGraph(response.accessToken).then(response => setGraphData(response));
          });
      });
  }

  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
          }
      </>
  );
};


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){
      //Run the get asset list function
      getImages();
  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){
    //Execute the submit new asset function
    submitNewAsset();
  });

  $("#translate").click(function(){
    //Run the get asset list function
    translateText();
}); 
  
});


  function submitNewAsset(){
    //Create a form data object
     const submitData = new FormData();
     //Get form variables and append them to the form data object
     submitData.append('FileName', $('#FileName').val());
     submitData.append('userID', $('#userID').val());
     submitData.append('userName', $('#userName').val());
     submitData.append('File', $("#UpFile")[0].files[0]);
     submitData.append('fileType', $("#UpFile")[0].files[0].type);

     console.log(submitData)

    
     //Post the form data to the endpoint, note the need to set the content type header
    $.ajax({
      url: IUPS,
      data: submitData,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
    
     }
    });
  }


  function getImages(){
    //Replace the current HTML in that div with a loading message
     $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

     $.getJSON(RAI, function( data ) {
     //Create an array to hold all the retrieved assets
     var items = [];
    
     //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
     $.each( data, function( key, val ) {
      items.push( "<hr />");
      if (val['fileType'].split('/')[0].trim() === 'image'){
        items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />");
      }
      else {
        items.push("<video controls width='400' height='240'> <source src='"+BLOB_ACCOUNT + val["filePath"] + "' type='" + val['fileType'] + "'/></video>");
      }
      items.push( "Post Title : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
      items.push( "<hr />");
     });
     //Clear the assetlist div
     $('#ImageList').empty();
     //Append the contents of the items array to the ImageList Div
     $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
      }).appendTo( "#ImageList" );
     });
 }

/*
 function getMyPosts(){
  //Replace the current HTML in that div with a loading message
   $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

   $.getJSON(RAI, 
    function( data ) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val ) {
    
      items.push( "<hr />");
      if (val['fileType'].split('/')[0].trim() === 'image'){
        items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />");
      }
      else {
        items.push("<video controls width='400' height='240'> <source src='"+BLOB_ACCOUNT + val["filePath"] + "' type='" + val['fileType'] + "'/></video>");
      }
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
      items.push( "<hr />");
    });
  
   //Clear the assetlist div
   $('#ImageList').empty();
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#ImageList" );
   });
}


 function deleteAsset(id){
    $.ajax({
      type: "DELETE",
    //Note the need to concatenate the
      url: DUI + id,
    }).done(function( msg ) {
     //On success, update the assetlist.
      getImages();
  });
  }
*/
  function translateText (val){
    const axios = require('axios').default;
    const { v4: uuidv4 } = require('uuid');
    const submitData = new FormData();

    var subscriptionKey = "caa286057b5141a1bd6e66ff6eafcfd2";
    var endpoint = "https://api.cognitive.microsofttranslator.com";
    var translateText = $('#Translation').val();
    var translateTo = $('#translateTo').val();
    var translateFrom = $('#translateFrom').val();

    // Add your location, also known as region. The default is global.
    // This is required if using a Cognitive Services resource.
    var location = "eastus";
    var items = [];
    var itemsComplete = [];

    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': translateFrom,
            'to': translateTo
        },
        data: [{
            'text': translateText
        }],

        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        
      
        items.push( "<hr />");
        items.push( "" + (JSON.stringify(response.data, null, 4)) + " <br />");
        items.push( "<hr />");


        $('#ShowTranslation').empty();

        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
          }).appendTo( "#ShowTranslation" );
          
    })
  }
/*
  function detectLanguage (){
      const axios = require('axios').default;
      const { v4: uuidv4 } = require('uuid');

      var subscriptionKey = "caa286057b5141a1bd6e66ff6eafcfd2";
      var endpoint = "https://api.cognitive.microsofttranslator.com";

      // Add your location, also known as region. The default is global.
      // This is required if using a Cognitive Services resource.
      var location = "eastus";

      axios({
          baseURL: endpoint,
          url: '/detect',
          method: 'post',
          headers: {
              'Ocp-Apim-Subscription-Key': subscriptionKey,
              'Ocp-Apim-Subscription-Region': location,
              'Content-type': 'application/json',
              'X-ClientTraceId': uuidv4().toString()
          },
          params: {
              'api-version': '3.0'
          },
          data: [{
              'text': 'Ich würde wirklich gern Ihr Auto um den Block fahren ein paar Mal.'
          }],
          responseType: 'json'
      }).then(function(response){
          console.log(JSON.stringify(response.data, null, 4));
      })
  }
*/


export default App;