# AI Usage Breakdown

**Now that V1 of SkillStack is done, it's time to detail how I used AI for debugging and explaining new concepts**

## My EXACT Prompt & How AI Interpreted It
"**i gotta learn it myself**"
Claude's interpretation: "Don't hand the user full code snippets/solutions. Explain the concept, name the relevant Django feature/function, and point to where it goes; let them write it.

Why: User is building SkillStack to learn Django themselves.

How to apply: Default to hints and explanations. Tiny API-name references (e.g. messages.error) are fine; multi-line solutions aren't unless they explicitly ask for code."

## The Breakdown

- Explaining syntax that I haven't seen before
- Debugging features that are complicated for me
    -  Tracking Pomodoro pauses in local storage and some of the minor bugs that came with it
- Providing explanations and good practice
    - Explaining what operations between various types of dates result in
-  General purpose debugging for things that I struggled to figure out

In my opinion, I didn't really use much AI on this project! For the most part, I only needed it when I crossed a problem that I didn't have the tools(syntax) to answer, and of course some of the logic in the pomodoro timer.

## What's next?
I want to make SkillStack more useable for high school students by allowing a variety of custom subjects!

