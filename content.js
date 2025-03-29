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
      if (/^\d+\s?(h|hr)?(\s?\d+)?m(\s?\d+s?)?$|^\d+m\s?\d*s$/i.test(line)) return; // Skip time indicators

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
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.background = '#4CAF50';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.textContent = "✅ Markdown copied to clipboard!";
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
    
  } catch (err) {
    console.error("Clipboard write failed:", err);
    
    // Create error notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.background = '#F44336';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.textContent = "❌ Failed to copy markdown.";
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
})();
