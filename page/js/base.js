// 右边共有部分的js

// 随机标签云
var randomTags = new Vue({
    el: '#random_tags',
    created: function () {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                result.push({
                    text: resp.data.data[i].tag,
                    link: '/home.html?tag=' + resp.data.data[i].tag
                });
            };
            randomTags.tags = result;
        })
    },
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 200 + 50;
                var green = Math.random() * 150 + 50;
                var blue = Math.random() * 190 + 50;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomSize: function () {
            return function () {
                var size = Math.random() * 20 + 12;
                return size + 'px';
            }
        }
    }
})


//  最近热门
var newHot = new Vue({
    el: '#new_hot',
    created: function () {
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = 'blog_detail.html?bid=' + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        });
    },
    data: {
        titleList: []
    }
})

// 最新评论
var newComments = new Vue({
    el: '#new_comment',
    created: function () {
        axios({
            method: 'get',
            url: '/queryNewComment'
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                if (resp.data.data[i].blog_id > 0) {
                    temp.link = 'blog_detail.html?bid=' + resp.data.data[i].blog_id;
                } else if (resp.data.data[i].blog_id == -1) {
                    temp.link = 'about.html'
                } else if (resp.data.data[i].blog_id == -2) {
                    temp.link = 'guestBook.html'
                }
                result.push(temp);
            }
            newComments.commentList = result;
        })
    },
    data: {
        commentList: []
    }
})
