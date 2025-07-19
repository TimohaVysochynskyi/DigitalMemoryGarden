import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  getAllArchives,
  getArchiveById,
  addArchive,
  updateArchive,
  deleteArchive,
} from "../../services/archives";
import { getAllCategories } from "../../services/category";
import type { ArchiveStoryType } from "../../types/Archive";

export default function AdminArchivesPage() {
  const [archives, setArchives] = useState<ArchiveStoryType[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [editingArchive, setEditingArchive] = useState<ArchiveStoryType | null>(
    null
  );
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchArchives();
    fetchCategories();
  }, []);

  const fetchArchives = async () => {
    try {
      const data = await getAllArchives();
      setArchives(data);
    } catch (error) {
      toast.error("Не вдалося завантажити архіви. " + error);
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
      await deleteArchive(id);
      toast.success("Архів видалено.");
      fetchArchives();
    } catch (error) {
      toast.error("Не вдалося видалити архів. " + error);
    }
  };

  const initialValues: ArchiveStoryType = {
    title: "",
    text: "",
    category: "",
    tags: [],
    name: "",
    age: undefined,
    city: "",
    date: new Date().toISOString().split("T")[0], // Формат yyyy-MM-dd
    imported: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий."),
    text: Yup.string().required("Текст обов'язковий."),
    category: Yup.string().required("Категорія обов'язкова."),
  });

  const handleSubmit = async (
    values: ArchiveStoryType,
    { resetForm }: import("formik").FormikHelpers<ArchiveStoryType>
  ) => {
    try {
      // Видаляємо службові поля перед відправкою
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...payload } = values;

      if (editingArchive && editingArchive._id) {
        await updateArchive(editingArchive._id, payload);
        toast.success("Архів оновлено.");
      } else {
        await addArchive(payload);
        toast.success("Архів додано.");
      }
      fetchArchives();
      resetForm();
      setEditingArchive(null);
    } catch (error) {
      toast.error("Не вдалося зберегти архів. " + error);
    }
  };

  const handleEdit = async (id?: string) => {
    if (!id) return;
    try {
      const archive = await getArchiveById(id);
      setEditingArchive({
        ...archive,
        date: new Date(archive.date || "").toISOString().split("T")[0], // Формат yyyy-MM-dd
      });
    } catch (error) {
      toast.error("Не вдалося завантажити архів для редагування. " + error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Керування архівами</h1>
      <Formik
        initialValues={editingArchive || initialValues}
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
                <label htmlFor="text" className="block font-medium">
                  Текст
                </label>
                <Field
                  type="text"
                  name="text"
                  className="p-2 border rounded w-full"
                />
                <ErrorMessage
                  name="text"
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
                <label htmlFor="tags" className="block font-medium">
                  Теги
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Новий тег"
                    className="p-2 border rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmedTag = newTag.trim();
                      if (trimmedTag && !values.tags?.includes(trimmedTag)) {
                        setFieldValue("tags", [
                          ...(values.tags || []),
                          trimmedTag,
                        ]);
                        setNewTag("");
                      }
                    }}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Додати
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 px-2 py-1 rounded"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "tags",
                            values.tags?.filter((_, i) => i !== index)
                          )
                        }
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block font-medium">
                  Ім'я
                </label>
                <Field
                  type="text"
                  name="name"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="age" className="block font-medium">
                  Вік
                </label>
                <Field
                  type="number"
                  name="age"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium">
                  Місто
                </label>
                <Field
                  type="text"
                  name="city"
                  className="p-2 border rounded w-full"
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
              {editingArchive ? "Оновити" : "Додати"}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        {archives.map((archive) => (
          <div
            key={archive._id}
            className="p-4 border rounded mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{archive.title}</h2>
              <p>{archive.text}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(archive._id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
              >
                Редагувати
              </button>
              <button
                onClick={() => handleDelete(archive._id)}
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
