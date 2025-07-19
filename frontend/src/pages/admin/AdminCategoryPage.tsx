import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [editingCategory, setEditingCategory] = useState<{
    _id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Не вдалося завантажити категорії. " + error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success("Категорію видалено.");
      fetchCategories();
    } catch (error) {
      toast.error("Не вдалося видалити категорію. " + error);
    }
  };

  const initialValues = { name: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Назва категорії обов'язкова."),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: import("formik").FormikHelpers<{ name: string }>
  ) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, values);
        toast.success("Категорію оновлено.");
      } else {
        await addCategory(values);
        toast.success("Категорію додано.");
      }
      fetchCategories();
      resetForm();
      setEditingCategory(null);
    } catch (error) {
      toast.error("Не вдалося зберегти категорію. " + error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Керування категоріями</h1>
      <Formik
        initialValues={editingCategory || initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mb-6">
          <div>
            <label htmlFor="name" className="block font-medium">
              Назва категорії
            </label>
            <Field
              type="text"
              name="name"
              className="p-2 border rounded w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingCategory ? "Оновити" : "Додати"}
          </button>
        </Form>
      </Formik>
      <div>
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded mb-4 flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div>
              <button
                onClick={() => setEditingCategory(category)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
              >
                Редагувати
              </button>
              <button
                onClick={() => handleDelete(category._id)}
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
