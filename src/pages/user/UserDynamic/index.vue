<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue';
</script>

<template>
  <div class="dynamic-container">
    <el-card class="dynamic-card" shadow="never">
      <div class="card-header">
        <div class="card-header-left">
          <div class="card-avatar">
            <img src="../../../assets/images/hotspot.avif" alt="" />
          </div>
          <div class="card-info">
            <span>邓紫棋</span>
            <div class="pubTime">2022年8月15日</div>
          </div>
        </div>
        <div class="card-header-right">
          <el-dropdown trigger="click">
            <span>
              <el-icon style="margin-right: 20px" size="large"
                ><MoreFilled
              /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>举报</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="card-content">
        <div class="text">
          920爱牙日到啦～有一直想整牙但迟迟没行动的姐妹吗？我给大家争取到了免费口腔面诊福利！<br />
          戳这里免费预约👉网页链接👈赶紧冲鸭！[tv_抓狂]<br />
          B站粉丝线上预约到店5️⃣大福利如下：<br />
          1️⃣免费获得价值1699黑科技口扫服务！<br />
          2️⃣免费提供专业牙科全方位口腔CT扫描！<br />
          3️⃣免费赠送价值99元的精美旅行洗漱包！<br />
          4️⃣免费获得硕博正畸医生1V1面诊&方案思路！<br />
          5️⃣确认方案报我名字【tina小姐姐】立减500元！<br />
        </div>
      </div>
    </el-card>
    <el-card class="right-card" shadow="never">你好</el-card>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
  .dynamic-card {
    width: 100%;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-header-left {
        display: flex;
        .card-avatar {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .card-info {
          span {
            color: #ff8cb0;
            font-size: 17px;
            font-weight: 600;
            line-height: 32px;
          }
          .pubTime {
            font-size: 13px;
            line-height: 18px;
            color: #9499a0;
          }
          margin: -6px 0 0 20px;
        }
      }
    }

    .card-content {
      margin-left: 70px;
      .text {
        line-height: 25px;
      }
    }
  }

  .right-card {
    height: 100px;
  }
}
</style>
