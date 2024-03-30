<script setup lang="ts"></script>

<template>
  <div class="uploads_container">
    <div class="list-empty">
      <div class="list-empty__inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="118"
          height="100"
          viewBox="0 0 118 100"
          fill="none">
          <g opacity="0.6">
            <rect
              x="26"
              y="71"
              width="72"
              height="29"
              rx="14.5"
              fill="#C1C5CA"></rect>
            <rect
              x="0.109375"
              y="24.0244"
              width="98.0342"
              height="73.0255"
              rx="8.00279"
              transform="rotate(-11.1891 0.109375 24.0244)"
              fill="#DEE1E5"></rect>
            <rect
              x="6.33203"
              y="75.1777"
              width="105.679"
              height="21.6363"
              rx="4.32551"
              transform="rotate(-11.1891 6.33203 75.1777)"
              fill="#DEE1E5"></rect>
            <rect
              x="46.7266"
              y="72.9278"
              width="25.5511"
              height="6.00209"
              rx="3.00105"
              transform="rotate(-11.1891 46.7266 72.9278)"
              fill="#C1C5CA"></rect>
            <rect
              x="77"
              y="91"
              width="41"
              height="9"
              rx="4.5"
              fill="#C1C5CA"></rect>
            <path
              d="M104.46 13.7973L116.186 9.92658L117.15 18.0336L104.46 16.3797L104.46 13.7973Z"
              fill="#C1C5CA"></path>
            <path
              d="M101.489 10.4357L110.109 1.04482L114.728 5.92168L102.284 12.6185L101.489 10.4357Z"
              fill="#C1C5CA"></path>
          </g>
        </svg>
        <div class="list-empty__text"><span>好像没有东西诶</span></div>
      </div>
    </div>
    <el-card class="list-right">
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
.uploads_container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
  .list-empty {
    width: 100%;
    height: 273px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    .list-empty__inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 166px;
      width: 280px;
    }
    .list-empty__text {
      color: #9499a0;
      font-size: 14px;
      height: 20px;
      letter-spacing: 0;
      line-height: 20px;
    }
  }
  .list-right {
    height: 920px;
    line-height: 1.5;
    strong {
      font-weight: bold;
    }
  }
}
</style>
