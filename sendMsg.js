/**
 * @description: 像电报发送消息
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-29 09:17:42
 * @LastEditTime: 2021-03-29 09:17:42
 * @LastEditors: 小康
 */
const axios = require('axios')
const chat_id = process.env.CHATID
const text =
  '你关注的ipseak-bber更新了哦！👉https://gitlab.com/DreamyTZK/ispeak-bber/-/commits/master'
const url = 'https://kkapi.vercel.app/telegram'
axios
  .post(url, {
    text,
    chat_id,
    type: 'send'
  })
  .then((res) => {
    console.log(res.data)
  })
