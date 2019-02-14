var EmployeeCollection=(function(){
	var instance;
	var _collection=[];

	function init(){
		
		return{
			add:function(data){
				_collection.push(data);
			},
			getItemAt:function(index){
				if(index>=_collection.length)
					throw new Error("Range Error! The index specified ("+index+") is out of bounds!");
				return _collection[index];
			},
			getEmployeeByName:function(name){
				var emp;
				for(var item in _collection){
					var obj=_collection[item];
					//console.log(obj);
					if(name==obj.empName){
						emp=obj;
						break;
					}
				}
				return emp;
			},
			getEmployeeByID:function(id){
				var emp;
				for(var item in _collection){
					var obj=_collection[item];
					//console.log(obj);
					if(id==obj.empID){
						emp=obj;
						break;
					}
				}
				return emp;
			},
			length:function(){
				return _collection.length;
			}
		};
	}

	return {
		getInstance:function(){
			if(!instance)
				instance=init();
			return instance;
		}
	};
})();