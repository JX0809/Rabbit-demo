<template>
  <div class="goods_feedback_container">
    <ul class="goods_feedback">
      <li>
        <p>销量人气</p>
        <p>200+</p>
        <p><i class="iconfont icon-qizhi"></i>销量人气</p>
      </li>
      <li>
        <p>商品评价</p>
        <p>400+</p>
        <p><i class="iconfont icon-comment"></i>查看评价</p>
      </li>
      <li>
        <p>收藏人气</p>
        <p>600+</p>
        <p><i class="iconfont icon-favorite"></i>收藏商品</p>
      </li>
      <li>
        <p>品牌信息</p>
        <p>苏宁电器</p>
        <p><i class="iconfont icon-windmill"></i>品牌主页</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GoodsInfoFeedback',
  setup() {}
}
</script>

<style lang="less" scoped>
.goods_feedback {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: '';
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
