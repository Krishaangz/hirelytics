# 🔍 HireLytics

**AI-Driven Resume & Portfolio Comparison Engine for Hiring Teams**

> Revolutionize your hiring process with **HireLytics** — a futuristic tool that uses advanced AI to help companies compare, evaluate, and hire the best talent faster than ever before.

---

## ✨ What is HireLytics?

**HireLytics** is a web-based platform where companies and hiring teams can:

* ✅ Create an organization and manage multiple projects.
* 📄 Upload paired applicant data (Resume/Portfolio PDF + Interview Character Sketch `.txt`).
* 🤖 Use AI to analyze, compare, and rank applicants.
* 📊 Get interactive analytics reports for each candidate.
* 🌐 Invite teammates with unique invite codes to collaborate.

---

## 🎯 Key Features

### 🧠 AI-Powered Comparison

* Analyze up to **20 applicants** per session.*
* Pair each applicant with their **Resume (PDF)** and **Character Sketch (TXT)**.
* AI ranks the **best-suited candidates** based on your company's criteria and insights from interviews.

### 📊 Visual Reports

* Generate beautiful, interactive reports showing strengths, weak points, alignment with company needs, and potential growth.
* Insightful candidate analytics at a glance.

### 🏢 Project-Centric Organization

* Organize hiring rounds by **projects** under your **organization**.
* Each project has its own applicant pool and team access.

### 🤝 Team Collaboration

* Invite users via a **code** from registered users to collaborate on projects.
* Real-time sync via local state (authStore.ts for now, Supabase later).

### 🎨 Customizable Themes

* Default color scheme: **Light Blue**, **Dark Blue**, with **Neon Blue** icons.
* Change colors anytime in **Account Settings → Appearance** using a built-in palette.

---

## 💰 Pricing Plans

| Plan      | Limitations                                                          | Price                            |
| --------- | -------------------------------------------------------------------- | -------------------------------- |
| **Hire∅** | Compare up to **5 people** at once, only **once every 7 days**       | Free Forever                     |
| **Hire+** | Compare up to **10 people** per session, **2x per week** (1/day max) | \$5/mo or \$50/year (save 17%)   |
| **Hire%** | Compare up to **20 people**, **5x per week** (2/day max)            | \$20/mo or \$200/year (save 17%) |

---

## 🛠 Tech Stack

* **Frontend**: React Native + Vite
* **Styling**: TailwindCSS, Lucide Icons
* **Motion/UI**: Framer Motion
* **Language**: TypeScript
* **Storage (Coming Soon)**: Supabase
* **Current State**: Stored locally in `authStore.ts`
* **AI API**: Free, unlimited PDF and text analysis (uses open source / no-cost models via wrappers)

---

## 📂 Data Flow

1. Create a Project in an organisation.
2. Upload paired files for each candidate:

   * **Resume or Portfolio** as `.pdf`
   * **Interview Sketch** as `.txt`
3. AI processes each pair distinctly (no mixing).
4. Generate top candidate recommendations based on data.
5. Download or share results with your team.

---

## 🔒 Privacy & Security

> HireLytics values data integrity. All uploaded documents are handled securely and remain private. In the future, Supabase will handle cloud-based storage with authentication and role-based access control.

---

## 🚀 Roadmap

* 🔜 Supabase Integration (Database + Auth + File Storage)
* 🔜 User roles and permissions
* 🔜 Admin dashboard for usage analytics
* 🔜 Team chat and feedback loops on candidate profiles
* 🔜 Plugin-based AI model selector for premium users

---

## 🧑‍🎨 Developed by

**Krishang Saharia**
\[📍 Bhilai, India]
Author of *Detective Kids Series* | Class 10 | Developer, Writer & Visionary

---

## 📌 Final Thoughts

> With **HireLytics**, we’re not just speeding up hiring—we’re elevating it to an art form.

---
