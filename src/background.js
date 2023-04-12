// import API_VOCA from "./mylibrary/js/api";
// import API_VOCA from "./firebase/API_VOCA";
import chromeExtension from "./chromeExtension/chromeExtension";
import API_VOCA from "./firebase/API_VOCA";
// import chromeExtension from "./mylibrary/js/chromeExtension/chromeExtension";

let firstAlarm = 1;
let repetitiveDataNewest;
/* eslint-disable no-undef */
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === chromeExtension.reminder) {
        console.log("ALARM RUNNING...");
        // const currentTime = new Date().getTime();

        var options = {
            type: "basic",
            title: "Time to learn English vocabulary with spaced repetition!",
            message: `Hey there! Have you forgotten any English vocabulary today? Do you remember What ${repetitiveDataNewest.voca} is? Don't miss the opportunity to improve your English skills! Start learning now!`,
            iconUrl:
                "https://e7.pngegg.com/pngimages/370/437/png-clipart-duolingo-flashcard-learning-spaced-repetition-language-tiny-smiley-emoticon.png",
            silent: true,
        };
        chrome.notifications.create(options);
        createVocaAlarm();
    }
});

async function createVocaAlarm(_repetitiveDataNewest) {
    repetitiveDataNewest = _repetitiveDataNewest;
    console.log({ repetitiveDataNewest });
    if (!repetitiveDataNewest) {
        console.log("HAS not REPETITIVE DATA NEWEST");
        const dataVoca = await API_VOCA.get();
        if (dataVoca.length > 0) {
            repetitiveDataNewest = dataVoca[0];
        } else {
            return;
        }
    }
    console.log({ repetitiveDataNewest2: repetitiveDataNewest });
    // const milliseconds = getMinTimeReminder(dataVoca);
    const currentTime = new Date().getTime();
    const reminderTimeMilliseconds =
        repetitiveDataNewest.repetitiveTime - currentTime;
    const reminderTime = reminderTimeMilliseconds / 60000; // milliseconds to minutes
    if (firstAlarm > 1 && reminderTime < 0) return;
    console.log("CREATE ALARM: " + reminderTime + " minutes");
    console.log("++++++ CREATED ALARM ++++++");
    firstAlarm++;
    // console.log({ dataVoca });
    chrome.alarms.create(chromeExtension.reminder, {
        delayInMinutes: reminderTime,
        // periodInMinutes: 0.5,
    });
}

function cancelAlarm(alarmName = chromeExtension.reminder) {
    chrome.alarms.clear(alarmName);
    console.log("Alarm canceled.");
}

createVocaAlarm();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // alert("message received");
    console.log("Listen Message External", { message });
    if (message.vocaAlarm) {
        chrome.alarms.get(message.alarmName, (alarm) => {
            console.log({ alarm });
            if (alarm) {
                // An alarm with the same name already exists, cancel it
                chrome.alarms.clear(message.alarmName, function () {
                    console.log("Clear Alarm");
                    // clearTimeout(timeId);

                    // Create a new alarm
                    createVocaAlarm(message.data);
                });
            } else {
                // No alarm exists, create a new one
                createVocaAlarm(message.data);
            }
        });
    }
});

// ,
//     "content_security_policy": {
//         "extension_pages": "script-src 'self' https://www.gstatic.com/ https://*.firebaseio.com https://www.googleapis.com; object-src 'self'; connect-src 'self' wss://*.firebaseio.com;"
//     }
