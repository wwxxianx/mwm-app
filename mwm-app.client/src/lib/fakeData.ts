import { Admin, Author, Book, Category, Order, User } from "@/types/dataType";
import { format } from "date-fns";

export const addresses = [
    {
        fullName: "Ngu Wei Xian",
        phoneNumber: "601161357276",
        state: "Johor",
        postalCode: 81200,
        streetAddress: "Jalan Nakhoda 19, 25.",
        unitAddress: "D-16-06",
        isDefault: true,
    },
    {
        fullName: "Ngu Wei Xian",
        phoneNumber: "601161357276",
        state: "Johor",
        postalCode: 81200,
        streetAddress: "Jalan Nakhoda 19, 25.",
        isDefault: false,
    },
    {
        fullName: "Ngu Wei Xian",
        phoneNumber: "601161357276",
        state: "Johor",
        postalCode: 81200,
        streetAddress: "Jalan Nakhoda 19, 25.",
        isDefault: false,
    },
];

export const previewUrl =
    "https://firebasestorage.googleapis.com/v0/b/nft-riverpod.appspot.com/o/Chong%20Jack%20Pang%20Internship%20Attendance%20Record%20(3).pdf?alt=media&token=7226b8a6-4d0e-44c8-b9f7-28231374c63b";

export let authors: Author[] = [
    {
        id: "1",
        fullName: "Derek T.",
        imageUrl: "https://i.ibb.co/VqgQCvF/author-2.jpg",
    },
    {
        id: "2",
        fullName: "J.R. Morgan",
        imageUrl: "https://i.ibb.co/PjhBJ8j/author-1.png",
    },
    {
        id: "3",
        fullName: "Steve Kwek",
        imageUrl: "https://i.ibb.co/VqgQCvF/author-2.jpg",
    },
    {
        id: "4",
        fullName: "Derek T.",
        imageUrl: "https://i.ibb.co/VqgQCvF/author-2.jpg",
    },
    {
        id: "5",
        fullName: "J.R. Morgan",
        imageUrl: "https://i.ibb.co/PjhBJ8j/author-1.png",
    },
    {
        id: "6",
        fullName: "Steve Kwek",
        imageUrl: "https://i.ibb.co/VqgQCvF/author-2.jpg",
    },
];

export let admins: Admin[] = [
    {
        id: "1",
        fullName: "Super Admin",
        email: "super@gmail.com",
        password: "super123",
    },
    {
        id: "2",
        fullName: "Lee Kee Sen",
        email: "admin1@gmail.com",
        password: "super123",
    },
    {
        id: "3",
        fullName: "Editor Kai",
        email: "admin2@gmail.com",
        password: "super123",
    },
];

export const books: Book[] = [
    {
        id: "1",
        title: "Sapiens",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[0],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "2",
        title: "Principles",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/3fqRdhM/steve-jobs-4.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "3",
        title: "Man's Search for Meaning Lorem Ipsum Hask Skliks Liksien",
        slug: "book-title",
        imageUrl:
            "https://i.ibb.co/k9jtg6P/design-for-writers-book-cover-tf-2-a-million-to-one.webp",
        author: authors[2],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "4",
        title: "Book Title",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "5",
        title: "Book Title",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "6",
        title: "Book Title",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "7",
        title: "Book Title",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
    {
        id: "8",
        title: "Book Title",
        slug: "book-title",
        imageUrl: "https://i.ibb.co/yqYD401/sapiens-3.jpg",
        author: authors[1],
        category: "Fiction",
        description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        sku: 20,
        price: 99.99,
        series: null,
    },
];

export const users: User[] = [
    {
        id: "1",
        email: "user1@gmail.com",
        fullName: "Mishel Jin",
        profileImageUrl: "https://github.com/shadcn.png",
        phoneNumber: "+6011928381",
    },
    {
        id: "2",
        email: "user1@gmail.com",
        fullName: "Mishel Jin",
        profileImageUrl: "https://github.com/shadcn.png",
        phoneNumber: "+6011928381",
    },
    {
        id: "3",
        email: "user1@gmail.com",
        fullName: "Mishel Jin",
        profileImageUrl: "https://github.com/shadcn.png",
        phoneNumber: "+6011928381",
    },
];

export const orders: Order[] = [
    {
        id: "102",
        user: users[0],
        price: 99.99,
        status: "Completed",
        createdAt: new Date(2014, 1, 11),
        updatedAt: new Date(2023, 1, 4),
        items: [
            {
                book: books[0],
                quantity: 1,
            },
            {
                book: books[1],
                quantity: 3,
            },
            {
                book: books[1],
                quantity: 3,
            },
            {
                book: books[1],
                quantity: 3,
            },
            {
                book: books[1],
                quantity: 3,
            },
        ],
    },
    {
        id: "103",
        user: users[0],
        price: 99.99,
        status: "Pending",
        createdAt: new Date(2014, 1, 11),
        updatedAt: new Date(2023, 2, 4),
        items: [
            {
                book: books[0],
                quantity: 3,
            },
            {
                book: books[1],
                quantity: 3,
            },
        ],
    },
    {
        id: "223",
        user: users[0],
        price: 99.99,
        status: "Delivery",
        createdAt: new Date(2015, 11, 11),
        updatedAt: new Date(2023, 12, 4),
        items: [
            {
                book: books[0],
                quantity: 1,
            },
            {
                book: books[1],
                quantity: 3,
            },
        ],
    },
    {
        id: "001",
        user: users[0],
        price: 99.99,
        status: "Pending",
        createdAt: new Date(2022, 1, 11),
        updatedAt: new Date(2023, 4, 4),
        items: [
            {
                book: books[2],
                quantity: 1,
            },
            {
                book: books[1],
                quantity: 3,
            },
        ],
    },
    {
        id: "002",
        user: users[0],
        price: 99.99,
        status: "Processing",
        createdAt: new Date(2020, 1, 11),
        updatedAt: new Date(2023, 2, 4),
        items: [
            {
                book: books[0],
                quantity: 1,
            },
            {
                book: books[1],
                quantity: 1,
            },
        ],
    },
];

export const categories: Category[] = [
    {
        id: "Fiction",
        category: "Fiction",
    },
    {
        id: "Technology",
        category: "Technology",
    },
    {
        id: "Education",
        category: "Education",
    },
    {
        id: "Health",
        category: "Health",
    },
];

export const cartItems = [
    {
        item: books[1],
        quantity: 1,
    },
    {
        item: books[0],
        quantity: 2,
    },
    {
        item: books[2],
        quantity: 1,
    },
    {
        item: books[1],
        quantity: 1,
    },
    {
        item: books[0],
        quantity: 2,
    },
    {
        item: books[2],
        quantity: 1,
    },
    {
        item: books[1],
        quantity: 1,
    },
    {
        item: books[0],
        quantity: 2,
    },
    {
        item: books[2],
        quantity: 1,
    },
];
