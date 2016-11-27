var util=require("../../util/new.js");
Page({
  data:{
    long:[],
    short:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id:options.id
    })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/'+this.data.id+'/long-comments',
      success: function(res){
        self.setData({
          long:util.formatarr(res.data.comments)
        })
      }
    })
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/'+this.data.id+'/short-comments',
      success: function(res){
        self.setData({
          short:util.formatarr(res.data.comments)
        })
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