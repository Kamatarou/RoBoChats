var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$mail = $('#jsi-mail');
    this.$pass = $('#jsi-pass');
    this.$repass = $('#jsi-repass')
    this.$button = $('#jsi-signup');
    
    this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.signupEvent();
    });

  },
  
  signupEvent:function(){
    var self = this;
    var name = this.$name.val();
    var email = this.$mail.val();
    var pass = this.$pass.val();
    var repass = this.$repass.val();
    if(name !== "" && email !== "" && pass === repass){
      firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        alert('Can not Sign up (' + error.message + ')');
      });
      firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        self.chatDataStore.child('stats').child('mailAddress').set(email);
        self.chatDataStore.child('stats').child('nickname').set(name);
        location.href = './index.html';
      }
      else {
       
      }
     });
      
    }
    else {
     if(name === ""){
      alert('nickname x');
     }
     if(email === ""){
       alert('mailaddress x');
     }
     if(pass !== repass){
       alert('Can not Sign up (Two password does not match )');
     }
    }
    
    
  },

}

$(function(){
  CHAT.fire.init();
});

