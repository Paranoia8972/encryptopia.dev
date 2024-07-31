"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiGithub } from "react-icons/fi";
import { FaRss, FaDiscord, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState, useEffect } from "react";

const calculateAge = (birthdate: string | number | Date) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const determineGrade = (age: number) => {
  if (age >= 6 && age <= 17) {
    return age - 5;
  }
  return null;
};

export default function Home() {
  const birthdate = "2009-03-05";
  const [age, setAge] = useState(calculateAge(birthdate));
  const [grade, setGrade] = useState(determineGrade(age));

  useEffect(() => {
    const interval = setInterval(() => {
      const newAge = calculateAge(birthdate);
      setAge(newAge);
      setGrade(determineGrade(newAge));
    }, 1000 * 60 * 60 * 24 * 365);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <div className="w-full max-w-5xl m-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card rounded-lg p-4 flex flex-col items-start justify-center border">
                <Avatar className="size-16 mb-4">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <h1 className="text-xl text-card-foreground/70">
                  <span className="text-card-foreground/100">
                    Hi, I&apos;m Clemens!
                  </span>{" "}
                  A student and developer.
                </h1>
                <Link
                  className="hover:underline pt-12 flex items-center"
                  href={"mailto:hello@encryptopia.dev"}
                >
                  Contact me
                  <FaArrowRight className="ml-1 size-3" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="https://github.com/Paranoia8972"
                className="bg-card rounded-lg p-4 flex flex-col items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors border"
                prefetch={false}
              >
                <FiGithub className="w-6 h-6 mb-2" />
                <span className="text-sm">GitHub</span>
              </Link>
              <Link
                href="https://blog.encryptopia.dev"
                className="bg-card rounded-lg p-4 flex flex-col items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors border"
                prefetch={false}
              >
                <FaRss className="w-6 h-6 mb-2" />
                <span className="text-sm">Blog</span>
              </Link>
              <Link
                href="https://twitter.com/Paranoia8972?mx=1"
                className="bg-card rounded-lg p-4 flex flex-col items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors border"
                prefetch={false}
              >
                <FaXTwitter className="w-6 h-6 mb-2" />
                <span className="text-sm">Twitter</span>
              </Link>
              <Link
                href="https://discord.com/users/982984144567017493"
                className="bg-card rounded-lg p-4 flex flex-col items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors border"
                prefetch={false}
              >
                <FaDiscord className="w-6 h-6 mb-2" />
                <span className="text-sm">Discord</span>
              </Link>
            </div>
            <div className="bg-card rounded-lg p-4 md:col-span-2 border">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-card-foreground/70">
                <span className="text-card-foreground">
                  My passion is building cool stuff.
                </span>{" "}
                I&apos;m a {age} year old high school student in {grade}th
                grade. I love exploring and working with Servers (Minecraft,
                Linux), Web Development and Raspberry Pis projects. I enjoy
                self-hosting stuff, enhancing my ethical hacking skills, and
                contributing to open-source projects.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 flex flex-col items-center justify-center border">
              <FaMapMarkerAlt className="w-6 h-6 mb-2 text-muted-foreground" />
              <p className="text-sm text-card-foreground">
                Based in Kiel, Germany
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <span className="text-sm font-normal opacity-75">
                Coming soon!
              </span>
              <h2 className="text-2xl font-bold mb-4">
                Subscribe to my newsletter
              </h2>
              <div title="Coming soon!">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                    disabled
                  />
                  <Button type="submit" disabled>
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-center opacity-75">
            <p>
              Made with <span className="">❤️</span> by
            </p>{" "}
            &nbsp;
            <Link className="hover:underline" href={"/links"}>
              @paranoia8972
            </Link>
            &nbsp;&middot;&nbsp;
            <Link className="hover:underline" href={"/impressum"}>
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
