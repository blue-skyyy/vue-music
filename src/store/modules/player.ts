/*
 * @Author: hpw
 * @Date: 2019-08-23 10:46:01
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-30 20:01:40
 */
import * as types from "./mutation-types";

import { ActionTree } from "vuex";
// import { ActionTree } from "vuex";

// import { Commit, Dispatch, GetterTree, ActionTree, MutationTree } from 'vuex';

interface IState {
  playing: boolean,  // 是否播放
  fullScreen: boolean, // 是否全屏
  playList: Array<object>, // 播放列表
  sequenceList: Array<object>, // 顺序列表
  playMode: number, // 0顺序 1循环 2随机
  currentIndex: number, // 当前播放顺序
  songMidId: number,
}

const namespaced: boolean = true;

interface IPayload {
  payload: any,
}

const state: IState = {
  playing: false,  // 是否播放
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  playMode: 0, // 0顺序 1循环 2随机
  currentIndex: -1, // 当前播放顺序
  songMidId: -1 // 歌曲id 用于获取歌曲播放地址
};

const mutations = {

  [types.SET_PLAYING_STATE](state: IState, flag: boolean) {
    state.playing = flag;
  },
  [types.SET_CURRENTINDEX](state: IState, index: number) {
    state.currentIndex = index;
  },
  [types.SET_FULL_SCREEN](state: IState, flag: boolean) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYMODE](state: IState, mode: number) {
    state.playMode = mode;
  },
  [types.SET_SEQUENCELIST](state: IState, payload: Array<object>) {
    state.sequenceList = payload;
  },
  [types.SET_PLAYLIST](state: IState, list: Array<object>) {
    state.playList = list;
  },
  [types.SET_SONG_MID_ID](state: IState, id: number) {
    state.songMidId = id;
  }
};

const getters = {
  fullScreen: (state: IState) => state.fullScreen,
  playing: (state: IState) => state.playing,
  playList: (state: IState) => state.playList,
  sequenceList: (state: IState) => state.sequenceList,
  playMode: (state: IState) => state.playMode,
  currentIndex: (state: IState) => state.currentIndex,
  songMidId: (state: IState) => state.songMidId,
  currentSong: (state: IState) => {
    console.log("state.playList[state.currentIndex] || {}", state.playList[state.currentIndex] || {});
    return state.playList[state.currentIndex] || {};
  }
};

// 第一个参数是rootState
const actions: ActionTree<IState, any> = {
  selectPlay({ commit }, { list, midId, index }) {
    commit(types.SET_SEQUENCELIST, list);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_CURRENTINDEX, index);
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_PLAYLIST, list);
    commit(types.SET_SONG_MID_ID, midId);
  }
};

export default {
  namespaced,
  state,
  mutations,
  getters,
  actions

};
