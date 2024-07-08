// AppRouter.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Debug from './Debug'
import MainScreen from './MainScreen.tsx'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Debug />} />
                <Route path="/admin" element={<MainScreen />} />
            </Routes>
        </Router>
    )
}

export default AppRouter