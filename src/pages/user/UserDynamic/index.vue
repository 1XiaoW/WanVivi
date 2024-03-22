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
    <el-card class="right-card">
      <strong
        >WanVivi禁止用户从事以下违法行为或在WanVivi平台制作、上传、复制、传送、传播含有下列内容的违法信息：</strong
      ><br />
      （1）反对宪法所确定的基本原则的；<br />
      （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
      （3）损害国家荣誉和利益的；<br />
      （4）歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；<br />
      （5）宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动的；<br />
      （6）煽动民族仇恨、民族歧视，破坏民族团结的；<br />
      （7）破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
      （8）散布谣言，扰乱经济秩序和社会秩序的；<br />
      （9）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、引诱自杀的；<br />
      （10）侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；<br />
      （11）侵害未成年人合法权益或可能危害未成年人身心健康的；<br />
      （12）法律、行政法规禁止的其他行为或内容。
    </el-card>
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
    strong {
      font-weight: bold;
    }
  }
}
</style>
