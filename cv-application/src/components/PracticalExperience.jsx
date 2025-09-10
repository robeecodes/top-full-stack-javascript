import InputField from "./InputField.jsx";
import {useFormManager} from "../hooks/useFormManager.jsx";
import {useEditManager} from "../hooks/useEditManager.jsx";
import '../styles/inputSection.scss';

export function PracticalExperience({practicalExperience, addExperience, updateExperience, deleteExperience}) {
    const {formData: newExperienceForm, handleChange: handleNewExperienceChange, clearForm} = useFormManager({});

    const keyGenerator = (item) => item.company + item.position;

    const {
        editingKey,
        editForm,
        startEdit,
        cancelEdit,
        saveEdit,
        handleEditChange
    } = useEditManager(practicalExperience, keyGenerator, updateExperience);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = addExperience(e, newExperienceForm);
        if (Object.keys(result).length === 0) {
            clearForm();
        }
    };

    return (
        <section className='input-section'>
            <h2>Practical Experience</h2>
            <ul>
                {practicalExperience.map((item) => {
                    const key = item.company + item.position;
                    const isEditing = editingKey === key;

                    return (<li key={key}>
                        {isEditing ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                saveEdit();
                            }}>
                                <InputField name='edit-company' label="Company" type="text"
                                            handleEditChange={(e) => handleEditChange('company', e.target.value)}
                                            value={editForm.company}
                                            required={true}
                                />

                                <InputField name='edit-position' label="Position" type="text"
                                            handleEditChange={(e) => handleEditChange('position', e.target.value)}
                                            value={editForm.position}
                                            required={true}
                                />

                                <InputField name='edit-experience-start-date' label="Start Date" type="date"
                                            handleEditChange={(e) => handleEditChange('startDate', e.target.value)}
                                            value={editForm.startDate}
                                            required={true}
                                />

                                <InputField name='edit-experience-end-date' label="End Date" type="date"
                                            handleEditChange={(e) => handleEditChange('endDate', e.target.value)}
                                            value={editForm.endDate === 'Present' ? '' : editForm.endDate}
                                            required={false}
                                />

                                <div className="input-field">
                                    <label htmlFor="edit-description">Description (required)</label>
                                    <textarea id="edit-description" name="edit-description"
                                              value={editForm.description || ''}
                                              onChange={(e) => handleEditChange('description', e.target.value)}
                                              placeholder="Description" required/>
                                </div>

                                <div className="edit-buttons">
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={cancelEdit}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <h3>{item.company} - {item.position}</h3>
                                    <p>{moment(item.startDate).format("DD/MM/YYYY")} – {item?.endDate !== 'Present' ? moment(item?.endDate).format("DD/MM/YYYY") : 'Present'}</p>
                                </div>
                                <div className="edit-buttons">
                                    <button onClick={() => deleteExperience(key)}>Delete</button>
                                    <button onClick={() => startEdit(key)}>Edit</button>
                                </div>
                            </>
                        )}
                    </li>)
                })}
            </ul>

            <form onSubmit={(e) => handleSubmit(e)}>
                <InputField name='company' label="Company" type="text"
                            handleEditChange={(e) => handleNewExperienceChange('company', e.target.value)}
                            value={newExperienceForm.company || ''}
                            required={true}
                />

                <InputField name='position' label="Position" type="text"
                            handleEditChange={(e) => handleNewExperienceChange('position', e.target.value)}
                            value={newExperienceForm.position || ''}
                            required={true}
                />

                <InputField name='experience-start-date' label="Start Date" type="date"
                            handleEditChange={(e) => handleNewExperienceChange('startDate', e.target.value)}
                            value={newExperienceForm.startDate || ''}
                            required={true}
                />

                <InputField name='experience-end-date' label="End Date" type="date"
                            handleEditChange={(e) => handleNewExperienceChange('endDate', e.target.value)}
                            value={newExperienceForm.endDate === 'Present' ? '' : newExperienceForm.endDate || ''}
                            required={false}
                />

                <div className="input-field">
                    <label htmlFor="description">Description (required)</label>
                    <textarea id="description" name="description" placeholder="Description"
                              onChange={(e) => handleNewExperienceChange('description', e.target.value)}
                              value={newExperienceForm.description || ''} required/>
                </div>

                <button type="submit">Add Experience</button>
            </form>
        </section>
    )

}

export default PracticalExperience;