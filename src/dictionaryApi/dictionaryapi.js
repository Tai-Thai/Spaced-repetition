const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const typeWords = {
    noun: "n",
    verb: "v",
    adverb: "adv",
    adjective: "a",
};

const fetchWordInfo = {
    async get(word, callback) {
        // console.log(baseUrl + word);
        const response = await fetch(baseUrl + word);
        const data = await response.json();
        // console.log({ data });
        if (data && data.length > 0) {
            const phonetic = data[0].phonetic
                ? data[0].phonetic.replace(/\//g, "")
                : "";

            const meaning =
                data[0].meanings && data[0].meanings.length > 0
                    ? data[0].meanings[0].definitions[0].definition
                    : "";
            const typeWord =
                data[0].meanings && data[0].meanings.length > 0
                    ? typeWords[data[0].meanings[0].partOfSpeech]
                    : "";
            return {
                ...data[0],
                phonetic,
                meaning,
                typeWord,
            };
        }
        return {};

        // return await fetch(baseUrl + word)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // console.log({ dataData: data });
        //         if (data && data.length > 0) {
        //             const phonetic = data[0].phonetic.replace(/\//g, "");
        //             return {
        //                 ...data[0],
        //                 phonetic,
        //             };
        //         }

        //         return {};
        //     })
        //     .then((data) => {
        //         console.log("call back", { data });
        //         callback(data);
        //     });
    },
};

export default fetchWordInfo;
