

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import getters from './getters'
import actions from './actions'
import mutations from './mutations'



const state = {
	username:0,
	password:0,
	customerList:'',
	houseList:'',

	adressObj:'',
	houseTypeObj:'',
	room_qtyObj:'',
	room_sizeObj:'',
	priceObj:'',
	bed_qtyObj:'',

	salemessage:'',
	comment:'' || [{msg:'网速不给力,请稍等'}],
	pageNumber:'',
	phone:''
}


export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})