let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    navbar.classList.toggle("open-menu");
    menu.classList.toggle("move");
};
window.onscroll = () => {
    navbar.classList.remove("open-menu");
    menu.classList.remove("move");
}
function validate() {
    let name = document.querySelector('.name');
    let email = document.querySelector('.email');
    let msg = document.querySelector('.message');
    let sendBtn = document.querySelector('.send-btn');

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (name.value == "" || email.value == "" || msg.value == ""){
            emptyerror();
        }
        else {
            sendmail(name.value, email.value,  msg.value);
            success();
        }
    })
}
validate();


function sendmail(name,email,msg) {
    emailjs.send("service_zx17r7p","template_ijw9tme",{
        to_name: name,
        from_name: email,
        message: msg,
        });
}


function emptyerror() {
    swal({
        title: "Oh No....",
        text: "Fields cannot be empty!",
        icon: "error",
    });
}

function success() {
    swal({
        title: "Email sent successfully!",
        text: "We will try to answer you as soon as possible",
        icon: "success",
    });
}

// ====== HEADER BACKGROUND CHANGE ON SCROLL ====== //
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("header-active", window.scrollY > 0 );
});

// ====== SCROLL TOP MENU ====== //
let scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
    scrollTop.classList.toggle("scroll-active", window.scrollY >= 400);
});


const playerCountElement = document.querySelector('.project-box:first-child h2');

fetch('https://api.mcsrvstat.us/2/play.onthepixel.net')
  .then(response => response.json())
  .then(data => {
    const playerCount = data.players.online;
    playerCountElement.textContent = playerCount;
  })
  .catch(error => console.error(error));