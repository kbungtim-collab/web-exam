# Web Exam Application

This is a secure web-based examination application built with Next.js, designed to prevent copying and pasting, with data submission to Google Sheets.

## Features
- Prevents text selection, copy, paste, and right-click to minimize cheating.
- Saves exam results directly to a Google Sheet.
- Ready to deploy on Vercel.

## Setup Instructions for Teachers

### 1. Google Sheets Setup
1. Create a new [Google Sheet](https://sheets.new/).
2. Go to **Extensions > Apps Script**.
3. Copy all the code from the `google-apps-script.js` file in this repository.
4. Paste it into the Apps Script editor (replace any existing code) and click the **Save** icon.
5. Click **Deploy > New deployment**.
6. Select type: **Web App**.
7. Set "Execute as" to **Me**.
8. Set "Who has access" to **Anyone**.
9. Click **Deploy** (you will be prompted to authorize the script).
10. Copy the **Web app URL**.

### 2. Vercel Deployment
1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Import this GitHub repository.
3. In the **Environment Variables** section, add a new variable:
   - Name: `GOOGLE_SCRIPT_URL`
   - Value: *(Paste the Web app URL you copied in step 1)*
4. Click **Deploy**.

## Local Development (Requires Node.js)
1. Install dependencies: `npm install`
2. Create a `.env.local` file and add your `GOOGLE_SCRIPT_URL`
3. Run the development server: `npm run dev`
