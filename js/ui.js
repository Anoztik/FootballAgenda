const container = document.querySelecttor('.container');
const registerBtn = document.querySelecttor('.register-btn');
const loginloginBtn = document.querySelecttor('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.add('active');
});