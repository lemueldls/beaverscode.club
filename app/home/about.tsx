"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  ScrollShadow,
} from "@heroui/react";
import NextImage from "next/image";
import { Carousel } from "primereact/carousel";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface Brand {
  name: string;
  image: string;
}

function BrandTemplate(brand: Brand) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        as={NextImage}
        width="256"
        height="256"
        className="size-auto"
        src={brand.image}
        alt={brand.name}
      />
    </div>
  );
}

const values = [
  { name: "ACM", image: "/acm.svg" },
  { name: "GDSC", image: "/gdsc.svg" },
  { name: "Notion", image: "/notion.png" },
  // { name: "GitHub", image: "/github-light.svg" },
  { name: "BYTE", image: "/byte.png" },
];

export default function HomePageAbout() {

  const [page, setPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prevPage) => (prevPage + 1) % values.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      id="about"
      className="texture block w-full max-w-[75rem] bg-background/60 px-16 py-8 dark:bg-default/10"
      shadow="sm"
    >
      <CardHeader className="items-center justify-center flex flex-col lg:flex-row gap-16">
        <Image
          as={NextImage}
          width="710"
          height="224"
          className="size-auto flex-1"
          src="/ccny-collab.svg"
          alt="CCNY Collab"
        />
        <Divider
          orientation="vertical"
          className="hidden h-64 w-1 lg:block"
        />
        <Divider orientation="horizontal" className="mt-4 block lg:hidden" />
        <Carousel
          value={values}
          page={page}
          numScroll={1}
          numVisible={1}
          showIndicators={false}
          showNavigators={false}
          orientation="vertical"
          itemTemplate={BrandTemplate}
          pt={{
            item: { className: "h-full items-center justify-center" },
            itemCloned: {
              className:
                "flex shrink-0 grow w-full h-full items-center justify-center",
            },
          }}
        />
      </CardHeader>

      <CardBody>
        <p className="m-auto w-full max-w-5xl text-center text-2xl">
          With leaders from{" "}
          <Link
            href="https://www.acm.org/"
            isExternal
            showAnchorIcon
            anchorIcon={<ArrowTopRightOnSquareIcon className="ml-1 size-4" />}
            className="text-2xl"
          >
            ACM
          </Link>
          ,{" "}
          <Link
            href="https://developers.google.com/community"
            isExternal
            showAnchorIcon
            anchorIcon={<ArrowTopRightOnSquareIcon className="ml-1 size-4" />}
            className="text-2xl"
          >
            GDGC
          </Link>
          ,{" "}
          <Link
            href="https://www.notion.so/"
            isExternal
            showAnchorIcon
            anchorIcon={<ArrowTopRightOnSquareIcon className="ml-1 size-4" />}
            className="text-2xl"
          >
            Notion
          </Link>
          , and{" "}
          <Link
            href="https://www.byteccny.com/"
            isExternal
            showAnchorIcon
            anchorIcon={<ArrowTopRightOnSquareIcon className="ml-1 size-4" />}
            className="text-2xl"
          >
            BYTE
          </Link>
          , we are proud to present Beavers Code, a student-led computer
          science club at the City College of New York. The club aims to foster
          a community of tech enthusiasts who collaborate in developing the
          skills they need in the industry, expanding their network,
          participating in activities related to new technologies, and learning
          how to further their professional careers.
        </p>
      </CardBody>
    </Card>
  );
}
