/* =====================================================
   ANNU — CHAPTER 18
   PREMIUM BIRTHDAY MICROSITE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");

const openGift = document.getElementById("openGift");

const bgMusic = document.getElementById("bgMusic");
const specialMusic = document.getElementById("specialMusic");

const musicToggle = document.getElementById("musicToggle");

const specialSongBtn =
    document.getElementById("specialSongBtn");

const songIcon =
    document.getElementById("songIcon");

const songButtonText =
    document.getElementById("songButtonText");

const songStatus =
    document.getElementById("songStatus");

const vinyl =
    document.querySelector(".vinyl");

const cake =
    document.getElementById("cake");

const cakeHint =
    document.getElementById("cakeHint");

const letter =
    document.getElementById("letter");

const secretGift =
    document.getElementById("secretGift");

const secretMessage =
    document.getElementById("secretMessage");

const replayBtn =
    document.getElementById("replayBtn");

const progressBar =
    document.getElementById("progressBar");


/* =====================================================
   AUDIO SETTINGS
===================================================== */

bgMusic.volume = 0.35;
specialMusic.volume = 0.65;

let backgroundPlaying = false;
let specialPlaying = false;


/* =====================================================
   INTRO
===================================================== */

enterBtn.addEventListener("click", function () {

    intro.classList.add("hide");

    startBackgroundMusic();

});


/* =====================================================
   HERO GIFT
===================================================== */

openGift.addEventListener("click", function () {

    document.body.classList.add("started");

    startBackgroundMusic();

    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

});


/* =====================================================
   BACKGROUND MUSIC
===================================================== */

async function startBackgroundMusic() {

    if (specialPlaying) {
        return;
    }

    try {

        await bgMusic.play();

        backgroundPlaying = true;

        musicToggle.classList.add("playing");

        musicToggle.innerHTML = "<span>♫</span>";

        if (!specialPlaying) {

            songStatus.textContent =
                "Love You Zindagi · background music";

        }

    } catch (error) {

        console.log(
            "Background music waiting for user interaction."
        );

    }

}


/* =====================================================
   MUSIC TOGGLE
===================================================== */

musicToggle.addEventListener("click", async function () {

    if (specialPlaying) {
        return;
    }

    if (bgMusic.paused) {

        await startBackgroundMusic();

    } else {

        bgMusic.pause();

        backgroundPlaying = false;

        musicToggle.classList.remove("playing");

        musicToggle.innerHTML =
            "<span>♪</span>";

        songStatus.textContent =
            "Music paused · tap ♪ to continue";

    }

});


/* =====================================================
   SPECIAL SONG
===================================================== */

specialSongBtn.addEventListener("click", async function () {

    /* ---------------------------------------------
       IF SPECIAL SONG IS PLAYING
    --------------------------------------------- */

    if (specialPlaying) {

        specialMusic.pause();

        specialMusic.currentTime = 0;

        specialPlaying = false;

        vinyl.classList.remove("playing");

        songIcon.textContent = "▶";

        songButtonText.textContent =
            "Play something I picked for you";

        songStatus.textContent =
            "Love You Zindagi · background music";

        startBackgroundMusic();

        return;
    }


    /* ---------------------------------------------
       STOP BACKGROUND
    --------------------------------------------- */

    bgMusic.pause();

    backgroundPlaying = false;


    /* ---------------------------------------------
       START SPECIAL
    --------------------------------------------- */

    try {

        specialMusic.currentTime = 0;

        await specialMusic.play();

        specialPlaying = true;

        musicToggle.classList.remove("playing");

        vinyl.classList.add("playing");

        songIcon.textContent = "⏸";

        songButtonText.textContent =
            "Pause this song";

        songStatus.textContent =
            "Mast Magan · just for this moment ♡";

    } catch (error) {

        console.error(
            "Special song could not play:",
            error
        );

        songStatus.textContent =
            "Song file could not be loaded. Check the MP4 file.";

    }

});


/* =====================================================
   SPECIAL SONG FINISHED
===================================================== */

specialMusic.addEventListener("ended", function () {

    specialPlaying = false;

    vinyl.classList.remove("playing");

    songIcon.textContent = "▶";

    songButtonText.textContent =
        "Play something I picked for you";

    songStatus.textContent =
        "Love You Zindagi · background music";

    startBackgroundMusic();

});


/* =====================================================
   CAKE
===================================================== */

cake.addEventListener("click", function () {

    cake.classList.toggle("blown");

    if (cake.classList.contains("blown")) {

        cakeHint.textContent =
            "Wish made? ✨ Happy Birthday, Annu.";

        createConfetti();

    } else {

        cakeHint.textContent =
            "Tap the cake to blow the candles ✨";

    }

});


/* =====================================================
   LETTER
===================================================== */

letter.addEventListener("click", function () {

    letter.classList.toggle("open");

});


/* =====================================================
   SECRET GIFT
===================================================== */

secretGift.addEventListener("click", function () {

    secretMessage.classList.toggle("show");

    if (secretMessage.classList.contains("show")) {

        secretGift.textContent = "💌";

    } else {

        secretGift.textContent = "🎁";

    }

});


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =====================================================
   SCROLL PROGRESS
===================================================== */

window.addEventListener("scroll", function () {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        percentage + "%";

});


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "♡",
        "✿",
        "🌸"
    ];

    for (let i = 0; i < 25; i++) {

        const piece =
            document.createElement("span");

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        piece.style.position = "fixed";
        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-20px";

        piece.style.fontSize =
            12 + Math.random() * 15 + "px";

        piece.style.zIndex = "10000";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const animation =
            piece.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        2500 + Math.random() * 2500,
                    easing: "cubic-bezier(.2,.7,.2,1)"
                }
            );

        animation.onfinish = function () {

            piece.remove();

        };

    }

}


/* =====================================================
   REPLAY
===================================================== */

replayBtn.addEventListener("click", function () {

    bgMusic.pause();
    specialMusic.pause();

    bgMusic.currentTime = 0;
    specialMusic.currentTime = 0;

    backgroundPlaying = false;
    specialPlaying = false;

    bgMusic.volume = 0.35;
    specialMusic.volume = 0.65;

    musicToggle.classList.remove("playing");

    musicToggle.innerHTML =
        "<span>♪</span>";

    vinyl.classList.remove("playing");

    songIcon.textContent = "▶";

    songButtonText.textContent =
        "Play something I picked for you";

    songStatus.textContent =
        "Love You Zindagi · background music";

    cake.classList.remove("blown");

    cakeHint.textContent =
        "Tap the cake to blow the candles ✨";

    letter.classList.remove("open");

    secretMessage.classList.remove("show");

    secretGift.textContent = "🎁";

    intro.classList.remove("hide");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            bgMusic.pause();
            specialMusic.pause();

        }

    }
);


/* =====================================================
   AUDIO ERROR CHECK
===================================================== */

bgMusic.addEventListener(
    "error",
    function () {

        console.error(
            "Love You Zindagi could not load.",
            bgMusic.error
        );

        songStatus.textContent =
            "Background song file not found.";

    }
);


specialMusic.addEventListener(
    "error",
    function () {

        console.error(
            "mast magan could not load.",
            specialMusic.error
        );

        songStatus.textContent =
            "Special song file not found.";

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "🌹 Annu Birthday Website — V5 loaded."
);

console.log(
    "Background: love-you-zindagi.mp4"
);

console.log(
    "Special: mast-magan.mp4"
);