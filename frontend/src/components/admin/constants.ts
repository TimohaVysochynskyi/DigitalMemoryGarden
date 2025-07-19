// Constants for admin pages
export const ADMIN_CONSTANTS = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  STORAGE_KEY: 'adminPassword',
} as const;

export const MESSAGES = {
  SUCCESS: {
    ARCHIVE_ADDED: 'Архів додано.',
    ARCHIVE_UPDATED: 'Архів оновлено.',
    ARCHIVE_DELETED: 'Архів видалено.',
    CATEGORY_ADDED: 'Категорію додано.',
    CATEGORY_UPDATED: 'Категорію оновлено.',
    CATEGORY_DELETED: 'Категорію видалено.',
    GALLERY_ITEM_ADDED: 'Елемент галереї додано.',
    GALLERY_ITEM_UPDATED: 'Елемент галереї оновлено.',
    GALLERY_ITEM_DELETED: 'Елемент галереї видалено.',
    LOGIN_SUCCESS: 'Успішний вхід!',
  },
  ERROR: {
    LOAD_ARCHIVES: 'Не вдалося завантажити архіви.',
    LOAD_CATEGORIES: 'Не вдалося завантажити категорії.',
    LOAD_GALLERY: 'Не вдалося завантажити галерею.',
    DELETE_ARCHIVE: 'Не вдалося видалити архів.',
    DELETE_CATEGORY: 'Не вдалося видалити категорію.',
    DELETE_GALLERY_ITEM: 'Не вдалося видалити елемент галереї.',
    SAVE_ARCHIVE: 'Не вдалося зберегти архів.',
    SAVE_CATEGORY: 'Не вдалося зберегти категорію.',
    SAVE_GALLERY_ITEM: 'Не вдалося зберегти елемент галереї.',
    LOAD_FOR_EDIT_ARCHIVE: 'Не вдалося завантажити архів для редагування.',
    LOAD_FOR_EDIT_GALLERY: 'Не вдалося завантажити елемент галереї для редагування.',
    INVALID_PASSWORD: 'Неправильний пароль!',
  },
  VALIDATION: {
    REQUIRED_TITLE: "Заголовок обов'язковий.",
    REQUIRED_TEXT: "Текст обов'язковий.",
    REQUIRED_DESCRIPTION: "Опис обов'язковий.",
    REQUIRED_CATEGORY: "Категорія обов'язкова.",
    REQUIRED_CATEGORY_NAME: "Назва категорії обов'язкова.",
    REQUIRED_LOCATION: "Локація обов'язкова.",
    REQUIRED_CONTENT_TYPE: "Тип контенту обов'язковий.",
    INVALID_CONTENT_TYPE: "Неправильний тип контенту.",
  },
} as const;

export const CSS_CLASSES = {
  INPUT: 'p-2 border rounded w-full',
  BUTTON_PRIMARY: 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600',
  BUTTON_SECONDARY: 'bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600',
  BUTTON_DANGER: 'bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600',
  BUTTON_WARNING: 'bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600',
  BUTTON_ADD_TAG: 'bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600',
  ERROR_MESSAGE: 'text-red-500 text-sm',
  LABEL: 'block font-medium',
  CARD: 'p-4 border rounded mb-4 flex justify-between items-center',
  TAG: 'flex items-center bg-gray-200 px-2 py-1 rounded',
  TAG_REMOVE: 'ml-2 text-red-500',
  FORM_GRID: 'grid grid-cols-2 gap-4',
  FORM_SUBMIT: 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600',
} as const;