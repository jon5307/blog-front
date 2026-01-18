import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import PostListPage from "./pages/PostListPage"
import PostPage from "./pages/PostPage"


function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
