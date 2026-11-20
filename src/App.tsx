import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
    </Routes>
  )
}

export default App