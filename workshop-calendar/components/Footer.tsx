"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Footer() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(true)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      setIsDark(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  // Social media links
  const socialLinks = [
    {
      image: "/discord.svg",
      alt: "Discord",
      href: "https://discord.gg/GqfcCyvWxU"
    },
    {
      image: "/instagram.svg",
      alt: "Instagram",
      href: "https://www.instagram.com/webimpactuw/"
    },
    {
      image: "/github.svg",
      alt: "GitHub",
      href: "https://www.github.com/webimpactuw/"
    },
    {
      image: "/linkedin.svg",
      alt: "LinkedIn",
      href: "https://www.linkedin.com/company/webimpact-uw/"
    }
  ]

  // Hide footer on Sanity Studio routes
  if (pathname.includes("/studio") || pathname.includes("/structure")) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-darkPurple py-2 z-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center justify-start sm:flex-1">
          <a
            href="https://webimpactuw.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo_main.svg"
              alt="Web Impact Logo"
              className="h-12 w-auto"
              width={158}
              height={48}
            />
          </a>
        </div>

        {/* Social icons + theme toggle */}
        <div className="flex justify-center gap-6">
          {/* Social media icons */}
          {socialLinks.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              key={link.href}
              className="flex items-center justify-center"
            >
              <Image
                src={link.image}
                alt={link.alt}
                width={36}
                height={36}
              />
            </a>
          ))}

          {/* Theme toggle (rightmost) */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center text-3xl"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
