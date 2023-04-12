// const API_PREFIX =
//     "https://642a3b5000dfa3b54741c710.mockapi.io/api/v1/vocabulary";

// import firestore from "./index";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
} from "firebase/firestore";
import db from "./index";

const COLLECTION = "vocabulary";
// const API_VOCA = {
//     async get(sort = true) {
//         console.log("++++++++++ GET DATA FROM API ++++++++++++++");
//         // const request = await fetch(API_PREFIX);
//         // const data = await request.json();
//         // let dataSort = data;
//         await firestore
//             .collection(COLLECTION)
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     console.log(doc.data());
//                 });
//             });
//         // if (sort === true) {
//         //     console.log("DATA SORTING");
//         //     dataSort = data.sort((prev, next) => {
//         //         const currentTime = new Date().getTime();
//         //         return prev.time[prev.time.length - 1] - currentTime >
//         //             next.time[next.time.length - 1] - currentTime
//         //             ? 1
//         //             : next.time[next.time.length - 1] - currentTime >
//         //               prev.time[prev.time.length - 1] - currentTime
//         //             ? -1
//         //             : 0;
//         //         // return (
//         //         //     prev.time[prev.time.length - 1] -
//         //         //     currentTime -
//         //         //     next.time[next.time.length - 1] -
//         //         //     currentTime
//         //         // );
//         //     });
//         // }

//         // fix
//         return [];
//     },
//     // async getWord(id) {
//     //     const request = await fetch(API_PREFIX + `/${id}`);
//     //     const data = await request.json();

//     //     return data;
//     // },
//     async poshNewWord(newWord) {
//         await firestore
//             .collection(COLLECTION)
//             .add(newWord)
//             .then(() => {
//                 console.log("++++++++++++ ADD NEW WORD SUCCESS ++++++++++++++");
//                 // console.log( "" );
//             })
//             .catch(() => {
//                 alert("POSH NEW WORD FAIL");
//             });
//     },
//     async updateWord(id, newWord) {
//         try {
//             const vocaRef = await firestore.collection(COLLECTION).doc(id);

//             vocaRef
//                 .update({
//                     name: "Jane Doe",
//                     age: 35,
//                 })
//                 .then(() => {
//                     console.log("+++++++ UPDATE NEW WORD SUCCESS +++++++++");
//                 });
//         } catch {
//             alert("UPDATE WORD FAIL");
//         }
//     },

//     async deleteWord(id) {
//         const vocaRef = await firestore.collection(COLLECTION).doc(id);

//         vocaRef.delete();
//     },
// };
const API_VOCA = {
    async get(sort = true) {
        try {
            let querySnapshot = [];
            if (sort == true) {
                querySnapshot = await getDocs(
                    query(
                        collection(db, COLLECTION),
                        orderBy("repetitiveTime", "asc")
                    )
                );
            } else {
                querySnapshot = await getDocs(collection(db, COLLECTION));
            }

            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            console.log("+++++++++ GET DOCUMENTS SUCCESS ++++++++++");
            // console.log({ documents });
            return documents;
        } catch (error) {
            alert("GET DATA FAILED: ", error);
        }
    },

    async newWord(newWord) {
        // console.log("Add new word: ", newWord);
        // try {
        try {
            console.log("hello");
            const docRef = await addDoc(collection(db, COLLECTION), newWord);
            console.log("++++++++++++ ADD NEW WORD SUCCESS ++++++++++++++");
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            alert("ADD NEW WORD FAIL ", e);
        }
    },

    async updateWord(documentId, data) {
        // console.log({ documentId: documentId, data: data });
        try {
            const docRef = doc(db, COLLECTION, documentId);

            await updateDoc(docRef, data);
            console.log("+++++++ UPDATE NEW WORD SUCCESS +++++++++");
        } catch (error) {
            alert("Error UPDATE document: ", error);
        }
    },

    async deleteWord(documentId = "H4mqf7V9Mx0mo3kMBVwH") {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            await deleteDoc(docRef);
            console.log("++++++++++ DELETE WORD SUCCESS ++++++++++");
        } catch (error) {
            alert("DELETE WORD FAILED: ", error);
        }
    },
};

export default API_VOCA;
