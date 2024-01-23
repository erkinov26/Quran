import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";

const App = () => {
  const [data, setData] = useState(null);
  const [translation, setTranslation] = useState(false);
  const [number, setNumber] = useState(1);
  console.log("🚀 ~ App ~ number:", number);
  useEffect(() => {
    axios
      .get(`https://quranenc.com/api/translation/sura/uzbek_mansour/${number}`)
      .then((response) => {
        setData(response.data.result);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [number]);
  return (
    <div className="app">
      <div className="cardItem">
        <ButtonGroup sx={{ margin: "10px auto" }}>
          <Button
            disabled={number === 1}
            onClick={() => {
              setNumber(number - 1);
            }}
            variant="outlined"
          >
            Previous Surah
          </Button>
          <Button
            onClick={() => {
              setNumber(number + 1);
            }}
            variant="outlined"
          >
            Next Surah
          </Button>
          <Button
            onClick={() => {
              setTranslation(!translation);
            }}
            variant="outlined"
          >
            {translation === false ? "Change Uzbek" : "Change Arabic"}
          </Button>
        </ButtonGroup>
        {data === null ? (
          <CircularProgress />
        ) : (
          data.map((item) => {
            return (
              <h1 key={item.id}>
                {translation === false ? item.arabic_text : item.translation}
              </h1>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
