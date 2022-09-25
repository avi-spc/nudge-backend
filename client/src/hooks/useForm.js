import { useState } from 'react';

export const useForm = (data, ref) => {
	const [formData, setFormData] = useState(data);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return { formData, onChange };
};
