import { useGetTopBooksQuery } from "@/apiService/bookApi";
import { cn } from "@/lib/utils";
import { Carousel } from "@/user/components/Carousel/Carousel";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { HTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";

type BookCarouselProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

export default function BookCarousel({ className }: BookCarouselProps) {
    const { data: topBooks, isLoading } = useGetTopBooksQuery();
    const [currentActiveIndex, setCurrentActiveIndex] = useState(1);
    const currentBook = topBooks?.[currentActiveIndex].book;

    function onCarouselItemClick(index: number) {
        if (index === currentActiveIndex) {
            return null;
        }
        setCurrentActiveIndex(index);
    }

    const containerVariants = {
        initial: {
            opacity: 0,
            x: 50, // start from right
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                // when: "beforeChildren",
                // staggerChildren: 0.2,
                duration: 0.8, // slower transition
                ease: "easeInOut",
            },
        },
        exit: {
            opacity: 0,
            x: -50, // exit to the left
            transition: {
                duration: 0.8, // slower transition
            },
        },
    };

    const authorVariants = {
        initial: { x: 20, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 },
        },
        exit: { x: -20, opacity: 0, transition: { duration: 0.1 } },
    };

    const titleVariants = {
        initial: { x: 20, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.15 },
        },
        exit: { x: -20, opacity: 0, transition: { duration: 0.1 } },
    };

    const descriptionVariants = {
        initial: { x: 20, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
        },
        exit: { x: -20, opacity: 0, transition: { duration: 0.1 } },
    };

    return (
        <div className="flex flex-col items-center lg:flex-row overflow-hidden container mt-[-20px] md:mt-[-40px] lg:mt-[-50px]">
            <div
                className={cn(
                    "container flex justify-center w-full max-w-[200px] h-[250px] md:max-w-[300px] md:h-[400px] lg:h-[450px] lg:max-w-[310px] lg:mt-0",
                    className
                )}
            >
                <Carousel
                    items={topBooks}
                    currentActive={currentActiveIndex}
                    onCarouselItemClick={onCarouselItemClick}
                />
            </div>
            <div className="relative min-w-[311px] mt-14 lg:max-w-[590px]">
                <motion.div
                    key={currentBook?.id}
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative marker:before:z-20"
                >
                    <div className="flex items-start justify-between">
                        <motion.div>
                            <h2 className="text-lg md:text-xl font-medium">
                                {currentBook?.title}
                            </h2>
                            <p className="text-black/60 lg:mt-2">
                                by {currentBook?.author?.fullName}
                            </p>
                        </motion.div>
                        {/* <motion.div
                            variants={authorVariants}
                            className="flex items-center gap-2"
                        >
                            <Avatar className="w-7 h-7">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-slate-200 text-xs">
                                    WI
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                                {currentBook.author.fullName}
                            </p>
                        </motion.div> */}
                        <Link
                            to={`/book/${currentBook?.id}`}
                            // variant="ghost"
                            className="flex items-center gap-2 rounded-none hover:bg-transparent group"
                        >
                            <span className="font-medium text-sm whitespace-nowrap">
                                Read More
                            </span>
                            <ArrowLongRightIcon className="w-4 group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                    {/* <motion.h2 variants={titleVariants} className="mt-1">
                        {currentBook.title}
                    </motion.h2>
                    <motion.div
                        variants={titleVariants}
                        className="flex items-center gap-1 text-sm text-slate-600"
                    >
                        <LibraryBig className="w-4" />
                        <h3>History of Humankind</h3>
                    </motion.div> */}
                    <motion.p
                        variants={descriptionVariants}
                        className="text-sm mt-3 tracking-wide text-slate-600 lg:text-base leading-6"
                    >
                        {currentBook?.description}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
