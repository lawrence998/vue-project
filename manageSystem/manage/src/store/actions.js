
import http from '../httpClient/httpClient'


export default {
	fication(context,parmas){
		http.post(parmas.path,parmas.name).then((res) => {
		})
	},
	get_username(context,parmas){
		http.post(parmas.path,parmas.name).then((res) => {
			context.commit('login_username',res);
			
		})
	},
	loginIn(context,parmas){
		http.post(parmas.path,parmas.login).then((res) => {
			if(res.data.state == 'err'){
				var username = '用户名或密码有错误';
				alert('密码有错误');
			}else{
				var username = res.data.msg.username;
				if(res.data.msg.ownerID){
					var ownerID = res.data.msg.ownerID;
					window.localStorage.setItem('ownerID',ownerID);
				}
				var password = res.data.msg.password;
				window.localStorage.setItem('username',username);
				window.localStorage.setItem('password',password);
				context.commit('loginIn',res);
				if(res.data.state == 'ok'){
					window.router.push('homePage');
				}
			}

			
		})
	},
	getCustomerMsg(context,parmas){
		http.get(parmas.path,{msg:parmas.message}).then((res) => {
			context.commit('getCustomerMsg',res);
			
		})
	},
	getHouseMsg(context,parmas){
		//管理员获取房子资源
		//getCustomerMsg//houseSourceList
		http.get(parmas.path,{page:parmas.page,qty:parmas.qty}).then((res) => {
			context.commit('getHouseMsg',res);
			// filter(context,res);
		})
	},
	saleSource(context,parmas){
		http.get(parmas.path,{msg:parmas.saleMsg}).then((res) => {
			context.commit('saleMsg',res);
			
		})
	},
	comment(context,parmas){
		http.get(parmas.path,{msg:parmas.msg,qty:parmas.qty}).then((res) => {
			context.commit('getcomment',res);
			
		})
	},
	commentPageList(context,parmas){
		http.get(parmas.path,{msg:parmas.msg,qty:parmas.qty}).then((res) => {
			context.commit('commentPageList',res);
			
		})
	},
	getPhone(context,parmas){
		http.post(parmas.path,{phone:parmas.phone}).then((res) => {
			context.commit('getPhone',res);
			
		})
	},
}




function filter(context,res){

 	var datas = res.data.data;
 	// console.log('2222',datas);


	var adress = [];
	var houseType = [];
	var room_qty = [];
	var bed_qty = [];
	var  room_size = [];
	var  price = [];
	// city = Object.keys()

	var adressObj = [];
	var houseTypeObj = [];
	var room_qtyObj = [];
	var bed_qtyObj = [];
	var room_sizeObj = [];
	var  priceObj = [];

	datas.forEach(item=>{
		if(adress.indexOf(item.adress) == -1){
			adress.push(item.adress);
			adressObj.push({value:item.adress,label:item.adress});
		}
		if(houseType.indexOf(item.houseType) == -1){
			houseType.push(item.houseType);
			houseTypeObj.push({value:item.houseType,label:item.houseType});
		}

		if(room_qty.indexOf(item.room_qty) == -1){
			room_qty.push(item.room_qty);
			room_qtyObj.push({value:item.room_qty,label:item.room_qty});
		}

		if(bed_qty.indexOf(item.bed_qty) == -1){
			bed_qty.push(item.bed_qty);
			bed_qtyObj.push({value:item.bed_qty,label:item.bed_qty});
		}
		
		if(room_size.indexOf(item.room_size) == -1){
			room_size.push(item.room_size);
			room_sizeObj.push({value:item.room_size,label:item.room_size});
		}

		if(price.indexOf(item.price) == -1){
			price.push(item.price);
			priceObj.push({value:item.price,label:item.price});
		}

	})


	//城市选择
	context.commit('adressObj',adressObj);
	context.commit('houseTypeObj',houseTypeObj );
	context.commit('room_qtyObj',room_qtyObj);
	context.commit('bed_qtyObj',bed_qtyObj);
	context.commit('room_sizeObj',room_sizeObj);
	context.commit('priceObj',priceObj);
}

window.lzfilter = filter;