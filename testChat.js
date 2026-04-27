/*
 * Test file for VANIE AI Chat Backend System
 * This file can be used to test the chat functionality
 */

// Test function to verify the backend system works
function testChatBackend() {
    console.log('Testing VANIE AI Chat Backend System...');
    
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
        'random message that should trigger fallback'
    ];
    
    // Check if backend is loaded
    if (!window.chatBackend) {
        console.error('Backend system not loaded!');
        return false;
    }
    
    console.log('Backend system loaded successfully!');
    
    // Test each message
    testMessages.forEach((message, index) => {
        console.log(`\n--- Test ${index + 1}: "${message}" ---`);
        
        try {
            const response = window.chatBackend.processMessage(message);
            const category = window.chatBackend.detectCategory(message);
            const confidence = window.chatBackend.calculateConfidence(message);
            
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

// Test VANIE integration
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
