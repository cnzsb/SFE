/* 数据格式演示
var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
    }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var dateSelect = document.getElementsByName('gra-time');

    for (var i = 0; i < dateSelect.length; i++) {
        // 确定是否选项发生了变化
        if (this.checked && pageState.nowGraTime != this.value) {
            // 设置对应数据
            pageState.nowGraTime = this.value;

            // 调用图表渲染函数
            initAqiChartData();
        }
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    // 设置对应数据
    // 调用图表渲染函数
    initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var dateSelect = document.getElementsByName('gra-time');

    for (var i = 0; i < dateSelect.length; i++) {
        dateSelect[i].addEventListener('click', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var citySelect = document.getElementById('city-select'),
        cityList = "";

    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for (var city in aqiSourceData) {
        cityList += '<option>' + city + '</option>';
    }
    citySelect.innerHTML = cityList;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var citySelect = document.getElementById('city-select'),
        dataNow = aqiSourceData[citySelect.value];

    // 清空图表数据
    chartData = {};

    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    switch (pageState.nowGraTime) {
        case 'day':
            chartData = dataNow;
            break;
        case 'week':
            var day = 0,        // 记录一周的天数
                week = 0,       // 记录周数
                aqiWeek = 0,    // 记录一周的总aqi
                dateNow = null; // 记录当前日期
            for (var date in dataNow) {
                dateNow = new Date(date);
                day++;
                aqiWeek += dataNow[date];
                // 遇到周日则周数加1
                if (dateNow.getDay() === 0) {
                    week++;
                    chartData['第' + week + '周'] = Math.ceil(aqiWeek / day);
                    day = 0;
                    aqiWeek = 0;
                }
            }
            // 最后一周的数据
            if (day > 0) {
                week++;
                chartData['第' + week + '周'] = Math.ceil(aqiWeek / day);
            }
            break;
        case 'month':
            var day = 0,                // 记录一个月的天数
                month = 0,              // 记录月数
                aqiMonth = 0,           // 记录一个月的总aqi
                monthNow = 0,           // 记录当前月份为0，即从一月开始
                dateNow = null;         // 记录当前日期
            for (var date in dataNow) {
                dateNow = new Date(date);
                day++;
                aqiMonth += dataNow[date];
                // 判断月份改变
                if (dateNow.getMonth() != monthNow) {
                    month++;
                    // 因为每月1号才会跳到次循环，因此数据总数须减去今天，同样重置天数和aqi总数的时候要加上今天
                    chartData[dateNow.getFullYear() + '-' + dateNow.getMonth()] = Math.ceil((aqiMonth - dataNow[date]) / (day - 1));
                    day = 1;
                    aqiMonth = dataNow[date];
                    monthNow++;
                    console.log(chartData);
                }
            }
            // 最后一个月的数据
            if (day > 0) {
                console.log(month);
                month++;
                chartData[dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1)] = Math.ceil(aqiMonth / day);
            }
            break;
    }

    // 渲染图表
    renderChart();
}

/**
 * 渲染图表
 */
function renderChart() {
    var chartWrap = document.querySelector('.aqi-chart-wrap'),
        chart = '',
        width = 0,
        height = 0,
        color = '';

    for (var dataDate in chartData) {
        width = parseInt((chartWrap.offsetWidth - 300) * 0.5 / Object.keys(chartData).length);
        height = chartData[dataDate];
        color = '#' + Math.random().toString(16).substr(2, 6);
        chart += '<div class="aqi-chart" style="width:' + width + 'px; height:' + height + 'px; background-color:' + color + '"><div class="aqi-chart-info"><p class="city">' + dataDate + '</p><p class="aqi">aqi:' + chartData[dataDate] + '</p></div></div>';
    }

    chartWrap.innerHTML = chart;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

window.onload = init;