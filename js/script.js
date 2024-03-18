
let addBtn = document.querySelector(".add-student")

let elInput = document.querySelector(".info-input")
let elImgChange = document.querySelector(".info-img")

let elTBody = document.querySelector(".table-body")

let elSearchInput = document.querySelector(".search-input")
let elSortBtn = document.querySelector(".sort-click")

let logOutWrapper = document.querySelector(".logout-wrapper")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let date = new Date()
date = (`${date.getDate().toString().padStart(2, "0")}-${date.getMonth() + 1},${date.getFullYear()}`);

let products = JSON.parse(window.localStorage.getItem("products")) || []
let changeImgR = JSON.parse(window.localStorage.getItem("save"))


// Change avatar start 
elInput.addEventListener("change", function(evt) {
    elImgChange.src = URL.createObjectURL(evt.target.files[0])
    window.localStorage.setItem("save", JSON.stringify(elImgChange.src))
})
// Change avatar end 


// Log out part start 
logOutWrapper.addEventListener("click", function(evt) {
    if(evt.target.id == "logout" || evt.target.className == "logout-text") {
        elModalWrapper.classList.add("open-modal")
        elModal.innerHTML = `
        <h2 class="you-sure-title">Siz rostan ham chiqmoqchimisiz?</h2>
        <div class="you-sure-btn-wrapper">
            <button onclick="cancelBtnClick()" class="you-sure-btn">Yo'q</button>
            <button onclick="exitBtnClick()" class="you-sure-btn">Ha</button>
        </div>
        `
    }
})
function cancelBtnClick() {
    elModalWrapper.classList.remove("open-modal")
}
function exitBtnClick() {
    setTimeout(() => {
        window.location = "./login.html"
    }, 1000);
}
// Log out part end


// Add part start
 addBtn.addEventListener("click", function(evt) {
    elModalWrapper.classList.add("open-modal");
    elModal.innerHTML = `
    <form class="render-form">
        <label class="img-label">
            <input class="visually-hidden get-img" required autocomplete="off" type="file"/>
            <img class="change-img" src="./images/select-picture.svg" alt="Select img" width="50" height="50">
            <span class="render-img-text">Choose photo</span>
        </label>
        <div class="render-wrapper">
            <label class="form-label">
                <span>Enter name</span>
                <input type="text" required autocomplete="off" placeholder="p.s: John"/>
            </label>

            <label class="form-label">
                <span>Enter email</span>
                <input type="email" required autocomplete="off" placeholder="p.s: john@mail.ru"/>
            </label>

            <label class="form-label">
                <span>Enter phone</span>
                <input type="tel" required autocomplete="off" placeholder="p.s: +998334445434"/>
            </label>

            <label class="form-label">
                <span>Enter Enroll number</span>
                <input type="text" required autocomplete="off" placeholder="p.s: 1234567305477760"/>
            </label>
        </div>
        <button class="submit-button">Submit</button>
    </form>
    `
    let elAddForm = document.querySelector(".render-form")
    let elGetImg = document.querySelector(".get-img")
    let elChangeImg = document.querySelector(".change-img")
    let elRenderText = document.querySelector(".render-img-text")

    elGetImg.addEventListener("change", function(evt) {
        elChangeImg.src = URL.createObjectURL(evt.target.files[0])
        elRenderText.textContent = "Photo selected"
    })

    elAddForm.addEventListener("submit", function(evt) {
        evt.preventDefault()
        const data = {
            id: products.length + 1,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name: evt.target[1].value,
            email: evt.target[2].value,
            phone: evt.target[3].value,
            enrollNum: evt.target[4].value,
            date: date
        }

        products.push(data)
        renderFunction(products, elTBody)
        window.localStorage.setItem("products", JSON.stringify(products))
        elModalWrapper.classList.remove("open-modal")
    })
 })
// Add part end 


// Render part start
function renderFunction(arr, list) {
    list.innerHTML = ""
    arr.map(item => {
        let elTr = document.createElement("tr")
        elTr.classList.add("body-row")
        elTr.innerHTML = `
            <td>
                <img class="rendered-img" src="${item.img}" alt="Client img"/>
            </td>
            <td>
                <span>${item.name}</span>
            </td>
            <td>
                <span>${item.email}</span>
            </td>
            <td>
                <span>${item.phone}</span>
            </td>
            <td>
                <span>${item.enrollNum}</span>
            </td>
            <td>
                <span>${item.date}</span>
            </td>
            <td class="button-wrap">
                <button onclick="updateBtnClick(${item.id})" class="edit-btn">
                    <img class="edit-icon" src="./images/edit-icon.svg" alt="Edit" width="19" height="19">
                </button>
                <button onclick="deleteBtnClick(${item.id})" class="trash-btn">
                    <img class="edit-icon" src="./images/trash-icon.svg" alt="Edit" width="16" height="18">
                </button>
            </td>
        `
        list.appendChild(elTr)
    })
} 
renderFunction(products, elTBody)
// Render part end


// Update part start
function updateBtnClick(id) {
    let data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="update-form">
        <label class="img-label">
            <input class="visually-hidden update-get-img" autocomplete="off" type="file"/>
            <img class="upate-change-img" src="${data.img}" alt="Select img" width="50" height="50">
            <span class="render-img-text">Photo selected</span>
        </label>
        <div class="render-wrapper">
            <label class="form-label">
                <span>Enter name</span>
                <input value=${data.name} type="text" required autocomplete="off" placeholder="p.s: John"/>
            </label>

            <label class="form-label">
                <span>Enter email</span>
                <input value=${data.email} type="email" required autocomplete="off" placeholder="p.s: john@mail.ru"/>
            </label>

            <label class="form-label">
                <span>Enter phone</span>
                <input value=${data.phone} type="tel" required autocomplete="off" placeholder="p.s: +998334445434"/>
            </label>

            <label class="form-label">
                <span>Enter Enroll number</span>
                <input value=${data.enrollNum} type="text" required autocomplete="off" placeholder="p.s: 1234567305477760"/>
            </label>
        </div>
        <button class="submit-button">Submit</button>
    </form>
    `

    let elUpdateForm = document.querySelector(".update-form")
    let elUpdateInput = document.querySelector(".update-get-img")
    let elUpdateImg = document.querySelector(".upate-change-img")

    elUpdateInput.addEventListener("change", function(evt) {
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
    })

    elUpdateForm.addEventListener("submit", function(evt) {
        evt.preventDefault()
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.email = evt.target[2].value
        data.phone = evt.target[3].value
        data.enrollNum = evt.target[4].value

        window.localStorage.setItem("products", JSON.stringify(products))
        renderFunction(products, elTBody)
        elModalWrapper.classList.remove("open-modal")
    })
}
// Update part end


// Delete part start
let finedIndex;
function deleteBtnClick(id) {
    finedIndex = products.findIndex(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <h2 class="delete-title">Haqiqatdan ham o'chirmoqchimisiz?</h2>
    <div class="confirm-wrapper">
        <button class="delete-confirm-btn" onclick="noBtnClick()">Yo'q</button>
        <button class="delete-confirm-btn" onclick="yesBtnClick()">Ha</button>
    </div>
    `
} 
function noBtnClick() {
    elModalWrapper.classList.remove("open-modal")
}
function yesBtnClick() {
    products.splice(finedIndex, 1)
    renderFunction(products, elTBody)
    elModalWrapper.classList.remove("open-modal")
    window.localStorage.setItem("products", JSON.stringify(products))
}
// Delete part end 


// Search part start
elSearchInput.addEventListener("keyup", function(evt) {
    const inputVal = evt.target.value.trim();
    const data = products.filter(item => item.name.toLowerCase().includes(inputVal.toLowerCase()))
    renderFunction(data, elTBody)
})
// Search part end 


// Sort part start


let orgProduct = products.slice()

elSortBtn.addEventListener("click", function() {
    if(JSON.stringify(products) === JSON.stringify(orgProduct)) {
        orgProduct.reverse()
    }
    else {
        orgProduct.sort((a, b) => a.name.localeCompare(b.name))
    }

    renderFunction(orgProduct, elTBody)
})

// Sort part end 

// Close modal 
elModalWrapper.addEventListener("click", function(evt) {
    if(evt.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    }
})
// Close modal