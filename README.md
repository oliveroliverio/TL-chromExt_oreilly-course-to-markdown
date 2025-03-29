Initial README

Original developement was done on Chrome browser in "development mode" under Sources tab where javascript snippets were tested.

ChatGPT conversation of developing a chrome extension converted to markdown.  This markdown will be used as source for Windsurf AI-assisted coding to build the extension.  

Prompt: `create a Chrome extension based on convo.md`

After running, go to chrome://extensions/ and load (load unpacked) the extension in "Developer mode".

Roadmap:
- Obtain transcripts from videos and send to Deepseek api for markdown summarization
- Create an SQL database (one table per course) with columns for course name (text), chapter name (text), section name (text), and markdown summary (markdown), transcript (text)