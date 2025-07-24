// Пагінація по категорії
export const getStoriesByCategory = async (categoryId: string, page = 1, limit = 4): Promise<{ stories: Story[]; totalCount: number }> => {
    const response = await apiClient.get(`/stories/category/${categoryId}`, {
        params: { page, limit },
    });
    return response.data;
};

// Контекст (шуканий + сусіди)
export const getStoriesContextByCategory = async (categoryId: string, storyId: string, limit = 4): Promise<Story[]> => {
    const response = await apiClient.get(`/stories/category/${categoryId}/context/${storyId}`, {
        params: { limit },
    });
    return response.data;
};
export const getNextFlowerStory = async (current: { id?: string; flowerId?: string }): Promise<Story | null> => {
    const response = await apiClient.post("/stories/next", current, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const getPrevFlowerStory = async (current: { id?: string; flowerId?: string }): Promise<Story | null> => {
    const response = await apiClient.post("/stories/prev", current, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

import apiClient from "./apiClient";
import type { Story } from "../types/story";

export const getAllStories = async (params?: { source?: string }): Promise<Story[]> => {
    const response = await apiClient.get("/stories", { params });
    return response.data;
};

export const getStoryById = async (id: string): Promise<Story> => {
    const response = await apiClient.get(`/stories/${id}`);
    return response.data;
};

export const getStoryByFlowerId = async (flowerId: string): Promise<Story> => {
    const response = await apiClient.get(`/stories/flower/${flowerId}`);
    return response.data;
};

export const addStory = async (data: {
    title: string;
    comment?: string;
    name?: string;
    age?: number | string;
    location?: string;
    category: string;
    source: "flower" | "archive";
    photo?: File;
    audio?: File;
    video?: File;
}): Promise<Story> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.comment) formData.append("comment", data.comment);
    if (data.name) formData.append("name", data.name);
    if (data.age !== undefined && data.age !== null) formData.append("age", String(data.age));
    if (data.location) formData.append("location", data.location);
    formData.append("category", data.category);
    formData.append("source", data.source);
    if (data.photo) formData.append("photo", data.photo);
    if (data.audio) formData.append("audio", data.audio);
    if (data.video) formData.append("video", data.video);

    const response = await apiClient.post("/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateStory = async (
    id: string,
    data: Partial<Omit<Story, "_id" | "createdAt" | "media" | "flowerId">> & {
        photo?: File;
        audio?: File;
        video?: File;
    }
): Promise<Story> => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.comment) formData.append("comment", data.comment);
    if (data.name) formData.append("name", data.name);
    if (data.age !== undefined && data.age !== null) formData.append("age", String(data.age));
    if (data.location) formData.append("location", data.location);
    if (data.category) {
        const categoryValue = typeof data.category === "string"
            ? data.category
            : data.category._id || data.category.name;
        formData.append("category", categoryValue);
    }
    if (data.source) formData.append("source", data.source);
    if (data.photo) formData.append("photo", data.photo);
    if (data.audio) formData.append("audio", data.audio);
    if (data.video) formData.append("video", data.video);

    const response = await apiClient.patch(`/stories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteStory = async (id: string): Promise<void> => {
    await apiClient.delete(`/stories/${id}`);
};

export const searchStories = async (query: string): Promise<Story[]> => {
    const response = await apiClient.post("/stories/search", { query }, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};
// Get a random flower story (source: 'flower')
export const getRandomFlowerStory = async (): Promise<Story> => {
    const response = await apiClient.get("/stories/random-flower");
    return response.data;
};