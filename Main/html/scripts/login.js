if(localStorage.getItem("currentUser")) {
    alert("Ban da dang nhap roi");
    window.location.href ="./html/index.html"
}

let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault(); //ngam khong cho chuyen trang khi submit
    let password = document.getElementById("password").value.trim();
    let email = document.getElementById("email").value.trim();

if(!localStorage.getItem("user")) {
    alert("Chua co nguoi dung nao, vui long dang ki truoc");
    return;
} else {
    let users = JSON.parse(localStorage.getItem("users"));

    //user => array (mang)

    //Kiem tra xem thong tin dang nhap co trong users khong

    let exitsingUser = users.find((user) => {
      return user.email === email && user.password === password;
});
    console.log(exitsingUser);

    if (exitsingUser) {
        localStorage.setItem("currentUser", JSON.stringify(exitsingUser));
        window.location.href = "./html/index.html";
    } else {
        console.log(users);
        console.log(password,email);
        alert("Dang nhap khong dung roi");
     }
    }
});
