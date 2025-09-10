import { useState } from 'react';

export function useFormManager(initialState = {}) {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = (newData = {}) => {
        setFormData(newData);
    };

    const clearForm = () => {
        setFormData({});
    };

    return {
        formData,
        handleChange,
        resetForm,
        clearForm,
        setFormData
    };
}