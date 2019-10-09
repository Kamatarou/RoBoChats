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
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.loginEvent();
    });

  },

  
  loginEvent:function(){
    var email = this.$mail.val();
    var password = this.$pass.val();
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
      alert('Can not login(' + error.message + ')');
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        location.href = './index.html';
      }
     
    });
  },


}

$(function(){
  CHAT.fire.init();
});
