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
