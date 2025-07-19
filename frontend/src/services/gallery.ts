import apiClient from "./apiClient";
import type { GalleryItemType } from "../types/Gallery";

export const getAllGalleryItems = async (): Promise<GalleryItemType[]> => {
    const response = await apiClient.get("/gallery");
    return response.data;
};

export const getGalleryItemById = async (id: string): Promise<GalleryItemType> => {
    const response = await apiClient.get(`/gallery/${id}`);
    return response.data;
};

export const addGalleryItem = async (data: FormData): Promise<GalleryItemType> => {
    const response = await apiClient.post("/gallery", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateGalleryItem = async (id: string, data: FormData): Promise<GalleryItemType> => {
    const response = await apiClient.patch(`/gallery/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
    await apiClient.delete(`/gallery/${id}`);
};