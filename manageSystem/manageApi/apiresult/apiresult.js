
module.exports = {
	apiresult:function(_state,_data,_msg){
		return {state:_state,data:_data,msg:_msg || {}};
	}
}