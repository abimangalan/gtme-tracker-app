export const scheduleData = [
  {
    "phase": "Month 1: The Clay Ecosystem, Data Enrichment, and Outbound Mechanics",
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Deconstructing the GTM Framework and Clay Architecture",
        "days": [
          {
            "day": "Monday",
            "type": "Active",
            "task": "Enroll in Clay University's Clay 101: GTM Automation (60 mins).",
            "description": "Watch and build along.",
            "instructions": [
              "Intro to Clay 101: FETE & Jigsaw (10m)",
              "Your First GTM Use Case (9m)",
              "How to Experiment Inside of Clay (8m)",
              "Finding Companies in Clay (7m)",
              "Finding People in Clay (7m)"
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Continue Clay 101 (60 mins).",
            "description": "Enrichment modules.",
            "instructions": [
              "Finding Jobs Source + Enrichment (5m)",
              "Finding Businesses with Google Maps (7m)",
              "(Enrich) Add Data To Your Table (2m)",
              "Enriching Company Data (8m)",
              "Enriching People Data (8m)",
              "Enriching with Claygent (8m)"
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Finish Clay 101 (60 mins).",
            "description": "Transform and export.",
            "instructions": [
              "(Transform) Clean & Normalize Your Data (6m)",
              "Transforming with AI Formulas (7m)",
              "(Export) Getting Your Lists Out of Clay (review export modules)."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Project 01: The ICP Finder (60 mins).",
            "description": "Build your first verifiable portfolio project.",
            "instructions": [
              "Step 1: Pick a real B2B SaaS company you follow. Write ONE sentence describing their ideal customer.",
              "Step 2: Open Clay and click 'New Table' -> 'Find Companies'.",
              "Step 3: Type your 1-sentence ICP description into Clay's AI Sculptor search bar.",
              "Step 4: Review the filters Clay auto-filled (Industry, HQ, Employee Count). Adjust filters until you have a few dozen results.",
              "Step 5: Set your row limit to exactly 20 and click 'Add to Table'.",
              "Step 6: Confirm you have these exact columns: Company Name, Domain, Employee Count, LinkedIn URL. Name the table '[Company] ICP - '."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Watch Loom videos Part 1 & 2 from Ritu Maurya's Starter Kit (30 mins).",
            "description": "Passive theory absorption.",
            "instructions": [
              "https://www.loom.com/share/c7616ee7ea3746f084233156b61e943f",
              "https://www.loom.com/share/816c17ea7c2547949fd1b80fd24f298d"
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Study foundation models",
            "description": "Focus on IITJ classes and Databricks Gen AI course.",
            "instructions": [
              "Study foundation models and basic prompt engineering."
            ]
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Advanced Outbound Strategy",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "Growth Engine X Outbound Cold Email Course (60 mins).",
            "description": "Start the playlist by Eric Nowoslawski.",
            "instructions": [
              "Watch the Intro and the first two strategy videos.",
              "Focus on understanding Ideal Customer Profiles (ICPs) for B2B services."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Ritu's Project 02: The Signal Stacker (60 mins).",
            "description": "Stacking intent signals in Clay.",
            "instructions": [
              "Step 1: Open your Project 01 table. Click Add Column -> 'Find technology stack' (BuiltWith). Pass the company domain and run it to find competitors' tools.",
              "Step 2: Add Column -> 'Find active job openings'. Set a keyword showing intent (e.g., 'CRM' or 'Salesforce') and a 30-day lookback.",
              "Step 3: Add Column -> 'Find company headcount growth'. Pass the LinkedIn URL with a 6-month lookback to get a growth percentage.",
              "Step 4: Add a 'Formula' column. Write in plain English: 'If percent headcount growth is greater than 20, return 4. If job openings count is greater than 0, return 3. If tech stack contains [keyword], return 3. Sum these and return the total.'",
              "Step 5: Click Generate Formula. Sort your table by this new Score column descending to find your top 3-5 hot accounts."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Ritu's Project 03: The Email Machine (Part 1) (60 mins).",
            "description": "Contact enrichment waterfall.",
            "instructions": [
              "Step 1: Filter your scored table to just your top 3 companies.",
              "Step 2: Add Column -> 'Find contacts at company'. Pass the LinkedIn URL and set target titles (e.g., 'VP Sales', 'CTO'). Limit to 3 per company.",
              "Step 3: Click 'Send table data' to push these 9 contacts into a brand new dedicated contact table.",
              "Step 4: In the new table, add Column -> 'Find work email'. Pass the LinkedIn URL and domain to trigger Clay's waterfall (Hunter, Prospeo, etc.).",
              "Step 5: Add Column -> 'Verify email'. Filter out all 'invalid' results. Keep only 'valid' or 'catch-all'."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Project 03: The Email Machine (Part 2) (60 mins).",
            "description": "AI Personalization.",
            "instructions": [
              "Step 1: Use 'Send Table Data' to pull the company signals (Tech Stack, Job Titles, Growth %) from table 1 into your new contact table.",
              "Step 2: Add Column -> 'AI Column' (Claude). Write a prompt using Ritu's template: 'Write ONE opening line that addresses {First Name}, references their role OR a company signal, is under 35 words, doesn't start with \"I/Hi/Congrats\", and avoids buzzwords like \"synergy\".'",
              "Step 3: Run on one row. Read aloud. Edit the prompt if it sounds robotic. When perfect, hit 'Run All'.",
              "Step 4: Record a Loom video of your tables and post to LinkedIn tagging GTM KOLs."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Watch Ritu's Loom Part 3 & 4 (30 mins).",
            "description": "Passive theory absorption.",
            "instructions": [
              "Watch Part 3 https://www.loom.com/share/8720fdcad12047bdb91bc93963b95c21",
              "Watch Part 4 https://www.loom.com/share/fa366886598b4bafbb3079d199070ef1"
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Advanced prompt design",
            "description": "Databricks Gen AI course.",
            "instructions": [
              "Focus on advanced prompt design and few-shot prompting techniques."
            ]
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "n8n Foundations & Visual Orchestration",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "n8n Level 1: Beginner Course (60 mins).",
            "description": "Go to docs.n8n.io/courses.",
            "instructions": [
              "Complete 'Navigating the editor UI' and 'Building a mini-workflow'."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Continue n8n Level 1 (60 mins).",
            "description": "Real-world use cases.",
            "instructions": [
              "Getting data from a warehouse, inserting into Airtable, and filtering orders."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Finish n8n Level 1 (60 mins).",
            "description": "Knowledge test.",
            "instructions": [
              "Take the Level 1 'Test your knowledge' quiz."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 1: Lead Enrichment (Start) (90 mins).",
            "description": "Connecting n8n and Clay.",
            "instructions": [
              "Step 1: Problem statement: A sales team spends 40 hrs/week manually researching leads.",
              "Step 2: Open n8n. Add a 'Webhook' trigger node (POST method). This will simulate receiving a raw 'Company Name' from a salesperson.",
              "Step 3: Open Clay. Create a blank table. Setup a webhook to receive the company name from n8n.",
              "Step 4: In Clay, use native integrations to build a waterfall that outputs: Decision-maker name, email, LinkedIn, company size, recent funding, tech stack."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Nick Saraev's n8n Masterclass (45 mins).",
            "description": "Passive theory absorption.",
            "instructions": [
              "Watch the first 45 minutes (Foundations & Automation Logic) (https://youtu.be/2GZ2SNXWK-c?si=OMzVEt4Ziz3S62al)."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "RAG Concepts",
            "description": "Databricks Gen AI course.",
            "instructions": [
              "Study Retrieval-Augmented Generation (RAG) concepts."
            ]
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "n8n Intermediate & Agentic Workflows",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "n8n Level 2: Intermediate Course (60 mins).",
            "description": "Data structure.",
            "instructions": [
              "Complete 'Understanding the data structure' and 'Processing different data types' (focus on XML and binary data)."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Continue n8n Level 2 (60 mins).",
            "description": "Merge and errors.",
            "instructions": [
              "Complete 'Merging and splitting data' and 'Dealing with errors in workflows' (crucial for API rate limiting)."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Theory",
            "task": "Finish n8n Level 2 (60 mins).",
            "description": "Business workflows.",
            "instructions": [
              "Complete the 3 business workflows and take the Level 2 knowledge test."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 1: Lead Enrichment (Finish) (90 mins).",
            "description": "Completing the webhook integration.",
            "instructions": [
              "Step 1: In Clay, add an 'HTTP Request' column at the end of your enrichment table to push the final data payload back out.",
              "Step 2: In n8n, create a 'Webhook' node to receive that payload from Clay, and attach a 'Slack' or 'Google Sheets' node to log the fully enriched lead.",
              "Step 3: Record a 3-5 minute Loom video. Script: Explain how this takes manual research from 40 hours a week down to 4 hours. Publish the video as your first major portfolio piece."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Nick Saraev's n8n Masterclass (45 mins).",
            "description": "Passive theory absorption.",
            "instructions": [
              "Watch the next 45 minutes of Nick Saraev's n8n Masterclass (https://youtu.be/2GZ2SNXWK-c?si=OMzVEt4Ziz3S62al)."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Vector databases and embeddings",
            "description": "Databricks Gen AI course.",
            "instructions": [
              "Focus on vector databases and embeddings."
            ]
          }
        ]
      }
    ]
  },
  {
    "phase": "Month 2: Terminal-Based Orchestration and Enterprise Integration",
    "weeks": [
      {
        "weekNumber": 5,
        "title": "Claude Code Basics & Context Engineering",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "Claude Code Basics (45 mins).",
            "description": "Install & Basics.",
            "instructions": [
              "Install Claude Code: npm install -g @anthropic-ai/claude-code.",
              "Watch 'Claude Code Clearly Explained' https://youtu.be/QoQBzR1Nlql?si=4fsyrFwKk3WxbeeF"
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Local Context Setup (45 mins).",
            "description": "CLAUDE.md setup.",
            "instructions": [
              "Watch Nate Herk's 'Master 95% of Claude Code in 28 Mins' (https://www.youtube.com/watch?v=zKBPwDpBfhs).",
              "Create a local directory for your GTM projects. Write a CLAUDE.md context file detailing your tools (Clay, n8n) and your objective (GTM portfolio building)."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Finish Nate Herk's video (60 mins).",
            "description": "Skill building.",
            "instructions": [
              "Finish Nate Herk's video.",
              "Follow the 6-step skill-building framework (Name, Trigger, Outcome, Dependencies, Step-by-step, Edge cases) to add a custom skill to your agent."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 2: Sales Tracker (Start) (90 mins).",
            "description": "Scraping via CLI.",
            "instructions": [
              "Step 1: Problem statement: 'Sales is missing leads because they reach out at the wrong time.'",
              "Step 2: We need to track 5 triggers: Leadership changes, new funding, job postings, tech stack changes, company growth.",
              "Step 3: Use Claude Code in your terminal. Prompt it: 'Write a Python script using BeautifulSoup that takes an input URL for a company's \"Careers\" page and scrapes it to detect if they are hiring for \"Sales\" or \"Engineering\" roles.'",
              "Step 4: Tell Claude Code to run the script and verify it works on a dummy URL."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Context Engineering (30 mins).",
            "description": "Tutorials.",
            "instructions": [
              "Read/Listen to tutorials on 'Context Engineering' and the difference between CLI interactions and heavy UI platforms."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Agentic AI",
            "description": "Databricks Gen AI course.",
            "instructions": [
              "Study Agentic AI and multi-step reasoning models."
            ]
          }
        ]
      },
      {
        "weekNumber": 6,
        "title": "Model Context Protocol (MCP) & CRM Integration",
        "days": [
          {
            "day": "Monday",
            "type": "Active",
            "task": "Intro to MCP (60 mins).",
            "description": "Brave Search MCP.",
            "instructions": [
              "Step 1: Go to brave.com and generate a free API key for Brave Search.",
              "Step 2: In your terminal, run the command to install the Brave Search MCP server.",
              "Step 3: Trigger 2 (New Funding): Open Claude Code and type: 'Use the Brave Search tool to find 5 recent news articles about B2B SaaS companies raising Series A funding. Output their names and funding amounts in a CSV.'"
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "CRM Integration via MCP (90 mins).",
            "description": "HubSpot developer account.",
            "instructions": [
              "Step 1: Go to HubSpot.com and set up a free developer account.",
              "Step 2: Go to Settings -> Integrations -> Private Apps. Create a new app named 'Claude Code MCP'.",
              "Step 3: Grant the app 'Read' and 'Write' permissions for Contacts and Companies, then copy the secret access token.",
              "Step 4: In your terminal, type `export HUBSPOT_ACCESS_TOKEN=\"your_token_here\"` to set the environment variable, then install the HubSpot MCP server."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Ritu's Offer Project 2 (Cont.) (60 mins).",
            "description": "Build tracking table.",
            "instructions": [
              "Step 1: Tie it together. Build a Clay table that monitors a list of 20 target companies.",
              "Step 2: Add columns for the remaining triggers (LinkedIn headcount growth, BuiltWith tech stack changes).",
              "Step 3: Use n8n to schedule this table to run every morning at 8 AM."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 2 (Finish) (60 mins).",
            "description": "Lead routing logic.",
            "instructions": [
              "Step 1: In n8n, create a routing logic: If any of the 5 triggers fire (e.g., funding detected or growth >10%), push that 'Hot Lead' to Slack and push the record to your HubSpot CRM (via API or Claude Code MCP).",
              "Step 2: Record your 3-5 minute Loom showing the system automatically generating a 'Daily Hot Leads' list. Post to LinkedIn explaining how you solved the timing problem."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "GTM Engineer School Podcast (45 mins).",
            "description": "Listen to podcast.",
            "instructions": [
              "Listen to an episode of the GTM Engineer School Podcast by Jared Waxman and Matteo Tittarelli."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Enterprise LLMs",
            "description": "Databricks Gen AI course.",
            "instructions": [
              "Explore how enterprise LLMs securely access external tools and internal data lakes."
            ]
          }
        ]
      },
      {
        "weekNumber": 7,
        "title": "Advanced Data Enrichment (Apollo.io & Scraping Hacks)",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "Apollo.io Advanced Tutorial (45 mins).",
            "description": "Account Setup and Search.",
            "instructions": [
              "Watch Jay's Apollo.io Advanced Tutorial https://www.youtube.com/watch?v=PLFrC2QfnZA (0:00 to 12:30).",
              "Focus on Account Setup and Advanced Search Filters."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Theory",
            "task": "Finish Jay's Apollo tutorial (45 mins).",
            "description": "Targeted Lead Lists.",
            "instructions": [
              "Finish Jay's Apollo tutorial (12:30 to 29:00).",
              "Focus on Building Targeted Lead Lists and Campaign Automation Features."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Ritu's Offer Project 3: Sequence Optimizer (Start) (60 mins).",
            "description": "Combining Apollo and Clay.",
            "instructions": [
              "Step 1: Problem statement: 'Reply rates are stuck at 2%. Need personalization at scale.'",
              "Step 2: Export a targeted list of 50 leads from Apollo. Import them into a new Clay table.",
              "Step 3: Use the skills from Project 2. Add columns representing the 'Sales Triggers' for these 50 specific leads (e.g., recent news, hiring)."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 3 (Setup) (60 mins).",
            "description": "Connecting Smartlead.",
            "instructions": [
              "Step 1: Sign up for a free trial of Smartlead (or Instantly).",
              "Step 2: In Clay, use the 'HTTP Request' column to push your enriched leads directly into a Smartlead campaign via their API."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Review LinkedIn posts (30 mins).",
            "description": "KOL content.",
            "instructions": [
              "Review LinkedIn posts from KOLs: Jordan Crawford, Kellen Casebeer, and Tim Yakubson."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Model Serving",
            "description": "Databricks course.",
            "instructions": [
              "Focus on Model Serving."
            ]
          }
        ]
      },
      {
        "weekNumber": 8,
        "title": "Signal Processing Engine Blueprint",
        "days": [
          {
            "day": "Monday",
            "type": "Active",
            "task": "Ritu's Offer Project 3 (AI Personalization) (60 mins).",
            "description": "Drafting dynamic sequences.",
            "instructions": [
              "Step 1: Inside Smartlead, structure a 3-step email sequence.",
              "Step 2: Email 1: The AI Hook. Use the dynamic variables you pushed from Clay to inject a hyper-personalized opening line based on their specific sales trigger.",
              "Step 3: Email 2: Problem-specific value prop. Email 3: Breakup email."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Ritu's Offer Project 3 (A/B Testing) (90 mins).",
            "description": "A/B test setup.",
            "instructions": [
              "Step 1: In Smartlead, build an A/B test for Email 1.",
              "Step 2: Variant A uses the AI-generated sales trigger hook. Variant B uses a standard, generic opening line. (This proves to employers you understand testing methodology, not just coding)."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Ritu's Offer Project 3 (Custom Timing) (60 mins).",
            "description": "n8n workflow timing.",
            "instructions": [
              "Step 1: In n8n, build a workflow that controls the timing of the Smartlead sequence.",
              "Step 2: Add logic: Do not enroll the prospect in the Smartlead campaign until the specific sales trigger (e.g., funding) is actually detected in Clay."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Ritu's Offer Project 3 (Finish) (90 mins).",
            "description": "Record Portfolio Piece.",
            "instructions": [
              "Step 1: Record your final Loom video. Show the A/B test setup in Smartlead, show how the sequence is triggered by data in Clay, and explain how this fixes the '2% reply rate' problem. Publish it."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "YouTube teardowns (30 mins).",
            "description": "Signal-Based Selling.",
            "instructions": [
              "Watch YouTube teardowns of 'Signal-Based Selling'."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Real-time streaming data",
            "description": "Databricks course.",
            "instructions": [
              "Study how Databricks handles real-time streaming data."
            ]
          }
        ]
      }
    ]
  },
  {
    "phase": "Month 3: System Architecture, Analytics, and Reverse ETL",
    "weeks": [
      {
        "weekNumber": 9,
        "title": "Revenue Analytics & The Bowtie Model",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "HubSpot RevOps Cert. (60 mins).",
            "description": "Revenue Operations Strategy.",
            "instructions": [
              "Enroll in HubSpot Academy's Revenue Operations Certification.",
              "Complete 'Implementing a Revenue Operations Strategy' module (44 mins) focusing on the Bowtie data model."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Theory",
            "task": "Continue HubSpot RevOps Cert (60 mins).",
            "description": "Funnel analysis.",
            "instructions": [
              "Focus on funnel analysis, mapping lead -> MQL -> SQL -> Closed Won stages."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Synthesizing Analytics (90 mins).",
            "description": "CAC script in n8n.",
            "instructions": [
              "Step 1: Create a Google Sheet representing mock campaign data. Column A: 'Marketing Spend'. Column B: 'Deals Won'.",
              "Step 2: Build a scheduled n8n workflow that runs daily.",
              "Step 3: Use the 'Google Sheets' node to read the data, then add a 'Code' (JavaScript) node to divide Spend by Deals Won to calculate the CAC (Customer Acquisition Cost).",
              "Step 4: Send the calculated CAC number to yourself in an email node."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "CLI Data Standardization (60 mins).",
            "description": "Standardize formatting via CLI.",
            "instructions": [
              "Step 1: Create a CSV file filled with messy mock data (e.g., phone numbers like '07700900000' and company names in all caps).",
              "Step 2: Open Claude Code in your terminal.",
              "Step 3: Type: 'Read this CSV. Write a script to format all phone numbers to international format and title-case the company names. Execute the script and save as cleaned_data.csv.'"
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Nick Saraev's n8n Masterclass (45 mins).",
            "description": "Finish Masterclass.",
            "instructions": [
              "Finish the remainder of Nick Saraev's n8n Masterclass."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Databricks AI/BI Genie",
            "description": "Databricks course.",
            "instructions": [
              "Explore Databricks AI/BI Genie. Understand how GTM teams use natural language to query pipeline metrics."
            ]
          }
        ]
      },
      {
        "weekNumber": 10,
        "title": "The Marketing Lakehouse & Reverse ETL",
        "days": [
          {
            "day": "Monday",
            "type": "Theory",
            "task": "Reverse ETL Concepts (60 mins).",
            "description": "Extracting calculated insights.",
            "instructions": [
              "Study Reverse ETL. Understand how tools like Census or Hightouch extract calculated insights from a data warehouse and push them back into Salesforce/HubSpot."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Theory",
            "task": "Databricks Lakebase (60 mins).",
            "description": "Documentation review.",
            "instructions": [
              "Explore Databricks Lakebase documentation.",
              "Understand how gold-layer data is synced directly into operational databases without custom pipelines."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Enterprise Architecture Mapping (90 mins).",
            "description": "Diagramming an enterprise stack.",
            "instructions": [
              "Step 1: Open a free visual tool like Lucidchart or Excalidraw.",
              "Step 2: Draw a box for 'Product telemetry (User Login)'.",
              "Step 3: Draw an arrow to 'Databricks (Calculate Lead Score)'.",
              "Step 4: Draw arrows from Databricks -> Reverse ETL -> HubSpot -> n8n -> Slack alert. This gives you a physical blueprint of a mature enterprise pipeline."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "The Ultimate Capstone Prep (60 mins).",
            "description": "Final project overview.",
            "instructions": [
              "Step 1: Open a Google Doc. Define your final project: 'The Autonomous GTM Engine'.",
              "Step 2: You will link Ritu's 3 projects together: Trigger Detection -> Enrichment -> Smartlead Sequencing -> CRM Sync. Write down the exact node connections you need to make."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Databricks Use Cases (30 mins).",
            "description": "Data Intelligence.",
            "instructions": [
              "Review the official Databricks 'Data Intelligence for Marketing' use cases."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Predictive model",
            "description": "Databricks course.",
            "instructions": [
              "Apply Databricks Gen AI knowledge to build a theoretical predictive model that scores leads based on historical conversion data."
            ]
          }
        ]
      },
      {
        "weekNumber": 11,
        "title": "Capstone Execution & Testing",
        "days": [
          {
            "day": "Monday",
            "type": "Active",
            "task": "Capstone Phase 1 (Trigger to Enrichment) (90 mins).",
            "description": "Initial trigger flow.",
            "instructions": [
              "Step 1: Open n8n. Set a schedule trigger (e.g., every day at 9 AM).",
              "Step 2: Make an HTTP request to an API (like Apollo or builtwith) to pull a fresh list of companies hitting a growth trigger.",
              "Step 3: Push that raw list into a Clay webhook to initiate your waterfall enrichment from Project 1."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Capstone Phase 2 (Enrichment to CRM) (90 mins).",
            "description": "Mapping data to HubSpot.",
            "instructions": [
              "Step 1: Have Clay push the fully enriched contact data (Name, Valid Email, AI Opening Line) out via webhook back to n8n.",
              "Step 2: Use the n8n HubSpot node to automatically create the Contact record."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Capstone Phase 3 (Sequencing) (90 mins).",
            "description": "Smartlead enrollment.",
            "instructions": [
              "Step 1: In the same n8n workflow, use the Smartlead HTTP node to automatically enroll that new contact into your A/B tested sequence from Project 3."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "End-to-end testing (60 mins).",
            "description": "System verification.",
            "instructions": [
              "Step 1: Trigger the entire system from the very beginning.",
              "Step 2: Watch the executions flow from n8n -> Clay -> HubSpot -> Smartlead.",
              "Step 3: Fix any rate-limiting errors (by adding sleep/delay nodes in n8n). Ensure the pipeline flows perfectly without human intervention."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Capstone Presentation Prep (30 mins).",
            "description": "Scripting.",
            "instructions": [
              "Script your presentation for the Capstone project. Structure it: Problem (Disjointed tools), Architecture (n8n orchestrating Clay/CRM/Smartlead), Execution (Live run), ROI (Zero manual hours)."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Finalize DB coursework",
            "description": "Databricks course.",
            "instructions": [
              "Finalize any outstanding projects for your Databricks Generative AI course."
            ]
          }
        ]
      },
      {
        "weekNumber": 12,
        "title": "Public Portfolio & Strategic Realignment",
        "days": [
          {
            "day": "Monday",
            "type": "Active",
            "task": "Record your Capstone (60 mins).",
            "description": "Record Capstone Presentation.",
            "instructions": [
              "Step 1: Open Loom.",
              "Step 2: Record a 5-10 minute presentation of your Ultimate GTM Engine.",
              "Step 3: Show your code, your n8n canvas, and your Clay table. Verbally explain how this automated pipeline solves the B2B commercial lead generation problem."
            ]
          },
          {
            "day": "Tuesday",
            "type": "Active",
            "task": "Publish the Portfolio (45 mins).",
            "description": "Share work.",
            "instructions": [
              "Step 1: Upload the Loom video to LinkedIn.",
              "Step 2: Write a post explaining the architecture. Tag the software companies (Clay, n8n, Anthropic) and the GTM KOLs you followed in Week 1."
            ]
          },
          {
            "day": "Wednesday",
            "type": "Active",
            "task": "Resume overhaul (60 mins).",
            "description": "Translate to GTM.",
            "instructions": [
              "Step 1: Open your resume. Translate your 'Full Stack Developer' bullets into GTM lexicon.",
              "Step 2: Change 'Designed Python (Scrapy) pipelines...' to 'Architected automated data ingestion and enrichment pipelines using Python, eliminating manual prospecting overhead.'",
              "Step 3: Highlight Clay, n8n, Claude Code MCPs, Reverse ETL, and Databricks."
            ]
          },
          {
            "day": "Thursday",
            "type": "Active",
            "task": "Apply for roles (60 mins).",
            "description": "Job application.",
            "instructions": [
              "Identify and apply to 5 'GTM Engineer', 'Revenue Systems Architect', or 'Growth Engineer' roles. Use Claude Code to analyze the job descriptions and tailor your cover letters."
            ]
          },
          {
            "day": "Friday",
            "type": "Passive",
            "task": "Celebrate & Review (30 mins).",
            "description": "Wrap up.",
            "instructions": [
              "Celebrate completion. Review metrics and connections made on LinkedIn."
            ]
          },
          {
            "day": "Sat/Sun",
            "type": "Databricks Integration",
            "task": "Complete DB course",
            "description": "Databricks course final.",
            "instructions": [
              "Complete the Databricks Generative AI course."
            ]
          }
        ]
      }
    ]
  }
];
