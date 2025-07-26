result = ""
input_username = request.args.get("username")
input_password = request.args.get("password")

try:
    creds = WebBookUser.query.all()
    found = False
    for a in creds:
        if a.username == input_username and input_password == a.password:
            session["logged_in"] = "yes"
            session["uid"] = str(a.uid)
            found = True
    result = "Success" if found else "Login failed. Please check your username and password."
except:
    result = "Server error"
