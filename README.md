# SkillStack

> An all-in-one study management tool for ambitious, curious students.

## Overview

Tracking your studying usually means juggling several apps: one for a Pomodoro timer, one for a to-do list, another to log your hours. SkillStack puts all of that in one place. It combines a Pomodoro timer, study-time logging, automatic analysis of your study data, and a personal AI coach powered by Gemini.

SkillStack turns clutter into clean.

## Features

### Available now
- **Accounts:** register, log in, log out
- **Dashboard:** time studied today, time studied this week, and your top subject this week
- **Study tracking:** log study sessions by subject, manually or with the Pomodoro timer
- **AI Coach:** a chat-style, high-energy motivational coach

### Planned / in progress
- **Goals:** set and track study goals
- **User preferences:** personalize how the AI Coach talks to you

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Django 6.1 |
| Database | SQLite (development) |
| Frontend | Django templates with browser-based React |
| AI | Google Gemini (`google-genai`) |

## Getting Started

### Prerequisites
- Python 3 (a version supported by Django 6.1)
- A Gemini API key, needed only for the AI Coach. Get one from [Google AI Studio](https://aistudio.google.com/).

### Installation
1. **Clone the repo:**
    ```bash
    git clone https://github.com/pkc0des/SkillStack.git
    cd SkillStack
    ```
2. **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate        # Windows: venv\Scripts\activate
    ```
3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4. **Set up your environment variables:** create a `.env` file in the project root:
    ```
    GEMINI_API_KEY=your-key-here
    SECRET_KEY=your-own-long-random-string
    DEBUG=True
    ```
    Generate a fresh secret key with:
    ```bash
    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
    ```
    > **Important:** `config/settings.py` currently hardcodes `SECRET_KEY` and `DEBUG`. Update it to read them from the environment with `os.getenv` (the same way it already reads `GEMINI_API_KEY`), so your secrets stay in `.env` and out of the code. Never commit `.env`, and set `DEBUG=False` (plus `ALLOWED_HOSTS`) before deploying anywhere public.
5. **Set up the database:**
    ```bash
    python manage.py migrate
    ```
6. **Create an admin account** (you'll need it to add subjects):
    ```bash
    python manage.py createsuperuser
    ```
7. **Start the server:**
    ```bash
    python manage.py runserver
    ```
    Then open http://127.0.0.1:8000/.

### Add your subjects
SkillStack doesn't come with any subjects. Add them before you log study time:
1. Go to http://127.0.0.1:8000/admin/ and sign in with your admin account.
2. Under **Study → Subjects**, add each subject you study, giving each a name and a color.

## Using SkillStack

### Pages

| Page | URL | What it does |
|------|-----|--------------|
| Home | `/` | Landing page |
| Register | `/register` | Create an account |
| Login | `/login` | Sign in and go to the dashboard |
| Dashboard | `/dashboard` | See your study stats for today and this week |
| Log Hours | `/log_hours` | Record a study session for a subject |
| Pomodoro | `/pomodoro` | Run a focus timer while you study |
| AI Coach | `/coach` | Chat with your Gemini-powered study coach |
| Logout | `/logout` | Sign out |

All pages except Home, Register, and Login require you to be signed in.

### Typical workflow
1. **Register** an account, then **log in**.
2. Study with the **Pomodoro** timer, or record time you've already studied on **Log Hours**.
3. Check the **Dashboard** to see your progress.
4. Open the **AI Coach** when you want motivation or study advice.

## Running Tests

```bash
python manage.py test
```
