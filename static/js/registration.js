import { dataHandler } from "./dataHandler.js";
// import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

const loginButton = document.querySelector('.login')
const registrationButton = document.querySelector('.register')


registrationButton.addEventListener("click", async (ev) => {
    ev.preventDefault();
    domManager.initRegisterModal('Register a new account');
    domManager.handleModalClose();
    document.querySelector('.modal-body button').addEventListener('click', async () => {
        const usernameInput = document.querySelector('#email');
        const username = usernameInput.value;
        const passwordInput = document.querySelector('#psw');
        const password = passwordInput.value;
        const passRepeatedInput = document.querySelector('#psw-repeat');
        const passRepeated = passRepeatedInput.value;
        if (username =="") {
            alert('Please enter your name');
        } else if(password==""){
            alert('Please enter a password');
        } else if (password.length < 4) {
            alert('Password too short');
        } else if (password !== passRepeated) {
            alert("Passwords doesn't match")
        } else {
            await dataHandler.createNewUser(username,password);
            domManager.submitModalClose();
            alert('Register successfully')
        }
        
    });
})

loginButton.addEventListener("click", async (ev) => {
    ev.preventDefault();
    domManager.initLoginModal('Log in to your account');
    domManager.handleModalClose();
    document.querySelector('.modal-body button').addEventListener('click', async () => {
        const usernameInput = document.querySelector('#email');
        const username = usernameInput.value;
        const passwordInput = document.querySelector('#psw');
        const password = passwordInput.value;
        if (username =="") {
            alert('Please enter your name');
        } else if(password==""){
            alert('Please enter a password')
        } else {
            let message = await dataHandler.loginUser(username,password);
            
            if(message.message != 'Successfully logged in'){
                alert(message.message);
            } else {
                domManager.submitModalClose();
                window.location.reload();
            }
        }
    })
})
