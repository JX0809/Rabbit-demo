<script>
export default {
  name: 'OrderStep',
  setup() {},
  props: {
    active: {
      type: Number,
      default: 1
    }
  },

  render(props) {
    const items = this.$slots.default()

    // 判断插槽的数量： v-for动态生成的插槽只算一个，真正的个数存在 children 属性
    const dynamicsItem = []
    items.forEach((item) => {
      if (item.type.name === 'OrderStep') {
        // 不是动态生成的有 name
        dynamicsItem.push(item)
      } else {
        item.children.forEach((step) => {
          dynamicsItem.push(step)
        })
      }
    })

    // step-item 所有html结构 动态生成
    // 根标签
    // 步骤数
    // 步骤名
    // 时间
    // map遍历循环插槽数组
    // props.active 时 order_step 组件的 props
    const stepItem = dynamicsItem.map((item, i) => {
      return (
        // <div class={['order_step_item', i < props.active && 'active']}>
        // <div class={['order_step_item', { active: i < props.active }]}>
        <div class={`order_step_item ${i < props.active ? 'active' : ''}`}>
          <div class="step">
            <span>{i + 1}</span>
          </div>
          <div class="step_name">{item.props.name}</div>
          <div class="step_time">{item.props.time}</div>
        </div>
      )

      // 或者条件渲染 if...else  / 三元表达式
      // if (i < props.active) {1
      //   return (
      //     <div class={['order_step_item', 'active']}>
      //       <div class="step">
      //         <span>{i + 1}</span>
      //       </div>
      //       <div class="step_name">{item.props.name}</div>
      //       <div class="step_time">{item.props.time}</div>
      //     </div>
      //   )
      // } else {
      //   return (
      //     <div class={['order_step_item']}>
      //       <div class="step">
      //         <span>{i + 1}</span>
      //       </div>
      //       <div class="step_name">{item.props.name}</div>
      //       <div class="step_time">{item.props.time}</div>
      //     </div>
      //   )
      // }
    })
    return <div class="order_step"> {stepItem}</div>
  }
}
</script>

<style lang="less" scoped>
.order_step {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.order_step_item {
  width: 100%;
  text-align: center;

  &:first-child {
    .step {
      &::before {
        display: none;
      }
    }
  }
  &:last-child {
    .step {
      &::after {
        display: none;
      }
    }
  }

  &.active {
    .step {
      > span {
        border-color: @xtxColor;
        background: @xtxColor;
        color: #fff;
      }
      &::before,
      &::after {
        background: @xtxColor;
      }
    }
    .title {
      color: @xtxColor;
    }
  }
  .step {
    position: relative;
    > span {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 48px;
      font-size: 28px;
      background-color: #fff;
      border: 2px solid #e4e4e4;
      color: #ccc;
      line-height: 44px;
      z-index: 1;
      border-radius: 50%;
    }
    &::before {
      content: '';
      position: absolute;
      top: 23px;
      left: 0;
      height: 2px;
      width: 50%;
      background-color: #e4e4e4;
    }
    &::after {
      content: '';
      position: absolute;
      top: 23px;
      right: 0;
      height: 2px;
      width: 50%;
      background-color: #e4e4e4;
    }
  }
  .step_name {
    padding-top: 12px;
    color: #999;
  }
  .step_time {
    padding-top: 6px;
    font-size: 12px;
    color: #999;
  }
}
</style>
