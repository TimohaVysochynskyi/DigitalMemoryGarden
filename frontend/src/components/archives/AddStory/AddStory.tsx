import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddStory.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { addStory } from "../../../services/story";
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
});

type AddStoryProps = {
  categories: Category[];
  onStoryAdded: () => void;
};

export default function AddStory({ categories, onStoryAdded }: AddStoryProps) {
  // categories: масив категорій з ArchivesPage
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
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await addStory({
              title: values.title,
              comment: values.comment,
              name: values.name,
              age: values.age,
              location: values.location,
              category: values.category,
              source: "archive",
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
                  placeholder="Comment or story"
                  className={css.input}
                />
                <ErrorMessage
                  name="comment"
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
                {isSubmitting ? "Adding..." : "Add story to archive"}
              </OutlineButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
