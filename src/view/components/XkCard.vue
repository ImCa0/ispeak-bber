<!--
 * @description: 卡片
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-19 09:17:45
 * @LastEditTime: 2021-06-20 16:26:01
 * @LastEditors: 小康
-->
<template>
  <div class="xk-card">
    <div class="xk-card-header">
      <div class="xk-card-name">
        <div class="avatar">
          <img :src="avatar" class="avatar-img" />
        </div>
        <div class="name">{{ name }}</div>
        <svg
          class="is-badge"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
            fill="#1da1f2"
          ></path>
        </svg>
        <div class="xk-card-time" :title="time">{{ date }}</div>
      </div>
    </div>
    <div class="xk-card-content" v-html="content"></div>
    <div class="xk-card-footer">
      <div
        :style="'background: ' + fromColor + ';color:' + 'white'"
        class="xk-card-label"
      >
        {{ from }}
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  props: ["bbData", "name", "avatar", "fromColor"],
  data() {
    return {
      content: "",
      date: "",
      from: "",
      time: "",
    };
  },
  mounted() {
    this.content = this.formatBody(this.bbData.content);
    this.from = this.bbData.from;
    this.date = this.formatTime(this.bbData.date);
    this.time = this.titleTime(this.bbData.date);
  },
  methods: {
    formatBody: (body) => {
      // 判断是否使用marked渲染
      if (Vue.prototype.$marked) {
        const marked = Vue.prototype.$marked;
        const renderer = {
          image(href, title, text) {
            console.log(href);
            return `<a href="${href}" target="_blank" data-fancybox="group" class="fancybox">
           <img src="${href}" alt='${text}'>
          </a>`;
          },
        };
        marked.use({ renderer });
        return marked(body, { breaks: true, gfm: true });
      } else {
        function urlToLink(str) {
          // const qqWechatEmotionParser = require('qq-wechat-emotion-parser');
          const re = /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif|mp4))\S+/g;

          // 匹配html标签发布的图片
          const re_tagImg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gm;
          str = str.replace(re_tagImg, function(raw, url, text, uuu) {
            return url;
          });
          // 处理markdown格式的图片
          const re_mdImg = /!\[(.*?)\]\((.*?)\)/gm;
          str = str.replace(re_mdImg, function(raw, text, url) {
            return url;
          });
          // 替换所有图片链接为图片
          const re_forpic = /\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpeg)|(png)|(jpg)|(webp))/g;
          str = str.replace(re_forpic, function(url) {
            return `<a href="${url}" target="_blank" data-fancybox="group" class="fancybox">
            <img src="${url}" ></a>`;
          });
          str = str.replace(re, function(website) {
            return `<a href='${website}' rel='noopener' target='_blank'>↘链接↙</a>`;
          });
          if (window.qqWechatEmotionParser) {
            str = qqWechatEmotionParser(str);
          }
          return str;
        }
        return urlToLink(body);
      }
    },
    // format time
    // code from https://www.heson10.com/posts/3510.html
    formatTime: (time) => {
      const date = new Date(time);
      const dateTimeStamp = date.getTime();

      let result = "";
      //友好地显示时间
      var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var month = day * 30;
      var now = new Date().getTime(); //获取当前时间毫秒
      var diffValue = now - dateTimeStamp; //时间差
      if (diffValue < 0) {
        return;
      }
      var minC = diffValue / minute; //计算时间差的分，时，天，周，月
      var hourC = diffValue / hour;
      var dayC = diffValue / day;
      var weekC = diffValue / week;
      var monthC = diffValue / month;
      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + " 月前";
      } else if (weekC >= 1 && weekC < 4) {
        result = " " + parseInt(weekC) + " 周前";
      } else if (dayC >= 1 && dayC < 7) {
        result = " " + parseInt(dayC) + " 天前";
      } else if (hourC >= 1 && hourC < 24) {
        result = " " + parseInt(hourC) + " 小时前";
      } else if (minC >= 1 && minC < 60) {
        result = " " + parseInt(minC) + " 分钟前";
      } else if (diffValue >= 0 && diffValue < minute) {
        result = "刚刚";
      } else {
        const datetime = new Date();
        datetime.setTime(dateTimeStamp);
        const Year = datetime.getFullYear();
        const Nmonth =
          datetime.getMonth() + 1 < 10
            ? "0" + (datetime.getMonth() + 1)
            : datetime.getMonth() + 1;
        const Ndate =
          datetime.getDate() < 10
            ? "0" + datetime.getDate()
            : datetime.getDate();
        const Hour = datetime.getHours();
        const minutes =
          datetime.getMinutes() < 10
            ? "0" + datetime.getMinutes()
            : datetime.getMinutes();
        result = `${Year}-${Nmonth}-${Ndate} ${Hour}:${minutes}`;
      }
      return result;
    },
    titleTime: (time) => {
      const date = new Date(time);
      const dateTimeStamp = date.getTime();
      const datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let result = "";
      const Year = datetime.getFullYear();
      const Nmonth =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      const Ndate =
        datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      const Hour = datetime.getHours();
      const minutes =
        datetime.getMinutes() < 10
          ? "0" + datetime.getMinutes()
          : datetime.getMinutes();
      result = `${Year}-${Nmonth}-${Ndate} ${Hour}:${minutes}`;
      return result;
    },
  },
};
</script>
<style scoped>
.xk-card {
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  overflow: hidden;
  margin-top: 20px;
  transition: all 0.25s ease 0.2s,
    transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s,
    -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s;
  user-select: none;
}
.xk-card:hover {
  box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
  transform: translateY(-3px);
}
.xk-card .xk-card-time {
  font-size: 12px;
  text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
  margin-left: 10px;
}
.xk-card .xk-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xk-card .xk-card-header .xk-card-name {
  display: flex;
  align-items: center;
}
.xk-card .xk-card-header .xk-card-name .is-badge {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}
.xk-card .xk-card-header .xk-card-name .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
}
.xk-card .xk-card-header .xk-card-name .avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.xk-card .xk-card-content {
  padding: 10px 0;
  /* white-space: pre-wrap; */
}

/* @media screen and (min-width: 768px) {
  #article-container .xk-card-content >>> .fancybox,
  #article-container .xk-card-content >>> video {
    display: inline-block;
    max-width: 24%;
  }
}

@media screen and (max-width: 768px) {
  #article-container .xk-card-content >>> .fancybox,
  #article-container .xk-card-content >>> video {
    display: inline-block;
    max-width: 49%;
  }
} */

.xk-card .xk-card-footer {
  display: flex;
  padding-bottom: 10px;
}
.xk-card .xk-card-footer .xk-card-label {
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 550;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgb(27 31 35 / 12%);
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
}
</style>
