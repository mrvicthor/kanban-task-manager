import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/theme-context-provider.tsx";
import { SlideProvider } from "./context/slide-provider.tsx";
import { BoardContextProvider } from "./context/board-context-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SlideProvider>
          <BoardContextProvider>
            <App />
          </BoardContextProvider>
        </SlideProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
