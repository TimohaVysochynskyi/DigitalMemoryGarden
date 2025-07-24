# Технічний опис сайту "Digital Memory Garden"

## Загальний огляд

**Digital Memory Garden** — це інтерактивна платформа для колективної пам'яті про триваючу війну в Україні (2022–). Сайт побудований за архітектурою клієнт-сервер із використанням сучасних веб-технологій.

### Архітектура системи

```
Frontend (React/TypeScript) ← HTTP API → Backend (Node.js/Express) ← MongoDB
                                                    ↓
                                              File Storage (uploads/)
```

## Backend (Серверна частина)

### Технологічний стек
- **Node.js** з **Express.js** - основний фреймворк
- **MongoDB** з **Mongoose** - база даних та ODM
- **Multer** - обробка завантаження файлів
- **Joi** - валідація даних

### Структура даних

#### Модель Story (Історія)
```javascript
const storySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  comment: { type: String, trim: true }, // основний текст
  name: { type: String, trim: true },
  age: { type: Number, min: 0 },
  location: { type: String, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
  
  // Медіафайли (фото, аудіо, відео)
  media: {
    photo: { type: String },
    audio: { type: String },
    video: { type: String },
  },
  
  // Унікальний ідентифікатор квітки
  flowerId: { type: String, unique: true, sparse: true, match: /^\d{8}$/ },
  
  // Джерело: 'flower' (сад) або 'archive' (архів)
  source: { type: String, enum: ['flower', 'archive'], required: true },
}, { timestamps: true });
```

#### Модель MapEvent (Події на карті)
```javascript
const mapEventSchema = new Schema({
  x: { type: Number, required: true, min: 0, max: 100 }, // координата X (%)
  y: { type: Number, required: true, min: 0, max: 100 }, // координата Y (%)
  category: { type: Types.ObjectId, ref: 'Category', required: true },
  title: { type: String, required: true, trim: true },
  miniatureImage: { type: String, required: true }, // зображення-мініатюра
  zIndex: { type: Number, required: true, min: 1, max: 10, default: 1 },
}, { timestamps: { createdAt: true, updatedAt: false } });
```

### API Endpoints

#### Маршрутизація API
```javascript
// Основні маршрути
router.use('/gallery', galleryRouter);      // Галерея зображень
router.use('/categories', categoryRouter);   // Категорії історій
router.use('/stories', storiesRouter);       // Історії користувачів  
router.use('/map-events', mapEventRouter);   // Події на карті України

// Адміністративний доступ
router.post('/admin/login', (req, res, next) => {
  const adminPassword = env('ADMIN_PASSWORD');
  const providedPassword = req.headers['x-admin-password'];
  if (providedPassword !== adminPassword) {
    return next(createHttpError(403, 'Incorrect admin password'));
  }
  res.status(200).send({ message: 'Successful login!' });
});
```

#### Створення історії з медіафайлами
```javascript
// POST /api/stories
export const createStoryController = async (req, res, next) => {
  let media = {};
  if (req.files) {
    const fieldToFolder = { photo: 'images', audio: 'audio', video: 'video' };
    for (const field of Object.keys(fieldToFolder)) {
      const filesArr = req.files[field];
      if (filesArr && filesArr.length > 0) {
        const folder = fieldToFolder[field];
        await createDirIfNotExist(`uploads/${folder}`);
        media[field] = await saveFileToUploadDir(filesArr[0], folder);
      }
    }
  }
  const story = await createStory({ ...req.body, media });
  res.status(201).send(story);
};
```

#### Пошук та навігація
```javascript
// GET /api/stories/search - пошук за текстом
// GET /api/stories/random-flower - випадкова квітка
// POST /api/stories/next - наступна історія
// GET /api/stories/category/:categoryId - історії за категорією
```

### Підключення до MongoDB
```javascript
export const initMongoDB = async () => {
  const user = env("MONGODB_USER");
  const pass = env("MONGODB_PASSWORD");
  const url = env("MONGODB_URL");
  
  await mongoose.connect(
    `mongodb+srv://${user}:${pass}@${url}/?retryWrites=true&w=majority`
  );
  console.log("Successfully connected to the database");
};
```

## Frontend (Клієнтська частина)

### Технологічний стек
- **React 19** з **TypeScript** - основний фреймворк
- **Vite** - збірщик та сервер розробки
- **Tailwind CSS** - стилізація
- **Axios** - HTTP клієнт
- **React Router** - маршрутизація
- **Formik + Yup** - форми та валідація

### Структура сторінок

#### Головна сторінка (HomePage)
```typescript
export default function HomePage() {
  return (
    <>
      <Hero />           {/* Героїчна секція */}
      <MemoryTools />    {/* Інструменти пам'яті */}
      <Map />           {/* Інтерактивна карта */}
      <Numbers />       {/* Статистика */}
    </>
  );
}
```

#### Сторінка Саду (GardenPage)
```typescript
export default function GardenPage() {
  const [randomFlower, setRandomFlower] = useState<Story | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Навігація між квітками
  function handleNextFlower() {
    if (!randomFlower) return;
    getNextFlowerStory({ id: randomFlower._id }).then((next) => {
      if (next) setRandomFlower(next);
    });
  }
  
  return (
    <div className={css.garden}>
      <Hero />
      <MapWrapper />
      <FlowerDetails />
      <PlantFlowerForm />
    </div>
  );
}
```

### API клієнт

```typescript
// Налаштування базового клієнта
const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Автоматичне додавання токена адміністратора
apiClient.interceptors.request.use((config) => {
    const adminData = JSON.parse(localStorage.getItem("adminPassword") || "{}");
    if (adminData.password) {
        config.headers["x-admin-password"] = adminData.password;
    }
    return config;
});
```

### Сервіси для роботи з історіями

```typescript
// Отримання історій за категорією з пагінацією
export const getStoriesByCategory = async (
  categoryId: string, 
  page = 1, 
  limit = 4
): Promise<{ stories: Story[]; totalCount: number }> => {
    const response = await apiClient.get(`/stories/category/${categoryId}`, {
        params: { page, limit },
    });
    return response.data;
};

// Навігація між історіями
export const getNextFlowerStory = async (
  current: { id?: string; flowerId?: string }
): Promise<Story | null> => {
    const response = await apiClient.post("/stories/next", current);
    return response.data;
};
```

## Функціональні можливості

### 1. Колекція історій
- Створення та збереження особистих спогадів
- Підтримка різних типів медіа (фото, аудіо, відео)
- Категоризація за тематикою
- Унікальні ідентифікатори для квітів у саду

### 2. Інтерактивний сад
- Візуальне представлення історій у вигляді квітів
- Навігація між історіями (наступна/попередня)
- Випадковий вибір історій для перегляду
- Можливість "посадити" нову квітку-історію

### 3. Архів та пошук
- Повнотекстовий пошук по історіям
- Фільтрація за категоріями та джерелом
- Пагінація результатів
- Контекстний пошук сусідніх історій

### 4. Інтерактивна карта України
- Візуалізація подій війни на карті України
- Позиціонування через відносні координати (x, y від 0 до 100%)
- Багатошарова структура з z-index для накладання елементів
- Прив'язка до категорій та мініатюр зображень

### 5. Адміністративна панель
- Автентифікація через заголовок `x-admin-password`
- Управління категоріями та подіями на карті
- Модерація користувацького контенту

## Розгортання

### Структура збірки
```bash
# Backend
npm run dev      # Розробка з nodemon
npm run start    # Продакшн запуск
npm run lint     # Перевірка коду

# Frontend  
npm run dev      # Vite dev server
npm run build    # TypeScript + Vite production build
npm run preview  # Попередній перегляд збірки
```

### Конфігурація Vercel
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Змінні середовища
```env
MONGODB_USER=...
MONGODB_PASSWORD=...
MONGODB_URL=...
MONGODB_DB=...
ADMIN_PASSWORD=...
CLIENT_DOMAIN=...
```

## Особливості реалізації

### Обробка файлів
- Автоматичне створення папок для різних типів медіа
- Збереження в структуру `uploads/images/`, `uploads/audio/`, `uploads/video/`
- Підтримка множинних завантажень через Multer

### Пам'ять та історії
- Розділення на два джерела: "flower" (інтерактивний сад) та "archive" (архівні записи)
- Система навігації з урахуванням часу створення
- Можливість зв'язування історій через категорії

### Безпека
- Простий механізм аутентифікації адміністратора
- CORS налаштування для кросдоменних запитів
- Валідація даних на рівні сервера та клієнта

Цей технічний опис відображає поточний стан розробки платформи **Digital Memory Garden** - місця, де особисті спогади про війну перетворюються на колективну пам'ять для майбутніх поколінь.