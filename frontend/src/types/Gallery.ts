export type GalleryItemType = {
    _id?: string;
    title: string;
    description: string;
    contentType: 'image' | 'video' | 'audio';
    media: string[];
    category: string;
    name?: string;
    location: string;
    date?: string;
    imported?: boolean;
}