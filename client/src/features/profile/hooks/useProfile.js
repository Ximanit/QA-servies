import { useSelector } from 'react-redux';
import {
	useGetUserByIdQuery,
	useUpdateUserMutation,
	useChangePasswordMutation,
} from '../../auth/authApi';
import { useToast } from '../../../utils/ToastContext';
import { TOAST_MESSAGES } from '../../../constants/messages';

export const useProfile = () => {
	const userId = useSelector((state) => state.auth.id);
	const { showToast } = useToast();

	const {
		data: profile,
		isLoading: profileLoading,
		error: profileError,
	} = useGetUserByIdQuery(userId, { skip: !userId });

	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
	const [changePassword, { isLoading: changePasswordLoading }] =
		useChangePasswordMutation();

	const updateProfileData = async (values) => {
		try {
			// Если переданы пароли — меняем пароль
			if (values.currentPassword && values.newPassword) {
				await changePassword({
					id: userId,
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
				}).unwrap();
				showToast(TOAST_MESSAGES.PASSWORD_CHANGED, 'success');
			} else {
				// Обновляем только профиль
				await updateUser({
					id: userId,
					fio: values.fio,
					username: values.email, // ← здесь email → username
				}).unwrap();
				showToast(TOAST_MESSAGES.PROFILE_UPDATED, 'success');
			}
			return true;
		} catch (error) {
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_PROFILE, 'error');
			return false;
		}
	};

	return {
		profile,
		isLoading: profileLoading || updateLoading || changePasswordLoading,
		profileError,
		updateProfile: updateProfileData,
		updateLoading: updateLoading || changePasswordLoading,
	};
};
