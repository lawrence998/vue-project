import Vue from 'vue'
import Vuex from 'vuex'
import httpClient from '../httpClient/httpClient'

Vue.use(Vuex);

var store = new Vuex.Store({
	state:{
		username:0,
		password:0,
		getmsg_get:0,
		getmsg_post:0


	},
	getters:{
		getmsg_get(state){
			return state.getmsg_get;
		},
		getmsg_post(state){
			return state.getmsg_post;
		}
	},
	mutations:{
		getmsg_get(state,datas){
			console.log(datas);
			state.getmsg_get = datas;			
		},
		getmsg_post(state,datas){
			console.log(datas);
			state.getmsg_get = datas;
		}
	},
	actions:{
		getmsg_get(context,prams){
			httpClient.get(prams.path,prams.msg).then((res)=>{
				context.commit('getmsg_get',res);
			});
		},
		getmsg_post(context,prams){
			httpClient.post(prams.path,prams.msg).then((res)=>{
				context.commit('getmsg_post',res);
			});
		}
	}
})

export default store;