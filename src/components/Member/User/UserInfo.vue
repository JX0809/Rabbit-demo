<template>
  <div class="user_info_container" v-if="userInfo">
    <div class="item_avatar">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="" />
        <input type="file" class="file_input" />
      </div>
      <a href="javascript:;">修改头像</a>
    </div>
    <div class="item_name">
      <div class="label">昵称：</div>
      <div class="content">
        <input type="text" :value="userInfo.nickname" />
      </div>
    </div>
    <div class="item_gender">
      <div class="label">性别：</div>
      <div class="content">
        <label for="item-sex-01">
          <input type="radio" name="item-sex" id="item-sex-01" checked />
          <span>男</span>
        </label>
        <label for="item-sex-02">
          <input type="radio" name="item-sex" id="item-sex-02" checked />
          <span>女</span>
        </label>
        <label for="item-sex-03">
          <input type="radio" name="item-sex" id="item-sex-03" checked />
          <span>未知</span>
        </label>
      </div>
    </div>

    <!-- 封装组件 -->
    <div class="item_birthday">
      <div class="label">生日：</div>
      <div class="content"></div>
    </div>

    <div class="item_city">
      <div class="label">城市：</div>
      <div class="content">
        <XtxCity
          placeholder="请选择所在城市"
          :fullLocation="fullLocation"
          @change="changeCity()"
        ></XtxCity>
      </div>
    </div>
    <div class="item_job">
      <div class="label">职业：</div>
      <div class="content"></div>
    </div>
    <div class="item_button">
      <div class="label"></div>
      <div class="content">
        <XtxButton type="primary" size="large">保存</XtxButton>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api/memberAPI/memberAPI'
import { ref } from 'vue'
export default {
  name: 'UserInfo',
  setup() {
    const userInfo = ref(null)
    getUserInfoAPI().then(({ data }) => {
      console.log(data)
      userInfo.value = data.result
    })
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countryCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    im

    const changeCity = (res) => {
      console.log(res)
      provinceCode.value = res.provinceCode
      cityCode.value = res.cityCode
      countryCode.value = res.countryCode
      fullLocation.value = res.fullLocation
    }

    return { userInfo, changeCity, fullLocation }
  }
}
</script>

<style lang="less" scoped>
.user_info_container {
  width: 100%;
  > div {
    width: 100%;
  }
  .item_avatar {
    padding: 75px 0;
    text-align: center;
    .avatar {
      width: 106px;
      height: 106px;
      margin: 0 auto;
      position: relative;

      .file_input {
        position: absolute;
        top: 0;
        left: 0;
        width: 106px;
        height: 106px;
        opacity: 0;
        cursor: pointer;
      }

      img {
        width: 106px;
        height: 106px;
        border-radius: 50%;
      }
    }
    > a {
      display: block;
      margin-top: 10px;
      color: @xtxColor;
      cursor: pointer;
    }
  }
  .item_name,
  .item_gender,
  .item_birthday,
  .item_city,
  .item_job,
  .item_button {
    display: flex;
    margin-bottom: 20px;

    .label {
      width: 340px;
      padding-right: 20px;
      text-align: right;
      font-size: 16px;
      color: #999;
      line-height: 50px;
    }

    .content {
      width: 300px;
      height: 50px;
      line-height: 48px;
      border: 1px solid #e4e4e4;
      padding-left: 10px;

      input {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item_gender {
    .content {
      border: none;
      padding-left: 0;
      line-height: 50px;
      label {
        padding-right: 20px;
        input {
          width: 13px;
          height: 13px;
        }

        span {
          padding-left: 5px;
        }
      }
    }
  }

  .item_city {
    .content {
      padding: 0;
      line-height: 0;
    }
  }
  .item_button {
    margin-top: 50px;
    .content {
      padding: 0;
      border: 0;
    }
  }
}
/deep/ .xtx_city_container {
  width: 100%;
  height: 100%;

  .select {
    width: 100%;
    height: 100%;
    border: 0;
    position: relative;
    padding-left: 10px;
    line-height: 48px;

    > i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
  .option {
    top: 49px;
    left: -1px;
  }
}
/deep/.xtx_btn {
  width: 300px;
  height: 50px;
}
</style>
