const chromeExtension = {
    reminder: "REMINDER",
    id: "gmjojpondhajliegnnlhnfhkngibjjbl",
    sendMessage: function (message, callback) {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(this.id, message, (response) => {
            // 3. Got an asynchronous response with the data from the service worker
            // console.log("received user data", response);
            if (callback) callback(response);
            // initializeUI(response);
        });
    },
};

export default chromeExtension;
