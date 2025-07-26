import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const ControlledSelect = ({
	name,
	control,
	rules,
	label,
	options,
	renderValue,
	sx,
	...rest
}) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		render={({ field, fieldState: { error } }) => (
			<FormControl fullWidth error={!!error}>
				<InputLabel>{label}</InputLabel>
				<Select
					{...field}
					label={label}
					variant="outlined"
					renderValue={renderValue}
					sx={{ ...sx }}
					{...rest}>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				{error && (
					<Typography color="error" variant="caption">
						{error.message}
					</Typography>
				)}
			</FormControl>
		)}
	/>
);

export default ControlledSelect;
