from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Dict

app = FastAPI()

# Allow CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["frontend-production-fc16.up.railway.app"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for todo items
todos = ["buy milk", "buy eggs", "work on coding projects"]

@app.get("/")
def get_todos(input: Optional[str] = Query(None)):
    if input:
        # If an input query parameter is provided, filter todos
        filtered_todos = [todo for todo in todos if input.lower() in todo.lower()]
        return {
            "todos": filtered_todos,
            "input": input,
            "detail": []
        }
    
    # If no input is provided, return all todos
    return {
        "todos": todos,
        "input": None,
        "detail": []
    }

@app.post("/")
def add_todo(todo_item: Dict[str, str] = Body(...)):
    todos.append(todo_item["todo"])
    return {"message": "Todo added!", "todos": todos}