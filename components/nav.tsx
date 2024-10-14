"use client";

import { useState, type ReactNode } from "react";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  Button,
  Link,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Breadcrumbs,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  NavbarMenuToggle,
  Avatar,
} from "@nextui-org/react";
import { SimpleIconsDiscord } from "./icons/discord";
import { SimpleIconsInstagram } from "./icons/instagram";
import { SimpleIconsLinkedin } from "./icons/linkedin";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  EnvelopeIcon as EnvelopeIcon20,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import NextImage from "next/image";

import { useSession, signOut } from "next-auth/react";

export default function Nav({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const segments = useSelectedLayoutSegments();
  // const { id } = useParams() as { id?: string };

  // const [siteId, setSiteId] = useState<string | null>();
  // const [showSidebar, setShowSidebar] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  if (status === "loading") return null;
  const user = session?.user;
  if (!user) return null;

  return (
    <>
      <Navbar className="texture" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />

          <NavbarBrand className="flex items-center">
            <Link href={process.env.NEXT_PUBLIC_ROOT_URL}>
              <Image
                as={NextImage}
                src={`/logo-on-${theme || "dark"}.png`}
                width={44}
                height={44}
                alt="Logo"
              />
            </Link>

            {/* <div className="mx-4 h-11 rotate-[30deg] border-l border-foreground-400" /> */}
            <span className="px-2 text-medium text-foreground/50">/</span>

            <Link href="/">
              <h1 className="font-mono text-2xl font-bold text-foreground shadow-primary text-shadow">
                [workshop]
              </h1>
            </Link>

            <Breadcrumbs
              size="lg"
              separator="/"
              itemClasses={{ separator: "px-2" }}
              maxItems={3}
              itemsBeforeCollapse={3}
              itemsAfterCollapse={0}
              className="hidden sm:block"
              renderEllipsis={({ items, ellipsisIcon, separator }) => (
                <div className="flex items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        className="h-6 w-6 min-w-6"
                        size="sm"
                        variant="flat"
                      >
                        {ellipsisIcon}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Routes">
                      {items.map((item, index) => (
                        <DropdownItem key={index} href={item.href}>
                          {item.children}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  {separator}
                </div>
              )}
            >
              {pathname.split("/").map((segment, index) => (
                <BreadcrumbItem
                  key={index}
                  href={`/${pathname
                    .split("/")
                    .slice(1, index + 1)
                    .join("/")}`}
                >
                  {segment}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </NavbarBrand>
        </NavbarContent>
        {/* <NavbarContent className="flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#team">
              Team
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" href="#events">
              Events
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {/* <User
                  as={Button}
                  isFocusable
                  size="sm"
                  variant="light"
                  avatarProps={
                    user.image
                      ? {
                          isBordered: true,
                          src: user.image,
                        }
                      : undefined
                  }
                  className="h-auto justify-start p-2 transition-transform"
                  description={user.email}
                  name={user.name}
                /> */}
                <Avatar
                  as="button"
                  isBordered
                  size="sm"
                  src={user.image || undefined}
                  className="transition-transform"
                  name={user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                {/* <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem> */}
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  }
                  onClick={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex h-[calc(100%-4rem)]">
        {/* <div className="diagonal-lines flex h-full w-[20rem] flex-col gap-4 bg-default bg-opacity-20 p-4 backdrop-blur">
          <div className="flex flex-1 flex-col gap-4">lmfao</div>

          <div className="flex flex-col gap-4">
            <Dropdown placement="top-start">
              <DropdownTrigger>
                <User
                  as={Button}
                  isFocusable
                  size="lg"
                  variant="light"
                  avatarProps={
                    user.image
                      ? {
                          isBordered: true,
                          src: user.image,
                        }
                      : undefined
                  }
                  className="h-auto justify-start p-2 transition-transform"
                  description={user.email}
                  name={user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  }
                  onClick={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div> */}

        {children}
      </div>
    </>
  );
}
