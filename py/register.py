result = ""
input_fname = request.args.get("fname")
input_lname = request.args.get("lname")
input_username = request.args.get("username")
input_password = request.args.get("password")

err = ""
if len(input_fname) < 1:
    err += " First name cannot be empty."
if len(input_lname) < 1:
    err += " Last name cannot be empty."
if len(input_password) < 8:
    err += " Password cannot be less than 8 characters."

if validUsername(input_username):
    if usernameExists(input_username):
        result = "Username is already in use." + err
    else:
        if len(input_username) < 4:
            result = "Username cannot be less than 4 characters." + err
        if err == "":
            input_creds = WebBookUser(fname=input_fname,lname=input_lname,username=input_username,password=input_password,friend_list="["+str(len(WebBookUser.query.all())+1)+"]")
            
            try:
                db.session.add(input_creds)
                db.session.commit()
                result = "Success"
            except:
                result = "Server error"
        else:
            result = err[1:]
else:
    result = "Username cannot contain any symbols nor spaces." + err
