# CRM and Marketing Data API

This API provides endpoints for managing and retrieving CRM and marketing data. It supports fetching, saving data to MongoDB, and generating reports in CSV and PDF formats.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   
2.Install dependencies:
```bash
npm install

3.Run the application
```bash
npm start
{
  "crm": {
    "get": {
      "endpoint": "/crm",
      "description": "Fetches dummy CRM data from the CRMdata.js file.",
      "response": [
        {
          "id": "1",
          "name": "John Doe",
          "status": "Lead"
        }
      ]
    },
    "save": {
      "endpoint": "/savecrm",
      "description": "Fetches CRM data and saves it to MongoDB.",
      "response": {
        "message": "CRM data saved successfully!",
        "data": "..."
      }
    },
    "report_csv": {
      "endpoint": "/reportcrm/csv",
      "description": "Generates a CSV report summarizing lead statuses.",
      "response": "A downloadable CSV file named crm_report.csv."
    },
    "report_pdf": {
      "endpoint": "/reportcrm/pdf",
      "description": "Generates a PDF report summarizing lead statuses.",
      "response": "A downloadable PDF file named crm_report.pdf."
    }
  }
}

npm start

##Environment Variables
```plaintext
PORT=1042
MONGODB_URI=<your_mongodb_connection_string>
