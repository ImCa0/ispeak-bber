## 说明

此项目仅仅作为[哔哔点啥](https://immmmm.com/bb-by-wechat-pro/)的前端数据展示。
示例页面：

- [https://www.antmoe.com/bb](https://www.antmoe.com/bb)
- [https://blog.ccknbc.cc/essay/](https://blog.ccknbc.cc/essay/)
- [https://blog.imzjw.cn/talking/](https://blog.imzjw.cn/talking/)
- ...

## 重要说明

**使用前请先确保参考[林木木](https://immmmm.com/bb-by-wechat-pro/#%e6%89%8b%e5%8a%a8%e9%83%a8%e7%bd%b2%e5%88%9b%e5%bb%ba%e5%ba%94%e7%94%a8)的教程成功配置好云函数，然后在来使用本项目作为前端数据的展示。**

## 配置说明

> 以下为markdown文件示例

```markdown
<div id='speak'></speak>
<!-- 使用markdown渲染 -->
<!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ispeak-bber/ispeak-bber-md.min.js" charset="utf-8" ></script> -->
<!-- 不使用markdown渲染 -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ispeak-bber/ispeak-bber.min.js" charset="utf-8" ></script>
<!-- 解析微信表情（参考：https://github.com/buddys/qq-wechat-emotion-parser） -->
<!-- <script src="https://cdn.jsdelivr.net/gh/buddys/qq-wechat-emotion-parser@master/dist/qq-wechat-emotion-parser.min.js"></script> -->
<script>
ispeakBber
    .init({
      el: '#speak', // 容器选择器
      name: 'DreamyTZK 🦄', // 显示的昵称
      envId: '腾讯云开发环境id', // 环境id
      region: 'ap-shanghai', // 腾讯云地址，默认为上海
      limit: 10, // 每次加载的条数，默认为5
      avatar: 'https://cdn.jsdelivr.net/npm/kang-static@latest/avatar.jpg',
      fromColor:'rgb(245, 150, 170)', // 下方标签背景颜色 默认 rgb(245, 150, 170)
      loadingImg: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif', // 自定义loading的图片，示例值为默认值
      dbName:'talks' // 数据的名称，默认talks，避免有人的命名不是这个，所以加入此配置字段。
    })
    .then(function() {
      // 哔哔加载完成后的回调函数，你可以写你自己的功能
      console.log('哔哔 加载完成')
    })
</script>
```

> 其他注意事项： 云数据库名称必须为`talks`才可以，目前不支持指定数据库名称。示例代码中未指定版本号，如果你想指定版本号可以到[jsdelivr](https://cdn.jsdelivr.net/npm/ispeak-bber/)查看最新版本并引用。


## 是否使用markdown

关于这个问题，起初我并不打算适配非markdown，但因为考虑到部分用户可能已经使用过很长一段时间哔哔，并且通过哔哔微信公众号发送的图片是图片链接，非markdown语法也不是html标签，因此考虑到部分用户，只能出一个非markdown渲染的版本。

- markdown渲染的脚本支持markdown语法。

- 非markdown渲染脚本兼容markdown语法、html标签发送的图片，同时非markdown渲染继承了原bb将图片链接转换为图片链接、将一个非图片链接转化为`<a href='${url}' rel='noopener' target='_blank'>↘链接↙</a>`的功能。

## 其他

本项目构建方式及一些其他零碎点参考[twikoo](https://github.com/imaegoo/twikoo)

