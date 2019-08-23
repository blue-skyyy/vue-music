/*
 * @Author: hpw
 * @Date: 2019-08-23 16:44:25
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-23 18:05:39
 */
export function createSong(songInfo: any) {
  return {
    // 001QvT9r1lhLUr
    imgUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album.mid}.jpg?max_age=2592000`,
    singerName: makeSongName(songInfo.singer),
    songName: songInfo.name,
    duration: songInfo.interval,
    albumName: songInfo.album.name
  };
}

export function makeSongName(song: any): string {
  return song.reduce((pre: any, curr: any) => {
    return pre + curr.name;
  }, "");
}
