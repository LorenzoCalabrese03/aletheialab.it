from fastapi import FastAPI, Query
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
DATA_DIR = "data"

@app.get("/api/getJSON")
def get_json(item: str = Query("all", enum=["InfoTeam", "InfoLab", "all"])):
    if item == "InfoTeam":
        return {"infoTeam": parse_info_team()}
    elif item == "InfoLab":
        return {"infoLab": parse_info_lab()}
    else:
        return {
            "infoTeam": parse_info_team(),
            "infoLab": parse_info_lab()
        }


# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # o ["*"] per test
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_info_team():
    return load_json_file(os.path.join(DATA_DIR, "InfoTeam.json"))

def parse_info_lab():
    return load_json_file(os.path.join(DATA_DIR, "InfoLab.json"))

def load_json_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}
