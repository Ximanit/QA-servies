// src/components/Common/ControlledTextField.jsx
import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const ControlledTextField = ({
	name,
	control,
	rules,
	placeholder,
	type = 'text',
	multiline = false,
	rows,
	InputProps,
	sx,
	...rest
}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					placeholder={placeholder}
					type={type}
					multiline={multiline}
					rows={rows}
					variant="outlined"
					fullWidth
					error={!!error}
					helperText={error?.message}
					InputProps={InputProps}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							'& fieldset': { borderColor: '#e0e0e0' },
							...sx?.['& .MuiOutlinedInput-root'], // Поддержка кастомных стилей для input
						},
						'& .MuiInputBase-input': {
							padding: '12px 14px',
							...sx?.['& .MuiInputBase-input'],
						},
						...sx, // Поддержка общих стилей
					}}
					{...rest} // Передаем остальные пропсы (например, disabled, label)
				/>
			)}
		/>
	);
};

export default ControlledTextField;
