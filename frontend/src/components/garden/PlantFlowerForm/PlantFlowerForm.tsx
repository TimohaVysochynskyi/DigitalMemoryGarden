import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./PlantFlowerForm.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";

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
  comment: Yup.string().max(2000, "Maximum 2000 characters"),
  audio: Yup.mixed().nullable(),
  photo: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
  sensitive: Yup.boolean(),
});

export default function PlantFlowerForm() {
  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={{
            name: "",
            age: "",
            location: "",
            title: "",
            comment: "",
            audio: null,
            photo: null,
            video: null,
            consent: false,
            sensitive: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // handle submit
            console.log(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form className={css.formWrapper}>
              <h2 className={css.title}>New flower</h2>
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

                <div className={css.mediaRow}>
                  <label className={css.mediaBtn}>
                    Audio
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
                  <label className={css.mediaBtn}>
                    Photo
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
                  <label className={css.mediaBtn}>
                    Video
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

              <div className={css.footerRow}>
                <div className={css.flowerId}>#22334455</div>
                <OutlineButton type="submit">
                  Plant new memory flower
                </OutlineButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
