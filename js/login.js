const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

//---------------------------------------
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
// -----------------------------------------------------
// kiem tra form dang ki
function validateSignupForm(email, username, password) {
  // kiem tra username (>= 6 ky tu)
  if (username.length < 6) {
    alert("Username must be at least 6 characters long.");
    return false;
  }
  // password (>= 6 ky tu)
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  return true;
}

// -----------------------------------------------------
// kiem tra trung lap
function isUsernameRegistered(username, alertText) {
  // kiem tra xem username da ton tai trong local storage chua
  if (localStorage.getItem(username) !== null) {
    if (alertText) alert(alertText);
    return true;
  }
  return false;
}

// dang ki -> luu local storage
function signupToLocalStorage() {
  // lay du lieu tu form
  const email = document.getElementById("signupEmail").value;
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  // kiem tra form
  const checked =
    validateSignupForm(email, username, password) &&
    !isUsernameRegistered(
      username,
      "Username is already registered. Please use a different username."
    );
  if (checked == true) {
    // luu vao local storage
    localStorage.setItem(username, password);
    // thong bao
    alert("Registration successful! You can now log in.");
    // chuyen sang dang nhap
    wrapper.classList.remove("active");
  }
}

// -----------------------------------------------------
// dang nhap -> chuyen home
function loginToHome() {
  // lay du lieu tu form
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  // kiem tra username da dang ki chua
  if (isUsernameRegistered(username, "")) {
    // kiem tra password
    const passwordStored = localStorage.getItem(username);
    // so sanh password
    if (passwordStored === password) {
      // dang nhap thanh cong
      // luu current user vao local storage
      localStorage.setItem("currentUser", username);
      alert("Login successful! Redirecting to home page...");
      // chuyen trang
      window.location.href = "../index.html"; // chuyen den trang home
    } else {
      // mat khau khong dung
      alert("Incorrect password. Please try again.");
      return;
    }
  } else {
    // email chua dang ki
    alert("Email not registered. Please sign up first.");
    return;
  }
}

// -----------------------------------------------------
// bat su kien cho nut dang ki
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
    signupToLocalStorage(); // goi ham dang ki
  });

// -----------------------------------------------------
// bat su kien cho nut dang nhap
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
    loginToHome(); // goi ham dang nhap
  });
