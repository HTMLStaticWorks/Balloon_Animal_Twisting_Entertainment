document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.booking-step');
    const progressItems = document.querySelectorAll('.progress-item');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const bookingForm = document.getElementById('booking-form');
    const summaryList = document.getElementById('summary-list');
    let currentStep = 0;

    const updateStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        progressItems.forEach((item, i) => {
            item.classList.toggle('active', i <= index);
        });
        window.scrollTo(0, 0);
    };

    const validateStep = (index) => {
        const currentStepEl = steps[index];
        const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = '#FF3366';
            } else {
                input.style.borderColor = '';
            }
        });

        return isValid;
    };

    const updateSummary = () => {
        const formData = new FormData(bookingForm);
        let summaryHTML = '<ul>';
        formData.forEach((value, key) => {
            if (value && key !== 'terms') {
                summaryHTML += `<li><strong>${key.replace('_', ' ').toUpperCase()}:</strong> ${value}</li>`;
            }
        });
        summaryHTML += '</ul>';
        if (summaryList) summaryList.innerHTML = summaryHTML;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep === 2) updateSummary();
                updateStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateStep(currentStep);
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                alert('Please accept the terms and conditions.');
                return;
            }

            const successMsg = document.getElementById('success-message');
            const bookingRef = Math.random().toString(36).substr(2, 9).toUpperCase();
            
            if (successMsg) {
                document.getElementById('booking-ref').innerText = bookingRef;
                bookingForm.style.display = 'none';
                successMsg.style.display = 'block';
                document.querySelector('.progress-bar').style.display = 'none';
            }
        });
    }
});
