var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$mail = $('#jsi-mail');
    this.$pass = $('#jsi-pass');
    this.$button = $('#jsi-login');
    
     this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
  },

  bindEvent:function(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        location.href = './index.html';
      }
      else{
     }
     });
    this.$button.on('click',function(){
      self.loginEvent();
    });

  },

  
  loginEvent:function(){
    var self = this;
    var email = this.$mail.val();
    var password = this.$pass.val();
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
      alert('Can not login(' + error.message + ')');
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        self.chatDataStore.child('stats').child('mailAddress').set(email);
        location.href = './index.html';
      }
      else {
      
      }
     
    });
  },


}

$(function(){
  CHAT.fire.init();
});
