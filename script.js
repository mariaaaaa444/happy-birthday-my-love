/* =========================================
   MEMORY DATA
========================================= */

const memories = [

    {
        number: "01",
        title: "The Beginning",
        image: "photo1.PNG",
        message:
            "Our very first picture together. I was still so shy, trying to look cute and innocent, but underneath all of that, I was already so happy."
    },

    {
        number: "02",
        title: "Your Hand",
        image: "photo2.PNG",
        message:
            "Yes, I secretly took a picture of your hand HAHAHA. I literally just wanted to show my friends because I was excited about you."
    },

    {
        number: "03",
        title: "Our little joyride",
        image: "photo3.jpg",
        message:
            "You were driving and I secretly took this picture because I wanted to keep the moment. We were just on our way somewhere, but somehow being beside you already made an ordinary ride feel like something worth remembering."
    },

    {
        number: "04",
        title: "The Firsts",
        image: "photo4.jpg",
        message:
            "This one will always be special to me. It was my first time being this close to someone in this way, and somehow, it felt natural with you. My first cuddles with you. Our first kiss. I remember the feeling more than anything — that moment when I realized that I was becoming more comfortable with you. It felt like somewhere I wanted to stay."
    },

    {
        number: "05",
        title: "Our First Dinner Date",
        image: "photo5.jpg",
        message:
            "Nothing extravagant, just dinner with you. But I remember how happy I was that I got to sit with you, talk a little longer, and make the day last just a little more."
    },

    {
        number: "06",
        title: "The Day It Became 'Us'",
        image: "photo6.jpg",
        message:
            "Our second meet. Lunch, arcade games, laughing, and a whole lot of memories in one day. And then I finally said the words: “Be my boyfriend.” You said yes. This is probably one of my favorite days because this was the day everything changed."
    },

    {
        number: "07",
        title: "Us, Holding Hands",
        image: "photo7.jpg",
        message:
            "I never needed someone to hold my hand. I just loved that you always chose to offer yours. There's something about that little gesture that makes me feel cared for, protected, and loved. It's one of the smallest things you do, but it means so much to me."
    },

    {
        number: "08",
        title: "Your Hand in Mine",
        image: "photo8.jpg",
        message:
            "You held my hand and took a picture of it, and I think that's why I love this so much."
    },

    {
        number: "09",
        title: "Wherever We Go",
        image: "photo9.jpg",
        message:
            "There's something about going somewhere with you that makes even an ordinary ride feel special. Maybe it's because I'm with you. Just another little memory that I know I'll look back on and smile."
    },

    {
        number: "10",
        title: "Caught You",
        image: "photo10.jpg",
        message:
            "Okay, fine. I secretly took this because you looked handsome. I couldn't help it HAHAHA. And yes, I probably will keep secretly taking pictures of you."
    }

];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const startScreen = document.getElementById("startScreen");
const memoryScreen = document.getElementById("memoryScreen");
const finalScreen = document.getElementById("finalScreen");

const startButton = document.getElementById("startButton");

const memoryBoxes = document.querySelectorAll(".memory-box");

const memoryModal = document.getElementById("memoryModal");

const closeMemory = document.getElementById("closeMemory");

const memoryImage = document.getElementById("memoryImage");
const memoryNumber = document.getElementById("memoryNumber");
const memoryTitle = document.getElementById("memoryTitle");
const memoryMessage = document.getElementById("memoryMessage");

const nextMemory = document.getElementById("nextMemory");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const envelope = document.getElementById("envelope");

const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

const backgroundMusic = document.getElementById("backgroundMusic");


/* =========================================
   VARIABLES
========================================= */

let currentMemory = 0;

let openedMemories = new Set();


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener("click", function () {

    startScreen.classList.remove("active");

    memoryScreen.classList.add("active");

    // Try to start music after user interaction
    backgroundMusic.volume = 0.35;

    backgroundMusic.play().catch(function () {
        console.log("Music could not autoplay.");
    });

    createHearts();

});


/* =========================================
   OPEN MEMORY
========================================= */

memoryBoxes.forEach(function (box) {

    box.addEventListener("click", function () {

        const memoryNumberValue =
            parseInt(box.dataset.memory);

        openMemory(memoryNumberValue);

    });

});


function openMemory(number) {

    currentMemory = number;

    const memory = memories[number - 1];

    memoryImage.src = memory.image;

    memoryNumber.textContent =
        `MEMORY ${memory.number}`;

    memoryTitle.textContent =
        memory.title;

    memoryMessage.textContent =
        memory.message;


    // Mark as opened

    openedMemories.add(number);

    const box =
        document.querySelector(
            `.memory-box[data-memory="${number}"]`
        );

    if (box) {
        box.classList.add("opened");
    }


    updateProgress();


    memoryModal.classList.add("show");

}


/* =========================================
   CLOSE MEMORY
========================================= */

closeMemory.addEventListener("click", function () {

    memoryModal.classList.remove("show");

});


/* =========================================
   NEXT MEMORY
========================================= */

nextMemory.addEventListener("click", function () {

    memoryModal.classList.remove("show");


    setTimeout(function () {

        let nextNumber = currentMemory + 1;

        /*
            If we're at memory 10,
            go to the final screen.
        */

        if (nextNumber > memories.length) {

            memoryScreen.classList.remove("active");

            finalScreen.classList.add("active");

            return;

        }


        /*
            Automatically open the next memory.
        */

        openMemory(nextNumber);

    }, 350);

});


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const count = openedMemories.size;

    progressText.textContent =
        `${count} / 10 memories opened`;

    const percentage =
        (count / memories.length) * 100;

    progressFill.style.width =
        `${percentage}%`;

}


/* =========================================
   ENVELOPE
========================================= */

envelope.addEventListener("click", function () {

    letterModal.classList.add("show");

});


/* =========================================
   CLOSE LETTER
========================================= */

closeLetter.addEventListener("click", function () {

    letterModal.classList.remove("show");

});


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

memoryModal.addEventListener("click", function (event) {

    if (event.target === memoryModal) {

        memoryModal.classList.remove("show");

    }

});


letterModal.addEventListener("click", function (event) {

    if (event.target === letterModal) {

        letterModal.classList.remove("show");

    }

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        memoryModal.classList.remove("show");

        letterModal.classList.remove("show");

    }

});


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

    const heartsContainer =
        document.querySelector(".hearts");

    setInterval(function () {

        const heart =
            document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML = "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (10 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 6) + "s";


        heartsContainer.appendChild(heart);


        setTimeout(function () {

            heart.remove();

        }, 12000);

    }, 900);

}


/* =========================================
   MUSIC
========================================= */

function playMusic() {
    const music = document.getElementById("backgroundMusic");
    music.play();
}
