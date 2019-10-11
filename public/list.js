var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-mainmsg');

    //追加
    this.$nickname = $('#jsi-nickname');
    this.$message = $('#jsi-message');
    this.$time = $('#jsi-time');
    this.$target = $('#jsi-target');
    this.$text = $('#jsi-text');
    this.$date = $('#jsi-date');
    this.$score = $('#jsi-score');

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

    //追加部分
    //名前
    this.chatDataStore.child('stats').on('value',function(data){
       var name = data.child('nickname').val();
       var nickname = "ユーザー名："+name;
       console.log(nickname);
       self.changename(nickname);
    });

    //伝言
    this.chatDataStore.child('msgboard').on('child_added',function(data){
      var message = data.val().message;
      var usermessage = message;
      console.log(usermessage);
      self.changemessage(usermessage);
    });

    //伝言の対象
    this.chatDataStore.child('msgboard').on('child_added',function(data){
     var target = data.val().name;
     var usertarget = target;
     console.log(usertarget);
     self.changetarget(usertarget);
    });

    //時間帯 朝・昼・晩
    this.chatDataStore.child('msgboard').on('child_added',function(data){
     var time = data.val().time;
     var usertime = time;
     console.log(usertime);
     self.changetime(usertime);
    });

    //チャット
    this.chatDataStore.child('minus').on('child_added',function(data){
     var text = data.val().text;
     var usertext = text;
     console.log(usertext);
     self.changetext(usertext);
    });

    //チャット日時
    this.chatDataStore.child('minus').on('child_added',function(data){
      var time = data.val().time;
      var usertime = time;
      console.log(usertime);
      self.changedate(usertime);
    });

    //感情
    this.chatDataStore.child('minus').on('child_added',function(data){
     var score = data.val().score;
     var userscore = score;
     console.log(userscore);
     self.changescore(userscore);
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

  //名前
  changename:function(nickname){
    var msgDom = $('<p>');
    msgDom.html(nickname);
    this.$nickname.append(msgDom[0]);
  },

  //伝言
  changemessage:function(usermessage){
    var msgDom = $('<tr>');
    msgDom.html(usermessage);
    this.$message.append(msgDom[0]);
  },

  //伝言の対象
  changetarget:function(usertarget){
    var msgDom = $('<tr>');
    msgDom.html(usertarget);
    this.$target.append(msgDom[0]);
  },

  //時間帯 朝・昼・晩
  changetime:function(usertime){
    var msgDom = $('<tr>');
    msgDom.html(usertime);
    this.$time.append(msgDom[0]);
  },

  //チャット
  changetext:function(usertext){
      var msgDom = $('<tr>');
      msgDom.html(usertext);
      this.$text.append(msgDom[0]);
  },

  //チャット日時
  changedate:function(userdate){
    var msgDom = $('<tr>');
    msgDom.html(userdate);
    this.$date.append(msgDom[0]);
  },

  //感情スコア
  changescore:function(userscore){
      var msgDom = $('<tr>');
      msgDom.html(userscore);
      this.$score.append(msgDom[0]);
  }


}

$(function(){
  CHAT.fire.init();
});
