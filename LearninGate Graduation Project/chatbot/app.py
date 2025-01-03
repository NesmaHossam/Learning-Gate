import os
import requests
import streamlit as st

FOREFRONT_API_URL = "https://api.forefront.ai/v1/chat/completions"
FOREFRONT_API_KEY = "sk-MxPBpBYraxP3bFBSeliPRp5wJSZhkQwi"

def get_prompt(system_prompt: str, instruction: str):
    prompt = f"<s>[INST]System: {system_prompt}[/INST]</s> [INST]User: {instruction}[/INST]"
    return prompt

DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant, you will complete the task by following the instructions given."

def get_completion(prompt, system_prompt=DEFAULT_SYSTEM_PROMPT, temperature=0.0, max_tokens=800):
    messages = [{"role": "user", "content": get_prompt(system_prompt=system_prompt, instruction=prompt)}]
    
    payload = {
        "model": "alpindale/Mistral-7B-v0.2-hf",
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {FOREFRONT_API_KEY}"
    }
    
    response = requests.post(FOREFRONT_API_URL, headers=headers, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        assistant_content = data['choices'][0]['message']['content']
        return assistant_content
    else:
        st.error(f"Error: {response.status_code} - {response.text}")
        return "Sorry, I couldn't process that request."

if "messages" not in st.session_state:
    st.session_state.messages = []

def app_ui():
    favicon_path = os.path.join(os.path.dirname(__file__), 'images/favicon.ico')
    st.set_page_config(page_title="Learning Agent - Chatbot", page_icon=favicon_path)

    head_html = """
    <head>
    <title>Learning Agent - Chatbot</title>
    <style>
    body {
        background-color: white;
    }
    .navbarContainer {
        background-color: white;
        border-bottom: 1px solid #b8c1c6;
        padding: 10px;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navbar img {
        height: 80px;
        width: auto; 
        margin-right: 10px;
    }
    .navbar a {
        color: #080474;
        margin: 0 10px;
        text-decoration: none;
    }
    .navbar a:hover {
        color: #b6a168;
    }
    .chat-container {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
    }
    .chat-user, .chat-assistant {
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
    }
    .chat-user {
        background: #e1f5fe;
    }
    .chat-assistant {
        background: #e8eaf6;
    }
    </style>
    </head>
    """

    st.markdown(head_html, unsafe_allow_html=True)

    st.markdown("""
    <div class="navbarContainer">
        <div class="navbar">
            <a href="http://localhost:8501" target="_blank">
                <img src="https://www.upload.ee/image/16779275/logo.png" alt="Logo">
            </a>
            <div>
                <a href="http://localhost:3000">Home</a>
                <a href="http://localhost:3000/about">About Us</a>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    user_input = st.chat_input("What would you like to know?")
    if user_input:
        st.session_state.messages.append({"role": "user", "content": user_input})
        
        with st.chat_message("user"):
            st.markdown(user_input)
        
        bot_response = get_completion(user_input)
        
        with st.chat_message("assistant"):
            st.markdown(bot_response)
        
        st.session_state.messages.append({"role": "assistant", "content": bot_response})

if __name__ == "__main__":
    app_ui()
