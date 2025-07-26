result = ""
global a, b, c, d, e, f
try:
    if session.get("logged_in", "no") != "no":
        try:
            get_user = WebBookUser.query.get_or_404(int(uid))
            usget = str(get_user.username)

            try:
                me = WebBookUser.query.get_or_404(int(session.get("uid", "-1")))
                a = list(str(me.friend_list)[1:-1])
                b = Counter(a)
                c = [d for d, e in b.items() if e > 1]
                a = [f for f in a if f not in c]
                if str(uid) == session.get("uid", "-1"):
                    result = "This is your user ID."
                else:
                    if str(uid) in a:
                        result = "This user is already your friend."
                    else:
                        a.append(str(uid))
                        me.friend_list = "["+",".join(a)+"]"
                        db.session.commit()
                        result = "Successfully added " + str(get_user.fname) + " " + str(get_user.lname) + " to your friend list."
            except:
                result = "There was an error adding this user to your friend list."
        except:
            result = "This user does not exist."
    else:
        result = "Not logged in."
except:
    result = "Server error"
