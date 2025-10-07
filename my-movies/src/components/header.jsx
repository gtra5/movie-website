import { Search, Bell, User } from "lucide-react"
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-black/75">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-mono text-lg font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-sans text-xl font-semibold tracking-tight text-foreground">MovieHub</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Movies
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              TV Shows
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Trending
            </a>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden w-64 lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" placeholder="Search movies..." className="h-9 w-full bg-secondary pl-9 text-sm" />
          </div>

          {/* Mobile Search button */}
          <button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>

          {/* Notifications */}
          <button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>

          {/* User Profile */}
          <button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}
