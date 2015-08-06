function testingmail(){
try{
  var clsid = getFileToDo().getId();
  
  var ss = SpreadsheetApp.openById(clsid)
  
  var blob = exportAsExcel(clsid)
  
  sendToAdmins(ss,blob)
  
  }catch(e) {Logger.log(e)}

}

function testingpreformat(){
try{

   var clsid = getFileToDo().getId();
   copyParamsToDestination_(clsid)

}catch(e) {Logger.log(e)}


}


// Calcul date Affecté
function testingAddToto(){
try{
  var clsid = getFileToDo().getId();
  
  var sheet = SpreadsheetApp.openById(clsid).getSheets()[0]
  
  var pos = HeaderSheetLibrary.insertColumnAfter(clsid, 0, 'Historique du ticket','DateNouveau','red')
  
  var rownumber = sheet.getLastRow();
  
  var values = sheet.getRange(2, pos-1, rownumber, 1 ).getValues();
  
  var out=[]
  for(var i=0;i<values.length;i++){
     out.push([getLastDateState(values[i][0],'Affecté','Affecté')])
    
  }
  
  sheet.getRange(2, pos, rownumber, 1 ).setValues(out);
 
  addFormulaColumn(clsid,0,'DateNouveau',FORMULA_CALCULATE_WEEK)
 
}catch(e) {Logger.log(e)}


}



//Calcul date Reouvert
function testingAddHeader(){
 try{ 
  var clsid = getFileToDo().getId();
  
  /*
  AddNewHeaderWeekCorresponding(clsid,'=> Fermé','Historique du ticket')
 
  AddNewHeaderWeekCorresponding(clsid,'=> Validé','Historique du ticket')
  
  
  AddNewHeaderWeekCorresponding(clsid,'=> Reouvert','Historique du ticket')
  
  */
  
  
  //insertColumnWeekFrom(clsid,'Soumission')
  insertColumnWeekTo(clsid,'Livré','Historique du ticket')
  
  // --> POUR VIP insertColumnWeekFrom(clsid,'Nouveau','Historique du ticket','\\s=>')
  /* Pour B2B
  */
  insertColumnWeekFrom(clsid,'Nouveau','Historique du ticket','')
  insertColumnWeekTo(clsid,'Reouvert','Historique du ticket',['Livré','Fermé'])
  insertColumnWeekTo(clsid,'Validé','Historique du ticket')
  insertColumnWeekTo(clsid,'Fermé','Historique du ticket')
  
  
  }catch(e){Logger.log(e)}

}

