from fastapi import FastAPI
from pydantic import BaseModel
import openai

openai.api_key = "YOUR_OPENAI_API_KEY"

app = FastAPI()

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask_ai(q: Question):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": q.question}]
    )
    return {"answer": response.choices[0].message.content}