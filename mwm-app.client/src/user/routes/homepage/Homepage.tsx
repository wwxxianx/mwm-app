import BookCarousel from "./components/book-carousel";
import TopBooks from "./components/top-books";
import TopCategories from "./components/top-categories";

export default function Homepage() {
    return (
        <div className="bg-turquoise-50 pb-20">
            <p className="text-4xl text-font-secondary text-center mt-6 md:text-6xl lg:text-7xl lg:mt-12">
                2024's <br className="hidden md:block" /> Editor's Choice
            </p>
            <BookCarousel />
            <TopBooks />
            <TopCategories />
        </div>
    );
}
