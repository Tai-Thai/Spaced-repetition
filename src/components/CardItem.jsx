import React from "react";
import PropTypes from "prop-types";
import convertMilliseconds from "../utils/convertMilliseconds";
import schedule from "../utils/schedule";
import API_VOCA from "../firebase/API_VOCA";

const CardItem = (props) => {
    const {
        voca,
        translate,
        meaning,
        imageUrl,
        examples,
        note,
        spacedRepetition,
        time,
        spelling,
        typeWords,
        repetitiveTime,
        level,
        id,
        setRecallData,
    } = props;
    const currentTime = new Date().getTime();
    const remainingTime = repetitiveTime - currentTime;
    const handleNextLevel = async () => {
        const currentTime = new Date().getTime();
        let _time = [];
        let nextLevel = level + 1;

        console.log({ level });
        if (level + 1 >= schedule.normal.length) {
            console.log("===== RETURN LEVEL 0 =====");
            _time = [currentTime, currentTime + schedule.normal[0]];
            nextLevel = 0;
        } else {
            _time = [...time, currentTime + schedule.normal[level + 1]];
        }

        await API_VOCA.updateWord(id, {
            time: _time,
            level: nextLevel,
            repetitiveTime: _time[_time.length - 1], // end of time = _time[_time.length - 1]
        });

        setRecallData((prev) => !prev); // re render ui
    };

    const handlePrevLevel = async () => {
        const currentTime = new Date().getTime();
        let _time = time;
        const timeLength = time.length;

        if (timeLength >= 2) {
            if (timeLength == 2) {
                _time.pop();
            } else {
                _time.pop();
                _time.pop();
            }
            // console.log(_time);
            _time = [..._time, currentTime + schedule.normal[timeLength - 2]];

            await API_VOCA.updateWord(id, {
                time: _time,
                level: timeLength - 2,
                repetitiveTime: _time[_time.length - 1], // end of time = _time[_time.length - 1]
            });

            setRecallData((prev) => !prev); // re render ui
        }
    };

    const handleDeleteWord = async () => {
        await API_VOCA.deleteWord(id);

        setRecallData((prev) => !prev); // re render ui
    };

    const handleOnBlur = (e) => {
        // console.log(e.target.innerHTML);
        const target = e.target;
        if (props[target.id].trim() !== target.innerText.trim()) {
            const updateData = {
                [target.id]: target.innerText,
            };

            API_VOCA.updateWord(id, updateData);
        }
        // console.log({ updateData });
    };

    // console.log({ remainingTime }, convertMilliseconds(remainingTime));
    return (
        <div
            className="sr-card sr-container"
            // style="order: -57142365"
            style={{ order: repetitiveTime }}
            data-level={level}
        >
            <div className="sr-card-header">
                <h2
                    id="voca"
                    className="sr-title"
                    contentEditable="true"
                    onBlur={handleOnBlur}
                >
                    {voca}
                </h2>

                {typeWords && typeWords.length > 0 && (
                    <div className="sr-type-word-container">
                        {typeWords.map((typeWord) => (
                            <span className="type-words">
                                (<span id="typeWords">{typeWord}</span>)
                            </span>
                        ))}
                    </div>
                )}

                {spelling && (
                    <span className="spelling">
                        /
                        <span
                            id="spelling"
                            contentEditable="true"
                            onBlur={handleOnBlur}
                        >
                            {spelling}
                        </span>
                        /
                    </span>
                )}
            </div>

            <div>
                {!meaning && translate && (
                    <p
                        id="translate"
                        className="note translate"
                        contentEditable="true"
                        onBlur={handleOnBlur}
                    >
                        {translate}
                    </p>
                )}
                {meaning && (
                    <p
                        id="meaning"
                        className="note meaning"
                        contentEditable="true"
                        onBlur={handleOnBlur}
                    >
                        {meaning}
                        {translate && (
                            <>
                                <span className="sr-meaning-flag">|</span>
                                <p
                                    id="translate"
                                    className="note translate"
                                    contentEditable="true"
                                    onBlur={handleOnBlur}
                                >
                                    {translate}
                                </p>
                            </>
                        )}
                    </p>
                )}
            </div>

            {note && (
                <p
                    id="note"
                    className="note"
                    contentEditable="true"
                    onBlur={handleOnBlur}
                >
                    {note}
                </p>
            )}

            {remainingTime > 0 ? (
                <p class="note remaining-time">
                    {convertMilliseconds(remainingTime).toString({
                        seconds: true,
                    })}
                </p>
            ) : (
                <p class="note over-time">over time</p>
            )}

            <div
                id="examples"
                className="example-container sr-example "
                contentEditable="true"
                onBlur={handleOnBlur}
            >
                {examples}
            </div>
            <div className="card-actions">
                <button
                    className="sr-btn sr-bg-danger btn-outline"
                    onClick={handleDeleteWord}
                >
                    Delete
                </button>
                <button
                    className="sr-btn sr-bg-secondary btn-outline"
                    onClick={handlePrevLevel}
                >
                    Prev level
                </button>
                <button
                    className="sr-btn sr-bg-primary"
                    onClick={handleNextLevel}
                >
                    Next level
                </button>
            </div>
        </div>
    );
};

CardItem.propTypes = {};

export default CardItem;
