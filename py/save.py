result = ""
input_fname = request.args.get("fname")
input_lname = request.args.get("lname")
input_username = request.args.get("username")
input_password = request.args.get("password")
input_creds = WebBookUser.query.get_or_404(int(session.get("uid", "-1")))

err = ""
if len(input_password) < 8:
    err = " Password cannot be less than 8 characters."

if validUsername(input_username):
    if input_username != input_creds.username:
        if usernameExists(input_username):
            result = "Username is already in use." + err
        if len(input_username) < 4:
            result = "Username cannot be less than 4 characters." + err

    if err == "":
        input_creds.fname = input_fname
        input_creds.lname = input_lname
        input_creds.username = input_username
        input_creds.password = input_password

        try:
            db.session.commit()
            result = "Success"
        except:
            result = "Server error"
    else:
        result = err[1:]
else:
    result = "Username cannot contain any symbols nor spaces." + err
