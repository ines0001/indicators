function AddBar(clsid,range) {
  var sheet = SpreadsheetApp.openById(clsid).insertSheet()
  
  var chartBuilder = sheet.newChart();
  chartBuilder.addRange(range)
     .setChartType(Charts.ChartType.COLUMN)
     .setPosition(2, 2, 0, 0)
     .setOption('title', 'My Bar Chart!')
     .asColumnChart()
     .setStacked();
  sheet.insertChart(chartBuilder.build());  
  
}

function testingchart(){
  try{
  var clsid = getFileToDo().getId();
  
  var ss = SpreadsheetApp.openById(clsid)
  
  var sheet = ss.insertSheet()
  
  sheet.getRange(1, 1).setFormula('QUERY(Mantis_excel!$A:$Z;"select L,count(A) where (L<>\'\' AND F != \'Cosmétique\' AND L > \'201500\') group by L  pivot F order by L asc")')
  
  SpreadsheetApp.flush()
  
  var range = sheet.getDataRange()
  
  var destination = ss.insertSheet()
  
  range.copyValuesToRange(destination, 1, range.getNumColumns(), 1, range.getNumRows())
  
  ss.deleteSheet(sheet)
  
  range = destination.getDataRange()
  
  
  AddBar(clsid,range)
  
  }catch(e){Logger.log(e)}


}


// https://docs.google.com/a/google.com/spreadsheets/d/1NJpuYN91SdSqiMJ9Ijd3wksAOXWrxuo3Hu-gd8jVmtM/gviz/tq?tq=select%20L%2Ccount(A)%20where%20(L%3C%3E''%20AND%20F%20!%3D%20'Cosm%C3%A9tique'%20AND%20L%20%3E%20'201500')%20group%20by%20L%20%20pivot%20F%20order%20by%20L%20asc
