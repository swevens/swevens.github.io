var ApplicationModel=(function(){
	var instance;
	var _dataProvider;

	function init(){
		
		return{
			config:function(){
				return _dataProvider.config;
			},
			employeeData:function(){
				return _dataProvider.data;
			},
			proficiencyMeter:function(){
				return _dataProvider.config.proficiencyMeter;
			},
			skillChart:function(){
				return _dataProvider.config.skillChart;
			},
			locationData:function(){
				return _dataProvider.config.locationCode;
			}
		};
	}

	return {
		getInstance:function(){
			if(!instance)
				instance=init();
			return instance;
		},
		dataProvider:function(data){
			_dataProvider=data;
			// for(var group in _dataProvider.data){
			// 	_dataProvider.data[group].center = null
			// 	delete _dataProvider.data[group].center;

			// 	for(var emp in _dataProvider.data[group].team)
			// 	{
			// 		_dataProvider.data[group].team[emp].coordinates = null;
			// 		delete _dataProvider.data[group].team[emp].coordinates;

			// 		_dataProvider.data[group].team[emp].links = null;
			// 		delete _dataProvider.data[group].team[emp].links;
			// 		_dataProvider.data[group].team[emp].company = _dataProvider.data[group].team[emp].company.replace(/^[\s\S]{0,5}/, '**#**#*').split(' ')[0];
			// 		_dataProvider.data[group].team[emp].name = _dataProvider.data[group].team[emp].name.replaceAt(2,'*#*/.$');	
			// 		_dataProvider.data[group].team[emp].mailID = _dataProvider.data[group].team[emp].mailID.replace(/^[\s\S]{0,5}/, '*./#*');
			// 		_dataProvider.data[group].team[emp].mailID = _dataProvider.data[group].team[emp].mailID.replace(/@.*/, "@****.com");	
			// 		_dataProvider.data[group].team[emp].location = ["North America", "Europe", "APAC"].random();	


			// 	}
			// }

			// console.log(JSON.stringify(_dataProvider));
			return _dataProvider;
		}
	};
})();