document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addSkillButton = document.getElementById('addSkill') as HTMLButtonElement;
    const addExperienceButton = document.getElementById('addExperience') as HTMLButtonElement;
    const skillsContainer = document.getElementById('skillsContainer') as HTMLDivElement;
    const experienceContainer = document.getElementById('experienceContainer') as HTMLDivElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

    addSkillButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'skills[]';
        input.placeholder = 'Skill';
        input.required = true;
        skillsContainer.appendChild(input);
    });

    addExperienceButton.addEventListener('click', () => {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <input type="text" name="jobTitle[]" placeholder="Job Title">
            <input type="text" name="company[]" placeholder="Company Name">
            <input type="text" name="workPeriod[]" placeholder="Work Period">
            <textarea name="responsibilities[]" placeholder="Responsibilities"></textarea>
        `;
        experienceContainer.appendChild(experienceEntry);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            generateResume();
        }
    });

    function validateForm(): boolean {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach((element) => {
            if (isInputOrTextArea(element)) {
                if (element.required && !element.value.trim()) {
                    showError(element, 'This field is required');
                    isValid = false;
                } else {
                    clearError(element);
                }
            }
        });

        return isValid;
    }

    function isInputOrTextArea(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
        return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }

    function showError(input: HTMLInputElement | HTMLTextAreaElement, message: string) {
        const errorElement = input.nextElementSibling as HTMLElement;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = message;
            input.parentNode!.insertBefore(error, input.nextSibling);
        }
    }

    function clearError(input: HTMLInputElement | HTMLTextAreaElement) {
        const errorElement = input.nextElementSibling as HTMLElement;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }
    }

    function generateResume() {
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const school = formData.get('school') as string;
        const grade = formData.get('grade') as string;
        const program = formData.get('program') as string;
        const skills = formData.getAll('skills[]') as string[];
        const jobTitles = formData.getAll('jobTitle[]') as string[];
        const companies = formData.getAll('company[]') as string[];
        const workPeriods = formData.getAll('workPeriod[]') as string[];
        const responsibilities = formData.getAll('responsibilities[]') as string[];

        let resumeHTML = `
            <h2>${name}</h2>
            <p>Email: ${email} | Phone: ${phone}</p>
            <h3>Education</h3>
            <p>${school} - ${grade}, ${program}</p>
            <h3>Skills</h3>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;

        if (jobTitles.some(title => title)) {
            resumeHTML += `<h3>Work Experience</h3>`;
            for (let i = 0; i < jobTitles.length; i++) {
                if (jobTitles[i]) {
                    resumeHTML += `
                        <h4>${jobTitles[i]} at ${companies[i]}</h4>
                        <p>${workPeriods[i]}</p>
                        <p>${responsibilities[i]}</p>
                    `;
                }
            }
        }

        resumeOutput.innerHTML = resumeHTML;
    }
});