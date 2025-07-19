export type ArchiveStoryType = {
    _id?: string;
    title: string;
    text: string;
    category: string;
    tags?: string[];
    name?: string;
    age?: number;
    city?: string;
    date?: string;
    imported?: boolean;
}