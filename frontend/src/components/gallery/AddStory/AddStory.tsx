import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddStory.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import CategoryDropdown from "../../archives/CategoryDropdown/CategoryDropdown";
import { addStory } from "../../../services/story";
import { generateStoryId } from "../../../utils/storyId";
import type { Category } from "../../../types/category";

const validationSchema = Yup.object({
  name: Yup.string().max(100, "Maximum 100 characters"),
  age: Yup.number()
    .min(0, "Age cannot be less than 0")
    .max(120, "Age cannot be greater than 120")
    .integer("Age must be an integer")
    .nullable(),
  location: Yup.string().max(200, "Maximum 200 characters"),
  title: Yup.string()
    .required("The 'Title of story' field is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters"),
  category: Yup.string().required("Category is required"),
  comment: Yup.string().max(2000, "Maximum 2000 characters"),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
  sensitive: Yup.boolean(),
  audio: Yup.mixed().nullable(),
  photo: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
}).test(
  "at-least-one-media",
  "At least one media file (audio, photo, or video) is required for gallery",
  function (values) {
    const { audio, photo, video } = values;
    if (!audio && !photo && !video) {
      return this.createError({
        message:
          "At least one media file (audio, photo, or video) is required for gallery",
        path: "audio",
      });
    }
    return true;
  }
);

type AddStoryProps = {
  categories: Category[];
  onStoryAdded: () => void;
};

export default function AddStory({ categories, onStoryAdded }: AddStoryProps) {
  return (
    <div className={css.container} id="add-story">
      <Formik
        initialValues={{
          name: "",
          age: "",
          location: "",
          title: "",
          category: "",
          comment: "",
          consent: false,
          sensitive: false,
          audio: null as File | null,
          photo: null as File | null,
          video: null as File | null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await addStory({
              storyId: generateStoryId("gallery"),
              title: values.title,
              comment: values.comment,
              name: values.name,
              age: values.age,
              location: values.location,
              category: values.category,
              source: "gallery",
              photo: values.photo || undefined,
              audio: values.audio || undefined,
              video: values.video || undefined,
            });
            resetForm();
            onStoryAdded();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={css.formWrapper}>
            <div className={css.col}>
              <h2 className={css.title}>Add story to gallery</h2>
              <div className={css.form}>
                <div className={css.row}>
                  <Field
                    name="name"
                    placeholder="Name and Surname"
                    className={css.input}
                  />
                  <Field
                    name="age"
                    type="number"
                    placeholder="Age"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className={css.error}
                />

                <Field
                  name="location"
                  placeholder="Location"
                  className={css.input}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className={css.error}
                />

                <div className={css.row}>
                  <div>
                    <Field
                      name="title"
                      placeholder="Title of story *"
                      className={css.input}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div>
                    <CategoryDropdown
                      value={values.category}
                      onChange={(val) => setFieldValue("category", val)}
                      options={categories.map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      }))}
                      name="category"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className={css.error}
                    />
                  </div>
                </div>

                <Field
                  name="comment"
                  as="textarea"
                  placeholder="Comment or story"
                  className={css.textarea}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.error}
                />

                <div className={css.mediaRow}>
                  <label
                    className={`${css.mediaBtn} ${
                      values.audio ? css.mediaBtnAdded : ""
                    }`}
                  >
                    {values.audio ? "Audio Added" : "Audio"}
                    <img
                      src="/plus-media.png"
                      alt="Add file"
                      className={css.mediaIcon}
                    />
                    <input
                      type="file"
                      accept="audio/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue(
                          "audio",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                  </label>
                  <label
                    className={`${css.mediaBtn} ${
                      values.photo ? css.mediaBtnAdded : ""
                    }`}
                  >
                    {values.photo ? "Photo Added" : "Photo"}
                    <img
                      src="/plus-media.png"
                      alt="Add file"
                      className={css.mediaIcon}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue(
                          "photo",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                  </label>
                  <label
                    className={`${css.mediaBtn} ${
                      values.video ? css.mediaBtnAdded : ""
                    }`}
                  >
                    {values.video ? "Video Added" : "Video"}
                    <img
                      src="/plus-media.png"
                      alt="Add file"
                      className={css.mediaIcon}
                    />
                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue(
                          "video",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                  </label>
                </div>
                <ErrorMessage
                  name="audio"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.checkboxRow}>
                <label className={css.checkboxLabel} htmlFor="consent">
                  <Field
                    id="consent"
                    type="checkbox"
                    name="consent"
                    className={css.checkboxInput}
                  />
                  <div className={css.customCheckbox}></div>I consent to the
                  processing of my personal data and public sharing of my
                  submission*
                </label>
                <ErrorMessage
                  name="consent"
                  component="div"
                  className={css.error}
                />
                <label className={css.checkboxLabel} htmlFor="sensitive">
                  <Field
                    id="sensitive"
                    type="checkbox"
                    name="sensitive"
                    className={css.checkboxInput}
                  />
                  <div className={css.customCheckbox}></div>
                  This message may contain sensitive content
                </label>
              </div>
            </div>
            <div className={css.col}>
              <OutlineButton type="submit">
                {isSubmitting ? "Adding..." : "Add story to gallery"}
              </OutlineButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
