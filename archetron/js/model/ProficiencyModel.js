var ProficiencyModel=(function(){
	var instance;
	var _dataProvider;

	function init(){
		return{
			collection:function(){
				return _dataProvider;
			},
			getItemAt:function(index){
				if(index>=_dataProvider.length)
					throw new Error("Range Error! The index specified ("+index+") is out of bounds!");
				return _dataProvider[index];
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
			return _dataProvider;
		}
	};
})();