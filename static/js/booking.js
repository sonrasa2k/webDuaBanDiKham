document.addEventListener('DOMContentLoaded', function() {
    // Initialize datepicker
    $('#dob').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'vi',
        endDate: new Date(), // Không chọn ngày trong tương lai
        maxViewMode: 2, // Giới hạn chỉ xem đến năm
        startView: 2    // Mở mặc định ở view năm
    });
    $('#appointment-date').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'vi',
        startDate: new Date() // Không chọn ngày trong quá khứ
    });

    // Booking steps navigation
    function goToStep(stepNumber) {
        document.querySelectorAll('.booking-step-content').forEach(content => {
            content.classList.add('d-none');
        });
        document.getElementById(`step-content-${stepNumber}`).classList.remove('d-none');

        document.querySelectorAll('.booking-step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.id.split('-')[1]) <= stepNumber) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
        document.getElementById(`step-${stepNumber}`).classList.add('active');
    }

    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.booking-step-content').id.split('-')[2];
            const nextStep = this.getAttribute('data-next');

            if (validateStep(currentStep)) {
                updateSummary(currentStep);
                if (nextStep === '4') {
                    updateConfirmationInfo();
                }
                goToStep(nextStep);

                document.getElementById(`step-content-${nextStep}`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            goToStep(prevStep);

            document.getElementById(`step-content-${prevStep}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Service selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.service-card').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
            updateServiceSummary();
        });
    });

    // Patient type selection
    document.querySelectorAll('.patient-type-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.patient-type-card').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Hospital selection
    document.getElementById('hospital').addEventListener('change', function() {
        const otherHospitalContainer = document.getElementById('other-hospital-container');
        if (this.value === 'other') {
            otherHospitalContainer.classList.remove('d-none');
            document.getElementById('other-hospital').required = true;
        } else {
            otherHospitalContainer.classList.add('d-none');
            document.getElementById('other-hospital').required = false;
        }
        updateStep3Summary();
    });

    // Other hospital input
    document.getElementById('other-hospital')?.addEventListener('input', updateStep3Summary);

    // Address input
    document.getElementById('address').addEventListener('input', updateStep3Summary);

    // Date selection
    $(document).on('changeDate', '#appointment-date', updateStep3Summary);

    // Days count selection
    document.getElementById('days-count').addEventListener('change', updateStep3Summary);

    // Print button
    document.getElementById('print-btn')?.addEventListener('click', function() {
        window.print();
    });

    // Form validation for each step
    function validateStep(stepNumber) {
        let isValid = true;
        this.scrolledToError = false;

        switch(stepNumber) {
            case '1':
                if (!document.getElementById('fullName').value.trim()) {
                    showError(document.getElementById('fullName'), 'Vui lòng nhập họ tên');
                    isValid = false;
                }

                if (!document.getElementById('phone').value.trim()) {
                    showError(document.getElementById('phone'), 'Vui lòng nhập số điện thoại');
                    isValid = false;
                } else if (!/^\d{10,11}$/.test(document.getElementById('phone').value.trim())) {
                    showError(document.getElementById('phone'), 'Số điện thoại không hợp lệ');
                    isValid = false;
                }

                // if (!document.getElementById('condition').value.trim()) {
                //     showError(document.getElementById('condition'), 'Vui lòng mô tả tình trạng sức khỏe');
                //     isValid = false;
                // }
                break;

            case '2':
                if (!document.querySelector('.service-card.selected')) {
                    alert('Vui lòng chọn dịch vụ hỗ trợ');
                    isValid = false;
                }
                break;

            case '3':
                // Validate appointment date
                if (!document.getElementById('appointment-date').value) {
                    showError(document.getElementById('appointment-date'), 'Vui lòng chọn ngày bắt đầu');
                    isValid = false;
                }

                // Validate days count
                const daysCount = document.getElementById('days-count');
                if (!daysCount.value) {
                    showError(daysCount, 'Vui lòng chọn số ngày');
                    isValid = false;
                }

                // Validate hospital
                const hospitalSelect = document.getElementById('hospital');
                if (!hospitalSelect.value) {
                    showError(hospitalSelect, 'Vui lòng chọn bệnh viện');
                    isValid = false;
                } else if (hospitalSelect.value === 'other' && !document.getElementById('other-hospital').value.trim()) {
                    showError(document.getElementById('other-hospital'), 'Vui lòng nhập tên bệnh viện');
                    isValid = false;
                }

                // Validate address
                const address = document.getElementById('address');
                if (!address.value.trim()) {
                    showError(address, 'Vui lòng nhập địa chỉ đón');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    // Show error message for form fields
    function showError(field, message) {
        const formGroup = field.closest('.mb-3') || field.closest('.mb-4');
        let errorElement = formGroup.querySelector('.invalid-feedback');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        field.classList.add('is-invalid');

        if (!this.scrolledToError) {
            field.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            this.scrolledToError = true;
        }
    }

    // Update summary information
    function updateSummary(stepNumber) {
        switch(stepNumber) {
            case '1':
                document.getElementById('summary-name').textContent = document.getElementById('fullName').value;
                document.getElementById('summary-phone').textContent = document.getElementById('phone').value;
                document.getElementById('summary-condition').textContent = document.getElementById('condition').value;
                break;

            case '2':
                updateServiceSummary();
                break;

            case '3':
                updateStep3Summary();
                break;
        }
    }

    // Update service summary
    function updateServiceSummary() {
        const selectedService = document.querySelector('.service-card.selected');
        if (selectedService) {
            const serviceName = selectedService.querySelector('.service-name').textContent;
            document.getElementById('summary-service-step2').textContent = serviceName;
            document.getElementById('summary-service').textContent = serviceName;
            updatePriceCalculation();
        }
    }

    // Update step 3 summary
    function updateStep3Summary() {
        const selectedDate = $('#appointment-date').datepicker('getFormattedDate') || 'Chưa chọn';
        const daysCount = document.getElementById('days-count').value || 'Chưa chọn';

        const hospitalSelect = document.getElementById('hospital');
        let hospital = hospitalSelect.value;
        if (hospital === 'other') {
            hospital = document.getElementById('other-hospital').value || 'Chưa nhập';
        }

        // const address = document.getElementById('address').value || 'Chưa nhập';

        // Update DOM
        document.getElementById('summary-date').textContent = selectedDate;
        document.getElementById('summary-days-count').textContent = daysCount === 'Chưa chọn' ? daysCount : `${daysCount} ngày`;
        document.getElementById('summary-location').textContent = hospital;
        // document.getElementById('summary-address').textContent = address;
        document.getElementById('summary-name-step3').textContent = document.getElementById('fullName').value;

        // Update price when days count changes
        updatePriceCalculation();
    }

    // Calculate and update price
    function updatePriceCalculation() {
        const selectedService = document.querySelector('.service-card.selected');
        if (selectedService) {
            const pricePerDay = parseInt(selectedService.dataset.price);
            const daysCount = parseInt(document.getElementById('days-count').value) || 1;
            const totalPrice = pricePerDay * daysCount;

            // Format price
            const formattedPrice = new Intl.NumberFormat('vi-VN').format(totalPrice) + 'đ';

            document.getElementById('summary-price').textContent = formattedPrice;
            document.getElementById('summary-total').textContent = formattedPrice;
        }
    }

    // Update confirmation information
    // Sửa lại hàm updateConfirmationInfo():
function updateConfirmationInfo() {
    // Get selected service
    const selectedService = document.querySelector('.service-card.selected');
    if (!selectedService) {
        alert('Vui lòng chọn dịch vụ hỗ trợ');
        return false;
    }

    const serviceName = selectedService.querySelector('.service-name').textContent;
    const pricePerDay = parseInt(selectedService.dataset.price);
    const daysCount = parseInt(document.getElementById('days-count').value) || 1;
    const totalPrice = pricePerDay * daysCount;

    // Get other info
    const selectedDate = $('#appointment-date').datepicker('getFormattedDate') || 'Chưa chọn';

    const hospitalSelect = document.getElementById('hospital');
    let hospital = hospitalSelect.value;
    if (hospital === 'other') {
        hospital = document.getElementById('other-hospital').value || 'Chưa nhập';
    }

    const address = document.getElementById('address').value || 'Chưa nhập';

    // Update confirmation info
    document.getElementById('confirm-name').textContent = document.getElementById('fullName').value || 'Chưa nhập';
    document.getElementById('confirm-phone').textContent = document.getElementById('phone').value || 'Chưa nhập';
    document.getElementById('confirm-service').textContent = serviceName;
    document.getElementById('confirm-date').textContent = selectedDate;
    document.getElementById('confirm-days-count').textContent = `${daysCount} ngày`;
    document.getElementById('confirm-location').textContent = hospital;
    document.getElementById('confirm-address').textContent = address;
    document.getElementById('confirm-total').textContent = new Intl.NumberFormat('vi-VN').format(totalPrice) + 'đ';

    // Generate booking code
    document.getElementById('booking-code').textContent = 'DL' + Date.now().toString().slice(-6);
    return true;
}

// Sửa lại phần next-step click handler:
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
        const currentStep = this.closest('.booking-step-content').id.split('-')[2];
        const nextStep = this.getAttribute('data-next');

        if (validateStep(currentStep)) {
            updateSummary(currentStep);
            if (nextStep === '4') {
                if (!updateConfirmationInfo()) {
                    return; // Không chuyển bước nếu xác nhận thất bại
                }
            }
            goToStep(nextStep);

            document.getElementById(`step-content-${nextStep}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-up');
        const screenPosition = window.innerHeight / 1.3;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll(); // Run once on load
});