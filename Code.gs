var ID_ROOT_FOLDER = '0BxTfS7jXR_FYflktd3Q0WEhmQVVGVTV0ZkpuaEZzYTlTQUVZTURrclpBNDh1QU41NFh2ZU0';
var ID_SPREADSHEET_PARAMS_ID = '1XSyMA786nVSItmS0Qw8-wHJ8CPh3Xl6jx4-zk0RGEeY'

var TODO_FOLDER='TO DO';
var ARCHIVED_FOLDER='ARCHIVED';


var FORMULA_CALCULATE_WEEK = "=IF(ISBLANK(R[0]C[-1]),'',YEAR(R[0]C[-1])&TEXT(WEEKNUM(R[0]C[-1]);'00'))" // this YEAR(A2)&TEXT(WEEKNUM(A2);"00")  SUM(R[-3]C[0]:R[-1]C[0]





function OpenFileTodo(){
try{
  var clsid = getFileToDo().getId();
  
 
  
  
  addFormulaColumn_(clsid,0,'Soumission',FORMULA_CALCULATE_WEEK)
  
  
  }catch(e) {Logger.log(e)}
  return;

}

function createRangeArrayWeek(d0, d1){

  if(!(d0 instanceof Date)) throw new Error('createRangeArrayWeek: Error d0,d1 format')
  if(!(d1 instanceof Date)) throw new Error('createRangeArrayWeek: Error d0,d1 format')
  
  var out = []
  
  for(var i=d0;i<d1;i+=86400000){
    out.push([String(i.getFullYear())+String(i.getWeek()),0,0,0]);
  
  }
  
  return out;

}

/*

Function search value str in log getSheets()[0] for 'Historique du ticket' header
Calculated week corresponding

*/

function insertColumnWeekTo(clsid, str, h_histo,array_authorize_state){

  
  var sheet = SpreadsheetApp.openById(clsid).getSheets()[0]
  
  var pos;
  
 
  pos = (typeof h_histo ==='string')?HeaderSheetLibrary.insertColumnAfter(clsid, 0,h_histo,str+'_Week','red'):HeaderSheetLibrary.insertColumnAfter(clsid, 0,str,str+'_Week','red')
  
  var rownumber = sheet.getLastRow();
  
  var values = sheet.getRange(2, pos-1, rownumber, 1 ).getValues();
  
  var out=[]
  for(var i=0;i<values.length;i++){
     /*
       Afin de garantir les performances de traitement il est recommandé de retranscrire 
       la date en semaine dans l'année
     */
     var d = (typeof h_histo ==='string')?getLastDateStateTo(values[i][0],str,array_authorize_state):values[i][0]
     
     if( d instanceof Date ) out.push([String(d.getFullYear())+String(d.getWeek())])  // Une date convertie en {YEAR}{WEEK in year}
     else out.push([d])   // une chaine vide
  
  }
  
  sheet.getRange(2, pos, rownumber, 1 ).setValues(out);
 
  //addFormulaColumn_(clsid,0,str,FORMULA_CALCULATE_WEEK)
  
  SpreadsheetApp.flush()
  
  Logger.log('insertColumnWeekTo (%s) : Success',str)

}

function insertColumnWeekFrom(clsid, str, h_histo,tag){

  
  var sheet = SpreadsheetApp.openById(clsid).getSheets()[0]
  
  var pos;
  
  pos = (typeof h_histo ==='string')?HeaderSheetLibrary.insertColumnAfter(clsid, 0,h_histo,str+'_Week','red'):HeaderSheetLibrary.insertColumnAfter(clsid, 0,str,str+'_Week','red')
  
  var rownumber = sheet.getLastRow();
  
  var values = sheet.getRange(2, pos-1, rownumber, 1 ).getValues();
  
  var out=[]
  for(var i=0;i<values.length;i++){
     /*
       Afin de garantir les performances de traitement il est recommandé de retranscrire 
       la date en semaine dans l'année
     */
     var d = (typeof h_histo ==='string')?getLastDateStateFrom(values[i][0],str,tag):values[i][0]
     
     if( d instanceof Date ) out.push([String(d.getFullYear())+String(d.getWeek())])  // Une date convertie en {YEAR}{WEEK in year}
     else out.push([d])   // une chaine vide
  
  }
  
  sheet.getRange(2, pos, rownumber, 1 ).setValues(out);
 
  //addFormulaColumn_(clsid,0,str,FORMULA_CALCULATE_WEEK)
  
  SpreadsheetApp.flush()
  
  Logger.log('insertColumnWeekFrom (%s) : Success',str)

}


function addFormulaColumn_(clsid, index,name,formula){
  
  var pos = HeaderSheetLibrary.insertColumnAfter(clsid, index, name,name+'Formula','red')
  var sheet = SpreadsheetApp.openById(clsid).getSheets()[index]
  
  var formulas=[]
  
  for(var i=1;i<sheet.getLastRow();i++){
    formulas.push([formula])
  
  }
  
 sheet.getRange(2, pos, sheet.getLastRow()-1, 1).setFormulasR1C1(formulas)

}

function copyParamsToDestination_(clsid){

  var source = SpreadsheetApp.openById(ID_SPREADSHEET_PARAMS_ID).getSheets()[0]
  
  var destination = SpreadsheetApp.openById(clsid)
  
  source.copyTo(destination)
  

}

