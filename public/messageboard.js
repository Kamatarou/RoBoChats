 var CHAT = CHAT || {};

CHAT.fire = {
  init:function(){
    this.setParameters();
    this.bindEvent();
  },

  setParameters:function(){
    this.$textArea = $('#jsi-mainmsg');
    this.$board = $('#jsi-msgboard');
    this.$button = $('#jsi-setbtn');

    
    this.chatDataStore = new Firebase('https://chat001-16c14.firebaseio.com/');
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.sendMsg();
    });

   
    this.chatDataStore.child("msgboard").on('child_added',function(data){
      var json = data.val();
      self.addText(json['name']);
      self.addText(json['message']);
    });
  },

  
  sendMsg:function(){
    var self = this;
    if (this.$textArea.val() == ''){ return };

    //プルダウンリストの取得
    const sendTime = document.formTime.sendTime;
    const numTime = sendTime.selectedIndex;
    //時間の設定
    const time = sendTime.options[numTime].value;
    if(!time){ return };
    console.log(time);

    var name = "みんな";
    var text = this.$textArea.val();
    
    self.chatDataStore.child("msgboard").child(name).set({name:name, message:text, time:time, isListen:'false'});
    self.$textArea.val('');
    document.location.reload(true);
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
