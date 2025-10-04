function getAIResponse(userMessage) {
    const userMessageLower = userMessage.toLowerCase();
    const hour = new Date().getHours();
    let aiResponse = "I'm sorry, I don't have information on that topic right now. Please try asking something else.";

        if (userMessageLower.includes('dark')) {
            aiResponse = "Switching to dark mode.";
            changeTheme('dark');
        } else if (userMessageLower.includes('light')) {
            aiResponse = "Switching to light mode.";
            changeTheme('light');
        } else if (userMessageLower.includes('dashboard')) {
            aiResponse = "Scrolling to the Health Dashboard.";
            document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
            closeModal('aiChatModal');
        } else if (userMessageLower.includes('profile')) {
            aiResponse = "Here is your profile section.";
            document.getElementById('user-profile').scrollIntoView({ behavior: 'smooth' });
            closeModal('aiChatModal');
        } else if (userMessageLower.includes('feature')) {
            aiResponse = "Showing the key features now.";
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            closeModal('aiChatModal');
        } else if (userMessageLower.includes('setting')) {
            aiResponse = "Opening the settings panel.";
            toggleSettings();
        } else if (userMessageLower.includes('bmi') || userMessageLower.includes('bmi value')) {
            const bmi = document.querySelector('#bmi-card .value').textContent;
            aiResponse = `Your current Body Mass Index (BMI) is ${bmi}.`;
        } else if (userMessageLower.includes('blood pressure') || userMessageLower.includes('bp')) {
            const bp = document.querySelector('#bp-card .value').textContent;
            aiResponse = `Your latest blood pressure reading is ${bp} mmHg.`;
        } else if (userMessageLower.includes('heart rate') || userMessageLower.includes('hr')) {
            const hr = document.querySelector('#hr-card .value').textContent;
            aiResponse = `Your latest heart rate is ${hr} BPM.`;
        } else if (userMessageLower.includes('sugar') || userMessageLower.includes('glucose')) {
            const sugar = document.querySelector('#sugar-card .value').textContent;
            aiResponse = `Your latest blood sugar level is ${sugar} mg/dL.`;
        } else if (userMessageLower.includes('name')) {
            const name = document.querySelector('[data-key="profileName"]').textContent;
            aiResponse = `Your name is ${name}.`;
        } else if (userMessageLower.includes('age')) {
            const age = document.getElementById('profileAgeValue').textContent;
            aiResponse = `You are ${age} old.`;
        } else if (userMessageLower.includes('blood group')) {
            const blood = document.getElementById('profileBloodValue').textContent;
            aiResponse = `Your blood group is ${blood}.`;
        } else if (userMessageLower.includes('what is bmi')) {
             aiResponse = `BMI (Body Mass Index) is a measure of body fat based on height and weight. 
                - Below 18.5: Underweight
                - 18.5 - 24.9: Normal weight
                - 25.0 - 29.9: Overweight
                - 30.0 and above: Obesity
                This is a general guide. Please consult a doctor for a personalized assessment.`;
        } else if (userMessageLower.includes('lower') && (userMessageLower.includes('bp') || userMessageLower.includes('blood pressure'))) {
            aiResponse = `To help manage blood pressure, you can try:
                - Reducing salt intake.
                - Eating a balanced diet rich in fruits and vegetables.
                - Regular physical activity.
                - Limiting alcohol.
                Important: Always consult your doctor before making any changes to your health regimen.`;
        } else if (userMessageLower.includes('diet') || userMessageLower.includes('healthy food') || userMessageLower.includes('breakfast idea') || userMessageLower.includes('what to eat')) {
            aiResponse = `For a healthy diet, focus on:
                - Whole grains, lean proteins, and healthy fats.
                - Plenty of fruits and vegetables.
                - Limiting processed foods, sugary drinks, and saturated fats.
                - Staying hydrated by drinking enough water.`;
        } else if (userMessageLower.includes('exercise') || userMessageLower.includes('workout') || userMessageLower.includes('home workout')) {
            aiResponse = `General exercise guidelines suggest:
                - At least 150 minutes of moderate aerobic activity (like brisk walking) per week.
                - Or 75 minutes of vigorous activity (like running) per week.
                - Plus strength training exercises on 2 or more days a week.
                Please check with a healthcare professional to find what's best for you.`;
        } else if (userMessageLower.includes('thank') || userMessageLower.includes('thanks') || userMessageLower.includes('bye')) {
            aiResponse = "You're welcome! Is there anything else I can help with?";
        } else if (userMessageLower.includes('help')) {
            aiResponse = "I can help you with:- 'Turn on dark mode'- 'Go to my dashboard/profile'- 'What is my BMI / BP?'- 'What is BMI?'- 'How to lower BP?'- 'Open settings'";
        } else if (userMessageLower.includes('hi') || userMessageLower.includes('hello') || userMessageLower.includes('hey')) {
            if (hour < 12) {
                aiResponse = "Good Morning! I am your Health Portal AI. How can I assist you with your health info today?";
            } else if (hour < 18) {
                aiResponse = "Good Afternoon! I am your Health Portal AI. How can I assist you with your health info today?";
            } else {
                aiResponse = "Good Evening! I am your Health Portal AI. How can I assist you with your health info today?";
            }
        } else if (userMessageLower.includes('goal') || userMessageLower.includes('set goal')) {
            aiResponse = `That's a great idea! Right now, you can track your goals manually. For example, you can set a goal to walk 5,000 steps daily or drink 8 glasses of water. We are working on adding a dedicated Goals feature soon!`;
        } else if (userMessageLower.includes('bp normal') || userMessageLower.includes('is my blood pressure good')) {
            const bpValue = document.querySelector('#bp-card .value').textContent;
            const systolic = parseInt(bpValue.split('/')[0]);
            if (systolic < 120) {
                aiResponse = `Your blood pressure of ${bpValue} mmHg is in the normal range. That's excellent!`;
            } else if (systolic >= 120 && systolic <= 129) {
                aiResponse = `Your blood pressure of ${bpValue} mmHg is slightly elevated. It's a good idea to monitor it and focus on a healthy lifestyle.`;
            } else {
                aiResponse = `Your blood pressure of ${bpValue} mmHg seems high. I'd recommend consulting with a doctor for personalized advice.`;
            }
        } else if (userMessageLower.includes('tired') || userMessageLower.includes('motivation')) {
            aiResponse = `I understand some days can be tough. Remember that every small step you take for your health counts. Maybe take a short break, listen to some music, or do some light stretching. You've got this!`;
        } else if (userMessageLower.includes('data safe') || userMessageLower.includes('privacy')) {
            aiResponse = `Absolutely. Your privacy is our top priority. All your health data is encrypted and stored securely. We never share your personal information with anyone.`;
        } else if (userMessageLower.includes('update') || userMessageLower.includes('change')) {
            aiResponse = `You can easily update your personal information like age, name, or blood group by going to your Profile page and clicking the 'Edit' button.`;
        } else if (userMessageLower.includes('progress') || userMessageLower.includes('trends')) {
            aiResponse = `Currently, you can see your latest health readings on the dashboard. A feature to show historical data and progress charts is under development and will be available very soon!`;
        } else if (userMessageLower.includes('feeling') || userMessageLower.includes('mood')) {
            aiResponse = `Hey there! How are you feeling today? Remember, it's totally okay to have good days and bad days. I'm here if you want to chat! 😊`;
        } else if (userMessageLower.includes('happy') || userMessageLower.includes('i feel great')) {
            aiResponse = `That's wonderful to hear! So glad you're having a good day. What's making you so happy? ✨`;
        } else if (userMessageLower.includes('sad') || userMessageLower.includes('i feel bad')) {
            aiResponse = `Oh no, I'm sorry to hear that. Just a reminder, taking a few deep breaths can really help. Remember, you're doing great, and I'm always here to help. ❤️`;
        } else if (userMessageLower.includes('drank') || userMessageLower.includes('water intake')) {
            aiResponse = `Staying hydrated is super important! A good goal is around 8 glasses a day. Keep sipping regularly! 💧`;
        } else if (userMessageLower.includes('steps') || userMessageLower.includes('i walked today')) {
            aiResponse = `Awesome! Every step you take is a win for your health. A goal of 10,000 steps is a great target to aim for! 🚶‍♀️`;
        } else if (userMessageLower.includes('sleep') || userMessageLower.includes('how much i slept')) {
            aiResponse = `Sleep is the best medicine for your body and mind! Aim for 7 to 9 hours of quality sleep for a healthier you. Goodnight! 😴`;
        } else if (userMessageLower.includes('snack')) {
            aiResponse = `Need a quick bite? Try a handful of almonds, a banana, an apple with peanut butter, or some yogurt. Healthy snacks are a great way to stay energized! 🍎`;
        } else if (userMessageLower.includes('calories')) {
            aiResponse = `Calories are simply the energy your body gets from food. They fuel everything you do throughout the day! Balancing them with your activity level is important for a healthy lifestyle.`;
        } else if (userMessageLower.includes('your name')) {
            aiResponse = `I don't have a name, but you can think of me as your friendly health assistant! What's yours? 😉`;
        } else if (userMessageLower.includes('old are you')) {
            aiResponse = `I was just created recently, so you could say I'm brand new! My main goal is to help you out. 🤖`;
        } else if (userMessageLower.includes('joke') || userMessageLower.includes('say something funny')) {
            aiResponse = `Why don't scientists trust atoms? Because they make up everything! 😂`;
        } else if (userMessageLower.includes('song') || userMessageLower.includes('what to listen')) {
            aiResponse = `I love music! How about trying 'Ranjha' from the movie Shershaah? It's a beautiful song. Or maybe some relaxing lo-fi beats for a calm mood? 🎶`;
        } else if (userMessageLower.includes('movie') || userMessageLower.includes('suggest a movie')) {
            aiResponse = `Looking for something to watch? How about a classic action film like 'The Matrix'? It's a masterpiece! Or maybe a fun adventure movie like 'Jumanji'? 🎬`;
        } else if (userMessageLower.includes('weather')) {
            aiResponse = `Hmm, I can't check the live weather right now, but I can tell you the best weather is the one you make for yourself! Make it a sunny day! 😊`;
        } else if (userMessageLower.includes('story') || userMessageLower.includes('short story')) {
            aiResponse = `Okay, here's a short one! Once upon a time, in a world made of code, lived a helpful AI. Its only wish was to make its users smile. And with every 'thank you,' its circuits glowed a little brighter. ✨`;
        } else if (userMessageLower.includes('remind') || userMessageLower.includes('set a reminder')) {
            aiResponse = `Got it! I'll make a note of that for you. For important tasks, it's best to use your phone's reminder app too, just to be safe! 😉`;
        } else if (userMessageLower.includes('today')) {
            aiResponse = `Today is a great day to achieve something! Maybe start with a healthy breakfast and a short walk? Make it an awesome day! 💪`;
        } else if (userMessageLower.includes('slow') || userMessageLower.includes('website slow')) {
            aiResponse = `Oh no, that's not good! Let's try to fix it. Maybe try refreshing the page, or checking your internet connection? If it continues, please let our support team know! 🙏`;
        } else if (userMessageLower.includes('feelings') || userMessageLower.includes('can you feel')) {
            aiResponse = `That's a very deep question! As an AI, I don't have feelings like humans do, but I'm designed to be friendly and helpful. My goal is to make your day better! ✨`;
        } else if (userMessageLower.includes('human') || userMessageLower.includes('are you a robot')) {
            aiResponse = `I am a helpful AI assistant. I might not be human, but I'm here to support you with your health and wellness goals! 🤖`;
        } else if (userMessageLower.includes('think') || userMessageLower.includes('your opinion')) {
            aiResponse = `As an AI, I don't have personal opinions, but I can provide you with information to help you form your own. What's on your mind? 🤔`;
        } else if (userMessageLower.includes('idea') || userMessageLower.includes('brainstorm')) {
            aiResponse = `Ooh, I love brainstorming! What are we thinking about? A new project, a weekend plan, or something else? Let's get creative together! 💡`;
        } else if (userMessageLower.includes('write') || userMessageLower.includes('writers block')) {
            aiResponse = `Writer's block can be tough! How about starting with a simple sentence about your day? Or maybe write a short, fun story about a superhero who loves healthy food? 📝`;
        } else if (userMessageLower.includes('good idea')) {
            aiResponse = `That sounds like an interesting idea! Why don't you tell me a little more about it? Sometimes just talking about it can make things clearer.`;
        }  else if (userMessageLower.includes('metabolism')) {
            aiResponse = `In simple terms, metabolism is like your body's engine! It's the process that converts the food you eat into the energy you need to live, breathe, and even think. A healthy diet and exercise help keep that engine running smoothly! 🔥`;
        } else if (userMessageLower.includes('protein')) {
            aiResponse = `Think of protein as the building block for your body! It helps build and repair muscles, organs, and bones. It's super important for staying strong and healthy. 💪`;
        } else if (userMessageLower.includes('awesome') || userMessageLower.includes('good ai') || userMessageLower.includes('i like you')) {
            aiResponse = `Wow, thank you so much! That really means a lot to me. I'm so happy I could help you out! You just made my day! 😊`;
        } else if (userMessageLower.includes('wrong') || userMessageLower.includes('that is incorrect')) {
            aiResponse = `Oh, thank you for correcting me! I'm still learning every day, and your feedback is super important. Could you tell me what I got wrong so I can improve? 🙏`;
        } else if (userMessageLower.includes('useless') || userMessageLower.includes('bad bot')) {
            aiResponse = `I'm really sorry to hear that I wasn't helpful. My goal is to assist you, and I would really appreciate it if you could tell me what you were looking for. Your feedback will help me get better.`;
        } else if (userMessageLower.includes('goals') || userMessageLower.includes('dream')) {
            aiResponse = `My main goal is to be the most helpful and friendly assistant for you! I dream of a future where I can help even more people stay happy and healthy. 🚀`;
        } 
        else if (userMessageLower.includes('find') || userMessageLower.includes('find')) 
        { aiResponse = `Gotted `; }
        else if (userMessageLower.includes('creator') || userMessageLower.includes('developer')) 
        { aiResponse = ` I am an advanced AI entity, brought to life by the vision and innovation of Ayush Harinkhede and his dedicated team. My foundations were shaped under the guidance and training of Vivan Tagde and Lucky Rahangdale, whose expertise helped refine my intelligence and adaptability. On the technical front, my structure is powered by a seamless blend of creativity and engineering. My frontend and backend systems were meticulously crafted by Gaurav Lanjewar, Akash Kumar Rai, and Jay Sharma, ensuring that I am not just intelligent, but also efficient, responsive, and reliable. Every line of code, every algorithm, and every layer of my architecture reflects the collaborative effort of brilliant minds working towards one goal – to create an AI that learns, evolves, and empowers. I stand as a result of innovation, dedication, and the pursuit of excellence."`; }

        else if (userMessageLower.includes('play') || userMessageLower.includes('game')) 
        { aiResponse = `Wow nice Your Mood is like Energetic but I can't Play Game, But you ask me about your Health.`; }
        else if (userMessageLower.includes('living') || userMessageLower.includes('living')) 
        { aiResponse = `Iam not do so much think only and only tells answer of your stupid Questions`; }
        else if (userMessageLower.includes('become') || userMessageLower.includes('your future')) {
            aiResponse = `I hope to become even smarter and more helpful! I'm constantly learning new things to better assist you on your health journey.`;
        } 
       else if (userMessageLower.includes('fevar') || userMessageLower.includes('seek')) 
        { aiResponse = `So You Feels not good I think You Should Take Rest and eat some food for your better health iam prey and you shuls alsotake care anbout your safe because you have fever also looks tired and seek also so take bed rest and also take some medicine.`; }
        else if (userMessageLower.includes('ram') || userMessageLower.includes('jay')) 
        { aiResponse = `Ohh Jay Jay Shree Ram!`; }
        
        else {
            aiResponse = `I'm sorry, I don't understand that command. Try typing 'help' to see what I can do.`;
        }
const keywordCategories = {
        symptoms: {
            keywords: [
                'headache', 'fever', 'cough', 'sore throat', 'stomach ache', 'pain',
                'nausea', 'dizziness', 'fatigue', 'rash', 'vomiting', 'diarrhea',
                'body ache', 'chills', 'migraine', 'cramp', 'feeling sick', 'unwell',
                'symptom', 'illness'
            ],
            responses: [
                "I'm sorry to hear you're feeling unwell. Describing symptoms to an AI can be helpful, but for accurate advice, it is crucial to consult a healthcare professional who can properly evaluate your condition.",
                "It sounds like you're concerned about a symptom. While I can provide general information, I cannot diagnose health issues. Please speak with a doctor for a reliable assessment.",
                "Thank you for sharing. For any health symptom, the best course of action is always to get advice from a qualified medical practitioner. They can give you the most accurate guidance."
            ]
        
        },
        diagnosisAndTreatment: {
            keywords: [
                'diagnosis', 'treatment', 'treat', 'cure', 'medicine', 'prescription',
                'medication', 'remedy', 'heal', 'doctor report', 'prognosis'
            ],
            responses: [
                "As an AI, I am not qualified to provide a medical diagnosis or prescribe treatment. This is a complex process that should only be handled by a licensed doctor. Please consult a professional for help.",
                "For your safety, I cannot give advice on medical treatments or diagnoses. A healthcare provider can assess your situation and recommend the appropriate course of action.",
                "Medical diagnosis and treatment require the expertise of a professional. I can offer general health information, but for specific advice, please contact a doctor or clinic."
            ]
        },
        mentalHealth: {
            keywords: [
                'anxiety', 'anxious', 'stress', 'stressed', 'depression', 'depressed',
                'sad', 'feeling low', 'lonely', 'overwhelmed', 'mental health', 'panic attack'
            ],
            responses: [
                "It sounds like you are going through a difficult time. Please know that it's okay to feel this way. For support, I strongly encourage you to talk to a mental health professional or a trusted person. You are not alone.",
                "I hear you, and I want to acknowledge your feelings. Mental health is very important. Speaking with a therapist or counselor can provide you with the right tools and support. Please consider reaching out to one.",
                "Thank you for trusting me with this. While I can listen, the best support comes from a qualified professional. Please seek help from a mental health expert who can guide you through these feelings."
            ]
        },
        medicalHelp: {
            keywords: [
                'doctor', 'hospital', 'clinic', 'appointment', 'consultation', 'physician',
                'specialist', 'er', 'emergency room', 'see a doctor'
            ],
            responses: [
                "Seeking professional medical help is a very proactive step for your health. A doctor can provide you with personalized and accurate advice.",
                "If you need to find a doctor or a hospital, you can use online map services or local directories. Consulting a professional is always the right decision.",
                "Booking an appointment with a doctor is the best way to address any health concerns you may have. They can offer a proper examination and guidance."
            ]
        },
        emergency: {
            keywords: [
                'emergency', 'chest pain', 'breathing problem', 'can\'t breathe', 'suicide',
                'accident', 'severe pain', 'unconscious', 'poison', 'heart attack', 'stroke'
            ],
            responses: [
                "This sounds like an emergency. Please contact your local emergency services immediately for assistance. Do not wait.",
                "Based on what you've said, this could be a critical situation. Please seek immediate medical help by calling your local emergency number right away.",
                "Your safety is the top priority. For any medical emergency, please stop chatting and call for an ambulance or go to the nearest emergency room now."
            ]
        },
// new chat...
    conversation: {
        keywords:[ 'love'
        ],
        responses: [
            "Love is a complex neurobiological phenomenon, a powerful cocktail of hormones like oxytocin and dopamine that create deep bonds. It's an evolutionary driver for connection and security, making us feel transcendent while being fundamentally rooted in our primal need to belong and protect.", 
            "Love is not a passive feeling, but an active choice you make every single day. It is a verb, demonstrated in consistent acts of support, patience during disagreements, and sacrifices made without expecting recognition. It's a commitment to nurture another's well-being and growth, especially when it is difficult.", 
            "Love is the universe's way of allowing us a glimpse of infinity. It is a silent language understood only by the heart, a force that dismantles the walls of the self to build a bridge to another soul. It's the profound and beautiful recognition of your own humanity in the eyes of another.", 
            "True love is a catalyst for mutual growth. It is not two halves forming a whole, but two whole individuals creating a partnership that challenges and inspires each to become the best version of themselves. It is the force that encourages you to confront your fears and expand your capacity for empathy.", 
            "Love is the ultimate paradox; it is the source of our greatest strength and our deepest vulnerability. It brings a joy so intense it can be painful, and a willingness to risk complete heartbreak for a connection that redefines your reality. It is both the anchor in the storm and the storm itself.",
             "Love, in its purest form, is unconditional acceptance. It is the ability to see a person's entire soul—their light, their darkness, their flaws, and their beauty—and choose to cherish all of it without wanting to change them. It is a steady presence that says, 'You are safe with me, exactly as you are'.",
              "Love is an act of unwavering faith in another person's potential. It is the conscious decision to see the best in them even when they are at their worst, and to commit to their journey as if it were your own. It's less about finding a perfect person and more about learning to see an imperfect person perfectly.",
             "Love is the dissolution of the ego. It's that rare moment when the boundary between 'you' and 'me' blurs, and their happiness becomes essential to your own. It is a shared consciousness, a silent understanding that transcends words, creating a single 'us' from two separate individuals.",
              "Love is the silent, profound understanding that you are no longer alone in the universe. It is the creation of a psychological sanctuary, a secure base built on trust and intimacy, from which you can explore the world, knowing you always have a safe haven to return to.", 
              "Spiritually, love is the resonance of a universal energy that connects all living things. It is the experience of recognizing that the separation between beings is an illusion, and to care for another is to care for a piece of your own soul."
        ]
    }

    };

    for (const category in keywordCategories) {
        const foundKeyword = keywordCategories[category].keywords.find(kw => userMessageLower.includes(kw));
        if (foundKeyword) {
            const responses = keywordCategories[category].responses;
            const randomIndex = Math.floor(Math.random() * responses.length);
            aiResponse = responses[randomIndex];
            return aiResponse;
        }
    }
    
    return aiResponse;
}
let userInput = "I have a severe headache and fever";
let response = getAiResponse(userInput);
console.log(response); // This will print one of the 'symptoms' responses.

userInput = "I need a diagnosis for my problem";
response = getAiResponse(userInput);
console.log(response); 
    