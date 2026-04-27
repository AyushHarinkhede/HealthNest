/*
 * CHAT BACKEND SYSTEM for VANIE AI
 * This file provides backend response logic for VANIE AI chat functionality
 * It connects with VANIE.js to provide clear, structured responses
 */

class ChatBackend {
    constructor() {
        this.responseCategories = {
            greeting: {
                keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
                getResponse: (userMessage, timeOfDay) => {
                    const hour = new Date().getHours();
                    let greeting = "Hello";
                    if (hour < 12) greeting = "☀️ Good morning";
                    else if (hour < 18) greeting = "🌤️ Good afternoon";
                    else greeting = "🌙 Good evening";
                    
                    return `${greeting}! I'm VANIE, your health assistant. How can I help you today?`;
                }
            },
            
            help: {
                keywords: ['help', 'what can you do', 'commands', 'features'],
                getResponse: () => {
                    return `I can help you with:\n\n🏥 **Health Information**\n- Check your BMI, blood pressure, heart rate\n- Get general health tips and advice\n- Understand symptoms and conditions\n\n📱 **App Navigation**\n- Open dashboard or profile\n- Change themes (dark/light mode)\n- Set health goals\n\n🤖 **General Chat**\n- Answer health-related questions\n- Provide wellness tips\n- Emergency guidance when needed\n\nTry asking: "What is my BMI?" or "How to improve sleep?"`;
                }
            },
            
            emergency: {
                keywords: ['chest pain', 'heart attack', 'stroke', 'cant breathe', 'difficulty breathing', 'suicide', 'kill myself', 'emergency'],
                getResponse: (userMessage) => {
                    return `🚨 **MEDICAL EMERGENCY** 🚨\n\nIf this is a real emergency, call your local emergency number immediately:\n- 📞 **112** (General Emergency)\n- 📞 **102** (Ambulance)\n\n**Please seek immediate medical help. Don't wait.**\n\nIf you're having thoughts of self-harm, please call:\n- 📞 **KIRAN Mental Health Helpline: 1800-599-0019**\n- 📞 **Aasra: 9820466726**\n\nYou're not alone - help is available 24/7.`;
                }
            },
            
            healthMetrics: {
                keywords: ['bmi', 'blood pressure', 'bp', 'heart rate', 'hr', 'pulse'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('bmi')) {
                        const bmiElement = document.querySelector('#bmi-card .value');
                        const bmi = bmiElement ? bmiElement.textContent : '23.5';
                        return `📏 **Your BMI**: ${bmi}\n\nBMI Categories:\n- Below 18.5: Underweight\n- 18.5-24.9: Normal weight ✅\n- 25.0-29.9: Overweight\n- 30.0+: Obesity\n\n*Note: Consult your doctor for personalized advice.*`;
                    }
                    
                    if (msg.includes('blood pressure') || msg.includes('bp')) {
                        const bpElement = document.querySelector('#bp-card .value');
                        const bp = bpElement ? bpElement.textContent : '120/80';
                        const systolic = parseInt(bp.split('/')[0]);
                        
                        let status = "Normal ✅";
                        if (systolic >= 140) status = "High ⚠️";
                        else if (systolic >= 130) status = "Elevated ⚠️";
                        
                        return `❤️ **Blood Pressure**: ${bp} mmHg\n**Status**: ${status}\n\n*Normal range: Less than 120/80 mmHg*\n*If concerned, consult your healthcare provider.*`;
                    }
                    
                    if (msg.includes('heart rate') || msg.includes('hr') || msg.includes('pulse')) {
                        const hrElement = document.querySelector('#hr-card .value');
                        const hr = hrElement ? hrElement.textContent : '72';
                        
                        let status = "Normal ✅";
                        const hrNum = parseInt(hr);
                        if (hrNum > 100) status = "High ⚠️";
                        else if (hrNum < 60) status = "Low ⚠️";
                        
                        return `💓 **Heart Rate**: ${hr} BPM\n**Status**: ${status}\n\n*Normal range: 60-100 BPM for adults*\n*Athletes may have lower resting heart rates.*`;
                    }
                }
            },
            
            symptoms: {
                keywords: ['headache', 'fever', 'cough', 'nausea', 'dizziness', 'fatigue', 'pain', 'stomach ache', 'sore throat'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('headache')) {
                        return `🤕 **Headache Care**\n\n**Immediate Relief:**\n- Drink a large glass of water (dehydration is common)\n- Rest in a quiet, dark room\n- Apply cold compress to forehead\n\n**When to See a Doctor:**\n- Severe or sudden headache\n- Headache with fever, stiff neck\n- Headache after head injury\n- Worsening pattern\n\n*This is general advice. Consult a doctor for persistent symptoms.*`;
                    }
                    
                    if (msg.includes('fever')) {
                        return `🌡️ **Fever Management**\n\n**Home Care:**\n- Rest and stay hydrated\n- Take lukewarm baths\n- Wear lightweight clothing\n\n**When to Seek Medical Help:**\n- Temperature above 103°F (39.4°C)\n- Fever lasting more than 3 days\n- Fever with severe headache, rash, or confusion\n\n*For children, consult pediatrician for specific guidance.*`;
                    }
                    
                    if (msg.includes('cough') || msg.includes('sore throat')) {
                        return `🗣️ **Cough & Sore Throat**\n\n**Relief Measures:**\n- Stay hydrated with warm fluids\n- Use honey (1+ year old only)\n- Gargle with warm salt water\n- Use a humidifier\n\n**See Doctor If:**\n- Cough lasts more than 2 weeks\n- Difficulty breathing\n- High fever with cough\n- Coughing up blood\n\n*Persistent symptoms need medical evaluation.*`;
                    }
                    
                    return `🏥 **General Symptom Guidance**\n\nI understand you're not feeling well. While I can provide general information, **please consult a healthcare professional** for:\n- Accurate diagnosis\n- Personalized treatment\n- Proper medication guidance\n\n**When to Seek Immediate Care:**\n- Severe symptoms\n- Difficulty breathing\n- High fever with confusion\n- Sudden, severe pain\n\nYour health is important - don't hesitate to see a doctor.`;
                }
            },
            
            lifestyle: {
                keywords: ['diet', 'exercise', 'sleep', 'stress', 'weight', 'nutrition', 'workout'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('diet') || msg.includes('nutrition') || msg.includes('eat')) {
                        return `🥗 **Healthy Eating Tips**\n\n**Balanced Plate Formula:**\n- ½ plate: Vegetables & fruits\n- ¼ plate: Lean proteins (chicken, fish, beans)\n- ¼ plate: Whole grains (brown rice, quinoa)\n\n**Daily Goals:**\n- 8+ glasses of water\n- Limit processed foods\n- Choose healthy snacks (nuts, fruits, yogurt)\n\n**Remember:** Small, consistent changes work better than drastic diets!`;
                    }
                    
                    if (msg.includes('exercise') || msg.includes('workout') || msg.includes('physical activity')) {
                        return `💪 **Exercise Guidelines**\n\n**Weekly Target:**\n- 150 minutes moderate activity (brisk walking)\n- OR 75 minutes vigorous activity (running)\n- PLUS 2+ strength training sessions\n\n**Easy Ways to Start:**\n- 10-minute walks after meals\n- Take stairs instead of elevator\n- Dance to your favorite music\n- Stretch during TV commercials\n\n**Key:** Consistency over intensity!`;
                    }
                    
                    if (msg.includes('sleep') || msg.includes('insomnia') || msg.includes('tired')) {
                        return `😴 **Better Sleep Tips**\n\n**Sleep Hygiene:**\n- 7-9 hours nightly for adults\n- Consistent sleep/wake times\n- Dark, cool, quiet bedroom\n- No screens 1 hour before bed\n\n**Bedtime Routine Ideas:**\n- Warm bath or shower\n- Reading (not screens)\n- Light stretching or meditation\n- Herbal tea (caffeine-free)\n\n**Trouble Sleeping?** Try the 4-7-8 breathing technique!`;
                    }
                    
                    if (msg.includes('stress') || msg.includes('anxiety') || msg.includes('mental health')) {
                        return `🧘 **Stress Management**\n\n**Quick Relief Techniques:**\n- Deep breathing: 4s in, 6s out\n- 5-4-3-2-1 grounding exercise\n- Short walk or stretch\n\n**Daily Practices:**\n- Regular exercise\n- Adequate sleep\n- Limit caffeine and alcohol\n- Connect with friends/family\n\n**When to Seek Help:**\n- Stress affecting daily life\n- Persistent anxiety or depression\n- Thoughts of self-harm\n\n*Professional help is a sign of strength!*`;
                    }
                    
                    return `🌟 **Healthy Lifestyle**\n\nFocus on these pillars:\n1. **Nutrition** - Balanced, whole foods\n2. **Movement** - Regular physical activity\n3. **Sleep** - Quality rest\n4. **Stress Management** - Mental wellness\n5. **Social Connection** - Relationships matter\n\nWhat specific area would you like to focus on?`;
                }
            },
            
            navigation: {
                keywords: ['dashboard', 'profile', 'settings', 'dark mode', 'light mode', 'theme'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('dashboard')) {
                        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                        closeModal?.('aiChatModal');
                        return `📊 **Opening Dashboard...**\n\nYour health metrics and overview are now visible!`;
                    }
                    
                    if (msg.includes('profile')) {
                        const name = document.querySelector('[data-key="profileName"]')?.textContent?.trim() || 'your profile';
                        closeModal?.('aiChatModal');
                        return `👤 **Opening Profile...**\n\nWelcome to ${name}! Here you can update your personal information.`;
                    }
                    
                    if (msg.includes('dark mode') || msg.includes('theme dark')) {
                        if (typeof changeTheme === 'function') {
                            changeTheme('dark');
                            return `🌙 **Dark Mode Activated**\n\nEasier on the eyes for evening use!`;
                        }
                        return `🌙 **Dark Mode**\n\nTheme change feature is available in settings.`;
                    }
                    
                    if (msg.includes('light mode') || msg.includes('theme light')) {
                        if (typeof changeTheme === 'function') {
                            changeTheme('light');
                            return `☀️ **Light Mode Activated**\n\nBright and clear for daytime use!`;
                        }
                        return `☀️ **Light Mode**\n\nTheme change feature is available in settings.`;
                    }
                    
                    return `🧭 **Navigation Help**\n\nTry these commands:\n- "Open dashboard" - View health metrics\n- "Show profile" - Personal information\n- "Dark mode" / "Light mode" - Change theme\n- "Settings" - App preferences`;
                }
            },
            
            personal: {
                keywords: ['age', 'blood group', 'name', 'profile'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('age')) {
                        const ageElement = document.getElementById('profileAgeValue');
                        const age = ageElement ? ageElement.textContent : 'not set';
                        return `📅 **Your Age**: ${age}\n\nKeep your profile updated for accurate health recommendations!`;
                    }
                    
                    if (msg.includes('blood group')) {
                        const bloodElement = document.getElementById('profileBloodValue');
                        const blood = bloodElement ? bloodElement.textContent : 'not set';
                        return `🩸 **Blood Group**: ${blood}\n\nImportant information for medical emergencies and donations!`;
                    }
                    
                    return `👤 **Profile Information**\n\nYour personal health data helps me provide better guidance.\n\nUpdate your profile with:\n- Age, height, weight\n- Blood group\n- Medical conditions\n- Current medications\n\n*Your data is private and secure.*`;
                }
            },
            
            conversation: {
                keywords: ['thank', 'thanks', 'bye', 'goodbye', 'how are you', 'your name', 'joke', 'weather'],
                getResponse: (userMessage) => {
                    const msg = userMessage.toLowerCase();
                    
                    if (msg.includes('thank') || msg.includes('thanks')) {
                        return `😊 **You're welcome!**\n\nI'm happy to help with your health questions. Anything else I can assist with?`;
                    }
                    
                    if (msg.includes('bye') || msg.includes('goodbye')) {
                        return `👋 **Goodbye!**\n\nTake care of yourself! Remember: I'm here whenever you need health guidance.\n\n*Stay healthy and well!*`;
                    }
                    
                    if (msg.includes('how are you')) {
                        return `🤖 **I'm functioning perfectly!**\n\nReady to help with your health questions. My purpose is to provide you with accurate health information and guidance.\n\nHow can I assist you today?`;
                    }
                    
                    if (msg.includes('your name') || msg.includes('who are you')) {
                        return `🤖 **I'm VANIE** - Virtual Assistant for Nursing & Health Information & Education\n\nYour dedicated health companion here to:\n- Answer health questions\n- Provide wellness guidance\n- Help navigate the app\n- Support your health journey\n\n*I'm here to help you stay healthy!*`;
                    }
                    
                    if (msg.includes('joke')) {
                        return `😂 **Health Humor!**\n\nWhy don't skeletons fight each other?\n\nThey don't have the guts! 💀\n\n*Sometimes laughter is the best medicine!*`;
                    }
                    
                    if (msg.includes('weather')) {
                        return `🌤️ **Weather & Health**\n\nI can't check live weather, but here's how weather affects health:\n\n**Hot Weather:**\n- Stay hydrated\n- Avoid peak sun hours\n- Watch for heat exhaustion\n\n**Cold Weather:**\n- Keep warm and dry\n- Watch for flu symptoms\n- Maintain indoor exercise\n\n**Any weather:** Stay active and healthy!`;
                    }
                    
                    return `💬 **Let's Chat!**\n\nI'm here to help with health-related questions. Try asking about:\n- Health metrics (BMI, BP, heart rate)\n- Symptoms and conditions\n- Lifestyle tips (diet, exercise, sleep)\n- App navigation\n\nWhat's on your mind?`;
                }
            }
        };
    }
    
    processMessage(userMessage) {
        const msg = userMessage.toLowerCase().trim();
        
        if (!msg) {
            return "Hello! I'm VANIE, your health assistant. How can I help you today? Type 'help' to see what I can do.";
        }
        
        // Check each category for matching keywords
        for (const [categoryName, category] of Object.entries(this.responseCategories)) {
            for (const keyword of category.keywords) {
                if (msg.includes(keyword)) {
                    try {
                        return category.getResponse(userMessage, new Date());
                    } catch (error) {
                        console.error(`Error in ${categoryName} response:`, error);
                        continue;
                    }
                }
            }
        }
        
        // Fallback response
        return `🤔 **I didn't understand that**\n\nI'm here to help with health-related questions. Try:\n\n• "What is my BMI?"\n• "How to improve sleep?"\n• "Headache remedies"\n• "Open dashboard"\n• Type "help" for more options\n\nWhat health topic would you like to know about?`;
    }
    
    // Method to get structured response data
    getStructuredResponse(userMessage) {
        const response = this.processMessage(userMessage);
        
        return {
            text: response,
            timestamp: new Date().toISOString(),
            category: this.detectCategory(userMessage),
            confidence: this.calculateConfidence(userMessage)
        };
    }
    
    detectCategory(userMessage) {
        const msg = userMessage.toLowerCase();
        
        for (const [categoryName, category] of Object.entries(this.responseCategories)) {
            for (const keyword of category.keywords) {
                if (msg.includes(keyword)) {
                    return categoryName;
                }
            }
        }
        
        return 'unknown';
    }
    
    calculateConfidence(userMessage) {
        const msg = userMessage.toLowerCase();
        let matches = 0;
        let totalKeywords = 0;
        
        for (const category of Object.values(this.responseCategories)) {
            totalKeywords += category.keywords.length;
            for (const keyword of category.keywords) {
                if (msg.includes(keyword)) {
                    matches++;
                }
            }
        }
        
        return totalKeywords > 0 ? matches / totalKeywords : 0;
    }
}

// Initialize the backend system
window.chatBackend = new ChatBackend();

// Export for use in VANIE.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatBackend;
}
