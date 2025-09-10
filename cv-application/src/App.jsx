import './App.scss'
import GeneralInformation from "./components/GeneralInformation";
import {useState} from "react";
import EducationalExperience from "./components/EducationalExperience";
import PracticalExperience from "./components/PracticalExperience";
import CV from "./components/CV";

function App() {
    const [generalDetails, setGeneralDetails] = useState({});
    const [education, setEducation] = useState([]);
    const [practicalExperience, setPracticalExperience] = useState([]);

    const submitGeneralDetails = (e, newGeneralDetails) => {
        e.preventDefault();
        setGeneralDetails({
            ...newGeneralDetails
        });
    }

    function addEducation(e, newEducationForm) {
        e.preventDefault();

        const key = newEducationForm.schoolName + newEducationForm.degree;

        if (education.some(curr => curr.schoolName + curr.degree === key)) {
            alert('Education already exists');
            return newEducationForm;
        }

        const educationEntry = {
            ...newEducationForm,
            endDate: !newEducationForm.endDate || newEducationForm.endDate.trim() === ''
                ? 'Present'
                : newEducationForm.endDate
        };

        setEducation([...education, educationEntry]);

        return {};
    }


    function deleteEducation(key) {
        setEducation(education.filter(item => item.schoolName + item.degree !== key));
    }

    function updateEducation(oldKey, updatedItem) {
        setEducation(education.map(item =>
            item.schoolName + item.degree === oldKey ? updatedItem : item
        ));
    }

    function addExperience(e, newExperienceForm) {
        e.preventDefault();

        const key = newExperienceForm.company + newExperienceForm.position;

        if (practicalExperience.some(curr => curr.company + curr.position === key)) {
            alert('Position already exists');
            return newExperienceForm;
        }

        const experienceEntry = {
            ...newExperienceForm,
            endDate: !newExperienceForm.endDate || newExperienceForm.endDate.trim() === ''
                ? 'Present'
                : newExperienceForm.endDate
        };

        setPracticalExperience([...practicalExperience, experienceEntry]);

        return {};
    }


    function deleteExperience(key) {
        setPracticalExperience(practicalExperience.filter(item => item.company + item.position !== key));
    }

    function updateExperience(oldKey, updatedItem) {
        setPracticalExperience(practicalExperience.map(item =>
            item.company + item.position === oldKey ? updatedItem : item
        ));
    }

    return (
        <>
            <header><h1>Resume Builder</h1></header>
            <main>
                <section id="inputs">
                    <GeneralInformation generalDetails={generalDetails} onSubmit={submitGeneralDetails}/>
                    <EducationalExperience education={education} addEducation={addEducation}
                                           deleteEducation={deleteEducation} updateEducation={updateEducation}/>
                    <PracticalExperience practicalExperience={practicalExperience} addExperience={addExperience}
                                         deleteExperience={deleteExperience} updateExperience={updateExperience}/>
                </section>
                <CV generalDetails={generalDetails} education={education} practicalExperience={practicalExperience}/>
            </main>
        </>
    );
}

export default App;