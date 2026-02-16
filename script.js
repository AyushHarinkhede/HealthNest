    // --- GLOBAL VARIABLES ---
    let healthChartInstance = null;
    let newProfilePicSrc = null; // To hold the new picture URL temporarily
    
    const languageData = {
        hi: {
            navHome: "होम", navDashboard: "डैशबोर्ड", featuresTitle: "विशेषताएँ", faqTitle: "FAQ", navSignUp: "साइन अप", navLogIn: "लॉग इन",
            settingsTitle: "सेटिंग्स", settingsTheme: "थीम", settingsTextSize: "वेबसाइट साइज", settingsLanguage: "भाषा", settingsAccount: "अकाउंट", settingsUpdate: "अपडेट", settingsNotifications: "नोटिफिकेशन्स", settingsPrivacy: "प्राइवेसी", settingsSecurity: "सिक्योरिटी", settingsStorage: "डाटा और स्टोरेज", settingsClear: "स्टोरेज साफ़ करें", settingsSupport: "हेल्प और सपोर्ट", settingsContactSupport: "सपोर्ट से संपर्क करें",
            heroTitle: "आपकी सेहत, आपके हाथ में।", heroSubtitle: "HealthNest के साथ अपनी पूरी मेडिकल हिस्ट्री को एक सुरक्षित जगह पर सहेजें और किसी भी समय, कहीं भी एक्सेस करें।", heroCTA: "आज ही शुरू करें",
            feature1Title: "हेल्थ टाइमलाइन", feature1Desc: "बचपन से लेकर आज तक की हर स्वास्थ्य घटना को एक क्रम में देखें।", feature2Title: "दस्तावेज़ अपलोड", feature2Desc: "अपनी सभी मेडिकल रिपोर्ट्स, स्कैन और दवाइयों के पर्चे सुरक्षित रूप से अपलोड करें।", feature3Title: "डॉक्टर के साथ शेयर करें", feature3Desc: "एक क्लिक में अपने डॉक्टर को अपनी हेल्थ हिस्ट्री देखने की सुरक्षित अनुमति दें।",
            securityTitle: "आपकी सुरक्षा, हमारी प्राथमिकता", securityCardTitle: "एंड-टू-एंड एन्क्रिप्शन", securityCardDesc: "आपका सारा स्वास्थ्य डेटा एंड-टू-एंड एन्क्रिप्टेड है। इसका मतलब है कि केवल आप और जिन्हें आप अनुमति देते हैं, वही इसे देख सकते हैं। हम भी आपका डेटा नहीं पढ़ सकते।",
            faq1Question: "जीवनकोष क्या है?", faq1Answer: "जीवनकोष एक डिजिटल प्लेटफ़ॉर्म है जहाँ आप अपनी सभी मेडिकल जानकारी, जैसे कि पुरानी चोटें, इलाज, रिपोर्ट्स और दवाइयों को सुरक्षित रूप से स्टोर कर सकते हैं।", faq2Question: "क्या मेरा डेटा सुरक्षित है?", faq2Answer: "हाँ, हम आपके डेटा की सुरक्षा के लिए उच्चतम मानकों का उपयोग करते हैं। आपकी जानकारी एन्क्रिप्टेड होती है और आपके अलावा कोई इसे नहीं देख सकता।", faq3Question: "मैं इसका उपयोग कैसे कर सकता हूँ?", faq3Answer: "बस साइन अप करें, और अपनी स्वास्थ्य संबंधी जानकारी जोड़ना शुरू करें। आप जब चाहें, अपने डॉक्टर को दिखाने के लिए इसे एक्सेस कर सकते हैं।",
            newsletterTitle: "अपडेट रहें!", newsletterSubtitle: "नवीनतम समाचारों और अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।", newsletterButton: "सब्सक्राइब करें",
            footerRights: "&copy; 2024-2025 HealthNest. सर्वाधिकार सुरक्षित।", footerPrivacy: "प्राइवेसी पालिसी", footerTerms: "सेवा की शर्तें", footerLogout: "लॉगआउट",
            profileTitle: "आपकी प्रोफाइल", profileName: "आयुष हरिनखेरे ", profileAgeLabel: "आयु", profileAgeValue: "20 वर्ष", profileBloodLabel: "ब्लड ग्रुप", profileBloodValue: "A+", profileHeightLabel: "ऊंचाई", profileHeightValue: "175 cm", profileWeightLabel: "वजन", profileWeightValue: "52 kg", profileEditButton: "प्रोफाइल एडिट करें",
            dashboardBP: "ब्लड प्रेशर", dashboardSugar: "शुगर लेवल", dashboardHR: "हार्ट रेट", dashboardBMI: "बॉडी मास इंडेक्स", dashboardActivity: "हाल की गतिविधि", activity1: "ब्लड टेस्ट रिपोर्ट अपलोड की गई - 2 दिन पहले", activity2: "डॉ. गुप्ता के साथ अपॉइंटमेंट - 1 सप्ताह पहले", activity3: "दवाई का पर्चा जोड़ा गया - 2 सप्ताह पहले", dashboardAppointments: "आगामी अपॉइंटमेंट्स", appointment1: "डेंटिस्ट के साथ चेकअप - 5 दिन में", appointment2: "वार्षिक स्वास्थ्य जांच - 2 सप्ताह में",
            editProfileTitle: "प्रोफ़ाइल संपादित करें", editNameLabel: "पूरा नाम", editDobLabel: "जन्म तिथि", editBloodLabel: "ब्लड ग्रुप", editHeightLabel: "ऊंचाई (cm)", editWeightLabel: "वजन (kg)", editSaveButton: "सेव करें",
        },
        en: {
            navHome: "Home", navDashboard: "Dashboard", featuresTitle: "Key Features", faqTitle: "FAQ", navSignUp: "Sign Up", navLogIn: "Log In",
            settingsTitle: "Settings", settingsTheme: "Theme (Light/Dark)", settingsTextSize: "Website Size", settingsLanguage: "Language", settingsAccount: "Account Settings", settingsUpdate: "Update", settingsNotifications: "Notifications", settingsPrivacy: "Privacy", settingsSecurity: "Security", settingsStorage: "Data & Storage", settingsClear: "Clear Storage", settingsSupport: "Help & Support", settingsContactSupport: "Contact Support",
            heroTitle: "Your Health, In Your Hands.", heroSubtitle: "With HealthNest, save your entire medical history in one secure place and access it anytime, anywhere.", heroCTA: "Get Started Today",
            feature1Title: "Health Timeline", feature1Desc: "View every health event from childhood to today in chronological order.", feature2Title: "Document Upload", feature2Desc: "Securely upload all your medical reports, scans, and prescriptions.", feature3Title: "Share with Doctor", feature3Desc: "Give your doctor secure permission to view your health history with one click.",
            securityTi0tle: "Your Security, Our Priority", securityCardTitle: "End-to-End Encryption", securityCardDesc: "All your health data is end-to-end encrypted. This means only you and those you authorize can see it. Not even we can read your data.",
            faq1Question: "What is HealthNest?", faq1Answer: "HealthNest is a digital platform where you can securely store all your medical information, such as old injuries, treatments, reports, and medications.", faq2Question: "Is my data secure?", faq2Answer: "Yes, we use the highest standards to protect your data. Your information is encrypted, and no one can see it except you.", faq3Question: "How can I use it?", faq3Answer: "Just sign up and start adding your health information. You can access it whenever you want to show it to your doctor.",
            newsletterTitle: "Stay Updated!", newsletterSubtitle: "Subscribe to our newsletter for the latest news and updates.", newsletterButton: "Subscribe",
            footerRights: "&copy; 2024-2025 HealthNest. All rights reserved.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Service", footerLogout: "Logout",
            profileTitle: "Your Profile", profileName: "Ayush Harinkhere", profileAgeLabel: "Age", profileAgeValue: "20 years", profileBloodLabel: "Blood Group", profileBloodValue: "A+", profileHeightLabel: "Height", profileHeightValue: "175 cm", profileWeightLabel: "Weight", profileWeightValue: "52 kg", profileEditButton: "Edit Profile",
            dashboardBP: "Blood Pressure", dashboardSugar: "Sugar Level", dashboardHR: "Heart Rate", dashboardBMI: "Body Mass Index", dashboardActivity: "Recent Activity", activity1: "Blood test report uploaded - 2 days ago", activity2: "Appointment with Dr. Gupta - 1 week ago", activity3: "Prescription added - 2 weeks ago", dashboardAppointments: "Upcoming Appointments", appointment1: "Checkup with Dentist - in 5 days", appointment2: "Annual health check-up - in 2 weeks",
            editProfileTitle: "Edit Your Profile", editNameLabel: "Full Name", editDobLabel: "Date of Birth", editBloodLabel: "Blood Group", editHeightLabel: "Height (cm)", editWeightLabel: "Weight (kg)", editSaveButton: "Save Changes",
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Preloader Logic
        const preloader = document.getElementById('preloader');
        window.setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000); // Show preloader for 2 seconds

        // Load saved settings or defaults (safe checks if controls missing)
        changeTheme('light');
        const themeEl = document.getElementById('theme'); if (themeEl) themeEl.value = 'light';
        switchLanguage('en');
        const langEl = document.getElementById('language'); if (langEl) langEl.value = 'en';
        changeTextSize('16px');
        const textSizeEl = document.getElementById('textSize'); if (textSizeEl) textSizeEl.value = '16px';


        // Initialize components
        initializeFAQ();
        initializeScrollAnimations();
        renderHealthChart();
        
        // Initialize NEW FEATURES
        queueSystem.init();
        initializeDoctorAvailability();
        displayAppointments();
        notificationManager.requestPermission();
        
        // Add event listener for appointment date selection
        const appointmentDateInput = document.getElementById('appointmentDate');
        if (appointmentDateInput) {
            appointmentDateInput.addEventListener('change', (e) => {
                generateTimeSlots(e.target.value);
            });
        }

        // Close settings menu and modals on outside click
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('settingsMenu');
            const button = document.getElementById('settingsButton');
            if (menu && button) {
                if (menu.style.display === 'flex' && !menu.contains(event.target) && !button.contains(event.target)) {
                    menu.style.display = 'none';
                }
            }
            
            // Close modals on overlay click
            if (event.target.classList.contains('modal-overlay')) {
                closeModal(event.target.id);
            }
        });

        // Search Bar Functionality (guarded)
        const searchInput = document.getElementById('search-bar-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                document.querySelectorAll('[data-searchable]').forEach(item => {
                    const text = (item.getAttribute('data-searchable') || '').toLowerCase();
                    if (text.includes(query)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    });

    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            question.addEventListener('click', () => {
                const isActive = item.classList.toggle('active');
                question.setAttribute('aria-expanded', isActive);
                answer.style.maxHeight = isActive ? answer.scrollHeight + "px" : null;
                answer.style.paddingTop = isActive ? "1rem" : "0";
                answer.style.paddingBottom = isActive ? "1rem" : "0";
            });
        });
    }

    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .section-title, .faq-item, .dashboard-container, .profile-card, .dashboard-card, .newsletter, .hero-content > *');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideInUp 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => { el.style.opacity = '1'; observer.observe(el); });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', function() { showToast('Logging out...', 'info'); });
    function toggleSettings() { const menu = document.getElementById('settingsMenu'); menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex'; }
    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function changeTheme(theme) { document.body.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); if (document.getElementById('healthChart')) { renderHealthChart(); } }
    function switchLanguage(lang) { document.documentElement.lang = lang; localStorage.setItem('language', lang); document.querySelectorAll('[data-key]').forEach(el => { const key = el.getAttribute('data-key'); if (languageData[lang]?.[key]) el.innerHTML = languageData[lang][key]; }); }
    
    function changeTextSize(size) {
        document.documentElement.style.fontSize = size;
        localStorage.setItem('textSize', size);
    }

    function updateAccount() { showToast("Account updated successfully!", "success"); }
    function clearStorage() { if(confirm("Are you sure you want to clear all local data?")){ localStorage.clear(); sessionStorage.clear(); showToast("Storage cleared!", "success"); location.reload(); } }
    
    function openModal(modalId) { 
        const modal = document.getElementById(modalId); 
        if(modal) modal.classList.add('visible'); 
        if (modalId === 'aiChatModal') {
            const chatBox = document.getElementById('ai-chat-box');
            if (chatBox.children.length === 0) {
                 const aiBubble = document.createElement('div');
                 aiBubble.className = 'ai-message ai';
                 aiBubble.innerHTML = `<div>Hello! How can I help you today? Type 'help' to see what I can do.</div>`;
                 chatBox.appendChild(aiBubble);
            }
        }
        if(modal) modal.querySelector('button, input, select, textarea')?.focus(); 
    }
    function closeModal(modalId) { 
        const modal = document.getElementById(modalId);
        if(modal) modal.classList.remove('visible'); 
    }
    
    function previewProfilePic(event) {
        const file = event.target.files[0];
        if (file) {
            newProfilePicSrc = URL.createObjectURL(file);
            showToast("Profile picture previewed. Click 'Save Changes' to apply.", "info");
        }
    }

    function saveProfile() {
        // Update text fields
        const newName = document.getElementById('editName').value;
        document.querySelector('[data-key="profileName"]').textContent = newName;
        document.getElementById('profileEmail').textContent = document.getElementById('editEmail').value;
        document.getElementById('profileAddress').textContent = document.getElementById('editAddress').value;
        document.getElementById('profileGender').textContent = document.getElementById('editGender').value;
        
        const heightCm = document.getElementById('editHeight').value;
        const heightFt = document.getElementById('editHeightFt')?.value || '';
        document.getElementById('profileHeightValue').textContent = heightFt ? `${heightCm} cm / ${heightFt}` : `${heightCm} cm`;
        
        document.getElementById('profileWeightValue').textContent = `${document.getElementById('editWeight').value} kg`;
        const bloodEl = document.getElementById('editBlood');
        if (bloodEl) document.getElementById('profileBloodValue').textContent = bloodEl.value;

        // Update profile picture if a new one was selected
        if (newProfilePicSrc) {
            // Create or update profile image in profile section
            const profilePic = document.querySelector('.profile-pic');
            if (profilePic) {
                const img = profilePic.querySelector('img') || document.createElement('img');
                img.src = newProfilePicSrc;
                img.alt = 'Profile Picture';
                img.style.display = 'block';
                if (!profilePic.querySelector('img')) {
                    profilePic.appendChild(img);
                }
                profilePic.querySelector('.fa-user')?.style?.setProperty('display', 'none', 'important');
            }

            // Update nav avatar
            document.getElementById('user-avatar-img').src = newProfilePicSrc;
            document.getElementById('user-avatar-img').style.display = 'block';
            document.getElementById('user-initials').style.display = 'none';
        } else {
            // Update initials in nav
            const nameParts = newName.split(' ');
            const initials = nameParts[0].charAt(0) + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '');
            document.getElementById('user-initials').textContent = initials.toUpperCase();
        }

        // Calculate and update age
        const newDob = document.getElementById('editDob').value;
        if (newDob) {
            const birthDate = new Date(newDob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            document.getElementById('profileAgeValue').textContent = `${age} Years`;
        }
        
        showToast("Profile updated successfully!", "success");
        closeModal('editProfileModal');
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        let iconClass = 'fas fa-info-circle';
        if (type === 'success') iconClass = 'fas fa-check-circle';
        if (type === 'error') iconClass = 'fas fa-times-circle';
        toast.innerHTML = `<i class="${iconClass}"></i> ${message}`;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => container.removeChild(toast), 500); }, 3000);
    }
    
    function handleSubscription(event) { event.preventDefault(); showToast('Thank you for subscribing!', 'success'); event.target.reset(); }
    
    function togglePasswordVisibility(fieldId, button) {
        const passwordInput = document.getElementById(fieldId);
        const icon = button.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // --- New Functions ---

    function handleLogin(event) {
        event.preventDefault();
        showToast('Logged in successfully!', 'success');
        
        // Hide Login/Signup buttons and show profile icon
        document.querySelector('.nav-buttons').style.display = 'none';
        document.getElementById('user-profile-icon').style.display = 'flex';
        
        // Show admin link for demo purposes (in real app, check user role)
        document.getElementById('adminLink').style.display = 'block';
        
        // Set user initials
        const fullName = document.querySelector('[data-key="profileName"]').textContent;
        const nameParts = fullName.split(' ');
        const initials = nameParts[0].charAt(0) + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '');
        document.getElementById('user-initials').textContent = initials.toUpperCase();
        
        // Show document upload section
        document.getElementById('document-upload-section').style.display = 'block';
        
        closeModal('loginModal');
        closeModal('signupModal');
    }

function handleAppointmentBooking(event) {
    event.preventDefault();
    
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentDate = document.getElementById('appointmentDate');
    const selectedTimeSlot = document.querySelector('.time-slot.selected');
    const reasonTextarea = event.target.querySelector('textarea');
    
    if (!selectedTimeSlot) {
        showToast('Please select a time slot', 'error');
        return;
    }
    
    const appointmentData = {
        id: 'APT' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        doctorName: doctorSelect.options[doctorSelect.selectedIndex].text,
        doctorId: doctorSelect.value,
        date: appointmentDate.value,
        time: selectedTimeSlot.textContent,
        reason: reasonTextarea.value,
        patientName: document.querySelector('[data-key="profileName"]').textContent,
        patientEmail: document.getElementById('profileEmail').textContent,
        status: 'Scheduled',
        bookingDate: new Date().toISOString(),
        token: queueSystem.generateToken()
    };
    
    // Save to localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointmentData);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Update queue system
    queueSystem.userToken = appointmentData.token;
    queueSystem.updateQueueDisplay();
    
    showToast(`Appointment booked successfully! Your token is ${appointmentData.token}`, 'success');
    closeModal('appointmentModal');
    event.target.reset();
    
    // Refresh appointments display
    displayAppointments();
    
    // Show notification
    notificationManager.showNotification(
        'Appointment Confirmed',
        `Your appointment with ${appointmentData.doctorName} is scheduled for ${appointmentData.date} at ${appointmentData.time}. Token: ${appointmentData.token}`
    );
}

function generateTimeSlots(selectedDate) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    if (!timeSlotsContainer) return;
    
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Clear existing slots
    timeSlotsContainer.innerHTML = '';
    
    // Check if selected date is today
    const isToday = selectedDateObj.getTime() === today.getTime();
    const currentTime = new Date();
    
    // Generate time slots from 9:00 AM to 6:00 PM
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            
            // Check if slot is in the past for today
            if (isToday) {
                const slotTime = new Date();
                slotTime.setHours(hour, minute, 0, 0);
                if (slotTime <= currentTime) {
                    timeSlot.classList.add('booked');
                    timeSlot.style.cursor = 'not-allowed';
                }
            }
            
            // Randomly mark some slots as booked for demo
            if (Math.random() < 0.3 && !timeSlot.classList.contains('booked')) {
                timeSlot.classList.add('booked');
                timeSlot.style.cursor = 'not-allowed';
            }
            
            if (!timeSlot.classList.contains('booked')) {
                timeSlot.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            }
            
            timeSlotsContainer.appendChild(timeSlot);
        }
    }
}

function displayAppointments() {
    const appointmentsContainer = document.getElementById('appointmentCardsContainer');
    if (!appointmentsContainer) return;
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userEmail = document.getElementById('profileEmail').textContent;
    
    // Filter appointments for current user
    const userAppointments = appointments.filter(apt => apt.patientEmail === userEmail);
    
    appointmentsContainer.innerHTML = '';
    
    if (userAppointments.length === 0) {
        appointmentsContainer.innerHTML = '<p>No appointments scheduled yet.</p>';
        return;
    }
    
    userAppointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'appointment-card';
        
        const statusColor = appointment.status === 'Completed' ? '#2ecc71' : 
                           appointment.status === 'Cancelled' ? '#e74c3c' : '#f39c12';
        
        appointmentCard.innerHTML = `
            <h4 style="color: ${statusColor};">${appointment.status}</h4>
            <div class="appointment-details">
                <strong>Doctor:</strong> ${appointment.doctorName}<br>
                <strong>Date:</strong> ${appointment.date}<br>
                <strong>Time:</strong> ${appointment.time}<br>
                <strong>Token:</strong> ${appointment.token || 'N/A'}<br>
                <strong>Reason:</strong> ${appointment.reason}
            </div>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                ${appointment.status === 'Scheduled' ? `
                    <button class="cta-button" onclick="rescheduleAppointment('${appointment.id}')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                        Reschedule
                    </button>
                    <button class="login-btn" onclick="cancelAppointment('${appointment.id}')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                        Cancel
                    </button>
                ` : ''}
            </div>
        `;
        
        appointmentsContainer.appendChild(appointmentCard);
    });
}

function rescheduleAppointment(appointmentId) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    if (appointment) {
        // Remove current appointment
        const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        
        // Open appointment modal with prefilled data
        openModal('appointmentModal');
        showToast('Please select a new date and time', 'info');
        
        // Pre-fill the form
        setTimeout(() => {
            const doctorSelect = document.getElementById('doctorSelect');
            const reasonTextarea = document.querySelector('#appointmentModal textarea');
            
            if (doctorSelect) {
                for (let option of doctorSelect.options) {
                    if (option.text === appointment.doctorName) {
                        doctorSelect.value = appointment.doctorId;
                        break;
                    }
                }
            }
            
            if (reasonTextarea) {
                reasonTextarea.value = appointment.reason;
            }
        }, 100);
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const appointment = appointments.find(apt => apt.id === appointmentId);
        
        if (appointment) {
            appointment.status = 'Cancelled';
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            showToast('Appointment cancelled successfully', 'success');
            displayAppointments();
            
            notificationManager.showNotification(
                'Appointment Cancelled',
                `Your appointment with ${appointment.doctorName} on ${appointment.date} has been cancelled.`
            );
        }
    }
}

function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        document.getElementById('uploaded-documents-container').style.display = 'block';
        const list = document.getElementById('document-list');
        list.innerHTML = ''; // Clear previous list
        for(let i = 0; i < files.length; i++) {
            const li = document.createElement('li');
            li.textContent = files[i].name;
            list.appendChild(li);
        }
    }
}

function analyzeReports() {
    showToast('AI is analyzing your reports... This is a demo feature.', 'info');
}

function scrollFeatures(direction) {
    const container = document.getElementById('features-grid');
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the container width
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
    
    function toggleEncryptionInfo() {
        const info = document.getElementById('encryption-info');
        const isActive = info.style.maxHeight;
        info.style.maxHeight = isActive ? null : info.scrollHeight + "px";
    }

    function toggleMoreFAQs() {
        const hiddenFaqs = document.querySelectorAll('.hidden-faq');
        const button = document.getElementById('show-more-faq');
        hiddenFaqs.forEach(faq => {
            if (faq.style.display === 'block') {
                faq.style.display = 'none';
                button.textContent = 'Show More';
            } else {
                faq.style.display = 'block';
                button.textContent = 'Show Less';
            }
        });
    }

    function convertHeight(fromFt = false) {
        const cmInput = document.getElementById('editHeight');
        const ftInput = document.getElementById('editHeightFt');

        if (fromFt) {
            const ftValue = ftInput.value;
            const parts = ftValue.match(/(\d+)'(\d+)"?/);
            if (parts) {
                const feet = parseInt(parts[1], 10);
                const inches = parseInt(parts[2], 10);
                const totalInches = (feet * 12) + inches;
                const cm = totalInches * 2.54;
                cmInput.value = Math.round(cm);
            }
        } else {
            const cm = parseFloat(cmInput.value);
            if (!isNaN(cm)) {
                const inches = cm / 2.54;
                const feet = Math.floor(inches / 12);
                const remainingInches = Math.round(inches % 12);
                ftInput.value = `${feet}'${remainingInches}"`;
            }
        }
    }

    function handleAIChat(event) {
        event.preventDefault();
        const input = document.getElementById('ai-chat-input');
        const chatBox = document.getElementById('ai-chat-box');
        const userMessage = input.value.trim();

        if (!userMessage) return;

        // Add user's message
        const userBubble = document.createElement('div');
        userBubble.className = 'ai-message user';
        userBubble.innerHTML = `<div></div>`;
        userBubble.querySelector('div').textContent = userMessage;
        chatBox.appendChild(userBubble);
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Show typing indicator
        const thinkingBubble = document.createElement('div');
        thinkingBubble.className = 'ai-message ai';
        thinkingBubble.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        chatBox.appendChild(thinkingBubble);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // Generate AI response
        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage);
            thinkingBubble.innerHTML = `<div></div>`; // Clear typing indicator
            
            // Typewriter effect
            let i = 0;
            const speed = 30; // Milliseconds per character
            function typeWriter() {
                if (i < aiResponse.length) {
                    thinkingBubble.querySelector('div').innerHTML += aiResponse.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
            }
            typeWriter();

        }, 1500); // Simulate thinking delay
    }
    
    // this section is for aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    

    // Voice Recognition for AI Chat (guarded)
    const voiceBtn = document.getElementById('ai-voice-btn');
    const chatInput = document.getElementById('ai-chat-input');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (voiceBtn && chatInput && SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            if (!voiceBtn.classList.contains('recording')) {
                recognition.start();
                voiceBtn.classList.add('recording');
            } else {
                recognition.stop();
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            // Automatically submit the form
            const form = document.getElementById('ai-chat-input-form'); if (form) form.requestSubmit();
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('recording');
        };

        recognition.onerror = (event) => {
            showToast('Voice recognition error: ' + event.error, 'error');
            voiceBtn.classList.remove('recording');
        };
    } else if (voiceBtn) {
        voiceBtn.style.display = 'none'; // Hide if not supported or inputs missing
    }



/**
 * NOTE: Ye renderHealthChart function aapke original code se hai.
 * Isme koi badlav ki zaroorat nahi hai. Maine ise yahan context ke liye rakha hai.
 */
function renderHealthChart() {
    if (healthChartInstance) {
        healthChartInstance.destroy();
    }
    const ctx = document.getElementById('healthChart').getContext('2d');

    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--outline');
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--on-surface');
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--tertiary');

    const labels = ['Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025'];

    healthChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Systolic BP',
                data: [120, 122, 118, 125, 123, 128],
                borderColor: primaryColor,
                backgroundColor: primaryColor + '33',
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            }, {
                label: 'Heart Rate',
                data: [72, 75, 70, 78, 76, 80],
                borderColor: secondaryColor,
                backgroundColor: secondaryColor + '33',
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
            }, {
                label: 'Blood Sugar',
                data: [95, 105, 98, 110, 102, 110],
                borderColor: tertiaryColor,
                backgroundColor: tertiaryColor + '33',
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Health Metrics Overview',
                    color: textColor,
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Blood Pressure (mmHg)',
                        color: textColor
                    },
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'BPM / mg/dL',
                        color: textColor
                    },
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                }
            }
        }
    });
}

// ==================== ADMIN DASHBOARD FUNCTIONS ====================

function switchAdminTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`admin-${tabName}`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load data based on tab
    switch(tabName) {
        case 'patients':
            loadPatientsData();
            break;
        case 'doctors':
            loadDoctorsData();
            break;
        case 'appointments':
            loadAppointmentsData();
            break;
        case 'analytics':
            loadAnalyticsCharts();
            break;
    }
}

function handlePatientRegistration(event) {
    event.preventDefault();
    
    const patientData = {
        id: 'PAT' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        firstName: document.getElementById('patientFirstName').value,
        lastName: document.getElementById('patientLastName').value,
        email: document.getElementById('patientEmail').value,
        phone: document.getElementById('patientPhone').value,
        dob: document.getElementById('patientDob').value,
        gender: document.getElementById('patientGender').value,
        bloodGroup: document.getElementById('patientBloodGroup').value,
        emergencyContact: document.getElementById('patientEmergencyContact').value,
        address: document.getElementById('patientAddress').value,
        height: document.getElementById('patientHeight').value,
        weight: document.getElementById('patientWeight').value,
        allergies: document.getElementById('patientAllergies').value,
        conditions: document.getElementById('patientConditions').value,
        insurance: document.getElementById('patientInsurance').value,
        registrationDate: new Date().toISOString()
    };
    
    // Save to localStorage
    let patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.push(patientData);
    localStorage.setItem('patients', JSON.stringify(patients));
    
    showToast('Patient registered successfully!', 'success');
    closeModal('registerPatientModal');
    event.target.reset();
    
    // Refresh patients table if it's visible
    if (document.getElementById('admin-patients').style.display !== 'none') {
        loadPatientsData();
    }
}

function handleAddDoctor(event) {
    event.preventDefault();
    
    const availability = [];
    document.querySelectorAll('input[name="availability"]:checked').forEach(checkbox => {
        availability.push(checkbox.value);
    });
    
    const doctorData = {
        id: 'DOC' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        name: document.getElementById('doctorName').value,
        specialization: document.getElementById('doctorSpecialization').value,
        email: document.getElementById('doctorEmail').value,
        phone: document.getElementById('doctorPhone').value,
        experience: document.getElementById('doctorExperience').value,
        license: document.getElementById('doctorLicense').value,
        availability: availability,
        status: 'Available',
        patientsToday: 0,
        joinDate: new Date().toISOString()
    };
    
    // Save to localStorage
    let doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    doctors.push(doctorData);
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    showToast('Doctor added successfully!', 'success');
    closeModal('addDoctorModal');
    event.target.reset();
    
    // Refresh doctors table if it's visible
    if (document.getElementById('admin-doctors').style.display !== 'none') {
        loadDoctorsData();
    }
}

function loadPatientsData() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const tbody = document.getElementById('patientsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${calculateAge(patient.dob)}</td>
            <td>${patient.bloodGroup || 'N/A'}</td>
            <td>${patient.phone}</td>
            <td>${new Date(patient.registrationDate).toLocaleDateString()}</td>
            <td>
                <button class="cta-button" onclick="viewPatientDetails('${patient.id}')" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                    View
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadDoctorsData() {
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const tbody = document.getElementById('doctorsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td><span class="availability-status ${doctor.status.toLowerCase()}">${doctor.status}</span></td>
            <td>${doctor.patientsToday}</td>
            <td>${doctor.phone}</td>
            <td>
                <button class="cta-button" onclick="viewDoctorDetails('${doctor.id}')" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                    View
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAppointmentsData() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const tbody = document.getElementById('appointmentsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctorName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td><span class="availability-status ${appointment.status.toLowerCase()}">${appointment.status}</span></td>
            <td>
                <button class="cta-button" onclick="updateAppointmentStatus('${appointment.id}')" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                    Update
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAnalyticsCharts() {
    // Patient Flow Chart
    const patientFlowCtx = document.getElementById('patientFlowChart');
    if (patientFlowCtx) {
        new Chart(patientFlowCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Patient Flow',
                    data: [65, 78, 90, 81, 96, 85, 70],
                    borderColor: '#017b9a',
                    backgroundColor: '#017b9a33',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
    
    // Department Performance Chart
    const departmentCtx = document.getElementById('departmentChart');
    if (departmentCtx) {
        new Chart(departmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Emergency', 'Cardiology', 'Pediatrics', 'Orthopedics', 'General'],
                datasets: [{
                    data: [25, 20, 18, 22, 15],
                    backgroundColor: [
                        '#e74c3c',
                        '#3498db',
                        '#2ecc71',
                        '#f39c12',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function viewPatientDetails(patientId) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        showToast(`Viewing details for ${patient.firstName} ${patient.lastName}`, 'info');
        // You can open a detailed view modal here
    }
}

function viewDoctorDetails(doctorId) {
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        showToast(`Viewing details for Dr. ${doctor.name}`, 'info');
        // You can open a detailed view modal here
    }
}

function updateAppointmentStatus(appointmentId) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.status = appointment.status === 'Scheduled' ? 'Completed' : 'Scheduled';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointmentsData();
        showToast('Appointment status updated!', 'success');
    }
}

function filterAppointments() {
    const dateFilter = document.getElementById('adminDateFilter').value;
    if (dateFilter) {
        showToast(`Filtering appointments for ${dateFilter}`, 'info');
        loadAppointmentsData();
    }
}

// ==================== NOTIFICATION MANAGER ====================
const notificationManager = {
    permission: false,
    
    requestPermission: function() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                this.permission = permission === 'granted';
            });
        }
    },
    
    showNotification: function(title, body, icon = '/favicon.ico') {
        if (this.permission && 'Notification' in window) {
            const notification = new Notification(title, {
                body: body,
                icon: icon,
                tag: 'healthnest-notification'
            });
            
            setTimeout(() => {
                notification.close();
            }, 5000);
        } else {
            // Fallback to toast notification
            showToast(`${title}: ${body}`, 'info');
        }
    }
};

// ==================== ENHANCED QUEUE MANAGEMENT ====================
const queueSystem = {
    tokens: ['A001', 'A002', 'A003', 'A004', 'A005'],
    currentToken: 'A001',
    userToken: null,
    crowdLevel: 45,
    emergencyQueue: [],
    priorityQueue: [],
    
    init: function() {
        this.updateQueueDisplay();
        this.startCrowdMonitoring();
        this.startTokenProgression();
        setInterval(() => this.simulateQueueProgress(), 5000);
    },
    
    generateToken: function(priority = 'normal') {
        const nextNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        let prefix = 'A';
        
        if (priority === 'emergency') {
            prefix = 'E';
            this.emergencyQueue.push(prefix + nextNum);
        } else if (priority === 'priority') {
            prefix = 'P';
            this.priorityQueue.push(prefix + nextNum);
        }
        
        this.userToken = prefix + nextNum;
        return this.userToken;
    },
    
    updateQueueDisplay: function() {
        const tokenEl = document.getElementById('queueToken');
        const posEl = document.getElementById('queuePosition');
        const waitEl = document.getElementById('waitTime');
        
        if (tokenEl && this.userToken) {
            tokenEl.textContent = this.userToken;
            
            // Calculate position based on queue type
            let position = 0;
            if (this.userToken.startsWith('E')) {
                position = this.emergencyQueue.indexOf(this.userToken) + 1;
            } else if (this.userToken.startsWith('P')) {
                position = this.priorityQueue.indexOf(this.userToken) + 1 + this.emergencyQueue.length;
            } else {
                position = this.tokens.indexOf(this.userToken) + 1 || Math.floor(Math.random() * 10) + 5;
            }
            
            posEl.textContent = position;
            waitEl.textContent = (position * 10) + ' minutes';
        }
    },
    
    simulateQueueProgress: function() {
        const tokens = ['A001', 'A002', 'A003', 'A004'];
        const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
        document.getElementById('currentToken').textContent = randomToken;
        
        // Update next tokens list
        const nextTokensList = document.getElementById('nextTokensList');
        if (nextTokensList) {
            const nextTokens = this.getNextTokens(5);
            nextTokensList.innerHTML = nextTokens.map(token => `<li>${token}</li>`).join('');
        }
    },
    
    getNextTokens: function(count) {
        const allTokens = [...this.emergencyQueue, ...this.priorityQueue, ...this.tokens];
        const currentIndex = allTokens.indexOf(this.currentToken);
        return allTokens.slice(currentIndex + 1, currentIndex + 1 + count);
    },
    
    startCrowdMonitoring: function() {
        setInterval(() => {
            this.crowdLevel = Math.max(20, Math.min(95, this.crowdLevel + (Math.random() - 0.5) * 10));
            const crowdFill = document.getElementById('crowdLevel');
            const crowdPercent = document.getElementById('crowdPercentage');
            if (crowdFill && crowdPercent) {
                crowdFill.style.width = this.crowdLevel + '%';
                crowdPercent.textContent = Math.round(this.crowdLevel);
            }
            
            // Alert if crowd is too high
            if (this.crowdLevel > 80) {
                notificationManager.showNotification(
                    'High Crowd Alert',
                    `Hospital occupancy is at ${Math.round(this.crowdLevel)}%. Consider arriving later if possible.`
                );
            }
        }, 3000);
    },
    
    startTokenProgression: function() {
        setInterval(() => {
            // Move to next token
            const allTokens = [...this.emergencyQueue, ...this.priorityQueue, ...this.tokens];
            const currentIndex = allTokens.indexOf(this.currentToken);
            
            if (currentIndex < allTokens.length - 1) {
                this.currentToken = allTokens[currentIndex + 1];
            } else {
                this.currentToken = allTokens[0]; // Reset to first
            }
            
            document.getElementById('currentToken').textContent = this.currentToken;
            this.updateQueueDisplay();
        }, 10000); // Change token every 10 seconds for demo
    }
};

// ==================== DOCTOR AVAILABILITY TRACKING ====================
const doctors = [
    {
        id: 'dr-gupta',
        name: 'Dr. Rajesh Gupta',
        specialization: 'General Physician',
        status: 'available',
        patientsToday: 8,
        maxPatients: 20,
        nextAvailable: '2:30 PM',
        rating: 4.8,
        experience: '15 years'
    },
    {
        id: 'dr-sharma',
        name: 'Dr. Priya Sharma',
        specialization: 'Cardiologist',
        status: 'busy',
        patientsToday: 12,
        maxPatients: 15,
        nextAvailable: '4:00 PM',
        rating: 4.9,
        experience: '12 years'
    },
    {
        id: 'dr-patel',
        name: 'Dr. Amit Patel',
        specialization: 'Dentist',
        status: 'available',
        patientsToday: 5,
        maxPatients: 16,
        nextAvailable: '3:00 PM',
        rating: 4.7,
        experience: '8 years'
    }
];

function initializeDoctorAvailability() {
    const doctorsGrid = document.getElementById('doctorsGrid');
    if (!doctorsGrid) return;
    
    doctorsGrid.innerHTML = '';
    
    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        
        const statusClass = doctor.status === 'available' ? 'available' : 
                           doctor.status === 'busy' ? 'busy' : 'offline';
        
        const availabilityPercentage = (doctor.patientsToday / doctor.maxPatients) * 100;
        
        doctorCard.innerHTML = `
            <div class="doctor-avatar">
                <i class="fas fa-user-md"></i>
            </div>
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-specialty">${doctor.specialization}</div>
            <div class="availability-status ${statusClass}">${doctor.status.toUpperCase()}</div>
            <div class="doctor-stats">
                <p><strong>Experience:</strong> ${doctor.experience}</p>
                <p><strong>Rating:</strong> ⭐ ${doctor.rating}</p>
                <p><strong>Patients Today:</strong> ${doctor.patientsToday}/${doctor.maxPatients}</p>
                <p><strong>Next Available:</strong> ${doctor.nextAvailable}</p>
            </div>
            <div class="availability-bar">
                <div class="availability-fill" style="width: ${availabilityPercentage}%"></div>
            </div>
            <button class="cta-button" onclick="bookWithDoctor('${doctor.id}')" style="margin-top: 1rem; width: 100%;">
                Book Appointment
            </button>
        `;
        
        doctorsGrid.appendChild(doctorCard);
    });
}

function bookWithDoctor(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        openModal('appointmentModal');
        
        // Pre-select the doctor
        setTimeout(() => {
            const doctorSelect = document.getElementById('doctorSelect');
            if (doctorSelect) {
                doctorSelect.value = doctorId;
            }
        }, 100);
        
        showToast(`Selected ${doctor.name}`, 'info');
    }
}

// Real-time status updates
function startRealTimeUpdates() {
    setInterval(() => {
        doctors.forEach(doctor => {
            // Randomly update doctor status
            const random = Math.random();
            if (random < 0.1) {
                doctor.status = doctor.status === 'available' ? 'busy' : 'available';
            }
            
            // Randomly increment patients
            if (random < 0.05 && doctor.patientsToday < doctor.maxPatients) {
                doctor.patientsToday++;
            }
        });
        
        initializeDoctorAvailability();
    }, 30000); // Update every 30 seconds
}

// ==================== AI HOSPITAL CROWD MONITOR ====================
const crowdMonitor = {
    init: function() {
        this.startMonitoring();
        this.initializePredictions();
    },
    
    startMonitoring: function() {
        setInterval(() => {
            this.analyzeCrowdPatterns();
            this.updatePredictions();
        }, 60000); // Update every minute
    },
    
    analyzeCrowdPatterns: function() {
        const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        
        // Simulate crowd analysis based on time and day
        let expectedCrowd = 50;
        
        // Peak hours: 9-11 AM and 4-6 PM
        if ((currentHour >= 9 && currentHour <= 11) || (currentHour >= 16 && currentHour <= 18)) {
            expectedCrowd = 80;
        }
        
        // Weekends are busier
        if (currentDay === 0 || currentDay === 6) {
            expectedCrowd += 15;
        }
        
        // Update queue system with predicted crowd
        queueSystem.crowdLevel = Math.min(95, expectedCrowd + (Math.random() - 0.5) * 20);
    },
    
    initializePredictions: function() {
        // AI-powered crowd predictions
        this.predictNextHourCrowd();
        this.predictBestVisitTime();
    },
    
    predictNextHourCrowd: function() {
        const nextHour = new Date().getHours() + 1;
        let prediction = 50;
        
        if (nextHour >= 9 && nextHour <= 11) prediction = 85;
        if (nextHour >= 16 && nextHour <= 18) prediction = 80;
        
        return prediction;
    },
    
    predictBestVisitTime: function() {
        const currentHour = new Date().getHours();
        let bestTime = '';
        
        if (currentHour < 9) bestTime = '9:00 AM - 10:00 AM';
        else if (currentHour < 12) bestTime = '2:00 PM - 3:00 PM';
        else if (currentHour < 16) bestTime = '4:00 PM - 5:00 PM';
        else bestTime = 'Tomorrow 9:00 AM';
        
        return bestTime;
    },
    
    updatePredictions: function() {
        const prediction = this.predictNextHourCrowd();
        const bestTime = this.predictBestVisitTime();
        
        // Update UI with predictions
        const predictionElement = document.getElementById('crowdPrediction');
        if (predictionElement) {
            predictionElement.innerHTML = `
                <p><strong>Next Hour Prediction:</strong> ${prediction}% occupancy</p>
                <p><strong>Best Time to Visit:</strong> ${bestTime}</p>
            `;
        }
    }
};

// ==================== ENHANCED PROFILE WITH MORE FIELDS ====================
function enhanceProfileModal() {
    const editProfileModal = document.getElementById('editProfileModal');
    if (!editProfileModal) return;
    
    // Add more fields to the existing profile modal
    const additionalFields = `
        <div class="form-grid">
            <div>
                <label for="editBloodGroup">Blood Group</label>
                <select id="editBloodGroup" class="modal-select">
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div>
                <label for="editPhone">Phone Number</label>
                <input type="tel" id="editPhone" class="modal-input" placeholder="+91 98765 43210">
            </div>
        </div>
        
        <div class="form-grid">
            <div>
                <label for="editEmergencyContact">Emergency Contact</label>
                <input type="tel" id="editEmergencyContact" class="modal-input" placeholder="Emergency contact number">
            </div>
            <div>
                <label for="editAllergies">Known Allergies</label>
                <input type="text" id="editAllergies" class="modal-input" placeholder="e.g., Penicillin, Peanuts">
            </div>
        </div>
        
        <label for="editAddress">Address</label>
        <textarea id="editAddress" class="modal-input" rows="2" placeholder="Full residential address"></textarea>
        
        <div class="form-grid">
            <div>
                <label for="editInsurance">Insurance Provider</label>
                <input type="text" id="editInsurance" class="modal-input" placeholder="Insurance company name">
            </div>
            <div>
                <label for="editPolicyNumber">Policy Number</label>
                <input type="text" id="editPolicyNumber" class="modal-input" placeholder="Insurance policy number">
            </div>
        </div>
        
        <div class="form-grid">
            <div>
                <label for="editMaritalStatus">Marital Status</label>
                <select id="editMaritalStatus" class="modal-select">
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </select>
            </div>
            <div>
                <label for="editOccupation">Occupation</label>
                <input type="text" id="editOccupation" class="modal-input" placeholder="Your occupation">
            </div>
        </div>
        
        <label for="editMedicalHistory">Medical History</label>
        <textarea id="editMedicalHistory" class="modal-input" rows="3" placeholder="Previous medical conditions, surgeries, etc."></textarea>
    `;
    
    // Insert additional fields before the save button
    const saveButton = editProfileModal.querySelector('button[onclick="saveProfile()"]');
    if (saveButton) {
        saveButton.insertAdjacentHTML('beforebegin', additionalFields);
    }
}

// Initialize enhanced profile when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    
    // Enhance profile modal with additional fields
    enhanceProfileModal();
    
    // Initialize crowd monitor
    crowdMonitor.init();
    
    // Start real-time updates
    startRealTimeUpdates();
});

