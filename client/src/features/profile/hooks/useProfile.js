import { useSelector } from 'react-redux';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../auth/authApi';

import { useToast } from '../../../utils/ToastContext';
import { TOAST_MESSAGES } from '../../../constants/messages';

export const useProfile = () => {
	const userId = useSelector((state) => state.auth.id);

	const { showToast } = useToast();

	const {
		data: profile,
		isLoading: profileLoading,
		error: profileError,
	} = useGetUserByIdQuery(userId);
	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

	const updateProfileData = async (values) => {
		try {
			await updateUser({
				id: userId,
				fio: values.fio,
				email: values.email,
			}).unwrap();
			showToast(TOAST_MESSAGES.PROFILE_UPDATED, 'success');
			return true;
		} catch (error) {
			showToast(TOAST_MESSAGES.ERROR_PROFILE, 'error');
			return false;
		}
	};

	return {
		profile,
		isLoading: profileLoading,
		profileError,
		updateProfile: updateProfileData,
		updateLoading,
	};
};
