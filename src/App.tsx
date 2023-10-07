import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RootComponent } from './pages/index'

export const App = (): JSX.Element => {
    return (
        <>
            {/* //<QueryClientProvider client={queryClient}> */}
            {/* <Provider store={store}> */}
                {/* <PersistGate loading={null} persistor={persistor}> */}
                    <Router>
                        <Routes>
                            <Route path="/" element={<RootComponent />} />
                        </Routes>
                    </Router>
                {/* </PersistGate> */}
            {/* </Provider> */}
            {/* // </QueryClientProvider> */}
        </>
    )
}

export default App
