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
                    'movie', 'music', 'song', 'game', 'book', 'story', 'news', 'time'
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
        
        if (msgLower.includes('cold') || msgLower.includes('flu')) {
            return `🤧 **Cold & Flu Care**

**Home Remedies:**
- Rest and stay hydrated
- Use saline nasal spray
- Take steam inhalation
- Eat chicken soup (it really helps!)

**Cold vs Flu:**
- **Cold:** Gradual onset, mild fever, stuffy nose
- **Flu:** Sudden onset, high fever, body aches

**When to See Doctor:**
- Difficulty breathing
- Persistent high fever
- Symptoms worsen after 5 days
- You're in a high-risk group

*Prevention is key - wash hands frequently!*`;
        }
        
        if (msgLower.includes('back pain') || msgLower.includes('joint pain') || msgLower.includes('muscle pain')) {
            return `🦴 **Pain Management**

**Immediate Relief:**
- Apply ice for first 48 hours (15 mins at a time)
- Then switch to heat for muscle relaxation
- Gentle stretching and movement
- Over-the-counter pain relievers (if appropriate)

**Back Pain Specific:**
- Maintain good posture
- Sleep on your side with pillow between knees
- Strengthen core muscles gradually
- Avoid heavy lifting

**Joint Pain:**
- Low-impact exercise (swimming, walking)
- Maintain healthy weight
- Warm up before exercise
- Consider anti-inflammatory foods

**See Doctor If:**
- Pain lasts more than 2 weeks
- Pain radiates down legs
- Numbness or weakness
- Pain after injury

*Listen to your body - don't push through severe pain!*`;
        }
        
        if (msgLower.includes('allergy') || msgLower.includes('asthma')) {
            return `🌿 **Allergy & Asthma Management**

**Allergy Relief:**
- Identify and avoid triggers
- Use air purifiers
- Keep windows closed during high pollen
- Try saline nasal rinses
- Consider local honey for seasonal allergies

**Asthma Care:**
- Always have rescue inhaler available
- Use controller medications as prescribed
- Identify and avoid triggers
- Create an asthma action plan
- Monitor peak flow readings

**Common Triggers:**
- Pollen, dust mites, pet dander
- Mold, strong fragrances
- Cold air, exercise
- Certain foods

**Emergency Signs:**
- Difficulty speaking full sentences
- Blue lips or fingernails
- No relief from rescue inhaler

*Always follow your doctor's treatment plan!*`;
        }
        
        if (msgLower.includes('diabetes')) {
            return `🩸 **Diabetes Management**

**Type 2 Diabetes Prevention:**
- Maintain healthy weight
- Regular physical activity
- Balanced diet low in refined sugars
- Regular health check-ups

**Blood Sugar Management:**
- Monitor glucose levels as directed
- Take medications consistently
- Eat regular, balanced meals
- Stay hydrated
- Exercise regularly

**Healthy Eating:**
- Choose complex carbohydrates
- Include lean proteins
- Eat plenty of vegetables
- Limit processed sugars
- Control portion sizes

**Warning Signs:**
- Excessive thirst/urination
- Unexplained weight loss
- Extreme fatigue
- Blurred vision
- Slow-healing sores

*Work closely with your healthcare team!*`;
        }
        
        if (msgLower.includes('indigestion') || msgLower.includes('constipation')) {
            return `🍽️ **Digestive Health**

**Indigestion Relief:**
- Eat smaller, more frequent meals
- Avoid trigger foods (spicy, fatty, acidic)
- Stay upright after eating
- Try ginger or peppermint tea
- Manage stress

**Constipation Relief:**
- Increase fiber intake gradually
- Drink plenty of water
- Regular physical activity
- Establish routine bathroom habits
- Consider probiotic foods

**Fiber-Rich Foods:**
- Whole grains, beans, lentils
- Fresh fruits and vegetables
- Nuts and seeds
- Popcorn (air-popped)

**When to See Doctor:**
- Persistent digestive issues
- Blood in stool
- Unexplained weight loss
- Severe abdominal pain

*Gut health is crucial for overall wellness!*`;
        }
        
        if (msgLower.includes('weakness') || msgLower.includes('numbness') || msgLower.includes('tingling')) {
            return `⚡ **Neurological Symptoms**

**Weakness & Fatigue:**
- Ensure adequate iron and B12 intake
- Stay well hydrated
- Get regular, moderate exercise
- Prioritize quality sleep
- Manage stress levels

**Numbness & Tingling:**
- Often caused by pressure on nerves
- Change positions frequently
- Ensure good ergonomics
- Check vitamin B12 levels
- Consider circulation issues

**Common Causes:**
- Pinched nerves
- Vitamin deficiencies
- Poor circulation
- Diabetes complications
- Anxiety/panic attacks

**See Doctor If:**
- Sudden onset
- One-sided symptoms
- Accompanied by confusion
- After head injury
- Persistent or worsening

*These symptoms can indicate serious conditions - get evaluated!*`;
        }
        
        if (msgLower.includes('swelling') || msgLower.includes('rash') || msgLower.includes('itching')) {
            return `🔴 **Skin & Swelling Issues**

**Swelling (Edema) Relief:**
- Elevate affected area
- Reduce sodium intake
- Stay hydrated
- Gentle movement/exercise
- Compression stockings if appropriate

**Rash Care:**
- Keep area clean and dry
- Avoid scratching
- Use cool compresses
- Identify potential triggers
- Over-the-counter hydrocortisone cream

**Itching Relief:**
- Cold compresses
- Oatmeal baths
- Moisturize regularly
- Antihistamines (if appropriate)
- Identify and avoid triggers

**When to Seek Immediate Care:**
- Swelling with breathing difficulty
- Rash spreading rapidly
- Signs of infection (fever, pus)
- Allergic reaction symptoms
- Swelling after injury

*Skin changes can indicate internal health issues!*`;
        }
        
        if (msgLower.includes('infection') || msgLower.includes('wound')) {
            return `🦠 **Infection & Wound Care**

**Wound Care Steps:**
1. Clean with mild soap and water
2. Apply antibiotic ointment
3. Cover with clean bandage
4. Change dressing daily
5. Monitor for infection signs

**Infection Signs:**
- Redness, warmth, swelling
- Pus or drainage
- Fever
- Increased pain
- Red streaks from wound

**When to Seek Care:**
- Deep or large wounds
- Animal bites
- Wounds not healing
- Signs of infection
- Tetanus-prone injuries

**Prevention:**
- Keep wounds clean and covered
- Wash hands frequently
- Update tetanus shots
- Practice good hygiene
- Don't share personal items

*When in doubt, get it checked out!*`;
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
        
        if (msgLower.includes('yoga') || msgLower.includes('meditation')) {
            return `🧘 **Yoga & Meditation Benefits**

**Yoga Benefits:**
- Improves flexibility and strength
- Reduces stress and anxiety
- Enhances balance and posture
- Boosts respiratory function
- Promotes mind-body connection

**Beginner Yoga Poses:**
- Mountain Pose (Tadasana)
- Downward Dog (Adho Mukha Svanasana)
- Child's Pose (Balasana)
- Cat-Cow Stretch (Marjaryasana-Bitilasana)

**Meditation Benefits:**
- Lowers blood pressure
- Improves focus and concentration
- Reduces anxiety and depression
- Enhances self-awareness
- Boosts immune system

**Simple Meditation:**
1. Find a quiet, comfortable space
2. Focus on your breath (4 counts in, 4 counts out)
3. When mind wanders, gently return to breath
4. Start with 5 minutes, gradually increase

**Apps & Resources:**
- YouTube: Yoga with Adriene, Boho Beautiful
- Apps: Headspace, Calm, Insight Timer
- Local yoga studios and community centers

**Remember:** Consistency is more important than intensity!`;
        }
        
        if (msgLower.includes('running') || msgLower.includes('walking') || msgLower.includes('swimming') || msgLower.includes('cycling')) {
            return `🏃‍♂️ **Cardiovascular Exercise**

**Running Benefits:**
- Improves heart health
- Burns calories effectively
- Strengthens bones and joints
- Boosts mental health
- Enhances endurance

**Beginner Running Tips:**
- Start with walk-run intervals
- Invest in good running shoes
- Warm up before, cool down after
- Stay hydrated
- Listen to your body

**Walking Benefits:**
- Low-impact, accessible to all
- Improves circulation
- Boosts mood and creativity
- Helps maintain healthy weight
- Reduces stress

**Swimming Benefits:**
- Full-body workout
- Easy on joints
- Improves lung capacity
- Builds endurance
- Burns significant calories

**Cycling Benefits:**
- Low-impact cardio
- Strengthens lower body
- Improves balance
- Environmentally friendly transport
- Great for mental health

**Weekly Cardio Goals:**
- 150 minutes moderate intensity
- OR 75 minutes vigorous intensity
- Mix different activities for variety

**Safety Tips:**
- Wear appropriate gear
- Stay visible (reflective clothing)
- Check weather conditions
- Tell someone your route
- Carry identification

What's your favorite cardio activity?`;
        }
        
        if (msgLower.includes('gym') || msgLower.includes('strength training')) {
            return `🏋️ **Strength Training Guide**

**Benefits of Strength Training:**
- Builds muscle mass
- Increases metabolism
- Improves bone density
- Enhances functional strength
- Boosts confidence

**Beginner Strength Exercises:**
- Bodyweight squats
- Push-ups (modified if needed)
- Planks
- Lunges
- Dumbbell rows
- Glute bridges

**Gym Etiquette:**
- Wipe down equipment after use
- Re-rack your weights
- Don't hog machines during peak hours
- Ask for help if unsure
- Respect others' space and routine

**Strength Training Principles:**
- Progressive overload
- Proper form over heavy weight
- Rest between sets (30-90 seconds)
- Allow muscle recovery (48 hours)
- Consistency is key

**Weekly Schedule:**
- 2-3 strength sessions per week
- Focus on different muscle groups
- Include cardio on other days
- Rest days are crucial

**Safety Tips:**
- Warm up before lifting
- Use spotters for heavy lifts
- Stay hydrated
- Listen to your body
- Consider hiring a trainer initially

Ready to build some strength?`;
        }
        
        if (msgLower.includes('protein') || msgLower.includes('vitamins') || msgLower.includes('supplements')) {
            return `💊 **Nutrition Supplements**

**Protein Needs:**
- Adults: 0.8g per kg body weight
- Athletes: 1.2-2.0g per kg body weight
- Sources: Meat, fish, eggs, dairy, beans, nuts

**Essential Vitamins:**
- **Vitamin D:** Bone health, immune function
- **B Vitamins:** Energy metabolism, nerve function
- **Vitamin C:** Immune system, skin health
- **Vitamin E:** Antioxidant, skin health

**Key Minerals:**
- **Iron:** Oxygen transport, energy
- **Calcium:** Bone health, muscle function
- **Magnesium:** Muscle relaxation, sleep
- **Zinc:** Immune function, wound healing

**Supplement Guidelines:**
- Food first approach
- Get blood work to identify deficiencies
- Choose quality brands
- Follow recommended dosages
- Consider timing with meals

**Popular Supplements:**
- Omega-3 fatty acids
- Probiotics
- Vitamin D (especially in winter)
- Magnesium for sleep
- B-complex for energy

**⚠️ Important:**
- Consult healthcare provider before starting
- Supplements aren't regulated like medications
- More isn't always better
- Some supplements interact with medications

What specific nutritional questions do you have?`;
        }
        
        if (msgLower.includes('water') || msgLower.includes('hydration')) {
            return `💧 **Hydration Excellence**

**Daily Water Goals:**
- Men: 3.7 liters (15.5 cups)
- Women: 2.7 liters (11.5 cups)
- More if exercising or in hot weather
- Individual needs vary

**Signs of Dehydration:**
- Dark yellow urine
- Dry mouth and lips
- Headache
- Fatigue
- Dizziness
- Reduced concentration

**Hydration Tips:**
- Start day with glass of water
- Carry reusable water bottle
- Set reminders throughout day
- Flavor water with lemon/cucumber
- Eat water-rich foods

**Hydrating Foods:**
- Watermelon (92% water)
- Cucumber (96% water)
- Strawberries (91% water)
- Oranges (87% water)
- Yogurt (85% water)

**Exercise Hydration:**
- Drink 17-20 oz 2 hours before
- 7-10 oz every 10-20 minutes during
- 16-24 oz for every pound lost after

**When to Increase Intake:**
- Hot weather
- High altitude
- Illness (fever, vomiting)
- Intense exercise
- Pregnancy/breastfeeding

**Fun Fact:** Proper hydration can boost metabolism by up to 30%!

Stay hydrated, stay healthy!`;
        }
        
        if (msgLower.includes('calories') || msgLower.includes('metabolism')) {
            return `🔥 **Metabolism & Calories**

**What is Metabolism?**
- Chemical processes that maintain life
- Converts food to energy
- Basal Metabolic Rate (BMR) = calories at rest
- Varies based on age, gender, muscle mass

**Daily Calorie Needs:**
- Women: 1,600-2,400 calories
- Men: 2,000-3,000 calories
- Depends on age, activity level, goals

**Boost Metabolism Naturally:**
- Build muscle mass
- Eat protein with each meal
- Stay hydrated
- Get adequate sleep
- Eat regular meals
- Include spicy foods
- Drink green tea

**Calorie Quality Matters:**
- 1,000 calories of junk vs. 1,000 calories of nutrients
- Focus on nutrient-dense foods
- Balance macros: protein, carbs, fats
- Fiber increases satiety

**Healthy Weight Loss:**
- 500-750 calorie deficit daily
- 1-2 pounds per week maximum
- Combine diet and exercise
- Preserve muscle mass

**Metabolism Myths:**
- Eating late at night doesn't slow metabolism
- Small meals throughout day don't significantly boost it
- Certain foods have minimal effect on metabolism

**Track Progress:**
- Focus on how clothes fit
- Energy levels and sleep quality
- Strength gains
- Not just the scale!

What's your metabolism question?`;
        }
        
        if (msgLower.includes('cholesterol') || msgLower.includes('sugar') || msgLower.includes('diabetes prevention')) {
            return `❤️ **Heart Health & Blood Sugar**

**Cholesterol Management:**
- **LDL (Bad):** Below 100 mg/dL
- **HDL (Good):** Above 60 mg/dL
- **Triglycerides:** Below 150 mg/dL

**Heart-Healthy Foods:**
- Oats, barley, whole grains
- Fatty fish (salmon, mackerel)
- Nuts and seeds
- Olive oil
- Avocados
- Beans and lentils

**Foods to Limit:**
- Saturated fats (red meat, butter)
- Trans fats (processed foods)
- Excessive sugar
- Refined carbohydrates

**Blood Sugar Management:**
- Eat regular, balanced meals
- Choose complex carbohydrates
- Include protein and healthy fats
- Monitor portion sizes
- Exercise regularly

**Diabetes Prevention:**
- Maintain healthy weight
- 150+ minutes weekly exercise
- Balanced diet rich in fiber
- Limit sugary beverages
- Manage stress
- Get adequate sleep

**Warning Signs:**
- Increased thirst/urination
- Fatigue
- Blurred vision
- Slow-healing sores

**Regular Check-ups:**
- Annual physical exams
- Blood pressure monitoring
- Cholesterol screening
- Blood sugar tests

Prevention is always better than treatment!`;
        }
        
        if (msgLower.includes('heart health') || msgLower.includes('immunity') || msgLower.includes('detox')) {
            return `🛡️ **Immunity & Heart Health**

**Heart Health Essentials:**
- 150 minutes moderate exercise weekly
- Blood pressure below 120/80
- Healthy cholesterol levels
- Stress management
- Adequate sleep (7-9 hours)

**Heart-Healthy Lifestyle:**
- Mediterranean diet pattern
- Limit sodium (under 2,300mg daily)
- No smoking
- Moderate alcohol (if any)
- Maintain healthy weight

**Immunity Boosters:**
- Vitamin C-rich foods (citrus, berries)
- Zinc (nuts, seeds, legumes)
- Probiotics (yogurt, kefir)
- Garlic and ginger
- Green tea
- Adequate sleep

**Stress Reduction:**
- Deep breathing exercises
- Regular physical activity
- Mindfulness/meditation
- Social connections
- Time in nature
- Hobbies and relaxation

**Natural "Detox":**
- Your body detoxifies naturally
- Support with hydration
- Fiber-rich foods
- Limit processed foods
- Regular exercise
- Adequate sleep

**Warning Signs:**
- Chest pain/pressure
- Shortness of breath
- Persistent fatigue
- Frequent illnesses
- Slow wound healing

**Prevention Tips:**
- Annual health check-ups
- Know your family history
- Maintain healthy lifestyle
- Listen to your body
- Act on warning signs

Your health is your wealth - invest in it daily!`;
        }
        
        if (msgLower.includes('organic') || msgLower.includes('vegetarian') || msgLower.includes('vegan')) {
            return `🌱 **Plant-Based & Organic Eating**

**Organic Benefits:**
- Fewer pesticides and chemicals
- Often higher in nutrients
- Better for environment
- No GMOs
- Supports sustainable farming

**When to Choose Organic:**
- Dirty Dozen (strawberries, spinach, etc.)
- Thin-skinned fruits
- Animal products
- Baby foods
- If budget allows

**Vegetarian Diet Benefits:**
- Lower heart disease risk
- Reduced cancer risk
- Better weight management
- Environmental benefits
- Often more affordable

**Vegetarian Protein Sources:**
- Lentils (18g protein per cup)
- Chickpeas (15g per cup)
- Quinoa (8g per cup)
- Tofu (20g per cup)
- Greek yogurt (20g per cup)
- Eggs (6g per large egg)

**Vegan Considerations:**
- B12 supplementation essential
- Iron from plant sources
- Calcium from fortified foods
- Omega-3 from algae sources
- Vitamin D from sunlight/fortified foods

**Balanced Plant-Based Plate:**
- Whole grains (quinoa, brown rice)
- Legumes (beans, lentils)
- Nuts and seeds
- Variety of vegetables
- Healthy fats (avocado, olive oil)

**Transition Tips:**
- Start with Meatless Mondays
- Try plant-based alternatives
- Focus on what you can eat
- Experiment with new recipes
- Ensure nutritional completeness

What aspect interests you most?`;
        }
        
        if (msgLower.includes('weight loss') || msgLower.includes('weight gain') || msgLower.includes('muscle building')) {
            return `⚖️ **Body Composition Goals**

**Healthy Weight Loss:**
- 1-2 pounds per week maximum
- 500-750 calorie daily deficit
- Preserve muscle mass
- Focus on sustainable changes
- Include strength training

**Weight Loss Strategy:**
- Balanced, nutrient-dense diet
- Regular cardiovascular exercise
- Strength training 2-3x weekly
- Adequate protein intake
- Proper hydration and sleep
- Stress management

**Healthy Weight Gain:**
- 300-500 calorie surplus daily
- Focus on nutrient-dense foods
- Strength training to build muscle
- Adequate protein (1.6-2.2g per kg)
- Consistent eating schedule
- Progressive resistance training

**Weight Gain Foods:**
- Nuts and nut butters
- Avocados and healthy oils
- Whole grains and legumes
- Lean proteins
- Smoothies with added nutrients

**Muscle Building:**
- Resistance training 3-4x weekly
- Progressive overload
- Adequate protein intake
- Caloric surplus (300-500)
- Sufficient rest and recovery
- Consistency over intensity

**Body Composition Tips:**
- Focus on how clothes fit
- Track measurements
- Progress photos
- Strength gains
- Energy levels

**Common Mistakes:**
- Extreme calorie restriction
- Skipping meals
- Over-exercising
- Ignoring rest days
- Comparing to others

**Remember:**
- Health isn't just weight
- Muscle weighs more than fat
- Consistency beats intensity
- Listen to your body
- Progress takes time

What are your specific goals?`;
        }
        
        if (msgLower.includes('flexibility') || msgLower.includes('endurance')) {
            return `🤸 **Flexibility & Endurance Training**

**Flexibility Benefits:**
- Reduced injury risk
- Better range of motion
- Improved posture
- Enhanced athletic performance
- Stress relief

**Stretching Types:**
- **Static:** Hold 15-30 seconds
- **Dynamic:** Movement-based
- **PNF:** Contract-relax technique
- **Ballistic:** Bouncing (advanced)

**Daily Stretches:**
- Neck rolls and shoulder shrugs
- Cat-cow stretch
- Hamstring stretch
- Quad stretch
- Chest opener
- Child's pose

**Endurance Building:**
- Gradual progression
- Consistent training
- Proper fueling
- Adequate recovery
- Cross-training

**Endurance Activities:**
- Running/jogging
- Cycling
- Swimming
- Rowing
- Brisk walking
- Dancing

**Endurance Training Principles:**
- Start slow, build gradually
- Include interval training
- Long slow distance sessions
- Proper breathing techniques
- Mental toughness development

**Flexibility Schedule:**
- Daily light stretching
- Post-workout cool-down
- Dedicated flexibility sessions 2-3x weekly
- Yoga or Pilates classes

**Endurance Schedule:**
- 3-5 cardio sessions weekly
- Mix intensity levels
- Include rest days
- Cross-train for balance
- Track progress

**Safety Tips:**
- Warm up before stretching
- Never bounce cold muscles
- Listen to your body
- Stay hydrated
- Proper form over intensity

Ready to improve your flexibility and endurance?`;
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
        
        // Indian greetings
        if (msgLower.includes('namaste') || msgLower.includes('sat sri akal') || msgLower.includes('assalam o alaikum')) {
            return `🙏 **Greetings!**

Thank you for your warm greeting! I'm VANIE, your health assistant.

How can I help you with your health today?`;
        }
        
        // Casual greetings
        if (msgLower.includes('what\'s up') || msgLower.includes('howdy') || msgLower.includes('greetings')) {
            return `👋 **Hello there!**

Not much - just here to help you stay healthy! 

What health questions do you have for me today?`;
        }
        
        // Compliments
        if (msgLower.includes('awesome') || msgLower.includes('great') || msgLower.includes('fantastic') || 
            msgLower.includes('amazing') || msgLower.includes('wonderful') || msgLower.includes('excellent')) {
            return `😊 **Thank you so much!**

Your kind words mean a lot to me! I'm always striving to provide the best health guidance.

Is there anything specific I can help you with today?`;
        }
        
        // Emotional states
        if (msgLower.includes('bored')) {
            return `🎯 **Let's make things interesting!**

Boredom can actually be good for creativity! How about:

🏃‍♂️ **Quick Health Challenge:**
- 10 jumping jacks
- Drink a glass of water
- Do 5 deep breaths

🧠 **Learn Something New:**
- Ask me about any health topic
- "Tell me about vitamins"
- "How does the brain work?"

💡 **Fun Fact:** Did you know that laughing 100 times is equivalent to 15 minutes of exercise?

What would you like to explore?`;
        }
        
        if (msgLower.includes('tired') || msgLower.includes('sleepy')) {
            return `😴 **Feeling tired?**

That's your body telling you to rest! Here are some quick energy boosters:

⚡ **Immediate Pick-Me-Ups:**
- Splash cold water on your face
- Do 5 minutes of stretching
- Eat a handful of nuts or fruit
- Take 10 deep breaths

💧 **Check Your Hydration:**
- Dehydration is a common cause of fatigue
- Try drinking a full glass of water

🌙 **Long-Term Energy:**
- Aim for 7-9 hours of sleep
- Regular exercise boosts energy
- Balanced meals prevent energy crashes

Need more personalized energy tips?`;
        }
        
        if (msgLower.includes('hungry')) {
            return `🍎 **Let's talk healthy snacks!**

Here are some great options to satisfy your hunger:

🥜 **Quick & Easy:**
- Handful of almonds or walnuts
- Apple with peanut butter
- Greek yogurt with berries
- Carrot sticks with hummus

🥗 **Light Meals:**
- Mixed green salad with grilled chicken
- Quinoa bowl with vegetables
- Whole grain toast with avocado

💡 **Tip:** Eating protein with carbs helps you feel full longer!

What kind of snacks do you usually enjoy?`;
        }
        
        if (msgLower.includes('thirsty')) {
            return `💧 **Stay hydrated!**

Great that you're listening to your body! Here's how to hydrate effectively:

🚰 **Water Goals:**
- 8 glasses (64 oz) daily minimum
- More if you exercise or it's hot
- Your urine should be light yellow

🍋 **Hydration Boosters:**
- Add lemon to water for flavor
- Herbal teas count too!
- Water-rich foods: watermelon, cucumber, oranges

⚠️ **Signs of Dehydration:**
- Dark urine
- Dry mouth
- Headache
- Fatigue

Keep sipping throughout the day!`;
        }
        
        if (msgLower.includes('happy') || msgLower.includes('excited')) {
            return `🎉 **That's wonderful to hear!**

Happiness is actually great for your health! Here's why:

❤️ **Health Benefits of Happiness:**
- Lowers blood pressure
- Boosts immune system
- Reduces stress hormones
- Increases lifespan

🌟 **Keep the Good Vibes Going:**
- Share your joy with others
- Practice gratitude
- Engage in activities you love
- Exercise releases endorphins

What's making you so happy today? I'd love to hear!`;
        }
        
        if (msgLower.includes('sad')) {
            return `🤗 **I'm here for you**

It's okay to feel sad sometimes. Here are some gentle ways to care for yourself:

🌈 **Mood Boosters:**
- Listen to uplifting music
- Take a short walk outside
- Call or text a friend
- Watch something funny

🧘 **Self-Care:**
- Deep breathing: 4 counts in, 6 counts out
- Write down your feelings
- Take a warm bath or shower
- Get some gentle exercise

💙 **Remember:**
- It's temporary - this feeling will pass
- You're stronger than you think
- Reaching out for help is brave

Would you like to talk more about what's bothering you?`;
        }
        
        if (msgLower.includes('angry') || msgLower.includes('frustrated')) {
            return `😤 **Let's work through that anger**

Anger is a normal emotion - let's channel it constructively:

🔥 **Healthy Anger Release:**
- Physical activity: running, punching bag, intense exercise
- Deep breathing to calm your nervous system
- Write down what's making you angry
- Talk to someone you trust

🧘 **Quick Calming Techniques:**
- Count to 10 slowly
- Splash cold water on your face
- Step away from the situation
- Progressive muscle relaxation

💡 **Remember:** Anger itself isn't bad - it's how we handle it that matters.

What triggered this feeling? Talking about it might help.`;
        }
        
        if (msgLower.includes('scared') || msgLower.includes('nervous') || msgLower.includes('worried')) {
            return `🛡️ **You're safe here**

Anxiety and fear are your body's protection system. Let's calm it together:

🌬️ **Grounding Exercise - 5-4-3-2-1:**
- **5** things you can see
- **4** things you can touch
- **3** things you can hear
- **2** things you can smell
- **1** thing you can taste

💪 **Confidence Boosters:**
- Remember past challenges you've overcome
- Break big problems into small steps
- Talk to someone supportive
- Practice deep, slow breathing

🌟 **You've got this!** What specifically is worrying you?`;
        }
        
        if (msgLower.includes('confused')) {
            return `🤔 **Let's clear things up!**

Confusion happens when we have too much information. Let's simplify:

🎯 **Step-by-Step Approach:**
1. What exactly are you trying to understand?
2. What do you already know?
3. What specific questions do you have?

📝 **I'm here to help explain:**
- Health topics in simple terms
- Medical concepts in easy language
- Step-by-step guidance
- Answer any follow-up questions

💡 **No question is too basic!** What would you like me to clarify?`;
        }
        
        // Entertainment topics
        if (msgLower.includes('movie') || msgLower.includes('music') || msgLower.includes('song')) {
            return `🎬 **Entertainment & Health**

Did you know entertainment can be good for your health?

🎵 **Music Benefits:**
- Reduces stress and anxiety
- Lowers blood pressure
- Improves mood and motivation
- Helps with exercise performance

🎥 **Movies & Mental Health:**
- Comedy releases endorphins
- Dramas build empathy
- Action movies can be exciting stress relief
- Documentaries can be educational

🎮 **Healthy Entertainment Balance:**
- Take breaks every 30-60 minutes
- Stand up and stretch
- Stay hydrated
- Don't watch screens right before bed

What's your favorite way to unwind?`;
        }
        
        if (msgLower.includes('game')) {
            return `🎮 **Gaming & Health**

Gaming can actually have health benefits when done right:

✅ **Positive Effects:**
- Improves problem-solving skills
- Enhances hand-eye coordination
- Social connection through multiplayer games
- Stress relief and entertainment

⚠️ **Healthy Gaming Habits:**
- Take breaks every hour (20-20-20 rule for eyes)
- Maintain good posture
- Stay hydrated and stretch
- Don't play right before sleep
- Balance with physical activity

🏃‍♂️ **Active Gaming:**
- VR games for exercise
- Motion-based games
- Fitness gaming apps

What games do you enjoy?`;
        }
        
        if (msgLower.includes('book') || msgLower.includes('story')) {
            return `📚 **Reading & Mental Health**

Reading is fantastic for your brain and wellbeing! 🧠

📖 **Health Benefits of Reading:**
- Reduces stress by 68% (research shows!)
- Improves memory and concentration
- Increases empathy and emotional intelligence
- Better sleep compared to screen time
- Expands knowledge and vocabulary

🌙 **Bedtime Reading:**
- Helps you wind down
- Reduces blue light exposure
- Improves sleep quality
- Creates a relaxing routine

📚 **Health-Related Book Recommendations:**
- "How Not to Die" by Michael Greger
- "The Body Keeps the Score" by Bessel van der Kolk
- "Atomic Habits" by James Clear

What kind of books do you enjoy reading?`;
        }
        
        if (msgLower.includes('news')) {
            return `📰 **News & Mental Health**

Staying informed is important, but news can affect our health:

⚠️ **News-Related Stress:**
- Can increase anxiety and worry
- May disrupt sleep
- Can lead to "doomscrolling"
- Affects mood and outlook

🛡️ **Healthy News Habits:**
- Limit news to specific times
- Choose reliable sources
- Take breaks from constant updates
- Balance with positive content
- Don't check news before bed

💪 **Stay Informed, Stay Calm:**
- Focus on what you can control
- Practice self-care during stressful times
- Talk about concerns with others
- Limit social media news consumption

How are you feeling about current events?`;
        }
        
        if (msgLower.includes('time')) {
            const currentTime = new Date().toLocaleTimeString();
            const currentDate = new Date().toLocaleDateString();
            
            return `⏰ **Time & Health**

Current time: ${currentTime}
Today's date: ${currentDate}

⏳ **Time Management for Health:**
- Schedule exercise like appointments
- Meal prep saves time and improves nutrition
- Sleep schedule regulates your body clock
- "Me time" reduces stress

🎯 **Health Timing Tips:**
- Exercise in morning for energy boost
- Avoid caffeine after 2 PM
- Screen-free hour before bed
- Consistent meal times help metabolism

⏰ **Remember:** Your health is worth making time for!

What health goals would you like to schedule time for?`;
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
