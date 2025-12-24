# FlexiMart – Database Design & ETL Pipeline (Part 1)

## 📌 Overview
FlexiMart receives raw transactional data from multiple CSV files containing customer, product, and sales information. These files contain several real-world data quality issues such as missing values, duplicates, inconsistent formats, and invalid records.

The goal of this project is to design a clean relational database, build an ETL (Extract, Transform, Load) pipeline using Python, and answer business-critical questions using SQL.

This project simulates a real-world data engineering workflow and is divided into three main tasks:
- ETL pipeline implementation
- Database schema documentation
- Business query implementation

---

## 🗂️ Input Data Sources

### 1️⃣ customers_raw.csv
**Purpose:** Customer master data  
**Common Issues Identified:**
- Missing email addresses
- Duplicate customer records
- Inconsistent phone number formats
- Mixed date formats in registration_date

---

### 2️⃣ products_raw.csv
**Purpose:** Product catalog data  
**Common Issues Identified:**
- Missing product prices
- Null stock quantities
- Inconsistent category naming (e.g., Electronics vs ELECTRONICS)
- Extra spaces in product names

---

### 3️⃣ sales_raw.csv
**Purpose:** Transactional sales data  
**Common Issues Identified:**
- Duplicate transactions
- Missing customer_id or product_id
- Mixed date formats
- Invalid or pending transactions

---

## 🔄 Task 1.1: ETL Pipeline Implementation

### 🎯 Objective
Build an automated ETL pipeline that cleans raw CSV data and loads it into a relational database.

### 🛠️ ETL Steps

#### **Extract**
- Read all CSV files using Python (pandas)

#### **Transform**
- Remove duplicate records
- Handle missing values using appropriate strategies (drop, fill, or default)
- Standardize phone numbers to `+91-XXXXXXXXXX`
- Normalize category names (Electronics, Fashion, Groceries)
- Convert all dates to `YYYY-MM-DD`
- Validate foreign keys
- Generate surrogate keys using auto-increment columns

#### **Load**
- Insert cleaned data into MySQL/PostgreSQL
- Enforce schema constraints
- Handle insertion errors gracefully

---

## 🗃️ Database Schema

Database Name: **fleximart**

### Tables
- `customers`
- `products`
- `orders`
- `order_items`

The schema follows **Third Normal Form (3NF)** to avoid redundancy and ensure data integrity.

---

## 📦 Deliverables

| File Name | Description |
|---------|------------|
| `etl_pipeline.py` | Complete ETL script with logging and comments |
| `data_quality_report.txt` | Summary of duplicates removed, missing values handled, records loaded |
| `schema_documentation.md` | ER description, normalization explanation, sample data |
| `business_queries.sql` | SQL queries answering business questions |

---

## 📊 Business Outcomes
- Clean and reliable customer and sales data
- Structured relational database ready for analytics
- Actionable insights through SQL-based reporting

---

## ✅ Evaluation Focus
- Correct handling of real-world data quality issues
- Proper database normalization
- Accurate SQL aggregations and filtering
- Clear documentation and readable code
