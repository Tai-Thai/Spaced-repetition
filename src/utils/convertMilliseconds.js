export default function convertMilliseconds(ms) {
    // let _seconds = Math.floor(ms / 1000);
    // let _minutes = Math.floor(_seconds / 60);
    // let _hours = Math.floor(_minutes / 60);
    // let _days = Math.floor(_hours / 24);
    // let _months = Math.floor(_days / 30);
    // let _years = Math.floor(_months / 12);

    const totalSeconds = ms / 1000; // chuyển đổi mili giây sang giây
    const _days = Math.floor(totalSeconds / 86400);
    const _hours = Math.floor((totalSeconds % 86400) / 3600);
    const _minutes = Math.floor((totalSeconds % 3600) / 60);
    const _seconds = Math.floor(totalSeconds % 60);

    function formatTime({
        seconds = true,
        minutes = true,
        hours = true,
        days = true,
        months = true,
        years = true,
    }) {
        let timeString = "";

        if (_days > 0 && days === true) {
            timeString += _days + "d ";
        }
        if (_hours > 0 && hours === true) {
            timeString += _hours + "h ";
        }
        if (_minutes > 0 && minutes === true) {
            timeString += _minutes + "min ";
        }
        if (_seconds > 0 && seconds === true) {
            timeString += _seconds + " seconds ";
        }

        return timeString.trim();
    }

    // console.log({ _years, _months, _days, _hours, _minutes, _seconds });
    return {
        // years: _years,
        // months: _months % 12,
        days: _days,
        hours: _hours,
        minutes: _minutes,
        seconds: _seconds,
        toString: formatTime,
    };
}
