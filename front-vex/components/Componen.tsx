"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon/logo-vex-ok.svg";
import logoWhite from "@/public/icon/logo-vex-white.svg";
import bestTag from "@/public/icon/Medalion.svg";
import favTag from "@/public/icon/Favorite.svg";
import "@/app/globals.css";


interface LinkAkses {
    link: string;
    title?: string;
    subtitle?: String;
    className?: string;
    children?: React.ReactNode;
}

export function Logo({ ...props }) {
    return (
        <div >
            <Image
                src={logo}
                alt="Logo"
                width={490}
                height={120}
                {...props}
            />
        </div>
    );
}
export function LogoWhite({ ...props }) {
    return (
        <div >
            <Image
                src={logoWhite}
                alt="Logo"
                width={490}
                height={120}
                className="size-full " {...props}
            />
        </div>
    );
}

interface dataCard {
    link: string;
    title: string;
    className?: string;
}

export function Card({ link, title, className, ...props }: dataCard) {
    return (
        <div className="">
            <Image
                src={link}
                alt={title}
                width={100}
                height={100}
                className="object-fill rounded-xl size-full "
                {...props} />

        </div>
    );
}


export function TextNav({ link, title, subtitle, className, ...props }: LinkAkses) {
    return (
        <Link
            href={link || "/icon/logo-vex.svg"}
            className="group relative text-18 hover:text-main-blue py-4 items-center flex-wrap font-bold font-sans text-black transition-all ease-in-out duration-200"  {...props}
        >
            {title}
            <p className="flex items-center group-hover:text-main-blue  font-sans justify-center text-xs text-black opacity-65 ">
                {subtitle ||""}
                <span className="garis"></span>
            </p>


        </Link>

    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  link?:string;
  className?: string;
}
export function Button({ children,link, className, ...props }: ButtonProps) {
  return (
    <Link href={link || "/"}>
    <button
      className={`
         text-white font-bold font-tilt-wrap cursor-pointer bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] shadow-lg shadow-[#4A00E0]/40 transition-all ease-in-out duration-300
        hover:bg-none hover:bg-white hover:text-[#4A00E0] hover:border-[#4A00E0] border border-transparent ${className}`} {...props}
    > {children} </button>
    </Link>
  );
}
export function ButtonPutih({ children,link, className, ...props }: ButtonProps) {
  return (
    <Link href={link || "/"}>
    <button
      className={`
         text-main-blue font-bold font-tilt-wrap cursor-pointer bg-white shadow-lg border-main-blue shadow-[#4A00E0]/40 transition-all ease-in-out duration-300
        hover:bg-none hover:bg-main-blue hover:text-white hover:border-white border  ${className}`} {...props}
    > {children} </button>
    </Link>
  );
}

export function LinkAkses({ link, title,  className, ...props }: LinkAkses) {
    return (
        <Link
            href={link || "/icon/logo-vex.svg"}
            className="hover-text"  {...props}
        >
            {title}

        </Link>

    );
}

export function LinkAksesEks({ link, title, children,  className, ...props }: LinkAkses) {
    return (
        <a
            href={link || "/icon/logo-vex.svg"}
            className="hover-text"  {...props}
        >
            {title}{children}
        </a>

    );
}

export function BestTag ({...props}){
    return(
        <Image src={bestTag}
        width={100}
        height={100}
        alt="Medalion" 
        {...props}/>
    );
}
export function FavTag ({...props}){
    return(
        <Image src={favTag}
        width={100}
        height={100}
        alt="fav-icon"
        {...props}/>
    );
}
