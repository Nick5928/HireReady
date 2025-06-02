const resumeReview = `**Resume Review and Scoring for Full Stack Java/React Developer - Post Trade Technology**
---

### 1. Skills Match (Score: 30/40)
#### Job Requirements vs Resume:
- **Core Java (2+ years):** Java is listed, but no substantial hands-on experience/projects with Java are highlighted. Most hands-on work is with JavaScript/React/Node.js and some Python.
- **TypeScript/React:** Strong hands-on React experience (React Native components and web with React for projects); TypeScript not explicitly mentioned.
- **Python:** Python is listed under languages, but projects/work listed do not mention Python.
- **SQL/RDBMS:** SQL listed; hands-on use of Supabase/PostgreSQL is evident.
- **Kafka:** Not mentioned or covered.
- **Docker:** Not mentioned.
- **Relevant financial technology exposure:** No direct financial industry/finance exposure shown.
- **Data Feeds/Integration:** Some integration experience with APIs (OpenWeather, Amadeus, Google Places), but not in a financial context.
- **Direct user engagement:** Project work and intern roles suggest collaboration, but not direct engagement with business users in finance.
- **Reusable UI components:** Developed React components, showing some match.

**Summary:** Solid React experience, some backend and integration skills, partial SQL experience, but lack of Java project depth, TypeScript specificity, and missing core stack experience like Kafka/Docker.
---

### 2. Education Requirements (Score: 15/15)
- **Requirement:** Bachelor’s in Computer Science or related field
- **Actual:** BS in Computer Science (in progress, Dec 2025)
- **Practical:** GPA is strong (3.64), relevant coursework in OOP, Data Structures, etc.
- **Shortfall:** Still a student, but meets typical early-career requirements.
---

### 3. Keywords (Score: 15/25)
- **Keywords that appear:** Java, SQL, React, Python, PostgreSQL, RESTful APIs, Agile, authentication, Jira, CI/CD, backend, data storage, integration, Node.js
- **Missing/limited or not strong:**
    - **Financial/Finance/Trading:** Not present.
    - **TypeScript:** Not mentioned—only JavaScript.
    - **Kafka, Docker, Oracle, SQL Server:** Not mentioned.
    - **Post-trade/Operations/Treasury/Compliance:** Not present.
    - **Direct business engagement:** Implied by Agile/team collab, but not with finance/operations/portfolio managers.

*Note:* Some strong terms (React, Java, SQL) appear, but components relevant to the financial context and specific technologies (Kafka/Docker/TypeScript) are lacking or weak.
---

### 4. Total Score: **60/100**
---

### Short Explanation
**Explanation:**
Nicholas has a solid academic foundation and good experience with React, SQL/PostgreSQL, and Agile practices, as well as full-stack app building and some backend. However, he lacks clear experience with Java (beyond being listed), TypeScript, Kafka, Docker, and—most notably—hands-on exposure to financial products or firm environments. Stronger alignment in Java project work, direct use of TypeScript, and familiarity with post-trade/finance or using Kafka/Docker would notably improve the fit. Financial business engagement and the listed stack pieces are significant shortfalls.

**Recommendation:**
If Nicholas can supplement his profile with a Java-based project (showcasing RDBMS, APIs, possibly TypeScript), gain exposure to Kafka/Docker, or obtain a finance internship, he’d be a much stronger match for this role. As it stands, he would be a reasonable entry-level interview candidate—likely behind applicants with more direct financial and Java/TypeScript/Kafka experience.`;

const review = resumeReview.replace(/\n/g, '').split('---')

const sections = resumeReview
  .split(/\n---+\n/)
  .map(section => section.trim())  
  .filter(section => section.length > 0);


const title = sections[0];
const skillsMatch = sections[1];
const educationRequire = sections[2];
const keywords = sections[3];
const totalScore = sections[4];
const recommendation = sections[5]



console.log(`Title section: ${title}`)


console.log(`Skills Match section:\n${skillsMatch}`)
console.log(`Education requirements section:\n${educationRequire}`)
console.log(`Keywords section:\n${keywords}`)
console.log(`Total Score:\n${totalScore}`)
console.log(`Recommendation:\n${recommendation}`)