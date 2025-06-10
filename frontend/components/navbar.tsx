"use client";

import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import React, { useState } from "react";
import EnglishFlagIcon from "@/public/assets/en-flag.svg";
import BurmeseFlagIcon from "@/public/assets/mm-flag.svg";
import { Locale } from "@/types/locale";
import { redirect, usePathname } from "next/navigation";

const navItems = [
  { title: "home", href: "/" },
  { title: "jobs", href: "/jobs" },
  { title: "housing", href: "/housing" },
  { title: "marketplace", href: "/marketplace" },
  { title: "services", href: "/services" },
  { title: "immigration", href: "/immigration" },
];

export function Navbar({ locale, dict }: { locale: Locale; dict: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<Locale>(locale);
  const open = Boolean(anchorEl);
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const segments = pathname.split("/");
    const pathWithoutLocale = "/" + segments.slice(2).join("/");

    if (value === "en" || value === "my") {
      redirect(`${value}/${pathWithoutLocale}`);
    } else {
      redirect(`/${pathWithoutLocale}`);
    }
  };

  return (
    <nav className="w-full h-20 my-4 text-amber-950">
      <div className="w-full h-full bg-orange-100 shadow-lg rounded-3xl px-6 grid grid-cols-5 gap-4 items-center">
        <div className="col-span-1 font-bold text-xl">YaT KWAT</div>
        <div className="flex gap-4 col-span-3 w-full justify-center">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={`/${locale}${item.href}`}
              className="py-2 px-2 rounded-md hover:bg-orange-200/30 transition duration-100"
            >
              {dict.navbar[item.title]}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 col-span-1 justify-end items-center">
          <FormControl className="w-17" size="small">
            <Select
              labelId="language-label"
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              sx={{
                height: 36,
                borderRadius: 3,
                backgroundColor: "var(--color-amber-50)",
              }}
              SelectDisplayProps={{}}
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 0.5,
                    backgroundColor: "var(--color-amber-50)",
                    borderRadius: 2,
                  },
                },
                MenuListProps: {
                  sx: {
                    py: 0,
                  },
                },
              }}
            >
              <MenuItem value="en" sx={{ m: 0.5, px: 1.5, borderRadius: 2 }}>
                <EnglishFlagIcon style={{ width: 20, height: 20 }} />
              </MenuItem>
              <MenuItem value="my" sx={{ m: 0.5, px: 1.5, borderRadius: 2 }}>
                <BurmeseFlagIcon style={{ width: 20, height: 20 }} />
              </MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 30, height: 30 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: "var(--color-amber-50)",
                  borderRadius: 2,
                },
              },
              list: {
                sx: {
                  py: 0,
                },
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ m: 0.5, px: 1.5, borderRadius: 2 }}
            >
              <span className="text-sm">Log in</span>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ m: 0.5, px: 1.5, borderRadius: 2 }}
            >
              <span className="text-sm">Sign up</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
