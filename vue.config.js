/*
 * @Author: haopeiwei
 * @Date: 2019-08-18 14:39:26
 * @LastEditors: hpw
 * @LastEditTime: 2019-09-02 11:14:45
 */
const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();
const apiRoutes = express.Router();

apiRoutes.get("/api/songLyric");
app.use("/api/songLyric", apiRoutes);

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    before (apiRoutes) {
      apiRoutes.get("/api/songLyric", (req, res) => {
        console.log("req.query", req.query);
        let url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
        axios.get(url, {
          headers: {
            // referer: "https://y.qq.com/portal/player.html",
            "Accept": "application/json, text/javascript",
            "Referer": "https://y.qq.com/portal/player.html",
            "Sec-Fetch-Mode": "cors"
          },
          params: req.query
        }).then((resopnse) => {
          let ret = resopnse.data;
          res.json(ret);
        }).catch(err => {
          console.log("歌词获取", err);
        });
      });
    },
    port: 8091,
    open: true,
    proxy: {

      "/api/songList": {
        target: "https://u.y.qq.com/cgi-bin/musicu.fcg",
        changeOrigin: true,
        https: true,
        pathRewrite: { "^/api/songList": "" }
      },
      "/api/singerList": {
        target: "https://u.y.qq.com/cgi-bin/musicu.fcg",
        changeOrigin: true,
        https: true,
        pathRewrite: { "^/api/singerList": "" }
      },
      "/api/singerDetail": {
        target: "https://u.y.qq.com/cgi-bin/musicu.fcg",
        changeOrigin: true,
        https: true,
        pathRewrite: { "^/api/singerDetail": "" }
      },
      "/api/songUrl": {
        target: "https://u.y.qq.com/cgi-bin/musicu.fcg",
        changeOrigin: true,
        https: true,
        pathRewrite: { "^/api/songUrl": "" }
      }
      // "/api/songLyric": {
      //   target: "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
      //   changeOrigin: true,
      //   https: true,
      //   pathRewrite: { "^/api/songLyric": "" }
      // }
      // "/api/"
    }
  },
  lintOnSave: true,
  configureWebpack: config => {
    config.resolve.extensions = [".js", ".vue", ".json", ".styl", ".ts", ".jsx", ".tsx"];
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"));
  }
};
