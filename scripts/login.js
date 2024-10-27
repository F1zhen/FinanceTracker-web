document.getElementById("loginform").addEventListener("submit", function(event) {
event.preventDefault()

username = document.getElementById("username").value
password = document.getElementById("password").value

isCorrect = false
isAdmin = false

for(i=0;i<users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
        for(j=0;j<admins.length;j++) {
            if (username === admins[j].username) {
                isAdmin = true
                break
            }               
        }
        isCorrect = true
        break
    }
}

if(isAdmin) window.location.href ="adminpanel.html"
else if(isCorrect && !isAdmin) window.location.href = "index.html"
else alert("wrong")

})
