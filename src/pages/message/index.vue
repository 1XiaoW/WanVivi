<script setup lang="ts"></script>

<template>
  <div class="message-container">
    <WanViviTop :specialPage="true" />
    <div class="message-content">
      <div class="message-middle">
        <div class="space-left">
          <div class="side-bar">
            <div class="title">
              <div class="icon"></div>
              <div>消息中心</div>
            </div>
            <ul class="list">
              <li class="item active">
                <router-link to="/message/system">系统通知</router-link>
              </li>
              <li class="item">
                <router-link to="">暂定</router-link>
              </li>
            </ul>
            <div class="divided-line"></div>
          </div>
        </div>
        <div class="space-right">
          <div class="space-right-top">
            <div class="title">系统通知</div>
          </div>
          <div class="space-right-bottom ps">
            <el-scrollbar>
              <router-view></router-view>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-container {
  .message-content {
    width: 100%;
    height: calc(100vh - 64px);
    background: url('/src/assets/images/infocenterbg.jpg') top/cover no-repeat
      fixed;
    font-size: 12px;
    line-height: 12px;
    color: #666;
    padding: 0;
    margin: 0;
    .message-middle {
      height: calc(100vh - 64px);
      background-color: pink;
      margin: 0 auto;
      width: 1143px;
      max-width: 1143px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      .space-left {
        width: 140px;
        min-width: 140px;
        background-color: rgba(255, 255, 255, 0.8);
        .side-bar {
          width: 100%;
          font-size: 14px;
          font-weight: 700;
          color: #666;
          .title {
            height: 62px;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            color: #333;
            .icon {
              line-height: 12px;
              -webkit-box-direction: normal;
              font-size: 14px;
              font-weight: 700;
              color: #333;
              width: 14px;
              height: 16px;
              margin-right: 10px;
              background: url(//s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/plane.c9984cf0.svg)
                center/contain no-repeat;
            }
          }
          .list {
            margin: 0;
            padding: 0 0 0 20px;
            .item {
              height: 40px;
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              position: relative;
              color: #6b757b;
              &::before {
                width: 10px;
                height: 20px;
                text-align: center;
                content: '\25cf';
                line-height: 20px;
              }
              a {
                padding-left: 10px;
                line-height: 40px;
                flex: 1;
                color: #6b757b;
                text-decoration: none;
              }
            }
            .active {
              color: #2faee3;
              a {
                color: #2faee3;
              }
            }
          }
          .divided-line {
            border-top: 1px solid #fff;
            margin: 10px 0;
          }
        }
      }
      .space-right {
        width: calc(100% - 140px);
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.5);
        .space-right-top {
          padding: 10px 10px 0;
          z-index: 11;
          .title {
            height: 42px;
            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            font-size: 15px;
            color: #666;
            border-radius: 4px;
          }
        }
        .space-right-bottom {
          padding: 10px;
          position: relative;
          flex: 1;
          height: calc(100% - 66px);
        }
        .ps {
          overflow: hidden !important;
          overflow-anchor: none;
          -ms-overflow-style: none;
          touch-action: auto;
        }
      }
    }
  }
}
</style>
