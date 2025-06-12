"use client";

import React, { useState } from "react";
import EnglishFlagIcon from "@/public/assets/en-flag.svg";
import BurmeseFlagIcon from "@/public/assets/mm-flag.svg";
import { Locale } from "@/types/locale";
import {
  redirect,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as HeroUILink,
  Tabs,
  Tab,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import UserIcon from "@/public/assets/user.svg";
import LoginIcon from "@/public/assets/login.svg";
import SignupIcon from "@/public/assets/signup.svg";

const NAV_ITEMS = [
  "home",
  "jobs",
  "housing",
  "marketplace",
  "services",
  "immigration",
];

export function Navbar({ locale, dict }: { locale: Locale; dict: any }) {
  const pathname = usePathname();

  const handleLanguageChange = (value: any) => {
    const segments = pathname.split("/");
    const pathWithoutLocale = "/" + segments.slice(2).join("/");

    if (value === "en" || value === "mm") {
      redirect(`${value}/${pathWithoutLocale}`);
    } else {
      redirect(`/${pathWithoutLocale}`);
    }
  };

  return (
    <HeroUINavbar maxWidth="2xl">
      <NavbarBrand>
        <p>YATKWAT</p>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {NAV_ITEMS.map((item) => (
          <NavbarItem key={item} className={`h-full flex items-center`}>
            <HeroUILink color="primary" href={`/${locale}/${item}`}>
              {dict.navbar[item]}
            </HeroUILink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Tabs
            color="default"
            variant="solid"
            selectedKey={locale}
            onSelectionChange={handleLanguageChange}
          >
            <Tab key="en" title={<EnglishFlagIcon className="w-4" />} />
            <Tab key="mm" title={<BurmeseFlagIcon className="w-4" />} />
          </Tabs>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Dropdown
            classNames={{
              content: "min-w-0",
            }}
          >
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <UserIcon className="w-6" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="login"
                href={`/${locale}/login`}
                startContent={<LoginIcon className="w-4" />}
                color="primary"
              >
                Login
              </DropdownItem>
              <DropdownItem
                key="signup"
                href={`/${locale}/signup`}
                startContent={<SignupIcon className="w-4" />}
                color="primary"
              >
                Sign up
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
}
