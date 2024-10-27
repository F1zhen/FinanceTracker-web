

function displayUsers(filteredUsers) {
    tbody = document.getElementById("userTable")
    tbody.innerHTML = ""

    displayedUsers = filteredUsers || users

    displayedUsers.forEach((user, index) => {
        row = document.createElement("tr")
        row.innerHTML = `
            <td contenteditable="true" id="username-${index}">${user.username}</td>
            <td contenteditable="true" id="password-${index}">${user.password}</td>
            <td>
                <button onclick="editUser(${index})">Save</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `
        tbody.appendChild(row)
    })
}

function searchUsers() {
    searchInput = document.getElementById("searchInput").value
    filteredUsers = users.filter(user => 
        user.username.includes(searchInput) 
    )

    displayUsers(filteredUsers)
}

function editUser(index) {
    username = document.getElementById(`username-${index}`).textContent
    password = document.getElementById(`password-${index}`).textContent
    
    users[index] = { username, password }
    alert("User info updated")
    
}

function deleteUser(index) {
    users.splice(index, 1)
    displayUsers() 
}


displayUsers()
