
// Recherche la date associé au dernier statut
// [in] string : chaine historique
// [in] state : dernier statut à recherche
// [out] : date. -1 sinon

// Exemple
// 20/03/15 14:45 poguillou Etat Commentaire => Livré
// 20/03/15 14:45 poguillou Etapes pour reproduire mises à jour 
// 24/03/15 11:05 llusson Note ajoutée: OK.rnNous rouvrirons si nous rencontrons le pb en prod 
// 24/03/15 11:05 llusson Etat Livré => Fermé
// 24/03/15 11:05 llusson Etapes pour reproduire mises à jour 
// 27/05/15 12:15 aanciaux Fichier ajouté : MANTIS - 4382 - Commande avec montants erronés.docx 
// 27/05/15 12:16 aanciaux Note ajoutée: Bonjour,rnrnNous ré-ouvrons le mantis.rnrnNouveau cas en PRODUCTIONrnCommande 300014218r 
// 27/05/15 12:16 aanciaux Assigné à llusson => lmedara
// 27/05/15 12:16 aanciaux Etat Fermé => Reouvert
// 27/05/15 12:16 aanciaux Etapes pour reproduire mises à jour 
// 28/05/15 17:52 llusson Intitulé commande avec des prix négatifs => commande avec montant incorrect affiché
// 28/05/15 17:52 llusson Etapes pour reproduire mises à jour 
// 29/05/15 17:14 alhoffmann Assigné à lmedara => fculot
// 29/05/15 17:14 alhoffmann Etapes pour reproduire mises à jour 
function getLastDateStateTo(string, state, array_authorize_state) {
  var reg= /(\b\d{2}[/]\d{2}[/]\d{2}\b)/g;
    
    var match,res='',i,t = string.split(reg);
   
    // On commence par la fin car on recherche la dernière date 'state' de la pile
    for(i=t.length-1;i>0;i--){
      if (match = t[i].match(new RegExp('\([A-Za-z0-9_éèàç]+\)\\s=>\\s'+state,'g'))) { 
                                                if(array_authorize_state && Array.isArray(array_authorize_state)){
                                                  var check
                                                  for(var z=0;z<array_authorize_state.length;z++){
                                                    if(match[0].indexOf(array_authorize_state[z])!=-1) check=true;
                                                  }
                                                  if(check) break;
                                                
                                                }
                                                else break;
                                                
                                              } // Ok on a matché avec le statut et on arrête la recherche
    }
    
    if(match) {
      var pattern = /(\d{2})\/(\d{2})\/(\d{2})/; // 11/04/2015
      res = new Date(t[i-1].replace(pattern,'$2/$1/20$3')); // On récupère sa date à l'index [i-1]
    }
  
    return res
}


function getLastDateStateFrom(string, state,tag) {
  var reg= /(\b\d{2}[/]\d{2}[/]\d{2}\b)/g;
    
    var match=false,res='',i,t = string.split(reg);
    
    // On commence par la fin car on recherche la dernière date 'state' de la pile
    for(i=t.length-1;i>0;i--){
      if (t[i].match(new RegExp(state+tag+'\\s([A-Za-z0-9_éèàç]+)','g'))) { match=true; break;} // Ok on a matché avec le statut et on arrête la recherche
    }
    
    if(match) {
      var pattern = /(\d{2})\/(\d{2})\/(\d{2})/; // 11/04/2015
      res = new Date(t[i-1].replace(pattern,'$2/$1/20$3')); // On récupère sa date à l'index [i-1]
    }
  
    return res
}


/** 
 * Get the ISO week date week number 
 */  
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  
  var weeknum  = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
  return ("0" + weeknum).slice(-2)                   
}


function testingDate(){
  var d = new Date(2018,00,8);

  
  var val = String(d.getFullYear())+String(d.getWeek())
  
  d = getLastDateStateTo('11/11/15 **** *** *** toto => Reouvert ********* 01/01/15 ***** Livré => Reouvert  ******* 01/05/15  Fermé => Reouvert ************** ','Reouvert',['Fermé','Livré'])
  
  return;
  

}
