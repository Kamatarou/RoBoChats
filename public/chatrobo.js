var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-mainmsg');

    //チェック
    this.$p = $('#jsi-p');
    this.$text = $('#jsi-text');

    this.$board = $('#jsi-board');
    this.$button = $('#jsi-button');
    this.$fbotswitch = $('#jsi-switch');
    this.$tbotswitch = $('#jsi-switch2');
    
    this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
  },

  bindEvent:function(){
    var self = this;
    self.chatDataStore.child("stats").child("isBot").set(true);
    this.$button.on('click',function(){
      self.sendMsg();
    });
    this.$fbotswitch.on('click',function(){
      self.changeisBotF();
    });
    this.$tbotswitch.on('click',function(){
      self.changeisBotT();
    });

   
    this.chatDataStore.child("chat").on('child_added',function(data){
      console.log('on');
      var json = data.val();
      self.addText(json['device']);
      self.addText(json['message']);
    });

    //チェック
    this.chatDataStore.child('stats').on('value',function(data){
       var name = data.child('nickname').val();
       var username = "ユーザー名："+name;
       console.log(username);
       self.changename(username);
    });

    //チェック
    this.chatDataStore.child('minus').on('child_added',function(data){
       var text = data.val().score;
       var usertext = text;
       console.log(usertext);
       self.changetext(usertext);
    });
    
  },

  changeisBotF:function(){
    var self = this;
    self.chatDataStore.child("stats").child("isBot").set(false);
  },
  
  changeisBotT:function(){
    var self = this;
    self.chatDataStore.child("stats").child("isBot").set(true);
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
    
    
    self.chatDataStore.child("chat").child(fkey).set({device:name, message:text, firebasekey:fkey, isSpeech:'true'});
    self.$textArea.val('');
  },

 
  addText:function(json){
   var msgDom = $('<li>');
   msgDom.html(json);
   this.$board.append(msgDom[0]);
  },

  //チェック
  changename:function(username){
    var msgDom = $('<li>');
    msgDom.html(username);
    this.$p.append(msgDom[0]);
  },

  //チェック
  changetext:function(usertext){
      var msgDom = $('<li>');
      msgDom.html(usertext);
      this.$text.append(msgDom[0]);
  }

}

$(function(){
  CHAT.fire.init();
});
