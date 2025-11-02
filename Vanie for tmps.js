<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VANIE - Virtual Assistant of Neural Integrated Engine</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-primary: #f0f4f8;
            --bg-secondary: #ffffff;
            --bg-chat: #e7eff7;
            --text-primary: #1a202c;
            --text-secondary: #4a5568;
            --accent: #2c5282;
            --user-msg: #dbeafe;
            --bot-msg: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --border-color: #e2e8f0;
            --hover-bg: #f7fafc;
            --base-font-size: 14px;
            --display-font: 'Orbitron', sans-serif;
            --body-font: 'Roboto Mono', monospace;
        }

        [data-theme="dark"] {
            --bg-primary: #0f0a1c;
            --bg-secondary: #1a152e;
            --bg-chat: #130d22;
            --text-primary: #e9d8fd;
            --text-secondary: #a0aec0;
            --accent: #9f7aea;
            --user-msg: #4c2f97;
            --bot-msg: #2a2046;
            --shadow-color: rgba(159, 122, 234, 0.15);
            --border-color: #2d2350;
            --hover-bg: #211c33;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        font-family: var(--body-font);
        }

        body {
            background: var(--bg-primary);
            color: var(--text-primary);
            height: 100vh;
            display: flex;
            transition: all 0.5s ease-in-out;
            overflow: hidden;
            position: relative;
        }

        ::-webkit-scrollbar { 
            width: 6px; 
        }
        
        ::-webkit-scrollbar-track { 
            background: var(--bg-primary); 
        }
        
        ::-webkit-scrollbar-thumb { 
            background: var(--accent); 
            border-radius: 10px; 
        }

        .moving-bg-element {
            position: absolute;
            width: 300px;
            height: 300px;
            background: var(--accent);
            opacity: 0.05;
            filter: blur(80px);
            border-radius: 50%;
            animation: moveElement 25s infinite alternate ease-in-out;
            pointer-events: none;
            z-index: 0;
        }

        .moving-bg-element:nth-child(1) { 
            top: 10%; 
            left: 10%; 
            animation-delay: 0s; 
        }
        
        .moving-bg-element:nth-child(2) { 
            bottom: 5%; 
            right: 15%; 
            animation-delay: 5s; 
        }
        
        .moving-bg-element:nth-child(3) { 
            top: 50%; 
            left: 45%; 
            animation-delay: 10s; 
        }
        
        @keyframes moveElement {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(100px, 150px) scale(1.1); }
            100% { transform: translate(-50px, -80px) scale(0.9); }
        }

        .app-wrapper {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        [data-theme="dark"] .app-wrapper {
            background: rgba(26, 21, 46, 0.8);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(159, 122, 234, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }

        .header {
            background: var(--bg-secondary);
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 12px var(--shadow-color);
            z-index: 10;
            transition: background 0.5s;
        }

        [data-theme="dark"] .header {
        background: transparent;
        }

        .header-left {
         display: flex;
            align-items: center;
        }

        .bot-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent), #667eea);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 18px;
            flex-shrink: 0;
            box-shadow: 0 4px 10px var(--shadow-color);
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .bot-avatar::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            animation: pulse 2s infinite;
        }

        .bot-avatar i {
            z-index: 1;
        }

        .bot-info {
         padding-left: 15px;
            flex: 1;
        }

        .bot-info h2 {
            font-family: var(--display-font);
            font-weight: 800;
            font-size: 24px;
            letter-spacing: 2px;
            background: linear-gradient(90deg, var(--accent), #667eea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2px;
        }

        .bot-status {
            font-size: 13px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 400;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #48bb78;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { 
                box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7); 
            }
            70% { 
                box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); 
            }
        }

        .header-actions {
            display: flex;
            gap: 8px;
        }

        .icon-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 10px;
            border-radius: 50%;
            transition: all 0.3s;
            font-size: 18px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon-btn:hover {
            background: var(--hover-bg);
            color: var(--accent);
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 4px 8px var(--shadow-color);
        }
        
        .icon-btn:active {
            transform: scale(0.95);
        }

        .chat-container {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 25px 5%;
            background: var(--bg-chat);
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .welcome-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 60px 20px;
            gap: 24px;
            animation: fadeIn 0.8s ease-out;
        }

        .welcome-screen.hidden {
            display: none;
        }

        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }

        .welcome-icon {
            font-size: 80px;
            color: var(--accent);
            animation: neonGlow 2s infinite alternate ease-in-out;
            filter: drop-shadow(0 0 10px var(--accent));
        }

        @keyframes neonGlow {
            from {
                text-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent);
            }
            to {
                text-shadow: 0 0 20px var(--accent), 0 0 30px #667eea;
            }
        }

        .message-wrapper {
            display: flex;
            margin-bottom: 15px;
            opacity: 0;
            transform: translateY(20px);
            animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }

        .message-wrapper.user { 
            justify-content: flex-end; 
        }

        .message { 
            max-width: 75%; 
        }

        .message-content {
            padding: 14px 18px;
            border-radius: 20px;
            line-height: 1.6;
            font-size: var(--base-font-size);
            box-shadow: 0 4px 12px var(--shadow-color);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
            position: relative;
        }
        
        .message-content:hover {
            box-shadow: 0 6px 18px var(--shadow-color);
        }

        .message.bot .message-content {
            background: var(--bot-msg);
            color: var(--text-primary);
            border-top-left-radius: 4px;
        }

        .message.user .message-content {
            background: var(--user-msg);
            color: var(--text-primary);
            border-top-right-radius: 4px;
        }

        .message-content pre {
            background: #1e1e1e;
            color: #48bb78;
            padding: 10px;
            border-radius: 8px;
            overflow-x: auto;
            margin-top: 10px;
            border: 1px solid var(--accent);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .message-content code {
            font-size: calc(var(--base-font-size) - 2px);
            white-space: pre-wrap;
            word-break: break-all;
        }

        .suggestions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-top: 20px;
            width: 100%;
            max-width: 800px;
        }

        .suggestion-card {
            text-align: left;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .suggestion-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px var(--shadow-color);
        }

        .input-container {
            padding: 12px 24px 18px;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 12px;
            align-items: flex-end;
            transition: background 0.5s;
        }

        [data-theme="dark"] .input-container {
            background: transparent;
        }

        .input-wrapper {
            flex: 1;
            display: flex;
            align-items: flex-end;
            background: var(--bg-primary);
            border: 2px solid var(--border-color);
            border-radius: 30px;
            padding: 8px 16px;
            transition: all 0.3s;
            box-shadow: 0 2px 8px var(--shadow-color);
        }

        .input-wrapper:focus-within {
            border-color: var(--accent);
            box-shadow: 0 4px 16px var(--shadow-color);
        }

        #messageInput {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            color: var(--text-primary);
            font-size: var(--base-font-size);
            resize: none;
            max-height: 100px;
            font-family: var(--body-font);
            line-height: 1.6;
            padding: 6px 8px;
        }
        
        .send-btn {
            background: var(--accent);
            border: none;
            color: white;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.3s;
            flex-shrink: 0;
            box-shadow: 0 4px 12px var(--shadow-color);
        }

        .send-btn:hover:not(:disabled) {
            transform: scale(1.05) translateY(-1px);
            box-shadow: 0 6px 16px var(--shadow-color);
        }
        
        .send-btn:disabled { 
            opacity: 0.5; 
            cursor: not-allowed; 
        }

        .scroll-btn {
            position: fixed;
            right: 24px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            color: var(--accent);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 12px var(--shadow-color);
            transition: all 0.3s;
            z-index: 5;
        }

        .scroll-btn.show { 
            display: flex; 
        }
        
        .scroll-btn:hover { 
            transform: scale(1.1); 
            background: var(--hover-bg); 
        }

        #scrollBottomBtn { 
            bottom: 90px; 
        }
        
        #scrollTopBtn { 
         bottom: 140px; 
        }

        .settings-modal {
            position: fixed;
            top: 0;
            right: 0;
            width: 320px;
            height: 100%;
            background: var(--bg-secondary);
            box-shadow: -6px 0 20px var(--shadow-color);
            transform: translateX(100%);
            transition: transform 0.5s;
            z-index: 100;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        [data-theme="dark"] .settings-modal {
            background: rgba(26, 21, 46, 0.9);
            backdrop-filter: blur(20px);
        }

        .settings-modal.open {
            transform: translateX(0);
        }

        .settings-header {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .settings-header h3 {
            font-size: 18px;
            font-weight: 600;
            color: var(--accent);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .settings-content {
            padding: 20px;
        }

        .setting-group {
            margin-bottom: 25px;
            padding: 15px;
            border-radius: 12px;
            background: var(--bg-chat);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid var(--border-color);
        }

        .setting-group h4 {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 15px;
            border-bottom: 1px dashed var(--border-color);
            padding-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
        }

        .setting-item label {
            font-size: calc(var(--base-font-size) - 1px);
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .switch input { 
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--text-secondary);
            transition: .4s;
            border-radius: 24px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: var(--accent);
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        .settings-select, 
        .settings-slider {
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            padding: 6px 10px;
            border-radius: 8px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--body-font);
            font-size: 12px;
        }
        
        .settings-select:hover, 
        .settings-slider:hover {
            border-color: var(--accent);
        }

        .settings-slider-value {
            font-size: 12px;
            font-weight: 500;
            color: var(--accent);
        }

        .settings-btn {
            background: var(--accent);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
            font-family: var(--body-font);
        }

        .settings-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px var(--shadow-color);
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
            display: none;
        }
        
        .modal-overlay.open {
            display: block;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            align-items: center;
        }

        .typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--text-secondary);
            animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) { 
            animation-delay: 0.2s; 
        }
        
        .typing-dot:nth-child(3) { 
            animation-delay: 0.4s; 
        }

        @keyframes typing { 
            0%, 60%, 100% { 
                transform: scale(0.8); 
                opacity: 0.5; 
            } 
            30% { 
                transform: scale(1.1); 
                opacity: 1; 
            } 
        }

        @media (max-width: 768px) {
            .settings-modal { 
                width: 100%; 
            }
            
            .chat-container { 
                padding: 15px; 
            }
            
            .message { 
                max-width: 85%; 
            }
            
            .scroll-btn { 
                right: 15px; 
                width: 40px; 
                height: 40px; 
            }
            
            #scrollBottomBtn { 
                bottom: 80px; 
            }
            
            #scrollTopBtn { 
                bottom: 125px; 
            }

            .bot-info h2 {
                font-size: 20px;
            }

            .suggestions {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body data-theme="dark">
    <div class="moving-bg-element"></div>
    <div class="moving-bg-element"></div>
    <div class="moving-bg-element"></div>

    <div class="app-wrapper" id="appWrapper">
        <div class="header">
            <div class="header-left">
                <div class="bot-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="bot-info">
                    <h2>VANIE</h2>
                    <div class="bot-status">
                        <span class="status-dot"></span>
                        <span id="statusText">Online</span>
                    </div>
                </div>
            </div>
            <div class="header-actions">
                <button class="icon-btn" id="accountBtn" title="Account / Login">
                    <i class="fas fa-user-circle"></i>
                </button>
                <button class="icon-btn" id="searchBtn" title="Search Chat">
                    <i class="fas fa-search"></i>
                </button>
                <button class="icon-btn" id="settingsBtn" title="Settings">
                    <i class="fas fa-cog"></i>
                </button>
                <button class="icon-btn" id="clearChat" title="Clear Chat">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>

        <div class="chat-container" id="chatContainer">
            <div class="welcome-screen" id="welcomeScreen">
                <div class="welcome-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <h1>Namaste! Main VANIE hoon</h1>
                <p style="color: var(--text-secondary); max-width: 500px;">
                    Main Virtual Assistant of Neural Integrated Engine hoon. Aapki har tarah ki madad karne ke liye taiyar hoon.
                </p>
                <div class="suggestions">
                    <div class="message-content bot suggestion-card" data-text="Quantum Computing ko simple language mein explain karo">
                        <span style="font-weight: 600; color: var(--accent);">
                            <i class="fas fa-flask"></i> Science
                        </span><br>
                        Quantum Computing kya hai?
                    </div>
                    <div class="message-content bot suggestion-card" data-text="Python mein QuickSort algorithm ka code likho">
                        <span style="font-weight: 600; color: var(--accent);">
                            <i class="fas fa-code"></i> Coding
                        </span><br>
                        QuickSort ka Python code
                    </div>
                    <div class="message-content bot suggestion-card" data-text="Gupta Samrajya ka itihas detail mein batao">
                        <span style="font-weight: 600; color: var(--accent);">
                            <i class="fas fa-book"></i> History
                        </span><br>
                        Gupta Samrajya ka itihas
                    </div>
                </div>
            </div>

            <div class="message-wrapper bot" id="typingWrapper" style="display: none;">
                <div class="message bot">
                    <div class="message-content">
                        <div class="typing-indicator">
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="scroll-btn" id="scrollTopBtn" title="Scroll to Top">
            <i class="fas fa-arrow-up"></i>
        </button>
        <button class="scroll-btn" id="scrollBottomBtn" title="Scroll to Bottom">
            <i class="fas fa-arrow-down"></i>
        </button>

        <div class="input-container">
            <div class="input-wrapper">
                <textarea 
                    id="messageInput" 
                    placeholder="VANIE se baat karein..." 
                    rows="1"
                ></textarea>
            </div>
            <button class="send-btn" id="sendBtn" disabled title="Send Message">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
    
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="settings-modal" id="settingsModal">
        <div class="settings-header">
            <h3>
                <i class="fas fa-cog"></i> Settings
            </h3>
            <button class="icon-btn" id="closeSettingsBtn">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="settings-content">
            <div class="setting-group">
                <h4><i class="fas fa-palette"></i> Appearance</h4>
                <div class="setting-item">
                    <label for="themeToggle">Dark Mode</label>
                    <label class="switch">
                        <input type="checkbox" id="themeToggle" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <label for="fontSize">Font Size</label>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="range" id="fontSize" min="12" max="18" value="14" step="1" class="settings-slider">
                        <span id="fontSizeValue" class="settings-slider-value">14px</span>
                    </div>
                </div>
            </div>
            
            <div class="setting-group">
                <h4><i class="fas fa-language"></i> Language</h4>
                <div class="setting-item">
                    <label for="languageSelect">Interface Language</label>
                    <select id="languageSelect" class="settings-select">
                        <option value="hi">Hindi</option>
                        <option value="en">English</option>
                        <option value="hi-en">Hinglish</option>
                    </select>
                </div>
            </div>

            <div class="setting-group">
                <h4><i class="fas fa-bell"></i> Notifications</h4>
                <div class="setting-item">
                    <label for="soundToggle">Sound Effects</label>
                    <label class="switch">
                        <input type="checkbox" id="soundToggle" checked>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="setting-group">
                <h4><i class="fas fa-download"></i> Data</h4>
                <div class="setting-item">
                    <label>Export Chat</label>
                    <button class="settings-btn" id="exportChat">
                        <i class="fas fa-file-export"></i> Export
                    </button>
                </div>
                <div class="setting-item">
                    <label>Clear History</label>
                    <button class="settings-btn" id="clearHistory" style="background: #e53e3e;">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const VANIE = {
            config: {
                name: 'VANIE',
                typingDelay: 1500,
                theme: 'dark',
                fontSize: 14,
                language: 'hi',
                soundEnabled: true
            },
            
            state: {
                messages: [],
                isTyping: false,
                conversationContext: [],
                isLoggedIn: false,
                userName: 'Guest'
            },

            knowledge: {
                greetings: ['hello', 'hi', 'namaste', 'hey', 'hola', 'kaise ho', 'how are you'],
                coding: ['code', 'program', 'algorithm', 'function', 'python', 'javascript', 'java', 'c++', 'c#', 'ruby', 'html', 'css'],
                science: ['science', 'physics', 'chemistry', 'biology', 'quantum', 'relativity', 'evolution'],
                history: ['history', 'war', 'empire', 'revolution', 'ancient', 'medieval', 'modern'],
                general: ['what is', 'who is', 'explain', 'tell me about', 'define']
            },      

            init() {
                this.cacheElements();
                this.bindEvents();
                this.loadSettings();
                this.updateFontSize();
                this.updateLanguage();
                this.showWelcomeScreen();
            },  knowledge: {
                greetings: ['hello', 'hi', 'namaste', 'hey', 'hola', 'kaise ho', 'how are you'],
                coding: ['code', 'program', 'algorithm', 'function', 'python', 'javascript', 'java', 'c++', 'debug', 'error'],
                science: ['science', 'quantum', 'physics', 'chemistry', 'biology', 'space', 'atom', 'theory'],
                history: ['history', 'empire', 'samrajya', 'king', 'raja', 'war', 'battle', 'ancient', 'itihas'],
                math: ['math', 'calculate', 'equation', 'formula', 'solve', 'ganit'],
                general: ['kya', 'kaise', 'kab', 'kahan', 'kaun', 'what', 'how', 'when', 'where', 'who']
            },

            responses: {
                greeting: [
                    "Namaste! Main VANIE hoon. Aapki kya madad kar sakti hoon?",
                    "Hello! VANIE yahaan haazir hai. Aapka sawal kya hai?",
                    "Namaste ji! Main aapki seva mein kaise madad kar sakti hoon?"
                ],
                
                coding: {
                    general: "Main coding mein aapki madad kar sakti hoon! Kripya apna specific sawal ya problem detail mein batayein.",
                    python: "Python ek powerful language hai! Aap mujhse koi bhi Python concept, algorithm ya code example maang sakte hain.",
                    algorithm: "Algorithms computer science ki backbone hain. Sorting, searching, ya koi specific algorithm ke baare mein janiye."
                },
                
                science: {
                    general: "Science fascinating hai! Physics, Chemistry, Biology - kis topic par janakari chahiye?",
                    quantum: "Quantum mechanics atoms aur subatomic particles ka study hai. Ye classical physics se bilkul alag hai.",
                    space: "Space exploration humanity ki sabse badi achievements mein se ek hai. Mars missions se leke black holes tak!"
                },
                
                history: {
                    general: "Itihas humein apne past se sikhata hai. Ancient civilizations se leke modern era tak, kya janana chahte hain?",
                    india: "Bharat ka itihas bahut samriddh hai - Indus Valley Civilization se leke modern India tak!",
                    gupta: "Gupta Samrajya (320-550 CE) India ka Golden Age tha. Science, math, art sabhi mein pragati hui."
                },
                
                math: "Mathematics logic aur patterns ka study hai. Addition se leke calculus tak, kya solve karna hai?",
                
                fallback: [
                    "Interesting sawal hai! Kya aap thoda aur detail de sakte hain?",
                    "Main samajh rahi hoon. Kripya apne sawal ko thoda elaborate karein.",
                    "Achha topic hai! Specific kya janana chahte hain iske baare mein?"
                ]
            },

            init() {
                this.loadSettings();
                this.loadChatHistory();
                this.setupEventListeners();
                this.sendInitialMessage();
            },

            loadSettings() {
                const saved = localStorage.getItem('vanieSettings');
                if (saved) {
                    const settings = JSON.parse(saved);
                    this.config = {...this.config, ...settings};
                }
                this.applySettings();
            },

            applySettings() {
                document.body.setAttribute('data-theme', this.config.theme);
                document.documentElement.style.setProperty('--base-font-size', `${this.config.fontSize}px`);
                
                document.getElementById('themeToggle').checked = this.config.theme === 'dark';
                document.getElementById('fontSize').value = this.config.fontSize;
                document.getElementById('fontSizeValue').textContent = `${this.config.fontSize}px`;
                document.getElementById('languageSelect').value = this.config.language;
                document.getElementById('soundToggle').checked = this.config.soundEnabled;
            },

            saveSettings() {
                localStorage.setItem('vanieSettings', JSON.stringify(this.config));
            },

            loadChatHistory() {
                const saved = localStorage.getItem('vanieChat');
                if (saved) {
                    this.state.messages = JSON.parse(saved);
                    this.renderMessages();
                }
            },

            saveChatHistory() {
                localStorage.setItem('vanieChat', JSON.stringify(this.state.messages));
            },

            toggleSettingsModal(open) {
                const modal = document.getElementById('settingsModal');
                const overlay = document.getElementById('modalOverlay');
                
                if (open) {
                    modal.classList.add('open');
                    overlay.classList.add('open');
                } else {
                    modal.classList.remove('open');
                    overlay.classList.remove('open');
                }
            },
            
            setupEventListeners() {
                const input = document.getElementById('messageInput');
                const sendBtn = document.getElementById('sendBtn');
                
                input.addEventListener('input', (e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    sendBtn.disabled = e.target.value.trim() === '';
                });

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });

                sendBtn.addEventListener('click', () => this.sendMessage());

                document.getElementById('settingsBtn').addEventListener('click', () => this.toggleSettingsModal(true));
                document.getElementById('closeSettingsBtn').addEventListener('click', () => this.toggleSettingsModal(false));
                document.getElementById('modalOverlay').addEventListener('click', () => this.toggleSettingsModal(false));

                document.getElementById('accountBtn').addEventListener('click', () => {
                    if (this.state.isLoggedIn) {
                        this.logout();
                    } else {
                        this.login();
                    }
                });
                
                document.getElementById('clearChat').addEventListener('click', () => {
                    if (confirm('Kya aap sach mein puri chat clear karna chahte hain?')) {
                        this.clearChat();
                    }
                });

                document.getElementById('clearHistory').addEventListener('click', () => {
                    if (confirm('Chat history permanently delete ho jayegi. Continue?')) {
                        this.clearChat();
                        this.toggleSettingsModal(false);
                    }
                });

                document.getElementById('searchBtn').addEventListener('click', () => {
                    const query = prompt('Chat mein kya search karna hai?');
                    if (query) this.searchChat(query);
                });

                document.getElementById('exportChat').addEventListener('click', () => {
                    this.exportChat();
                });

                document.getElementById('themeToggle').addEventListener('change', (e) => {
                    this.config.theme = e.target.checked ? 'dark' : 'light';
                    document.body.setAttribute('data-theme', this.config.theme);
                    this.saveSettings();
                });

                document.getElementById('fontSize').addEventListener('input', (e) => {
                    this.config.fontSize = e.target.value;
                    document.documentElement.style.setProperty('--base-font-size', `${e.target.value}px`);
                    document.getElementById('fontSizeValue').textContent = `${e.target.value}px`;
                    this.saveSettings();
                });

                document.getElementById('languageSelect').addEventListener('change', (e) => {
                    this.config.language = e.target.value;
                    this.saveSettings();
                });

                document.getElementById('soundToggle').addEventListener('change', (e) => {
                    this.config.soundEnabled = e.target.checked;
                    this.saveSettings();
                });

                document.getElementById('scrollTopBtn').addEventListener('click', () => {
                    document.getElementById('chatContainer').scrollTo({ top: 0, behavior: 'smooth' });
                });

                document.getElementById('scrollBottomBtn').addEventListener('click', () => {
                    this.scrollToBottom();
                });

                document.getElementById('chatContainer').addEventListener('scroll', this.handleScroll.bind(this));

                document.querySelectorAll('.suggestion-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const text = card.getAttribute('data-text');
                        document.getElementById('messageInput').value = text;
                        document.getElementById('messageInput').dispatchEvent(new Event('input'));
                        this.sendMessage();
                    });
                });
            },

            handleScroll() {
                const container = document.getElementById('chatContainer');
                const scrollTop = container.scrollTop;
                const scrollHeight = container.scrollHeight;
                const clientHeight = container.clientHeight;
                
                if (scrollHeight - scrollTop - clientHeight > 100) {
                    document.getElementById('scrollBottomBtn').classList.add('show');
                } else {
                    document.getElementById('scrollBottomBtn').classList.remove('show');
                }
                
                if (scrollTop > 200) {
                    document.getElementById('scrollTopBtn').classList.add('show');
                } else {
                    document.getElementById('scrollTopBtn').classList.remove('show');
                }
            },

            sendInitialMessage() {
                if (this.state.messages.length === 0) {
                    document.getElementById('welcomeScreen').classList.remove('hidden');
                    
                    setTimeout(() => {
                        const msg = "Namaste! 🙏 Main VANIE hoon - Virtual Assistant of Neural Integrated Engine. Main aapki har prakar ki madad ke liye haazir hoon. Coding, Science, History, Math - kuch bhi puchiye!";
                        this.addMessage(msg, 'bot');
                    }, 1000);
                } else {
                    document.getElementById('welcomeScreen').classList.add('hidden');
                }
            },

            async sendMessage() {
                const input = document.getElementById('messageInput');
                const text = input.value.trim();
                
                if (!text || this.state.isTyping) return;

                document.getElementById('welcomeScreen').classList.add('hidden');

                this.addMessage(text, 'user');
                this.state.conversationContext.push({role: 'user', text: text});

                input.value = '';
                input.style.height = 'auto';
                document.getElementById('sendBtn').disabled = true;

                this.showTyping();

                const response = await this.generateResponse(text);
                
                this.hideTyping();
                this.addMessage(response, 'bot');
                this.state.conversationContext.push({role: 'bot', text: response});

                if (this.state.conversationContext.length > 10) {
                    this.state.conversationContext = this.state.conversationContext.slice(-10);
                }
            },

            async generateResponse(userInput) {
                await new Promise(resolve => setTimeout(resolve, this.config.typingDelay));

                const input = userInput.toLowerCase();
                
                if (this.matchKeywords(input, this.knowledge.greetings)) {
                    return this.getRandomResponse(this.responses.greeting);
                }

                if (this.matchKeywords(input, this.knowledge.coding)) {
                    if (input.includes('python')) {
                        return this.responses.coding.python + " Kya aap koi specific Python code chahte hain?";
                    } else if (input.includes('algorithm')) {
                        return this.responses.coding.algorithm + " Kaunsa algorithm samajhna hai?";
                    } else if (input.includes('quicksort')) {
                        return this.getQuickSortExample();
                    } else if (input.includes('debug') || input.includes('error')) {
                        return "Debugging ka matlab hai code mein errors dhundhna. Apna error message batayein, main help karungi!";
                    }
                    return this.responses.coding.general;
                }

                if (this.matchKeywords(input, this.knowledge.science)) {
                    if (input.includes('quantum')) {
                        return this.responses.science.quantum + " Quantum computers normal computers se exponentially fast hain certain tasks ke liye.";
                    } else if (input.includes('space') || input.includes('mars')) {
                        return this.responses.science.space + " Recent mein NASA ne Mars par successfully rovers bheje hain.";
                    }
                    return this.responses.science.general;
                }

                if (this.matchKeywords(input, this.knowledge.history)) {
                    if (input.includes('gupta')) {
                        return this.responses.history.gupta + " Aryabhata aur Kalidasa jaise mahan scholars is era mein the.";
                    } else if (input.includes('india') || input.includes('bharat')) {
                        return this.responses.history.india + " Kaunsi period ke baare mein detail chahiye?";
                    }
                    return this.responses.history.general;
                }

                if (this.matchKeywords(input, this.knowledge.math)) {
                    return this.responses.math + " Kya aap koi specific problem solve karna chahte hain?";
                }

                if (input.includes('vanie') || input.includes('aap kaun') || input.includes('tumhara naam')) {
                    return "Main VANIE hoon - Virtual Assistant of Neural Integrated Engine. Mujhe advanced algorithms ke saath train kiya gaya hai taaki main aapke sawaalon ka best possible answer de sakun. Main coding, science, history, math aur bahut kuch mein madad kar sakti hoon!";
                }

                if (input.includes('kya kar sakti') || input.includes('capabilities')) {
                    return "Main bahut kuch kar sakti hoon! 💪\n• Complex coding problems solve karna\n• Scientific concepts explain karna\n• Historical events discuss karna\n• Mathematical calculations\n• General knowledge questions\n• Aur bhi bahut kuch! Bas puchiye.";
                }

                if (input.includes('thank') || input.includes('thanks') || input.includes('dhanyavaad') || input.includes('shukriya')) {
                    return "Aapka swagat hai! 😊 Koi aur sawal ho toh zaroor puchiye.";
                }

                return this.getRandomResponse(this.responses.fallback);
            },

            getQuickSortExample() {
                return `QuickSort ek efficient sorting algorithm hai!\n\n<strong>Python Code:</strong>\n<pre><code>def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\n# Example usage\narr = [64, 34, 25, 12, 22, 11, 90]\nprint(quicksort(arr))</code></pre>\n\n<strong>Time Complexity:</strong> O(n log n) average case\n<strong>Space Complexity:</strong> O(log n)`;
            },

            getBubbleSortExample() {
                return `Bubble Sort ek simple sorting algorithm hai!\n\n<strong>Python Code:</strong>\n<pre><code>def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# Example\narr = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(arr))</code></pre>\n\n<strong>Time Complexity:</strong> O(n²)\n<strong>Best Case:</strong> O(n) when already sorted`;
            },

            getMergeSortExample() {
                return `Merge Sort ek efficient divide-and-conquer algorithm hai!\n\n<strong>Python Code:</strong>\n<pre><code>def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    \n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result</code></pre>\n\n<strong>Time Complexity:</strong> O(n log n) - consistent\n<strong>Space Complexity:</strong> O(n)`;
            },

            getBinarySearchExample() {
                return `Binary Search ek efficient searching algorithm hai sorted arrays ke liye!\n\n<strong>Python Code:</strong>\n<pre><code>def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    \n    return -1  # Not found\n\n# Example\narr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nresult = binary_search(arr, 23)\nprint(f"Element found at index: {result}")</code></pre>\n\n<strong>Time Complexity:</strong> O(log n)\n<strong>Prerequisite:</strong> Array must be sorted`;
            },

            getLinkedListExample() {
                return `Linked List ek fundamental data structure hai!\n\n<strong>Python Code:</strong>\n<pre><code>class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def insert_at_beginning(self, data):\n        new_node = Node(data)\n        new_node.next = self.head\n        self.head = new_node\n    \n    def insert_at_end(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        \n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = new_node\n    \n    def display(self):\n        current = self.head\n        while current:\n            print(current.data, end=" -> ")\n            current = current.next\n        print("None")</code></pre>\n\n<strong>Operations:</strong> Insert: O(1) at head, O(n) at tail`;
            },

            getStackExample() {
                return `Stack ek LIFO (Last In First Out) data structure hai!\n\n<strong>Python Code:</strong>\n<pre><code>class Stack:\n    def __init__(self):\n        self.items = []\n    \n    def push(self, item):\n        self.items.append(item)\n    \n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n        return None\n    \n    def peek(self):\n        if not self.is_empty():\n            return self.items[-1]\n        return None\n    \n    def is_empty(self):\n        return len(self.items) == 0\n    \n    def size(self):\n        return len(self.items)\n\n# Example usage\nstack = Stack()\nstack.push(10)\nstack.push(20)\nstack.push(30)\nprint(stack.pop())  # Output: 30</code></pre>\n\n<strong>All operations:</strong> O(1) time complexity`;
            },

            getQueueExample() {
                return `Queue ek FIFO (First In First Out) data structure hai!\n\n<strong>Python Code:</strong>\n<pre><code>from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    \n    def enqueue(self, item):\n        self.items.append(item)\n    \n    def dequeue(self):\n        if not self.is_empty():\n            return self.items.popleft()\n        return None\n    \n    def front(self):\n        if not self.is_empty():\n            return self.items[0]\n        return None\n    \n    def is_empty(self):\n        return len(self.items) == 0\n    \n    def size(self):\n        return len(self.items)\n\n# Example\nqueue = Queue()\nqueue.enqueue(1)\nqueue.enqueue(2)\nqueue.enqueue(3)\nprint(queue.dequeue())  # Output: 1</code></pre>\n\n<strong>Operations:</strong> Enqueue & Dequeue - O(1)`;
            },

            getDFSExample() {
                return `DFS (Depth First Search) ek graph traversal algorithm hai!\n\n<strong>Python Code:</strong>\n<pre><code>def dfs_recursive(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    \n    visited.add(node)\n    print(node, end=' ')\n    \n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs_recursive(graph, neighbor, visited)\n    \n    return visited\n\ndef dfs_iterative(graph, start):\n    visited = set()\n    stack = [start]\n    \n    while stack:\n        node = stack.pop()\n        if node not in visited:\n            visited.add(node)\n            print(node, end=' ')\n            stack.extend(reversed(graph[node]))\n    \n    return visited\n\n# Example graph\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [],\n    'E': ['F'],\n    'F': []\n}\n\nprint("DFS Recursive:")\ndfs_recursive(graph, 'A')</code></pre>\n\n<strong>Time Complexity:</strong> O(V + E)\n<strong>Space Complexity:</strong> O(V)`;
            },

            getBFSExample() {
                return `BFS (Breadth First Search) level-wise traversal hai!\n\n<strong>Python Code:</strong>\n<pre><code>from collections import deque\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    visited.add(start)\n    \n    while queue:\n        node = queue.popleft()\n        print(node, end=' ')\n        \n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    \n    return visited\n\n# Example graph\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [],\n    'E': ['F'],\n    'F': []\n}\n\nprint("BFS Traversal:")\nbfs(graph, 'A')\n# Output: A B C D E F</code></pre>\n\n<strong>Time Complexity:</strong> O(V + E)\n<strong>Use Case:</strong> Shortest path in unweighted graphs`;
            },

            getDijkstraExample() {
                return `Dijkstra's Algorithm shortest path find karta hai!\n\n<strong>Python Code:</strong>\n<pre><code>import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    visited = set()\n    \n    while pq:\n        current_dist, current_node = heapq.heappop(pq)\n        \n        if current_node in visited:\n            continue\n        \n        visited.add(current_node)\n        \n        for neighbor, weight in graph[current_node].items():\n            distance = current_dist + weight\n            \n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(pq, (distance, neighbor))\n    \n    return distances\n\n# Example\ngraph = {\n    'A': {'B': 4, 'C': 2},\n    'B': {'C': 1, 'D': 5},\n    'C': {'D': 8, 'E': 10},\n    'D': {'E': 2},\n    'E': {}\n}\n\nprint(dijkstra(graph, 'A'))</code></pre>\n\n<strong>Time Complexity:</strong> O((V + E) log V) with heap\n<strong>Note:</strong> Works only with non-negative weights`;
            },

            matchKeywords(input, keywords) {
                return keywords.some(keyword => input.includes(keyword));
            },

            getRandomResponse(responses) {
                if (Array.isArray(responses)) {
                    return responses[Math.floor(Math.random() * responses.length)];
                }
                return responses;
            },

            login() {
                const username = prompt('Enter your username:');
                if (username && username.trim()) {
                    this.state.isLoggedIn = true;
                    this.state.userName = username.trim();
                    document.getElementById('accountBtn').title = `Logged in as ${this.state.userName} (Click to Logout)`;
                    this.showNotification(`Welcome back, ${this.state.userName}! 👋`);
                    this.updateStatus('Online');
                }
            },

            logout() {
                if (confirm('Are you sure you want to logout?')) {
                    this.state.isLoggedIn = false;
                    this.state.userName = 'Guest';
                    document.getElementById('accountBtn').title = 'Account / Login';
                    this.showNotification('Logged out successfully! 👋');
                    this.updateStatus('Online');
                }
            },

            updateStatus(status) {
                document.getElementById('statusText').textContent = status;
            },

            showTyping() {
                this.state.isTyping = true;
                document.getElementById('typingWrapper').style.display = 'flex';
                this.updateStatus('Thinking...');
                this.scrollToBottom();

                this.typingTimeout = setTimeout(() => {
                    this.updateStatus('Typing...');
                }, 800);
            },

            hideTyping() {
                this.state.isTyping = false;
                document.getElementById('typingWrapper').style.display = 'none';
                clearTimeout(this.typingTimeout);
                this.updateStatus('Online');
            },

            addMessage(text, sender) {
                const message = {
                    text: text,
                    sender: sender,
                    timestamp: new Date().toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })
                };

                this.state.messages.push(message);
                this.saveChatHistory();
                this.renderMessage(message);
                this.scrollToBottom();
            },

            renderMessages() {
                if (this.state.messages.length > 0) {
                    document.getElementById('welcomeScreen').classList.add('hidden');
                }

                this.state.messages.forEach(msg => this.renderMessage(msg));
                setTimeout(() => this.scrollToBottom(false), 100);
            },

            renderMessage(message) {
                const wrapper = document.createElement('div');
                wrapper.className = `message-wrapper ${message.sender}`;

                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${message.sender}`;

                const content = document.createElement('div');
                content.className = 'message-content';
                content.innerHTML = message.text;
                content.title = `Time: ${message.timestamp} | Double-click to copy`;

                content.addEventListener('dblclick', () => {
                    this.copyToClipboard(message.text.replace(/<[^>]*>/g, ''));
                });

                messageDiv.appendChild(content);
                wrapper.appendChild(messageDiv);

                const container = document.getElementById('chatContainer');
                const typing = document.getElementById('typingWrapper');
                container.insertBefore(wrapper, typing);
            },

            scrollToBottom(smooth = true) {
                setTimeout(() => {
                    const container = document.getElementById('chatContainer');
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: smooth ? 'smooth' : 'auto'
                    });
                }, 50);
            },

            clearChat() {
                this.state.messages = [];
                this.state.conversationContext = [];
                localStorage.removeItem('vanieChat');
                
                const messages = document.querySelectorAll('.chat-container > .message-wrapper');
                messages.forEach(msg => msg.remove());
                
                document.getElementById('welcomeScreen').classList.remove('hidden');
                this.sendInitialMessage();
            },

            searchChat(query) {
                const results = this.state.messages.filter(msg => 
                    msg.text.toLowerCase().includes(query.toLowerCase())
                );
                
                if (results.length > 0) {
                    alert(`${results.length} messages mile "${query}" ke saath:\n\n` + 
                        results.slice(0, 5).map(r => `• [${r.sender.toUpperCase()}] ${r.text.replace(/<[^>]*>/g, '').substring(0, 50)}${r.text.length > 50 ? '...' : ''}`).join('\n'));
                } else {
                    alert(`"${query}" ke liye koi message nahi mila.`);
                }
            },

            exportChat() {
                if (this.state.messages.length === 0) {
                    alert('Export karne ke liye koi messages nahi hain!');
                    return;
                }

                const chatText = this.state.messages.map(msg => 
                    `[${msg.timestamp}] ${msg.sender.toUpperCase()}: ${msg.text.replace(/<[^>]*>/g, '')}`
                ).join('\n\n');

                const blob = new Blob([chatText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `VANIE_Chat_${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                this.showNotification('Chat successfully export ho gayi! ✓');
            },

            copyToClipboard(text) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    this.showNotification('Message copied! ✓');
                } catch (err) {
                    console.error('Copy failed:', err);
                }
                
                document.body.removeChild(textarea);
            },

            showNotification(message) {
                if (document.querySelector('#globalNotification')) return;
                
                const notification = document.createElement('div');
                notification.id = 'globalNotification';
                notification.textContent = message;
                notification.style.cssText = `
                    position: fixed;
                    bottom: 120px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #48bb78;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 1000;
                    font-size: 14px;
                    animation: slideUp 0.3s ease-out;
                `;

                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.animation = 'slideDown 0.3s ease-out';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);

                if (!document.getElementById('notificationStyles')) {
                    const style = document.createElement('style');
                    style.id = 'notificationStyles';
                    style.textContent = `
                        @keyframes slideUp {
                            from { opacity: 0; transform: translate(-50%, 20px); }
                            to { opacity: 1; transform: translate(-50%, 0); }
                        }
                        @keyframes slideDown {
                            from { opacity: 1; transform: translate(-50%, 0); }
                            to { opacity: 0; transform: translate(-50%, 20px); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        };

        window.addEventListener('DOMContentLoaded', () => {
            VANIE.init();
        });
    </script>
</body>
</html>
