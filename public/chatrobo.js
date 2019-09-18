var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-msg');
    this.$board = $('#jsi-board');
    this.$button = $('#jsi-button');

    
    this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.sendMsg();
    });

   
    this.chatDataStore.child("chat").on('child_added',function(data){
      var json = data.val();
      self.addText(json['device']);
      self.addText(json['message']);
    });
  },

  
  sendMsg:function(){
    var self = this;
    if (this.$textArea.val() == ''){ return };

    var name = this.$name.val();
    var text = this.$textArea.val();
    var key = self.chatDataStore.push().toString();
    //文字の切り出し
    var fkey = key.substr(key.indexOf(".com/")+5);
	  console.log("fkey->" + fkey);
    
    
    self.chatDataStore.child("chat").child(fkey).set({device:name, message:text, firebaseKey:fkey, isSpeech:'true'});
    self.$textArea.val('');
  },

 
  addText:function(json){
   var msgDom = $('<li>');
   msgDom.html(json);
   this.$board.append(msgDom[0]);
  }
}

$(function(){
  CHAT.fire.init();
});
