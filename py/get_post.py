result = ""
global a, b, c, d, e, f
try:
    if session.get("logged_in", "no") != "no":
        post_string = ""
        me = WebBookUser.query.get_or_404(int(session.get("uid", "-1")))
        a = list(str(me.friend_list)[1:-1])
        b = Counter(a)
        c = [d for d, e in b.items() if e > 1]
        a = [f for f in a if f not in c]
        for one_post in WebBookPost.query.all():
            for one_cred in WebBookUser.query.all():
                if str(one_post.uid) in a and str(one_post.uid) == str(one_cred.uid):
                    post_string += str(one_post.post_id) + separator_string + str(one_cred.fname) + " " + str(one_cred.lname) + separator_string + str(one_post.post_content) + separator_string + str(one_post.post_uid_likes) + newline_string
        result = post_string
    else:
        result = "Not logged in."
except:
    result = "Server error"
