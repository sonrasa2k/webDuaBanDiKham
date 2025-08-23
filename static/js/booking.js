document.addEventListener('DOMContentLoaded', function() {
    // ========== DATEPICKER ==========
    $('#dob').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'vi',
        endDate: new Date(),
        maxViewMode: 2,
        startView: 2
    });
    $('#appointment-date').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'vi',
        startDate: new Date()
    });

    // ========== CHUYỂN BƯỚC ==========
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

    // ========== NÚT NEXT ==========
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', async function() {
            const currentStep = this.closest('.booking-step-content').id.split('-')[2];
            const nextStep = this.getAttribute('data-next');

            if (validateStep(currentStep)) {
                updateSummary(currentStep);
                if (nextStep === '4') {
                    if (!updateConfirmationInfo()) return;

                    // Gửi dữ liệu về Flask (/submit-booking) dạng form
                    // Disable để tránh submit trùng
                    const prevLabel = this.textContent;
                    this.disabled = true;
                    this.textContent = 'Đang gửi...';

                    try {
                        await sendBookingToFlask();
                    } catch (e) {
                        console.error(e);
                        alert('Có lỗi khi gửi đơn. Vui lòng thử lại.');
                    } finally {
                        this.disabled = false;
                        this.textContent = prevLabel;
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

    // ========== NÚT PREV ==========
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

    // ========== CHỌN SERVICE ==========
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            updateServiceSummary();
        });
    });

    // ========== CHỌN PATIENT TYPE ==========
    document.querySelectorAll('.patient-type-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.patient-type-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // ========== HOSPITAL ==========
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
    document.getElementById('other-hospital')?.addEventListener('input', updateStep3Summary);
    document.getElementById('address').addEventListener('input', updateStep3Summary);
    $(document).on('changeDate', '#appointment-date', updateStep3Summary);
    document.getElementById('days-count').addEventListener('change', updateStep3Summary);

    // ========== NÚT PRINT ==========
    document.getElementById('print-btn')?.addEventListener('click', function() {
        window.print();
    });

    // ========== VALIDATE ==========
    function validateStep(stepNumber) {
        let isValid = true;
        this.scrolledToError = false;

        switch(stepNumber) {
            case '1':
                if (!document.getElementById('fullName').value.trim()) {
                    showError(document.getElementById('fullName'), 'Vui lòng nhập họ tên');
                    isValid = false;
                }
                const phoneEl = document.getElementById('phone');
                if (!phoneEl.value.trim()) {
                    showError(phoneEl, 'Vui lòng nhập số điện thoại');
                    isValid = false;
                } else if (!/^\d{10,11}$/.test(phoneEl.value.trim())) {
                    showError(phoneEl, 'Số điện thoại không hợp lệ');
                    isValid = false;
                }
                break;

            case '2':
                if (!document.querySelector('.service-card.selected')) {
                    alert('Vui lòng chọn dịch vụ hỗ trợ');
                    isValid = false;
                }
                break;

            case '3':
                if (!document.getElementById('appointment-date').value) {
                    showError(document.getElementById('appointment-date'), 'Vui lòng chọn ngày bắt đầu');
                    isValid = false;
                }
                const daysCount = document.getElementById('days-count');
                if (!daysCount.value) {
                    showError(daysCount, 'Vui lòng chọn số ngày');
                    isValid = false;
                }
                const hospitalSelect = document.getElementById('hospital');
                if (!hospitalSelect.value) {
                    showError(hospitalSelect, 'Vui lòng chọn bệnh viện');
                    isValid = false;
                } else if (hospitalSelect.value === 'other' && !document.getElementById('other-hospital').value.trim()) {
                    showError(document.getElementById('other-hospital'), 'Vui lòng nhập tên bệnh viện');
                    isValid = false;
                }
                const address = document.getElementById('address');
                if (!address.value.trim()) {
                    showError(address, 'Vui lòng nhập địa chỉ đón');
                    isValid = false;
                }
                break;
        }
        return isValid;
    }

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
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.scrolledToError = true;
        }
    }

    // ========== SUMMARY ==========
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

    function updateServiceSummary() {
        const selectedService = document.querySelector('.service-card.selected');
        if (selectedService) {
            const serviceName = selectedService.querySelector('.service-name').textContent;
            document.getElementById('summary-service-step2').textContent = serviceName;
            document.getElementById('summary-service').textContent = serviceName;
            updatePriceCalculation();
        }
    }

    function updateStep3Summary() {
        const selectedDate = $('#appointment-date').datepicker('getFormattedDate') || 'Chưa chọn';
        const daysCount = document.getElementById('days-count').value || 'Chưa chọn';
        const hospitalSelect = document.getElementById('hospital');
        let hospital = hospitalSelect.value;
        if (hospital === 'other') {
            hospital = document.getElementById('other-hospital').value || 'Chưa nhập';
        }
        document.getElementById('summary-date').textContent = selectedDate;
        document.getElementById('summary-days-count').textContent = daysCount === 'Chưa chọn' ? daysCount : `${daysCount} ngày`;
        document.getElementById('summary-location').textContent = hospital;
        document.getElementById('summary-name-step3').textContent = document.getElementById('fullName').value;
        updatePriceCalculation();
    }

    function updatePriceCalculation() {
        const selectedService = document.querySelector('.service-card.selected');
        if (selectedService) {
            const pricePerDay = parseInt(selectedService.dataset.price);
            const daysCount = parseInt(document.getElementById('days-count').value) || 1;
            const totalPrice = pricePerDay * daysCount;
            const formattedPrice = new Intl.NumberFormat('vi-VN').format(totalPrice) + 'đ';
            document.getElementById('summary-price').textContent = formattedPrice;
            document.getElementById('summary-total').textContent = formattedPrice;
        }
    }

    // ========== CONFIRM ==========
    function updateConfirmationInfo() {
        const selectedService = document.querySelector('.service-card.selected');
        if (!selectedService) {
            alert('Vui lòng chọn dịch vụ hỗ trợ');
            return false;
        }
        const serviceName = selectedService.querySelector('.service-name').textContent;
        const pricePerDay = parseInt(selectedService.dataset.price);
        const daysCount = parseInt(document.getElementById('days-count').value) || 1;
        const totalPrice = pricePerDay * daysCount;
        const selectedDate = $('#appointment-date').datepicker('getFormattedDate') || 'Chưa chọn';
        const hospitalSelect = document.getElementById('hospital');
        let hospital = hospitalSelect.value;
        if (hospital === 'other') {
            hospital = document.getElementById('other-hospital').value || 'Chưa nhập';
        }
        const address = document.getElementById('address').value || 'Chưa nhập';

        document.getElementById('confirm-name').textContent = document.getElementById('fullName').value || 'Chưa nhập';
        document.getElementById('confirm-phone').textContent = document.getElementById('phone').value || 'Chưa nhập';
        document.getElementById('confirm-service').textContent = serviceName;
        document.getElementById('confirm-date').textContent = selectedDate;
        document.getElementById('confirm-days-count').textContent = `${daysCount} ngày`;
        document.getElementById('confirm-location').textContent = hospital;
        document.getElementById('confirm-address').textContent = address;
        document.getElementById('confirm-total').textContent = new Intl.NumberFormat('vi-VN').format(totalPrice) + 'đ';

        // Code client-side chỉ để hiển thị trước; code chính thức sẽ được server tạo và trả trong text (khó tách).
        document.getElementById('booking-code').textContent = 'DL' + Date.now().toString().slice(-6);

        return true;
    }

    // ========== GỬI VỀ FLASK (/submit-booking) ==========
    async function sendBookingToFlask() {
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = $('#appointment-date').datepicker('getFormattedDate') || '';

        // Map "guide" theo app Flask: dùng tên dịch vụ đang chọn như người hướng dẫn
        const selectedService = document.querySelector('.service-card.selected');
        const serviceName = selectedService
            ? selectedService.querySelector('.service-name').textContent.trim()
            : '';

        const form = new URLSearchParams();
        form.append('name', fullName);
        form.append('phone', phone);
        form.append('date', date);
        form.append('service', serviceName);
        form.append('pickup', document.getElementById('address').value.trim());

        // Nếu front và Flask cùng port 5000 (same origin), chỉ cần đường dẫn tương đối:
        const endpoint = '/submit-booking';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: form.toString()
        });

        // Flask trả text kiểu: "Cảm ơn bạn đã đặt lịch, ... Mã đơn: DL-..."
        const text = await res.text();
        if (!res.ok) {
            throw new Error(text || 'Gửi đơn thất bại');
        }

        // Nếu muốn hiển thị message server trả về (gồm mã đơn), có thể alert hoặc gắn vào UI:
        console.log('Server response:', text);
        // Ví dụ: gắn tạm vào dòng "Mã đặt lịch" nếu trích được mã. Ở đây mình để nguyên.
        // Bạn có thể dùng regex để bắt mã đơn từ text:
        const match = text.match(/Mã đơn:\s*([A-Z0-9\-]+)/i);
        if (match && match[1]) {
            document.getElementById('booking-code').textContent = match[1];
        }
    }

    // ========== ANIMATION ==========
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
    animateOnScroll();
});
