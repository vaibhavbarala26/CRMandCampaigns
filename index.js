const express = require("express");
const dotenv = require("dotenv");
const CRMdata = require("./CRMdata"); // Dummy CRM data
const MarketData = require("./MarketingData"); // Dummy Market data
const fetchCRMdata = require("./FetchCRM"); // Function to fetch CRM data
const connection = require("./Connection"); // MongoDB connection
const Lead = require("./Schema/CRMSchema"); // CRM Schema (Mongoose Model)
const FetchMarketData = require("./FetchMarket"); // Function to fetch market data
const Campaign = require("./Schema/MarketSchema"); // Market Schema (Mongoose Model)
const fs = require("fs");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 1042;

// Route to get CRM data (dummy data)
app.get("/crm", async (req, res) => {
  fs.readFile("./CRMdata.js" , "utf-8" , (err , data)=>{
    if(err){
        console.error("error")
        return ;
    }
    const Data = JSON.parse(data)
    console.log(Data)
    res.status(200).json(Data);
  })
    
});

// Route to get Market data (dummy data)
app.get("/market", async (req, res) => {
  fs.readFile("./MarketingData.js" , "utf-8" , (err , data)=>{
    if(err){
        console.error("error")
        return ;
    }
    const Data = JSON.parse(data)
    console.log(Data)
    res.status(200).json(Data);
  })
    
});

// Route to fetch and save CRM data to MongoDB
app.get("/savecrm", async (req, res) => {
  try {
    const CRM = await fetchCRMdata(); 
    console.log(CRM);
    // Fetch the CRM data
    if (!CRM || !CRM.leads) {
      return res.status(400).json({ error: "Invalid CRM data" });
    }

    const savedCrm = await Lead.create(CRM.leads);
    return res.status(200).json({ message: "CRM data saved successfully!", data: savedCrm });
  } catch (error) {
    console.error("Error saving CRM data:", error);
    return res.status(500).json({ error: "Failed to save CRM data" });
  }
});

// Route to fetch and save Marketing data to MongoDB
app.get("/savemarket", async (req, res) => {
  try {
    const marketData = await FetchMarketData(); // Fetch the Marketing data
    if (!marketData) {
      return res.status(400).json({ error: "Invalid Market data" });
    }

    const savedMarket = await Campaign.create(marketData.campaigns);
    return res.status(200).json({ message: "Marketing data saved successfully!", data: savedMarket });
  } catch (error) {
    console.error("Error saving Market data:", error);
    return res.status(500).json({ error: "Failed to save Market data" });
  }
});
app.get("/reportcrm/csv", async (req, res) => {
  fs.readFile("./CRMdata.json", "utf-8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Error reading file" });
    }

    const Leads = JSON.parse(data);
    const LeadStatusSummary = Leads.reduce((summary, lead) => {
      summary[lead.status] = (summary[lead.status] || 0) + 1;
      return summary;
    }, {});

    const transformedLeads = Object.keys(LeadStatusSummary).map(status => ({
      status,
      count: LeadStatusSummary[status],
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(transformedLeads);
    res.header("Content-Type", "text/csv");
    res.attachment("crm_report.csv");
    res.send(csv);
  });
});
app.get("/reportcrm/pdf", async (req, res) => {
  fs.readFile("./CRMdata.json", "utf-8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Error reading file" });
    }

    const Leads = JSON.parse(data);
    const LeadStatusSummary = Leads.reduce((summary, lead) => {
      summary[lead.status] = (summary[lead.status] || 0) + 1;
      return summary;
    }, {});

    const transformedLeads = Object.keys(LeadStatusSummary).map(status => ({
      status,
      count: LeadStatusSummary[status],
    }));

    const doc = new PDFDocument();
    let filename = "crm_report.pdf";
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    doc.pipe(res);
    doc.fontSize(20).text("CRM Lead Status Report", { align: "center" });
    doc.moveDown();

    // Add the table header
    doc.fontSize(14).text("Status | Count", { underline: true });
    doc.moveDown();

    // Add each lead status data
    transformedLeads.forEach(entry => {
      doc.text(`${entry.status} | ${entry.count}`);
      doc.moveDown(0.5);
    });

    doc.end();
  });
});

app.get("/reportcsv" , async(req , res)=>{
  fs.readFile("./MarketingData.json" , "utf-8" , (error , data)=>{
    if(error){
      console.error("error")
    }
    const Campaigns = JSON.parse(data)
    const transformedData = Campaigns.map(entry => {
      const cpc = entry.budget / (entry.clicks || 1); // Avoid division by zero
      const cpl = entry.budget / (entry.leads_generated || 1); // Avoid division by zero
      const roi = ((entry.leads_generated * 100) / (entry.budget || 1)); // Avoid division by zero
    
      // Return a new object with transformed data
      return {
        id: entry.id,
        name: entry.name,
        budget: entry.budget,
        clicks: entry.clicks,
        leads_generated: entry.leads_generated,
        conversion_rate: entry.conversion_rate,
        cost_per_click: cpc.toFixed(2),
        cost_per_lead: cpl.toFixed(2),
        roi: roi.toFixed(2)
      };
    });
   const json2csv = new Parser();
   const csv = json2csv.parse(transformedData)
   res.header("Content-Type" , "text/csv")
   res.attachment("report.csv");
   res.send(csv)
  } )

})
app.get("/reportpdf" , async(req , res)=>{
  fs.readFile("./MarketingData.json" , "utf-8" , (error , data)=>{
    if(error){
      console.error("error")
    }
    const Campaigns = JSON.parse(data)
    const transformedData = Campaigns.map(entry => {
      const cpc = entry.budget / (entry.clicks || 1); // Avoid division by zero
      const cpl = entry.budget / (entry.leads_generated || 1); // Avoid division by zero
      const roi = ((entry.leads_generated * 100) / (entry.budget || 1)); // Avoid division by zero
    
      // Return a new object with transformed data
      return {
        id: entry.id,
        name: entry.name,
        budget: entry.budget,
        clicks: entry.clicks,
        leads_generated: entry.leads_generated,
        conversion_rate: entry.conversion_rate,
        cost_per_click: cpc.toFixed(2),
        cost_per_lead: cpl.toFixed(2),
        roi: roi.toFixed(2)
      };
      
})
const doc = new PDFDocument();
    let filename = "report.pdf";
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    
    doc.pipe(res);
    doc.fontSize(20).text("Campaign Report", { align: "center" });
    doc.moveDown();

    // Add the table header
    doc.fontSize(14).text("ID | Name | Budget | Clicks | Leads Generated | Conversion Rate | CPC | CPL | ROI", {
      underline: true
    });
    doc.moveDown();

    // Add each campaign data
    transformedData.forEach(entry => {
      doc.text(`${entry.id} | ${entry.name} | ${entry.budget} | ${entry.clicks} | ${entry.leads_generated} | ${entry.conversion_rate} | ${entry.cost_per_click} | ${entry.cost_per_lead} | ${entry.roi}`);
      doc.moveDown(0.5);
    });

    doc.end();
    });
  })

// Connect to MongoDB and start the server
connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening on port", PORT);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });
