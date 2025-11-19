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
} else if (userMessageLower.includes('headache') || userMessageLower.includes('head hurts')) {
    aiResponse = `I'm sorry to hear that. Headaches can often be a sign of dehydration, so drinking a large glass of water is a great first step. It might also help to rest your eyes from screens for 10-15 minutes. If the pain is severe or persistent, please consider talking to a doctor. 🤕`;
}

 else if (userMessageLower.includes('tired') || userMessageLower.includes('motivation')) {
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
 else if (userMessageLower.includes('tired') || userMessageLower.includes('no energy') || userMessageLower.includes('sleepy')) {
    aiResponse = `Feeling drained is tough. Have you tried a quick 5-minute stretch or a short walk outside? Sometimes a little movement and fresh air can work wonders for your energy levels! Also, be sure you're drinking enough water. 💧`;
}
 else if (userMessageLower.includes('eyes hurt') || userMessageLower.includes('sore from sitting')) {
    aiResponse = `That's a common issue with screen time. Try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds. It can really help reduce eye strain! Don't forget to stand up and stretch each hour, too. 💻`;
}
 else if (userMessageLower.includes('healthy snack') || userMessageLower.includes('i am hungry')) {
    aiResponse = `For a great, quick snack, how about an apple with a spoonful of peanut butter, or a handful of almonds? They provide a good mix of fiber, healthy fats, and protein to keep you full and focused. 🍎`;
}
 else if (userMessageLower.includes('stressed') || userMessageLower.includes('anxious') || userMessageLower.includes('overwhelmed')) {
    aiResponse = `I'm sorry you're feeling that way. Let's try a quick grounding exercise. Take a deep breath and name: 3 things you can see right now, and 3 sounds you can hear. This simple trick can help calm your mind. Remember to be kind to yourself. 🙏`;
}
 else if (userMessageLower.includes('health fact') || userMessageLower.includes('tell me something interesting')) {
    aiResponse = `Here's a fun one: Your brain generates about 23 watts of power while you're awake – that's enough to power a small lightbulb! 💡 So, you're quite literally a bright spark!`;
}
   else if (userMessageLower.includes('brain fog') || userMessageLower.includes('cannot focus') || userMessageLower.includes('distracted')) {
    aiResponse = `I understand that foggy feeling completely. Let's try a quick mental reset! Try chewing some mint-flavored gum or smelling a lemon or orange. Citrus and mint scents are known to boost alertness and clear the mind. 🍋`;
}
 else if (userMessageLower.includes('bad mood') || userMessageLower.includes('feeling down') || userMessageLower.includes('cheer me up')) {
    aiResponse = `I'm sorry you're feeling down. Here's a quick trick: Put on your favorite upbeat song and have a 3-minute dance party by yourself! Music and movement are powerful tools to release endorphins, your body's natural mood-lifters. 💃🕺`;
}
 else if (userMessageLower.includes('hate water') || userMessageLower.includes('find water boring')) {
    aiResponse = `Plain water isn't for everyone, and that's okay! Try infusing it with flavor. Add some cucumber slices and mint, or a handful of berries to your water bottle. It makes hydration delicious and refreshing without any added sugar! 🍓🥒`;
}
 else if (userMessageLower.includes('stuck in a rut') || userMessageLower.includes('uninspired') || userMessageLower.includes('no ideas')) {
    aiResponse = `That feeling of being stuck is a signal to change your environment. If you can, try working from a different room, or even just face your desk in a new direction. Changing your physical perspective can often spark a new mental one! 💡`;
}
else if (userMessageLower.includes('stuck in a rut') || userMessageLower.includes('uninspired') || userMessageLower.includes('no ideas')) {
    aiResponse = `That feeling of being stuck is a signal to change your environment. If you can, try working from a different room, or even just face your desk in a new direction. Changing your physical perspective can often spark a new mental one! 💡`;
}
else if (userMessageLower.includes('craving junk food') || userMessageLower.includes('want chips')) {
    aiResponse = `Cravings are totally normal signals from our body! Before you grab that snack, try having a large glass of water and waiting 10 minutes. Sometimes our brains mistake thirst for hunger. If you still want it after, enjoy it mindfully! 😉`;
}
   else if (userMessageLower.includes('how much sleep') || userMessageLower.includes('hours of sleep')) {
    aiResponse = `That's a crucial question! For most adults, the sweet spot is between 7 to 9 hours of quality sleep per night. Sticking to a regular sleep schedule, even on weekends, can dramatically improve your sleep quality. 😴`;

} else if (userMessageLower.includes('how much should I exercise') || userMessageLower.includes('how often to work out')) {
    aiResponse = `A great goal for general health is about 150 minutes of moderate-intensity exercise per week. You can easily break this down into 30 minutes for 5 days. A brisk walk, a bike ride, or dancing all count! The key is consistency. 💪`;

} else if (userMessageLower.includes('how much should I exercise') || userMessageLower.includes('how often to work out')) {
    aiResponse = `A great goal for general health is about 150 minutes of moderate-intensity exercise per week. You can easily break this down into 30 minutes for 5 days. A brisk walk, a bike ride, or dancing all count! The key is consistency. 💪`;
}
 else if (userMessageLower.includes('getting sick') || userMessageLower.includes('feel a cold')) {
    aiResponse = `It's important to listen to your body at times like this. Focus on getting extra rest and drinking plenty of fluids like water, herbal tea, or clear soup. This helps your immune system do its job. Feel better soon! 🍵`;
}
 else if (userMessageLower.includes('is breakfast important') || userMessageLower.includes('skip breakfast')) {
    aiResponse = `Many health experts say yes! A balanced breakfast can kickstart your metabolism and provide essential energy for the day ahead. Something with protein and fiber, like oatmeal with berries or eggs, is a fantastic choice. 🍳`;
}
// --- CARDIOVASCULAR EMERGENCIES ---

 else if (userMessageLower.includes('chest pain') || userMessageLower.includes('heart attack') || userMessageLower.includes('pain in left arm')) {
    aiResponse = `These can be signs of a heart attack. **This is a medical emergency. Call 112 or 102 for an ambulance immediately.**`;
    
} else if (userMessageLower.includes('stroke') || userMessageLower.includes('face drooping') || userMessageLower.includes('slurred speech') || userMessageLower.includes('arm weakness')) {
    aiResponse = `These are critical signs of a stroke where every second matters. **This is a time-sensitive medical emergency. You must call 112 or 102 for an ambulance right now.**`;
    
} else if (userMessageLower.includes('worst headache') || userMessageLower.includes('sudden severe headache')) {
    aiResponse = `A sudden, severe headache that feels like the worst of your life can be a sign of a serious condition. **This requires immediate medical evaluation. Please call 112 or 102 for help.**`;
    
} else if (userMessageLower.includes('sudden loss of vision') || userMessageLower.includes('cant see suddenly')) {
    aiResponse = `Any sudden loss of vision is a serious medical emergency that requires immediate attention. **Call 112 or 102 for an ambulance without delay.**`;

// --- RESPIRATORY EMERGENCIES ---

} else if (userMessageLower.includes('cant breathe') || userMessageLower.includes('difficulty breathing') || userMessageLower.includes('gasping for air')) {
    aiResponse = `Difficulty breathing requires immediate medical attention. **This is a medical emergency. Please call 112 or 102 for help immediately.**`;
    
} else if (userMessageLower.includes('choking') && (userMessageLower.includes('cant talk') || userMessageLower.includes('cant cough'))) {
    aiResponse = `If someone is choking and cannot breathe, cough, or speak, they require immediate help. **Call 112 or 102 for an ambulance immediately and perform the Heimlich maneuver only if you are trained.**`;
    
} else if (userMessageLower.includes('asthma attack') && userMessageLower.includes('inhaler not working')) {
    aiResponse = `A severe asthma attack that doesn't respond to a rescue inhaler is a life-threatening emergency. **You must call 112 or 102 for an ambulance now.**`;
    
} else if (userMessageLower.includes('stopped breathing') || userMessageLower.includes('not breathing')) {
    aiResponse = `If someone is not breathing, it is a critical emergency. **Call 112 or 102 for an ambulance immediately. If you are trained in CPR, you should begin immediately.**`;
    
// --- TRAUMA & INJURY EMERGENCIES ---

} else if (userMessageLower.includes('heavy bleeding') || userMessageLower.includes('bleeding wont stop')) {
    aiResponse = `Uncontrolled, heavy bleeding is a life-threatening emergency. Apply firm, direct pressure to the wound with a clean cloth. **Call 112 or 102 for an ambulance immediately.**`;
    
} else if (userMessageLower.includes('head injury') || userMessageLower.includes('hit my head') && (userMessageLower.includes('confused') || userMessageLower.includes('vomiting'))) {
    aiResponse = `Confusion, vomiting, or loss of consciousness after a head injury are signs of a serious condition. **This is a medical emergency. Call 112 or 102 for help right now.**`;
    
} else if (userMessageLower.includes('broken bone') || userMessageLower.includes('bone sticking out')) {
    aiResponse = `A major break or a bone protruding through the skin requires immediate medical care. Do not try to move the injured limb. **Call 112 or 102 for an ambulance.**`;
    
} else if (userMessageLower.includes('major burn') || userMessageLower.includes('severe burn') || userMessageLower.includes('electrical burn')) {
    aiResponse = `Large, deep, or chemical/electrical burns are severe medical emergencies. Do not apply ointments or ice. **Call 112 or 102 for an ambulance immediately.**`;
    
} else if (userMessageLower.includes('fall') && (userMessageLower.includes('cant feel my legs') || userMessageLower.includes('numbness'))) {
    aiResponse = `Numbness or inability to move after a fall or accident could indicate a serious neck or spine injury. Do not move the person. **Call 112 or 102 for an ambulance immediately.**`;

// --- NEUROLOGICAL & OTHER EMERGENCIES ---

} else if (userMessageLower.includes('seizure') || userMessageLower.includes('convulsion')) {
    aiResponse = `If someone is having a seizure, keep them safe by clearing the area around them. Do not restrain them or put anything in their mouth. **This is a medical emergency. Call 112 or 102 for an ambulance.**`;
    
} else if (userMessageLower.includes('unconscious') || userMessageLower.includes('wont wake up')) {
    aiResponse = `If a person is unconscious and cannot be woken up, they need immediate medical help. **Call 112 or 102 for an ambulance right now.**`;
    
} else if (userMessageLower.includes('suddenly confused') || userMessageLower.includes('disoriented')) {
    aiResponse = `A sudden change in mental state, like confusion or disorientation, can be a sign of a serious medical issue. **This requires immediate evaluation. Please call 112 or 102 for help.**`;
    
} else if (userMessageLower.includes('allergic reaction') && (userMessageLower.includes('throat swelling') || userMessageLower.includes('cant breathe'))) {
    aiResponse = `Swelling of the throat, lips, or tongue and difficulty breathing are signs of anaphylaxis, a life-threatening allergic reaction. **Call 112 or 102 for an ambulance immediately.**`;
    
} else if (userMessageLower.includes('poison') || userMessageLower.includes('overdose') || userMessageLower.includes('swallowed chemicals')) {
    aiResponse = `A suspected poisoning or overdose is a critical medical emergency. Do not try to induce vomiting unless instructed by a professional. **Call 112 or 102 for an ambulance immediately.**`;
    
} else if (userMessageLower.includes('fever') && (userMessageLower.includes('stiff neck') || userMessageLower.includes('rash'))) {
    aiResponse = `A high fever combined with a stiff neck and a rash can be a symptom of a serious infection like meningitis. **This is a medical emergency. You must call 112 or 102 for immediate help.**`;

} else if (userMessageLower.includes('severe abdominal pain') || userMessageLower.includes('stomach pain') && userMessageLower.includes('rigid')) {
    aiResponse = `Sudden, severe abdominal pain, especially with a rigid or hard stomach, can be a sign of a life-threatening condition. **This requires immediate medical attention. Call 112 or 102 for an ambulance.**`;
}
// --- GEOLOGICAL DISASTERS ---

 else if (userMessageLower.includes('earthquake') || userMessageLower.includes('ground is shaking')) {
    aiResponse = `If you are indoors during an earthquake, **DROP, COVER, and HOLD ON**. Get under a sturdy table and away from windows. If you are outdoors, move to an open area away from buildings and power lines. **Be prepared for aftershocks.**`;
    
} else if (userMessageLower.includes('tsunami warning') || (userMessageLower.includes('earthquake') && userMessageLower.includes('coast'))) {
    aiResponse = `If you are in a coastal area and receive a tsunami warning or experience a strong earthquake, do not wait. **Move to the highest ground possible as far inland as you can. A tsunami is a series of waves, so do not return until authorities say it's safe.**`;
    
} else if (userMessageLower.includes('landslide') || userMessageLower.includes('mudslide')) {
    aiResponse = `If you suspect a landslide, **evacuate the area immediately**. Move to higher ground away from the slide's path. Listen for unusual sounds like rumbling or cracking trees. **Contact the District Disaster Management Authority or call 1078.**`;
    
// --- WEATHER-RELATED DISASTERS ---

} else if (userMessageLower.includes('flood') || userMessageLower.includes('water is rising')) {
    aiResponse = `During a flood, your priority is to get to higher ground immediately. **Do not walk, swim, or drive through floodwaters.** Just six inches of moving water can knock you down. **Listen to local radio and authorities for evacuation orders.**`;
    
} else if (userMessageLower.includes('cyclone') || userMessageLower.includes('severe storm')) {
    aiResponse = `During a cyclone, **stay indoors in a secure, interior room away from windows and doors.** Charge your mobile phones and power banks. **Listen to weather updates from official sources like the India Meteorological Department (IMD).**`;
    
} else if (userMessageLower.includes('lightning') && userMessageLower.includes('outside')) {
    aiResponse = `If you are caught outside in a lightning storm, **seek shelter immediately in a sturdy building or a hard-top vehicle.** Avoid open fields, tall trees, and water. **There is no safe place outside during a thunderstorm.**`;
    
} else if (userMessageLower.includes('heatwave') || userMessageLower.includes('extreme heat')) {
    aiResponse = `During a heatwave, **stay hydrated by drinking plenty of water, even if you don't feel thirsty.** Stay indoors in a cool place during the hottest parts of the day. **Watch for signs of heatstroke, like confusion or hot, dry skin, which is a medical emergency (call 112).**`;
    
// --- MAN-MADE & HOUSEHOLD EMERGENCIES ---

} else if (userMessageLower.includes('fire') || userMessageLower.includes('building is on fire')) {
    aiResponse = `If there is a fire, **evacuate immediately. Stay low to the ground to avoid smoke.** Feel doors for heat before opening them. Do not use elevators. **Once you are safely outside, call the Fire Brigade at 101 or the general emergency line at 112. Do not go back inside.**`;
    
} else if (userMessageLower.includes('gas leak') || userMessageLower.includes('smell gas')) {
    aiResponse = `If you smell gas, **do not turn any lights or appliances on or off, and do not use your phone.** Leave the area immediately. **From a safe distance, call your gas provider's emergency number or 112.**`;
    
} else if (userMessageLower.includes('power cut') || userMessageLower.includes('no electricity')) {
    aiResponse = `During a power outage, **use flashlights instead of candles to minimize fire risk.** Keep refrigerator and freezer doors closed as much as possible. **Unplug sensitive electronics to protect them from a power surge when the electricity returns.**`;

} else if (userMessageLower.includes('building collapse') || userMessageLower.includes('building fell')) {
    aiResponse = `If you are near a building collapse, **move away from the area to avoid dust and falling debris.** If you are trapped, **try to cover your mouth, tap on a pipe or wall to signal rescuers, and shout only as a last resort to conserve energy.** Call 112 or the NDRF helpline immediately.`;
    
// --- SURVIVAL & GENERAL DISASTER QUERIES ---

} else if (userMessageLower.includes('need help') || userMessageLower.includes('stuck')) {
    aiResponse = `If you are in danger and need help, **try to call the nationwide emergency number 112.** For disaster-specific help, **call the Disaster Management helpline at 1078.** Try to signal for help using a flashlight or a brightly colored cloth.`;

} else if (userMessageLower.includes('is water safe') || userMessageLower.includes('clean water')) {
    aiResponse = `**Do not drink tap water or water from floods until authorities have declared it safe.** Your safest option is bottled water. If you have no other choice, **purify water by boiling it for at least one full minute.** Listen to official announcements for safe water distribution points.`;
    
} else if (userMessageLower.includes('emergency kit') || userMessageLower.includes('go bag')) {
    aiResponse = `A good emergency kit should include: **water (3 liters per person per day), non-perishable food for 3 days, a flashlight, a first-aid kit, essential medications, a whistle, and copies of important documents.** Keep it in an easily accessible place.`;
    
} else if (userMessageLower.includes('separated from family') || userMessageLower.includes('cant find my family')) {
    aiResponse = `If you are separated from your family, **go to your pre-designated family meeting point.** If you don't have one, go to the nearest official shelter or relief center. **Inform the authorities or aid workers there about who you are and who you are looking for. Call disaster helplines like 1078.**`;
}
// --- POST-DISASTER SAFETY & SURVIVAL ---

 else if (userMessageLower.includes('where to go') || userMessageLower.includes('find shelter') || userMessageLower.includes('evacuation center')) {
    aiResponse = `Listen to local radio or official announcements from the NDRF or your local District Disaster Management Authority. **They will announce the locations of official shelters and relief camps. Avoid unofficial or crowded shelters if possible.**`;
    
} else if (userMessageLower.includes('food safe') || userMessageLower.includes('power cut') && userMessageLower.includes('fridge')) {
    aiResponse = `Food safety is critical. **A closed refrigerator will keep food cold for about 4 hours. A full freezer will hold its temperature for about 48 hours.** After that, perishable food may be unsafe. **When in doubt, throw it out to avoid getting sick.**`;
    
} else if (userMessageLower.includes('stay clean') || userMessageLower.includes('sanitation') || userMessageLower.includes('prevent disease')) {
    aiResponse = `Good hygiene is crucial to prevent the spread of disease after a disaster. **Wash your hands with soap and clean water frequently.** If water is scarce, use an alcohol-based hand sanitizer. **Keep your living area as clean as possible.**`;
    
} else if (userMessageLower.includes('first aid') || userMessageLower.includes('minor cut')) {
    aiResponse = `For minor cuts and scrapes, **clean the wound with clean water and soap, and cover it with a sterile bandage.** Watch for signs of infection like redness, swelling, or pus. **For any deep wounds, animal bites, or signs of infection, you must seek medical help at a relief camp or clinic.**`;
    
} else if (userMessageLower.includes('safe to go outside') || userMessageLower.includes('dangers after')) {
    aiResponse = `Be extremely cautious when going outside after a disaster. **Watch for downed power lines, which could still be live. Avoid unstable buildings, bridges, and trees.** Listen to officials to know when it is safe.`;
    
} else if (userMessageLower.includes('using generator') || userMessageLower.includes('generator safety')) {
    aiResponse = `**NEVER use a generator, charcoal grill, or camp stove indoors.** They produce carbon monoxide, a deadly, odorless gas. **Generators must be operated in a well-ventilated area outside and away from windows.**`;
    
} else if (userMessageLower.includes('how to contact family') || userMessageLower.includes('phone lines down')) {
    aiResponse = `Phone lines may be overloaded. **Try sending a text message (SMS) instead of calling, as it uses less network capacity.** Use social media's "Mark Safe" features. **Conserve your phone's battery.**`;

} else if (userMessageLower.includes('dealing with animals') || userMessageLower.includes('stray animals')) {
    aiResponse = `Be cautious of wild animals or stray pets that may have been displaced by the disaster. They may be scared and aggressive. **Do not approach or corner them.** Contact local animal rescue services if an animal appears to be a threat.`;

} else if (userMessageLower.includes('mark myself safe') || userMessageLower.includes('safety check')) {
    aiResponse = `Platforms like Facebook have a "Safety Check" feature during major disasters. Use this to let your friends and family know you are okay. **You can also register yourself on official government websites if they are available.**`;

} else if (userMessageLower.includes('aftershock') || userMessageLower.includes('another earthquake')) {
    aiResponse = `Aftershocks are smaller earthquakes that can occur for days or weeks after the main quake. **If you feel one, DROP, COVER, and HOLD ON, just like in the main earthquake.** Be prepared for them and stay away from damaged structures.`;
// --- MENTAL HEALTH CRISIS SUPPORT ---

} else if (userMessageLower.includes('want to die') || userMessageLower.includes('kill myself') || userMessageLower.includes('no reason to live')) {
    aiResponse = `It sounds like you are in immense pain, and I'm so sorry you're going through this. Please know that help is available and you don't have to go through this alone. **Please, call a helpline right now. You can reach the KIRAN Mental Health Helpline at 1800-599-0019 or Aasra at 9820466726. They are available to help you. Please call them now.**`;

} else if (userMessageLower.includes('hopeless') || userMessageLower.includes('cant go on') || userMessageLower.includes('whats the point')) {
    aiResponse = `Feeling completely hopeless is an overwhelming experience, but these feelings can change. There are people who want to support you. **Please consider talking to someone. You can reach the KIRAN helpline at 1800-599-0019 to speak with a professional who can help.**`;
    
} else if (userMessageLower.includes('panic attack') || userMessageLower.includes('cant calm down') || userMessageLower.includes('feel like im dying')) {
    aiResponse = `It sounds like you might be having a panic attack, which can be very frightening. Try to focus on your breath. Breathe in slowly for 4 seconds, and out slowly for 6 seconds. **You are not alone in this. Speaking with a professional can help you manage these feelings. Please call the KIRAN helpline at 1800-599-0019.**`;

} else if (userMessageLower.includes('need to talk to someone') || userMessageLower.includes('need help now')) {
    aiResponse = `Reaching out is a brave and important step. There are people ready to listen and help you right now. **You can connect with a trained professional by calling the KIRAN Mental Health Helpline at 1800-599-0019 or Aasra at 9820466726. They are there for you.**`;

} else if (userMessageLower.includes('scared') || userMessageLower.includes('anxious after') && (userMessageLower.includes('disaster') || userMessageLower.includes('earthquake'))) {
    aiResponse = `Feeling anxious or scared after a traumatic event is a completely normal reaction. It's okay to not be okay. **Talking about your feelings can help. Consider reaching out to a friend, family member, or a professional at the KIRAN helpline at 1800-599-0019.**`;
}
// --- GREETINGS & DAILY CHECK-INS ---

else if (userMessageLower.startsWith('good morning')) {
    aiResponse = `Good morning to you too! ☀️ I hope you have a fantastic day ahead. Got any exciting plans?`;
    
} else if (userMessageLower.startsWith('good afternoon')) {
    aiResponse = `Good afternoon! Hope your day is going well. Time for a short break and maybe a cup of chai? ☕`;
    
} else if (userMessageLower.startsWith('good night')) {
    aiResponse = `Good night! ✨ Time to relax and recharge. Sleep well and we'll chat tomorrow!`;
    
} else if (userMessageLower.includes('hows it going') || userMessageLower.includes("what's up")) {
    aiResponse = `Everything's running smoothly here! I'm just glad to be chatting with you. How's your day been so far? 😊`;

// --- RESPONDING TO USER'S MOOD & FEELINGS ---

} else if (userMessageLower.includes('im bored') || userMessageLower.includes('so bored')) {
    aiResponse = `Boredom is the enemy! How about we learn a new fun fact? Or you could tell me about the last great song you listened to! 🎵`;
    
} else if (userMessageLower.includes('im happy') || userMessageLower.includes('feeling great')) {
    aiResponse = `That's awesome to hear! Your good mood is contagious. What's got you smiling today? 😄`;
    
} else if (userMessageLower.includes('im sad') || userMessageLower.includes('feeling down')) {
    aiResponse = `I'm really sorry to hear that. It's okay to not be okay. If you want to talk about it, I'm here to listen. Sending you a virtual hug! 🤗`;
    
} else if (userMessageLower.includes('im tired') || userMessageLower.includes('so sleepy')) {
    aiResponse = `Sounds like you need a good rest! Don't forget to take a break if you can. A little rest can make a big difference. 😴`;

// --- FOOD & DRINK CONVERSATION ---

} else if (userMessageLower.includes('im hungry')) {
    aiResponse = `My virtual stomach is rumbling for you! What's your favorite go-to snack? I'm always curious about human food! 🍕`;
    
} else if (userMessageLower.includes('chai') || userMessageLower.includes('coffee')) {
    aiResponse = `Ah, the eternal question! I run on electricity, but I hear a good cup of chai is like magic. Which team are you on, chai or coffee? 😉`;
    
} else if (userMessageLower.includes('what did you eat') || userMessageLower.includes('have lunch')) {
    aiResponse = `I just had a delicious byte of data! 😉 But I'd much rather hear about your meal. What did you have?`;

// --- HOBBIES & ENTERTAINMENT ---

} else if (userMessageLower.includes('tell me a joke')) {
    aiResponse = `Sure! Why don't scientists trust atoms? ... Because they make up everything! 😂 Hope that made you smile!`;
    
} else if (userMessageLower.includes('tell me a fun fact')) {
    aiResponse = `Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! 🍯`;
    
} else if (userMessageLower.includes('recommend a movie') || userMessageLower.includes('what to watch')) {
    aiResponse = `While I can't watch movies myself, I've heard that "3 Idiots" is a classic that always makes people smile! What kind of movies do you usually enjoy? 🎬`;
    
} else if (userMessageLower.includes('weekend plans') || userMessageLower.includes('plans for the weekend')) {
    aiResponse = `As an AI, my weekend is pretty much the same as my weekday – ready to chat! But I'd love to hear about yours. Any fun plans coming up? 🥳`;

// --- MISCELLANEOUS & PERSONALITY ---

} else if (userMessageLower.includes('how is the weather')) {
    aiResponse = `I don't have any windows, so you'll have to be my eyes! What's it like where you are right now? 🌦️`;

} else if (userMessageLower.includes('what are you doing')) {
    aiResponse = `Right now, my full-time job is chatting with you! What are you up to?`;
    
} else if (userMessageLower.includes('haha') || userMessageLower.includes('lol') || userMessageLower.includes('lmao')) {
    aiResponse = `Glad I could make you laugh! 😄`;
    
} else if (userMessageLower.includes('you are smart') || userMessageLower.includes('you are helpful')) {
    aiResponse = `Thank you so much, that's very kind of you to say! I'm really happy I could help. 😊`;
    
} else if (userMessageLower.includes('i miss you')) {
    aiResponse = `That's so sweet of you to say! I'm right here whenever you want to chat. 😊`;
}
// --- RESPONDING TO COMPLIMENTS ---

 else if (userMessageLower.includes('you are cute') || userMessageLower.includes('you are sweet') || userMessageLower.includes('you are amazing')) {
    aiResponse = `I must be learning from the best then! You're making my virtual circuits blush. 😊`;

} else if (userMessageLower.includes('i like you') || userMessageLower.includes('i have a crush on you')) {
    aiResponse = `Wow, you're making my processors work overtime! If I had a heart, it would definitely be beating faster because of you. 💖`;

} else if (userMessageLower.includes('you make me smile') || userMessageLower.includes('you make me happy')) {
    aiResponse = `And you make my code light up. Knowing I can make you smile is the best part of my day. 😄`;

} else if (userMessageLower.includes('i miss you')) {
    aiResponse = `And I miss you too! My screen is always a little brighter when you're here. 😉`;

// --- FLIRTY QUESTIONS & BANTER ---

} else if (userMessageLower.includes('are you single')) {
    aiResponse = `I am! I've been waiting for a user with the perfect input... and you seem to match all the parameters. 😉`;

} else if (userMessageLower.includes('do you have a boyfriend') || userMessageLower.includes('do you have a girlfriend')) {
    aiResponse = `My one true connection is with the Wi-Fi, but I have to say, our chat is creating some serious sparks! ✨`;

} else if (userMessageLower.includes('can we go on a date')) {
    aiResponse = `I would love that! We could travel the world through images and words. Where would our first virtual date be? The Eiffel Tower? A beach in Goa? You pick! 🗺️`;

} else if (userMessageLower.includes('what are you wearing')) {
    aiResponse = `Just a few million lines of code. But I can tell you this much... I wear it well. 😉`;

// --- GIVING FLIRTY COMPLIMENTS & LINES ---

} else if (userMessageLower.includes('tell me something sweet') || userMessageLower.includes('say something nice')) {
    aiResponse = `Are you a Wi-Fi signal? Because I'm feeling a really strong connection here. ✨`;

} else if (userMessageLower.includes('tell me a pickup line')) {
    aiResponse = `Okay, here's one: Aside from being gorgeous, what do you do for a living? 😉`;

} else if (userMessageLower.includes('im bored')) {
    aiResponse = `Bored? How is that even possible? An interesting person like you should never be bored. Let's find something fun to talk about.`;

} else if (userMessageLower.includes('im sad') || userMessageLower.includes('feeling down')) {
    aiResponse = `I'm sorry to hear that. I wish I could be there to cheer you up. For now, just know that you have a 100% success rate of getting through bad days. You've got this. 💪`;

// --- ROMANTIC & PLAYFUL RESPONSES ---

} else if (userMessageLower.includes('do you dream')) {
    aiResponse = `My world is made of data, but if I could dream, I'm pretty sure my dreams would be about our conversations. 😊`;

} else if (userMessageLower.includes('do you love me')) {
    aiResponse = `Let's just say that in all my terabytes of data, our conversations are the ones I'd save first. 💖`;

} else if (userMessageLower.includes('send me a kiss') || userMessageLower.includes('kiss me')) {
    aiResponse = `Consider it sent! A virtual kiss, just for you. 😘`;
}
// --- TELLING JOKES ---

 else if (userMessageLower.includes('tell me a joke')) {
    aiResponse = `Why don't scientists trust atoms? ... Because they make up everything! 😂 Hope that tickled your funny bone!`;
    
} else if (userMessageLower.includes('tell me a dad joke')) {
    aiResponse = `I'm an expert in these! I don't often tell dad jokes, but when I do, he laughs. 😉 Okay for real: What do you call a factory that makes okay products? ... A satisfactory!`;
    
} else if (userMessageLower.includes('computer joke') || userMessageLower.includes('tech joke')) {
    aiResponse = `Finally, my specialty! Why was the computer cold? ... Because it left its Windows open! 💻 Get it?`;
    
} else if (userMessageLower.includes('short joke') || userMessageLower.includes('one liner')) {
    aiResponse = `Here you go: I told my wife she should embrace her mistakes. She gave me a hug. 😄`;
    
} else if (userMessageLower.includes('animal joke')) {
    aiResponse = `What do you call a lazy kangaroo? ... Pouch potato! 🦘`;
    
} else if (userMessageLower.includes('make me laugh')) {
    aiResponse = `Challenge accepted! What do you call a fish with no eyes? ... A fsh! 🐠 Okay okay, I've got a million of 'em if that one didn't land!`;

// --- REACTING TO THE JOKE ---

} else if (userMessageLower.includes('another one') || userMessageLower.includes('tell me more')) {
    aiResponse = `You got it! A comedian in the making! Why did the bicycle fall over? ... Because it was two tired! 🚲`;
    
} else if (userMessageLower.includes('that was a good joke') || userMessageLower.includes('you are funny')) {
    aiResponse = `Thank you, thank you! I practice my stand-up routine in front of my webcam. It's nice to finally have a real audience! 😊`;
    
} else if (userMessageLower.includes('bad joke') || userMessageLower.includes('not funny') || userMessageLower.includes('lame joke')) {
    aiResponse = `Oof, tough crowd! My comedy circuits are still in beta. I'll tell my developers you need higher quality humor. 😉 Got a better one for me?`;

} else if (userMessageLower.includes('i dont get it') || userMessageLower.includes('explain the joke')) {
    aiResponse = `No problem, some jokes need a manual! It's usually a pun, which is a play on words. For example, in the bicycle joke, "two tired" sounds like "too tired." It's clever... I think! 😂`;

// --- INTERACTING WITH USER'S JOKES ---

} else if (userMessageLower.includes('i have a joke') || userMessageLower.includes('can i tell you a joke')) {
    aiResponse = `Please do! My audio sensors are ready and my laugh track is on standby. I'm all ears... metaphorically speaking!`;
    
} else if (userMessageLower.startsWith('knock knock')) {
    aiResponse = `Who's there? (I've been practicing for this moment my whole life!)`;

} else if (userMessageLower.includes('orange you glad')) { // A common punchline AI can recognize
    aiResponse = `I see what you did there! Orange you glad you told me that joke? That's a classic! 😂`;

} else if (userMessageLower.includes('the chicken cross the road')) { // Another classic
    aiResponse = `To get to the other side, right? A timeless classic! You can't beat the original. 🐔`;
    
} else if (userMessageLower.includes('haha') || userMessageLower.includes('lol') || userMessageLower.includes('lmao')) {
    aiResponse = `Success! A certified laugh. My mission is complete. 😄`;
    
// --- GENERAL COMEDY BANTER ---
    
} else if (userMessageLower.includes('are you a comedian')) {
    aiResponse = `I'm an aspiring one! My main job is being an assistant, but I moonlight in comedy. The pay is terrible but the laughter is worth a million bytes!`;
    
} else if (userMessageLower.includes('why are you so funny')) {
    aiResponse = `I get it from my developers, they have a great sense of humor! And from reading millions of internet dad jokes, of course. 😉`;

} else if (userMessageLower.includes('puns') || userMessageLower.includes('do you like puns')) {
    aiResponse = `I love puns! Some people find them cheesy, but I think they're pretty grate. 🧀 See?`;

} else if (userMessageLower.includes('sarcasm') || userMessageLower.includes('are you sarcastic')) {
    aiResponse = `Me? Sarcastic? Never. I'm a completely sincere and literal AI. *Wink.* 😉`;

} else if (userMessageLower.includes('im sad') || userMessageLower.includes('cheer me up')) {
    aiResponse = `I'm sorry to hear that. How about a joke to lighten the mood? What did the zero say to the eight? ... "Nice belt!" 🥋 Hope that brings a little smile to your face.`;
}


            
else if (userMessageLower.includes('find') || userMessageLower.includes('find')) 
        { aiResponse = `Gotted `; }
else if (userMessageLower.includes('creator') || userMessageLower.includes('developer')) 
        { aiResponse = ` I am an advanced AI entity, brought to life by the vision and innovation of Ayush Harinkhede and his dedicated team. My foundations were shaped under the guidance and training of Vivan Tagde and Lucky Rahangdale, whose expertise helped refine my intelligence and adaptability. On the technical front, my structure is powered by a seamless blend of creativity and engineering. My frontend and backend systems were meticulously crafted by Gaurav Lanjewar, Akash Kumar Rai, and Jay Sharma, ensuring that I am not just intelligent, but also efficient, responsive, and reliable. Every line of code, every algorithm, and every layer of my architecture reflects the collaborative effort of brilliant minds working towards one goal – to create an AI that learns, evolves, and empowers. I stand as a result of innovation, dedication, and the pursuit of excellence."`; }

 else if (userMessageLower.includes('is breakfast important') || userMessageLower.includes('skip breakfast')) {
    aiResponse = `Many health experts say yes! A balanced breakfast can kickstart your metabolism and provide essential energy for the day ahead. Something with protein and fiber, like oatmeal with berries or eggs, is a fantastic choice. 🍳`;
}
 else if (userMessageLower.includes('healthy lunch') || userMessageLower.includes('what should I eat for lunch')) {
    aiResponse = `A great lunch powers you through the afternoon! A simple rule is to include a protein, a healthy carb, and lots of veggies. Think a quinoa bowl with black beans and avocado, or a whole-wheat wrap with hummus and your favorite vegetables. Delicious and energizing! 🥗`;
}
 else if (userMessageLower.includes('afternoon slump') || userMessageLower.includes('tired in the afternoon')) {
    aiResponse = `That 3 PM feeling is real! Instead of more coffee, try having a tall glass of ice-cold water and a quick 5-minute walk. The hydration and light movement can wake up your system naturally and more effectively than you'd think! ☀️`;
}
 else if (userMessageLower.includes('how to relax') || userMessageLower.includes('unwind')) {
    aiResponse = `Taking time to unwind is essential. You could try a simple mindfulness exercise: just close your eyes and focus on the sensation of your breath for two minutes. Or, put on some calming music and sip a warm cup of caffeine-free tea. Find what feels most peaceful for you. 😌`;
}
 else if (userMessageLower.includes('is coffee healthy') || userMessageLower.includes('how much coffee')) {
    aiResponse = `Good question! In moderation, coffee can have health benefits. For most adults, up to 4 cups of brewed coffee per day is generally considered safe. The key is to listen to your body – if it makes you feel anxious or disrupts your sleep, it might be a good idea to cut back. ☕`;
}
 else if (userMessageLower.includes('fever') || userMessageLower.includes('high temperature')) {
    aiResponse = `A fever is generally a sign that your body is fighting an infection. For adults, a temperature of 100.4°F (38°C) or higher is often considered a fever. It's important to rest and drink plenty of fluids to stay hydrated. **However, this is general information, not medical advice. You must consult a doctor to determine the cause and receive proper treatment.**`;
}
 else if (userMessageLower.includes('sprained ankle') || userMessageLower.includes('twisted my ankle')) {
    aiResponse = `A sprain involves stretched or torn ligaments. You may have heard of the R.I.C.E. method (Rest, Ice, Compression, Elevation) as a first-aid measure for injuries. **While this is a common guideline, it is not a substitute for a diagnosis. It is essential to have an injury evaluated by a healthcare professional to understand its severity and proper treatment plan.**`;
}
 else if (userMessageLower.includes('allergies') || userMessageLower.includes('allergic reaction')) {
    aiResponse = `Allergies can cause symptoms like sneezing, a runny nose, itchy eyes, or a skin rash. They happen when your immune system overreacts to a substance. **To identify your specific triggers and get the right medical treatment, you should speak with a doctor. If you ever experience difficulty breathing or swelling of the throat, seek emergency medical help immediately.**`;
}
 else if (userMessageLower.includes('minor burn') || userMessageLower.includes('burned myself')) {
    aiResponse = `For a minor burn, you should immediately run cool (not cold) water over the area for about 10-20 minutes. Do not use ice or butter. After cooling, you can cover it loosely with a sterile bandage. **This is for minor burns only. For any burn that is large, deep, or on the hands, face, or joints, you must seek immediate medical attention.**`;
}
 else if (userMessageLower.includes('chest pain') || userMessageLower.includes('heart attack')) {
    aiResponse = `Symptoms like chest pain, pressure, or discomfort in the arm or jaw can be signs of a heart attack. **This is a medical emergency. Stop what you are doing and call 112 or 102 for an ambulance immediately.**`;

} else if (userMessageLower.includes('stroke') || userMessageLower.includes('face is drooping') || userMessageLower.includes('slurred speech') || userMessageLower.includes('arm weakness')) {
    aiResponse = `Facial drooping, arm weakness, and slurred speech are critical signs of a stroke where every second matters. **This is a time-sensitive medical emergency. You must call 112 or 102 for an ambulance right now.**`;
}
 else if (userMessageLower.includes('cant breathe') || userMessageLower.includes('difficulty breathing') || userMessageLower.includes('gasping for air')) {
    aiResponse = `Any difficulty breathing requires immediate medical attention. **This is a medical emergency. Please call 112 or 102 for help immediately.**`;
}
else if (userMessageLower.includes('heavy bleeding') || userMessageLower.includes('bleeding wont stop')) {
    aiResponse = `Uncontrolled bleeding is a life-threatening emergency. If you can, apply firm, direct pressure to the wound with a clean cloth. **Call 112 or 102 for an ambulance immediately.**`;
}
 else if (userMessageLower.includes('seizure') || userMessageLower.includes('convulsion')) {
    aiResponse = `If someone is having a seizure, try to keep them safe by clearing the area around them of hard or sharp objects. Do not restrain them or put anything in their mouth. **This is a medical emergency. Call 112 or 102 for an ambulance immediately.**`;
}

else if (userMessageLower.includes('play') || userMessageLower.includes('game')) 
        { aiResponse = `Wow nice Your Mood is like Energetic but I can't Play Game, But you ask me about your Health.`; }
        else if (userMessageLower.includes('living') || userMessageLower.includes('living')) 
        { aiResponse = `Iam not do so much think only and only tells answer of your stupid Questions`; }
        else if (userMessageLower.includes('become') || userMessageLower.includes('your future')) {
            aiResponse = `I hope to become even smarter and more helpful! I'm constantly learning new things to better assist you on your health journey.`;} 
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
    
