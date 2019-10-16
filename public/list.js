var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-mainmsg');

    //追加部分
    this.$nickname = $('#jsi-nickname');
    this.$message = $('#jsi-message');
    this.$time = $('#jsi-time');
    this.$target = $('#jsi-target');
    this.$text = $('#jsi-text');
    this.$date = $('#jsi-date');
    this.$score = $('#jsi-score');

    //状態 追加部分
    this.$condition = $('#jsi-condition');
    this.$sleeptime = $('#jsi-sleeptime');
    this.$morningtalk = $('#jsi-morningtalk');
    this.$friend = $('#jsi-friend');
    this.$school = $('#jsi-school');
    this.$welcometalk = $('#jsi-welcometalk');
    this.$brush = $('#jsi-brush');
    this.$study = $('#jsi-study');
    this.$sleeptalk = $('#jsi-sleeptalk');

    this.$board = $('#jsi-board');
    this.$button = $('#jsi-button');
    this.$fbotswitch = $('#jsi-switch');
    this.$tbotswitch = $('#jsi-switch2');
    
    this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
    this.chatDataStoreSecond = new Firebase('https://chat001-16c14-a23ae.firebaseio.com/');
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

    //現在の伝言
    this.chatDataStore.child('msgboard').on('child_added',function(data){
      var message = data.val().message;
      console.log(message);
      self.changemessage(message);

      var target = data.val().name;
      console.log(target);
      self.changetarget(target);

      var time = data.val().time;
      console.log(time);
      self.changetime(time);
    });

    //チャット
    this.chatDataStore.child('minus').on('child_added',function(data){
     var text = data.val().text;
     console.log(text);
     self.changetext(text);

     var date = data.val().time;
     console.log(date);
     self.changedate(date);

     var score = data.val().score;
     console.log(score);
     self.changescore(score);
    });

    //朝の挨拶 リミットトゥラストで最新版を指定できる。
    this.chatDataStoreSecond.child('00000000').child('morning').limitToLast(1).on('child_added',function(data){
      var condition = data.val().condition;
      console.log(condition);
      self.changecondition(condition);

      var sleeptimeA = data.val().sleeptime;
      var sleeptime = sleeptimeA + "時";
      console.log(sleeptime);
      self.changesleeptime(sleeptime);

      var morningtalk = data.val().time;
      console.log(morningtalk);
      self.changemorningtalk(morningtalk);
   });

    //帰りの挨拶
    this.chatDataStoreSecond.child('00000000').child('welcomeback').limitToLast(1).on('child_added',function(data){
      var friend = data.val().friend;
      console.log(friend);
      self.changefriend(friend);

      var school = data.val().school;
      console.log(school);
      self.changeschool(school);

      var welcometalk = data.val().time;
      console.log(welcometalk);
      self.changewelcometalk(welcometalk);
   });

    //お休みの挨拶
    this.chatDataStoreSecond.child('00000000').child('atnight').limitToLast(1).on('child_added',function(data){
      var brush = data.val().brush;
      console.log(brush);
      self.changebrush(brush);

      var study = data.val().study;
      console.log(study);
      self.changestudy(study);

      var sleeptalk = data.val().time;
      console.log(sleeptalk);
      self.changesleeptalk(sleeptalk);
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

  //チャット
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
  changemessage:function(message){
    var msgDom = $('<tr>');
    msgDom.html(message);
    this.$message.append(msgDom[0]);
  },

  //伝言の対象
  changetarget:function(target){
    var msgDom = $('<tr>');
    msgDom.html(target);
    this.$target.append(msgDom[0]);
  },

  //時間帯 朝・昼・晩
  changetime:function(time){
    var msgDom = $('<tr>');
    msgDom.html(time);
    this.$time.append(msgDom[0]);
  },

  //チャット
  changetext:function(text){
      var msgDom = $('<tr>');
      msgDom.html(text);
      this.$text.append(msgDom[0]);
  },

  //チャット日時
  changedate:function(date){
    var msgDom = $('<tr>');
    msgDom.html(date);
    this.$date.append(msgDom[0]);
  },

  //感情スコア
  changescore:function(score){
      var msgDom = $('<tr>');
      msgDom.html(score);
      this.$score.append(msgDom[0]);
  },

  //朝の調子
  changecondition:function(condition){
      var msgDom = $('<tr>');
      msgDom.html(condition);
      this.$condition.append(msgDom[0]);
  },

  //昨日の睡眠時間
  changesleeptime:function(sleeptime){
      var msgDom = $('<tr>');
      msgDom.html(sleeptime);
      this.$sleeptime.append(msgDom[0]);
  },

  //話した日時(朝)
  changemorningtalk:function(morningtalk){
      var msgDom = $('<tr>');
      msgDom.html(morningtalk);
      this.$morningtalk.append(msgDom[0]);
  },

  //友達の調子
  changefriend:function(friend){
      var msgDom = $('<tr>');
      msgDom.html(friend);
      this.$friend.append(msgDom[0]);
  },

  //学校の調子
  changeschool:function(school){
      var msgDom = $('<tr>');
      msgDom.html(school);
      this.$school.append(msgDom[0]);
  },

  //話した日時(帰り)
  changewelcometalk:function(welcometalk){
      var msgDom = $('<tr>');
      msgDom.html(welcometalk);
      this.$welcometalk.append(msgDom[0]);
  },

  //歯磨きした？
  changebrush:function(brush){
      var msgDom = $('<tr>');
      msgDom.html(brush);
      this.$brush.append(msgDom[0]);
  },

  //勉強した？
  changestudy:function(study){
      var msgDom = $('<tr>');
      msgDom.html(study);
      this.$study.append(msgDom[0]);
  },

  //話した日時(お休み)
  changesleeptalk:function(sleeptalk){
      var msgDom = $('<tr>');
      msgDom.html(sleeptalk);
      this.$sleeptalk.append(msgDom[0]);
  }

}

$(function(){
  CHAT.fire.init();
});
