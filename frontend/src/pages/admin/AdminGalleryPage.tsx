import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  getAllGalleryItems,
  getGalleryItemById,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../services/gallery";
import { getAllCategories } from "../../services/category";
import type { GalleryItemType } from "../../types/Gallery";
import { FormField, ActionButtons, SubmitButton } from "../../components/admin/FormComponents";
import { FileUploadField } from "../../components/admin/FileUploadField";
import { showSuccessToast, createErrorHandler, formatDateForInput } from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

interface Category {
  _id: string;
  name: string;
}

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItemType | null>(null);

  useEffect(() => {
    fetchGalleryItems();
    fetchCategories();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const data = await getAllGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_GALLERY)(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_CATEGORIES)(error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteGalleryItem(id);
      showSuccessToast(MESSAGES.SUCCESS.GALLERY_ITEM_DELETED);
      fetchGalleryItems();
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.DELETE_GALLERY_ITEM)(error);
    }
  };

  const initialValues: Partial<GalleryItemType> = {
    title: "",
    description: "",
    contentType: "image",
    media: [],
    category: "",
    location: "",
    date: formatDateForInput(new Date()),
    imported: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_TITLE),
    description: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_DESCRIPTION),
    contentType: Yup.string()
      .oneOf(["image", "video", "audio"], MESSAGES.VALIDATION.INVALID_CONTENT_TYPE)
      .required(MESSAGES.VALIDATION.REQUIRED_CONTENT_TYPE),
    category: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_CATEGORY),
    location: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_LOCATION),
  });

  const handleSubmit = async (
    values: Partial<GalleryItemType>,
    { resetForm }: import("formik").FormikHelpers<Partial<GalleryItemType>>
  ) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "media" && Array.isArray(value)) {
          value.forEach((file) => formData.append("media", file));
        } else {
          formData.append(key, value as string);
        }
      });

      if (editingItem && editingItem._id) {
        await updateGalleryItem(editingItem._id, formData);
        showSuccessToast(MESSAGES.SUCCESS.GALLERY_ITEM_UPDATED);
      } else {
        await addGalleryItem(formData);
        showSuccessToast(MESSAGES.SUCCESS.GALLERY_ITEM_ADDED);
      }
      fetchGalleryItems();
      resetForm();
      setEditingItem(null);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.SAVE_GALLERY_ITEM)(error);
    }
  };

  const handleEdit = async (id?: string) => {
    if (!id) return;
    try {
      const item = await getGalleryItemById(id);
      setEditingItem(item);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_FOR_EDIT_GALLERY)(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Керування галереєю</h1>
      
      <Formik
        initialValues={editingItem || initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="mb-6">
            <div className={CSS_CLASSES.FORM_GRID}>
              <FormField name="title" label="Заголовок" />
              <FormField name="description" label="Опис" />
              
              <FormField name="contentType" label="Тип контенту" as="select">
                <option value="image">Зображення</option>
                <option value="video">Відео</option>
                <option value="audio">Аудіо</option>
              </FormField>

              <FileUploadField
                name="media"
                label="Медіафайли"
                multiple
                onChange={(files) => setFieldValue("media", files)}
              />

              <FormField name="category" label="Категорія" as="select">
                <option value="">Оберіть категорію</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </FormField>

              <FormField name="location" label="Локація" />
              <FormField name="date" label="Дата" type="date" />
              <FormField name="imported" label="Імпортовано" type="checkbox" />
            </div>
            <SubmitButton isEditing={!!editingItem} />
          </Form>
        )}
      </Formik>

      <div>
        {galleryItems.map((item) => (
          <div key={item._id} className={CSS_CLASSES.CARD}>
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <ActionButtons
              onEdit={() => handleEdit(item._id)}
              onDelete={() => handleDelete(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
