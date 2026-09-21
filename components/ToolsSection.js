'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'product', name: 'PRODUCT & ANALYTICS' },
  { id: 'design', name: 'DESIGN' },
  { id: 'development', name: 'DEVELOPMENT' },
  { id: 'backend_db', name: 'BACKEND & DATABASE' },
  { id: 'infra', name: 'TOOLS & INFRASTRUCTURE' },
  { id: 'workflow', name: 'TOOLS & WORKFLOW' }
];

const TOOLS = [
  // PRODUCT & ANALYTICS
  {
    name: 'Google Analytics',
    category: 'product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F9AB00" fillOpacity="0.15" />
        <path d="M19 18V6a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm-6 0v-7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm-6 0v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" fill="#F9AB00" />
      </svg>
    )
  },
  {
    name: 'CleverTap',
    category: 'product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FF5A5F" fillOpacity="0.15" />
        <circle cx="12" cy="12" r="7" stroke="#FF5A5F" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.5" fill="#FF5A5F" />
      </svg>
    )
  },
  {
    name: 'AppsFlyer',
    category: 'product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00C853" fillOpacity="0.15" />
        <path d="M12 4L4 18h16L12 4zm0 4.5l4.5 7.5h-9L12 8.5z" fill="#00C853" />
      </svg>
    )
  },
  {
    name: 'Postman',
    category: 'product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FF6C37" fillOpacity="0.15" />
        <path d="M13.5 3a.5.5 0 0 0-.5.5v5H8a.5.5 0 0 0-.35.85l6.5 6.5a.5.5 0 0 0 .85-.35V10h5a.5.5 0 0 0 .35-.85l-6.5-6.5a.5.5 0 0 0-.35-.15z" fill="#FF6C37" />
        <circle cx="9" cy="16" r="3" fill="#FF6C37" />
      </svg>
    )
  },
  {
    name: 'SQL',
    category: 'product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00758F" fillOpacity="0.15" />
        <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke="#00758F" strokeWidth="1.8" />
        <path d="M5 6v5.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V6" stroke="#00758F" strokeWidth="1.8" />
        <path d="M5 11.5v5.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5.5" stroke="#00758F" strokeWidth="1.8" />
      </svg>
    )
  },

  // DESIGN
  {
    name: 'Figma',
    category: 'design',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2H8.5A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2z" fill="#F24E1E" />
        <path d="M12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9z" fill="#A259FF" />
        <path d="M5 19.5A3.5 3.5 0 0 0 8.5 23 3.5 3.5 0 0 0 12 19.5V16H8.5A3.5 3.5 0 0 0 5 19.5z" fill="#0ACF83" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
        <path d="M19 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" fill="#1ABCFE" />
      </svg>
    )
  },
  {
    name: 'Canva',
    category: 'design',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00C4CC" fillOpacity="0.15" />
        <circle cx="12" cy="12" r="7.5" stroke="#00C4CC" strokeWidth="2" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#00C4CC" />
      </svg>
    )
  },

  // DEVELOPMENT
  {
    name: 'Python',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M11.87 2c-4.4 0-4.13 1.9-4.13 1.9l.01 1.97h4.19v.6H6.01S2 6.01 2 10.42c0 4.41 3.5 4.25 3.5 4.25h1.2v-1.68s-.06-2.02 1.98-2.02h3.42s1.9.03 1.9-1.85V5.7s.29-3.7-4.13-3.7zm-2.28 1.23a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#3776AB" />
        <path d="M12.13 22c4.4 0 4.13-1.9 4.13-1.9l-.01-1.97h-4.19v-.6h5.93s4.01.46 4.01-3.95c0-4.41-3.5-4.25-3.5-4.25h-1.2v1.68s.06 2.02-1.98 2.02h-3.42s-1.9-.03-1.9 1.85v3.42s-.29 3.7 4.13 3.7zm2.28-1.23a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#E6A100" />
      </svg>
    )
  },
  {
    name: 'Java',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#E76F00" fillOpacity="0.15" />
        <path d="M8.851 18.56s-.917.534.612.653c2.051.157 3.407.13 5.923-.277 0 0 .54.347 1.077.585-2.613.882-6.529.702-8.318-.088 0 0-.61-.433.706-.873zm-1.02-2.585s-1.01.696.477.83c2.25.201 4.707.251 7.828-.27 0 0 .393.376.786.58-3.473.83-7.795.698-9.878-.17 0 0-.585-.568.787-.97zm8.384-3.833c.725.792.36 1.701.36 1.701s.44-.925-.386-1.745c-1.121-1.116-2.576-1.529-2.576-1.529s1.378.71 2.602 1.573zm-4.708-6.195s1.954 1.954-1.272 4.41c-2.484 1.89-1.144 3.01.218 4.253-1.396-.91-1.785-2.22-.612-3.187 1.48-1.222 2.766-1.786 1.666-5.476zm6.81 9.946s.502.586-.546 1.033c-2.124.908-6.994 1.182-9.761.03 0 0-.742-.393.633-.787 1.58-.452 4.093-.526 6.302-.452 2.21.075 3.372.176 3.372.176zm.542-1.92s.677.677-.732 1.258c-2.635 1.084-8.813 1.134-11.45.02 0 0-.853-.448.875-.928 2.062-.575 5.568-.62 8.411-.53 2.842.09 2.896.18 2.896.18z" fill="#E76F00" />
      </svg>
    )
  },
  {
    name: 'JavaScript',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M6.4 18.5c1.2 0 2-.6 2-1.8v-6.3h-2.1v6.3c0 .5-.3.8-.8.8-.4 0-.7-.2-.9-.5l-1.4.9c.7 1.1 1.8 1.6 3.2 1.6zm8.8 0c2.4 0 3.8-1.3 3.8-3.2 0-1.8-1.1-2.6-2.8-3.1l-.6-.2c-.8-.2-1.2-.5-1.2-1 0-.5.4-.8 1.1-.8.8 0 1.4.3 1.8 1l1.4-.9c-.7-1.1-1.8-1.6-3.2-1.6-2.2 0-3.6 1.2-3.6 3 0 1.7 1 2.5 2.7 3l.6.2c.9.3 1.4.6 1.4 1.1 0 .6-.5.9-1.3.9-.9 0-1.7-.4-2.2-1.2l-1.4.9c.8 1.4 2.1 2 3.8 2z" fill="#000000" />
      </svg>
    )
  },
  {
    name: 'HTML',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#E34F26" fillOpacity="0.15" />
        <path d="M3 2h18l-1.6 18-7.4 2.1-7.4-2.1L3 2zm6 8.3h6.4l-.3 3.3-3.1.9-3.1-.9-.2-2.3H6.4l.4 4.7 5.2 1.4 5.2-1.4.7-7.9H9l-.3-2.6h9.1L18.1 4.7H6l.7 8.3H9v-2.7z" fill="#E34F26" />
      </svg>
    )
  },
  {
    name: 'CSS',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1572B6" fillOpacity="0.15" />
        <path d="M3 2h18l-1.6 18-7.4 2.1-7.4-2.1L3 2zm6 8.3h6.4l-.3 3.3-3.1.9-3.1-.9-.2-2.3H6.4l.4 4.7 5.2 1.4 5.2-1.4.7-7.9H9l-.3-2.6h9.1L18.1 4.7H6l.7 8.3H9v-2.7z" fill="#1572B6" />
      </svg>
    )
  },
  {
    name: 'React Native',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0088CC" fillOpacity="0.15" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" stroke="#0088CC" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(150 12 12)" stroke="#0088CC" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1.5" fill="#0088CC" />
      </svg>
    )
  },
  {
    name: 'Flutter',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#02569B" fillOpacity="0.15" />
        <path d="M14.5 2L5 11.5l3 3L17.5 5h-3z" fill="#02569B" />
        <path d="M14.5 12.5L9.5 17.5l3 3 8-8h-6z" fill="#0175C2" />
        <path d="M11 16l3.5-3.5 3.5 3.5-3.5 3.5L11 16z" fill="#02569B" />
        <path d="M14.5 12.5L11 16l3.5 3.5L18 16l-3.5-3.5z" fill="#0175C2" />
      </svg>
    )
  },
  {
    name: 'Golang',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ADD8" fillOpacity="0.15" />
        <path d="M1.8 11.2c0-2.3 1.9-4.2 4.2-4.2 1.8 0 3.3 1.2 3.9 2.8H8.1c-.4-.9-1.2-1.5-2.1-1.5-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c1 0 1.8-.6 2.2-1.5H6v-1.3h4.2v2.8C9.4 16 7.8 17.2 6 17.2c-2.3 0-4.2-1.9-4.2-4.2zm11 0c0-2.3 1.9-4.2 4.2-4.2s4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2-4.2-1.9-4.2-4.2zm6.7 0c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5z" fill="#00ADD8" />
      </svg>
    )
  },
  {
    name: 'Flask',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.1" />
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" stroke="#660005" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="8" y1="14" x2="16" y2="14" stroke="#660005" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    name: 'Django',
    category: 'development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#092E20" />
        <path d="M12.5 5.5h2v13h-2v-2.3c-.6.9-1.5 1.5-2.7 1.5-2.2 0-3.8-1.7-3.8-4.2s1.6-4.2 3.8-4.2c1.2 0 2.1.6 2.7 1.5V5.5zm-2.2 5.5c-1.3 0-2.2.9-2.2 2.5s.9 2.5 2.2 2.5 2.2-.9 2.2-2.5-.9-2.5-2.2-2.5z" fill="#44B78B" />
      </svg>
    )
  },

  // BACKEND & DATABASE
  {
    name: 'REST APIs',
    category: 'backend_db',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.12" />
        <path d="M4 12h16M16 6l4 6-4 6M8 18l-4-6 4-6" stroke="#660005" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'MySQL',
    category: 'backend_db',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00758F" fillOpacity="0.15" />
        <path d="M18.8 10.4c-.4-.5-1.2-.6-1.7-.2l-2.6 2.1-1.3-3.6c-.2-.6-.9-.9-1.5-.7-.4.1-.7.5-.8.9L9.7 13l-1.6-2.2c-.4-.5-1.1-.6-1.6-.3s-.6 1.1-.3 1.6l2.5 3.5c.3.4.8.6 1.3.5.5-.1.9-.5 1.1-1l1.1-3.2 2 5.5c.2.5.7.8 1.2.8h.2c.5-.2.8-.6.9-1.1l1.6-4.9.4.4c.5.4 1.2.3 1.6-.2.4-.4.3-1.1-.2-1.6z" fill="#00758F" />
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'backend_db',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#336791" fillOpacity="0.15" />
        <path d="M12 3c-4.4 0-8 3.6-8 8 0 3.3 2 6.2 4.9 7.4.4.1.6-.2.6-.4v-1.5c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.9-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.3.9.7-.2 1.4-.3 2.1-.3s1.5.1 2.1.3c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 1.9.1 2.1.6.6.9 1.3.9 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4C20 17.2 22 14.3 22 11c0-4.4-3.6-8-10-8z" fill="#336791" />
      </svg>
    )
  },
  {
    name: 'Firebase',
    category: 'backend_db',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FFCA28" fillOpacity="0.15" />
        <path d="M4.8 17.6l2.3-14.3a.5.5 0 0 1 .9-.2l3.1 5.9-6.3 8.6zm13.9 0L14.4 7.2a.5.5 0 0 0-.9 0L3.1 17.6l8.3 4.7a1 1 0 0 0 1 0l6.3-4.7zm-6.2-7.5l-2.1-4a.5.5 0 0 0-.9 0L7.8 9.5l4.7 2.6 0-1.6z" fill="#FFCA28" />
      </svg>
    )
  },
  {
    name: 'Supabase',
    category: 'backend_db',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3ECF8E" fillOpacity="0.15" />
        <path d="M13.4 2.5a.8.8 0 0 0-1.4.6v7.4H3.8a.8.8 0 0 0-.6 1.3l8 9.7a.8.8 0 0 0 1.4-.6v-7.4h8.2a.8.8 0 0 0 .6-1.3l-8-9.7z" fill="#3ECF8E" />
      </svg>
    )
  },

  // TOOLS & INFRASTRUCTURE
  {
    name: 'Git',
    category: 'infra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F05032" fillOpacity="0.15" />
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38.006 1.815.44.435.436.657 1.17.44 1.815l2.67 2.67c.644-.217 1.38.005 1.814.44.604.604.604 1.582 0 2.187a1.547 1.547 0 01-2.187 0 1.54 1.54 0 01-.44-1.814l-2.502-2.502v6.236c.216.082.417.214.577.375.604.604.604 1.582 0 2.187a1.547 1.547 0 01-2.188 0 1.547 1.547 0 010-2.187c.162-.16.363-.293.578-.375V9.458a1.55 1.55 0 01-.845-.44 1.548 1.548 0 010-2.188c.162-.16.363-.292.578-.375L8.27 3.96 1.05 11.18c-.603.604-.603 1.582 0 2.187l10.48 10.478c.604.604 1.582.604 2.187 0l10.48-10.479c.603-.604.603-1.582 0-2.187z" fill="#F05032" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    category: 'infra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.1" />
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#660005" />
      </svg>
    )
  },
  {
    name: 'AWS',
    category: 'infra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FF9900" fillOpacity="0.15" />
        <path d="M12.7 15.5c-2.4 1.8-5.9 2.7-8.9 2.7-4.2 0-8-1.5-10.8-4.1-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 2.6 2.4 6.2 3.8 10.1 3.8 2.8 0 6.1-.8 8.4-2.5.2-.2.6-.1.7.2.1.2 0 .5-.2.6zM22.8 16.2c-.3.4-1.8.8-2.6 1-.3 0-.6-.2-.5-.4.3-.8.9-2.2.9-2.2.1-.2.3-.3.5-.2.2.1.3.3.2.5-.1.3-.4 1.1-.4 1.1s.8-.3 1.3-.5c.2-.1.5 0 .6.2.1.2 0 .4-.2.5z" fill="#FF9900" />
      </svg>
    )
  },
  {
    name: 'Vercel',
    category: 'infra',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.1" />
        <path d="M12 4L22 20H2L12 4z" fill="#660005" />
      </svg>
    )
  },

  // TOOLS & WORKFLOW
  {
    name: 'VS Code',
    category: 'workflow',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#007ACC" fillOpacity="0.15" />
        <path d="M17.5 2.8l-8 7.3-4.2-3.3L3.8 8.1l3.5 3.9-3.5 3.9 1.5 1.3 4.2-3.3 8 7.3 2.7-1.3V4.1l-2.7-1.3zm0 4v10.4l-5.6-5.2 5.6-5.2z" fill="#007ACC" />
      </svg>
    )
  },
  {
    name: 'Cursor',
    category: 'workflow',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.1" />
        <path d="M5.5 3.5L18.5 12L12.5 14L9.5 20.5L5.5 3.5Z" fill="#660005" stroke="#660005" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'Antigravity',
    category: 'workflow',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#660005" fillOpacity="0.15" />
        <path d="M12 3L4 9v6l8 6 8-6V9l-8-6zm0 2.5L18 10l-6 4.5L6 10l6-4.5zM6 11.8l5 3.7v5l-5-3.7v-5zm12 0v5l-5 3.7v-5l5-3.7z" fill="#660005" />
      </svg>
    )
  },
  {
    name: 'Google Stitch',
    category: 'workflow',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#4285F4" fillOpacity="0.15" />
        <circle cx="12" cy="12" r="7" stroke="#4285F4" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="#EA4335" />
      </svg>
    )
  },
  {
    name: 'Relume',
    category: 'workflow',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#6366F1" fillOpacity="0.15" />
        <path d="M6 6h12v4H6V6zm0 8h12v4H6v-4z" fill="#6366F1" />
        <path d="M6 10h6v4H6v-4z" fill="#818CF8" />
      </svg>
    )
  }
];

import ToolMarquee from './ToolMarquee';
import BackgroundWatermark from './BackgroundWatermark';

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState('product');

  const filteredTools = TOOLS.filter(tool => tool.category === activeCategory);

  const getCategoryCount = (catId) => {
    return TOOLS.filter(t => t.category === catId).length;
  };

  return (
    <section id="skills" className="tools-section" data-color="#F2D9DA">
      {/* Giant Tiled Background Typography Watermark */}
      <BackgroundWatermark word="TOOLS" color="rgba(102, 0, 5, 0.065)" />

      <div className="tools-container">
        {/* HORIZONTAL TOOL LOGOS MARQUEE TICKER ABOVE SECTION HEADING */}
        <ToolMarquee />

        {/* SECTION HEADER */}
        <div className="tools-header">
          <div className="eyebrow-row font-mono">
            <span className="eyebrow-dot" />
            <span className="eyebrow">TOOLS I USE</span>
          </div>
          <h2 className="section-title font-mono">Tools & Skillset</h2>
          <p className="section-subtitle font-sans">
            “A curated library of product, design, and engineering tools I use to craft digital experiences.”
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="filter-row font-mono">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${isActive ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
                <span className="count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* TOOLS GRID */}
        <div className="tools-grid">
          {filteredTools.map((tool, idx) => (
            <div key={idx} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <span className="tool-name font-sans">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tools-section {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: transparent;
          padding: 5.5rem 0;
          color: #660005;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .tools-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1680px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        .tools-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.75rem;
        }

        .eyebrow-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #660005;
          display: inline-block;
        }

        .eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: #660005;
          font-weight: 600;
        }

        .section-title {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 700;
          color: #660005;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #660005;
          max-width: 600px;
          line-height: 1.5;
          font-style: normal;
          font-weight: 400;
        }

        /* FILTER TABS ROW */
        .filter-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.1rem;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.2);
          border-radius: 6px;
          color: #660005;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: #660005;
          color: #660005;
        }

        .filter-btn.active {
          background: #660005;
          border-color: #660005;
          color: #FAF4D4;
          font-weight: 700;
        }

        .count-badge {
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          background: rgba(102, 0, 5, 0.1);
          border-radius: 4px;
          color: #660005;
        }

        .filter-btn.active .count-badge {
          background: #FAF4D4;
          color: #660005;
          font-weight: 700;
        }

        /* TOOLS 4-COLUMN GRID */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .tool-card {
          position: relative;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.18);
          border-radius: 8px;
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .tool-card:hover {
          transform: translateY(-2px);
          border-color: #660005;
          box-shadow: 0 8px 24px rgba(102, 0, 5, 0.15);
        }

        .tool-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .tool-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #660005;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .tools-container {
            padding: 0 2rem;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .tools-container {
            padding: 0 1.5rem;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .filter-row {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.55rem 0.85rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
}

