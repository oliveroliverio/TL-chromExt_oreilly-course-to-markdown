

**ChatGPT:**

package this into a chrome extension where simply, if I click on the extension icon, it runs it, and the contents are automatically in the clipboard, have output that says, markdown copied or copy failed depending on output.  The icon will be this:  https://cdn.midjourney.com/4b374601-4475-4a57-8992-bed7827a5efa/0_0.png

---

**ChatGPT:**

Awesome! Here's a full Chrome Extension that does exactly what you described:

* Clicking the extension icon:

* Runs the content script on the current page.
* Expands collapsed sections.
* Extracts and filters course content.
* Copies Markdown to the clipboard.
* Shows a popup saying “Markdown copied” or “Copy failed.”




### 🧱 Project File Structure



```
markdown-extractor/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
└── icon.png
```




### 🔧 1. `manifest.json`



```
{
  "manifest_version": 3,
  "name": "Course Markdown Extractor",
  "version": "1.0",
  "description": "Extracts course structure into Markdown and copies to clipboard.",
  "permissions": ["scripting", "activeTab", "clipboardWrite"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "128": "icon.png"
  }
}
```




### ⚙️ 2. `background.js`



```
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
```




### 📋 3. `content.js`



```
(async function () {
  // Expand all collapsed sections
  document.querySelectorAll('h3.MuiAccordion-heading > button[aria-expanded="false"]')
    .forEach(e => e.click());

  // Wait 1s for content to render
  await new Promise(res => setTimeout(res, 1000));

  let markdownLines = [];

  const sections = document.querySelectorAll('.MuiPaper-root');

  sections.forEach(section => {
    const lines = section.innerText.split('\n').map(line => line.trim());

    lines.forEach((line, index) => {
      if (!line) return;
      if (/^\d+\s?(h|hr)?(\s?\d+)?m(\s?\d+s?)?$|^\d+m\s?\d*s$/i.test(line)) return;

      if (index === 0 && !line.startsWith('###')) {
        markdownLines.push(`## ${line}`);
      } else {
        markdownLines.push(`### ${line}`);
      }
    });
  });

  const markdownText = markdownLines.join('\n');

  try {
    await navigator.clipboard.writeText(markdownText);
    alert("✅ Markdown copied to clipboard!");
  } catch (err) {
    console.error("Clipboard write failed:", err);
    alert("❌ Failed to copy markdown.");
  }
})();
```




### 📜 4. `popup.html`


This is just to avoid “no popup found” errors. You can keep it simple:

```
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: sans-serif; padding: 10px; }
      #status { font-weight: bold; }
    </style>
  </head>
  <body>
    <div id="status">Click the icon to extract Markdown.</div>
    <script src="popup.js"></script>
  </body>
</html>
```




### 📦 5. `popup.js` (Optional – can be empty or enhance later)



```
// You could add logic here to detect last copy status
```




### 🖼 6. `icon.png`


Download and save the image from:
[https://cdn.midjourney.com/4b374601-4475-4a57-8992-bed7827a5efa/0_0.png](https://cdn.midjourney.com/4b374601-4475-4a57-8992-bed7827a5efa/0_0.png)
Save it as `icon.png` in your extension folder.


### 🚀 How to Load Your Extension



1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **"Load unpacked"** and select the `markdown-extractor` folder



Let me know if you want:

* A prettier status UI (toast popup)
* Automatic download of a `.md` file instead
* Export to Obsidian-compatible vault


I'm happy to enhance it for you!

---

