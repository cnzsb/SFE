window.onload = function () {
	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {},
		cityIp = document.getElementById('aqi-city-input'),
		aqiIp = document.getElementById('aqi-value-input'),
		addBtn = document.getElementById('add-btn'),
		table = document.getElementById('aqi-table'),
		regCity = /^[\u4e00-\u9fa5a-zA-Z]+$/,
		regAqi = /^\d+$/;

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		city = cityIp.value.trim();
		aqi = aqiIp.value.trim();

		if (!regCity.test(city)) {
			alert('*城市名称请输入汉字或英文!');
			return;
		}
		if (!regAqi.test(aqi)) {
			alert('*空气质量指数请输入数字');
			return;
		}

		aqiData[city] = aqi;
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var aqiStr = '';
		for (var data in aqiData) {
			aqiStr += '<tr><td>' + data + '</td><td>' + aqiData[data] + '</td><td><button type="button" onclick="delBtnHandle(' + data + ')">删除</button></td></tr>';
		}
		table.innerHTML += aqiStr;
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		addAqiData();
		renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(city) {
		// do sth.
		delete aqiData[city];
		renderAqiList();
	}

	function init() {

		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

		addBtn.addEventListener('click', addBtnHandle);

		// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

	}

	init();
};