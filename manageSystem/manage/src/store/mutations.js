

export default{
	login_username(state,parmas){
		state.username = parmas.data.state;
	},
	loginIn(state,parmas){
	},
	getCustomerMsg(state,parmas){
		state.customerList = parmas.data.results;
	},
	getHouseMsg(state,parmas){
		//管理员获取房子资源
		//getCustomerMsg
		localStorage.setItem('total',JSON.stringify(parmas.data.total));
		var total = parmas.data.total;

		state.adressObj = total.adressObj;
		state.room_qtyObj = total.room_qtyObj;
		state.bed_qtyObj = total.bed_qtyObj;
		state.room_sizeObj = total.room_sizeObj;
		state.priceObj = total.priceObj;
		state.houseTypeObj = total.houseTypeObj;

		state.houseList = parmas.data.data;
		state.pageNumber = parmas.data.pageNum;
	},



	adressObj(state,parmas){
		state.adressObj = parmas;
	},
	houseTypeObj(state,parmas){
		state.houseTypeObj = parmas;
	},
	room_qtyObj(state,parmas){
		state.room_qtyObj = parmas;
	},
	bed_qtyObj(state,parmas){
		state.bed_qtyObj = parmas;
	},
	room_sizeObj(state,parmas){
		state.room_sizeObj = parmas;
	},
	priceObj(state,parmas){
			state.priceObj = parmas;
	},



	saleMsg(state,parmas){
		state.salemessage = parmas.data.data? parmas.data.data.results : [{mag:'没有信息'}];
	},
	getcomment(state,parmas){
		state.comment = parmas.data.data;
		state.pageNumber = parmas.data.pageNumber;
	},
	commentPageList(state,parmas){
		state.comment = parmas.data.data;
	},
	getPhone(state,parmas){
		state.phone = parmas.data.state;
	}
}