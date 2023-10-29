<template>
  <div class="topbar_header_search">
    <div class="search-content">
      <input
        class="search-input"
        type="text"
        autocomplete="off"
        accesskey="s"
        maxlength="100"
        x-webkit-speech=""
        x-webkit-grammar="builtin:translate"
        value=""
        placeholder="精神分裂症"
        title="精神分裂症" />
      <div class="search-clean">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75ZM9.64999 5.64303C9.84525 5.44777 10.1618 5.44777 10.3571 5.64303C10.5524 5.83829 10.5524 6.15487 10.3571 6.35014L8.70718 8.00005L10.3571 9.64997C10.5524 9.84523 10.5524 10.1618 10.3571 10.3571C10.1618 10.5523 9.84525 10.5523 9.64999 10.3571L8.00007 8.70716L6.35016 10.3571C6.15489 10.5523 5.83831 10.5523 5.64305 10.3571C5.44779 10.1618 5.44779 9.84523 5.64305 9.64997L7.29296 8.00005L5.64305 6.35014C5.44779 6.15487 5.44779 5.83829 5.64305 5.64303C5.83831 5.44777 6.15489 5.44777 6.35016 5.64303L8.00007 7.29294L9.64999 5.64303Z"
            fill="#C9CCD0"></path>
        </svg>
      </div>
    </div>
    <div class="search-btn">
      <svg
        t="1694927023016"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2392"
        width="20"
        height="20">
        <path
          d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z"
          p-id="2393"
          fill="#707070"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.topbar_header_search {
  position: relative;
  margin: 0 auto;
  min-width: 188px;
  max-width: 500px;
  display: flex;
  background-color: #ebf4f7;
  border-radius: 6px;
  .search-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 6px;
    .search-input {
      width: 100%;
      border: none;
      height: 32px;
      padding: 0 8px;
      border-radius: 6px;
      &:focus {
        outline: none;
      }
    }
    .search-clean {
      position: absolute;
      right: 10px;
    }
  }
  .search-btn {
    margin: 10px;
  }
}
</style>
