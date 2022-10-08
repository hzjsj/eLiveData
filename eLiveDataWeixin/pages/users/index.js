// pages/users/index.js

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
    ecBar: {
      lazyLoad: true
    },
    ecPie: {
      lazyLoad: true
    },
    user: {},
    uv: {},
    orderAmount: {},
    liveAnalysis: {},
    orderQuantity: {},
    topSale: {},
    overview: {},
    consume: {},
    preference: {},
    pieAnalysis: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.postAjax('/userAnalysis').then(res => {
      console.log(res)
      this.setData({
        overview: res.overview,
        consume: res.consume,
        preference: res.preference,
        pieAnalysis: res.pieAnalysis
      }, () => {
        this.initChart()
        this.initCharts()
        this.initPieChart()
        this.initThreePieChart()
      })
    })

  },
  goAnalysis() {
    console.log(123)
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
  // 点击按钮后初始化图表
  // 柱状图
  initCharts() {

    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-multi-bar');
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setOptions(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  setOptions(chart) {
    let uv = this.data.consume

    let option = {
      title: {
        text: uv.titleText,
        left: '8%'
      },
      grid: {
        // containLabel: false
        left: 10,
        right: 10,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      yAxis: {
        type: 'category',
        data: uv.yAxisData,
      },
      xAxis: {},
      series: uv.seriesData
    };
    chart.setOption(option);
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

  // line
  setOption(chart) {
    let uv = this.data.overview
    let option = {
      title: {
        text: uv.titleText,
        left: '8%'
      },
      grid: {
        // containLabel: false
        left: 20,
        right: 20,
        bottom: 35,
        top: 40,
        containLabel: true
      },
      legend: uv.legendData,
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
      yAxis: {},
      series: uv.seriesData
    };
    chart.setOption(option);
  },

  // 点击按钮后初始化饼图图表
  initPieChart() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setPieOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  // pie
  setPieOption(chart) {
    let uv = this.data.preference
    let option = {
      title: {
        text: uv.titleText,
        left: '8%'
      },
      tooltip: {
        show: true,
        trigger: 'item'
      },
      legend: {
        top: 'center',
        orient: 'vertical',
        right: 'right'
      },
      color: [
        "#f39423",
        "#f9c78b",
        "#f5a544",
        "#fbdab2",
        "#f7b463",
        "#f9c78b",
      ],
      series: [{
        label: {
          show: false,
          position: 'center'
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '70%'],
        labelLine: {
          show: false
        },
        right: '20%',
        data: uv.seriesData
      }]
    };
    chart.setOption(option);
  },

  // three pie
  initThreePieChart() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-three-pie');
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setThreePieOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  // pie
  setThreePieOption(chart) {
    let option = this.data.pieAnalysis
    chart.setOption(option);
  }
})