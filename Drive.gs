
var MIMETYPE_MS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
var MIMETYPE_GOO = 'application/vnd.google-apps.spreadsheet'


function testing(){

  var id = getFileToDo().getId();
  
  var url = exportAsExcel(id)
  
  Logger.log(file);

}

function getFileToDo() {
  
  return getFiles_(TODO_FOLDER);
  
}

function getFileArchived(){

  return getFiles_(ARCHIVED_FOLDER);

}

function getFiles_(id_folder){

  var out=null,folder = DriveApp.getFolderById(ID_ROOT_FOLDER);
  
  
  var folders = folder.getFoldersByName(id_folder);
  // On le premier élément de la pile
  if(folders.hasNext()) {
   folder = folders.next();  
  }
  else throw new Error('Mo todo folder found!');
  
  if(folders.hasNext()) {
   Logger.log('More to do folder in root !');   
  }
  
  var files = folder.getFiles()
  while (files.hasNext()) {
   var file = files.next();
   if( file.getMimeType()==MIMETYPE_GOO) {out=file;break;}
 }
  
  return out;

}

//  Google Drive REST API
// https://developers.google.com/drive/v2/reference/files/get 
// Enable the Drive Platform
// https://developers.google.com/drive/web/enable-sdk
function exportAsExcel(spreadsheetId) {
  var file = Drive.Files.get(spreadsheetId);
  var url = file.exportLinks['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  var token = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
  });
  return response.getBlob();
}
