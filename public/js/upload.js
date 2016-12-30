function uploadFile(file, signedRequest, url, fileType) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {

          document.getElementById('picture-url').value = url;

      } else {
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
function getSignedRequest(file, fileType) {
  var uniqueFileName = Date.now();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/signS3?file-name=' + uniqueFileName + '_' + file.name + '&file-type=' + file.type);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url, fileType);
      } else {
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}
/*
 Function called when file input updated. If there is a file selected, then
 start upload procedure by asking for a signed request from the app.
 */
function initPicUpload() {
  var files = document.getElementById('cover-input').files;
  var file = files[0];
  if (file == null) {
    return alert('No file selected.');
  }
  getSignedRequest(file, 'picture');
}


// Bind listeners when the page loads.
(function () {
  document.getElementById('cover-input').onchange = initPicUpload;
})();
