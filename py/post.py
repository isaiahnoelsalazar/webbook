result = ""
try:
    if session.get("logged_in", "no") != "no":
        content = request.args.get("postcontent")
        input_post = WebBookPost(uid=int(session.get("uid", "-1")),post_content=content)

        try:
            db.session.add(input_post)
            db.session.commit()
            result = "Success"
        except:
            result = "Server error"
    else:
        result = "Not logged in."
except:
    result = "Server error"
