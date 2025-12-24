# NoSQL Analysis for FlexiMart Product Catalog

## Section A: Limitations of RDBMS

Relational databases (RDBMS) struggle with highly diverse product catalogs. First, products often have different attributes; for example, laptops require fields like RAM, processor, and storage, while shoes need size and color. Storing all possible attributes in a single table leads to many nullable columns or multiple join tables, which complicates queries and reduces performance. Second, frequent schema changes become cumbersome; adding a new product type with unique attributes requires altering table structures and updating applications, leading to downtime or migration issues. Third, customer reviews involve nested or repeating data structures. Modeling reviews in relational tables requires additional tables and joins, making queries complex and less efficient. Overall, RDBMS lacks flexibility for dynamic, hierarchical, or semi-structured data common in modern e-commerce product catalogs.

## Section B: NoSQL Benefits

MongoDB addresses these challenges with a flexible document-based model. Each product can be represented as a **JSON-like document**, allowing different fields for different product types without schema changes. For example, a laptop document can have `RAM` and `processor`, while a shoe document can have `size` and `color`, stored naturally. Reviews can be embedded as **nested arrays** within the product document, eliminating the need for separate tables and joins. MongoDB also provides **horizontal scalability** via sharding, allowing the database to handle large volumes of products and transactions across multiple servers efficiently. Its flexible schema and embedded documents enable rapid iteration, easy integration of new product categories, and efficient retrieval of related data, which is ideal for an e-commerce platform like FlexiMart.

## Section C: Trade-offs

While MongoDB provides flexibility, there are trade-offs compared to MySQL. First, **transactions across multiple documents** are less efficient than in RDBMS, which may affect complex financial operations. Second, **data consistency** is weaker under certain configurations; MongoDB’s eventual consistency model can lead to temporary stale reads if not carefully managed. Additionally, complex queries involving aggregations or joins can be less performant than SQL.
