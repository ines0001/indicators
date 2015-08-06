function doGet(request) {
  
  var html=null ;
 
  switch(request.parameter.page){
  
   case 'testa': html = HtmlService.createTemplateFromFile('testa');
                 Logger.log('ici');
                 html = html.evaluate()
                          .setTitle('test1')
                          .setSandboxMode(HtmlService.SandboxMode.IFRAME)
                 break;
   
   case 'testb': html = HtmlService.createTemplateFromFile('testb');
                 html = html.evaluate()
                          .setTitle('test2')
                          .setSandboxMode(HtmlService.SandboxMode.IFRAME);break;
   
   default: html = HtmlService.createTemplateFromFile('Page-accueil')
            
            html = html.evaluate()
                          .setTitle('Accueil Indicateurs L\'Oréal')
                          .setSandboxMode(HtmlService.SandboxMode.IFRAME);break;
  }
  
  return html;
}

