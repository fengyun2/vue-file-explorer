<template>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>当前路径: {{path}}</th>
                        <th class="text-right">
                          <button class="btn btn-danger btn-xs" @click="goBack()" v-if="path !== '/'">返&emsp;回</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in sortedFiles">
                        <td>
                            <div class="file" v-if="file.type === 'file'">
                                <span class="octicon octicon-file-text"></span>
                                <a href="javascript:;">{{file.name}}</a>
                            </div>
                            <div class="directory" v-if="file.type === 'dir'">
                                <span class="octicon octicon-file-directory"></span>
                                <a href="javascript:;" @click="changePath(file.path)">{{file.name}}</a>
                            </div>
                        </td>
                        <td class="text-right">
                            <a href="{{file.download_url}}" download="file" v-if="file.type === 'file'">
                                <span class="octicon octicon-cloud-download"></span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        name: "FileExplorer",
        data() {
            return {
                path: '/',
                files: []
            }
        },
        props: {
            username: {
                type: String,
                required: true
            },
            repo: {
                type: String,
                required: true
            }
        },
        computed: {
            fullRepoUrl() {
                return this.username + '/' + this.repo
            },
            sortedFiles() {
                return this.files.slice(0).sort((a, b) => {
                    if(a.type !== b.type) {
                        if(a.type === 'dir') {
                            return -1
                        } else {
                            return 1
                        }
                    } else {
                        if(a.name < b.name) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                })
            }
        },
        methods: {
            getFiles() {
                this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
                    (data) => {
                        this.files = data
                    })
            },
            changePath(path) {
                this.path = '/' + path
                this.getFiles()
            },
            goBack() {
                console.log('old-path: ', this.path)
                console.log('middle-path: ', this.path.split('/').slice(0, -1))
                this.path = this.path.split('/').slice(0, -1).join('/')
                console.log('new-path: ', this.path)
                if(this.path === '') {
                    this.path = '/'
                }
                this.getFiles()
            }
        },
        watch: {
            repo(newVal, oldVal) {
                this.path = '/'
                this.getFiles()
            }
        },
        created() {
            if(this.username && this.repo) {
                this.getFiles()
            }
        }
    }
</script>
<style></style>
