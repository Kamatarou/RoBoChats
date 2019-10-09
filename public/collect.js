
var admin = require('firebase-admin');

var serviceAccount = require('../../../secretKey/chat001-16c14-firebase-adminsdk-yzgox-706f3ac261.json');

const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat001-16c14.firebaseio.com'
});


var db = admin.database();
var refsent = db.ref('sentiment');
var mscore;
var mtext = "";
var mtime = "";
var mflag = 0;
var a = 1;


function datapic(){
  refsent.on('child_added',function(snapshot){
       snapshot.forEach(function(data){
          key = data.key;
          value = data.val();
          score = snapshot.child('Score').val();
          text = snapshot.child('Text').val();
          time = snapshot.child('time').val();
          if(key === 'Score' && score < 0){
            mscore = score;
            console.log(key+a+':'+value);
            console.log(mscore);
            
          }
          if(key === 'Text' && score < 0){
            mtext = text;
            console.log(key+a+':'+value);
            console.log(mtext);
            
          }
          if(key === 'time' && score < 0){
            mtime = time;
            console.log(key+a+':'+value);
            console.log(mtime);
            a++;
            
          }
          
         });
         
       });
        setTimeout(dboff,20000);
};

function dboff(){
  db.app.delete();
  console.log('dboff');
}

datapic();
