from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# CSS & JS serve karne ke liye
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/", response_class=HTMLResponse)
async def home():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()
from pydantic import BaseModel

class Question(BaseModel):
    question: str

@app.post("/ask")
async def ask_ai(data: Question):
    user_question = data.question
    return {
        "answer": f"You asked: {user_question}. AI answer coming soon 🚀"
    }
