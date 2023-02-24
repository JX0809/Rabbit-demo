<template>
  <div class="project_footer_container">
    <div class="contact">
      <div class="service">
        <dl>
          <dt>客户服务</dt>
          <dd>
            <i class="iconfont icon-mianxing-xinxi"></i>
            在线客服
          </dd>
          <dd>
            <i class="iconfont icon-changjianwenti"></i>
            问题反馈
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>
            <i class="iconfont icon-24gf-bubblesDots4"></i>
            公众号
          </dd>
          <dd>
            <i class="iconfont icon-xinlangweibo"></i>
            微博
          </dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd>
            <img src="../assets/images/qrcode.jpg" alt="" />
          </dd>
          <dd class="download">
            <p>扫描二维码 &nbsp; 立马下载APP</p>
            <span>下载页面</span>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="tel">
            <p>400-0000-000</p>
            <span>周一至周日 8:00-18:00</span>
          </dd>
        </dl>
      </div>
      <div class="extra">
        <div class="advan">
          <div class="slogan">
            <div>
              <a href="">
                <i class="iconfont icon-icon-pro-gwbgh3"></i>
                <span>价格亲民</span>
              </a>
            </div>
            <div>
              <a href="">
                <i class="iconfont icon-roundcheck"></i>
                <span>物流快捷</span>
              </a>
            </div>
            <div>
              <a href="">
                <i class="iconfont icon-wwuliu-"></i>
                <span>品质新鲜</span>
              </a>
            </div>
          </div>
          <div class="copyright">
            <ul>
              <li><a href="">关于我们</a></li>
              <li><a href="">帮助中心</a></li>
              <li><a href="">售后服务</a></li>
              <li><a href=" ">配送与验收</a></li>
              <li><a href="">商务合作</a></li>
              <li><a href="">搜索推荐</a></li>
              <li><a href="">友情链接</a></li>
            </ul>
            <p>CopyRight ©小兔仙儿</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectFooter'
}
</script>

<style lang="less" scoped>
.project_footer_container {
  width: 100%;
  .contact {
    width: 100%;
    height: 290px;
    background-color: #fff;

    .service {
      width: 1240px;
      margin: 0 auto;
      padding: 60px 0 40px 25px;
      display: flex;
      justify-content: center;
      align-items: center;

      dl {
        height: 190px;
        padding: 0 72px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        color: #999999;
        ~ dl {
          border-left: 1px solid #ededed;
        }
      }
      dl:nth-child(1) {
        padding-left: 0;
      }
      dl:nth-child(4) {
        padding: 0 0 0 70px;
        width: 300px;
      }
      dt {
        width: 100%;
        height: 18px;
        font-size: 18px;
      }

      dd {
        flex: 25%;
        width: 92px;
        height: 92px;
        margin-right: 12px;
        border: 1px solid #ededed;
        padding: 10px 0;

        i {
          display: block;
          font-size: 36px;
        }
      }
      dd:last-child {
        margin-right: 0;
      }
      .download {
        font-size: 14px;
        border: none;
        text-align: center;

        span {
          display: block;
          margin-top: 5px;
          text-align: center;
          color: #ffffff;
          padding: 5px;
          background-color: @xtxColor;
          cursor: pointer;
        }
      }

      .tel {
        border: 0;
        p {
          font-size: 20px;
          font-weight: 700;
          color: #666666;
        }
      }
    }
  }
  .extra {
    width: 100%;
    height: 348px;
    background-color: #333333;
    color: #ffffff;
    .advan {
      width: 1240px;
      margin: 0 auto;
      font-size: 28px;

      .slogan {
        display: flex;
        justify-content: center;
        padding: 60px 100px;
        border-bottom: 1px solid #434343;

        div {
          flex: 1;
          text-align: center;

          a {
            display: block;
            color: #ffffff;

            i {
              font-size: 50px;
              vertical-align: middle;
            }
            span {
              padding-left: 10px;
            }
          }
        }
      }
    }

    .copyright {
      padding-top: 40px;
      ul {
        display: flex;
        justify-content: center;
        li {
          a {
            font-size: 15px;
            color: #999999;
            padding: 0 10px;
          }
          ~ li {
            a {
              border-left: 1px solid #999999;
            }
          }
        }
      }
      p {
        margin-top: 10px;
        font-size: 15px;
        color: #999999;
        text-align: center;
      }
    }
  }
}
</style>
