import * as yup from 'yup';

export const photoValidationSchema = yup.object().shape({
  image: yup.string().required(),
  description: yup.string(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
