/* =========================================================
   THE USELESS BUTTON
   Complete Game Engine
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const button =
    document.getElementById("uselessButton");

const buttonText =
    document.getElementById("buttonText");

const buttonArea =
    document.getElementById("buttonArea");

const clickCount =
    document.getElementById("clickCount");

const clickDelta =
    document.getElementById("clickDelta");

const speedLevel =
    document.getElementById("speedLevel");

const uselessScore =
    document.getElementById("uselessScore");

const bigScore =
    document.getElementById("bigScore");

const sessionTimer =
    document.getElementById("sessionTimer");

const threatLevel =
    document.getElementById("threatLevel");

const threatText =
    document.getElementById("threatText");

const arenaStatus =
    document.getElementById("arenaStatus");

const comboDisplay =
    document.getElementById("comboDisplay");

const progressBar =
    document.getElementById("progressBar");

const progressPercent =
    document.getElementById("progressPercent");

const analysisTitle =
    document.getElementById("analysisTitle");

const commentBox =
    document.getElementById("commentBox");

const commentButton =
    document.getElementById("commentButton");

const commentText =
    document.getElementById("commentText");

const responseText =
    document.getElementById("responseText");

const characterCount =
    document.getElementById("characterCount");

const robotMessage =
    document.getElementById("robotMessage");

const robotChestText =
    document.getElementById("robotChestText");

const leaderboardList =
    document.getElementById("leaderboardList");

const saveScoreButton =
    document.getElementById("saveScoreButton");

const resetButton =
    document.getElementById("resetButton");

const soundButton =
    document.getElementById("soundButton");

const achievementPopup =
    document.getElementById("achievementPopup");

const popupIcon =
    document.getElementById("popupIcon");

const popupTitle =
    document.getElementById("popupTitle");

const popupDescription =
    document.getElementById("popupDescription");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


/* =========================================================
   GAME STATE
========================================================= */

let clicks =
    Number(localStorage.getItem("uselessClicks")) || 0;

let combo = 0;

let bestCombo =
    Number(localStorage.getItem("bestCombo")) || 0;

let sessionSeconds = 0;

let gameStarted = false;

let soundEnabled =
    localStorage.getItem("soundEnabled") !== "false";

let mouseX = 0;
let mouseY = 0;

let previousMouseX = 0;
let previousMouseY = 0;

let velocityX = 0;
let velocityY = 0;

let lastThreatCheck = 0;

let comboTimer = null;
let popupTimer = null;

let audioContext = null;


/* =========================================================
   BUTTON PERSONALITIES
========================================================= */

const buttonMessages = [
    "CLICK ME",
    "WHY?",
    "STOP",
    "NOPE",
    "NOT AGAIN",
    "SERIOUSLY?",
    "LEAVE ME ALONE",
    "I'M BUSY",
    "GO AWAY",
    "YOU AGAIN?!",
    "THIS IS POINTLESS",
    "PLEASE",
    "I REGRET THIS",
    "DON'T CLICK",
    "WHY DO YOU DO THIS?"
];


/* =========================================================
   ROBOT MESSAGES
========================================================= */

const robotMessages = [
    "🤖 Please stop clicking.",
    "🤖 Why are you doing this?",
    "🤖 This is not productive.",
    "🤖 I have concerns.",
    "🤖 My calculations show absolutely nothing.",
    "🤖 You could be doing literally anything else.",
    "🤖 THIS IS GETTING SERIOUS.",
    "🤖 I am beginning to regret being programmed.",
    "🤖 PLEASE TOUCH GRASS.",
    "🤖 YOU HAVE BECOME THE USELESS ONE."
];


/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievementData = [
    {
        id: "1",
        clicks: 1,
        icon: "🤨",
        name: "First Mistake",
        description: "Click the button once."
    },

    {
        id: "10",
        clicks: 10,
        icon: "👀",
        name: "Getting Started",
        description: "Reach 10 clicks."
    },

    {
        id: "25",
        clicks: 25,
        icon: "🏃",
        name: "Catch Me If You Can",
        description: "Reach 25 clicks."
    },

    {
        id: "50",
        clicks: 50,
        icon: "😂",
        name: "Other Options Exist",
        description: "Reach 50 clicks."
    },

    {
        id: "100",
        clicks: 100,
        icon: "🗿",
        name: "Why Are You Still Here?",
        description: "Reach 100 clicks."
    },

    {
        id: "250",
        clicks: 250,
        icon: "💀",
        name: "Absolute Menace",
        description: "Reach 250 clicks."
    },

    {
        id: "500",
        clicks: 500,
        icon: "👹",
        name: "Button Destroyer",
        description: "Reach 500 clicks."
    },

    {
        id: "1000",
        clicks: 1000,
        icon: "🌱",
        name: "Touch Grass",
        description: "Reach 1000 clicks."
    }
];


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (!button) {
            console.error(
                "The Useless Button could not be found."
            );

            return;
        }

        updateEverything();

        updateSoundButton();

        renderLeaderboard();

        startTimer();

        setupEvents();

    }
);


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    button.addEventListener(
        "click",
        handleButtonClick
    );


    document.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
    );


    if (commentBox) {

        commentBox.addEventListener(
            "input",
            updateCharacterCount
        );

    }


    if (commentButton) {

        commentButton.addEventListener(
            "click",
            handleComment
        );

    }


    if (saveScoreButton) {

        saveScoreButton.addEventListener(
            "click",
            saveScore
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetGame
        );

    }


    if (soundButton) {

        soundButton.addEventListener(
            "click",
            toggleSound
        );

    }

}


/* =========================================================
   CLICK
========================================================= */

function handleButtonClick(event) {

    event.preventDefault();

    if (!gameStarted) {
        gameStarted = true;
    }


    clicks++;

    localStorage.setItem(
        "uselessClicks",
        String(clicks)
    );


    updateCombo();

    updateEverything();

    changeButtonPersonality();

    updateRobot();

    checkAchievements();

    playClickSound();

    flashButton();

    randomEvent();


    /*
       The button always moves.

       First 10 clicks are deliberately easier.
       After click 10 the speed increases every 6 clicks.
    */

    setTimeout(
        () => {
            moveButton(false);
        },
        80
    );


    if (clicks === 500) {
        startFinalBoss();
    }

}


/* =========================================================
   SPEED
========================================================= */

function getSpeedLevel() {

    if (clicks <= 3) {
        return 1;
    }

    if (clicks <= 10) {
        return 2;
    }

    return Math.min(
        10,
        2 +
        Math.floor(
            (clicks - 10) / 6
        )
    );
}


/* =========================================================
   MOVE BUTTON
========================================================= */

function moveButton(predicted = false) {

    if (!buttonArea || !button) {
        return;
    }


    const rect =
        buttonArea.getBoundingClientRect();

    const buttonSize =
        button.offsetWidth;


    const padding = 35;


    let minX =
        padding + buttonSize / 2;

    let maxX =
        rect.width -
        padding -
        buttonSize / 2;

    let minY =
        80 +
        buttonSize / 2;

    let maxY =
        rect.height -
        padding -
        buttonSize / 2;


    if (maxX <= minX) {
        return;
    }

    if (maxY <= minY) {
        return;
    }


    let newX =
        randomNumber(minX, maxX);

    let newY =
        randomNumber(minY, maxY);


    /*
       Before click 10:
       avoid extreme movement.
    */

    if (clicks <= 10) {

        const current =
            getButtonCenter();

        const gentle =
            Math.min(
                80,
                20 + clicks * 5
            );

        newX =
            clamp(
                current.x +
                randomNumber(
                    -gentle,
                    gentle
                ),
                minX,
                maxX
            );

        newY =
            clamp(
                current.y +
                randomNumber(
                    -gentle,
                    gentle
                ),
                minY,
                maxY
            );

    }


    button.style.left =
        `${newX}px`;

    button.style.top =
        `${newY}px`;


    if (predicted) {

        if (arenaStatus) {
            arenaStatus.textContent =
                "🧠 CURSOR PREDICTION ACTIVATED";
        }

    } else {

        if (arenaStatus) {
            arenaStatus.textContent =
                clicks < 5
                    ? "The button is suspiciously calm..."
                    : "⚠️ The button is watching your cursor.";
        }

    }

}


/* =========================================================
   CURSOR TRACKING
========================================================= */

function handlePointerMove(event) {

    const now =
        performance.now();

    mouseX =
        event.clientX;

    mouseY =
        event.clientY;


    velocityX =
        mouseX -
        previousMouseX;

    velocityY =
        mouseY -
        previousMouseY;


    previousMouseX =
        mouseX;

    previousMouseY =
        mouseY;


    /*
       Cursor prediction starts at click 5.
    */

    if (
        clicks >= 5 &&
        event.pointerType === "mouse" &&
        now - lastThreatCheck > 90
    ) {

        lastThreatCheck = now;

        checkCursorThreat();

    }

}


/* =========================================================
   CURSOR THREAT
========================================================= */

function checkCursorThreat() {

    const center =
        getButtonCenter();

    const speed =
        getSpeedLevel();


    const radius =
        90 +
        speed * 12;


    const distance =
        Math.hypot(
            center.x - mouseX,
            center.y - mouseY
        );


    /*
       Predict where the cursor will be.
    */

    const multiplier =
        5 +
        speed * 1.5;


    const futureX =
        mouseX +
        velocityX *
        multiplier;

    const futureY =
        mouseY +
        velocityY *
        multiplier;


    const futureDistance =
        Math.hypot(
            center.x - futureX,
            center.y - futureY
        );


    const danger =
        Math.max(
            distance,
            futureDistance
        );


    if (distance < radius) {

        moveButton(true);

    } else if (
        futureDistance < radius
    ) {

        moveButton(true);

    }


    updateThreat(
        Math.max(
            distance,
            futureDistance
        ),
        radius
    );

}


/* =========================================================
   BUTTON CENTER
========================================================= */

function getButtonCenter() {

    const rect =
        button.getBoundingClientRect();

    return {
        x:
            rect.left +
            rect.width / 2,

        y:
            rect.top +
            rect.height / 2
    };

}


/* =========================================================
   THREAT UI
========================================================= */

function updateThreat(
    distance,
    radius
) {

    if (!threatLevel) {
        return;
    }


    let percentage =
        100 -
        (distance / radius) * 100;


    percentage =
        clamp(
            percentage,
            0,
            100
        );


    threatLevel.style.width =
        `${Math.round(percentage)}%`;


    if (threatText) {

        if (percentage > 75) {
            threatText.textContent =
                "EXTREME";
        } else if (percentage > 50) {
            threatText.textContent =
                "HIGH";
        } else if (percentage > 25) {
            threatText.textContent =
                "MEDIUM";
        } else {
            threatText.textContent =
                "LOW";
        }

    }

}


/* =========================================================
   COMBO
========================================================= */

function updateCombo() {

    combo++;


    if (combo > bestCombo) {

        bestCombo =
            combo;

        localStorage.setItem(
            "bestCombo",
            String(bestCombo)
        );

    }


    clearTimeout(comboTimer);


    comboTimer =
        setTimeout(
            () => {

                combo = 0;

                updateComboDisplay();

            },
            1500
        );


    updateComboDisplay();

}


function updateComboDisplay() {

    if (!comboDisplay) {
        return;
    }


    if (combo <= 1) {

        comboDisplay.textContent =
            "";

        return;

    }


    comboDisplay.textContent =
        `🔥 ${combo}x COMBO`;


    comboDisplay.classList.remove(
        "combo-pop"
    );


    void comboDisplay.offsetWidth;


    comboDisplay.classList.add(
        "combo-pop"
    );


    if (clickDelta) {

        clickDelta.textContent =
            `${combo}x`;

    }

}


/* =========================================================
   BUTTON PERSONALITY
========================================================= */

function changeButtonPersonality() {

    if (!buttonText) {
        return;
    }


    let message =
        buttonMessages[
            randomNumber(
                0,
                buttonMessages.length - 1
            )
        ];


    /*
       Boss message.
    */

    if (clicks >= 500) {

        message =
            "YOU SHALL NOT CLICK";

    }


    buttonText.textContent =
        message;

}


/* =========================================================
   ROBOT
========================================================= */

function updateRobot() {

    if (!robotMessage) {
        return;
    }


    let index =
        Math.floor(
            clicks / 15
        );


    index =
        Math.min(
            index,
            robotMessages.length - 1
        );


    robotMessage.textContent =
        robotMessages[index];


    if (robotChestText) {

        if (clicks < 10) {
            robotChestText.textContent =
                "HELP";
        } else if (clicks < 50) {
            robotChestText.textContent =
                "WHY";
        } else if (clicks < 100) {
            robotChestText.textContent =
                "STOP";
        } else if (clicks < 250) {
            robotChestText.textContent =
                "ERROR";
        } else {
            robotChestText.textContent =
                "PANIC";
        }

    }

}


/* =========================================================
   SCORE
========================================================= */

function calculateScore() {

    /*
       Combo makes the score more rewarding.
    */

    return Math.floor(
        clicks *
        10 +
        bestCombo *
        25 +
        Math.max(
            0,
            clicks - 100
        ) *
        3
    );

}


function getUselessnessTitle() {

    if (clicks >= 1000) {
        return "🌱 Touch Grass";
    }

    if (clicks >= 500) {
        return "👹 Absolute Menace";
    }

    if (clicks >= 250) {
        return "💀 Professional Time Waster";
    }

    if (clicks >= 100) {
        return "🗿 Button Enthusiast";
    }

    if (clicks >= 50) {
        return "😂 Amateur Time Waster";
    }

    if (clicks >= 10) {
        return "👀 Getting Curious";
    }

    return "🤨 Beginner Button Waster";

}


/* =========================================================
   UI UPDATE
========================================================= */

function updateEverything() {

    const score =
        calculateScore();


    if (clickCount) {
        clickCount.textContent =
            clicks;
    }


    if (uselessScore) {
        uselessScore.textContent =
            score;
    }


    if (bigScore) {
        bigScore.textContent =
            score;
    }


    if (speedLevel) {
        speedLevel.textContent =
            getSpeedLevel();
    }


    if (analysisTitle) {
        analysisTitle.textContent =
            getUselessnessTitle();
    }


    const progress =
        Math.min(
            100,
            (clicks / 1000) * 100
        );


    if (progressBar) {
        progressBar.style.width =
            `${progress}%`;
    }


    if (progressPercent) {
        progressPercent.textContent =
            `${Math.round(progress)}%`;
    }


    updateRobot();

    checkAchievements();

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function checkAchievements() {

    achievementData.forEach(
        achievement => {

            const element =
                document.getElementById(
                    `achievement${achievement.id}`
                );


            const unlocked =
                clicks >=
                achievement.clicks;


            if (element && unlocked) {

                element.classList.add(
                    "unlocked"
                );

            }


            const key =
                `achievement_${achievement.id}`;


            if (
                unlocked &&
                !localStorage.getItem(key)
            ) {

                localStorage.setItem(
                    key,
                    "true"
                );


                showAchievement(
                    achievement
                );

            }

        }
    );

}


/* =========================================================
   ACHIEVEMENT POPUP
========================================================= */

function showAchievement(
    achievement
) {

    if (
        !achievementPopup ||
        !popupIcon ||
        !popupTitle ||
        !popupDescription
    ) {
        return;
    }


    popupIcon.textContent =
        achievement.icon;


    popupTitle.textContent =
        `🏆 ${achievement.name}`;


    popupDescription.textContent =
        achievement.description;


    achievementPopup.classList.add(
        "show"
    );


    clearTimeout(popupTimer);


    popupTimer =
        setTimeout(
            () => {

                achievementPopup.classList.remove(
                    "show"
                );

            },
            3200
        );

}


/* =========================================================
   RANDOM EVENTS
========================================================= */

function randomEvent() {

    const chance =
        Math.random();


    if (chance < 0.06) {

        screenShake();

        showToast(
            "⚠️ USELESS SYSTEM INSTABILITY"
        );

    } else if (chance < 0.11) {

        surpriseButton();

    } else if (chance < 0.14) {

        fakeCalculation();

    }

}


/* =========================================================
   SCREEN SHAKE
========================================================= */

function screenShake() {

    document.body.classList.add(
        "screen-shake"
    );


    setTimeout(
        () => {

            document.body.classList.remove(
                "screen-shake"
            );

        },
        400
    );

}


/* =========================================================
   BUTTON SURPRISE
========================================================= */

function surpriseButton() {

    if (!button) {
        return;
    }


    button.style.filter =
        "hue-rotate(180deg)";


    setTimeout(
        () => {

            button.style.filter =
                "";

        },
        800
    );


    showToast(
        "🌈 BUTTON COLOR CORRUPTED"
    );

}


/* =========================================================
   FAKE CALCULATION
========================================================= */

function fakeCalculation() {

    if (arenaStatus) {

        arenaStatus.textContent =
            "🧮 CALCULATING USEFULNESS...";

    }


    setTimeout(
        () => {

            if (arenaStatus) {

                arenaStatus.textContent =
                    "❌ USEFULNESS: 0%";

            }

        },
        1000
    );

}


/* =========================================================
   FINAL BOSS
========================================================= */

function startFinalBoss() {

    document.body.classList.add(
        "boss-mode"
    );


    if (buttonText) {

        buttonText.textContent =
            "YOU SHALL NOT CLICK";

    }


    if (arenaStatus) {

        arenaStatus.textContent =
            "👹 FINAL BUTTON MODE ACTIVATED";

    }


    showToast(
        "👹 THE BUTTON HAS HAD ENOUGH."
    );


    playBossSound();

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    setInterval(
        () => {

            if (!gameStarted) {
                return;
            }


            sessionSeconds++;

            updateTimer();

        },
        1000
    );

}


function updateTimer() {

    if (!sessionTimer) {
        return;
    }


    const minutes =
        Math.floor(
            sessionSeconds / 60
        );


    const seconds =
        sessionSeconds % 60;


    sessionTimer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* =========================================================
   COMMENTS
========================================================= */

function updateCharacterCount() {

    if (!commentBox || !characterCount) {
        return;
    }


    characterCount.textContent =
        `${commentBox.value.length} / 150`;

}


function handleComment() {

    if (!commentBox) {
        return;
    }


    const text =
        commentBox.value.trim();


    if (!text) {

        showToast(
            "💬 You need to actually say something."
        );

        return;

    }


    if (commentText) {

        commentText.textContent =
            `“${text}”`;

    }


    const responses = [

        "🤖 I have analyzed your message. It was useless.",

        "🤖 Fascinating. Unfortunately, I do not care.",

        "🤖 Thank you for wasting computational resources.",

        "🤖 Your message has been filed under: WHY.",

        "🤖 Processing... Processing... Nope.",

        "🤖 This conversation has contributed nothing to society.",

        "🤖 I understood approximately 0% of that.",

        "🤖 Excellent. Another completely unnecessary message."

    ];


    const response =
        responses[
            randomNumber(
                0,
                responses.length - 1
            )
        ];


    if (responseText) {

        responseText.textContent =
            response;

    }


    speak(
        text
    );


    setTimeout(
        () => {

            speak(
                response
            );

            computerLaugh();

        },
        900
    );


    commentBox.value =
        "";

    updateCharacterCount();

}


/* =========================================================
   SPEECH
========================================================= */

function speak(text) {

    if (
        !soundEnabled ||
        !("speechSynthesis" in window)
    ) {
        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.rate =
        0.9;

    utterance.pitch =
        0.7;

    utterance.volume =
        1;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   COMPUTER LAUGH
========================================================= */

function computerLaugh() {

    if (!soundEnabled) {
        return;
    }


    const laughs = [
        "HA HA HA HA",
        "HE HE HE",
        "HAHAHAHA",
        "HMMMM... HAHA",
        "BEEP HA HA",
        "ERROR... HAHAHA"
    ];


    speak(
        laughs[
            randomNumber(
                0,
                laughs.length - 1
            )
        ]
    );

}


/* =========================================================
   AUDIO
========================================================= */

function getAudioContext() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return null;
        }


        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


function playTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.04
) {

    if (!soundEnabled) {
        return;
    }


    const ctx =
        getAudioContext();


    if (!ctx) {
        return;
    }


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type =
        type;


    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        volume,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        ctx.destination
    );


    oscillator.start();


    oscillator.stop(
        ctx.currentTime +
        duration
    );

}


function playClickSound() {

    playTone(
        220 +
        Math.min(
            clicks * 3,
            500
        ),
        .08,
        "square",
        .035
    );

}


function playBossSound() {

    playTone(
        90,
        .25,
        "sawtooth",
        .06
    );


    setTimeout(
        () => {

            playTone(
                55,
                .35,
                "sawtooth",
                .05
            );

        },
        130
    );

}


/* =========================================================
   BUTTON FLASH
========================================================= */

function flashButton() {

    if (!button) {
        return;
    }


    button.classList.remove(
        "button-flash"
    );


    void button.offsetWidth;


    button.classList.add(
        "button-flash"
    );

}


/* =========================================================
   LEADERBOARD
========================================================= */

function getLeaderboard() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "uselessLeaderboard"
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveScore() {

    const leaderboard =
        getLeaderboard();


    const score =
        calculateScore();


    leaderboard.push({
        name:
            `Player ${leaderboard.length + 1}`,
        score:
            score,
        clicks:
            clicks,
        date:
            new Date().toLocaleDateString()
    });


    leaderboard.sort(
        (a, b) =>
            b.score -
            a.score
    );


    const top =
        leaderboard.slice(
            0,
            10
        );


    localStorage.setItem(
        "uselessLeaderboard",
        JSON.stringify(top)
    );


    renderLeaderboard();


    showToast(
        "🏅 Score saved locally!"
    );

}


function renderLeaderboard() {

    if (!leaderboardList) {
        return;
    }


    const leaderboard =
        getLeaderboard();


    if (leaderboard.length === 0) {

        leaderboardList.innerHTML = `
            <div class="leaderboard-row">
                <div class="rank">—</div>
                <div class="player-name">
                    Nobody has wasted enough time yet.
                </div>
                <div class="player-score">
                    0
                </div>
            </div>
        `;

        return;

    }


    leaderboardList.innerHTML =
        leaderboard
            .map(
                (player, index) => `
                    <div class="leaderboard-row">

                        <div class="rank">
                            ${getRankIcon(index)}
                        </div>

                        <div class="player-name">
                            ${escapeHTML(player.name)}
                        </div>

                        <div class="player-score">
                            ${player.score}
                        </div>

                    </div>
                `
            )
            .join("");

}


function getRankIcon(index) {

    if (index === 0) {
        return "🥇";
    }

    if (index === 1) {
        return "🥈";
    }

    if (index === 2) {
        return "🥉";
    }

    return index + 1;

}


/* =========================================================
   RESET
========================================================= */

function resetGame() {

    const confirmed =
        window.confirm(
            "Reset this useless session?"
        );


    if (!confirmed) {
        return;
    }


    clicks = 0;

    combo = 0;

    bestCombo = 0;

    sessionSeconds = 0;

    gameStarted = false;


    localStorage.removeItem(
        "uselessClicks"
    );

    localStorage.removeItem(
        "bestCombo"
    );


    achievementData.forEach(
        achievement => {

            localStorage.removeItem(
                `achievement_${achievement.id}`
            );

        }
    );


    document.body.classList.remove(
        "boss-mode"
    );


    if (buttonText) {

        buttonText.textContent =
            "CLICK ME";

    }


    if (comboDisplay) {

        comboDisplay.textContent =
            "";

    }


    if (arenaStatus) {

        arenaStatus.textContent =
            "The button is suspiciously calm...";

    }


    if (button) {

        button.style.left =
            "50%";

        button.style.top =
            "50%";

    }


    if (commentText) {

        commentText.textContent =
            "Your comment will appear here...";

    }


    if (responseText) {

        responseText.textContent =
            "🤖 Waiting for something completely unnecessary...";

    }


    updateEverything();

    updateTimer();

    showToast(
        "🔄 New useless session started!"
    );

}


/* =========================================================
   SOUND TOGGLE
========================================================= */

function toggleSound() {

    soundEnabled =
        !soundEnabled;


    localStorage.setItem(
        "soundEnabled",
        String(soundEnabled)
    );


    updateSoundButton();


    if (!soundEnabled) {

        window.speechSynthesis?.cancel();

    }

}


function updateSoundButton() {

    if (!soundButton) {
        return;
    }


    soundButton.textContent =
        soundEnabled
            ? "🔊 SOUND ON"
            : "🔇 SOUND OFF";

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast || !toastText) {
        return;
    }


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
        2200
    );

}


/* =========================================================
   HELPERS
========================================================= */

function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}