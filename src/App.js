import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import News from "./components/News";
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);
  const changeProgress = (progress) => {
    setProgress(progress);
  };
  const pageSize = 10;
  const apikey = "7f5ca2711a7a469bb0dde060dfaf36f1";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Layout progress={progress} />}>
              <Route
                index
                element={
                  <News
                    key="general"
                    country="in"
                    pageSize={pageSize}
                    category="general"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/general"
                element={
                  <News
                    key="general"
                    country="in"
                    pageSize={pageSize}
                    category="general"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/entertainment"
                element={
                  <News
                    key="entertainment"
                    country="in"
                    pageSize={pageSize}
                    category="entertainment"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/business"
                element={
                  <News
                    key="business"
                    country="in"
                    pageSize={pageSize}
                    category="business"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/health"
                element={
                  <News
                    key="health"
                    country="in"
                    pageSize={pageSize}
                    category="health"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/science"
                element={
                  <News
                    key="science"
                    country="in"
                    pageSize={pageSize}
                    category="science"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/sports"
                element={
                  <News
                    key="sports"
                    country="in"
                    pageSize={pageSize}
                    category="sports"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
              <Route
                path="/technology"
                element={
                  <News
                    key="technology"
                    country="in"
                    pageSize={pageSize}
                    category="technology"
                    changeProgress={changeProgress}
                    apikey={apikey}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
