import { useState } from 'react';
import { useFormManager } from './useFormManager';

export function useEditManager(items, keyGenerator, onUpdate) {
    const [editingKey, setEditingKey] = useState(null);
    const { formData: editForm, handleChange, resetForm, clearForm } = useFormManager({});

    const startEdit = (key) => {
        const item = items.find(item => keyGenerator(item) === key);
        setEditingKey(key);
        resetForm(item);
    };

    const cancelEdit = () => {
        setEditingKey(null);
        clearForm();
    };

    const saveEdit = () => {
        onUpdate(editingKey, editForm);
        setEditingKey(null);
        clearForm();
    };

    return {
        editingKey,
        editForm,
        startEdit,
        cancelEdit,
        saveEdit,
        handleEditChange: handleChange
    };
}