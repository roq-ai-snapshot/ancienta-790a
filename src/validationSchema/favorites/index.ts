import * as yup from 'yup';

export const favoriteValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  photo_id: yup.string().nullable(),
});
