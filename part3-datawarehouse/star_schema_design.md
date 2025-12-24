# Star Schema Design – FlexiMart Data Warehouse

## Section 1: Schema Overview

### FACT TABLE: fact_sales
**Grain:** One row per product per order line item  
**Business Process:** Sales transactions

**Measures (Numeric Facts):**
- quantity_sold: Number of units sold per transaction
- unit_price: Price per unit at the time of sale
- discount_amount: Discount applied to the transaction
- total_amount: Final sales amount (quantity × unit_price − discount)

**Foreign Keys:**
- date_key → dim_date
- product_key → dim_product
- customer_key → dim_customer

---

### DIMENSION TABLE: dim_date
**Purpose:** Supports time-based analysis such as daily, monthly, quarterly, and yearly trends  
**Type:** Conformed dimension

**Attributes:**
- date_key (PK): Surrogate key in YYYYMMDD format
- full_date: Actual calendar date
- day_of_week: Day name (Monday–Sunday)
- day_of_month: Day number in the month
- month: Numeric month (1–12)
- month_name: Month name (January, February, etc.)
- quarter: Fiscal quarter (Q1–Q4)
- year: Calendar year
- is_weekend: Boolean indicating weekend

---

### DIMENSION TABLE: dim_product
**Purpose:** Stores descriptive attributes of products for sales analysis

**Attributes:**
- product_key (PK): Surrogate key
- product_id: Original product identifier from source system
- product_name: Name of the product
- category: Product category (Electronics, Clothing, Home)
- subcategory: Product sub-classification
- unit_price: Standard selling price

---

### DIMENSION TABLE: dim_customer
**Purpose:** Stores customer demographic and segmentation details

**Attributes:**
- customer_key (PK): Surrogate key
- customer_id: Original customer identifier
- customer_name: Full name of the customer
- city: Customer city
- state: Customer state
- customer_segment: Business segment (Retail, Corporate, etc.)

---

## Section 2: Design Decisions

The star schema uses a **transaction line-item grain** to capture the most granular level of sales data. This enables accurate measurement of product-level performance, supports flexible aggregation, and avoids loss of detail during analysis. Each row represents a single product sold within an order, which is ideal for sales analytics.

**Surrogate keys** are used instead of natural keys to improve performance, maintain consistency when source system identifiers change, and simplify joins between fact and dimension tables. They also support slowly changing dimensions in future enhancements.

This design supports **drill-down and roll-up operations** by separating numeric facts from descriptive attributes. Analysts can easily roll up sales from daily to monthly or yearly levels using the date dimension, and drill down from category-level revenue to individual product performance. The star schema structure ensures fast query performance and intuitive reporting.

---

## Section 3: Sample Data Flow

**Source Transaction:**  
Order #101, Customer "John Doe", Product "Laptop", Quantity: 2, Unit Price: ₹50,000

**Data Warehouse Representation:**

**fact_sales**

date_key: 20240115
product_key: 5
customer_key: 12
quantity_sold: 2
unit_price: 50000
discount_amount: 0
total_amount: 100000

**dim_date**
date_key: 20240115
full_date: 2024-01-15
month: 1
month_name: January
quarter: Q1
year: 2024


**dim_product**
product_key: 5
product_name: Laptop
category: Electronics


**dim_customer**
customer_key: 12
customer_name: John Doe
city: Mumbai

