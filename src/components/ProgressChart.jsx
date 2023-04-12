import React, { useEffect, useState } from "react";
import API_VOCA from "../firebase/API_VOCA";

const ProgressChart = ({ setShowComponent }) => {
    const [progressData, setProgressData] = useState([]);
    const [maxWordRepetition, setmaxWordRepetition] = useState(0);
    useEffect(() => {
        const handleProgressData = async () => {
            const dataStorage = await API_VOCA.get(false);
            console.log("Show Progress");
            let maxWordRepetition = 0;
            const _progressResult = dataStorage.reduce((arr, el) => {
                const level = el.level; // - 1 current time When create word
                if (arr[level]) {
                    ++arr[level];
                    if (maxWordRepetition < arr[level]) {
                        maxWordRepetition = arr[level];
                    }
                } else {
                    arr[level] = 1;
                }
                return arr;
            }, []);
            const progressResult = replaceEmpty(_progressResult);

            setProgressData(progressResult);
            setmaxWordRepetition(maxWordRepetition);
            // console.log({ progressResult });

            function replaceEmpty(arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i]) {
                        arr[i] = 0;
                    }
                }
                return arr;
            }
        };

        handleProgressData();
        return () => {};
    }, []);

    return (
        <div>
            <div className="sr-progress-chart sr-container">
                <button
                    className="close-btn progress-chart-close-btn"
                    onClick={setShowComponent}
                >
                    <span className="close-icon">×</span>
                </button>

                {progressData &&
                    progressData.length > 0 &&
                    progressData.map((value, index) => {
                        return (
                            <div
                                class={`bar  ${value == 0 ? `bar-empty` : ""}`}
                                data-counter={value}
                                data-level={index}
                                style={{
                                    height: value
                                        ? (value / maxWordRepetition) * 100 +
                                          "%"
                                        : "10px",
                                }}
                            ></div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ProgressChart;
