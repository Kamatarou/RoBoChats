var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$button = $('#jsi-logout');
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.logoutEvent();
    });

  },


  logoutEvent:function(){
    firebase.auth().signOut();
    location.href = './login.html';
  },
}

$(function(){
  CHAT.fire.init();
});
