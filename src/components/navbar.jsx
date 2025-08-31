import React from 'react'
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link";

const Navbar = () => {
  return (
    <div className='w-full h-16 bg-background border-b border-border text-foreground flex items-center justify-between px-4 transition-colors'>
        <div className='flex items-center'>
            <div>
                <img src="/logo.png" alt="Logo" />
            </div>
            <Link href="/" className='ml-4 text-lg font-bold hover:text-accent-foreground transition-colors'>
                PDF Translator
            </Link>
        </div>
        <div className='flex space-x-4 items-center'>
            <a href="/" className='hover:text-muted-foreground transition-colors'>Github</a>
            <a href="/" className='hover:text-muted-foreground transition-colors'>My Portfolio</a>
            <ThemeToggle />
            <Button asChild>
                <Link href="/auth/login/">Login</Link>
            </Button>
        </div>
    </div>
  )
}

export default Navbar