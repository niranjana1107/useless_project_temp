/* =====================================================
   WANDER.AI — AI TRAVEL PLANNER DASHBOARD
   Design Inspired by Sk Nayeem for ZERO STUDIO (Dribbble)
   Complete Interactive Logic & AI Travel Engine
===================================================== */

// State
let activeDestinationKey = "kyoto";
let activeDayNumber = 1;
let wishlistItems = new Set(["kyoto", "amalfi", "bali"]);

/* =====================================================
   DESTINATION DATABASE & MULTI-DAY ITINERARIES
===================================================== */
<<<<<<< HEAD
const DESTINATIONS = {
    kyoto: {
        title: "Kyoto & Kansai Heritage Tour",
        dates: "Oct 18 — Oct 25, 2026 • 7 Days • 2 Travelers",
        weather: "19°C • Partly Cloudy in Kyoto",
        backdrop: "assets/destination-kyoto.jpg",
        headline: "Kyoto Autumn Culture & Gastronomy",
        summary: "3-Day Deep Dive • Optimized for minimum transit & golden-hour lighting.",
        budget: "$2,450",
        readiness: "85%",
        days: {
            1: {
                theme: "Arrival & Lantern Alleys",
                items: [
                    {
                        time: "10:30 AM",
                        icon: "✈️",
                        title: "Haruka Express to Kyoto Station",
                        desc: "High-speed scenic transit from Kansai International Airport with reserved scenic green-car seating.",
                        tag: "Transit • 75m",
                        tip: "Pick up an ICOCA transit card at platform 4 for seamless travel on Kyoto buses and subways."
                    },
                    {
                        time: "01:30 PM",
                        icon: "🏨",
                        title: "Check-in at Gion Machiya Ryokan",
                        desc: "Traditional wooden townhouse retreat with tatami suites, cedar wood ofuro soaking bath, and private zen garden.",
                        tag: "Lodging • Gion District",
                        tip: "Complimentary green tea ceremony and wagashi sweets served at 4 PM in the courtyard."
                    },
                    {
                        time: "04:30 PM",
                        icon: "⛩️",
                        title: "Yasaka Shrine & Shirakawa Canal Stroll",
                        desc: "Golden-hour stroll along willow-lined stone streets. Spot apprentice Geiko (Maiko) on their evening commute.",
                        tag: "Sightseeing • 2h",
                        tip: "Best photo opportunity is looking toward Yasaka Pagoda from the top of Ninenzaka slope at dusk."
                    },
                    {
                        time: "07:30 PM",
                        icon: "🍜",
                        title: "Dinner at Gion Duck Noodles",
                        desc: "Hidden Michelin-listed ramen bar identified only by emoji icons. Specializes in duck broth infused with sansho pepper.",
                        tag: "Gastronomy • Reservation Confirmed",
                        tip: "Order the duck tsukemen dipping noodles paired with cold Kyoto craft draft beer."
                    }
                ]
=======

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

const robotStatus =
    document.getElementById("robotStatus");

const robotMessage =
    document.getElementById("robotMessage");

const robotChestText =
    document.getElementById("robotChestText");

const cryingRobot =
    document.getElementById("cryingRobot");
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
    // Keep button red - no colour change
    uselessButton.style.background =
        "radial-gradient(circle at 35% 30%,#ff6078,#ff304f 40%,#9e1029 100%)";

    uselessButton.style.boxShadow =
        "0 0 0 8px rgba(255,48,79,.05),0 0 40px rgba(255,48,79,.3),0 18px 45px rgba(0,0,0,.5)";
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

    if (clicks <= 5) return 0;
    if (clicks <= 6) return 1;
    if (clicks <= 12) return 2;
    if (clicks <= 18) return 3;
    if (clicks <= 30) return 4;
    if (clicks <= 45) return 5;

    return 6;
}

function getEscapeDifficulty() {

    if (clicks <= 5) return 0;
    if (clicks <= 6) return 0.25;
    if (clicks <= 12) return 0.45;
    if (clicks <= 18) return 0.2;
    if (clicks <= 30) return 0.65;
    if (clicks <= 45) return 0.9;

        return 1;
}

function getEscapeSpeed() {

        if (clicks <= 5) return 0;
        if (clicks <= 6) return 1;
        if (clicks <= 12) return 1.5;
        if (clicks <= 18) return 0.5;
        if (clicks <= 30) return 3;
        if (clicks <= 45) return 5;

        return 8;
}

function getDifficultyLabel(level) {

    const labels = [
        "CALM",
        "GENTLE",
        "EASY",
        "EASY",
        "MODERATE",
        "ADVANCED",
        "UNDEFEATABLE"
    ];

    return labels[level] || "UNDEFEATABLE";
}

/* =====================================================
}
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
            `${getDifficultyLabel(level)} MODE // LEVEL ${level}`;
    }

    updateAnalysis(score, level);
}

function updateCommentator() {

    if (!robotStatus || !robotMessage || !robotChestText) return;

    const level = getSpeedLevel();
    const reactions = [
        ["SPEECHLESS", "You're really clicking a useless button? Bold life choice.", "WOW"],
        ["DISGUSTED", "That's the dumbest click I've ever witnessed.", "CRINGE"],
        ["APPALLED", "I've seen more coordination in a potato.", "YIKES"],
        ["HORRIFIED", "Your mouse skills are making me question your existence.", "TRAGIC"],
        ["MELTDOWN", "Please seek help. Seriously. Get a hobby.", "DOOMED"],
        ["EXISTENTIAL CRISIS", "I'm an AI and even I'm more useful than this situation.", "WHY?"],
        ["DEAD INSIDE", "Congratulations, you've achieved peak uselessness. You're a legend."]
    ];

    const reaction = reactions[level];

    robotStatus.textContent = reaction[0];
    robotMessage.innerHTML = `<span>🤖</span> ${reaction[1]}`;
    robotChestText.textContent = reaction[2];

    if (cryingRobot) {
        cryingRobot.classList.add("robot-visible");
    }
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

    if (clicks < 6) {
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
        6 +
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


    const escapeSpeed =
        getEscapeSpeed();

    const duration =
        Math.max(
            120,
            500 -
            escapeSpeed * 40
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
                `${getDifficultyLabel(getSpeedLevel())} MODE // LEVEL ${getSpeedLevel()}`;

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

if (commentBox && commentButton) {

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

>>>>>>> fd71e1a995b8e5daa61be1fcebb1358dcfc530d1
            },
            2: {
                theme: "Torii Gates & Bamboo Grove",
                items: [
                    {
                        time: "06:30 AM",
                        icon: "⛩️",
                        title: "Early Dawn at Fushimi Inari Taisha",
                        desc: "Beat the crowds through the famous 10,000 vermilion torii gates stretching up the sacred forested mountain.",
                        tag: "Must-See • 2.5h",
                        tip: "Most tourists stop at the halfway lookout. Continue 15 minutes further to the quiet summit for mist-covered views."
                    },
                    {
                        time: "10:30 AM",
                        icon: "🍵",
                        title: "Artisanal Matcha Tasting at Uji Cafe",
                        desc: "Single-origin ceremonial matcha whisked tableside paired with black sesame daifuku mochi.",
                        tag: "Culinary Break",
                        tip: "Ask for the hand-picked 2026 spring harvest Gyokuro blend."
                    },
                    {
                        time: "01:00 PM",
                        icon: "🎋",
                        title: "Arashiyama Bamboo Forest & Sagano Scenic Train",
                        desc: "Walk beneath towering green bamboo stalks followed by an open-air romantic train ride through Hozu Gorge.",
                        tag: "Nature & Train • 3h",
                        tip: "Enter Tenryu-ji Temple's north gate directly into the quietest section of the bamboo forest."
                    },
                    {
                        time: "06:30 PM",
                        icon: "🍣",
                        title: "Kaiseki Multi-Course Banquet by the Kamogawa River",
                        desc: "9-course seasonal dining experience featuring Wagyu beef, yuba tofu skin, and autumn sweetfish.",
                        tag: "Fine Dining • River Terrace",
                        tip: "Outdoor river platform (kawayuka) seating is pre-reserved under your WanderAI concierge pass."
                    }
                ]
            },
            3: {
                theme: "Golden Pavilion & Tea Ritual",
                items: [
                    {
                        time: "09:00 AM",
                        icon: "✨",
                        title: "Kinkaku-ji (The Golden Pavilion)",
                        desc: "Marvel at the top two floors completely covered in gold leaf, reflecting impeccably across the mirror pond.",
                        tag: "UNESCO Site • 1.5h",
                        tip: "Arrive right at opening to catch morning sunlight hitting the gold leaf facade."
                    },
                    {
                        time: "11:30 AM",
                        icon: "🪨",
                        title: "Ryoan-ji Zen Rock Garden Meditation",
                        desc: "Japan's most famous dry landscape garden featuring 15 stones arranged so you can never see all at once.",
                        tag: "Zen Culture • 1h",
                        tip: "Sit quietly on the wooden veranda and contemplate the garden's mystery."
                    },
                    {
                        time: "02:30 PM",
                        icon: "🏮",
                        title: "Private Tea Ceremony with a 15th-Gen Master",
                        desc: "Immersive 90-minute workshop on the philosophical principles of Wa, Kei, Sei, Jaku (Harmony, Respect, Purity, Tranquility).",
                        tag: "Cultural Masterclass",
                        tip: "Wear comfortable socks as shoes must be removed before entering the tearoom."
                    },
                    {
                        time: "06:00 PM",
                        icon: "🛍️",
                        title: "Pontocho Alley Izakaya Crawl & Sake Tasting",
                        desc: "Conclude your Kyoto adventure exploring narrow atmospheric alleys buzzing with craft breweries and yakitori grills.",
                        tag: "Nightlife & Sake",
                        tip: "Try local Junmai Daiginjo sake brewed using Kyoto Fushimi soft underground spring water."
                    }
                ]
            }
        }
    },
    swiss: {
        title: "Zermatt & Matterhorn Alpine Expedition",
        dates: "Nov 04 — Nov 11, 2026 • 7 Days • 2 Travelers",
        weather: "-2°C • Crisp & Sunny in Zermatt",
        backdrop: "assets/destination-swiss.jpg",
        headline: "Swiss Alps Luxury Ski & Scenic Railway",
        summary: "3-Day High-Alpine Route • Panoramic cogwheel railways, glacier trekking, and fondue chalets.",
        budget: "$3,680",
        readiness: "92%",
        days: {
            1: {
                theme: "Gornergrat Peak & Matterhorn Vista",
                items: [
                    {
                        time: "09:00 AM",
                        icon: "🚂",
                        title: "Gornergrat Cogwheel Railway Ascent",
                        desc: "Europe's highest open-air cogwheel train climbing from Zermatt to Gornergrat summit at 3,089 meters.",
                        tag: "Scenic Rail • 40m",
                        tip: "Sit on the right side of the train for uninterrupted views of the Matterhorn during the climb."
                    },
                    {
                        time: "11:30 AM",
                        icon: "🏔️",
                        title: "Rotenboden Reflection Walk to Lake Riffelsee",
                        desc: "Gentle 15-minute downhill walk to capture the world-famous mirror reflection of Matterhorn in crystal alpine waters.",
                        tag: "Alpine Walk • 1.5h",
                        tip: "Morning winds are calmest, offering glass-like mirror water reflections."
                    },
                    {
                        time: "02:00 PM",
                        icon: "🏨",
                        title: "Check-in at Mont Cervin Palace Chalet",
                        desc: "Luxury 5-star Swiss alpine chalet with open fireplaces, outdoor heated alpine pools, and spa suites.",
                        tag: "Luxury Lodging",
                        tip: "Enjoy afternoon glühwein on the heated panoramic balcony."
                    },
                    {
                        time: "07:00 PM",
                        icon: "🧀",
                        title: "Traditional Valais Fondue Feast at Ferdinand",
                        desc: "Cozy wood-paneled restaurant serving molten Gruyère and Vacherin cheeses with crusty sourdough and dried meats.",
                        tag: "Gastronomy • Chalet Ferdinand",
                        tip: "Pair with a crisp Swiss white wine like Fendant du Valais for proper digestion."
                    }
                ]
            },
            2: {
                theme: "Matterhorn Glacier Paradise",
                items: [
                    {
                        time: "09:30 AM",
                        icon: "🚠",
                        title: "Matterhorn Glacier Ride 3S Cable Car",
                        desc: "Ride the world's highest 3S cableway with Swarovski crystal glass floors to 3,883 meters.",
                        tag: "Cable Car • High Alpine",
                        tip: "Keep camera batteries warm inside your jacket; sub-zero temperatures drain batteries fast."
                    },
                    {
                        time: "11:30 AM",
                        icon: "🧊",
                        title: "Walk Through the Natural Glacier Ice Palace",
                        desc: "Trek 15 meters below the glacier surface into ethereal blue ice tunnels lined with ice sculptures.",
                        tag: "Glacier Cave",
                        tip: "Wear insulated hiking boots with high-traction rubber soles."
                    },
                    {
                        time: "03:00 PM",
                        icon: "⛷️",
                        title: "Afternoon Ski Run into Cervinia (Italy)",
                        desc: "Cross-border skiing on endless powder slopes connecting Switzerland into Italian alpine valleys.",
                        tag: "Skiing & Snowboard",
                        tip: "Don't forget your passport in your ski jacket when skiing across the Italian border!"
                    },
                    {
                        time: "07:30 PM",
                        icon: "🥂",
                        title: "Apres-Ski & Fireplace Dining at Chez Vrony",
                        desc: "Historic farmhouse nestled in Findeln serving dry-aged mountain beef and organic alpine herbs.",
                        tag: "Fine Dining • 2,100m",
                        tip: "Reserve early for the sunset view table overlooking the Matterhorn north face."
                    }
                ]
            },
            3: {
                theme: "5 Lakes Scenic Trail & Sunnegga",
                items: [
                    {
                        time: "09:00 AM",
                        icon: "🚡",
                        title: "Funicular to Sunnegga Paradise",
                        desc: "Underground funicular rushing through the mountain rock in just 4.5 minutes into a sunny alpine terrace.",
                        tag: "Funicular Rail",
                        tip: "Sunnegga is famous as Zermatt's sunniest perch."
                    },
                    {
                        time: "11:00 AM",
                        icon: "🥾",
                        title: "Stellisee & Grindjisee Lake Loop",
                        desc: "Hike along glacial moraines through larch pine forests reflecting the rugged peak of the Matterhorn.",
                        tag: "Hiking • 2.5h",
                        tip: "Look out for wild marmots sunning themselves on the flat boulders."
                    },
                    {
                        time: "02:30 PM",
                        icon: "🧖",
                        title: "Alpine Herb Sauna & Heated Thermal Pool",
                        desc: "Soothe tired muscles with mountain arnica oils, eucalyptus steam rooms, and panoramic mountain hot tubs.",
                        tag: "Wellness Spa",
                        tip: "The outdoor infinity pool is heated to 38°C with snow right at your fingertips."
                    },
                    {
                        time: "06:30 PM",
                        icon: "🍷",
                        title: "Farewell Alpine Raclette & Swiss Wine Tasting",
                        desc: "Sample artisanal mountain cheeses scraped warm onto roasted potatoes with cornichons and cured bindenfleisch.",
                        tag: "Local Culinary",
                        tip: "Ask the sommelier to introduce you to rare Petite Arvine grapes from Upper Valais."
                    }
                ]
            }
        }
    },
    amalfi: {
        title: "Amalfi Coast & Positano Coastal Romance",
        dates: "Jun 12 — Jun 19, 2027 • 7 Days • 2 Travelers",
        weather: "26°C • Sunny & Balmy in Positano",
        backdrop: "assets/destination-amalfi.jpg",
        headline: "Amalfi Coastline & Capri Private Yachting",
        summary: "3-Day Italian Riviera Route • Pastel cliffside villas, private wooden gozzo boats, and Michelin cliffside dining.",
        budget: "$3,200",
        readiness: "78%",
        days: {
            1: {
                theme: "Positano Cliffside Arrival & Sunset",
                items: [
                    {
                        time: "11:00 AM",
                        icon: "🚗",
                        title: "Scenic Coastal Drive from Naples to Positano",
                        desc: "Private chauffeured Mercedes cruising the iconic winding cliffside road suspended high above the turquoise sea.",
                        tag: "Scenic Drive • 90m",
                        tip: "Have the driver stop at the famous roadside Madonnina fruit stall for freshly squeezed blood orange granita."
                    },
                    {
                        time: "01:30 PM",
                        icon: "🏨",
                        title: "Check-in at Le Sirenuse or Villa Franca",
                        desc: "Luxury cliffside boutique hotel with bougainvillea draped terraces, antique tiles, and jaw-dropping views of Positano bay.",
                        tag: "Luxury Stay",
                        tip: "Book room with a sea-facing balcony to catch the sunset glow over the pastel houses."
                    },
                    {
                        time: "04:30 PM",
                        icon: "🛍️",
                        title: "Stroll Down to Spiaggia Grande Beach",
                        desc: "Wander down winding pedestrian staircases lined with linen boutiques, ceramic workshops, and lemon groves.",
                        tag: "Walking Tour • 2h",
                        tip: "Wear comfortable leather sandals or flats; Positano is made entirely of stairways."
                    },
                    {
                        time: "08:00 PM",
                        icon: "🍝",
                        title: "Candlelight Dinner at Ristorante Chez Black",
                        desc: "Iconic beachfront dining favorite serving heart-shaped margherita pizza, sea urchin spaghetti, and freshly caught branzino.",
                        tag: "Seafood • Beachfront",
                        tip: "Finish with a glass of ice-cold house limoncello made from handpicked Amalfi sfusato lemons."
                    }
                ]
            },
            2: {
                theme: "Private Wooden Gozzo Boat to Capri",
                items: [
                    {
                        time: "09:30 AM",
                        icon: "🛥️",
                        title: "Boarding Private Riva Yacht at Positano Pier",
                        desc: "Depart across the sparkling Tyrrhenian Sea towards the legendary island of Capri with private skipper.",
                        tag: "Boat Charter • Full Day",
                        tip: "Your charter includes chilled Prosecco, fresh seasonal figs, and snorkeling gear."
                    },
                    {
                        time: "11:30 AM",
                        icon: "🌊",
                        title: "Swim Through the Faraglioni Sea Stacks",
                        desc: "Glide under the famous natural rock arch and dive into transparent emerald coves for cliff swimming.",
                        tag: "Capri Coast",
                        tip: "Tradition says kissing your loved one under the Faraglioni arch brings eternal love."
                    },
                    {
                        time: "01:30 PM",
                        icon: "🦞",
                        title: "Lunch at La Fontelina Beach Club Capri",
                        desc: "Dine on rocks beneath blue-and-white umbrellas with views of the Faraglioni. Enjoy spaghetti alle vongole and sangria.",
                        tag: "Capri Hotspot • Reserved",
                        tip: "Table reservations are extremely exclusive; WanderAI VIP desk has guaranteed prime seating."
                    },
                    {
                        time: "06:30 PM",
                        icon: "🌅",
                        title: "Sunset Cruise Back with Prosecco Toast",
                        desc: "Watch the sun dip below the Li Galli islands casting a brilliant golden-purple hue across Positano's cliffside.",
                        tag: "Golden Hour Cruise",
                        tip: "Ideal lighting for portrait photography against the glowing cliffs."
                    }
                ]
            },
            3: {
                theme: "Path of the Gods & Ravello Gardens",
                items: [
                    {
                        time: "08:30 AM",
                        icon: "🥾",
                        title: "Sentiero degli Dei (Path of the Gods)",
                        desc: "Hike the legendary panoramic mountain trail 650m above the ocean with cliffside views stretching all the way to Capri.",
                        tag: "Cliffside Hike • 3h",
                        tip: "Start from Bomerano and hike toward Nocelle for a gentle downhill gradient and sea views ahead."
                    },
                    {
                        time: "01:00 PM",
                        icon: "🍕",
                        title: "Lunch at Trattoria Santa Croce in Nocelle",
                        desc: "Rustic mountain terrace serving handmade gnocchi alla Sorrentina, wood-fired focaccia, and fresh ricotta.",
                        tag: "Mountain Trattoria",
                        tip: "Try the lemon tiramisu — lighter and more fragrant than the classic version."
                    },
                    {
                        time: "04:00 PM",
                        icon: "🏛️",
                        title: "Visit Villa Cimbrone & Infinity Terrace in Ravello",
                        desc: "Stroll classical statues overlooking the Gulf of Salerno from the dramatic 'Terrace of Infinity'.",
                        tag: "Historic Garden",
                        tip: "Often called the most breathtaking viewpoint on earth by historic poets."
                    },
                    {
                        time: "08:00 PM",
                        icon: "🍷",
                        title: "Fine Dining at Ristorante Rossellinis",
                        desc: "Michelin-starred culinary masterpiece perched on a cliff ledge in Ravello.",
                        tag: "Michelin Star",
                        tip: "Choose the 7-course Chef's Amalfi Coast Odyssey tasting menu with Campania wine pairing."
                    }
                ]
            }
        }
    },
    bali: {
        title: "Ubud Bali Tropical Rainforest Retreat",
        dates: "Jul 15 — Jul 22, 2027 • 7 Days • 2 Travelers",
        weather: "28°C • Warm & Gentle Breeze in Ubud",
        backdrop: "assets/destination-bali.jpg",
        headline: "Bali Jungle Sanctuary & Wellness Expedition",
        summary: "3-Day Tropical Sanctuary • Private infinity pool villas, cascading jungle waterfalls, and sacred temples.",
        budget: "$1,650",
        readiness: "80%",
        days: {
            1: {
                theme: "Jungle Villa & Sacred Monkey Forest",
                items: [
                    {
                        time: "11:00 AM",
                        icon: "🚗",
                        title: "Scenic Transfer into Ubud Valley",
                        desc: "Private air-conditioned transfer winding past emerald rice paddies and stone carving artisan villages.",
                        tag: "Transfer • 60m",
                        tip: "Stop at a traditional Luwak coffee plantation on the way to sample Bali spices."
                    },
                    {
                        time: "01:00 PM",
                        icon: "🏨",
                        title: "Check-in at Hanging Gardens of Bali Villa",
                        desc: "Multi-tiered infinity pool cantilevered over mist-covered jungle ravines with private bamboo sundecks.",
                        tag: "Eco-Luxury Resort",
                        tip: "Take a dip in the world's most famous twin-tiered jungle infinity pool."
                    },
                    {
                        time: "04:00 PM",
                        icon: "🐒",
                        title: "Sacred Monkey Forest Sanctuary Stroll",
                        desc: "Walk through mossy 14th-century temple ruins beneath banyan trees populated by over 1,000 Balinese macaques.",
                        tag: "Sanctuary • 1.5h",
                        tip: "Secure sunglasses and shiny accessories inside your backpack before entering."
                    },
                    {
                        time: "07:30 PM",
                        icon: "🥥",
                        title: "Organic Farm-to-Table Dinner at Moksa",
                        desc: "Culinary feast crafted from freshly harvested permaculture gardens, coconut curries, and jackfruit rendang.",
                        tag: "Farm-to-Table Dining",
                        tip: "Try the raw cacao and spiced coconut dessert tart."
                    }
                ]
            },
            2: {
                theme: "Tegalalang Terraces & Hidden Waterfall",
                items: [
                    {
                        time: "06:30 AM",
                        icon: "🌾",
                        title: "Sunrise Walk at Tegalalang Rice Terraces",
                        desc: "Beat the tropical heat and watch golden morning light pierce through morning mist across the sculpted green terraces.",
                        tag: "Sunrise • 2h",
                        tip: "Donate a small 10,000 IDR token to local farmers maintaining the UNESCO subak irrigation system."
                    },
                    {
                        time: "10:00 AM",
                        icon: "🌊",
                        title: "Swim at Tibumana & Kanto Lampo Waterfalls",
                        desc: "Dive into cool mountain pools surrounded by hanging vines and wild tropical orchids.",
                        tag: "Nature Swim",
                        tip: "Bring a waterproof phone pouch for photos behind the waterfall veil."
                    },
                    {
                        time: "02:00 PM",
                        icon: "🧘",
                        title: "Sound Healing & Yoga at The Yoga Barn",
                        desc: "Tibetan singing bowl sound bath meditation in an open-air teak wood shala overlooking lotus ponds.",
                        tag: "Wellness • 90m",
                        tip: "Arrive 20 minutes early to secure a mat in the breezy front row."
                    },
                    {
                        time: "07:00 PM",
                        icon: "🔥",
                        title: "Dinner & Fire Dance (Kecak) Performance",
                        desc: "Mesmerizing 50-man choir chanting rhythmic chorus around sacred flames at Pura Dalem temple.",
                        tag: "Cultural Performance",
                        tip: "The performance depicts the ancient Ramayana epic battle."
                    }
                ]
            },
            3: {
                theme: "Mount Batur Volcano & Hot Springs",
                items: [
                    {
                        time: "03:30 AM",
                        icon: "🌋",
                        title: "Mount Batur Sunrise Summit Trek",
                        desc: "Moderate guided 2-hour ascent by flashlight up an active volcano to watch the sunrise above cloud inversions.",
                        tag: "Volcano Trek",
                        tip: "Your local guide will cook breakfast eggs using natural volcanic steam vents at the summit."
                    },
                    {
                        time: "09:00 AM",
                        icon: "♨️",
                        title: "Batur Natural Hot Springs Soak",
                        desc: "Thermal mineral pools perched on the edge of Lake Batur with panoramic views of volcanic caldera ridges.",
                        tag: "Thermal Soak • 2h",
                        tip: "The natural sulfur and mineral content relaxes muscles after the early morning trek."
                    },
                    {
                        time: "01:30 PM",
                        icon: "🎨",
                        title: "Ubud Traditional Art Market & Palace",
                        desc: "Browse handwoven rattan bags, batik silks, and silver jewelry directly from local family craftsmen.",
                        tag: "Artisan Shopping",
                        tip: "Bargain with a friendly smile — counter with roughly 50-60% of the initial quoted price."
                    },
                    {
                        time: "07:00 PM",
                        icon: "🍹",
                        title: "Cocktails & Tasting Menu at Locavore NXT",
                        desc: "Hyper-local avant-garde culinary experience celebrating indigenous Indonesian archipelago ingredients.",
                        tag: "Top 50 Asia Restaurant",
                        tip: "Order the signature fermentation-based cocktail pairing."
                    }
                ]
            }
        }
    }
};

/* =====================================================
   AESTHETIC SCENERY BACKGROUND SYSTEM
===================================================== */
let currentScenery = localStorage.getItem("preferred_scenery") || "aurora";

function setScenery(themeName) {
    const slides = {
        aurora: document.getElementById("sceneryAurora"),
        sakura: document.getElementById("scenerySakura"),
        sunset: document.getElementById("scenerySunset")
    };

    if (!slides[themeName]) themeName = "aurora";
    currentScenery = themeName;
    localStorage.setItem("preferred_scenery", themeName);

    // Update active slide
    Object.keys(slides).forEach((key) => {
        if (slides[key]) {
            if (key === themeName) {
                slides[key].classList.add("active");
            } else {
                slides[key].classList.remove("active");
            }
        }
    });

    // Update chip buttons
    const chips = document.querySelectorAll(".scenery-chip");
    chips.forEach((chip) => {
        if (chip.getAttribute("data-scenery") === themeName) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });

    // Reset particles for the active theme
    initParticles();
}

function initScenerySwitcher() {
    const chips = document.querySelectorAll(".scenery-chip");
    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const theme = chip.getAttribute("data-scenery");
            if (theme) {
                setScenery(theme);
                showToast(`Scenery: ${chip.querySelector(".scenery-chip-text")?.textContent || theme}`);
            }
        });
    });

    setScenery(currentScenery);
}

/* =====================================================
   AMBIENT SCENERY PARTICLE CANVAS
===================================================== */
const sceneryCanvas = document.getElementById("sceneryCanvas");
let sceneryCtx = null;
let particles = [];
let animFrameId = null;

class SceneryParticle {
    constructor(w, h, theme) {
        this.reset(w, h, theme);
        this.y = Math.random() * h;
    }

    reset(w, h, theme) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 20;
        this.theme = theme;
        this.alpha = Math.random() * 0.55 + 0.2;
        this.fadeSpeed = 0.004 + Math.random() * 0.005;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;

        if (theme === "sakura") {
            this.size = Math.random() * 3.2 + 2.2;
            this.speedY = -(0.45 + Math.random() * 0.7);
            this.speedX = (Math.random() - 0.4) * 0.7;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.025;
            this.color = Math.random() > 0.35 ? "rgba(255, 185, 218," : "rgba(255, 225, 240,";
        } else if (theme === "sunset") {
            this.size = Math.random() * 2.2 + 1.1;
            this.speedY = -(0.5 + Math.random() * 0.9);
            this.speedX = (Math.random() - 0.5) * 0.45;
            this.color = Math.random() > 0.45 ? "rgba(255, 175, 75," : "rgba(255, 95, 165,";
        } else {
            // aurora
            this.size = Math.random() * 2.4 + 1.2;
            this.speedY = -(0.35 + Math.random() * 0.65);
            this.speedX = (Math.random() - 0.5) * 0.35;
            const colors = [
                "rgba(64, 233, 255,",
                "rgba(140, 92, 255,",
                "rgba(64, 255, 180,",
                "rgba(255, 245, 190,"
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
    }

    update(w, h) {
        this.y += this.speedY;
        this.x += this.speedX;

        this.alpha += this.fadeSpeed * this.fadeDirection;
        if (this.alpha > 0.85) {
            this.alpha = 0.85;
            this.fadeDirection = -1;
        } else if (this.alpha < 0.1) {
            this.alpha = 0.1;
            this.fadeDirection = 1;
        }

        if (this.theme === "sakura") {
            this.rotation += this.rotationSpeed;
            this.speedX += Math.sin(this.y * 0.015) * 0.015;
        }

        if (this.y < -30 || this.x < -30 || this.x > w + 30) {
            this.reset(w, h, this.theme);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.shadowColor = this.color.replace(",", ", 0.7)");
        ctx.shadowBlur = this.size * 3;

        if (this.theme === "sakura") {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 1.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

function initParticles() {
    if (!sceneryCanvas) return;
    const w = (sceneryCanvas.width = window.innerWidth);
    const h = (sceneryCanvas.height = window.innerHeight);
    const count = Math.min(Math.max(Math.floor(w / 35), 20), 45);

    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new SceneryParticle(w, h, currentScenery));
    }
}

function animateParticles() {
    if (!sceneryCanvas || !sceneryCtx) return;
    sceneryCtx.clearRect(0, 0, sceneryCanvas.width, sceneryCanvas.height);

    const w = sceneryCanvas.width;
    const h = sceneryCanvas.height;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw(sceneryCtx);
    }

    animFrameId = requestAnimationFrame(animateParticles);
}

function startSceneryAnimation() {
    if (!sceneryCanvas) return;
    sceneryCtx = sceneryCanvas.getContext("2d");
    initParticles();
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(animateParticles);

    window.addEventListener("resize", () => {
        if (!sceneryCanvas) return;
        sceneryCanvas.width = window.innerWidth;
        sceneryCanvas.height = window.innerHeight;
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (animFrameId) cancelAnimationFrame(animFrameId);
        } else {
            animFrameId = requestAnimationFrame(animateParticles);
        }
    });
}

/* =====================================================
   ITINERARY RENDERING ENGINE
===================================================== */
function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    if (!container) return;

    const destination = DESTINATIONS[activeDestinationKey];
    if (!destination) return;

    const dayData = destination.days[activeDayNumber];
    if (!dayData) return;

    // Update headlines
    const headline = document.getElementById("itineraryHeadline");
    const summary = document.getElementById("itinerarySummary");
    if (headline) headline.textContent = destination.headline;
    if (summary) summary.textContent = destination.summary;

    // Render items
    container.innerHTML = "";
    dayData.items.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.style.animationDelay = `${idx * 0.08}s`;

        div.innerHTML = `
            <div class="timeline-marker">${item.icon}</div>
            <div class="timeline-meta">
                <span class="time-pill">${item.time}</span>
                <span class="duration-tag">${item.tag}</span>
            </div>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <div class="ai-tip-box">
                <span class="tip-icon">💡</span>
                <span><strong>AI Local Secret:</strong> ${item.tip}</span>
            </div>
        `;

        container.appendChild(div);
    });

    // Update Day Tab active states and labels
    const tabs = document.querySelectorAll(".day-tab");
    tabs.forEach((tab, index) => {
        const dNum = index + 1;
        if (dNum === activeDayNumber) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }

        const subText = tab.querySelector(".tab-theme");
        if (subText && destination.days[dNum]) {
            subText.textContent = destination.days[dNum].theme;
        }
    });
}

function selectDestination(destKey, shouldScroll = false) {
    if (!DESTINATIONS[destKey]) return;
    activeDestinationKey = destKey;
    activeDayNumber = 1;

    const dest = DESTINATIONS[destKey];

    // Update Spotlight Card
    const spotlightTitle = document.getElementById("spotlightTitle");
    const spotlightDates = document.getElementById("spotlightDates");
    const weatherDisplay = document.getElementById("weatherDisplay");
    const spotlightBackdrop = document.getElementById("spotlightBackdrop");
    const statTotalBudget = document.getElementById("statTotalBudget");

    if (spotlightTitle) spotlightTitle.textContent = dest.title;
    if (spotlightDates) spotlightDates.textContent = dest.dates;
    if (weatherDisplay) weatherDisplay.textContent = dest.weather;
    if (statTotalBudget) statTotalBudget.textContent = dest.budget;

    if (spotlightBackdrop) {
        spotlightBackdrop.style.backgroundImage = `url('${dest.backdrop}')`;
    }

    renderTimeline();

    if (shouldScroll) {
        const itinerarySec = document.getElementById("itinerarySection");
        if (itinerarySec) {
            itinerarySec.scrollIntoView({ behavior: "smooth" });
        }
    }
}

/* =====================================================
   AI PROMPT GENERATOR FORM
===================================================== */
function initAiGenerator() {
    const form = document.getElementById("aiPromptForm");
    const input = document.getElementById("aiPromptInput");
    const spinner = document.getElementById("generateSpinner");
    const btn = document.getElementById("btnGenerateTrip");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        // Show loading state
        if (spinner) spinner.classList.remove("hidden");
        if (btn) btn.disabled = true;

        setTimeout(() => {
            if (spinner) spinner.classList.add("hidden");
            if (btn) btn.disabled = false;

            // Smart destination matching
            if (query.includes("swiss") || query.includes("zermatt") || query.includes("ski")) {
                selectDestination("swiss", true);
            } else if (query.includes("amalfi") || query.includes("positano") || query.includes("italy")) {
                selectDestination("amalfi", true);
            } else if (query.includes("bali") || query.includes("ubud") || query.includes("tropical")) {
                selectDestination("bali", true);
            } else {
                selectDestination("kyoto", true);
            }

            showToast("✨ AI synthesized your personalized multi-day itinerary!");
        }, 650);
    });

    // Vibe prompt chip clicks
    const vibeChips = document.querySelectorAll(".vibe-chip");
    vibeChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const promptText = chip.getAttribute("data-prompt");
            if (promptText) {
                input.value = promptText;
                form.dispatchEvent(new Event("submit"));
            }
        });
    });
}

/* =====================================================
   INTERACTIVE COPILOT DRAWER & CHAT
===================================================== */
function initCopilot() {
    const drawer = document.getElementById("copilotDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    const openBtn1 = document.getElementById("topbarCopilotBtn");
    const openBtn2 = document.getElementById("btnOpenCopilotSidebar");
    const closeBtn = document.getElementById("btnCloseCopilot");
    const form = document.getElementById("copilotForm");
    const input = document.getElementById("copilotInput");
    const messages = document.getElementById("copilotMessages");

    function openDrawer() {
        if (drawer) drawer.classList.add("open");
        if (backdrop) backdrop.classList.add("active");
        if (input) input.focus();
    }

    function closeDrawer() {
        if (drawer) drawer.classList.remove("open");
        if (backdrop) backdrop.classList.remove("active");
    }

    if (openBtn1) openBtn1.addEventListener("click", openDrawer);
    if (openBtn2) openBtn2.addEventListener("click", (e) => {
        e.preventDefault();
        openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    // AI Responses dataset
    const aiResponses = [
        "Based on real-time flight telemetry and traveler traffic, I recommend visiting early morning between 6:30 AM and 8:00 AM to avoid crowds.",
        "I've updated your budget analytics. Your daily estimated burn rate is approximately $210, including lodging, transit passes, and dining.",
        "Great choice! I have marked that secret viewpoint on your offline map coordinates. The sunset lighting there peaks at 6:42 PM.",
        "For optimal transit, the high-speed scenic express trains depart every 30 minutes from track 2. Your digital mobile pass will work at all turnstiles.",
        "Packing advisory: Evening temperatures drop to around 11°C, so bring a lightweight windbreaker alongside your walking shoes."
    ];

    function appendMessage(text, isUser = false) {
        if (!messages) return;
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${isUser ? "user" : "ai"}`;

        bubble.innerHTML = `
            <div class="bubble-avatar">${isUser ? "👤" : "✨"}</div>
            <div class="bubble-text">${text}</div>
        `;

        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    if (form && input) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = input.value.trim();
            if (!val) return;

            appendMessage(val, true);
            input.value = "";

            // Simulate AI reply
            setTimeout(() => {
                const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
                appendMessage(reply, false);
            }, 600);
        });
    }

    // Pre-canned suggestion chips inside Copilot
    const suggestPills = document.querySelectorAll(".suggest-pill");
    suggestPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const query = pill.getAttribute("data-msg");
            if (query) {
                appendMessage(query, true);
                setTimeout(() => {
                    if (query.includes("ramen")) {
                        appendMessage("Top 3 hidden ramen spots in Kyoto: 1. <strong>Gion Duck Noodles</strong> (secret emoji bar), 2. <strong>Wajouryoumen Sugari</strong> (seafood tsukemen in hidden machiya), 3. <strong>Menya Inoichi</strong> (ultra-pure dashi broth with Kurobuta pork).", false);
                    } else if (query.includes("train")) {
                        appendMessage("The premier route is the <strong>Glacier Express</strong> from Zermatt to St. Moritz, traversing 291 bridges and 91 tunnels over 7.5 hours of alpine majesty. Book panoramic Excellence Class 90 days in advance.", false);
                    } else if (query.includes("budget")) {
                        appendMessage("Estimated budget for 2 in Positano: $295/day baseline (boutique hotel terrace: $180, seafood lunch & dinner: $85, ferry & beach chairs: $30).", false);
                    } else {
                        appendMessage("Bali essentials: Natural insect repellent, reef-safe sunscreen, slip-on shoes for temple visits, sarong (or rent at entrance), and charcoal tablets.", false);
                    }
                }, 550);
            }
        });
    });
}

/* =====================================================
   DESTINATION CARDS & WISHLIST
===================================================== */
function initDestinationCards() {
    // Category tabs filter
    const catChips = document.querySelectorAll(".cat-chip");
    const cards = document.querySelectorAll(".destination-card");

    catChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            catChips.forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");

            const category = chip.getAttribute("data-category");
            cards.forEach((card) => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Itinerary loader buttons on cards
    const loadBtns = document.querySelectorAll(".btn-load-itinerary");
    loadBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const destKey = btn.getAttribute("data-destination");
            if (destKey) {
                selectDestination(destKey, true);
                showToast(`Loaded ${DESTINATIONS[destKey]?.title || "destination"} itinerary!`);
            }
        });
    });

    // Wishlist heart buttons
    const wishlistBtns = document.querySelectorAll(".wishlist-btn");
    const badge = document.getElementById("wishlistCountBadge");
    const statSaved = document.getElementById("statSavedSpots");

    wishlistBtns.forEach((btn) => {
        const card = btn.closest(".destination-card");
        const destKey = card ? card.getAttribute("data-destination") : null;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!destKey) return;

            if (wishlistItems.has(destKey)) {
                wishlistItems.delete(destKey);
                btn.classList.remove("bookmarked");
                btn.querySelector("svg path")?.setAttribute("fill", "none");
                showToast(`Removed from saved wishlist`);
            } else {
                wishlistItems.add(destKey);
                btn.classList.add("bookmarked");
                btn.querySelector("svg path")?.setAttribute("fill", "currentColor");
                showToast(`💖 Saved to your WanderAI Wishlist!`);
            }

            if (badge) badge.textContent = wishlistItems.size;
            if (statSaved) statSaved.textContent = 11 + wishlistItems.size;
        });
    });
}

/* =====================================================
   DAY SELECTOR TABS
===================================================== */
function initDayTabs() {
    const tabs = document.querySelectorAll(".day-tab");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const dayNum = parseInt(tab.getAttribute("data-day") || "1", 10);
            activeDayNumber = dayNum;
            renderTimeline();
        });
    });
}

/* =====================================================
   ADDITIONAL UI TRIGGERS & TOASTS
===================================================== */
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    if (!toast || !toastText) return;

    toastText.innerHTML = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function initActionButtons() {
    const btnSync = document.getElementById("btnSyncCalendar");
    const btnExport = document.getElementById("btnExportPdf");
    const btnRegen = document.getElementById("btnRegenerateDay");
    const btnPro = document.getElementById("btnProUpgrade");
    const btnBrief = document.getElementById("btnExportSummary");
    const mobileToggle = document.getElementById("mobileToggleBtn");
    const sidebar = document.getElementById("sidebar");

    if (btnSync) {
        btnSync.addEventListener("click", () => {
            showToast("📅 Calendar sync complete! Check your Google / Apple Calendar.");
        });
    }

    if (btnExport) {
        btnExport.addEventListener("click", () => {
            showToast("📥 Exported 3-Day Trip Brief (PDF) with offline maps!");
        });
    }

    if (btnRegen) {
        btnRegen.addEventListener("click", () => {
            showToast("✨ AI re-optimized Day " + activeDayNumber + " schedule for best light & zero traffic.");
            renderTimeline();
        });
    }

    if (btnPro) {
        btnPro.addEventListener("click", () => {
            showToast("🚀 WanderAI Pro features unlocked: unlimited neural copilots!");
        });
    }

    if (btnBrief) {
        btnBrief.addEventListener("click", (e) => {
            e.preventDefault();
            showToast("📑 Downloaded offline travel vouchers and booking confirmations.");
        });
    }

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    // Global Search Shortcut (⌘K / Ctrl+K)
    window.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            const searchInput = document.getElementById("globalSearchInput");
            if (searchInput) searchInput.focus();
        }
    });

    const globalSearch = document.getElementById("globalSearchInput");
    if (globalSearch) {
        globalSearch.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const term = globalSearch.value.trim().toLowerCase();
                if (term.includes("swiss") || term.includes("zermatt")) {
                    selectDestination("swiss", true);
                } else if (term.includes("amalfi") || term.includes("positano") || term.includes("italy")) {
                    selectDestination("amalfi", true);
                } else if (term.includes("bali") || term.includes("ubud")) {
                    selectDestination("bali", true);
                } else if (term.includes("kyoto") || term.includes("japan")) {
                    selectDestination("kyoto", true);
                }
                showToast(`Searched: "${globalSearch.value}"`);
            }
        });
    }
}

/* =====================================================
   INITIALIZE DASHBOARD
===================================================== */
function initializeDashboard() {
    initScenerySwitcher();
    startSceneryAnimation();
    initDayTabs();
    initDestinationCards();
    initAiGenerator();
    initCopilot();
    initActionButtons();

    // Initial render
    selectDestination("kyoto", false);
}

// Bootstrap on DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDashboard);
} else {
    initializeDashboard();
}