/**
 * Google Apps Script for Web Exam
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any existing code and paste this entire file into the editor.
 * 4. Click Save.
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type: "Web App".
 * 7. Set "Execute as" to "Me".
 * 8. Set "Who has access" to "Anyone".
 * 9. Click "Deploy" (you may need to authorize the app).
 * 10. Copy the "Web app URL" and use it in your Vercel environment variables as GOOGLE_SCRIPT_URL.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Student ID", "Student Name", "Question 1", "Question 2"]);
      sheet.getRange("A1:E1").setFontWeight("bold");
    }
    
    // Append the data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.studentId,
      data.studentName,
      data.q1,
      data.q2
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
