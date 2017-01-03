($(document).ready(function () {
  /*
   Function to carry out the actual PUT request to S3 using the signed request from the app.
   */
  function uploadFile(file, signedRequest, url){

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          $('#preview').attr('src', url);
          $('#coverurl-input').attr('value', url);
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  /*
   Function to get the temporary signed request from the app.
   If request successful, continue to upload the file using this signed
   request.
   */
  function getSignedRequest(file){
    // check for file image file extension
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      alert('File needs to be an image');
      console.log(file.type);
      return;
    }

    // generate random file suffix
    var date = new Date();
    var fileSuffix = parseInt(date.getTime() / Math.random() * (100 - 1) + 100);

    $.get('/signS3?file-name='+fileSuffix+file.name+'&file-type='+file.type,
    function (resData) {
      console.log(resData);
      var response = JSON.parse(resData);
      uploadFile(file, response.signedRequest, response.url);
    })
      .fail(function () {
        alert('Could not get signed URL for AWS s3');
      });
  }

  /*
   Function called when file input updated. If there is a file selected, then
   start upload procedure by asking for a signed request from the app.
   */
  function initUpload(){
    const files = document.getElementById('cover-input').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  }


  // bind event listener
  document.getElementById('cover-input').onchange = initUpload;
}));