/* =====================================================
   THE USELESS BUTTON
   Professional Hackathon Edition
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const buttonArea =
    document.getElementById("buttonArea");

const uselessButton =
    document.getElementById("uselessButton");

const buttonText =
    document.getElementById("buttonText");

const gameMessage =
    document.getElementById("gameMessage");

const arenaStatus =
    document.getElementById("arenaStatus");

const escapeMode =
    document.getElementById("escapeMode");

const clickCount =
    document.getElementById("clickCount");

const speedLevel =
    document.getElementById("speedLevel");

const uselessScore =
    document.getElementById("uselessScore");

const sessionTimer =
    document.getElementById("sessionTimer");

const threatLevel =
    document.getElementById("threatLevel");

const bigScore =
    document.getElementById("bigScore");

const progressBar =
    document.getElementById("progressBar");

const progressPercent =
    document.getElementById("progressPercent");

const analysisTitle =
    document.getElementById("analysisTitle");

const analysisText =
    document.getElementById("analysisText");

const commentBox =
    document.getElementById("commentBox");

const commentButton =
    document.getElementById("commentButton");

const commentDisplay =
    document.getElementById("commentDisplay");

const commentText =
    document.getElementById("commentText");

const characterCount =
    document.getElementById("characterCount");

const responseText =
    document.getElementById("responseText");

const achievementPopup =
    document.getElementById("achievementPopup");

const popupIcon =
    document.getElementById("popupIcon");

const popupTitle =
    document.getElementById("popupTitle");

const saveScoreButton =
    document.getElementById("saveScoreButton");

const leaderboard =
    document.getElementById("leaderboard");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");
    // ============================================================
// BUTTON SOUND + COLOUR EFFECT
// ============================================================

const clickColors = [
    "#00e5ff",
    "#7c4dff",
    "#00ff88",
    "#ff9800",
    "#ff00aa",
    "#ffff00",
    "#00bcd4",
    "#ffffff"
];

function playClickSound() {
    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const audio = new AudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        300 + Math.random() * 500,
        audio.currentTime
    );

    gain.gain.setValueAtTime(0.12, audio.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.15
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.15);
}

function flashButton() {
    const randomColor =
        clickColors[Math.floor(Math.random() * clickColors.length)];

    // Change red → random colour
    uselessButton.style.backgroundColor = randomColor;

    uselessButton.style.boxShadow =
        `0 0 30px ${randomColor}, 0 0 60px ${randomColor}`;

    // Change back to red
    setTimeout(() => {
        uselessButton.style.backgroundColor = "#ff1744";

        uselessButton.style.boxShadow =
            "0 0 20px rgba(255, 23, 68, 0.7)";
    }, 300);
}


/* =====================================================
   GAME STATE
===================================================== */

let clicks =
    Number(localStorage.getItem("uselessClicks")) || 0;

let sessionStart =
    Date.now();

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let previousMouseX =
    mouseX;

let previousMouseY =
    mouseY;

let velocityX = 0;
let velocityY = 0;

let audioContext = null;

let popupTimeout = null;

let isSpeaking = false;


/* =====================================================
   STORAGE
===================================================== */

function saveClicks() {

    localStorage.setItem(
        "uselessClicks",
        clicks
    );
}


/* =====================================================
   SPEED SYSTEM
===================================================== */

function getSpeedLevel() {

    if (clicks < 5) {
        return 0;
    }

    return Math.floor(
        (clicks - 5) / 6
    ) + 1;
}


/* =====================================================
   USELESSNESS SCORE
===================================================== */

function calculateScore() {

    const speed =
        getSpeedLevel();

    let score =
        clicks * 1.2;

    score +=
        speed * 7;

    const seconds =
        Math.max(
            1,
            Math.floor(
                (Date.now() - sessionStart) / 1000
            )
        );

    score +=
        Math.min(
            20,
            seconds / 10
        );

    return Math.min(
        100,
        Math.round(score)
    );
}


/* =====================================================
   LIVE TIMER
===================================================== */

function updateTimer() {

    const elapsed =
        Math.floor(
            (Date.now() - sessionStart) / 1000
        );

    const minutes =
        Math.floor(elapsed / 60)
            .toString()
            .padStart(2, "0");

    const seconds =
        (elapsed % 60)
            .toString()
            .padStart(2, "0");

    sessionTimer.textContent =
        `${minutes}:${seconds}`;
}

setInterval(
    updateTimer,
    1000
);


/* =====================================================
   DISPLAY
===================================================== */

function updateDisplay() {

    const level =
        getSpeedLevel();

    const score =
        calculateScore();

    clickCount.textContent =
        clicks;

    speedLevel.textContent =
        level;

    uselessScore.textContent =
        score;

    bigScore.textContent =
        score;

    progressBar.style.width =
        `${score}%`;

    progressPercent.textContent =
        `${score}%`;

    const threat =
        Math.min(
            100,
            level * 12
        );

    threatLevel.textContent =
        `${threat}%`;

    if (level === 0) {

        escapeMode.textContent =
            "OFF";

        arenaStatus.textContent =
            "THE BUTTON IS CALM...";

    } else {

        escapeMode.textContent =
            "ACTIVE";

        arenaStatus.textContent =
            `ESCAPE PROTOCOL ${level}.0`;
    }

    updateAnalysis(score, level);
}


/* =====================================================
   FAKE AI ANALYSIS
===================================================== */

function updateAnalysis(
    score,
    level
) {

    if (score < 10) {

        analysisTitle.textContent =
            "You still have potential.";

        analysisText.textContent =
            "Unfortunately, you haven't wasted enough time yet.";

    } else if (score < 30) {

        analysisTitle.textContent =
            "Mildly concerning.";

        analysisText.textContent =
            "Your productivity has begun showing signs of weakness.";

    } else if (score < 60) {

        analysisTitle.textContent =
            "Professional time waster.";

        analysisText.textContent =
            "Our completely fake AI is becoming genuinely concerned.";

    } else if (score < 85) {

        analysisTitle.textContent =
            "Elite-level uselessness.";

        analysisText.textContent =
            "You have transformed a pointless button into a competitive sport.";

    } else {

        analysisTitle.textContent =
            "ABSOLUTE LEGEND.";

        analysisText.textContent =
            "There is officially no reason for you to still be here.";
    }

    if (level >= 5) {

        analysisText.textContent +=
            " The button is now actively afraid of you.";
    }
}


/* =====================================================
   MOUSE TRACKING
===================================================== */

document.addEventListener(
    "pointermove",
    (event) => {

        const newX =
            event.clientX;

        const newY =
            event.clientY;

        velocityX =
            newX - previousMouseX;

        velocityY =
            newY - previousMouseY;

        mouseX =
            newX;

        mouseY =
            newY;

        previousMouseX =
            newX;

        previousMouseY =
            newY;

        if (
            clicks >= 5 &&
            event.pointerType === "mouse"
        ) {

            checkCursorThreat();
        }
    }
);


/* =====================================================
   CURSOR PREDICTION
===================================================== */

function checkCursorThreat() {

    const rect =
        uselessButton.getBoundingClientRect();

    const buttonCenterX =
        rect.left + rect.width / 2;

    const buttonCenterY =
        rect.top + rect.height / 2;

    const futureX =
        mouseX +
        velocityX * 7;

    const futureY =
        mouseY +
        velocityY * 7;

    const distance =
        Math.hypot(
            futureX - buttonCenterX,
            futureY - buttonCenterY
        );

    const dangerRadius =
        100 +
        getSpeedLevel() * 10;

    if (
        distance <
        dangerRadius
    ) {

        moveButton(
            true
        );
    }
}


/* =====================================================
   ADAPTIVE BUTTON ESCAPE
===================================================== */

function moveButton(
    predicted = false
) {

    if (clicks < 5) {
        return;
    }

    const areaRect =
        buttonArea.getBoundingClientRect();

    const buttonRect =
        uselessButton.getBoundingClientRect();

    const buttonWidth =
        buttonRect.width;

    const buttonHeight =
        buttonRect.height;

    const padding =
        30;

    const maxX =
        areaRect.width -
        buttonWidth -
        padding;

    const maxY =
        areaRect.height -
        buttonHeight -
        padding;

    if (
        maxX <= padding ||
        maxY <= padding
    ) {
        return;
    }


    /*
       Generate several possible escape locations
       and choose the one furthest from the cursor.
    */

    let bestX =
        padding;

    let bestY =
        padding;

    let bestDistance =
        -Infinity;

    const candidates =
        8 +
        getSpeedLevel() * 2;


    for (
        let i = 0;
        i < candidates;
        i++
    ) {

        let candidateX =
            padding +
            Math.random() *
            (maxX - padding);

        let candidateY =
            padding +
            Math.random() *
            (maxY - padding);


        /*
           Predict where the cursor is going.
        */

        const predictedX =
            mouseX +
            velocityX *
            (
                8 +
                getSpeedLevel()
            );

        const predictedY =
            mouseY +
            velocityY *
            (
                8 +
                getSpeedLevel()
            );


        /*
           Convert screen coordinates into
           button-area coordinates.
        */

        const screenCandidateX =
            areaRect.left +
            candidateX +
            buttonWidth / 2;

        const screenCandidateY =
            areaRect.top +
            candidateY +
            buttonHeight / 2;


        const distance =
            Math.hypot(
                screenCandidateX -
                predictedX,

                screenCandidateY -
                predictedY
            );


        /*
           At higher levels, prefer locations
           farther away from the predicted cursor.
        */

        const weightedDistance =
            distance *
            (
                1 +
                getSpeedLevel() * 0.15
            );


        if (
            weightedDistance >
            bestDistance
        ) {

            bestDistance =
                weightedDistance;

            bestX =
                candidateX;

            bestY =
                candidateY;
        }
    }


    const speed =
        getSpeedLevel();

    const duration =
        Math.max(
            70,
            280 -
            speed * 20
        );


    uselessButton.style.transition =
        `
        left ${duration}ms
        cubic-bezier(.18,.8,.18,1),
        top ${duration}ms
        cubic-bezier(.18,.8,.18,1)
        `;


    uselessButton.style.left =
        `${bestX}px`;

    uselessButton.style.top =
        `${bestY}px`;

    uselessButton.style.transform =
        "none";


    if (predicted) {

        arenaStatus.textContent =
            "🧠 CURSOR PREDICTED.";

    } else {

        arenaStatus.textContent =
            "🏃 ESCAPE!";
    }


    setTimeout(
        () => {

            arenaStatus.textContent =
                `ESCAPE PROTOCOL ${getSpeedLevel()}.0`;

        },
        600
    );
}


/* =====================================================
   AUDIO ENGINE
===================================================== */

function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}


/* =====================================================
   PROCEDURAL CLICK SOUND
===================================================== */

function playClickSound() {

    try {

        const ctx =
            getAudioContext();

        if (
            ctx.state ===
            "suspended"
        ) {

            ctx.resume();
        }


        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();


        const level =
            getSpeedLevel();


        const frequencies = [
            180,
            240,
            310,
            390,
            470,
            560,
            660
        ];


        oscillator.type =
            level >= 3
                ? "square"
                : "sine";


        oscillator.frequency.setValueAtTime(
            frequencies[
                Math.min(
                    level,
                    frequencies.length - 1
                )
            ],
            ctx.currentTime
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            80,
            ctx.currentTime + 0.12
        );


        gain.gain.setValueAtTime(
            0.15,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.12
        );


        oscillator.connect(gain);

        gain.connect(
            ctx.destination
        );


        oscillator.start();

        oscillator.stop(
            ctx.currentTime + 0.12
        );

    } catch (error) {

        console.log(
            "Audio unavailable."
        );
    }
}


/* =====================================================
   COMMENT SPEECH
===================================================== */

function speakComment(
    text
) {

    if (
        !("speechSynthesis" in window)
    ) {

        responseText.textContent =
            "Your browser does not support speech synthesis.";

        return;
    }


    /*
       Stop anything currently speaking.
    */

    window.speechSynthesis.cancel();


    const voices =
        window.speechSynthesis
            .getVoices();


    const preferredVoice =
        voices.find(
            voice =>
                /Google|Microsoft|Samantha|Daniel|Alex/i
                    .test(
                        voice.name
                    )
        );


    /*
       READ COMMENT
    */

    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.rate =
        1.03;

    speech.pitch =
        1.05;

    speech.volume =
        1;


    if (preferredVoice) {

        speech.voice =
            preferredVoice;
    }


    isSpeaking =
        true;


    responseText.textContent =
        "🗣️ Reading your comment...";


    window.speechSynthesis.speak(
        speech
    );


    /*
       After reading:
       computer laughs.
    */

    speech.onend =
        () => {

            isSpeaking =
                false;

            responseText.textContent =
                "🤖 Processing...";


            setTimeout(
                () => {

                    laughAtComment(
                        preferredVoice
                    );

                },
                400
            );
        };
}


/* =====================================================
   COMPUTER LAUGH
===================================================== */

function laughAtComment(
    voice
) {

    const laughs = [

        "HAHAHAHAHAHA! BEEP BOOP! HAHAHAHA!",

        "HAHA! HAHA! ERROR! TOO FUNNY!",

        "HAHAHAHA! MY CIRCUITS ARE CRYING!",

        "BWAHAHAHAHA! THAT WAS COMPLETELY USELESS!",

        "HAHAHAHAHAHA! I CANNOT COMPUTE THIS NONSENSE!"

    ];


    const laughText =
        laughs[
            Math.floor(
                Math.random() *
                laughs.length
            )
        ];


    const laugh =
        new SpeechSynthesisUtterance(
            laughText
        );


    laugh.rate =
        1.35;

    laugh.pitch =
        1.45;

    laugh.volume =
        1;


    if (voice) {

        laugh.voice =
            voice;
    }


    responseText.textContent =
        "😂 HAHAHA! COMPUTER HAS LOST IT.";


    window.speechSynthesis.speak(
        laugh
    );
}


/* =====================================================
   COMMENT BOX
===================================================== */

commentBox.addEventListener(
    "input",
    () => {

        characterCount.textContent =
            commentBox.value.length;
    }
);


/* =====================================================
   COMMENT BUTTON
===================================================== */

commentButton.addEventListener(
    "click",
    () => {

        const text =
            commentBox.value.trim();


        if (!text) {

            responseText.textContent =
                "🤖 ERROR: Please provide some nonsense first.";

            commentBox.focus();

            return;
        }


        /*
           Display comment.
        */

        commentText.textContent =
            text;

        commentDisplay.classList.remove(
            "hidden"
        );


        /*
           Update computer status.
        */

        responseText.textContent =
            "🧠 Analyzing questionable statement...";


        /*
           Speak it.
        */

        speakComment(
            text
        );


        /*
           Small visual interaction.
        */

        commentButton.textContent =
            "🔊 COMPUTER SPEAKING...";


        setTimeout(
            () => {

                commentButton.innerHTML =
                    "<span>🗣️</span> READ & LAUGH";

            },
            3000
        );
    }
);


/* =====================================================
   ACHIEVEMENTS
===================================================== */

const achievements = {

    1: {
        id: "achievement1",
        icon: "👶",
        title: "FIRST MISTAKE"
    },

    5: {
        id: "achievement5",
        icon: "🏃",
        title: "ESCAPE ARTIST"
    },

    12: {
        id: "achievement12",
        icon: "⚡",
        title: "SPEED DEMON"
    },

    30: {
        id: "achievement30",
        icon: "🧌",
        title: "PROFESSIONAL"
    },

    60: {
        id: "achievement60",
        icon: "👑",
        title: "BUTTON DESTROYER"
    },

    100: {
        id: "achievement100",
        icon: "💀",
        title: "WHY?"
    }

};


function getUnlockedAchievements() {

    return JSON.parse(
        localStorage.getItem(
            "uselessAchievements"
        ) || "[]"
    );
}


function saveUnlockedAchievements(
    list
) {

    localStorage.setItem(
        "uselessAchievements",
        JSON.stringify(list)
    );
}


function checkAchievements() {

    const unlocked =
        getUnlockedAchievements();


    Object.keys(
        achievements
    ).forEach(
        threshold => {

            const achievement =
                achievements[
                    threshold
                ];


            if (
                clicks >=
                Number(threshold)
            ) {

                const alreadyUnlocked =
                    unlocked.includes(
                        threshold
                    );


                const element =
                    document.getElementById(
                        achievement.id
                    );


                if (element) {

                    element.classList.add(
                        "unlocked"
                    );
                }


                if (
                    !alreadyUnlocked
                ) {

                    unlocked.push(
                        threshold
                    );

                    saveUnlockedAchievements(
                        unlocked
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
   ACHIEVEMENT POPUP
===================================================== */

function showAchievement(
    achievement
) {

    popupIcon.textContent =
        achievement.icon;

    popupTitle.textContent =
        achievement.title;


    achievementPopup.classList.add(
        "show"
    );


    clearTimeout(
        popupTimeout
    );


    popupTimeout =
        setTimeout(
            () => {

                achievementPopup.classList.remove(
                    "show"
                );

            },
            3500
        );
}


/* =====================================================
   BUTTON CLICK
===================================================== */

uselessButton.addEventListener(
    "click",
   
    () => {
        playClickSound();
flashButton();

        clicks++;

        saveClicks();


        /*
           Sound
        */

        playClickSound();


        /*
           Button text
        */

        if (clicks < 5) {

            buttonText.textContent =
                "CLICK ME";

        } else {

            const texts = [
                "NOPE",
                "TOO SLOW",
                "TRY AGAIN",
                "CATCH ME",
                "HAHA",
                "MISS ME",
                "ALMOST",
                "NO CHANCE"
            ];


            buttonText.textContent =
                texts[
                    Math.floor(
                        Math.random() *
                        texts.length
                    )
                ];
        }


        /*
           Messages
        */

        const messages = [

            "Excellent. You clicked a button.",

            "That accomplished absolutely nothing.",

            "Your dedication is concerning.",

            "Somewhere, a productive person is disappointed.",

            "The button respects your persistence.",

            "This is becoming unnecessarily competitive.",

            "You could be doing literally anything else.",

            "The button has upgraded its escape technology."

        ];


        gameMessage.textContent =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        /*
           Escape begins at 5.
        */

        if (clicks >= 5) {

            moveButton();

            escapeMode.textContent =
                "ACTIVE";
        }


        /*
           Update everything.
        */

        updateDisplay();

        checkAchievements();

    }
);


/* =====================================================
   TOUCH SUPPORT
===================================================== */

uselessButton.addEventListener(
    "touchstart",
    () => {

        if (clicks >= 5) {

            setTimeout(
                () => moveButton(),
                80
            );
        }

    },
    {
        passive: true
    }
);


/* =====================================================
   LOCAL HALL OF FAME
===================================================== */

function getLeaderboard() {

    return JSON.parse(
        localStorage.getItem(
            "uselessLeaderboard"
        ) || "[]"
    );
}


function saveLeaderboard(
    data
) {

    localStorage.setItem(
        "uselessLeaderboard",
        JSON.stringify(data)
    );
}


function renderLeaderboard() {

    const data =
        getLeaderboard();


    if (!data.length) {

        leaderboard.innerHTML =
            `
            <div class="leaderboard-empty">
                No legends yet. Become the first.
            </div>
            `;

        return;
    }


    leaderboard.innerHTML =
        data
            .slice(0, 10)
            .map(
                (entry, index) => {

                    const medals = [
                        "🥇",
                        "🥈",
                        "🥉"
                    ];

                    const rank =
                        medals[index] ||
                        `#${index + 1}`;


                    return `
                        <div class="leaderboard-row">

                            <div class="leaderboard-rank">
                                ${rank}
                            </div>

                            <div>
                                <div class="leaderboard-name">
                                    ${escapeHTML(entry.name)}
                                </div>

                                <div class="leaderboard-details">
                                    ${entry.clicks} clicks
                                    • Level ${entry.level}
                                </div>
                            </div>

                            <div class="leaderboard-score">
                                ${entry.score}
                            </div>

                        </div>
                    `;
                }
            )
            .join("");
}


function escapeHTML(
    text
) {

    return String(text)
        .replace(
            /[&<>"']/g,
            character => {

                const entities = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                };

                return entities[
                    character
                ];
            }
        );
}


/* =====================================================
   SAVE SCORE
===================================================== */

saveScoreButton.addEventListener(
    "click",
    () => {

        const score =
            calculateScore();


        if (score <= 0) {

            showToast(
                "Click the button first 😭"
            );

            return;
        }


        const name =
            prompt(
                "Enter your useless champion name:"
            );


        if (
            !name ||
            !name.trim()
        ) {

            return;
        }


        const data =
            getLeaderboard();


        data.push({

            name:
                name
                    .trim()
                    .slice(0, 20),

            score:
                score,

            clicks:
                clicks,

            level:
                getSpeedLevel(),

            date:
                new Date()
                    .toLocaleDateString()

        });


        data.sort(
            (a, b) =>
                b.score -
                a.score
        );


        saveLeaderboard(
            data.slice(0, 10)
        );


        renderLeaderboard();


        showToast(
            "🏆 Score saved to the Hall of Fame!"
        );
    }
);


/* =====================================================
   TOAST
===================================================== */

function showToast(
    message
) {

    toastText.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}


/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    updateDisplay();

    checkAchievements();

    renderLeaderboard();

    updateTimer();
}
    const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
    if (!confirm("Reset everything for the next player?")) return;

    localStorage.removeItem("uselessClicks");
    localStorage.removeItem("uselessAchievements");
    localStorage.removeItem("uselessLeaderboard");

    clicks = 0;
    sessionStart = Date.now();

    updateDisplay();
    checkAchievements();
    renderLeaderboard();

    showToast("🔄 Game reset! Ready for the next player.");
});


initialize();