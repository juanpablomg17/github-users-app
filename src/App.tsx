import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';

import queryClient from "./query-client";
import { RootComponent } from './pages/index'
import store, { persistor } from './store/store';
import { PersistGate } from "redux-persist/integration/react";
import { UserProfile } from "./pages/user/user-prfofile";

export const App = (): JSX.Element => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<RootComponent />} />
                            <Route path="/user/:userLogin" element={<UserProfile />} />
                        </Routes>
                    </Router>
                </PersistGate>
            </Provider>
            </QueryClientProvider>
        </>
    )
}

export default App
