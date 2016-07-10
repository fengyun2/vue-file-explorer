<template>
  <div class="container" id="container">
    <div class="row">
      <legend>
        <h2><span class="mega-octicon octicon-mark-github"></span> GitHub文件浏览器</h2>
        <form id="changeRepoForm" @submit.prevent="changeRepo()" class="form-inline">
          <div class="form-group">
            <label for="fullRepoName">Full Repo Name: </label>
            <input type="text" id="fullRepoName" class="form-control" placeholder="fengyun2/ly_js" v-model="fullRepoName" style="width: 300px;">
          </div>
          <button type="submit" class="btn btn-primary">获&emsp;取</button>
        </form>
        <hr>
        <file-explorer :username="username" :repo="repo"></file-explorer>
      </legend>
    </div>
  </div>
</template>
<script>
  import FileExplorer from './FileExplorer'
  export default {
    name: 'Github',
    data() {
      return {
        fullRepoName: '',
        username: '',
        repo: ''
      }
    },
    methods: {
      changeRepo() {
        this.username = this.fullRepoName.split('\/').shift()
        this.repo = this.fullRepoName.split('\/').pop()
        console.group('data begin...')
        console.log('fullRepoName: ', this.fullRepoName)
        console.log('username: ', this.username)
        console.log('repo: ', this.repo)
        console.groupEnd('data ending...')
      }
    },
    components: {
      FileExplorer
    }
  }
</script>
