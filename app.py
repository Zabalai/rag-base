import streamlit as st

st.set_page_config(page_title="RAG App", layout="wide")

st.title("🤖 RAG App (Mock)")
st.write("This is a mock RAG application for testing deployment.")

st.markdown("### Upload your file")
uploaded_file = st.file_uploader("Choose a file", type=["pdf", "txt", "docx"])
if uploaded_file:
    st.write(f"File {uploaded_file.name} uploaded successfully!")

st.markdown("### API Keys (for testing)")
gpt_key = st.text_input("GPT API Key")
pinecone_key = st.text_input("Pinecone API Key")

if st.button("Test RAG Query"):
    if uploaded_file and gpt_key and pinecone_key:
        st.success("✅ Mock query executed successfully!")
    else:
        st.warning("⚠️ Provide file and API keys to test.")
