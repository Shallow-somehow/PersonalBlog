//每日一句数据绑定
var everyDay = new Vue({
    el: "#every_day",
    created: function () {
        //发送请求获取每日一句数据
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content
        }).catch(function (resp) {
            console.log('请求失败！');
        })
    },
    data: {
        content: ''
    },
    computed: {
        getContent: function () {
            return this.content
        }
    }
})


//文章部分数据绑定
var articleList = new Vue({
    el: '#article_list',
    created: function () {
        this.getPage(this.page, this.pageSize, this.count)
    },
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [
            {
                title: '这个是标题',
                content: '声明：转载此文是出于传递更多信息之目的。若有来源标注错误或侵犯了您的合法权益，请作者持权属证明与本网联系，我们将及时更正、删除，谢谢。',
                date: '2020-3-11',
                views: '101',
                tags: 'tag1 tag2',
                id: '1',
                link: '#'
            }
        ]
    },
    methods: {
        jumpTo(page) {
            this.getPage(page, this.pageSize);
            window.scrollTo(0, 0);
        }
    },
    computed: {
        //拿到页面
        getPage: function () {
            return function (page, pageSize) {
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                var tag = '';
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'tag') {
                        try {
                            tag = searchUrlParams[i].split('=')[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                };
                if (tag == '') {//展示全部文章
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (let i = 0; i < result.length; i++) {
                            var temp = {};

                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp)
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('GG');
                    });

                    axios({
                        method: 'get',
                        url: '/queryBlogCount'
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                } else {    //通过tag筛选文章
                    axios({
                        method: 'get',
                        url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (let i = 0; i < result.length; i++) {
                            var temp = {};

                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp)
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('GG');
                    });

                    axios({
                        method: 'get',
                        url: '/queryByTagCount?tag=' + tag
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }




            }
        },
        //拿到分页数量
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];

            result.push({
                //回到第一页
                text: '<<',
                page: 1
            });

            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                })
            };

            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                })
            };

            result.push({
                text: nowPage,
                page: nowPage
            });

            //看是否是最后一页
            if (nowPage + 1 <= ((totalCount + pageSize - 1) / pageSize)) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            };

            if (nowPage + 2 <= ((totalCount + pageSize - 1) / pageSize)) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            };

            result.push({
                text: '>>',
                page: parseInt((totalCount + pageSize - 1) / pageSize)
            });

            this.pageNumList = result;
            return result;
        }
    }
})