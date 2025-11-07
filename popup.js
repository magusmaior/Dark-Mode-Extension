document.getElementById("toggle").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const css = `
        html {
          filter: invert(1) hue-rotate(180deg);
        }
        img, video {
          filter: invert(1) hue-rotate(180deg);
        }
      `;

      const style = document.getElementById("dark-mode-style");
      if (style) {
        style.remove();
      } else {
        const s = document.createElement("style");
        s.id = "dark-mode-style";
        s.innerHTML = css;
        document.head.appendChild(s);
      }
    }
  });
});
