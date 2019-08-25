/*
 * @Author: hpw
 * @Date: 2019-08-23 10:46:01
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-23 14:34:23
 */
import * as types from "./mutation-types";
// import { MutationTree } from "vuex";

// import { Commit, Dispatch, GetterTree, ActionTree, MutationTree } from 'vuex';

interface IState {
  singer: {
    country: string;
    /* eslint-disable */
    singer_id: number;
    singer_mid: string;
    singer_name: string;
    singer_pic: string | null;
  } | null,

}

const namespaced: boolean = true;

interface IPayload {
  payload: any,
}

const state: IState = {
  singer: null,
}


const mutations = {
  [types.SET_SINGER](state: any, payload: IPayload) {
    state.singer = payload;
  },
  [types.TESTAAA](state: any, payload: IPayload) {
  }
}

const getters = {
  getSinger: (state: IState) => state.singer,
};

// const 

export default {
  namespaced,
  state,
  mutations,
  getters,
}