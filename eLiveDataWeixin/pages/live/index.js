// pages/live/index.js
const app = getApp()

import * as echarts from '../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    user: {},
    uv: {},
    historyLive: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.postAjax('/historylive').then(res => {
      console.log(888, res)
      this.setData({
        user: res.user,
        uv: res.uv,
        historyLive: res.historyLive
      }, () => {
        this.initChart()
      })
    })
  },
  goLiveAnalysis(e) {
    wx.navigateTo({
      url: '../liveAnalysis/index?id=' + e.currentTarget.dataset.id
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  initCharts() {
    console.log("initChart")
  },

  // 点击按钮后初始化图表
  initChart() {

    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-line');
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  setOption(chart) {
    let uv = this.data.uv
    let option = {
      title: {
        text: uv.titleText,
        left: '8%'
      },
      grid: {
        // containLabel: false
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: uv.xAxisData,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: 'UV',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: uv.seriesData,
        itemStyle: {
          normal: {
            color: '#f39423'
          }
        },
        areaStyle: {
          color: '#f9c78b',
          opacity: 0.5
        }

      }]
    };
    chart.setOption(option);
  }
})