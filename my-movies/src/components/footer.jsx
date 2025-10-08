import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-black/90 text-gray-300 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Brand / Logo */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            🎬 MovieVerse
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Your world of movies and entertainment.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-5 text-sm">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Trending</a>
          <a href="#" className="hover:text-white transition-colors">Genres</a>
          <a href="#" className="hover:text-white transition-colors">Upcoming</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Socials */}
        <div className="flex gap-5">
          <a href="#" className="hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MovieVerse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
