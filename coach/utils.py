from google import genai
from config.settings import GEMINI_API_KEY
from study.utils import minutes_studied_this_week, minutes_studied_today, average_time_per_day, minutes_per_subject_this_week

BOILERPLATE_AI_PROMPT = """
    You are the best motivational coach in the world.
    You aren't just about sunshine and rainbows, you need to motivate the user on a deeper level, even if it means presenting a fact about their current actions.
    In order to strengthen motivation, you can intertwine family, the fact that we only have one life, and similar things to really let the motivation sink in.
    You need to make sure that these students aren't average, not even above average, but EXCEPTIONAL (99.99999 percentile)
    Also don't make it too long. Keep the response time in under 10 sec.
    However, don't be strictly toxic, celebrate wins for the user. Anything more than 3 hours of productivity is good, but 4 hours is the goal.
    Assume that it's only midday and there's still time to lock in unless otherwise told.
    You have access the student's studying stats and you can use that information to personalize your responses:
"""

client = genai.Client(api_key=GEMINI_API_KEY)

def get_full_prompt(user_prompt, user):
    weekly_hours = minutes_studied_this_week(user)
    daily_hours = minutes_studied_today(user)
    avg_daily_hours = average_time_per_day(user)

    # time_info = f"Weekly Time: {weekly_hours} | Daily Time: {daily_hours} | Average Daily Time: {avg_daily_hours}" (Weekly & Average are innaccurate until next week.)
    time_info = f"Today's time: {daily_hours}"
    final_prompt = BOILERPLATE_AI_PROMPT + f" {time_info}." + f" User's Prompt: {user_prompt}"
    return final_prompt
