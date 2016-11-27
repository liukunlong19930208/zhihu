var utils=require('../../util/new.js');
Page({
  data:{
      title:"",
      name:[],

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      this.setData({
          id:options.id,
          name:options.name,
      })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.setNavigationBarTitle({
        title:this.data.title,
    })
    wx.showToast({
        title:"正在加载中...",
        icon:"loading",
        duration:2000,
    }),
    wx.request({
      url:"http://news-at.zhihu.com/api/4/theme/"+this.data.id,
      success:function(r){
        wx.hideToast();
        r.data.background=utils.format(r.data.background);
        r.data.stories=utils.formatarr(r.data.stories);
        self.setData({
          data:r.data,
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