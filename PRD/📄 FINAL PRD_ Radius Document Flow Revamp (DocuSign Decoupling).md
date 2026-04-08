

---

# **📄 FINAL PRD: Radius Document Flow Revamp**

## **1\. Product Summary**

### **What we are fixing**

Today, Radius opens documents directly inside the DocuSign interface when users click “View” from recommended documents. This creates confusion because users feel like they are already in the **sending stage**, even though they just want to prepare/edit the document.

All document edits currently happen **after envelope creation**, which is too late in the workflow.

---

### **Core Problem**

* After form submission → staging area shows recommended docs  
* User clicks **View**  
* DocuSign opens immediately  
* User feels:  
  👉 “Am I sending this already?”  
* Editing happens **inside DocuSign (after envelope creation)**

📍 This is overwhelming and breaks user expectations

❌ Radius \= opens DocuSign too early (feels like sending)  
✅ Glide \= keeps user inside product → edit first → send later

---

### **Key Insight**

👉 Users think in this order:

1. Prepare documents  
2. Fill details  
3. Add parties  
4. Review  
5. Then send

👉 Radius forces:

1. Select docs  
2. Open DocuSign  
3. Create envelope  
4. Then edit

❌ This is backward

---

## **2\. Product Goal**

### **Primary Goal**

Move Radius from:

**Envelope-first experience → Document-first experience**

**Once you create the envelope, the process that we have remains the same.** 

---

### **What success looks like**

Users should:

* Open documents **inside Radius (not DocuSign)**  
* Edit and complete documents comfortably


---

## **3\. Key Principles**

1. **Do not open DocuSign during document preparation**  
2. **Keep users inside Radius for editing**  
3. **Delay envelope creation until the final step**  
4. **Show progress and missing items early**  
5. **Reduce cognitive load at every step**  
6. **We also should combine the documents which are visible for the agent when they click on “Upload from Library”**

---

## **4\. Current vs Proposed Flow**

## **❌ Current Radius Flow**

1. Staging area shows recommended docs  
2. User clicks “View”  
3. DocuSign opens immediately  
4. User creates envelope  
5. User edits inside DocuSign  
6. User sets signing order  
7. User sends

👉 Problems:

* Feels like sending too early  
* Editing is hidden inside DocuSign  
* No validation before envelope  
* High confusion

---

## **✅ Proposed New Flow**

### **Step 1: Documents Staging (Same Entry Point)**

* Show recommended documents  
* Allow selection

---

### **Step 2: “View” opens Radius Document Editor (NEW)**

Instead of DocuSign:  
👉 Open **in-app document editor**

---

### **Step 3: Document Preparation (NEW CORE EXPERIENCE)**

Inside Radius:

* Preview document  
* Add/edit fields  
* Add parties  
* Select entity type  
* Auto-fill data

---

### **Step 4: Validation Layer (NEW)**

* Show:  
  * Missing fields  
  * Missing parties  
  * Incomplete sections

---

### **Step 5: “Ready to Send”**

Only now:  
👉 User clicks **Send for Signature**

---

### **Step 6: Open DocuSign (FINAL STEP ONLY)**

* Pre-filled  
* Minimal edits needed  
* Signing order confirmation

---

## **5\. Core Feature: In-App Document Editor (CRITICAL)**

This is the **most important feature in this PRD**

---

### **What we need to build**

A **Radius Document Editor** that:

#### **1\. Displays document (PDF viewer)**

* Page navigation  
* Zoom  
* Scroll

#### **2\. Shows editable fields**

* Text fields  
* Dates  
* Numbers  
* Dropdowns (if needed)

#### **3\. Allows inline editing**

* Click → edit → save  
* No redirection

#### **4\. Supports party mapping**

* Assign fields to:  
* Adding any of these should have a popup which opens up with a basic info of just name and email to collect the details   
  * Buyer  
  * Seller  
  * Agent  
    

---

### **Why this matters**

👉 Glide does this → feels smooth  
👉 Radius doesn’t → feels complex

This is the **biggest UX gap**

---

## **6\. Functional Requirements**

## **6.1 Replace “View” Behavior**

### **Current**

* Opens DocuSign

### **New**

* Opens **Radius Document Editor**

---

## **6.2 Document Editor Capabilities**

### **Required**

* Open document inside Radius  
* Highlight editable fields  
* Allow field input  
* Save changes  
* Show field ownership (buyer/seller)

---

## **6.3 Party Management (Inside Editor)**

### **Required**

* Add seller/buyer inside editor  
* Search existing contacts  
* Create new contact  
* Assign entity type:  
  * Individual  
  * Corporation  
  * LLC  
  * Trust

---

## **6.4 Auto-Fill**

### **Required**

* Property details auto-filled  
* Contact details auto-filled  
* Reuse previously entered data

---

## **6.5 Validation System (NEW)**

### **Must show:**

* Missing required fields  
* Missing parties  
* Invalid inputs

### **Behavior**

* Show inline errors  
* Show summary at top  
* Block “Send” until resolved

---

## **6.6 Document Status System**

Each document should show:

* Not Started  
* In Progress  
* Completed  
* Ready to Send

---

## **6.7 Send Flow (DocuSign Integration)**

### **Change**

DocuSign should only be triggered when:

* Document is complete  
* User clicks “Send for Signature”

---

### **Behavior**

* Auto-create envelope  
* Pre-fill recipients  
* Pre-fill signing order  
* Pre-map fields

👉 Minimal work inside DocuSign

---

## **7\. UX Requirements**

## **7.1 Clear Mode Separation**

Show clear states:

* 📝 Editing Mode (inside Radius)  
* 📤 Sending Mode (DocuSign)

---

## **7.2 Remove Fear**

Avoid:

* “Send”  
* “Envelope”  
* “Signature”

Until final step

---

## **7.3 Progress Indicator**

Show steps like:

1. Documents  
2. Parties  
3. Fields  
4. Review  
5. Send

---

## **7.4 Inline Feedback**

* Highlight missing fields  
* Show errors immediately  
* No surprises at end

---

## **8\. Business Rules**

1. DocuSign must NOT open during editing  
2. Envelope must NOT be created before validation  
3. Required fields must be filled before sending  
4. Required parties must be added  
5. Property must be linked  
6. Draft must be auto-saved

---

## **9\. Edge Cases**

* User exits mid-edit → draft should persist  
* Duplicate contact creation  
* Document template missing fields  
* Multiple sellers/buyers  
* User edits after marking complete  
* Sync issues with DocuSign

---

## **10\. Metrics**

Track:

* Time spent in document preparation  
* Number of validation errors per user  
* Drop-off rate before sending  
* First-time successful sends

---

## **11\. MVP Scope**

### **Must build first:**

1. Replace “View” → in-app editor  
2. Basic PDF viewer  
3. Field editing  
4. Party creation  
5. Validation system  
6. Controlled DocuSign trigger

---

This is   
