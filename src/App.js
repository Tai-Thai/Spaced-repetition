import logo from "./logo.svg";
import "./App.css";
import API_VOCA from "./firebase/API_VOCA";
import VocaContainer from "./components/VocaContainer";
import FormCreate from "./components/FormCreate";
import ProgressChart from "./components/ProgressChart";
import { useEffect, useState } from "react";

function App() {
    const [showComponent, setShowComponent] = useState({
        vocaContainer: false,
        formCreate: false,
        progressChart: false,
    });
    const handleShowVocaContainer = () => {
        setShowComponent((prevProps) => {
            return {
                ...prevProps,
                vocaContainer: !prevProps.vocaContainer,
            };
        });
    };
    const handleShowFormCreate = () => {
        setShowComponent((prevProps) => {
            return {
                ...prevProps,
                formCreate: !prevProps.formCreate,
            };
        });
    };
    const handleShowProgressChart = () => {
        setShowComponent((prevProps) => {
            return {
                ...prevProps,
                progressChart: !prevProps.progressChart,
            };
        });
    };

    useEffect(() => {
        const addEventShowFormCreate = function (event) {
            if (
                (event.altKey && event.key === "q") ||
                (event.altKey && event.key === "Q")
            ) {
                // Xử lý khi người dùng bấm phím tắt "Ctrl + S"
                event.preventDefault(); // Ngăn chặn hành động mặc định của phím tắt
                handleShowFormCreate();
            }
        };
        document.addEventListener("keydown", addEventShowFormCreate);
        return () => {
            document.removeEventListener("keydown", addEventShowFormCreate);
        };
    }, []);

    const update = async () => {
        console.log("here is push word func");
        const word = await API_VOCA.updateWord();
        console.log({ word: word });
    };
    const pushWord = async () => {
        console.log("here is push word func");
        const word = await API_VOCA.poshNewWord();
        console.log({ word: word });
    };
    const _delete = async () => {
        console.log("here is push word func");
        const word = await API_VOCA.deleteWord();
        console.log({ word: word });
    };
    const get = async () => {
        const word = await API_VOCA.get();
        console.log({ word: word });
    };
    return (
        <div className="sr-app">
            {/* <header className="sr-app-header">
                <button onClick={get}>get</button>
                <button onClick={pushWord}>pushWord</button>
                <button onClick={update}>update</button>
                <button onClick={_delete}>delete</button>
            </header> */}
            {/* hello achieve achievements this those */}
            <main>
                {showComponent.vocaContainer && (
                    <VocaContainer
                        handleShowComponent={handleShowVocaContainer}
                    />
                )}
                {showComponent.formCreate && (
                    <FormCreate
                        setShowFormCreate={handleShowFormCreate}
                        setShowVocaContainer={handleShowVocaContainer}
                        setShowProgressChart={handleShowProgressChart}
                    />
                )}
                {showComponent.progressChart && (
                    <ProgressChart setShowComponent={handleShowProgressChart} />
                )}
            </main>
            <nav>
                <div className="nav-mobile">
                    <button
                        className="sr-btn sr-bg-primary"
                        onClick={handleShowVocaContainer}
                    >
                        Voca Container
                    </button>
                    <button
                        className="sr-btn sr-bg-secondary"
                        onClick={handleShowFormCreate}
                    >
                        Form Create
                    </button>
                    <button
                        className="sr-btn sr-bg-yellow"
                        onClick={handleShowProgressChart}
                    >
                        Progress Chart
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default App;
