import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddCandleForm.module.css";
import OutlineButton from "../../common/OutlineButton/OutlineButton";

const validationSchema = Yup.object({
  name: Yup.string().max(100, "Maximum 100 characters"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  dateOfDeath: Yup.date().required("Date of death is required"),
  comment: Yup.string().max(2000, "Maximum 2000 characters"),
  audio: Yup.mixed().nullable(),
  photo: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
});

type AddCandleFormValues = {
  name: string;
  dateOfBirth: string;
  dateOfDeath: string;
  comment: string;
  audio: File | null;
  photo: File | null;
  video: File | null;
  consent: boolean;
};

type Props = {
  onSubmit: (
    values: AddCandleFormValues,
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => void | Promise<void>;
  storyId: string;
};

export default function AddCandleForm({ onSubmit, storyId }: Props) {
  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={{
            name: "",
            dateOfBirth: "",
            dateOfDeath: "",
            comment: "",
            audio: null,
            photo: null,
            video: null,
            consent: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values, {
              audio: values.audio,
              photo: values.photo,
              video: values.video,
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className={css.formWrapper}>
              <h2 className={css.title}>New candle</h2>
              <div className={css.form}>
                <Field
                  name="name"
                  placeholder="Name or Callsign"
                  className={css.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />

                <div className={css.row}>
                  <div className={css.dateField}>
                    <label htmlFor="dateOfBirth" className={css.dateLabel}>
                      Date of birth
                    </label>
                    <Field
                      name="dateOfBirth"
                      type="date"
                      className={css.input}
                    />
                  </div>
                  <div className={css.dateField}>
                    <label htmlFor="dateOfDeath" className={css.dateLabel}>
                      Date of death
                    </label>
                    <Field
                      name="dateOfDeath"
                      type="date"
                      className={css.input}
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className={css.error}
                />
                <ErrorMessage
                  name="dateOfDeath"
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
              </div>

              <div className={css.footerRow}>
                <div className={css.flowerId}>#{storyId}</div>
                <OutlineButton color="light" type="submit">
                  Light new memory candle
                </OutlineButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
