result = ""
global a, b, c, d, e, f
try:
    if session.get("logged_in", "no") != "no":
        try:
            get_post = WebBookPost.query.get_or_404(int(post_id))
            a = list(str(get_post.post_uid_likes)[1:-1])
            b = Counter(a)
            c = [d for d, e in b.items() if e > 1]
            a = [f for f in a if f not in c]
            toadd = False
            if str(session.get("uid", "-1")) in a:
                a.remove(str(session.get("uid", "-1")))
            else:
                a.append(str(session.get("uid", "-1")))
                toadd = True
            get_post.post_uid_likes = "["+",".join(a)+"]"
            db.session.commit()
            result = "Success" + separator_string + ("resources/star.png" if toadd else "resources/star_filled.png")
        except:
            result = "Server error"
    else:
        result = "Not logged in."
except:
    result = "Server error"
