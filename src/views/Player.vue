<template>
  <div
    class="player"
    v-show="playList && playList.length > 0"
  >
    <!-- 大播放器 -->
    <transition name="normal">

      <div
        class="normal-player"
        v-show="fullScreen"
      >
        <div class="background">
          <img
            width="100%"
            height="100%"
            :src="currentSong.imgUrl"
          />
        </div>
        <div class="top">
          <div
            class="back"
            @click="changeScreenStatus(false)"
          >
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.songName}}</h1>
          <h2 class="subtitle">{{currentSong.singerName}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div
                class="cd"
                :class="cdClass"
              >
                <img
                  class="image"
                  :src="currentSong.imgUrl"
                />
              </div>
            </div>
          </div>
          <Scroll
            class="middle-r"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum ===index}"
                  :key="index"
                  v-for="(line,index) in currentLyric.lines"
                >{{line.txt}}
                </p>
              </div>
            </div>
          </Scroll>
        </div>

        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(songUpDateTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                @percentChange="percentChange"
                :percent="percent"
              ></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>

          <div class="operators">
            <div class="icon i-left">
              <i
                :class="iconMode"
                @click="changePlayMode"
              ></i>
            </div>
            <div class="icon i-left">
              <i
                @click="prev"
                class="icon-prev"
              ></i>
            </div>
            <div class="icon i-center">
              <i
                :class="iconPlay"
                @click="togglePlaying"
              ></i>
            </div>
            <div class="icon i-right">
              <i
                @click="next"
                class="icon-next"
              ></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 小播放器 -->
    <transition name="mini">
      <div
        class="mini-player"
        @click="changeScreenStatus(true)"
        v-show="!fullScreen"
      >
        <div class="icon">
          <img
            width="40"
            height="40"
            :src="currentSong.imgUrl"
          />
        </div>
        <div class="text">
          <h2 class="name">
            {{currentSong.songName}}
          </h2>
          <p class="desc">{{currentSong.singerName}}</p>
        </div>
        <div class="control">
          <progress-circle
            :radius="radius"
            :percent="percent"
          >
            <i
              @click.stop="togglePlaying"
              class="icon-mini"
              :class="miniIconPlay"
            ></i>
          </progress-circle>

        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      :src="songUrl"
      @timeupdate="timeupdate"
      @ended="songEnd"
      ref="audio"
    ></audio>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { shuffle } from "@/common/ts/utils";
import { getSongUrl, getSonglyric } from "@/api/song";
import ProgressBar from "@/base/progress-bar/progress-bar.vue";
import ProgressCircle from "@/base/progress-circle/progress-circle.vue";
import Lyric from "lyric-parser";
import Scroll from "@/base/scroll/scroll.vue";

interface ISongState {
  imgUrl: string;
  singerName: string;
  songName: string;
  duration: number;
  albumName: string;
  songMid: string;
}

const namespace: string = "player";
@Component({
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll
  }
})
export default class Player extends Vue {
  public radius: number = 32;
  public songUrl: any = "";
  public songUpDateTime: any = null;
  public currentLyric: any = null;
  public currentLineNum: number = 0;
  @Getter("fullScreen", { namespace })
  fullScreen!: boolean;
  @Getter("playList", { namespace })
  playList!: Array<ISongState>;
  @Getter("currentSong", { namespace })
  currentSong!: ISongState;
  @Getter("songMidId", { namespace })
  songMidId!: string;
  @Getter("playing", { namespace })
  playing!: string;
  @Getter("currentIndex", { namespace })
  currentIndex!: number;
  @Getter("playMode", { namespace })
  playMode!: number;
  @Getter("sequenceList", { namespace })
  sequenceList!: Array<ISongState>;

  @Mutation("SET_FULL_SCREEN", { namespace })
  setFullScreen: Function | any;
  @Mutation("SET_SONG_MID_ID", { namespace })
  setSongMidId!: Function;
  @Mutation("SET_PLAYLIST", { namespace })
  setPlayList!: Function;

  @Mutation("SET_PLAYMODE", { namespace })
  setPlayMode!: Function;

  @Mutation("SET_PLAYING_STATE", { namespace })
  changePlayingState: Function | any;

  @Mutation("SET_CURRENTINDEX", { namespace })
  setCurrentIndex: Function | any;

  $refs!: {
    audio: HTMLAudioElement;
    lyricList: Scroll;
    lyricLine: any;
    // this.$refs.lyricList
  };

  created() {
    this.$nextTick(() => {
      this.$refs.audio.currentTime = 0;
    });
  }

  changePlayMode() {
    let mode = (this.playMode + 1) % 3;
    this.setPlayMode(mode);
    // 随机
    let list: ISongState[];
    if (mode === 2) {
      list = shuffle(this.playList) as Array<ISongState>;
    } else {
      list = this.sequenceList;
    }
    this.resetCurrentIndex(list);
    this.setPlayList(list);
  }

  resetCurrentIndex(list: Array<ISongState>) {
    let index = list.findIndex((d: ISongState) => {
      return d.songMid === this.currentSong.songMid;
    });
    this.setCurrentIndex(index);
  }

  songEnd() {
    // 0顺序 1循环 2随机
    if (this.playMode === 1) {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    } else {
      this.next();
    }
  }
  changeScreenStatus(flag: boolean) {
    this.setFullScreen(flag);
  }

  togglePlaying() {
    this.changePlayingState(!this.playing);
  }

  prev() {
    let index = (this.currentIndex as number) - 1;
    if (index === -1) {
      index = (this.playList as Array<object>).length - 1;
    }
    this.setCurrentIndex(index);
    this.setSongMidId(this.playList[index].songMid);
    if (!this.playing) {
      this.togglePlaying();
    }
  }

  next() {
    let index = (this.currentIndex as number) + 1;
    if (index === (this.playList as Array<object>).length) {
      index = 0;
    }
    this.setCurrentIndex(index);
    this.setSongMidId(this.playList[index].songMid);
    if (!this.playing) {
      this.togglePlaying();
    }
  }

  timeupdate(e: Event) {
    this.songUpDateTime = (e.target as any).currentTime;
  }

  format(interval = 0): string {
    // 分
    let minute: any = interval / 60;
    let minutes: string | number = parseInt(minute);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    // 秒
    let second = interval % 60;
    let seconds: string | number = Math.round(second);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  percentChange(percent: number) {
    this.$refs.audio.currentTime = this.currentSong.duration * percent;
    if (!this.playing) {
      this.togglePlaying();
    }
  }
  handlerLyric({ lineNum }: any) {
    this.currentLineNum = lineNum;
    if (lineNum > 5) {
      let lineEl = this.$refs.lyricLine[lineNum - 5];
      /* eslint-disable */
      this.$refs.lyricList.scrollToElement(lineEl, 1000);
    } else {
      /* eslint-disable */
      this.$refs.lyricList.scrollTo(0, 0, 1000);
    }

    //  this.currentLineNum = lineNum
    //   if (lineNum > 5) {
    //     let lineEl = this.$refs.lyricLine[lineNum - 5]
    //     this.$refs.lyricList.scrollToElement(lineEl, 1000)
    //   } else {
    //     this.$refs.lyricList.scrollTo(0, 0, 1000)
    //   }
    //   this.playingLyric = txt
  }

  get cdClass() {
    return this.playing ? "play" : "play pause";
  }
  get iconPlay() {
    return this.playing ? "icon-pause" : "icon-play";
  }
  get miniIconPlay() {
    return this.playing ? "icon-pause-mini" : "icon-play-mini";
  }

  get percent() {
    return this.songUpDateTime / this.currentSong.duration;
  }

  get iconMode() {
    /* eslint-disable */
    return this.playMode === 0
      ? "icon-sequence"
      : this.playMode === 1
        ? "icon-loop"
        : this.playMode === 2
          ? "icon-random"
          : null;
  }

  @Watch("songMidId")
  wacthMidId(newSongMidId: any) {
    const that = this;
    if (this.songMidId) {
      Promise.all([getSongUrl(this.songMidId), getSonglyric(this.songMidId)])
        .then(([url, lyric]) => {
          // 一定要先把url加载 再获取dom
          that.songUrl = url;
          this.currentLyric = new Lyric(lyric, this.handlerLyric);
          if (this.playing) {
            this.currentLyric.play();
            console.log("currentLyric", this.currentLyric);
          }
          that.$nextTick(() => {
            (that.$refs.audio as any).play();
          });
        })
        .catch(err => {
          throw new Error("不存在歌曲地址或歌词" + err);
        });
    }
  }

  @Watch("playing")
  watchPlaying(newState: boolean) {
    this.$nextTick(() => {
      let audio = this.$refs.audio as any;
      newState ? audio.play() : audio.pause();
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        display: none;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
            margin-right: 5px;
          }

          &.time-r {
            text-align: right;
            margin-left: 5px;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
