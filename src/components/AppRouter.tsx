// AppRouter.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Debug from './Debug'
import MainScreen from './MainScreen.tsx'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/admin" element={<Debug />} />
            </Routes>
        </Router>
    )
}

export default AppRouter