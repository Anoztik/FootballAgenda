let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault(); //ngam khong cho chuyen trang khi submit
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let email = document.getElementById("email").value.trim();
    //Kiem tra xem password co lon hon 6 ki tu hay khong
    //Kiem tra cac dieu kien co the bo sung them tuy y
    if (password.length < 6) {
        alert("Mat khau can phai nhieu hon 6 ky tu ");
        return;
      } else {
        //Luu thong tin nguoi dung vao localStorage
        //Vi sao phai JSON.stringify boi vi
        //LocalStorage chi luu duoc kieu du lieu String
        //ma user dang la kieu object
        // JSON.stringiy chuyen doi object => String
        if (localStorage.getItem("users")) {
            //kiem tra xem localStorage da co du lieu chua
            let users = JSON.parse(localStorage.getItem("users"));
            //users o day se la mang
            users.push({
              username: username,
              password: password,
              email: email,
            });
            //them 1 nguoi dung moi vao mang users
            // users = [nguoi dung cu, nguoi dung moi]
      localStorage.setItem("users", JSON.stringify(users));
          } else {
            let user = {
              username: username,
              password: password,
              email: email,
            };
            localStorage.setItem("users", JSON.stringify([user]));
          }
          alert("Dang ki thanh cong ");
          window.location.href = "/Login.html";
        }
      });