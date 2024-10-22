{
    "title": "CRM and Marketing Data API",
    "description": "This API provides endpoints for managing and retrieving CRM and marketing data. It supports fetching, saving data to MongoDB, and generating reports in CSV and PDF formats.",
    "table_of_contents": [
      "Installation",
      "Environment Variables",
      "API Endpoints",
      "Usage Examples",
      "Contributing",
      "License"
    ],
    "installation": [
      "Clone the repository:",
      "```bash",
      "git clone <repository-url>",
      "cd <repository-directory>",
      "```",
      "Install dependencies:",
      "```bash",
      "npm install",
      "```",
      "Run the application:",
      "```bash",
      "npm start",
      "```",
      "The server will start on `http://localhost:1042`."
    ],
    "environment_variables": {
      "description": "Create a .env file in the root directory and add the following variable:",
      "variables": {
        "PORT": "1042",
        "MONGODB_URI": "<your_mongodb_connection_string>"
      },
      "note": "Replace <your_mongodb_connection_string> with your actual MongoDB connection string."
    },
    "api_endpoints": {
      "crm_endpoints": [
        {
          "name": "Get CRM Data",
          "endpoint": "GET /crm",
          "description": "Fetches dummy CRM data from the CRMdata.js file.",
          "response": [
            {
              "id": "1",
              "name": "John Doe",
              "status": "Lead"
            }
          ]
        },
        {
          "name": "Fetch and Save CRM Data to MongoDB",
          "endpoint": "GET /savecrm",
          "description": "Fetches CRM data using a function and saves it to MongoDB.",
          "response": {
            "message": "CRM data saved successfully!",
            "data": "..."
          }
        },
        {
          "name": "Generate CRM Report (CSV)",
          "endpoint": "GET /reportcrm/csv",
          "description": "Generates a CSV report summarizing lead statuses.",
          "response": "A downloadable CSV file named crm_report.csv."
        },
        {
          "name": "Generate CRM Report (PDF)",
          "endpoint": "GET /reportcrm/pdf",
          "description": "Generates a PDF report summarizing lead statuses.",
          "response": "A downloadable PDF file named crm_report.pdf."
        }
      ],
      "marketing_endpoints": [
        {
          "name": "Get Marketing Data",
          "endpoint": "GET /market",
          "description": "Fetches dummy marketing data from the MarketingData.js file.",
          "response": [
            {
              "id": "1",
              "name": "Campaign 1",
              "budget": 1000
            }
          ]
        },
        {
          "name": "Fetch and Save Marketing Data to MongoDB",
          "endpoint": "GET /savemarket",
          "description": "Fetches marketing data using a function and saves it to MongoDB.",
          "response": {
            "message": "Marketing data saved successfully!",
            "data": "..."
          }
        },
        {
          "name": "Generate Marketing Report (CSV)",
          "endpoint": "GET /reportcsv",
          "description": "Generates a CSV report summarizing marketing campaigns.",
          "response": "A downloadable CSV file named report.csv."
        },
        {
          "name": "Generate Marketing Report (PDF)",
          "endpoint": "GET /reportpdf",
          "description": "Generates a PDF report summarizing marketing campaigns.",
          "response": "A downloadable PDF file named report.pdf."
        }
      ]
    },
    "usage_examples": [
      {
        "description": "Fetch CRM Data",
        "command": "curl -X GET http://localhost:1042/crm"
      },
      {
        "description": "Save CRM Data to MongoDB",
        "command": "curl -X GET http://localhost:1042/savecrm"
      },
      {
        "description": "Generate CRM Report (CSV)",
        "command": "curl -X GET http://localhost:1042/reportcrm/csv --output crm_report.csv"
      },
      {
        "description": "Generate CRM Report (PDF)",
        "command": "curl -X GET http://localhost:1042/reportcrm/pdf --output crm_report.pdf"
      },
      {
        "description": "Fetch and Save Marketing Data to MongoDB",
        "command": "curl -X GET http://localhost:1042/savemarket"
      },
      {
        "description": "Generate Marketing Report (CSV)",
        "command": "curl -X GET http://localhost:1042/reportcsv --output report.csv"
      },
      {
        "description": "Generate Marketing Report (PDF)",
        "command": "curl -X GET http://localhost:1042/reportpdf --output report.pdf"
      }
    ],
    "contributing": "Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or enhancements.",
    "license": "This project is licensed under the MIT License."
  }
  
