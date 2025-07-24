// types/story.ts
import type { Category } from "./category";

export type StoryMedia = {
    photo?: string;
    audio?: string;
    video?: string;
};

export type Story = {
    _id: string;
    title: string;
    comment?: string;
    name?: string;
    age?: number;
    location?: string;
    category: string | Category;
    createdAt: string;
    media?: StoryMedia;
    flowerId?: string;
    source: "flower" | "archive";
};

export type CreateStoryPayload = {
    title: string;
    comment?: string;
    name?: string;
    age?: number | string | null;
    location?: string;
    category: string;
    source: "flower" | "archive";
    photo?: File;
    audio?: File;
    video?: File;
};
