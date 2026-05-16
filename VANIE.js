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
                keywords: [
                    'dashboard', 'profile', 'dark mode', 'light mode', 'theme', 'settings',
                    'open', 'show', 'go to', 'navigate', 'switch', 'change', 'scroll',
                    'appointment', 'doctor', 'medicine', 'report', 'history', 'records',
                    'metrics', 'stats', 'analytics', 'overview', 'summary', 'health data',
                    'medications', 'prescriptions', 'tests', 'lab results', 'vitals',
                    'appointments', 'booking', 'schedule', 'calendar', 'reminder',
                    'emergency', 'urgent', 'help', 'support', 'contact', 'feedback',
                    'logout', 'exit', 'quit', 'close', 'home', 'main', 'back'
                ],
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
                    'body ache', 'chills', 'cramp', 'feeling sick', 'unwell', 'illness',
                    'cold', 'flu', 'allergy', 'asthma', 'diabetes', 'cancer', 'arthritis',
                    'back pain', 'joint pain', 'muscle pain', 'chest pain', 'breathing',
                    'indigestion', 'constipation', 'weakness', 'numbness', 'tingling',
                    'swelling', 'rash', 'itching', 'burning', 'infection', 'wound'
                ],
                handler: this.handleSymptoms.bind(this)
            },
            
            // Level 5: Lifestyle & Prevention
            lifestyle: {
                priority: 5,
                keywords: [
                    'diet', 'exercise', 'sleep', 'stress', 'weight', 'nutrition',
                    'workout', 'healthy food', 'prevent', 'lifestyle', 'fitness',
                    'yoga', 'meditation', 'running', 'walking', 'swimming', 'cycling',
                    'gym', 'protein', 'vitamins', 'supplements', 'water', 'hydration',
                    'calories', 'metabolism', 'cholesterol', 'sugar', 'diabetes prevention',
                    'heart health', 'immunity', 'detox', 'organic', 'vegetarian', 'vegan',
                    'weight loss', 'weight gain', 'muscle building', 'flexibility', 'endurance'
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
                    'your name', 'who are you', 'joke', 'weather', 'namaste', 'sat sri akal',
                    'assalam o alaikum', 'what\'s up', 'howdy', 'greetings', 'welcome',
                    'awesome', 'great', 'fantastic', 'amazing', 'wonderful', 'excellent',
                    'bored', 'tired', 'sleepy', 'hungry', 'thirsty', 'happy', 'sad',
                    'angry', 'excited', 'nervous', 'scared', 'worried', 'confused',
                    'movie', 'music', 'song', 'game', 'book', 'story', 'news', 'time',
                    'family', 'friends', 'work', 'school', 'college', 'office', 'home',
                    'weekend', 'holiday', 'vacation', 'travel', 'food', 'cooking', 'recipe',
                    'morning', 'night', 'day', 'today', 'tomorrow', 'yesterday', 'routine',
                    'stress', 'anxiety', 'depression', 'lonely', 'relationship', 'love',
                    'money', 'job', 'career', 'study', 'exam', 'test', 'project', 'deadline',
                    'birthday', 'festival', 'celebration', 'party', 'gift', 'surprise',
                    'pet', 'dog', 'cat', 'animal', 'garden', 'plant', 'nature', 'environment',
                    // Navigation keywords for natural conversation
                    'take me to', 'show me', 'i want to see', 'navigate to', 'go to', 'open',
                    'switch to', 'change to', 'scroll to', 'find', 'search', 'look for',
                    'where is', 'can you find', 'i need', 'get me to', 'move to', 'jump to'
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
                medical: `MEDICAL EMERGENCY

If this is a real emergency, call your local emergency number immediately:
- 112 (General Emergency)
- 102 (Ambulance)

Please seek immediate medical help. Don't wait.

If you're having thoughts of self-harm, please call:
- KIRAN Mental Health Helpline: 1800-599-0019
- Aasra: 9820466726

You're not alone - help is available 24/7.`,
                
                mental: `MENTAL HEALTH SUPPORT

If you're in crisis, please reach out for help:

24/7 Helplines:
- KIRAN Mental Health Helpline: 1800-599-0019
- Aasra: 9820466726

Remember:
- You're not alone in this
- Help is available and effective
- Taking that first step shows incredible strength

For immediate support:
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
        
        // Dashboard Navigation
        if (msgLower.includes('dashboard') || msgLower.includes('metrics') || msgLower.includes('stats') || 
            msgLower.includes('overview') || msgLower.includes('summary') || msgLower.includes('health data')) {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Dashboard... Your health metrics and overview are now visible!`;
        }
        
        // Profile Navigation
        if (msgLower.includes('profile')) {
            const name = document.querySelector('[data-key="profileName"]')?.textContent?.trim() || 'your profile';
            closeModal?.('aiChatModal');
            return `Opening Profile... Welcome to ${name}! Here you can update your personal information.`;
        }
        
        // Theme Controls
        if (msgLower.includes('dark mode') || (msgLower.includes('dark') && msgLower.includes('mode'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('dark');
                return `Dark Mode Activated - Easier on the eyes for evening use!`;
            }
            return `Dark Mode - Theme change feature is available in settings.`;
        }
        
        if (msgLower.includes('light mode') || (msgLower.includes('light') && msgLower.includes('mode'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('light');
                return `Light Mode Activated - Bright and clear for daytime use!`;
            }
            return `Light Mode - Theme change feature is available in settings.`;
        }
        
        // Appointment Navigation
        if (msgLower.includes('appointment') || msgLower.includes('appointments') || msgLower.includes('booking') || 
            msgLower.includes('schedule') || msgLower.includes('calendar')) {
            document.getElementById('appointmentSection')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Appointments... Here you can schedule and manage your doctor appointments.`;
        }
        
        // Doctor/Medicine Navigation
        if (msgLower.includes('doctor') || msgLower.includes('medicine') || msgLower.includes('medications') || 
            msgLower.includes('prescriptions')) {
            document.getElementById('doctorSection')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Medical Section... Here you can manage your doctors and medications.`;
        }
        
        // Reports/Records Navigation
        if (msgLower.includes('report') || msgLower.includes('reports') || msgLower.includes('history') || 
            msgLower.includes('records') || msgLower.includes('tests') || msgLower.includes('lab results') || 
            msgLower.includes('vitals')) {
            document.getElementById('reportsSection')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Reports... Here you can view your medical history and test results.`;
        }
        
        // Settings Navigation
        if (msgLower.includes('settings') || msgLower.includes('preferences')) {
            if (typeof toggleSettings === 'function') {
                toggleSettings();
                closeModal?.('aiChatModal');
                return `Opening Settings... Here you can customize your app preferences.`;
            }
            return `Settings - Use the settings button to access app preferences.`;
        }
        
        // Emergency Navigation
        if (msgLower.includes('emergency') || msgLower.includes('urgent') || msgLower.includes('help')) {
            document.getElementById('emergencySection')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Emergency Section... Quick access to emergency contacts and urgent care information.`;
        }
        
        // Support/Contact Navigation
        if (msgLower.includes('support') || msgLower.includes('contact') || msgLower.includes('feedback')) {
            document.getElementById('supportSection')?.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Opening Support... Here you can contact us and send feedback.`;
        }
        
        // Logout/Exit
        if (msgLower.includes('logout') || msgLower.includes('exit') || msgLower.includes('quit') || 
            msgLower.includes('close')) {
            if (typeof logout === 'function') {
                logout();
                return `Logging out... Thank you for using HealthNest!`;
            }
            return `Logout - Use the logout button to sign out safely.`;
        }
        
        // Home/Main Navigation
        if (msgLower.includes('home') || msgLower.includes('main') || msgLower.includes('back')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Going Home... Welcome back to the main page!`;
        }
        
        // Generic Open/Show/Go To Commands
        if (msgLower.includes('open') || msgLower.includes('show') || msgLower.includes('go to') || 
            msgLower.includes('navigate') || msgLower.includes('switch') || msgLower.includes('change') || 
            msgLower.includes('scroll')) {
            
            // Try to find specific sections
            if (msgLower.includes('appointment')) {
                document.getElementById('appointmentSection')?.scrollIntoView({ behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Opening Appointments...`;
            } else if (msgLower.includes('profile')) {
                document.getElementById('profileSection')?.scrollIntoView({ behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Opening Profile...`;
            } else if (msgLower.includes('dashboard')) {
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Opening Dashboard...`;
            } else if (msgLower.includes('report')) {
                document.getElementById('reportsSection')?.scrollIntoView({ behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Opening Reports...`;
            } else if (msgLower.includes('settings')) {
                if (typeof toggleSettings === 'function') {
                    toggleSettings();
                    closeModal?.('aiChatModal');
                    return `Opening Settings...`;
                }
            } else if (msgLower.includes('emergency')) {
                document.getElementById('emergencySection')?.scrollIntoView({ behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Opening Emergency Section...`;
            }
        }
        
        // Advanced Area Navigation - User can specify exact areas
        if (msgLower.includes('area') || msgLower.includes('section') || msgLower.includes('part')) {
            
            // Extract target area from message
            let targetArea = '';
            if (msgLower.includes('top') || msgLower.includes('header')) {
                targetArea = 'top';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Going to top area...`;
            } else if (msgLower.includes('bottom') || msgLower.includes('footer')) {
                targetArea = 'bottom';
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Going to bottom area...`;
            } else if (msgLower.includes('middle') || msgLower.includes('center')) {
                targetArea = 'middle';
                window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
                closeModal?.('aiChatModal');
                return `Going to middle area...`;
            }
        }
        
        // Dynamic Element Search - Find elements by partial matches
        const possibleElements = [
            'dashboard', 'profile', 'appointment', 'reports', 'settings', 'emergency',
            'doctor', 'medicine', 'history', 'records', 'metrics', 'stats', 'calendar',
            'support', 'contact', 'feedback', 'help', 'home', 'main', 'login', 'signup'
        ];
        
        for (const element of possibleElements) {
            if (msgLower.includes(element)) {
                const elementId = element + 'Section';
                const domElement = document.getElementById(elementId) || 
                                  document.getElementById(element) || 
                                  document.querySelector(`[data-section="${element}"]`) ||
                                  document.querySelector(`.${element}`);
                
                if (domElement) {
                    domElement.scrollIntoView({ behavior: 'smooth' });
                    closeModal?.('aiChatModal');
                    return `Navigating to ${element} section...`;
                }
            }
        }
        
        return `Navigation Help - Try these commands:
- "Open dashboard" or "show metrics" - View health metrics
- "Open profile" or "show profile" - Personal information
- "Open appointments" or "schedule appointment" - Book appointments
- "Open reports" or "show history" - Medical records
- "Dark mode" / "Light mode" - Change theme
- "Open settings" - App preferences
- "Emergency" - Urgent help
- "Home" or "Back" - Go to main page
- "Logout" - Sign out

You can also say things like "go to appointments", "show my reports", "change to dark mode", etc.`;
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
        
        return `Health Metrics: I can help you check: BMI (Body Mass Index), Blood Pressure, Heart Rate. Try asking: "What is my BMI?"`;
    }
    
    // Symptoms handler
    handleSymptoms(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('headache')) {
            return `Headache Care: Immediate Relief: Drink a large glass of water (dehydration is common), rest in a quiet, dark room, apply cold compress to forehead. When to See a Doctor: Severe or sudden headache, headache with fever, stiff neck, headache after head injury, worsening pattern. This is general advice. Consult a doctor for persistent symptoms.`;
        }
        
        if (msgLower.includes('fever')) {
            return `Fever Management: Home Care: Rest and stay hydrated, take lukewarm baths, wear lightweight clothing. When to Seek Medical Help: Temperature above 103°F (39.4°C), fever lasting more than 3 days, fever with severe headache, rash, or confusion. For children, consult pediatrician for specific guidance.`;
        }
        
        if (msgLower.includes('cough') || msgLower.includes('sore throat')) {
            return `Cough & Sore Throat: Relief Measures: Stay hydrated with warm fluids, use honey (1+ year old only), gargle with warm salt water, use a humidifier. See Doctor If: Cough lasts more than 2 weeks, difficulty breathing, high fever with cough, coughing up blood. Persistent symptoms need medical evaluation.`;
        }
        
        if (msgLower.includes('cold') || msgLower.includes('flu')) {
            return `Cold & Flu Care: Home Remedies: Rest and stay hydrated, use saline nasal spray, take steam inhalation, eat chicken soup (it really helps!). Cold vs Flu: Cold: Gradual onset, mild fever, stuffy nose. Flu: Sudden onset, high fever, body aches. When to See Doctor: Difficulty breathing, persistent high fever, symptoms worsen after 5 days, you're in a high-risk group. Prevention is key - wash hands frequently!`;
        }
        
        if (msgLower.includes('back pain') || msgLower.includes('joint pain') || msgLower.includes('muscle pain')) {
            return `Pain Management: Immediate Relief: Apply ice for first 48 hours (15 mins at a time), then switch to heat for muscle relaxation, gentle stretching and movement, over-the-counter pain relievers (if appropriate). Back Pain Specific: Maintain good posture, sleep on your side with pillow between knees, strengthen core muscles gradually, avoid heavy lifting. Joint Pain: Low-impact exercise (swimming, walking), maintain healthy weight, warm up before exercise, consider anti-inflammatory foods. See Doctor If: Pain lasts more than 2 weeks, pain radiates down legs, numbness or weakness, pain after injury. Listen to your body - don't push through severe pain!`;
        }
        
        if (msgLower.includes('allergy') || msgLower.includes('asthma')) {
            return `Allergy & Asthma Management: Allergy Relief: Identify and avoid triggers, use air purifiers, keep windows closed during high pollen, try saline nasal rinses, consider local honey for seasonal allergies. Asthma Care: Always have rescue inhaler available, use controller medications as prescribed, identify and avoid triggers, create an asthma action plan, monitor peak flow readings. Common Triggers: Pollen, dust mites, pet dander, mold, strong fragrances, cold air, exercise, certain foods. Emergency Signs: Difficulty speaking full sentences, blue lips or fingernails, no relief from rescue inhaler. Always follow your doctor's treatment plan!`;
        }
        
        if (msgLower.includes('diabetes')) {
            return `Diabetes Management: Type 2 Diabetes Prevention: Maintain healthy weight, regular physical activity, balanced diet low in refined sugars, regular health check-ups. Blood Sugar Management: Monitor glucose levels as directed, take medications consistently, eat regular, balanced meals, stay hydrated, exercise regularly. Healthy Eating: Choose complex carbohydrates, include lean proteins, eat plenty of vegetables, limit processed sugars, control portion sizes. Warning Signs: Excessive thirst/urination, unexplained weight loss, extreme fatigue, blurred vision, slow-healing sores. Work closely with your healthcare team!`;
        }
        
        if (msgLower.includes('indigestion') || msgLower.includes('constipation')) {
            return `Digestive Health: Indigestion Relief: Eat smaller, more frequent meals, avoid trigger foods (spicy, fatty, acidic), stay upright after eating, try ginger or peppermint tea, manage stress. Constipation Relief: Increase fiber intake gradually, drink plenty of water, regular physical activity, establish routine bathroom habits, consider probiotic foods. Fiber-Rich Foods: Whole grains, beans, lentils, fresh fruits and vegetables, nuts and seeds, popcorn (air-popped). When to See Doctor: Persistent digestive issues, blood in stool, unexplained weight loss, severe abdominal pain. Gut health is crucial for overall wellness!`;
        }
        
        if (msgLower.includes('weakness') || msgLower.includes('numbness') || msgLower.includes('tingling')) {
            return `⚡  Neurological Symptoms 

 Weakness & Fatigue: 
- Ensure adequate iron and B12 intake
- Stay well hydrated
- Get regular, moderate exercise
- Prioritize quality sleep
- Manage stress levels

 Numbness & Tingling: 
- Often caused by pressure on nerves
- Change positions frequently
- Ensure good ergonomics
- Check vitamin B12 levels
- Consider circulation issues

 Common Causes: 
- Pinched nerves
- Vitamin deficiencies
- Poor circulation
- Diabetes complications
- Anxiety/panic attacks

 See Doctor If: 
- Sudden onset
- One-sided symptoms
- Accompanied by confusion
- After head injury
- Persistent or worsening

*These symptoms can indicate serious conditions - get evaluated!*`;
        }
        
        if (msgLower.includes('swelling') || msgLower.includes('rash') || msgLower.includes('itching')) {
            return `🔴  Skin & Swelling Issues 

 Swelling (Edema) Relief: 
- Elevate affected area
- Reduce sodium intake
- Stay hydrated
- Gentle movement/exercise
- Compression stockings if appropriate

 Rash Care: 
- Keep area clean and dry
- Avoid scratching
- Use cool compresses
- Identify potential triggers
- Over-the-counter hydrocortisone cream

 Itching Relief: 
- Cold compresses
- Oatmeal baths
- Moisturize regularly
- Antihistamines (if appropriate)
- Identify and avoid triggers

 When to Seek Immediate Care: 
- Swelling with breathing difficulty
- Rash spreading rapidly
- Signs of infection (fever, pus)
- Allergic reaction symptoms
- Swelling after injury

*Skin changes can indicate internal health issues!*`;
        }
        
        if (msgLower.includes('infection') || msgLower.includes('wound')) {
            return `🦠  Infection & Wound Care 

 Wound Care Steps: 
1. Clean with mild soap and water
2. Apply antibiotic ointment
3. Cover with clean bandage
4. Change dressing daily
5. Monitor for infection signs

 Infection Signs: 
- Redness, warmth, swelling
- Pus or drainage
- Fever
- Increased pain
- Red streaks from wound

 When to Seek Care: 
- Deep or large wounds
- Animal bites
- Wounds not healing
- Signs of infection
- Tetanus-prone injuries

 Prevention: 
- Keep wounds clean and covered
- Wash hands frequently
- Update tetanus shots
- Practice good hygiene
- Don't share personal items

*When in doubt, get it checked out!*`;
        }
        
        return `General Symptom Guidance: I understand you're not feeling well. While I can provide general information, please consult a healthcare professional for: Accurate diagnosis, personalized treatment, proper medication guidance. When to Seek Immediate Care: Severe symptoms, difficulty breathing, high fever with confusion, sudden, severe pain. Your health is important - don't hesitate to see a doctor.`;
    }
    
    // Lifestyle handler
    handleLifestyle(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('diet') || msgLower.includes('nutrition') || msgLower.includes('eat')) {
            return `🥗  Healthy Eating Tips 

 Balanced Plate Formula: 
- ½ plate: Vegetables & fruits
- ¼ plate: Lean proteins (chicken, fish, beans)
- ¼ plate: Whole grains (brown rice, quinoa)

 Daily Goals: 
- 8+ glasses of water
- Limit processed foods
- Choose healthy snacks (nuts, fruits, yogurt)

 Remember:  Small, consistent changes work better than drastic diets!`;
        }
        
        if (msgLower.includes('yoga') || msgLower.includes('meditation')) {
            return `🧘  Yoga & Meditation Benefits 

 Yoga Benefits: 
- Improves flexibility and strength
- Reduces stress and anxiety
- Enhances balance and posture
- Boosts respiratory function
- Promotes mind-body connection

 Beginner Yoga Poses: 
- Mountain Pose (Tadasana)
- Downward Dog (Adho Mukha Svanasana)
- Child's Pose (Balasana)
- Cat-Cow Stretch (Marjaryasana-Bitilasana)

 Meditation Benefits: 
- Lowers blood pressure
- Improves focus and concentration
- Reduces anxiety and depression
- Enhances self-awareness
- Boosts immune system

 Simple Meditation: 
1. Find a quiet, comfortable space
2. Focus on your breath (4 counts in, 4 counts out)
3. When mind wanders, gently return to breath
4. Start with 5 minutes, gradually increase

 Apps & Resources: 
- YouTube: Yoga with Adriene, Boho Beautiful
- Apps: Headspace, Calm, Insight Timer
- Local yoga studios and community centers

 Remember:  Consistency is more important than intensity!`;
        }
        
        if (msgLower.includes('running') || msgLower.includes('walking') || msgLower.includes('swimming') || msgLower.includes('cycling')) {
            return `🏃‍♂️  Cardiovascular Exercise 

 Running Benefits: 
- Improves heart health
- Burns calories effectively
- Strengthens bones and joints
- Boosts mental health
- Enhances endurance

 Beginner Running Tips: 
- Start with walk-run intervals
- Invest in good running shoes
- Warm up before, cool down after
- Stay hydrated
- Listen to your body

 Walking Benefits: 
- Low-impact, accessible to all
- Improves circulation
- Boosts mood and creativity
- Helps maintain healthy weight
- Reduces stress

 Swimming Benefits: 
- Full-body workout
- Easy on joints
- Improves lung capacity
- Builds endurance
- Burns significant calories

 Cycling Benefits: 
- Low-impact cardio
- Strengthens lower body
- Improves balance
- Environmentally friendly transport
- Great for mental health

 Weekly Cardio Goals: 
- 150 minutes moderate intensity
- OR 75 minutes vigorous intensity
- Mix different activities for variety

 Safety Tips: 
- Wear appropriate gear
- Stay visible (reflective clothing)
- Check weather conditions
- Tell someone your route
- Carry identification

What's your favorite cardio activity?`;
        }
        
        if (msgLower.includes('gym') || msgLower.includes('strength training')) {
            return `🏋️  Strength Training Guide 

 Benefits of Strength Training: 
- Builds muscle mass
- Increases metabolism
- Improves bone density
- Enhances functional strength
- Boosts confidence

 Beginner Strength Exercises: 
- Bodyweight squats
- Push-ups (modified if needed)
- Planks
- Lunges
- Dumbbell rows
- Glute bridges

 Gym Etiquette: 
- Wipe down equipment after use
- Re-rack your weights
- Don't hog machines during peak hours
- Ask for help if unsure
- Respect others' space and routine

 Strength Training Principles: 
- Progressive overload
- Proper form over heavy weight
- Rest between sets (30-90 seconds)
- Allow muscle recovery (48 hours)
- Consistency is key

 Weekly Schedule: 
- 2-3 strength sessions per week
- Focus on different muscle groups
- Include cardio on other days
- Rest days are crucial

 Safety Tips: 
- Warm up before lifting
- Use spotters for heavy lifts
- Stay hydrated
- Listen to your body
- Consider hiring a trainer initially

Ready to build some strength?`;
        }
        
        if (msgLower.includes('protein') || msgLower.includes('vitamins') || msgLower.includes('supplements')) {
            return `💊  Nutrition Supplements 

 Protein Needs: 
- Adults: 0.8g per kg body weight
- Athletes: 1.2-2.0g per kg body weight
- Sources: Meat, fish, eggs, dairy, beans, nuts

 Essential Vitamins: 
-  Vitamin D:  Bone health, immune function
-  B Vitamins:  Energy metabolism, nerve function
-  Vitamin C:  Immune system, skin health
-  Vitamin E:  Antioxidant, skin health

 Key Minerals: 
-  Iron:  Oxygen transport, energy
-  Calcium:  Bone health, muscle function
-  Magnesium:  Muscle relaxation, sleep
-  Zinc:  Immune function, wound healing

 Supplement Guidelines: 
- Food first approach
- Get blood work to identify deficiencies
- Choose quality brands
- Follow recommended dosages
- Consider timing with meals

 Popular Supplements: 
- Omega-3 fatty acids
- Probiotics
- Vitamin D (especially in winter)
- Magnesium for sleep
- B-complex for energy

 ⚠️ Important: 
- Consult healthcare provider before starting
- Supplements aren't regulated like medications
- More isn't always better
- Some supplements interact with medications

What specific nutritional questions do you have?`;
        }
        
        if (msgLower.includes('water') || msgLower.includes('hydration')) {
            return `💧  Hydration Excellence 

 Daily Water Goals: 
- Men: 3.7 liters (15.5 cups)
- Women: 2.7 liters (11.5 cups)
- More if exercising or in hot weather
- Individual needs vary

 Signs of Dehydration: 
- Dark yellow urine
- Dry mouth and lips
- Headache
- Fatigue
- Dizziness
- Reduced concentration

 Hydration Tips: 
- Start day with glass of water
- Carry reusable water bottle
- Set reminders throughout day
- Flavor water with lemon/cucumber
- Eat water-rich foods

 Hydrating Foods: 
- Watermelon (92% water)
- Cucumber (96% water)
- Strawberries (91% water)
- Oranges (87% water)
- Yogurt (85% water)

 Exercise Hydration: 
- Drink 17-20 oz 2 hours before
- 7-10 oz every 10-20 minutes during
- 16-24 oz for every pound lost after

 When to Increase Intake: 
- Hot weather
- High altitude
- Illness (fever, vomiting)
- Intense exercise
- Pregnancy/breastfeeding

 Fun Fact:  Proper hydration can boost metabolism by up to 30%!

Stay hydrated, stay healthy!`;
        }
        
        if (msgLower.includes('calories') || msgLower.includes('metabolism')) {
            return `🔥  Metabolism & Calories 

 What is Metabolism? 
- Chemical processes that maintain life
- Converts food to energy
- Basal Metabolic Rate (BMR) = calories at rest
- Varies based on age, gender, muscle mass

 Daily Calorie Needs: 
- Women: 1,600-2,400 calories
- Men: 2,000-3,000 calories
- Depends on age, activity level, goals

 Boost Metabolism Naturally: 
- Build muscle mass
- Eat protein with each meal
- Stay hydrated
- Get adequate sleep
- Eat regular meals
- Include spicy foods
- Drink green tea

 Calorie Quality Matters: 
- 1,000 calories of junk vs. 1,000 calories of nutrients
- Focus on nutrient-dense foods
- Balance macros: protein, carbs, fats
- Fiber increases satiety

 Healthy Weight Loss: 
- 500-750 calorie deficit daily
- 1-2 pounds per week maximum
- Combine diet and exercise
- Preserve muscle mass

 Metabolism Myths: 
- Eating late at night doesn't slow metabolism
- Small meals throughout day don't significantly boost it
- Certain foods have minimal effect on metabolism

 Track Progress: 
- Focus on how clothes fit
- Energy levels and sleep quality
- Strength gains
- Not just the scale!

What's your metabolism question?`;
        }
        
        if (msgLower.includes('cholesterol') || msgLower.includes('sugar') || msgLower.includes('diabetes prevention')) {
            return `❤️  Heart Health & Blood Sugar 

 Cholesterol Management: 
-  LDL (Bad):  Below 100 mg/dL
-  HDL (Good):  Above 60 mg/dL
-  Triglycerides:  Below 150 mg/dL

 Heart-Healthy Foods: 
- Oats, barley, whole grains
- Fatty fish (salmon, mackerel)
- Nuts and seeds
- Olive oil
- Avocados
- Beans and lentils

 Foods to Limit: 
- Saturated fats (red meat, butter)
- Trans fats (processed foods)
- Excessive sugar
- Refined carbohydrates

 Blood Sugar Management: 
- Eat regular, balanced meals
- Choose complex carbohydrates
- Include protein and healthy fats
- Monitor portion sizes
- Exercise regularly

 Diabetes Prevention: 
- Maintain healthy weight
- 150+ minutes weekly exercise
- Balanced diet rich in fiber
- Limit sugary beverages
- Manage stress
- Get adequate sleep

 Warning Signs: 
- Increased thirst/urination
- Fatigue
- Blurred vision
- Slow-healing sores

 Regular Check-ups: 
- Annual physical exams
- Blood pressure monitoring
- Cholesterol screening
- Blood sugar tests

Prevention is always better than treatment!`;
        }
        
        if (msgLower.includes('heart health') || msgLower.includes('immunity') || msgLower.includes('detox')) {
            return `🛡️  Immunity & Heart Health 

 Heart Health Essentials: 
- 150 minutes moderate exercise weekly
- Blood pressure below 120/80
- Healthy cholesterol levels
- Stress management
- Adequate sleep (7-9 hours)

 Heart-Healthy Lifestyle: 
- Mediterranean diet pattern
- Limit sodium (under 2,300mg daily)
- No smoking
- Moderate alcohol (if any)
- Maintain healthy weight

 Immunity Boosters: 
- Vitamin C-rich foods (citrus, berries)
- Zinc (nuts, seeds, legumes)
- Probiotics (yogurt, kefir)
- Garlic and ginger
- Green tea
- Adequate sleep

 Stress Reduction: 
- Deep breathing exercises
- Regular physical activity
- Mindfulness/meditation
- Social connections
- Time in nature
- Hobbies and relaxation

 Natural "Detox": 
- Your body detoxifies naturally
- Support with hydration
- Fiber-rich foods
- Limit processed foods
- Regular exercise
- Adequate sleep

 Warning Signs: 
- Chest pain/pressure
- Shortness of breath
- Persistent fatigue
- Frequent illnesses
- Slow wound healing

 Prevention Tips: 
- Annual health check-ups
- Know your family history
- Maintain healthy lifestyle
- Listen to your body
- Act on warning signs

Your health is your wealth - invest in it daily!`;
        }
        
        if (msgLower.includes('organic') || msgLower.includes('vegetarian') || msgLower.includes('vegan')) {
            return `🌱  Plant-Based & Organic Eating 

 Organic Benefits: 
- Fewer pesticides and chemicals
- Often higher in nutrients
- Better for environment
- No GMOs
- Supports sustainable farming

 When to Choose Organic: 
- Dirty Dozen (strawberries, spinach, etc.)
- Thin-skinned fruits
- Animal products
- Baby foods
- If budget allows

 Vegetarian Diet Benefits: 
- Lower heart disease risk
- Reduced cancer risk
- Better weight management
- Environmental benefits
- Often more affordable

 Vegetarian Protein Sources: 
- Lentils (18g protein per cup)
- Chickpeas (15g per cup)
- Quinoa (8g per cup)
- Tofu (20g per cup)
- Greek yogurt (20g per cup)
- Eggs (6g per large egg)

 Vegan Considerations: 
- B12 supplementation essential
- Iron from plant sources
- Calcium from fortified foods
- Omega-3 from algae sources
- Vitamin D from sunlight/fortified foods

 Balanced Plant-Based Plate: 
- Whole grains (quinoa, brown rice)
- Legumes (beans, lentils)
- Nuts and seeds
- Variety of vegetables
- Healthy fats (avocado, olive oil)

 Transition Tips: 
- Start with Meatless Mondays
- Try plant-based alternatives
- Focus on what you can eat
- Experiment with new recipes
- Ensure nutritional completeness

What aspect interests you most?`;
        }
        
        if (msgLower.includes('weight loss') || msgLower.includes('weight gain') || msgLower.includes('muscle building')) {
            return `⚖️  Body Composition Goals 

 Healthy Weight Loss: 
- 1-2 pounds per week maximum
- 500-750 calorie daily deficit
- Preserve muscle mass
- Focus on sustainable changes
- Include strength training

 Weight Loss Strategy: 
- Balanced, nutrient-dense diet
- Regular cardiovascular exercise
- Strength training 2-3x weekly
- Adequate protein intake
- Proper hydration and sleep
- Stress management

 Healthy Weight Gain: 
- 300-500 calorie surplus daily
- Focus on nutrient-dense foods
- Strength training to build muscle
- Adequate protein (1.6-2.2g per kg)
- Consistent eating schedule
- Progressive resistance training

 Weight Gain Foods: 
- Nuts and nut butters
- Avocados and healthy oils
- Whole grains and legumes
- Lean proteins
- Smoothies with added nutrients

 Muscle Building: 
- Resistance training 3-4x weekly
- Progressive overload
- Adequate protein intake
- Caloric surplus (300-500)
- Sufficient rest and recovery
- Consistency over intensity

 Body Composition Tips: 
- Focus on how clothes fit
- Track measurements
- Progress photos
- Strength gains
- Energy levels

 Common Mistakes: 
- Extreme calorie restriction
- Skipping meals
- Over-exercising
- Ignoring rest days
- Comparing to others

 Remember: 
- Health isn't just weight
- Muscle weighs more than fat
- Consistency beats intensity
- Listen to your body
- Progress takes time

What are your specific goals?`;
        }
        
        if (msgLower.includes('flexibility') || msgLower.includes('endurance')) {
            return `🤸  Flexibility & Endurance Training 

 Flexibility Benefits: 
- Reduced injury risk
- Better range of motion
- Improved posture
- Enhanced athletic performance
- Stress relief

 Stretching Types: 
-  Static:  Hold 15-30 seconds
-  Dynamic:  Movement-based
-  PNF:  Contract-relax technique
-  Ballistic:  Bouncing (advanced)

 Daily Stretches: 
- Neck rolls and shoulder shrugs
- Cat-cow stretch
- Hamstring stretch
- Quad stretch
- Chest opener
- Child's pose

 Endurance Building: 
- Gradual progression
- Consistent training
- Proper fueling
- Adequate recovery
- Cross-training

 Endurance Activities: 
- Running/jogging
- Cycling
- Swimming
- Rowing
- Brisk walking
- Dancing

 Endurance Training Principles: 
- Start slow, build gradually
- Include interval training
- Long slow distance sessions
- Proper breathing techniques
- Mental toughness development

 Flexibility Schedule: 
- Daily light stretching
- Post-workout cool-down
- Dedicated flexibility sessions 2-3x weekly
- Yoga or Pilates classes

 Endurance Schedule: 
- 3-5 cardio sessions weekly
- Mix intensity levels
- Include rest days
- Cross-train for balance
- Track progress

 Safety Tips: 
- Warm up before stretching
- Never bounce cold muscles
- Listen to your body
- Stay hydrated
- Proper form over intensity

Ready to improve your flexibility and endurance?`;
        }
        
        if (msgLower.includes('exercise') || msgLower.includes('workout') || msgLower.includes('physical activity')) {
            return `💪  Exercise Guidelines 

 Weekly Target: 
- 150 minutes moderate activity (brisk walking)
- OR 75 minutes vigorous activity (running)
- PLUS 2+ strength training sessions

 Easy Ways to Start: 
- 10-minute walks after meals
- Take stairs instead of elevator
- Dance to your favorite music
- Stretch during TV commercials

 Key:  Consistency over intensity!`;
        }
        
        if (msgLower.includes('sleep') || msgLower.includes('insomnia') || msgLower.includes('tired')) {
            return `😴  Better Sleep Tips 

 Sleep Hygiene: 
- 7-9 hours nightly for adults
- Consistent sleep/wake times
- Dark, cool, quiet bedroom
- No screens 1 hour before bed

 Bedtime Routine Ideas: 
- Warm bath or shower
- Reading (not screens)
- Light stretching or meditation
- Herbal tea (caffeine-free)

 Trouble Sleeping?  Try the 4-7-8 breathing technique!`;
        }
        
        if (msgLower.includes('stress') || msgLower.includes('anxiety') || msgLower.includes('mental health')) {
            return `🧘  Stress Management 

 Quick Relief Techniques: 
- Deep breathing: 4s in, 6s out
- 5-4-3-2-1 grounding exercise
- Short walk or stretch

 Daily Practices: 
- Regular exercise
- Adequate sleep
- Limit caffeine and alcohol
- Connect with friends/family

 When to Seek Help: 
- Stress affecting daily life
- Persistent anxiety or depression
- Thoughts of self-harm

*Professional help is a sign of strength!*`;
        }
        
        return `🌟  Healthy Lifestyle 

Focus on these pillars:
1.  Nutrition  - Balanced, whole foods
2.  Movement  - Regular physical activity
3.  Sleep  - Quality rest
4.  Stress Management  - Mental wellness
5.  Social Connection  - Relationships matter

What specific area would you like to focus on?`;
    }
    
    // Personal data handler
    handlePersonal(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('age')) {
            const ageElement = document.getElementById('profileAgeValue');
            const age = ageElement ? ageElement.textContent : 'not set';
            return `📅  Your Age : ${age}

Keep your profile updated for accurate health recommendations!`;
        }
        
        if (msgLower.includes('blood group')) {
            const bloodElement = document.getElementById('profileBloodValue');
            const blood = bloodElement ? bloodElement.textContent : 'not set';
            return `🩸  Blood Group : ${blood}

Important information for medical emergencies and donations!`;
        }
        
        return `👤  Profile Information 

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
            return `🤖 VANIE AI Assistant - Help Menu

I can help you with:

Health Information
- Check your BMI, blood pressure, heart rate
- Get general health tips and advice
- Understand symptoms and conditions

App Navigation
- Open dashboard or profile
- Change themes (dark/light mode)
- Set health goals

General Chat
- Answer health-related questions
- Provide wellness tips
- Emergency guidance when needed

Try asking:
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
            return `You're welcome! I'm happy to help with your health questions. Anything else I can assist with?`;
        }
        
        if (msgLower.includes('bye') || msgLower.includes('goodbye')) {
            return `Goodbye! Take care of yourself! Remember: I'm here whenever you need health guidance. Stay healthy and well!`;
        }
        
        if (msgLower.includes('how are you')) {
            return `I'm functioning perfectly! Ready to help with your health questions. My purpose is to provide you with accurate health information and guidance. How can I assist you today?`;
        }
        
        if (msgLower.includes('your name') || msgLower.includes('who are you')) {
            return `I'm VANIE - Virtual Assistant for Nursing & Health Information & Education. Your dedicated health companion here to answer health questions, provide wellness guidance, help navigate the app, and support your health journey. I'm here to help you stay healthy!`;
        }
        
        if (msgLower.includes('joke')) {
            return `Health Humor! Why don't skeletons fight each other? They don't have the guts! Sometimes laughter is the best medicine!`;
        }
        
        if (msgLower.includes('weather')) {
            return `I can't check live weather, but here's how weather affects health: Hot Weather: Stay hydrated, avoid peak sun hours, watch for heat exhaustion. Cold Weather: Keep warm and dry, watch for flu symptoms, maintain indoor exercise. Any weather: Stay active and healthy!`;
        }
        
        // Indian greetings
        if (msgLower.includes('namaste') || msgLower.includes('sat sri akal') || msgLower.includes('assalam o alaikum')) {
            return `Greetings! Thank you for your warm greeting! I'm VANIE, your health assistant. How can I help you with your health today?`;
        }
        
        // Casual greetings
        if (msgLower.includes('what\'s up') || msgLower.includes('howdy') || msgLower.includes('greetings')) {
            return `Hello there! Not much - just here to help you stay healthy! What health questions do you have for me today?`;
        }
        
        // Compliments
        if (msgLower.includes('awesome') || msgLower.includes('great') || msgLower.includes('fantastic') || 
            msgLower.includes('amazing') || msgLower.includes('wonderful') || msgLower.includes('excellent')) {
            return `Thank you so much! Your kind words mean a lot to me! I'm always striving to provide the best health guidance. Is there anything specific I can help you with today?`;
        }
        
        // Emotional states
        if (msgLower.includes('bored')) {
            return `Let's make things interesting! Boredom can actually be good for creativity! How about: Quick Health Challenge: 10 jumping jacks, drink a glass of water, do 5 deep breaths. Learn Something New: Ask me about any health topic, "Tell me about vitamins", "How does the brain work?" Fun Fact: Did you know that laughing 100 times is equivalent to 15 minutes of exercise? What would you like to explore?`;
        }
        
        if (msgLower.includes('tired') || msgLower.includes('sleepy')) {
            return `Feeling tired? That's your body telling you to rest! Here are some quick energy boosters: Immediate Pick-Me-Ups: Splash cold water on your face, do 5 minutes of stretching, eat a handful of nuts or fruit, take 10 deep breaths. Check Your Hydration: Dehydration is a common cause of fatigue, try drinking a full glass of water. Long-Term Energy: Aim for 7-9 hours of sleep, regular exercise boosts energy, balanced meals prevent energy crashes. Need more personalized energy tips?`;
        }
        
        if (msgLower.includes('hungry')) {
            return `Let's talk healthy snacks! Here are some great options to satisfy your hunger: Quick & Easy: Handful of almonds or walnuts, apple with peanut butter, Greek yogurt with berries, carrot sticks with hummus. Light Meals: Mixed green salad with grilled chicken, quinoa bowl with vegetables, whole grain toast with avocado. Tip: Eating protein with carbs helps you feel full longer! What kind of snacks do you usually enjoy?`;
        }
        
        if (msgLower.includes('thirsty')) {
            return `Stay hydrated! Great that you're listening to your body! Here's how to hydrate effectively: Water Goals: 8 glasses (64 oz) daily minimum, more if you exercise or it's hot, your urine should be light yellow. Hydration Boosters: Add lemon to water for flavor, herbal teas count too, water-rich foods: watermelon, cucumber, oranges. Signs of Dehydration: Dark urine, dry mouth, headache, fatigue. Keep sipping throughout the day!`;
        }
        
        if (msgLower.includes('happy') || msgLower.includes('excited')) {
            return `That's wonderful to hear! Happiness is actually great for your health! Here's why: Health Benefits of Happiness: Lowers blood pressure, boosts immune system, reduces stress hormones, increases lifespan. Keep the Good Vibes Going: Share your joy with others, practice gratitude, engage in activities you love, exercise releases endorphins. What's making you so happy today? I'd love to hear!`;
        }
        
        if (msgLower.includes('sad')) {
            return `I'm here for you. It's okay to feel sad sometimes. Here are some gentle ways to care for yourself: Mood Boosters: Listen to uplifting music, take a short walk outside, call or text a friend, watch something funny. Self-Care: Deep breathing: 4 counts in, 6 counts out, write down your feelings, take a warm bath or shower, get some gentle exercise. Remember: It's temporary - this feeling will pass, you're stronger than you think, reaching out for help is brave. Would you like to talk more about what's bothering you?`;
        }
        
        if (msgLower.includes('angry') || msgLower.includes('frustrated')) {
            return `Let's work through that anger. Anger is a normal emotion - let's channel it constructively: Healthy Anger Release: Physical activity: running, punching bag, intense exercise, deep breathing to calm your nervous system, write down what's making you angry, talk to someone you trust. Quick Calming Techniques: Count to 10 slowly, splash cold water on your face, step away from the situation, progressive muscle relaxation. Remember: Anger itself isn't bad - it's how we handle it that matters. What triggered this feeling? Talking about it might help.`;
        }
        
        if (msgLower.includes('scared') || msgLower.includes('nervous') || msgLower.includes('worried')) {
            return `You're safe here. Anxiety and fear are your body's protection system. Let's calm it together: Grounding Exercise - 5-4-3-2-1: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste. Confidence Boosters: Remember past challenges you've overcome, break big problems into small steps, talk to someone supportive, practice deep, slow breathing. You've got this! What specifically is worrying you?`;
        }
        
        if (msgLower.includes('confused')) {
            return `Let's clear things up! Confusion happens when we have too much information. Let's simplify: Step-by-Step Approach: 1. What exactly are you trying to understand? 2. What do you already know? 3. What specific questions do you have? I'm here to help explain: Health topics in simple terms, medical concepts in easy language, step-by-step guidance, answer any follow-up questions. No question is too basic! What would you like me to clarify?`;
        }
        
        // Entertainment topics
        if (msgLower.includes('movie') || msgLower.includes('music') || msgLower.includes('song')) {
            return `Entertainment & Health: Did you know entertainment can be good for your health? Music Benefits: Reduces stress and anxiety, lowers blood pressure, improves mood and motivation, helps with exercise performance. Movies & Mental Health: Comedy releases endorphins, dramas build empathy, action movies can be exciting stress relief, documentaries can be educational. Healthy Entertainment Balance: Take breaks every 30-60 minutes, stand up and stretch, stay hydrated, don't watch screens right before bed. What's your favorite way to unwind?`;
        }
        
        if (msgLower.includes('game')) {
            return `Gaming & Health: Gaming can actually have health benefits when done right. Positive Effects: Improves problem-solving skills, enhances hand-eye coordination, social connection through multiplayer games, stress relief and entertainment. Healthy Gaming Habits: Take breaks every hour (20-20-20 rule for eyes), maintain good posture, stay hydrated and stretch, don't play right before sleep, balance with physical activity. Active Gaming: VR games for exercise, motion-based games, fitness gaming apps. What games do you enjoy?`;
        }
        
        if (msgLower.includes('book') || msgLower.includes('story')) {
            return `Reading & Mental Health: Reading is fantastic for your brain and wellbeing! Health Benefits of Reading: Reduces stress by 68% (research shows!), improves memory and concentration, increases empathy and emotional intelligence, better sleep compared to screen time, expands knowledge and vocabulary. Bedtime Reading: Helps you wind down, reduces blue light exposure, improves sleep quality, creates a relaxing routine. Health-Related Book Recommendations: "How Not to Die" by Michael Greger, "The Body Keeps the Score" by Bessel van der Kolk, "Atomic Habits" by James Clear. What kind of books do you enjoy reading?`;
        }
        
        if (msgLower.includes('news')) {
            return `News & Mental Health: Staying informed is important, but news can affect our health. News-Related Stress: Can increase anxiety and worry, may disrupt sleep, can lead to "doomscrolling", affects mood and outlook. Healthy News Habits: Limit news to specific times, choose reliable sources, take breaks from constant updates, balance with positive content, don't check news before bed. Stay Informed, Stay Calm: Focus on what you can control, practice self-care during stressful times, talk about concerns with others, limit social media news consumption. How are you feeling about current events?`;
        }
        
        if (msgLower.includes('time')) {
            const currentTime = new Date().toLocaleTimeString();
            const currentDate = new Date().toLocaleDateString();
            
            return `Time & Health: Current time: ${currentTime}, Today's date: ${currentDate}. Time Management for Health: Schedule exercise like appointments, meal prep saves time and improves nutrition, sleep schedule regulates your body clock, "me time" reduces stress. Health Timing Tips: Exercise in morning for energy boost, avoid caffeine after 2 PM, screen-free hour before bed, consistent meal times help metabolism. Remember: Your health is worth making time for! What health goals would you like to schedule time for?`;
        }
        
        // Family and relationships
        if (msgLower.includes('family') || msgLower.includes('friends')) {
            return `Family and friends are crucial for your health! Strong social connections can: Boost your immune system, reduce stress levels, increase longevity, improve mental health, provide emotional support. Health tips for relationships: Schedule regular family time, eat meals together, exercise with friends, share health goals, support each other's wellness journeys. Remember: Quality time with loved ones is as important as diet and exercise for overall health!`;
        }
        
        // Work and study
        if (msgLower.includes('work') || msgLower.includes('school') || msgLower.includes('college') || msgLower.includes('office')) {
            return `Balancing work/study with health is essential! Tips for staying healthy: Take regular breaks (5 mins every hour), practice good posture at your desk, stay hydrated throughout the day, pack healthy lunches, use stairs instead of elevator, manage stress with deep breathing, maintain work-life balance, get enough sleep. Remember: Your career success depends on your physical and mental wellbeing!`;
        }
        
        // Home and daily routine
        if (msgLower.includes('home') || msgLower.includes('routine') || msgLower.includes('morning') || msgLower.includes('night')) {
            return `A healthy daily routine makes a big difference! Morning routine: Start with glass of water, 10 minutes stretching, healthy breakfast, plan your day. Evening routine: Light exercise or walk, healthy dinner, screen-free time before bed, prepare for tomorrow. Weekend routine: Meal prep, outdoor activities, relaxation time, social connections. Small consistent habits lead to big health improvements!`;
        }
        
        // Weekend and holidays
        if (msgLower.includes('weekend') || msgLower.includes('holiday') || msgLower.includes('vacation')) {
            return `Weekends and holidays are great for health! Use them to: Catch up on sleep, try new healthy recipes, explore outdoor activities, connect with loved ones, practice stress-reducing hobbies, prepare healthy meals for the week, schedule wellness appointments. Remember: Rest and recovery are just as important as exercise for your health!`;
        }
        
        // Travel
        if (msgLower.includes('travel')) {
            return `Travel can be healthy with planning! Tips: Stay hydrated during flights, pack healthy snacks, maintain sleep schedule, walk around during long trips, research local healthy food options, continue exercise routine, protect yourself from sun, carry basic medications, get travel insurance. Safe travels and healthy adventures!`;
        }
        
        // Food and cooking
        if (msgLower.includes('food') || msgLower.includes('cooking') || msgLower.includes('recipe')) {
            return `Healthy cooking is easier than you think! Start with: Simple recipes with 5 ingredients, meal prep on weekends, batch cooking basics, try one new recipe weekly, involve family in cooking, use fresh herbs for flavor, experiment with spices instead of salt, cook with healthy oils. Cooking at home saves money and improves nutrition!`;
        }
        
        // Money and career
        if (msgLower.includes('money') || msgLower.includes('job') || msgLower.includes('career')) {
            return `Financial health affects physical health! Stress management: Create a budget, build emergency fund, invest in health insurance, prioritize preventive care, negotiate work-life balance, consider career satisfaction, seek professional help when needed. Remember: Financial stress can cause physical symptoms like headaches, poor sleep, and weakened immunity.`;
        }
        
        // Study and exams
        if (msgLower.includes('study') || msgLower.includes('exam') || msgLower.includes('test') || msgLower.includes('project') || msgLower.includes('deadline')) {
            return `Study health is important! Tips: Take 10-minute breaks every hour, stay hydrated and snack healthy, get 7-9 hours sleep before exams, practice deep breathing for anxiety, study in natural light, exercise to boost brain function, avoid all-nighters, use aromatherapy (lavender for calm), stay organized to reduce stress. Your brain works best when your body is healthy!`;
        }
        
        // Celebrations
        if (msgLower.includes('birthday') || msgLower.includes('festival') || msgLower.includes('celebration') || msgLower.includes('party') || msgLower.includes('gift')) {
            return `Celebrations can be healthy! Tips: Choose healthier party foods, stay hydrated with water instead of sugary drinks, dance for exercise, enjoy treats in moderation, focus on social connection, get enough sleep after late nights, practice mindful eating, suggest active celebrations like hiking or sports. Life's celebrations should enhance your health, not harm it!`;
        }
        
        // Pets
        if (msgLower.includes('pet') || msgLower.includes('dog') || msgLower.includes('cat') || msgLower.includes('animal')) {
            return `Pets are wonderful for health! Benefits: Lower blood pressure, reduce stress and anxiety, increase physical activity (dog walking), boost mood and happiness, provide companionship, improve heart health, strengthen immune system. Pet care tips: Regular vet check-ups, proper nutrition, daily exercise, grooming, mental stimulation. Remember: Taking care of pets teaches us to take care of ourselves!`;
        }
        
        // Nature and environment
        if (msgLower.includes('garden') || msgLower.includes('plant') || msgLower.includes('nature') || msgLower.includes('environment')) {
            return `Nature is healing! Benefits: Reduces stress and anxiety, boosts immune system, improves mood, increases energy levels, better sleep quality, enhanced creativity. Ways to connect: Daily walks in parks, gardening at home, indoor plants for air quality, weekend hiking, nature photography, outdoor meditation, bird watching, stargazing. Even 20 minutes in nature daily improves health significantly!`;
        }
        
        // Loneliness and relationships
        if (msgLower.includes('lonely') || msgLower.includes('relationship')) {
            return `Relationships are key to health! Combat loneliness by: Joining clubs or groups, volunteering in community, taking classes or workshops, reaching out to old friends, using technology to connect, practicing active listening, being vulnerable and authentic, scheduling regular social time. Remember: Quality relationships are as important as diet and exercise for longevity!`;
        }
        
        // Natural Navigation Commands in Conversation
        if (msgLower.includes('take me to') || msgLower.includes('show me') || msgLower.includes('i want to see')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        if (msgLower.includes('navigate to') || msgLower.includes('go to') || msgLower.includes('open')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        if (msgLower.includes('switch to') || msgLower.includes('change to') || msgLower.includes('scroll to')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        if (msgLower.includes('find') || msgLower.includes('search') || msgLower.includes('look for')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        if (msgLower.includes('where is') || msgLower.includes('can you find') || msgLower.includes('i need')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        if (msgLower.includes('get me to') || msgLower.includes('move to') || msgLower.includes('jump to')) {
            return this.handleNaturalNavigation(msgLower);
        }
        
        return this.getGreeting();
    }
    
    // Natural Navigation Handler for conversational commands
    handleNaturalNavigation(msgLower) {
        // Extract the target from the message
        const targets = {
            'dashboard': ['dashboard', 'metrics', 'stats', 'overview', 'summary', 'health data'],
            'profile': ['profile', 'personal', 'my info', 'my details', 'account'],
            'appointment': ['appointment', 'appointments', 'booking', 'schedule', 'calendar', 'doctor visit'],
            'reports': ['reports', 'report', 'history', 'records', 'tests', 'lab results', 'vitals', 'medical'],
            'settings': ['settings', 'preferences', 'options', 'config', 'setup'],
            'emergency': ['emergency', 'urgent', 'help', 'crisis', 'urgent care'],
            'support': ['support', 'contact', 'feedback', 'help', 'assist'],
            'home': ['home', 'main', 'start', 'beginning', 'top'],
            'doctor': ['doctor', 'medic', 'physician', 'specialist'],
            'medicine': ['medicine', 'medications', 'drugs', 'prescriptions', 'pharmacy']
        };
        
        for (const [target, keywords] of Object.entries(targets)) {
            for (const keyword of keywords) {
                if (msgLower.includes(keyword)) {
                    return this.navigateToSection(target);
                }
            }
        }
        
        // Handle theme changes
        if (msgLower.includes('dark') && (msgLower.includes('mode') || msgLower.includes('theme'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('dark');
                closeModal?.('aiChatModal');
                return `Switching to dark mode... Easier on the eyes for evening use!`;
            }
        }
        
        if (msgLower.includes('light') && (msgLower.includes('mode') || msgLower.includes('theme'))) {
            if (typeof changeTheme === 'function') {
                changeTheme('light');
                closeModal?.('aiChatModal');
                return `Switching to light mode... Bright and clear for daytime use!`;
            }
        }
        
        return `I can help you navigate! Try saying: "take me to dashboard", "show me my profile", "open appointments", "switch to dark mode", or "go to reports".`;
    }
    
    // Helper method to navigate to specific sections
    navigateToSection(section) {
        const elementMap = {
            'dashboard': 'dashboard',
            'profile': 'profileSection',
            'appointment': 'appointmentSection',
            'reports': 'reportsSection',
            'settings': 'settings',
            'emergency': 'emergencySection',
            'support': 'supportSection',
            'doctor': 'doctorSection',
            'medicine': 'medicineSection',
            'home': 'top'
        };
        
        const elementId = elementMap[section];
        
        if (elementId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Taking you to ${section}...`;
        }
        
        if (elementId === 'settings' && typeof toggleSettings === 'function') {
            toggleSettings();
            closeModal?.('aiChatModal');
            return `Opening ${section}...`;
        }
        
        const element = document.getElementById(elementId) || 
                        document.querySelector(`[data-section="${section}"]`) ||
                        document.querySelector(`.${section}`);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            closeModal?.('aiChatModal');
            return `Taking you to ${section}...`;
        }
        
        return `I couldn't find the ${section} section. It might not be available yet.`;
    }
    
    // Complex topics handler
    handleComplex(msg, originalMsg) {
        const msgLower = msg.toLowerCase();
        
        if (msgLower.includes('love')) {
            const loveResponses = [
                `💖  Love and Health 

Love is more than just an emotion - it's a powerful force for health and wellbeing:

 Health Benefits of Love: 
- Reduces stress and anxiety
- Lowers blood pressure
- Boosts immune system
- Increases longevity
- Improves mental health

 Healthy Relationships: 
- Communication and trust
- Mutual respect and support
- Shared values and goals
- Emotional intimacy

Remember: Self-love is the foundation for loving others. Take care of your own wellbeing first!`,
                
                `🧠  The Science of Love 

Love triggers the release of powerful chemicals in your brain:

 Love Chemistry: 
-  Oxytocin  - The "bonding hormone"
-  Dopamine  - Pleasure and reward
-  Serotonin  - Mood stabilization
-  Endorphins  - Natural pain relief

 Health Impact: 
- Reduced inflammation
- Better stress management
- Improved cardiovascular health
- Enhanced mental wellbeing

Love isn't just good for the heart - it's good for your entire body!`,
                
                `🌟  Love as Wellness 

Love in all its forms contributes to holistic health:

 Types of Healthy Love: 
- Romantic love
- Family bonds
- Friendships
- Self-love
- Community connection

 Wellness Benefits: 
- Stronger immune system
- Faster recovery from illness
- Better mental resilience
- Increased life satisfaction

Cultivating love in your life is one of the best investments in your health!`
            ];
            
            return loveResponses[Math.floor(Math.random() * loveResponses.length)];
        }
        
        if (msgLower.includes('life') || msgLower.includes('meaning') || msgLower.includes('purpose')) {
            return `🌟  Life Purpose and Health 

Finding meaning in life is essential for overall wellbeing:

 Health Benefits of Purpose: 
- Reduced risk of chronic disease
- Better stress management
- Improved mental health
- Increased longevity
- Better sleep quality

 Ways to Find Purpose: 
- Help others through volunteering
- Pursue meaningful work
- Build strong relationships
- Engage in creative activities
- Practice mindfulness and gratitude

Remember: Purpose doesn't have to be grand - it can be found in everyday moments of connection and contribution.

Your health journey itself can be a source of meaning and purpose!`;
        }
        
        if (msgLower.includes('happiness')) {
            return `😊  The Science of Happiness 

Happiness isn't just a feeling - it's a state of wellbeing that affects your health:

 Health Benefits of Happiness: 
- Stronger immune system
- Lower stress levels
- Better cardiovascular health
- Longer lifespan
- Faster recovery from illness

 Building Happiness: 
- Practice gratitude daily
- Build meaningful connections
- Engage in physical activity
- Get adequate sleep
- Help others
- Pursue hobbies and interests

 Remember:  Happiness is a skill that can be cultivated. Small, consistent practices lead to lasting wellbeing!

What brings you joy in your daily life?`;
        }
        
        return `🤔  Deep Questions 

That's a profound question! While I'm focused on health and wellness, these deeper aspects of life are definitely connected to our overall wellbeing.

 Health and Life Philosophy: 
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
            advice = "\n\n Recommendation:  Consider consulting a nutritionist for healthy weight gain strategies.";
        } else if (bmiNum >= 25 && bmiNum < 30) {
            category = "Overweight ⚠️";
            advice = "\n\n Recommendation:  Focus on balanced diet and regular exercise. Consider consulting a healthcare provider.";
        } else if (bmiNum >= 30) {
            category = "Obesity ⚠️";
            advice = "\n\n Recommendation:  Please consult a healthcare provider for a comprehensive weight management plan.";
        }
        
        return `📏  Your BMI : ${bmi}
 Category : ${category}

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
            advice = "\n\n Recommendation:  Please consult your healthcare provider soon.";
        } else if (systolic >= 130) {
            status = "Elevated ⚠️";
            advice = "\n\n Recommendation:  Monitor closely and consider lifestyle changes.";
        }
        
        return `❤️  Blood Pressure : ${bp} mmHg
 Status : ${status}

Normal range: Less than 120/80 mmHg${advice}

*If concerned, consult your healthcare provider.*`;
    }
    
    formatHeartRateResponse(hr) {
        const hrNum = parseInt(hr);
        let status = "Normal ✅";
        let advice = "";
        
        if (hrNum > 100) {
            status = "High ⚠️";
            advice = "\n\n Note:  Resting heart rate above 100 may indicate stress, illness, or fitness needs.";
        } else if (hrNum < 60) {
            status = "Low ⚠️";
            advice = "\n\n Note:  Low resting heart rate is common in athletes but may need medical evaluation otherwise.";
        }
        
        return `💓  Heart Rate : ${hr} BPM
 Status : ${status}

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

💡  Tip:  Type "help" to see all available commands`;
    }
    
    // Fallback response
    getFallbackResponse() {
        return `🤔  I didn't understand that 

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
