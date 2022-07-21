<template>
  <div id="file">
    <div id="title">
      <h2 id="system-name">File Management System</h2>
    </div>
    <div>
      <table id="file-table">
        <tr id="table-head">
          <th>Name</th>
          <th>Created Time</th>
          <th>Size</th>
        </tr>
        <tr>
          <td><a href="file?dir=parent" class="directory" @click.prevent="getFileList('parent')">返回上一级</a></td>
          <td>-</td>
          <td>
            <div id="upload" @mouseenter="isHover = true" @mouseleave="isHover = false">
              <form id="upload-form" action="upload" enctype="multipart/form-data" method="post" ref="form">
                <div class="upload-button">
                  <div :class="{hover: isHover, unhover: !isHover}">上传文件</div>
                  <input type="file" id="file-uploader" name="upload" @change="autoSubmit"/>
                </div>
              </form>
            </div>
          </td>
        </tr>
        <tr v-for="file in fileList" :key="file.path">
          <td>
            <div id="address">
              <svg v-show="file.directory" style="vertical-align: middle" t="1658313547285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5830" width="16" height="16"><path d="M918.673 883H104.327C82.578 883 65 867.368 65 848.027V276.973C65 257.632 82.578 242 104.327 242h814.346C940.422 242 958 257.632 958 276.973v571.054C958 867.28 940.323 883 918.673 883z" fill="#FFE9B4" p-id="5831"></path><path d="M512 411H65V210.37C65 188.597 82.598 171 104.371 171h305.92c17.4 0 32.71 11.334 37.681 28.036L512 411z" fill="#FFB02C" p-id="5832"></path><path d="M918.673 883H104.327C82.578 883 65 865.42 65 843.668V335.332C65 313.58 82.578 296 104.327 296h814.346C940.422 296 958 313.58 958 335.332v508.336C958 865.32 940.323 883 918.673 883z" fill="#FFCA28" p-id="5833"></path></svg>
              <a v-if="file.file" class="file" :href="getLink(file)" target="_blank" style="vertical-align: middle">{{file.path}}</a>
              <a v-else class="directory" :href="getLink(file)" @click.prevent="getFileList(file.path)" style="vertical-align: middle">{{file.path}}</a>
            </div>
          </td>
          <td>{{file.createdTime}}</td>
          <td>{{file.size}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {getFileList, test} from "../network/file"

export default {
  name: 'file',
  data() {
    return {
      fileList: [],
      isHover: false,
    }
  },
  created() {
    this.getFileList("root");
  },
  methods: {
    getFileList(dir) {
      getFileList(dir).then(res => {
        this.fileList = res.data;
        console.log(res.data);
      })
    },
    getLink(f) {
      return f.file?"download?filename=" + f.path:"file?dir=" + f.path;
    },
    autoSubmit() {
      this.$refs.form.submit();
    },
  }
}
</script>

<style lang='scss'>
@import '../assets/css/file.scss';
</style>