function sendToAdmins(ss,blob){
  
  // See http://en.wikipedia.org/wiki/Internet_media_type for more information
  //var blob = ss.getBlob();
  
  
  
  
  //var pdf = ss.getAs(MIMETYPE_GOO).getBytes();
  // var attach = {fileName: ss.getName(),content:blob, mimeType:MIMETYPE_GOO};

   var body = "HI everyone";

   MailApp.sendEmail('eremy@sqli.com', 'Event Registration Data', '', {htmlBody:body, attachments:[blob]});

  
  //var attachment = ss.getAs(MIMETYPE_GOO); 
//MailApp.sendEmail("eremy@sqli.com", "Subject", " Body" , {"fileName": "Your_file_name" , "mimeType" : "application/vnd.ms-excel" , "content":attachment.getBytes() } );
  
}


/*


// IMPORTANT POUR ENVOIE PAR MAIL RAPIDE

// Attach all charts from the current sheet to an email.  
var charts = SpreadsheetApp.getActiveSheet().getCharts();
MailApp.sendEmail(      
    "recipient@example.com",       
    "Income Charts",  // Subject      
    "Here's the latest income charts", // Content      
    {attachments: charts });
    
    
    
    */
 
