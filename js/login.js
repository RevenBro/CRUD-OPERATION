
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

let elForm = document.querySelector(".site-form");

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const data = {
        login: evt.target[0].value,
        password: evt.target[1].value
    }
    const confirm = {
        login: "saidakbarov@gmail.com",
        password: "Abdulloh"
    }
    if(data.login == confirm.login && data.password == confirm.password) {
        window.localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
            window.location = "./index.html"
        }, 1500);
    }
    else {
        elModalWrapper.classList.add("open-modal");
        
        elModal.innerHTML = `
        <div class="confirm-login-wrapper">
            <img id="closeImg" class="close-icon" src="./images/close.svg" alt="Close" width="30" height="30">
            <img class="warning-icon" src="./images/warning.svg" alt="Warning icon" width="35" height="35">
            <h2>Kiritilgan ma'lumot xato</h2>
            <button id="okBtn">OK</button>
        </div>
        `
    }
    function closeClick() {
        elModalWrapper.classList.remove("open-modal");
    }
    document.getElementById("closeImg").addEventListener("click", closeClick);

    function okBtnClick() {
        elModalWrapper.classList.remove("open-modal");
    }
    document.getElementById("okBtn").addEventListener("click", okBtnClick);
})

