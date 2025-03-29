Initial README

Original developement was done on Chrome browser in "development mode" under Sources tab where javascript snippets were tested.

ChatGPT conversation of developing a chrome extension converted to markdown.  This markdown will be used as source for Windsurf AI-assisted coding to build the extension.  

Prompt: `create a Chrome extension based on convo.md`

After running, go to chrome://extensions/ and load (load unpacked) the extension in "Developer mode".

Roadmap:
- Obtain transcripts from videos and send to Deepseek api for markdown summarization
- Create an SQL database (one table per course) with columns for course name (text), chapter name (text), section name (text), and markdown summary (markdown), transcript (text)


---
# Original js code
to run in Sources tab of Chrome browser to extract markdown from oreilly course

```js
(function () {
  // Expand all collapsed sections
  document.querySelectorAll('h3.MuiAccordion-heading > button[aria-expanded="false"]')
    .forEach(e => e.click());

  // Wait 1 second to let content load
  setTimeout(() => {
    console.log('Elements should now be visible');

    let markdownLines = [];

    const sections = document.querySelectorAll('.MuiPaper-root');

    sections.forEach(section => {
      const lines = section.innerText.split('\n').map(line => line.trim());

      lines.forEach((line, index) => {
        if (!line) return;

        // Skip durations like "1h 5m", "4m 40s", "10m 13s"
        if (/^\d+\s?(h|hr)?(\s?\d+)?m(\s?\d+s?)?$|^\d+m\s?\d*s$/i.test(line)) return;

        if (index === 0 && !line.startsWith('###')) {
          markdownLines.push(`## ${line}`);
        } else {
          markdownLines.push(`### ${line}`);
        }
      });
    });

    const markdownText = markdownLines.join('\n');
    console.log(markdownText);

    // Wait 3 seconds for you to focus the browser, then copy
    setTimeout(() => {
      navigator.clipboard.writeText(markdownText)
        .then(() => {
          console.log('✅ Markdown copied to clipboard!');
        })
        .catch(err => {
          console.error('❌ Failed to copy to clipboard:', err);
        });
    }, 3000);

  }, 1000);
})();

```