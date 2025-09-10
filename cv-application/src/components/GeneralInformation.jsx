import {useState} from "react";
import InputField from "./InputField";
import {useFormManager} from "../hooks/useFormManager";
import '../styles/inputSection.scss';

export function GeneralInformation({generalDetails, onSubmit}) {
    const [isEditing, setIsEditing] = useState(true);
    const { formData: newGeneralDetails, handleChange, resetForm } = useFormManager(generalDetails);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, newGeneralDetails);
        setIsEditing(false);
    };

    const handleEdit = () => {
        resetForm(generalDetails);
        setIsEditing(true);
    };


    return (
        isEditing ?
            <section className='input-section'>
                <h2>General Information</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <InputField name='first-name' label="First Name" type="text"
                                handleEditChange={(e) => handleChange('firstName', e.target.value)}
                                value={newGeneralDetails.firstName || ''} required={true}/>

                    <InputField name='surname' label="Surname" type="text"
                                handleEditChange={(e) => handleChange('surname', e.target.value)}
                                value={newGeneralDetails.surname || ''} required={true}/>

                    <InputField name='email' label="Email" type="email"
                                handleEditChange={(e) => handleChange('email', e.target.value)}
                                value={newGeneralDetails.email || ''} required={true}/>

                    <InputField name='telephone' label="Telephone" type="tel"
                                handleEditChange={(e) => handleChange('telephone', e.target.value)}
                                value={newGeneralDetails.telephone || ''} required={false}/>
                    <button type="submit">Confirm</button>
                </form>
            </section> :
            <section className='input-section'>
                <h2>General Information</h2>
                <p>First Name: {generalDetails.firstName}</p>
                <p>Surname: {generalDetails.surname}</p>
                <p>Email: {generalDetails.email}</p>
                {generalDetails.telephone && <p>Telephone: {generalDetails.telephone}</p>}
                <button onClick={() => handleEdit()}>Edit
                </button>
            </section>
    );
}

export default GeneralInformation;