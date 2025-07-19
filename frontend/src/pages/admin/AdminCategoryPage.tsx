import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";
import { FormField, ActionButtons, SubmitButton } from "../../components/admin/FormComponents";
import { showSuccessToast, createErrorHandler } from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

interface Category {
  _id: string;
  name: string;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_CATEGORIES)(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      showSuccessToast(MESSAGES.SUCCESS.CATEGORY_DELETED);
      fetchCategories();
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.DELETE_CATEGORY)(error);
    }
  };

  const initialValues = { name: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_CATEGORY_NAME),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: import("formik").FormikHelpers<{ name: string }>
  ) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, values);
        showSuccessToast(MESSAGES.SUCCESS.CATEGORY_UPDATED);
      } else {
        await addCategory(values);
        showSuccessToast(MESSAGES.SUCCESS.CATEGORY_ADDED);
      }
      fetchCategories();
      resetForm();
      setEditingCategory(null);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.SAVE_CATEGORY)(error);
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
          <FormField
            name="name"
            label="Назва категорії"
            type="text"
          />
          <SubmitButton isEditing={!!editingCategory} />
        </Form>
      </Formik>

      <div>
        {categories.map((category) => (
          <div key={category._id} className={CSS_CLASSES.CARD}>
            <span>{category.name}</span>
            <ActionButtons
              onEdit={() => setEditingCategory(category)}
              onDelete={() => handleDelete(category._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
