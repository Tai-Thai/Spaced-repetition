import React, { useEffect, useRef, useState } from "react";
import schedule from "../utils/schedule";
import API_VOCA from "../firebase/API_VOCA";
import chromeExtension from "../chromeExtension/chromeExtension";
import fetchWordInfo from "../dictionaryApi/dictionaryapi";

const initialWordInfo = {
    voca: "",
    spelling: "",
    meaning: "",
    translate: "",
    examples: "",
    note: "",
    typeWords: [],
    time: [],
    similar: [],
    opposite: [],
    level: 0,
    repetiveTime: 0,
};

function FormCreate({
    setShowFormCreate,
    setShowVocaContainer,
    setShowProgressChart,
}) {
    const [wordInfo, setWordInfo] = useState(initialWordInfo);
    // const [level, setLevel] = useState(0);
    const vocaInputRef = useRef(null);

    // total level 1 - 7
    const totalLevel = schedule.normal.length;
    let levelArray = [];
    for (let i = 0; i < totalLevel; i++) {
        levelArray.push(i);
    }

    // useEffect(() => {
    //     console.log({ wordInfo, level });
    //     return () => {};
    // }, [wordInfo, level]);

    useEffect(() => {
        const getSelection = async function () {
            const selection = window.getSelection().toString();

            if (selection.length > 0) {
                console.log("Đã bôi đen văn bản: ", selection);
                const _wordInfo = await fetchWordInfo.get(selection);

                setWordInfo((prev) => {
                    let update = { ...prev, voca: selection };
                    if (_wordInfo) {
                        // update = { ...prev, voca: selection };
                        const spelling = _wordInfo.phonetic || "";
                        const meaning = _wordInfo.meaning || "";
                        const typeWord = _wordInfo.typeWord || "";
                        // console.log({ prev, update });

                        update = {
                            ...update,
                            spelling,
                            typeWords: typeWord,
                            meaning: meaning,
                        };
                    }
                    return update;
                });
            }
        };

        getSelection();

        document.addEventListener("mouseup", getSelection);

        return () => {
            document.removeEventListener("mouseup", getSelection);
        };
    }, []);

    const handleSubmit = async () => {
        if (wordInfo.voca.length <= 0) {
            alert("WORD EMPTY");
            return;
        }
        let newWord = {
            ...wordInfo,
        };

        // console.log(newWord.typeWords);
        if (newWord.typeWords.length > 0) {
            // console.log(input.value.trim().split(" "));
            newWord.typeWords = newWord.typeWords.split(" ") || [];
        } else {
            newWord.typeWords = [];
        }

        newWord.time = levelToTime(wordInfo.level);
        newWord.repetitiveTime = newWord.time[wordInfo.level + 1];
        // newWord.level = wordInfo.level;

        await API_VOCA.newWord(newWord);
        // // Close form
        // setShowFormCreate();
        setWordInfo(initialWordInfo);
        // focus input voca
        // console.log({ vocaInputRef: vocaInputRef.current });
        vocaInputRef.current.focus();
        // CREATE ALARM NOTIFICATION
        chromeExtension.sendMessage({
            vocaAlarm: true,
            alarmName: chromeExtension.reminder,
        });

        function levelToTime(level) {
            const currentTime = new Date().getTime();
            let timeArray = [currentTime];
            for (let i = 0; i <= level; i++) {
                // console.log(i);
                timeArray.push(currentTime + schedule.normal[i]);
            }
            return timeArray;
        }
    };

    const handleOnChange = async (e) => {
        const type = e.target.id;
        let value = e.target.value;

        let update = {};

        update = {
            ...wordInfo,
            [type]: value,
        };

        setWordInfo(update);
        // console.log({ update });
    };

    const handleChooseLevel = (e) => {
        const _level = Number(e.target.innerText);
        console.log({ level: _level });
        setWordInfo({
            ...wordInfo,
            level: _level,
        });
    };

    const handleShowProgressChart = () => {
        setShowFormCreate();
        setShowProgressChart();
    };
    const handleShowVocaContainer = () => {
        setShowFormCreate();
        setShowVocaContainer();
    };

    const handleGetSpelling = async (e) => {
        const type = e.target.id;
        const value = e.target.value.trim();
        const _wordInfo = await fetchWordInfo.get(value);
        let update = {
            ...wordInfo,
        };
        // console.log({ _wordInfo: _wordInfo });
        if (_wordInfo) {
            // console.log(_wordInfo.phonetic);
            const spelling = _wordInfo.phonetic || "";
            const meaning = _wordInfo.meaning || "";
            const typeWord = _wordInfo.typeWord || "";
            update = {
                ...update,
                [type]: value,
                spelling,
                meaning,
                typeWords: typeWord,
            };
        }
        setWordInfo(update);
    };

    return (
        <div>
            {/* <button onClick={getSelection}>Run</button> */}
            <div className="sr-container form-container">
                <div className="wrap-container full">
                    <div className="my-wrapper">
                        <div className="form-input-wrapper">
                            <input
                                ref={vocaInputRef}
                                tabIndex="1"
                                type="text"
                                value={wordInfo.voca}
                                id="voca"
                                placeholder="word"
                                onChange={handleOnChange}
                                onBlur={handleGetSpelling}
                            />
                        </div>
                        <div className="form-input-wrapper">
                            <input
                                tabIndex="2"
                                type="text"
                                value={wordInfo.translate}
                                id="translate"
                                placeholder="translate"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-input-wrapper">
                            <input
                                tabIndex="3"
                                type="text"
                                value={wordInfo.typeWords}
                                id="typeWords"
                                placeholder="type"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-input-wrapper">
                            <input
                                tabIndex="4"
                                type="text"
                                value={wordInfo.spelling}
                                id="spelling"
                                placeholder="spelling"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="my-wrapper sr-form-my-wrapper-more-info">
                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                value={wordInfo.note}
                                tabIndex="5"
                                id="note"
                                placeholder="note"
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                value={wordInfo.examples}
                                tabIndex="6"
                                id="examples"
                                placeholder="examples"
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="form-input-wrapper sr-wrap-radio">
                            {levelArray &&
                                levelArray.map((_level) => {
                                    return (
                                        <div
                                            key={`form-level-${_level}`}
                                            className="sr-radio-group"
                                        >
                                            <input
                                                type="radio"
                                                id={"level-" + _level}
                                                className="sr-input-radio"
                                                name="sr-radio-level"
                                                value={_level}
                                                checked={
                                                    _level == wordInfo.level
                                                }
                                            />
                                            <label
                                                className="sr-label-radio"
                                                htmlFor={"level-" + _level}
                                                onClick={handleChooseLevel}
                                            >
                                                {_level}
                                            </label>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="wrap-container wrapper-actions">
                    {/* <!-- <div className="form-input-wrapper">
    <button
        className="sr-btn sr-bg-secondary w-100"
        onclick="NodeFormDispatch({
    type: 'SHOW_FORM',
    payload: false
})"
    >
        Cancel
    </button>
</div> --> */}
                    <div className="form-input-wrapper">
                        <button
                            className="sr-btn sr-bg-primary w-100"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="form-word base-actions-container">
                        <button
                            className="sr-btn action-btn btn-award"
                            onClick={handleShowProgressChart}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path>
                            </svg>
                        </button>
                        <button
                            className="sr-btn action-btn btn-flash-cards"
                            onClick={handleShowVocaContainer}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M284.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-216 216c-15.6 15.6-15.6 40.9 0 56.6l216 216c15.6 15.6 40.9 15.6 56.6 0l216-216c15.6-15.6 15.6-40.9 0-56.6l-216-216z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormCreate;
