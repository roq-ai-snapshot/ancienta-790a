import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFavorite } from 'apiSdk/favorites';
import { Error } from 'components/error';
import { favoriteValidationSchema } from 'validationSchema/favorites';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { PhotoInterface } from 'interfaces/photo';
import { getUsers } from 'apiSdk/users';
import { getPhotos } from 'apiSdk/photos';
import { FavoriteInterface } from 'interfaces/favorite';

function FavoriteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FavoriteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFavorite(values);
      resetForm();
      router.push('/favorites');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FavoriteInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      photo_id: (router.query.photo_id as string) ?? null,
    },
    validationSchema: favoriteValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Favorite
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<PhotoInterface>
            formik={formik}
            name={'photo_id'}
            label={'Select Photo'}
            placeholder={'Select Photo'}
            fetcher={getPhotos}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.image}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'favorite',
    operation: AccessOperationEnum.CREATE,
  }),
)(FavoriteCreatePage);
