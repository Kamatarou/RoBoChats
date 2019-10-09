var senderMailAddress = 'robotestmailer1001@gmail.com';
var senderMailPass = 'roborobohon898';

var mailer = require('nodemailer');
var admin = require('firebase-admin');

var serviceAccount = require('../../../secretKey/chat001-16c14-firebase-adminsdk-yzgox-706f3ac261.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat001-16c14.firebaseio.com'
});

var db = admin.database();
var refstats = db.ref('stats');
var mailAddress;


var transporter = mailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,   //TLS
    secure: false,
    requireTLS: true,
    auth:{
       user:senderMailAddress,
       pass:senderMailPass
      }
  });
  
var mail = function(){  
  refstats.once('value',function(data){
     mailAddress = data.child('mailAddress').val();
     console.log(mailAddress);
     send(mailAddress);
     db.app.delete();
  },
  function(errorObject){
     console.log('read failed' +errorObject.code);
  });

};

function send(mailAddress){
  var mailset = {
    from: senderMailAddress,
    to: mailAddress,
    subject: 'testmail',
    text: 'test'
  };

  

  transporter.sendMail(mailset,function(error,info){
      if(error){
        console.log(error);
       }else{
        console.log('Mail send' +info.response);
       }
     });
};

mail();
