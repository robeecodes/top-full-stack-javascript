import '../styles/CV.scss';
import {Fragment, useEffect, useState} from "react";

export function CV({generalDetails, education, practicalExperience}) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (generalDetails && Object.keys(generalDetails).length > 0 &&
            education.length > 0 && practicalExperience.length > 0) {
            setComplete(true);
        }
    }, [generalDetails, education, practicalExperience]);

    return (
        <section id='CV'>
            {complete ? <button id='export-button' onClick={() => window.print()}>Export CV</button> : ''}
            <h1>{generalDetails?.firstName || 'Your name will go here'} {generalDetails?.surname || ''}</h1>
            <p>{generalDetails?.email ? <a href={'mailto:' + generalDetails.email}>{generalDetails.email}</a> : ''}
                {generalDetails?.telephone ? (
                    <>
                        {' | '}
                        <a href={`tel:${generalDetails.telephone}`}>{generalDetails.telephone}</a>
                    </>
                ) : ''}
            </p>
            <hr/>
            <h2>Educational Experience</h2>
            <ul>
                {education.map(item => {
                    return (
                        <li key={item.schoolName + item.degree}>
                            <div>
                                <h3>{item.schoolName} - {item.degree}</h3>
                                <p>{moment(item.startDate).format("DD/MM/YYYY")} – {item?.endDate !== 'Present' ? moment(item?.endDate).format("DD/MM/YYYY") : 'Present'}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <hr/>
            <h2>Practical Experience</h2>
            <ul>
                {practicalExperience.map(item => {
                    return (
                        <li key={item.company + item.position}>
                            <div>
                                <h3>{item.company} - {item.position}</h3>
                                <p>{moment(item.startDate).format("DD/MM/YYYY")} – {item?.endDate !== 'Present' ? moment(item?.endDate).format("DD/MM/YYYY") : 'Present'}</p>
                            </div>
                            <p>{item.description}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default CV;