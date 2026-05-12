document.addEventListener('DOMContentLoaded', () => {
    // Add-ons Quote Counter
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const quoteTotal = document.getElementById('quote-total');
    let total = 0;

    if (quoteTotal) {
        addonCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const price = parseInt(checkbox.getAttribute('data-price'));
                if (checkbox.checked) {
                    total += price;
                } else {
                    total -= price;
                }
                quoteTotal.innerText = total;
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
