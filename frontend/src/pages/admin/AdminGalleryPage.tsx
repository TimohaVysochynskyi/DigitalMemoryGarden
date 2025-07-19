import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  getAllGalleryItems,
  getGalleryItemById,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../services/gallery";
import { getAllCategories } from "../../services/category";
import type { GalleryItemType } from "../../types/Gallery";

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
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
      toast.error("Не вдалося завантажити галерею. " + error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Не вдалося завантажити категорії. " + error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteGalleryItem(id);
      toast.success("Елемент галереї видалено.");
      fetchGalleryItems();
    } catch (error) {
      toast.error("Не вдалося видалити елемент галереї. " + error);
    }
  };

  const initialValues: Partial<GalleryItemType> = {
    title: "",
    description: "",
    contentType: "image",
    media: [],
    category: "",
    location: "",
    date: new Date().toISOString().split("T")[0], // Формат yyyy-MM-dd
    imported: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий."),
    description: Yup.string().required("Опис обов'язковий."),
    contentType: Yup.string()
      .oneOf(["image", "video", "audio"], "Неправильний тип контенту.")
      .required("Тип контенту обов'язковий."),
    category: Yup.string().required("Категорія обов'язкова."),
    location: Yup.string().required("Локація обов'язкова."),
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
        toast.success("Елемент галереї оновлено.");
      } else {
        await addGalleryItem(formData);
        toast.success("Елемент галереї додано.");
      }
      fetchGalleryItems();
      resetForm();
      setEditingItem(null);
    } catch (error) {
      toast.error("Не вдалося зберегти елемент галереї. " + error);
    }
  };

  const handleEdit = async (id?: string) => {
    if (!id) return;
    try {
      const item = await getGalleryItemById(id);
      setEditingItem(item);
    } catch (error) {
      toast.error(
        "Не вдалося завантажити елемент галереї для редагування. " + error
      );
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
        {({ values, setFieldValue }) => (
          <Form className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block font-medium">
                  Заголовок
                </label>
                <Field
                  type="text"
                  name="title"
                  className="p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block font-medium">
                  Опис
                </label>
                <Field
                  type="text"
                  name="description"
                  className="p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="contentType" className="block font-medium">
                  Тип контенту
                </label>
                <Field
                  as="select"
                  name="contentType"
                  className="p-2 border rounded w-full"
                >
                  <option value="image">Зображення</option>
                  <option value="video">Відео</option>
                  <option value="audio">Аудіо</option>
                </Field>
                <ErrorMessage
                  name="contentType"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="media" className="block font-medium">
                  Медіафайли
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setFieldValue(
                      "media",
                      Array.from(e.currentTarget.files || [])
                    )
                  }
                  className="p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="media"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="category" className="block font-medium">
                  Категорія
                </label>
                <Field
                  as="select"
                  name="category"
                  className="p-2 border rounded w-full"
                >
                  <option value="">Оберіть категорію</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="location" className="block font-medium">
                  Локація
                </label>
                <Field
                  type="text"
                  name="location"
                  className="p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="date" className="block font-medium">
                  Дата
                </label>
                <Field
                  type="date"
                  name="date"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="imported" className="block font-medium">
                  Імпортовано
                </label>
                <Field
                  type="checkbox"
                  name="imported"
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {editingItem ? "Оновити" : "Додати"}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        {galleryItems.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(item._id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
              >
                Редагувати
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
