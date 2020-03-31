var blogDetail = new Vue({
    el: '#blog_detail',
    created: function () {
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (searchUrlParams == '') {
            return;
        };
        var bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(function (resp) {
            var result = resp.data.data[0];

            blogDetail.title = result.title
            blogDetail.content = result.content
            blogDetail.ctime = result.ctime
            blogDetail.tags = result.tags
            blogDetail.views = result.views
        }).catch(function (resp) {
            console.log('GG');
        })

    },
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: ''
    },
    computed: {

    }
})

//发表评论
var sendComment = new Vue({
    el: '#send_comment',
    created: function () {
        this.changeCode()
    },
    data: {
        vcode: '',
        rightCode: ''
    },
    methods: {
        sendComment: function () {
            var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
            if (searchUrlParams == '') {
                return;
            };
            var bid = -10;
            for (let i = 0; i < searchUrlParams.length; i++) {
                if (searchUrlParams[i].split('=')[0] == 'bid') {
                    try {
                        bid = parseInt(searchUrlParams[i].split('=')[1]);
                    } catch (e) {
                        console.log(e);
                    }
                }
            };

            var reply = document.getElementById('comment_reply').value;
            var replyName = document.getElementById('comment_reply_name').value;
            var name = document.getElementById('comment_name').value;
            var email = document.getElementById('comment_email').value;
            var content = document.getElementById('comment_content').value;

            //必填！
            if (name == "" || email == "" || content == "") {
                alert("内容不能为空");
                return;
            }

            var code = document.getElementById('comment_code').value;
            if (code != sendComment.rightCode) {
                alert("验证码错误！")
                return;
            }

            axios({
                method: 'get',
                url: '/addComment?bid=' + bid + '&parent=' + reply + '&parentName='  + replyName +  '&userName=' + name + '&email=' + email + '&content=' + content            }).then(function (resp) {
                alert('评论成功!');
                window.location.reload(); 
                // sendComment.changeCode();
                // document.getElementById('comment_content').value = '';
                // document.getElementById('comment_code').value = '';
            })
        },
        changeCode: function () {
            //验证码
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then(function (resp) {
                sendComment.vcode = resp.data.data.data;
                sendComment.rightCode = resp.data.data.text;
            })
        }
    }
})

//展示评论
var blogComments = new Vue({
    el: '#blog_comments',
    created: function () {
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (searchUrlParams == '') {
            return;
        };
        var bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        
        axios({
            method: 'get',
            url: '/queryCommentsByBlogId?bid=' + bid
        }).then(function (resp) {
            blogComments.comments = resp.data.data;
            // console.log(resp)
            for (let i = 0; i < blogComments.comments.length; i++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = '回复  @' + blogComments.comments[i].parent_name;
                }
            }
        });

        // 获取评论总数
        axios({
            methods: 'get',
            url: '/queryCommentCountByBlogId?bid=' + bid
        }).then(function (resp) {
            blogComments.count = resp.data.data[0].count;
        })
    },
    data: {
        count: 0,
        comments: []
    },
    methods: {
        reply: function (commentId, userName) {
            document.getElementById('comment_reply').value = commentId;
            document.getElementById('comment_reply_name').value = userName;
            location.href = '#send_comment';
            document.getElementById("comment_content").setAttribute("placeholder","回复 @" + userName + ':');
        }
    }
})