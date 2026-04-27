/*
 * VANIE (Virtual Assistant for Nursing & Health Information & Education)
 * Complete AI Chat System - Merged Backend and Test Functionality
 * This single file contains the entire VANIE AI response system
 * Version: 2.0 - Unified System
 */

class VANIEAlgorithm {
    constructor() {
        this.name = "VANIE - Virtual Assistant for Nursing & Health Information & Education";
        this.version = "2.0";
        
        // Priority-based response categories
        this.responseEngine = {
            // Level 1: Critical Emergency (highest priority)
            emergency: {
                priority: 1,
                keywords: [
                    'chest pain', 'heart attack', 'stroke', 'cant breathe', 'difficulty breathing',
                    'suicide', 'kill myself', 'emergency', 'severe pain', 'unconscious',
                    'heavy bleeding', 'poison', 'overdose', 'swallowed chemicals'
                ],
                handler: this.handleEmergency.bind(this)
            },
            
            // Level 2: App Navigation
            navigation: {
                priority: 2,
                keywords: ['dashboard', 'profile', 'dark mode', 'light mode', 'theme', 'settings'],
                handler: this.handleNavigation.bind(this)
            },
            
            // Level 3: Health Metrics Query
            metrics: {
                priority: 3,
                keywords: ['bmi', 'blood pressure', 'bp', 'heart rate', 'hr', 'pulse', 'weight'],
                handler: this.handleMetrics.bind(this)
            },
            
            // Level 4: Medical Symptoms
            symptoms: {
                priority: 4,
                keywords: [
                    'headache', 'fever', 'cough', 'nausea', 'dizziness', 'fatigue', 'pain',
                    'stomach ache', 'sore throat', 'vomiting', 'diarrhea', 'migraine',
                    'body ache', 'chills', 'cramp', 'feeling sick', 'unwell', 'illness'
                ],
                handler: this.handleSymptoms.bind(this)
            },
            
            // Level 5: Lifestyle & Prevention
            lifestyle: {
                priority: 5,
                keywords: [
                    'diet', 'exercise', 'sleep', 'stress', 'weight', 'nutrition',
                    'workout', 'healthy food', 'prevent', 'lifestyle', 'fitness'
                ],
                handler: this.handleLifestyle.bind(this)
            },
            
            // Level 6: Personal Health Data
            personal: {
                priority: 6,
                keywords: ['age', 'blood group', 'name', 'profile', 'my', 'personal'],
                handler: this.handlePersonal.bind(this)
            },
            
            // Level 7: Conversational
            conversation: {
                priority: 7,
                keywords: [
                    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
                    'help', 'thank', 'thanks', 'bye', 'goodbye', 'how are you',
                    'your name', 'who are you', 'joke', 'weather'
                ],
                handler: this.handleConversation.bind(this)
            },
            
            // Level 8: Complex Topics (love, philosophy, etc.)
            complex: {
                priority: 8,
                keywords: ['love', 'life', 'meaning', 'purpose', 'happiness', 'future'],
                handler: this.handleComplex.bind(this)
            }
        };
        
        // Response templates
        this.templates = {
            emergency: {
                medical: `🚨 **MEDICAL EMERGENCY** 🚨

If this is a real emergency, call your local emergency number immediately:
- 📞 **112** (General Emergency)
- 📞 **102** (Ambulance)

**Please seek immediate medical help. Don't wait.**

If you're having thoughts of self-harm, please call:
- 📞 **KIRAN Mental Health Helpline: 1800-599-0019**
- 📞 **Aasra: 9820466726**

You're not alone - help is available 24/7.`,
                
                mental: `🧠 **MENTAL HEALTH SUPPORT** 🧠

If you're in crisis, please reach out for help:

**24/7 Helplines:**
- 📞 **KIRAN Mental Health Helpline: 1800-599-0019**
- 📞 **Aasra: 9820466726**

**Remember:**
- You're not alone in this
- Help is available and effective
- Taking that first step shows incredible strength

**For immediate support:**
- Call one of the numbers above
- Talk to someone you trust
- Go to the nearest emergency room if needed

Your life matters. There is hope, and there is help.`
            }
        };
    }
    
    // Main processing function
    processMessage(userMessage) {
        const msg = (userMessage || '').toString().trim();
        if (!msg) return this.getGreeting();
        
        // Process through priority levels
        const sortedCategories = Object.entries(this.responseEngine)
            .sort(([,a], [,b]) => a.priority - b.priority);
        
        for (const [categoryName, category] of sortedCategories) {
            if (this.matchesKeywords(msg, category.keywords)) {
                try {
                    return category.handler(msg, userMessage);
                } catch (error) {
                    console.error(`Error in ${categoryName} handler:`, error);
                    continue;
                }
            }
        }
        
        // Fallback response
        return this.getFallbackResponse();
    }
    
    // Helper function to check keyword matches
    matchesKeywords(message, keywords) {
        const msgLower = message.toLowerCase();
        return keywords.some(keyword => msgLower.includes(keyword.toLowerCase()));
    }
    
    // Emergency handler
    handleEmergency(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        // Mental health emergency
        if (msgLower.includes('suicide') || msgLower.includes('kill myself') || 
            msgLower.includes('want to die') || msgLower.includes('no reason to live')) {
            return this.templates.emergency.mental;
        }
        
        // Medical emergency
        return this.templates.emergency.medical;
    }
    
    // Navigation handler
    handleNavigation(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('dashboard')) {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `📊 **Opening Dashboard...**

Your health metrics and overview are now visible!`;
        }
        
        if (msgLower.includes('profile')) {
            const name = document.querySelector('[data-key="profileName"]')?.textContent?.trim() || 'your profile';
            closeModal?.('aiChatModal');
            return `👤 **Opening Profile...**

Welcome to ${name}! Here you can update your personal information.`;
        }
        
        if (msgLower.includes('dark mode') || (msgLower.includes('dark') && msgLower.includes('mode'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('dark');
                return `🌙 **Dark Mode Activated**

Easier on the eyes for evening use!`;
            }
            return `🌙 **Dark Mode**

Theme change feature is available in settings.`;
        }
        
        if (msgLower.includes('light mode') || (msgLower.includes('light') && msgLower.includes('mode'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('light');
                return `☀️ **Light Mode Activated**

Bright and clear for daytime use!`;
            }
            return `☀️ **Light Mode**

Theme change feature is available in settings.`;
        }
        
        return `🧭 **Navigation Help**

Try these commands:
- "Open dashboard" - View health metrics
- "Show profile" - Personal information
- "Dark mode" / "Light mode" - Change theme
- "Settings" - App preferences`;
    }
    
    // Health metrics handler
    handleMetrics(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('bmi')) {
            const bmiElement = document.querySelector('#bmi-card .value');
            const bmi = bmiElement ? bmiElement.textContent : '23.5';
            return this.formatBMIResponse(bmi);
        }
        
        if (msgLower.includes('blood pressure') || msgLower.includes('bp')) {
            const bpElement = document.querySelector('#bp-card .value');
            const bp = bpElement ? bpElement.textContent : '120/80';
            return this.formatBPResponse(bp);
        }
        
        if (msgLower.includes('heart rate') || msgLower.includes('hr') || msgLower.includes('pulse')) {
            const hrElement = document.querySelector('#hr-card .value');
            const hr = hrElement ? hrElement.textContent : '72';
            return this.formatHeartRateResponse(hr);
        }
        
        return `📊 **Health Metrics**

I can help you check:
- **BMI** (Body Mass Index)
- **Blood Pressure**
- **Heart Rate**

Try asking: "What is my BMI?"`;
    }
    
    // Symptoms handler
    handleSymptoms(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('headache')) {
            return `🤕 **Headache Care**

**Immediate Relief:**
- Drink a large glass of water (dehydration is common)
- Rest in a quiet, dark room
- Apply cold compress to forehead

**When to See a Doctor:**
- Severe or sudden headache
- Headache with fever, stiff neck
- Headache after head injury
- Worsening pattern

*This is general advice. Consult a doctor for persistent symptoms.*`;
        }
        
        if (msgLower.includes('fever')) {
            return `🌡️ **Fever Management**

**Home Care:**
- Rest and stay hydrated
- Take lukewarm baths
- Wear lightweight clothing

**When to Seek Medical Help:**
- Temperature above 103°F (39.4°C)
- Fever lasting more than 3 days
- Fever with severe headache, rash, or confusion

*For children, consult pediatrician for specific guidance.*`;
        }
        
        if (msgLower.includes('cough') || msgLower.includes('sore throat')) {
            return `🗣️ **Cough & Sore Throat**

**Relief Measures:**
- Stay hydrated with warm fluids
- Use honey (1+ year old only)
- Gargle with warm salt water
- Use a humidifier

**See Doctor If:**
- Cough lasts more than 2 weeks
- Difficulty breathing
- High fever with cough
- Coughing up blood

*Persistent symptoms need medical evaluation.*`;
        }
        
        return `🏥 **General Symptom Guidance**

I understand you're not feeling well. While I can provide general information, **please consult a healthcare professional** for:

- Accurate diagnosis
- Personalized treatment
- Proper medication guidance

**When to Seek Immediate Care:**
- Severe symptoms
- Difficulty breathing
- High fever with confusion
- Sudden, severe pain

Your health is important - don't hesitate to see a doctor.`;
    }
    
    // Lifestyle handler
    handleLifestyle(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('diet') || msgLower.includes('nutrition') || msgLower.includes('eat')) {
            return `🥗 **Healthy Eating Tips**

**Balanced Plate Formula:**
- ½ plate: Vegetables & fruits
- ¼ plate: Lean proteins (chicken, fish, beans)
- ¼ plate: Whole grains (brown rice, quinoa)

**Daily Goals:**
- 8+ glasses of water
- Limit processed foods
- Choose healthy snacks (nuts, fruits, yogurt)

**Remember:** Small, consistent changes work better than drastic diets!`;
        }
        
        if (msgLower.includes('exercise') || msgLower.includes('workout') || msgLower.includes('physical activity')) {
            return `💪 **Exercise Guidelines**

**Weekly Target:**
- 150 minutes moderate activity (brisk walking)
- OR 75 minutes vigorous activity (running)
- PLUS 2+ strength training sessions

**Easy Ways to Start:**
- 10-minute walks after meals
- Take stairs instead of elevator
- Dance to your favorite music
- Stretch during TV commercials

**Key:** Consistency over intensity!`;
        }
        
        if (msgLower.includes('sleep') || msgLower.includes('insomnia') || msgLower.includes('tired')) {
            return `😴 **Better Sleep Tips**

**Sleep Hygiene:**
- 7-9 hours nightly for adults
- Consistent sleep/wake times
- Dark, cool, quiet bedroom
- No screens 1 hour before bed

**Bedtime Routine Ideas:**
- Warm bath or shower
- Reading (not screens)
- Light stretching or meditation
- Herbal tea (caffeine-free)

**Trouble Sleeping?** Try the 4-7-8 breathing technique!`;
        }
        
        if (msgLower.includes('stress') || msgLower.includes('anxiety') || msgLower.includes('mental health')) {
            return `🧘 **Stress Management**

**Quick Relief Techniques:**
- Deep breathing: 4s in, 6s out
- 5-4-3-2-1 grounding exercise
- Short walk or stretch

**Daily Practices:**
- Regular exercise
- Adequate sleep
- Limit caffeine and alcohol
- Connect with friends/family

**When to Seek Help:**
- Stress affecting daily life
- Persistent anxiety or depression
- Thoughts of self-harm

*Professional help is a sign of strength!*`;
        }
        
        return `🌟 **Healthy Lifestyle**

Focus on these pillars:
1. **Nutrition** - Balanced, whole foods
2. **Movement** - Regular physical activity
3. **Sleep** - Quality rest
4. **Stress Management** - Mental wellness
5. **Social Connection** - Relationships matter

What specific area would you like to focus on?`;
    }
    
    // Personal data handler
    handlePersonal(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('age')) {
            const ageElement = document.getElementById('profileAgeValue');
            const age = ageElement ? ageElement.textContent : 'not set';
            return `📅 **Your Age**: ${age}

Keep your profile updated for accurate health recommendations!`;
        }
        
        if (msgLower.includes('blood group')) {
            const bloodElement = document.getElementById('profileBloodValue');
            const blood = bloodElement ? bloodElement.textContent : 'not set';
            return `🩸 **Blood Group**: ${blood}

Important information for medical emergencies and donations!`;
        }
        
        return `👤 **Profile Information**

Your personal health data helps me provide better guidance.

Update your profile with:
- Age, height, weight
- Blood group
- Medical conditions
- Current medications

*Your data is private and secure.*`;
    }
    
    // Conversation handler
    handleConversation(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        const hour = new Date().getHours();
        
        if (msgLower.includes('help')) {
            return `🤖 **VANIE AI Assistant - Help Menu**

I can help you with:

🏥 **Health Information**
- Check your BMI, blood pressure, heart rate
- Get general health tips and advice
- Understand symptoms and conditions

📱 **App Navigation**
- Open dashboard or profile
- Change themes (dark/light mode)
- Set health goals

🤖 **General Chat**
- Answer health-related questions
- Provide wellness tips
- Emergency guidance when needed

**Try asking:**
- "What is my BMI?"
- "How to improve sleep?"
- "Headache remedies"
- "Open dashboard"
- "Emergency chest pain"

Type any health question to get started!`;
        }
        
        if (msgLower.includes('hi') || msgLower.includes('hello') || msgLower.includes('hey')) {
            return this.getGreeting();
        }
        
        if (msgLower.includes('thank') || msgLower.includes('thanks')) {
            return `😊 **You're welcome!**

I'm happy to help with your health questions. Anything else I can assist with?`;
        }
        
        if (msgLower.includes('bye') || msgLower.includes('goodbye')) {
            return `👋 **Goodbye!**

Take care of yourself! Remember: I'm here whenever you need health guidance.

*Stay healthy and well!*`;
        }
        
        if (msgLower.includes('how are you')) {
            return `🤖 **I'm functioning perfectly!**

Ready to help with your health questions. My purpose is to provide you with accurate health information and guidance.

How can I assist you today?`;
        }
        
        if (msgLower.includes('your name') || msgLower.includes('who are you')) {
            return `🤖 **I'm VANIE** - Virtual Assistant for Nursing & Health Information & Education

Your dedicated health companion here to:
- Answer health questions
- Provide wellness guidance
- Help navigate the app
- Support your health journey

*I'm here to help you stay healthy!*`;
        }
        
        if (msgLower.includes('joke')) {
            return `😂 **Health Humor!**

Why don't skeletons fight each other?

They don't have the guts! 💀

*Sometimes laughter is the best medicine!*`;
        }
        
        if (msgLower.includes('weather')) {
            return `🌤️ **Weather & Health**

I can't check live weather, but here's how weather affects health:

**Hot Weather:**
- Stay hydrated
- Avoid peak sun hours
- Watch for heat exhaustion

**Cold Weather:**
- Keep warm and dry
- Watch for flu symptoms
- Maintain indoor exercise

**Any weather:** Stay active and healthy!`;
        }
        
        return this.getGreeting();
    }
    
    // Complex topics handler
    handleComplex(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('love')) {
            const loveResponses = [
                `💖 **Love and Health**

Love is more than just an emotion - it's a powerful force for health and wellbeing:

**Health Benefits of Love:**
- Reduces stress and anxiety
- Lowers blood pressure
- Boosts immune system
- Increases longevity
- Improves mental health

**Healthy Relationships:**
- Communication and trust
- Mutual respect and support
- Shared values and goals
- Emotional intimacy

Remember: Self-love is the foundation for loving others. Take care of your own wellbeing first!`,
                
                `🧠 **The Science of Love**

Love triggers the release of powerful chemicals in your brain:

**Love Chemistry:**
- **Oxytocin** - The "bonding hormone"
- **Dopamine** - Pleasure and reward
- **Serotonin** - Mood stabilization
- **Endorphins** - Natural pain relief

**Health Impact:**
- Reduced inflammation
- Better stress management
- Improved cardiovascular health
- Enhanced mental wellbeing

Love isn't just good for the heart - it's good for your entire body!`,
                
                `🌟 **Love as Wellness**

Love in all its forms contributes to holistic health:

**Types of Healthy Love:**
- Romantic love
- Family bonds
- Friendships
- Self-love
- Community connection

**Wellness Benefits:**
- Stronger immune system
- Faster recovery from illness
- Better mental resilience
- Increased life satisfaction

Cultivating love in your life is one of the best investments in your health!`
            ];
            
            return loveResponses[Math.floor(Math.random() * loveResponses.length)];
        }
        
        if (msgLower.includes('life') || msgLower.includes('meaning') || msgLower.includes('purpose')) {
            return `🌟 **Life Purpose and Health**

Finding meaning in life is essential for overall wellbeing:

**Health Benefits of Purpose:**
- Reduced risk of chronic disease
- Better stress management
- Improved mental health
- Increased longevity
- Better sleep quality

**Ways to Find Purpose:**
- Help others through volunteering
- Pursue meaningful work
- Build strong relationships
- Engage in creative activities
- Practice mindfulness and gratitude

Remember: Purpose doesn't have to be grand - it can be found in everyday moments of connection and contribution.

Your health journey itself can be a source of meaning and purpose!`;
        }
        
        if (msgLower.includes('happiness')) {
            return `😊 **The Science of Happiness**

Happiness isn't just a feeling - it's a state of wellbeing that affects your health:

**Health Benefits of Happiness:**
- Stronger immune system
- Lower stress levels
- Better cardiovascular health
- Longer lifespan
- Faster recovery from illness

**Building Happiness:**
- Practice gratitude daily
- Build meaningful connections
- Engage in physical activity
- Get adequate sleep
- Help others
- Pursue hobbies and interests

**Remember:** Happiness is a skill that can be cultivated. Small, consistent practices lead to lasting wellbeing!

What brings you joy in your daily life?`;
        }
        
        return `🤔 **Deep Questions**

That's a profound question! While I'm focused on health and wellness, these deeper aspects of life are definitely connected to our overall wellbeing.

**Health and Life Philosophy:**
- Physical health supports mental clarity
- Mental wellbeing affects physical health
- Purpose and meaning boost resilience
- Connection and love are healing forces

Sometimes exploring these bigger questions can actually improve our health by reducing stress and increasing life satisfaction.

Is there a specific aspect of this topic you'd like to explore from a health perspective?`;
    }
    
    // Helper functions for formatting responses
    formatBMIResponse(bmi) {
        const bmiNum = parseFloat(bmi);
        let category = "Normal ✅";
        let advice = "";
        
        if (bmiNum < 18.5) {
            category = "Underweight ⚠️";
            advice = "\n\n**Recommendation:** Consider consulting a nutritionist for healthy weight gain strategies.";
        } else if (bmiNum >= 25 && bmiNum < 30) {
            category = "Overweight ⚠️";
            advice = "\n\n**Recommendation:** Focus on balanced diet and regular exercise. Consider consulting a healthcare provider.";
        } else if (bmiNum >= 30) {
            category = "Obesity ⚠️";
            advice = "\n\n**Recommendation:** Please consult a healthcare provider for a comprehensive weight management plan.";
        }
        
        return `📏 **Your BMI**: ${bmi}
**Category**: ${category}

BMI Categories:
- Below 18.5: Underweight
- 18.5-24.9: Normal weight ✅
- 25.0-29.9: Overweight
- 30.0+: Obesity${advice}

*Note: Consult your doctor for personalized advice.*`;
    }
    
    formatBPResponse(bp) {
        const systolic = parseInt(bp.split('/')[0]);
        let status = "Normal ✅";
        let advice = "";
        
        if (systolic >= 140) {
            status = "High ⚠️";
            advice = "\n\n**Recommendation:** Please consult your healthcare provider soon.";
        } else if (systolic >= 130) {
            status = "Elevated ⚠️";
            advice = "\n\n**Recommendation:** Monitor closely and consider lifestyle changes.";
        }
        
        return `❤️ **Blood Pressure**: ${bp} mmHg
**Status**: ${status}

Normal range: Less than 120/80 mmHg${advice}

*If concerned, consult your healthcare provider.*`;
    }
    
    formatHeartRateResponse(hr) {
        const hrNum = parseInt(hr);
        let status = "Normal ✅";
        let advice = "";
        
        if (hrNum > 100) {
            status = "High ⚠️";
            advice = "\n\n**Note:** Resting heart rate above 100 may indicate stress, illness, or fitness needs.";
        } else if (hrNum < 60) {
            status = "Low ⚠️";
            advice = "\n\n**Note:** Low resting heart rate is common in athletes but may need medical evaluation otherwise.";
        }
        
        return `💓 **Heart Rate**: ${hr} BPM
**Status**: ${status}

Normal range: 60-100 BPM for adults${advice}

*Athletes may have lower resting heart rates.*`;
    }
    
    // Get greeting based on time
    getGreeting() {
        const hour = new Date().getHours();
        let greeting = "Hello";
        
        if (hour < 12) greeting = "☀️ Good morning";
        else if (hour < 18) greeting = "🌤️ Good afternoon";
        else greeting = "🌙 Good evening";
        
        return `${greeting}! I'm VANIE, your health assistant. How can I help you today?

💡 **Tip:** Type "help" to see all available commands`;
    }
    
    // Fallback response
    getFallbackResponse() {
        return `🤔 **I didn't understand that**

I'm here to help with health-related questions. Try:

• "What is my BMI?"
• "How to improve sleep?"
• "Headache remedies"
• "Open dashboard"
• Type "help" for more options

What health topic would you like to know about?`;
    }
    
    // Additional methods for testing and compatibility
    detectCategory(userMessage) {
        const msg = userMessage.toLowerCase();
        
        for (const [categoryName, category] of Object.entries(this.responseEngine)) {
            if (this.matchesKeywords(msg, category.keywords)) {
                return categoryName;
            }
        }
        
        return 'unknown';
    }
    
    calculateConfidence(userMessage) {
        const msg = userMessage.toLowerCase();
        let matches = 0;
        let totalKeywords = 0;
        
        for (const category of Object.values(this.responseEngine)) {
            totalKeywords += category.keywords.length;
            for (const keyword of category.keywords) {
                if (msg.includes(keyword.toLowerCase())) {
                    matches++;
                }
            }
        }
        
        return totalKeywords > 0 ? matches / totalKeywords : 0;
    }
}

// Initialize the VANIE Algorithm
window.VANIEAlgorithm = new VANIEAlgorithm();

// Legacy compatibility - create global functions
window.getAIResponse = function(userMessage = '') {
    try {
        if (window.VANIEAlgorithm && typeof window.VANIEAlgorithm.processMessage === 'function') {
            return window.VANIEAlgorithm.processMessage(userMessage);
        }
    } catch (error) {
        console.error('VANIE Algorithm error:', error);
    }
    
    // Fallback response
    return "Hello! I'm VANIE, your health assistant. How can I help you today? Type 'help' to see what I can do.";
};

// Backend compatibility
window.chatBackend = {
    processMessage: function(userMessage) {
        return window.getAIResponse(userMessage);
    },
    detectCategory: function(userMessage) {
        return window.VANIEAlgorithm.detectCategory(userMessage);
    },
    calculateConfidence: function(userMessage) {
        return window.VANIEAlgorithm.calculateConfidence(userMessage);
    }
};

// Test functions
function testChatBackend() {
    console.log('Testing VANIE AI Chat System...');
    
    // Test messages
    const testMessages = [
        'hello',
        'help',
        'what is my bmi',
        'headache',
        'dark mode',
        'thank you',
        'emergency chest pain',
        'how to improve sleep',
        'open dashboard',
        'love',
        'random message that should trigger fallback'
    ];
    
    // Check if VANIE is loaded
    if (!window.VANIEAlgorithm) {
        console.error('VANIE Algorithm not loaded!');
        return false;
    }
    
    console.log('VANIE Algorithm loaded successfully!');
    console.log(`Name: ${window.VANIEAlgorithm.name}`);
    console.log(`Version: ${window.VANIEAlgorithm.version}`);
    
    // Test each message
    testMessages.forEach((message, index) => {
        console.log(`\n--- Test ${index + 1}: "${message}" ---`);
        
        try {
            const response = window.VANIEAlgorithm.processMessage(message);
            const category = window.VANIEAlgorithm.detectCategory(message);
            const confidence = window.VANIEAlgorithm.calculateConfidence(message);
            
            console.log(`Category: ${category}`);
            console.log(`Confidence: ${confidence.toFixed(2)}`);
            console.log(`Response: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);
            
        } catch (error) {
            console.error(`Error testing message "${message}":`, error);
        }
    });
    
    console.log('\nTest completed!');
    return true;
}

function testVanieIntegration() {
    console.log('\nTesting VANIE.js integration...');
    
    if (typeof getAIResponse !== 'function') {
        console.error('getAIResponse function not found!');
        return false;
    }
    
    const testMessage = 'hello';
    const response = getAIResponse(testMessage);
    
    console.log(`VANIE response for "${testMessage}": ${response}`);
    console.log('VANIE integration test completed!');
    
    return true;
}

// Run tests when page loads (if in development mode)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            testChatBackend();
            testVanieIntegration();
        }, 2000);
    });
}

// Make test functions available globally
window.testChatBackend = testChatBackend;
window.testVanieIntegration = testVanieIntegration;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VANIEAlgorithm;
}

console.log('VANIE AI System loaded successfully!');
