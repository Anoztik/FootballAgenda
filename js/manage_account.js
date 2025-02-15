// tao bien luu tru 1 account co dinh
const defaultAccount ={
    username: "ThienHai2013",
    email: "lythienhai446@gmail.com",
    password:"thienhainek2013"
}

//luu bien co dinh vao local storage
if (!localStorage.getItem("defaultAccount")) {
    //neu chua co du du lieu trong storage => tao
    // JSON:kieu du lieu dung de luu vao trong storage => js khong doc duoc
    // => chuyen kieu du lieu tu js -> json = func stringify()
    localStorage.getItem("defaulAccount", JSON.stringify(defaultAccount));
}