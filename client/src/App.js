import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/PageRoutes";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="app-root">
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
