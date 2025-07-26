result = ""
try:
    if session.get("logged_in", "no") != "no":
        input_creds = WebBookUser.query.get_or_404(int(session.get("uid", "-1")))
        result = str(input_creds.fname) + separator_string + str(input_creds.lname) + separator_string + str(input_creds.username) + separator_string + str(input_creds.password)
    else:
        result = "Not logged in."
except:
    result = "Server error"
