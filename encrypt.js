const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const characters = uppercase + lowercase + numbers;
let saltSize = 8;
let username = '';
let salt = '';
let hash = '';
let list = [];
let reg = false;
let del = false;

function generateSalt(){
    salt = '';
    for(let i = 0; i < saltSize; i++){
        let randomIndex = Math.floor(Math.random() * characters.length);
        salt += characters[randomIndex];
    }
    return salt;
}

function display(){

    const usernameField = document.getElementById('userList');
    const saltField = document.getElementById('saltList');
    const passwordField = document.getElementById('passwordList');

    let usernameChild = usernameField.children;
    let saltChild = saltField.children;
    let passwordChild = passwordField.children;

    for(let i = 1; i < usernameChild.length; i++){
        usernameChild[i].innerText = '';
        saltChild[i].innerText = '';
        passwordChild[i].innerText = '';
    }

    for (let username in list){
        let newUsername = document.createElement('div');
        let newSalt = document.createElement('div');
        let newPassword = document.createElement('div');

        newUsername.innerText = username;
        newSalt.innerText = list[username][0];
        newPassword.innerText = list[username][1];

        usernameField.appendChild(newUsername);
        saltField.appendChild(newSalt);
        passwordField.appendChild(newPassword);
    }
}


function clearDB(){
    const usernameField = document.getElementById('userList');
    const saltField = document.getElementById('saltList');
    const passwordField = document.getElementById('passwordList');

    let usernameChild = usernameField.children;
    let saltChild = saltField.children;
    let passwordChild = passwordField.children;

    for(let i = 1; i < usernameChild.length; i++){
        usernameChild[i].innerText = '';
        saltChild[i].innerText = '';
        passwordChild[i].innerText = '';
    }

    if(!del){
        list = [];
    }
}

function submit(username, password, salt){
    if(!reg){
        document.getElementById('user').value = '';
        document.getElementById('pwd').value = '';
        validate(username, password);
    }
    else{
        hash = md5(salt + password);
        document.getElementById('user').value = '';
        document.getElementById('pwd').value = '';
        list[username] = [salt, hash];
        display();
    }
    
}

function validate(username, password){
    if(list[username] != null){
        let passwordChk = md5(list[username][0] + password);
        if(del && passwordChk == list[username][1]){
            deleteUser(username);
            alert('Deletion Successful');
        }
        else{
            if(passwordChk == list[username][1]){
                alert('Login Successful');
            }
            else{
                alert('Incorrect Username or Password');
            }
            return true;
        }
    }
    else{
        alert('User does not exist');
        return false;
    }
}

function register(username){
    if(list[username] != null){
        alert('Username already exists');
        return true;
    }
    else{
        return false;
    }
}

function deleteUser(username){
    delete list[username];
    document.getElementById('user').value = '';
    document.getElementById('pwd').value = '';
    display();
}

window.onload = () => {
    const submitBtn = document.getElementById('encryptBtn');
    const clearBtn = document.getElementById('clearBtn');
    const registerBtn = document.getElementById('registerBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    submitBtn.addEventListener('click', function(){
        reg = false;
        username = document.getElementById('user').value;
        password = document.getElementById('pwd').value;
        if(username == '' || password == ''){
            alert('Need to enter username and password');
        }
        else{
            salt = generateSalt();
            setInterval(submit(username, password, salt), 0);
        }
    });
    clearBtn.addEventListener('click', function(){
        del = false;
        clearDB();
    });
    registerBtn.addEventListener('click', function(){
        reg = true;
        username = document.getElementById('user').value;
        password = document.getElementById('pwd').value;
        if(username == '' || password == ''){
            alert('Need to enter username and password');
        }
        else{
            if(!register(username)){
                salt = generateSalt();
                setInterval(submit(username, password, salt), 0);
            }
        }
    });
    deleteBtn.addEventListener('click', function(){
        del = true;
        username = document.getElementById('user').value;
        password = document.getElementById('pwd').value;
        if(username == '' || password == ''){
            alert('Need to enter username and password');
        }
        else{
            validate(username, password);
        }
        
    });
}
