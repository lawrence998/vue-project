


export default {
	username(state){
		return state.usename;
	},
	houseList:state => {
		console.log('get',state);
		return state.houseList;
	},
	salehouse:state =>{
		return state.salemessage;
	},
	getComment:state =>{
		return state.comment;
	}
}