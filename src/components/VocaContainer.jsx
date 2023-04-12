import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardItem from "./CardItem";
import API_VOCA from "../firebase/API_VOCA";
import chromeExtension from "../chromeExtension/chromeExtension";

const VocaContainer = ({ handleShowComponent }) => {
    const [data, setData] = useState([]);
    const [recallData, setRecallData] = useState(true);
    const [options, setOptions] = useState({
        amountItemShow: 20,
        pageNum: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await API_VOCA.get();
            setData(data);
            if (data.length > 0) {
                chromeExtension.sendMessage({
                    vocaAlarm: true,
                    alarmName: chromeExtension.reminder,
                    data: data[0],
                });
            }
        };
        fetchData();

        return () => {};
    }, [recallData]);

    const handleShowMore = () => {
        if (
            options.amountItemShow * (options.pageNum + 1) <=
            data.length + options.amountItemShow
        ) {
            console.log("COUNT PAGE");
            setOptions({
                ...options,
                pageNum: options.pageNum + 1,
            });
        }
    };

    return (
        <div>
            <div className="sr-overlay"></div>
            <div className="card-container">
                {data.length > 0 &&
                    data
                        .slice(0, options.amountItemShow * options.pageNum)
                        .map((voca) => {
                            return (
                                <CardItem
                                    {...voca}
                                    key={voca.id}
                                    setRecallData={setRecallData}
                                />
                            );
                        })}
            </div>
            <div className="card-actions-container">
                {options.amountItemShow * (options.pageNum + 1) <=
                    data.length + options.amountItemShow && (
                    <button
                        className="sr-btn btn-show-more sr-bg-yellow"
                        onClick={handleShowMore}
                    >
                        Show more!
                    </button>
                )}

                <button
                    className="sr-btn btn-show-more sr-bg-secondary"
                    onClick={handleShowComponent}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

VocaContainer.propTypes = {};

export default VocaContainer;
