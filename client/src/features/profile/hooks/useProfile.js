import { useSelector } from 'react-redux';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../auth/authApi';

import { useToast } from '../../../utils/ToastContext';

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
			await updateUser({ id: userId, fio: values.fio }).unwrap();
			showToast('Профиль успешно обновлен!', 'success');
			return true;
		} catch (error) {
			showToast('Ошибка при обновлении', 'error');
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
