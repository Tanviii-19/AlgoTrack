@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-brand-primary: #0058bc;
  --color-brand-secondary: #006b5e;
}

/* Custom scrollbar for beautiful IDE look and feel */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Additional utility transitions */
.problem-row:hover {
  background-color: rgba(0, 88, 188, 0.03);
}

.dark .problem-row:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

