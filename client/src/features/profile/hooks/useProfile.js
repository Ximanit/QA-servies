import { useSelector } from 'react-redux';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../auth/authApi';
import { useChangePasswordMutation } from '../profileApi';
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
	const [changePassword, { isLoading: changePasswordLoading }] =
		useChangePasswordMutation();

	const updateProfileData = async (values) => {
		try {
			if (values.currentPassword && values.newPassword) {
				// Смена пароля
				await changePassword({
					id: userId,
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
				}).unwrap();
				showToast(TOAST_MESSAGES.PASSWORD_CHANGED, 'success');
				return true;
			} else {
				// Обновление профиля
				await updateUser({
					id: userId,
					fio: values.fio,
					email: values.email,
				}).unwrap();
				showToast(TOAST_MESSAGES.PROFILE_UPDATED, 'success');
				return true;
			}
		} catch (error) {
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_PROFILE, 'error');
			return false;
		}
	};

	return {
		profile,
		isLoading: profileLoading,
		profileError,
		updateProfile: updateProfileData,
		updateLoading: updateLoading || changePasswordLoading,
	};
};
