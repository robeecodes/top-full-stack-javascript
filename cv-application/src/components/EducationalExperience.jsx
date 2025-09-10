import InputField from "./InputField";
import {useEditManager} from "../hooks/useEditManager";
import {useFormManager} from "../hooks/useFormManager";
import '../styles/inputSection.scss';

export function EducationalExperience({education, addEducation, deleteEducation, updateEducation}) {
    const {formData: newEducationForm, handleChange: handleNewEducationChange, clearForm} = useFormManager({});

    const keyGenerator = (item) => item.schoolName + item.degree;

    const {
        editingKey,
        editForm,
        startEdit,
        cancelEdit,
        saveEdit,
        handleEditChange
    } = useEditManager(education, keyGenerator, updateEducation);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = addEducation(e, newEducationForm);
        if (Object.keys(result).length === 0) {
            clearForm();
        }
    };

    return (
        <section className='input-section'>
            <h2>Educational Experience</h2>
            <ul>
                {education.map((item) => {
                    const key = item.schoolName + item.degree;
                    const isEditing = editingKey === key;

                    return (
                        <li key={key}>
                            {
                                isEditing ? (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        saveEdit();
                                    }}>
                                        <InputField name='edit-school-name' label="School Name" type="text"
                                                    handleEditChange={(e) => handleEditChange('schoolName', e.target.value)}
                                                    value={editForm.schoolName || ''}
                                                    required={true}/>

                                        <InputField name='edit-degree' label="Degree" type="text"
                                                    handleEditChange={(e) => handleEditChange('degree', e.target.value)}
                                                    value={editForm.degree || ''}
                                                    required={true}
                                        />

                                        <InputField name='edit-education-start-date' label="Start Date" type="date"
                                                    handleEditChange={(e) => handleEditChange('startDate', e.target.value)}
                                                    value={editForm.startDate || ''}
                                                    required={true}
                                        />

                                        <InputField name='edit-education-end-date' label="End Date" type="date"
                                                    handleEditChange={(e) => handleEditChange('endDate', e.target.value)}
                                                    value={editForm.endDate === 'Present' ? '' : editForm.endDate || ''}
                                                    required={false}
                                        />

                                        <div className="edit-buttons">
                                            <button type="submit">Save</button>
                                            <button type="button" onClick={cancelEdit}>Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div>
                                            <h3>{item.schoolName} - {item.degree}</h3>
                                            <p>{moment(item.startDate).format("DD/MM/YYYY")} – {item?.endDate !== 'Present' ? moment(item?.endDate).format("DD/MM/YYYY") : 'Present'}</p>
                                        </div>
                                        <div className="edit-buttons">
                                            <button onClick={() => deleteEducation(key)}>Delete</button>
                                            <button onClick={() => startEdit(key)}>Edit</button>
                                        </div>
                                    </>
                                )}
                        </li>
                    )
                })}
            </ul>

            <form onSubmit={(e) => handleSubmit(e)}>
                <InputField name='school-name' label="School Name" type="text"
                            handleEditChange={(e) => handleNewEducationChange('schoolName', e.target.value)}
                            value={newEducationForm.schoolName || ''}
                            required={true}
                />

                <InputField name='degree' label="Degree" type="text"
                            handleEditChange={(e) => handleNewEducationChange('degree', e.target.value)}
                            value={newEducationForm.degree || ''}
                            required={true}
                />

                <InputField name='education-start-date' label="Start Date" type="date"
                            handleEditChange={(e) => handleNewEducationChange('startDate', e.target.value)}
                            value={newEducationForm.startDate || ''}
                            required={true}
                />

                <InputField name='education-end-date' label="End Date" type="date"
                            handleEditChange={(e) => handleNewEducationChange('endDate', e.target.value)}
                            value={newEducationForm.endDate || ''}
                            required={false}
                />

                <button type="submit">Add Education</button>
            </form>
        </section>
    );
}

export default EducationalExperience;