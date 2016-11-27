Page({
  data:{
    title:[],
    id:[],
    zan:"",

  },
  onLoad:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      title:e.title,
      id:e.id,
    })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story-extra/'+this.data.id,
      success: function(r){
         self.setData({
           zan:r.data.popularity,
           long:r.data.long_comments,
           short:r.data.short_comments,
           comment:r.data.comments
         })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    var self=this;
    wx.setNavigationBarTitle({
        title:this.data.title,
    })
    wx.showToast({
        title:"加载中...",
        icon:"loading",
        duration: 2000
    });
     wx.request({
      url:"http://news-at.zhihu.com/api/4/news/"+self.data.id,
      success:function(r){
        var c=r.data.body.replace(/<div[^>]+>|<\/div>|<h2[^>]+>|<\/h2>|<span[^>]+>|<\/span>|<a[^>]+>|<\/a>|<strong[^>]+>|<\/strong>|<p[^>]+>|<\/p>|<i[^>]+>|<\/i>|<&[^>]+o|&[^>]+o|<p[^>]+>|<\p>|<str[^>]+>|<\ng>|<em[^>]+>|<\/em>|<em[^>]+>|<\em>|<br[^>]+>|<\/br><blockquote[^>]+>|<\/blockquote><blockquote[^>]|<\/blockquote>|<\li>|<\/li>|<ul[^>]|<\/ul><\/ hr>/g,'');
        wx.hideToast();
        console.log(r)
        self.setData({
          content:c
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