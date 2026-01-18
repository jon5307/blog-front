import { Link, NavLink } from "react-router";

export default function NavBar() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto px-4 py-3 flex gap-8 items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-tighter">My Blog</h1>
          </Link>
          <nav className="md:flex gap-6 text-sm font-medium">
            <NavLink to="/" className="hover:text-primary transition-colors">Home</NavLink>
            <NavLink to="/post" className="hover:text-primary transition-colors">Posts</NavLink>
          </nav>
        </div>
    </header>
  )
}