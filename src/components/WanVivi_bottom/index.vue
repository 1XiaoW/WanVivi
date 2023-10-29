<template>
  <div class="footer">
    <div class="introduction">
      <p>
        此项目由钟城灿(linxiaowan)个人开发，有任何好的建议和疑问都可以通过以下联系方式与我联系
      </p>
      <ul>
        <li>
          <a
            target="_blank"
            href="tencent://message/?uin=3205138429&Site=在线QQ&amp;Menu=yes"
            >QQ</a
          >
        </li>
        <li>
          <a
            target="_blank"
            href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=3205138429@qq.com"
            >Email</a
          >
        </li>
        <li>
          <a target="_blank" href="https://github.com/1XiaoW">GitHub</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
  min-width: 1418px;
  height: 120px;
  display: flex;
  .introduction {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #ccc;
    margin: 0 auto;
    ul {
      li {
        float: left;
        width: 100px;
        height: 50px;
        a {
          line-height: 50px;
          display: flex;
          justify-content: center;
          color: #ccc;
          text-decoration: none;
        }
      }
      li:nth-child(2) a {
        margin: 0 10px;
      }
    }
  }
}
</style>
