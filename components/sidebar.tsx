import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
}

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className
        )}>
            <Link href={'/learn'}>
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src={"/logo.png"} height={40} width={40} alt="Mascot" className="rounded-md" />
                    <h1 className="text-2xl font-extrabold text-indigo-500 tracking-wide">
                        Lilyngo
                    </h1>
                </div>
            </Link>

            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" iconSrc={"/learn.svg"} href={"/learn"} />
                <SidebarItem label="Leaderboard" iconSrc={"/leaderboard.svg"} href={"/leaderboard"} />
                <SidebarItem label="Quests" iconSrc={"/quests.svg"} href={"/quests"} />
                <SidebarItem label="Shop" iconSrc={"/shop.svg"} href={"/shop"} />
            </div>

            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>

                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    )
}