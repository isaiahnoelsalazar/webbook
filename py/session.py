result = ""
if session.get("logged_in", "no") != "no":
    result = session.get("logged_in", "no") + separator_string + session.get("uid", "-1")
else:
    result = "Not logged in."
