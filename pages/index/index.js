var utils=require('../../util/new.js');
var $=require("../../util/animation.js");
var date=new Date();
var flag=true;
Page({
  data:{
    tops:[],
    news:[],
    themes:[],
    ani:{},
    active:false,
    fade:{},
  },
  tapbutton:function(){
  if(!this.data.active){
    this.setData({
      ani:$.getAni("slideout"),
      active:true
    })
  }else{
    this.setData({
      ani:$.getAni("slidein"),
      active:false
    })
  }
},
  action:function(e){
    var id=e.currentTarget.dataset.id;
    var title=e.currentTarget.dataset.title;
    wx.showActionSheet({
      itemList:["分享","阅读"],
      success:function(e){
           if(e.tapIndex===0){
             wx.showModal({
                title:"分享?",
                content:"是否继续",
                success:function(res){
                  if(res.confirm){
                    console.log("确认分享")
                  }
                }
             })
           }else if(e.tapIndex===1){
              wx.navigateTo({
               url:"/pages/show/show?id="+id+"&title="+title
              })
           }
      }
    })
  },
  onReachBottom:function(){
     wx.showToast({
       title:"加载中....",
       icon:"loading",
       duration:5000,
     })
      var s=utils.formatdate(date);
      var url="http://news.at.zhihu.com/api/4/news/before/"+s;
      var self=this;
      if(flag){
        flag=false,
      wx.request({
        url:url,
        data: {},
        success:function(r){
          wx.hideToast();
          flag=true
          var ln=self.data.news.concat(utils.formatarr(r.data.stories));
          var d=utils.before(date);
          
          self.setData({
            news:ln,
          })
           
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      };
  },
  onLoad:function(options){
    
  },
  onReady:function(){
    var self=this;
    wx.request({
        url:'http://news-at.zhihu.com/api/4/start-image/1080*1776',
        success:function(r){
          self.setData({
            startImage:utils.format(r.data.img),

          })
          var fadeout=wx.createAnimation({
            duration: 1000,
            timingFunction:"ease-out",
            delay: 2000,
           })
           fadeout.opacity(0).scale(0,0).step();
           var fadein=wx.createAnimation({
            duration: 1000,
            timingFunction:"ease-out",
            delay: 2000,
           })
           
           setTimeout(function(){
              self.setData({
                fade:fadeout.export()
              })
           },1000)
        }
    })



    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/themes',
      data: {},
      success: function(r){
        self.setData({
          themes:r.data.others,
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.showToast({
      title:"努力加载中",
      icon:"loading",
      

    })
     var self=this;
    wx.request({
      url: "http://news-at.zhihu.com/api/4/news/latest",
      data: {},
      success: function(r){
        wx.hideToast();
        var t=r.data.top_stories;
        var n=r.data.stories;
        self.setData({
          tops:utils.formatarr(t),
          news:utils.formatarr(n)
        })
          
      },
      fail: function() {
        // fail
      },
      complete: function() {
        flag=true;
      }
    })
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭

  }
})