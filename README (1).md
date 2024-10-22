
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


1.Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
```
2.Install dependencies:
```bash
npm install
```
3.Run the application:
```bash
npm start
```
4.Envrironment Variables:
```plaintext
PORT=1042
MONGODB_URI=<your_mongodb_connection_string>
```
## API Reference

#### Get all items

```http
  GET / GET /crm
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` |  Fetches all dummy CRM data.

#### Get item

```http
  GET /  GET /market
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 	Fetches all dummy marketing data. |

```http
  GET /savecrm
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Fetches CRM data and saves it to MongoDB. |

```http
  GET /savemarket
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Fetches marketing data and saves it to MongoDB.|
```http
  GET /reportcrm/csv
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Generates a CSV report of CRM data|
```http
  GET /reportcrm/pdf
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Generates a PDF report of CRM data.|
```http
  GET /reportcsv
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Generates a CSV report of marketing campaigns.|
```http
  GET /reportpdf
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | 		Generates a PDF report of marketing campaigns.|



