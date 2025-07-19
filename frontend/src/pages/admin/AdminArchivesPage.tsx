import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  getAllArchives,
  getArchiveById,
  addArchive,
  updateArchive,
  deleteArchive,
} from "../../services/archives";
import { getAllCategories } from "../../services/category";
import type { ArchiveStoryType } from "../../types/Archive";
import { FormField, ActionButtons, SubmitButton, TagManager } from "../../components/admin/FormComponents";
import { showSuccessToast, createErrorHandler, formatDateForInput } from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

interface Category {
  _id: string;
  name: string;
}

export default function AdminArchivesPage() {
  const [archives, setArchives] = useState<ArchiveStoryType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingArchive, setEditingArchive] = useState<ArchiveStoryType | null>(null);
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
      createErrorHandler(MESSAGES.ERROR.LOAD_ARCHIVES)(error);
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
      await deleteArchive(id);
      showSuccessToast(MESSAGES.SUCCESS.ARCHIVE_DELETED);
      fetchArchives();
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.DELETE_ARCHIVE)(error);
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
    date: formatDateForInput(new Date()),
    imported: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_TITLE),
    text: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_TEXT),
    category: Yup.string().required(MESSAGES.VALIDATION.REQUIRED_CATEGORY),
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
        showSuccessToast(MESSAGES.SUCCESS.ARCHIVE_UPDATED);
      } else {
        await addArchive(payload);
        showSuccessToast(MESSAGES.SUCCESS.ARCHIVE_ADDED);
      }
      fetchArchives();
      resetForm();
      setEditingArchive(null);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.SAVE_ARCHIVE)(error);
    }
  };

  const handleEdit = async (id?: string) => {
    if (!id) return;
    try {
      const archive = await getArchiveById(id);
      setEditingArchive({
        ...archive,
        date: formatDateForInput(archive.date),
      });
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_FOR_EDIT_ARCHIVE)(error);
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
            <div className={CSS_CLASSES.FORM_GRID}>
              <FormField name="title" label="Заголовок" />
              <FormField name="text" label="Текст" />
              
              <FormField name="category" label="Категорія" as="select">
                <option value="">Оберіть категорію</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </FormField>

              <div>
                <label className={CSS_CLASSES.LABEL}>Теги</label>
                <TagManager
                  tags={values.tags || []}
                  newTag={newTag}
                  onNewTagChange={setNewTag}
                  onAddTag={() => {
                    const trimmedTag = newTag.trim();
                    if (trimmedTag && !values.tags?.includes(trimmedTag)) {
                      setFieldValue("tags", [...(values.tags || []), trimmedTag]);
                      setNewTag("");
                    }
                  }}
                  onRemoveTag={(index) =>
                    setFieldValue(
                      "tags",
                      values.tags?.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>

              <FormField name="name" label="Ім'я" />
              <FormField name="age" label="Вік" type="number" />
              <FormField name="city" label="Місто" />
              <FormField name="date" label="Дата" type="date" />
              <FormField name="imported" label="Імпортовано" type="checkbox" />
            </div>
            <SubmitButton isEditing={!!editingArchive} />
          </Form>
        )}
      </Formik>

      <div>
        {archives.map((archive) => (
          <div key={archive._id} className={CSS_CLASSES.CARD}>
            <div>
              <h2 className="font-bold">{archive.title}</h2>
              <p>{archive.text}</p>
            </div>
            <ActionButtons
              onEdit={() => handleEdit(archive._id)}
              onDelete={() => handleDelete(archive._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
