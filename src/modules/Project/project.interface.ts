
export type TProject = {
    id: number;
    title: string;
    slug?: string | null;
    description: string;
    thumbnail: string;
    liveUrl: string;
    repoUrl: string;
    features: string[];
    ownerId: number;
};

