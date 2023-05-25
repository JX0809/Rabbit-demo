<template>
  <div class="home_special_container">
    <HomePanel title="最新专题">
      <template v-slot:more>
        <XtxMore></XtxMore>
      </template>

      <div class="goods_body" ref="lazyBox">
        <transition name="fade">
          <ul v-if="specialList.length">
            <li
              class="special_item hoverShadow"
              v-for="item in specialList"
              :key="item.id"
            >
              <router-link to="/">
                <!-- <img :src="item.cover" alt="" /> -->
                <!-- 图片懒加载 -->
                <img v-lazyLoad="item.cover" alt="" />
                <div class="meta">
                  <p class="title">
                    <span class="top_title ellipsis">{{ item.title }}</span>
                    <span class="ellipsis comment">{{ item.summary }}</span>
                  </p>
                  <span class="price">￥{{ item.lowestPrice }}</span>
                </div>
              </router-link>
              <div class="special_foot">
                <span class="like"
                  ><i class="iconfont icon-fabulous"></i>
                  {{ item.collectNum }}</span
                >
                <span class="view"
                  ><i class="iconfont icon-browse"></i>{{ item.viewNum }}</span
                >
                <span class="reply"
                  ><i class="iconfont icon-comment"></i
                  >{{ item.replyNum }}</span
                >
              </div>
            </li>
          </ul>

          <!-- 骨架 -->
          <div class="skeleton" v-else>
            <XtxSkeleton
              v-for="i in 3"
              :key="i"
              width="404px"
              height="360px"
              animated
            >
            </XtxSkeleton>
          </div>
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'
import { ref } from 'vue'
import { useLazyLoadData } from '@/hook'
import { homeSpecialAPI } from '@/api/homeAPI/homeAPI'

export default {
  name: 'HomeSpecial',
  components: {
    HomePanel
  },
  setup() {
    const lazyBox = ref(null)
    const { result } = useLazyLoadData(homeSpecialAPI, lazyBox)

    return {
      specialList: result,
      lazyBox
    }
  }
}
</script>

<style lang="less" scoped>
.home_special_container {
  width: 100%;
  height: 100%;

  .goods_body {
    width: 100%;
    height: 360px;
    .skeleton {
      display: flex;
      justify-content: space-between;
      .xtx-skeleton {
        ~ .xtx-skeleton {
          margin-left: 10px;
        }
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      .special_item {
        width: 404px;
        height: 360px;
        background-color: #fff;

        > a {
          position: relative;
          img {
            display: block;
            width: 404px;
            height: 288px;
          }
          .meta {
            position: absolute;
            top: 0;
            left: 0;
            width: 404px;
            height: 288px;
            background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.8),
              transparent 50%
            );

            span {
              display: block;
            }

            .title {
              position: absolute;
              bottom: 0;
              left: 0;
              padding-left: 16px;
              width: 70%;
              height: 70px;
              .top_title {
                color: #fff;
                font-size: 22px;
              }
              .comment {
                color: #999;
                font-size: 19px;
              }
            }
            .price {
              position: absolute;
              bottom: 25px;
              right: 16px;
              line-height: 1;
              padding: 4px 8px 4px 7px;
              color: #cf4444;
              font-size: 17px;
              background-color: #fff;
              border-radius: 2px;
            }
          }
        }
        .special_foot {
          height: 72px;
          line-height: 72px;
          padding: 0 20px;
          font-size: 16px;
          span {
            float: left;
            margin-right: 25px;
            color: #333333;

            i {
              display: inline-block;
              width: 15px;
              height: 14px;
              margin-right: 5px;
              color: #999;
            }
          }
          .reply {
            float: right;
          }
        }
      }
    }
  }
}
</style>
