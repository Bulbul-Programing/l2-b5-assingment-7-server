
export type TBlog = {
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    coverImage: string;
    published?: boolean;
    authorId: number;
};
