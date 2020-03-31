 // 留言页面 blogId  为-2

//展示评论
var blogComments = new Vue({
    el: '#blog_comments',
    created: function () {

        var bid = -2;
        
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
});

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
            var bid = -2;

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
                alert('留言成功!');
                window.location.reload(); 
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
