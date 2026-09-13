/* =====================================================
   THE USELESS BUTTON
   NO FIREBASE
   NO API
   NO EXTERNAL LIBRARIES
===================================================== */


/* ELEMENTS */

const button =
    document.getElementById(
        "uselessButton"
    );

const buttonArea =
    document.getElementById(
        "buttonArea"
    );

const message =
    document.getElementById(
        "message"
    );

const clickCount =
    document.getElementById(
        "clickCount"
    );

const timeWasted =
    document.getElementById(
        "timeWasted"
    );

const productivity =
    document.getElementById(
        "productivity"
    );

const aiResult =
    document.getElementById(
        "aiResult"
    );

const analyzeButton =
    document.getElementById(
        "analyzeButton"
    );

const resetButton =
    document.getElementById(
        "resetButton"
    );

const particles =
    document.getElementById(
        "particles"
    );

const popup =
    document.getElementById(
        "achievementPopup"
    );

const popupIcon =
    document.getElementById(
        "popupIcon"
    );

const popupTitle =
    document.getElementById(
        "popupTitle"
    );

const popupText =
    document.getElementById(
        "popupText"
    );


/* =====================================================
   SAVED DATA
===================================================== */

let clicks =
    Number(
        localStorage.getItem(
            "uselessClicks"
        )
    ) || 0;


let startTime =
    Number(
        localStorage.getItem(
            "uselessStartTime"
        )
    );


if (!startTime) {

    startTime =
        Date.now();

    localStorage.setItem(
        "uselessStartTime",
        startTime
    );

}


let unlocked =
    JSON.parse(
        localStorage.getItem(
            "uselessAchievements"
        ) || "[]"
    );


/* =====================================================
   AUDIO ENGINE
===================================================== */

let audioContext;


/*
    We generate all sounds ourselves.

    No MP3 files.
    No copyrighted meme audio.
*/

function getAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }

    return audioContext;

}


/* SOUND */

function sound(
    frequency,
    duration,
    type = "square",
    volume = .07
) {

    const ctx =
        getAudio();


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        frequency,
        ctx.currentTime
    );


    gain.gain.setValueAtTime(
        volume,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        ctx.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(
        ctx.destination
    );


    oscillator.start();

    oscillator.stop(
        ctx.currentTime +
        duration
    );

}


/* =====================================================
   FUNNY SOUND PACK
===================================================== */

function playFunnySound() {


    /*
        EARLY CLICKS
        innocent little beep
    */

    if (clicks < 5) {

        sound(
            300 + clicks * 60,
            .12,
            "square",
            .06
        );

        return;

    }


    /*
        5-9
        suspicious notification
    */

    if (clicks < 10) {

        sound(
            180,
            .08,
            "square",
            .07
        );

        setTimeout(
            () => sound(
                360,
                .08,
                "square",
                .06
            ),
            100
        );

        return;

    }


    /*
        10-24
        BUTTON ANGRY
    */

    if (clicks < 25) {

        sound(
            120,
            .18,
            "sawtooth",
            .08
        );

        setTimeout(
            () => sound(
                70,
                .2,
                "sawtooth",
                .08
            ),
            100
        );

        return;

    }


    /*
        25-49
        goofy chaos
    */

    if (clicks < 50) {

        sound(
            700,
            .07,
            "square",
            .07
        );

        setTimeout(
            () => sound(
                250,
                .07,
                "square",
                .07
            ),
            80
        );

        setTimeout(
            () => sound(
                900,
                .09,
                "square",
                .06
            ),
            160
        );

        return;

    }


    /*
        50-99
        ABSOLUTE NONSENSE
    */

    if (clicks < 100) {

        sound(
            90,
            .15,
            "sawtooth",
            .09
        );

        setTimeout(
            () => sound(
                900,
                .05,
                "square",
                .08
            ),
            80
        );

        setTimeout(
            () => sound(
                150,
                .08,
                "sawtooth",
                .08
            ),
            150
        );

        setTimeout(
            () => sound(
                1100,
                .06,
                "square",
                .08
            ),
            230
        );

        return;

    }


    /*
        100+
        VICTORY CHAOS
    */

    victorySound();

}


/* =====================================================
   VICTORY SOUND
===================================================== */

function victorySound() {

    const notes = [

        250,
        400,
        600,
        800,
        1000,
        700,
        1200,
        500

    ];


    notes.forEach(
        (note, index) => {

            setTimeout(
                () => sound(
                    note,
                    .13,
                    "square",
                    .08
                ),
                index * 90
            );

        }
    );

}


/* =====================================================
   ACHIEVEMENT SOUND
===================================================== */

function achievementSound() {

    const notes = [
        523,
        659,
        784,
        1047
    ];


    notes.forEach(
        (note, index) => {

            setTimeout(
                () => sound(
                    note,
                    .18,
                    "sine",
                    .09
                ),
                index * 120
            );

        }
    );

}


/* =====================================================
   FUNNY MESSAGES
===================================================== */

const messages = [

    "🙂 Nice button.",

    "Why did you press it?",

    "I literally told you not to.",

    "Okay...",

    "Seriously?",

    "This button does NOTHING.",

    "Bro.",

    "You pressed it again 💀",

    "The button is concerned.",

    "Your productivity is leaving the chat.",

    "PLEASE STOP.",

    "You have chosen chaos.",

    "The button has developed trust issues.",

    "🚨 BUTTON PANIC 🚨",

    "WHY ARE YOU LIKE THIS?",

    "The button is trying to escape.",

    "This is no longer a game.",

    "You are fighting a button.",

    "THE BUTTON FEARS YOU.",

    "THE BUTTON NOW HATES YOU.",

    "💀 WHAT ARE YOU DOING?",

    "Scientists are studying your behavior.",

    "Your keyboard is disappointed.",

    "The button has contacted management.",

    "FINAL WARNING.",

    "Bro is fighting HTML.",

    "This could have been homework.",

    "You have unlocked negative productivity.",

    "The button wants a lawyer.",

    "THE COUNCIL HAS BEEN NOTIFIED.",

    "💀💀💀"

];


/* =====================================================
   UPDATE SCREEN
===================================================== */

function updateDisplay() {

    clickCount.textContent =
        clicks;


    const seconds =
        Math.floor(
            (
                Date.now() -
                startTime
            ) / 1000
        );


    timeWasted.textContent =
        seconds + "s";


    const productivityValue =
        Math.max(
            0,
            100 -
            clicks * .75
        );


    productivity.textContent =
        Math.round(
            productivityValue
        ) + "%";


    localStorage.setItem(
        "uselessClicks",
        clicks
    );

}


/* =====================================================
   BUTTON TEXT
===================================================== */

function updateButton() {

    if (clicks < 10) {

        button.textContent =
            "PRESS ME";

    }

    else if (clicks < 25) {

        button.textContent =
            "STOP 😭";

    }

    else if (clicks < 50) {

        button.textContent =
            "BRO STOP";

    }

    else if (clicks < 100) {

        button.textContent =
            "NO MORE 💀";

    }

    else {

        button.textContent =
            "YOU WIN 🏆";

    }

}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles() {

    const rect =
        button.getBoundingClientRect();


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.style.left =
            rect.left +
            rect.width / 2 +
            "px";


        particle.style.top =
            rect.top +
            rect.height / 2 +
            "px";


        particle.style.setProperty(
            "--x",
            (
                Math.random() * 200 -
                100
            ) + "px"
        );


        particle.style.setProperty(
            "--y",
            (
                Math.random() * 200 -
                100
            ) + "px"
        );


        particles.appendChild(
            particle
        );


        setTimeout(
            () => particle.remove(),
            900
        );

    }

}


/* =====================================================
   BUTTON ESCAPE
===================================================== */

function escapeButton() {

    if (clicks < 10) {
        return;
    }


    const areaRect =
        buttonArea.getBoundingClientRect();


    const buttonWidth =
        button.offsetWidth;


    const buttonHeight =
        button.offsetHeight;


    const maxX =
        Math.max(
            0,
            areaRect.width -
            buttonWidth
        );


    const maxY =
        Math.max(
            0,
            areaRect.height -
            buttonHeight
        );


    const x =
        Math.random() *
        maxX;


    const y =
        Math.random() *
        maxY;


    button.style.position =
        "absolute";


    button.style.left =
        x + "px";


    button.style.top =
        y + "px";

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

const achievements = [

    {
        clicks: 1,
        id: "achievement1",
        icon: "🥚",
        title: "FIRST MISTAKE",
        text:
            "Congratulations. You pressed a button."
    },

    {
        clicks: 10,
        id: "achievement10",
        icon: "🤨",
        title: "WHY?",
        text:
            "You have pressed it TEN TIMES."
    },

    {
        clicks: 25,
        id: "achievement25",
        icon: "💀",
        title: "NO LIFE",
        text:
            "The button now knows you personally."
    },

    {
        clicks: 50,
        id: "achievement50",
        icon: "🗿",
        title: "ABSOLUTE UNIT",
        text:
            "50 useless clicks. Humanity is proud."
    },

    {
        clicks: 100,
        id: "achievement100",
        icon: "👑",
        title: "LEGEND",
        text:
            "You have achieved maximum uselessness."
    }

];


/* CHECK */

function checkAchievements() {

    achievements.forEach(
        achievement => {

            const element =
                document.getElementById(
                    achievement.id
                );


            if (
                clicks >=
                achievement.clicks
            ) {

                element.classList.add(
                    "unlocked"
                );


                if (
                    !unlocked.includes(
                        achievement.clicks
                    )
                ) {

                    unlocked.push(
                        achievement.clicks
                    );


                    localStorage.setItem(
                        "uselessAchievements",
                        JSON.stringify(
                            unlocked
                        )
                    );


                    showAchievement(
                        achievement
                    );

                }

            }

        }
    );

}


/* =====================================================
   POPUP
===================================================== */

function showAchievement(
    achievement
) {

    popupIcon.textContent =
        achievement.icon;


    popupTitle.textContent =
        achievement.title;


    popupText.textContent =
        achievement.text;


    popup.classList.add(
        "show"
    );


    achievementSound();


    createParticles();


    setTimeout(
        () => {

            popup.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =====================================================
   MAIN BUTTON
===================================================== */

button.addEventListener(
    "click",
    () => {

        clicks++;


        /* SOUND */

        playFunnySound();


        /* PARTICLES */

        createParticles();


        /* MESSAGE */

        const messageIndex =
            Math.min(
                clicks - 1,
                messages.length - 1
            );


        message.textContent =
            messages[
                messageIndex
            ];


        /* SCREEN */

        updateDisplay();

        updateButton();

        checkAchievements();


        /* ESCAPE */

        if (clicks >= 10) {

            setTimeout(
                escapeButton,
                100
            );

        }

    }
);


/* =====================================================
   MOUSE ESCAPE
===================================================== */

button.addEventListener(
    "mouseenter",
    () => {

        if (clicks >= 10) {

            escapeButton();

        }

    }
);


/* =====================================================
   FAKE AI
===================================================== */

analyzeButton.addEventListener(
    "click",
    () => {

        analyzeButton.disabled =
            true;


        aiResult.textContent =
            "🤖 Analyzing your extremely questionable decisions...";


        setTimeout(
            () => {

                let result;


                if (clicks === 0) {

                    result =
                        "🤖 Analysis: You haven't even pressed the button. Somehow this is your most productive moment.";

                }

                else if (clicks < 10) {

                    result =
                        "🤖 Analysis: Mild curiosity detected. Your situation is still recoverable.";

                }

                else if (clicks < 25) {

                    result =
                        "🤖 Analysis: You KNOW the button does nothing, yet you continue. Interesting.";

                }

                else if (clicks < 50) {

                    result =
                        "🤖 Analysis: Your productivity has entered witness protection.";

                }

                else if (clicks < 100) {

                    result =
                        "🤖 Analysis: You are now competing against a piece of HTML. The HTML is winning.";

                }

                else {

                    result =
                        "🤖 FINAL REPORT: Maximum uselessness achieved. Please touch grass.";

                }


                aiResult.textContent =
                    result;


                analyzeButton.disabled =
                    false;

            },
            1000
        );

    }
);


/* =====================================================
   RESET
===================================================== */

resetButton.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "Are you REALLY sure? All your useless achievements will disappear."
            )
        ) {

            return;

        }


        clicks = 0;


        startTime =
            Date.now();


        unlocked = [];


        localStorage.setItem(
            "uselessClicks",
            0
        );


        localStorage.setItem(
            "uselessStartTime",
            startTime
        );


        localStorage.removeItem(
            "uselessAchievements"
        );


        button.style.position =
            "relative";


        button.style.left =
            "";


        button.style.top =
            "";


        message.textContent =
            "Go ahead... nothing will happen. 😏";


        aiResult.textContent =
            "Our highly questionable AI is waiting for enough evidence to judge you.";


        document
            .querySelectorAll(
                ".achievement"
            )
            .forEach(
                element => {

                    element.classList.remove(
                        "unlocked"
                    );

                }
            );


        updateDisplay();

        updateButton();

    }
);


/* =====================================================
   TIMER
===================================================== */

setInterval(
    updateDisplay,
    1000
);


/* =====================================================
   CLOSE POPUP WHEN CLICKED
===================================================== */

popup.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "show"
        );

    }
);


/* =====================================================
   START
===================================================== */

updateDisplay();

updateButton();

checkAchievements();