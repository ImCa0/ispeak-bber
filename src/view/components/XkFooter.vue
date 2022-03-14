<template>
  <div class="xk-footer">
    Powered by
    <a href="https://www.antmoe.com/bb/" target="_blank">{{ name }}</a> v{{
      version
    }}
  </div>
</template>

<script>
import { version, name } from "../../../package.json";

export default {
  data() {
    return {
      version,
      name,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.xk-footer {
  width: 100%;
  text-align: end;
  font-size: 0.75em;
  color: #999999;
  margin-top: 1em;
}
a {
  color: #99a9bf;
  text-decoration: none;
  word-wrap: break-word;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
  overflow-wrap: break-word;
}
</style>
