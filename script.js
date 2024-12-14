document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var addSkillButton = document.getElementById('addSkill');
    var addExperienceButton = document.getElementById('addExperience');
    var skillsContainer = document.getElementById('skillsContainer');
    var experienceContainer = document.getElementById('experienceContainer');
    var resumeOutput = document.getElementById('resumeOutput');
    addSkillButton.addEventListener('click', function () {
        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'skills[]';
        input.placeholder = 'Skill';
        input.required = true;
        skillsContainer.appendChild(input);
    });
    addExperienceButton.addEventListener('click', function () {
        var experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = "\n            <input type=\"text\" name=\"jobTitle[]\" placeholder=\"Job Title\">\n            <input type=\"text\" name=\"company[]\" placeholder=\"Company Name\">\n            <input type=\"text\" name=\"workPeriod[]\" placeholder=\"Work Period\">\n            <textarea name=\"responsibilities[]\" placeholder=\"Responsibilities\"></textarea>\n        ";
        experienceContainer.appendChild(experienceEntry);
    });
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            generateResume();
        }
    });
    function validateForm() {
        var inputs = form.querySelectorAll('input, textarea');
        var isValid = true;
        inputs.forEach(function (element) {
            if (isInputOrTextArea(element)) {
                if (element.required && !element.value.trim()) {
                    showError(element, 'This field is required');
                    isValid = false;
                }
                else {
                    clearError(element);
                }
            }
        });
        return isValid;
    }
    function isInputOrTextArea(element) {
        return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }
    function showError(input, message) {
        var errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.textContent = message;
        }
        else {
            var error = document.createElement('div');
            error.className = 'error';
            error.textContent = message;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }
    function clearError(input) {
        var errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.remove();
        }
    }
    function generateResume() {
        var formData = new FormData(form);
        var name = formData.get('name');
        var email = formData.get('email');
        var phone = formData.get('phone');
        var school = formData.get('school');
        var grade = formData.get('grade');
        var program = formData.get('program');
        var skills = formData.getAll('skills[]');
        var jobTitles = formData.getAll('jobTitle[]');
        var companies = formData.getAll('company[]');
        var workPeriods = formData.getAll('workPeriod[]');
        var responsibilities = formData.getAll('responsibilities[]');
        var resumeHTML = "\n            <h2>".concat(name, "</h2>\n            <p>Email: ").concat(email, " | Phone: ").concat(phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(school, " - ").concat(grade, ", ").concat(program, "</p>\n            <h3>Skills</h3>\n            <ul>\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n        ");
        if (jobTitles.some(function (title) { return title; })) {
            resumeHTML += "<h3>Work Experience</h3>";
            for (var i = 0; i < jobTitles.length; i++) {
                if (jobTitles[i]) {
                    resumeHTML += "\n                        <h4>".concat(jobTitles[i], " at ").concat(companies[i], "</h4>\n                        <p>").concat(workPeriods[i], "</p>\n                        <p>").concat(responsibilities[i], "</p>\n                    ");
                }
            }
        }
        resumeOutput.innerHTML = resumeHTML;
    }
});
