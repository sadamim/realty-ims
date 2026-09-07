"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Main navigation items
  const navigationItems = [
    {
      name: 'HOME',
      path: '/'
    },
    {
      name: 'ABOUT US',
      path: '/about-us'
    },
    {
      name: 'POST',
      path: '#',
      dropdown: [
        { name: 'BUY PROPERTY', path: '/buy-properties' },
        { name: 'SELL PROPERTY', path: '/sell-properties' },
        { name: 'RENT PROPERTY', path: '/rent-properties' },
      ]
    },
    {
      name: 'PROJECTS',
      path: '/projects'
    },
    {
      name: 'BUILDERS',
      path: '/builders'
    },
    {
      name: 'BLOGS',
      path: '/blogs'
    },
    {
      name: 'CONTACT US',
      path: '/contact-us'
    },
  ];

  return (
    <header className="header-navigation sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-light.png"
            alt="Realty Focus"
            width={120}
            height={50}
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            !item.dropdown ? (
              <Link
                key={item.name}
                href={item.path}
                className="nav-link font-medium"
              >
                {item.name}
              </Link>
            ) : (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="nav-link font-medium outline-none">
                  {item.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.name} asChild>
                      <Link href={dropdownItem.path}>
                        {dropdownItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden p-2">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navigationItems.map((item) => (
                <React.Fragment key={item.name}>
                  {!item.dropdown ? (
                    <Link
                      href={item.path}
                      className="nav-link font-medium py-2"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="nav-link font-medium text-left py-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        {item.name}
                      </button>
                      {isMenuOpen && (
                        <div className="pl-4 flex flex-col space-y-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              className="nav-link"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
