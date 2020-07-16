# village

> villageHome

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3131
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

#首页实现功能阐述(组长：李炽杭)
    ##一、轮播图功能
        1.无缝滚动
        2.轮播图可以实现触摸滑动效果，限制滑动距离和范围滑动到对应页面出现高亮效果，点击跳转到相应的列表介绍页，再点击跳转到详情页。
    ##二、首页功能实现
        1.搜索栏吸顶功能，点击跳转到搜索详情页。
        2.搜索详情页功能：
            (1).输入城市后，失去焦点后，点击搜索按钮跳转到相应城市的列表页。
            (2).点击热门城市，城市名会到搜索栏，再点击搜索按钮跳转到相应城市的列表页。
            (3).历史搜索功能。
        3.“房东推荐”可以实现触摸滑动效果，限制滑动距离和范围，滑动到对应页面出现高亮效果，点击跳转到列表页或者详情页面，传递参数。

#列表页实现功能阐述(卢思+李炽杭)
    ##一、列表页功能实现
        1.接收首页传过来的城市id，发起请求得到该城市的酒店民宿数据，再点击传递该民宿的id,跳转到详情页
        2.排序功能：默认排序，低价优先，高价优先，好评优先功能
        3.筛选功能：没有完善
        4.日期功能：没有完善

#详情页实现功能阐述(魏景宏+李炽杭+卢彦谷)
    ##一、详情页功能实现
        1.接收列表页或首页传递过来的民宿id，vue动态渲染
        2.点击联系房东，可出现与客服的对话框
        3.点击提交订单，把订单id和状态写进数据库，然后判断有无登录，如果没有，则跳转到登录注册页面，如果有，则直接跳转到订单页

#实现功能阐述(卢彦谷)
    ##一、沉底导航功能
        1.实现跳转到其他页面的路由跳转
        2.点击去到对应页面时候出现高亮效果。
    ##二、首页功能实现
        1.“热门城市”，“你可能喜欢”，“国内城市”可以实现触摸滑动效果，限制滑动距离和范围，滑动到对应页面出现高亮效果，点击跳转到列表页或者详情页面，传递参数。
    ##三、聊天室功能实现
        1.详情页点击联系房东跳转消息页，点击可联系客服或者房东
        2.未添加房东帐号，房东聊天功能暂时无法实现。
        3.客服聊天功能，接入图灵机器人api，可以智能回答用户提问
        4.模拟手机页面操作，出现模拟键盘，点击发送或者空白处可以收回键盘。
        5.始终保持最新消息出现在页面最下方，无需使用滚动条。


#登录注册订单详情支付订单列表功能阐述（谢智琳）
    ##一、登录注册功能（组件名称：login/register）
        1.登录
        输入手机号码和密码时查询数据库，手机号码和密码正确才能实现登录成功，并返回用户id、用户电话存入本地储存，是用来判断用户是否已经登录过了（判断此时是否有本地存储，有就不用再次登录），用户ID用于给后面的页面订单列表页（orderlist)返回后台查询用户的订单，点击登录跳转到Users页面。
        2.注册
        输入手机号码时查询数据库内手机号码是否已经注册，返回结果为查询不到才写入数据库，把手机号码写入本地存储中。
    ##二、用户页（组件名称：Users）
        登录注册成功后都跳转到此页面，点击退出删除localstorage，并跳转到登录页。
        点击我的订单跳转到用户的订单列表页(orderlist)
    ##三、订单列表页(组件名称:orderlist)
        1.在本地储存中拿到用户id发起请求，返回此用户id的所有订单，判断订单的status的状态为0的话,就写入到未付款页面，status为1的就写入准备入住页面。
        2.点击订单跳转到订单详情页(orderpage)
    ##四、订单详情页(orderpage)
        1.拿到orderid查询订单并写入到页面，如果未付款的则显示付款按钮跟取消订单按钮，点击付款按钮跳转到支付页面(pay)，点解取消订单发起请求数据库删除订单，已付款的则只显示订单详细信息。
    ##五、支付页面(pay)
        1.接收orderpage传过来的参数写入页面，点击立即支付拿到orderid发起请求更新数据库的status的状态并跳转到支付成功页面(paysus)

#后台功能阐述(梁政)
    ##一,登录/注册/点击页面设置按钮,登录退出
    ##二,客户用户的数据增删查改功能,点击选择框,查询条件数据生成列表,点击列表数据选择，自动查询,可进行多条件查询,分页查询,商品编辑发布,弹窗操作
    ##三,管理员对客户的旅馆数据查询功能,多条件查询,分页查询,弹窗操作
    ##四,评论管理，删除，修改评论功能,点击编辑,弹出弹窗,修改评论，确定保存,数据写入数据库，
    ##五,用户列表查询
    ##前后端,框架的搭建