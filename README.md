README for Modul_debitare (Depozite Module Controller)
Overview
This is a custom PrestaShop admin module designed to manage warehouse records and pricing details related to cutting and edging operations. The module provides functionalities to view, update, insert, and delete records in the database, as well as handle associated pricing configurations.

Features
1. Database Operations
Fetch Records: Retrieve records from depozite_records and cutting_edges_depozite_records tables.
Insert Records: Add new warehouse data along with cutting and edging prices for categories.
Update Records: Modify existing records while maintaining cutting and edging details.
Delete Records: Remove warehouse data and associated records from the database.
2. Category Management
Fetches categories and allows personalized configurations for cutting and edging operations.
Ensures integration of Permite_personalizare (allow personalization) and Foloseste_la_cantur (used for edging) flags.
3. Smarty Template Integration
Uses PrestaShop's Smarty templating engine for rendering views and forms.
Allows easy integration of data in the module's admin page.
4. Validation
Combines and validates data inputs for cutting and edging prices across multiple categories.
5. AJAX Support
Integrates jQuery and PrestaShop's JavaScript library to enhance interactivity in admin forms.
Installation and Setup
Copy Module Files

Place the module folder Modul_debitare in the /modules/ directory of your PrestaShop installation.
Register the Module

Navigate to the PrestaShop admin panel.
Go to Modules and Services > Module Manager.
Locate Modul_debitare and install it.
Database Structure

Ensure the following tables are present in your database:
depozite_records
cutting_edges_depozite_records
Dependencies

Ensure the PrestaShop installation has database configuration constants (_DB_PREFIX_, _PS_USE_SQL_SLAVE_) properly defined.
Usage
1. Viewing Records
By default, all records from depozite_records and cutting_edges_depozite_records are displayed in the admin panel.
2. Adding New Records
Use the provided form to add warehouse data:
Title (Titlu)
Cutting Price (Pret_taiere)
Edging Price (Pret_cantuire)
Extra pricing options (Nr_piese_pret_extra, Procent_pret_extra).
3. Editing Records
Edit existing records by selecting the record and updating the form fields. Changes are validated and reflected in both tables.
4. Deleting Records
Records can be deleted using the provided action buttons. Associated cutting and edging records are also removed.
Key Functions
1. get_depozite_records($id)
Fetches data from depozite_records and cutting_edges_depozite_records tables.
Returns all records if $id is not provided, or specific data for a given ID.
2. saveFormData($data)
Inserts new warehouse data and its associated cutting and edging details into the database.
3. UpdateFormData($data, $id)
Updates existing records in both tables. Handles cases where certain fields are missing.
4. DeleteFormData($id)
Deletes records from depozite_records and cutting_edges_depozite_records based on the warehouse ID.
5. getdebitare_select($id_category)
Retrieves category-specific settings for cutting and edging.
Technical Details
Dependencies
Database Connection: Uses Db::getInstance() for database operations with support for SQL slave connections.
PrestaShop Context: Accesses Context::getContext() to fetch current language and category data.
JavaScript and CSS: Extends setMedia() to include jQuery and UI components.
Smarty Templates
Renders views using templates located in the views/templates/admin/ directory.
Error Handling
Ensures transactional integrity by rolling back operations on failure.
Returns error messages for database or logic failures.
Customization
Modify initContent() to include additional logic or filters.
Update the Smarty template configure.tpl to customize the admin panel's appearance and functionalities.
Notes
Ensure database structure aligns with the module's requirements.
Test thoroughly on a staging environment before deploying to production.

Overview
The Modul_debitareAjax is a PrestaShop module designed to handle AJAX-based requests for managing warehouse and product-related operations. It facilitates real-time communication between the client-side and the server for fetching, updating, and calculating data related to cutting and edging operations, warehouse details, product pricing, and category management.

Features
1. AJAX Actions
GetProductData: Fetches product details and associated warehouse information, including categories that allow customization.
GetAllProductData: Retrieves data for all products in the cart, filtering those that permit customization.
GetSingleProductData: Returns details for a specific product, including tax and calculated total price.
GetAllEdgingCategories: Fetches all available product categories for edging operations.
GetProAssoc: Retrieves accessories associated with a specific product.
GetWareHousePrices: Gets pricing details for a product in a specific warehouse, considering the category.
GetWareHousePricesByCategory: Retrieves warehouse prices filtered by category.
GetCategoryProducts: Lists all products in a specific category.
GetProductsValues: Fetches detailed information for a specific product.
GetProductsQtyFromCart: Gets the quantity of a product in the cart.
UpdateEdgingCuttingPrice: Updates the cutting and edging prices for specific products.
2. Real-Time Data Handling
Retrieves product and warehouse information dynamically based on user actions.
Calculates tax-inclusive pricing for products.
Updates pricing for cutting and edging services on-the-fly.
3. Integration with PrestaShop
Uses PrestaShop's core classes like Product, Cart, Category, and Db.
Adheres to PrestaShop's context management and language-specific functionalities.
Installation
Copy the module files to the /modules/ directory in your PrestaShop installation.
Ensure the database tables required by the module (depozite_records and cutting_edges_depozite_records) are created and properly structured.
Activate the module in the PrestaShop admin panel.
Usage
AJAX Request Workflow
Initialization: Requests are handled via action parameters submitted through AJAX calls.
Switch Cases:
Specific actions are executed based on the action value in the AJAX request.
Responses are returned in JSON format.
Customization and Personalization:
Handles product-specific configurations, including categories that allow customization (Permite_personalizare) or are used for edging (Foloseste_la_cantur).
Response Structure
Responses are consistently returned as JSON objects. Example structure:

{
  "status": true,
  "products": [...],
  "warehouse_all": [...],
  "cutting_products": [...],
  "totalPrice": 120.50
}
Key Methods
Main Methods
GetProductData: Fetches product data and applicable warehouses for the cart.
GetSingleProductData: Retrieves and calculates pricing details for a single product.
GetWareHousePrices: Fetches warehouse-specific pricing data.
UpdateEdgingCuttingPrice: Updates pricing for cutting and edging products in the system.
Helper Methods
getdebitare_select($id_category): Retrieves category-specific details.
Get_warehouse_all(): Fetches all warehouse records.
GetWareHousePrices($warehouse_id, $id_category_default): Retrieves cutting and edging prices for a specific warehouse and category.
Get_product_vat($id_tax): Fetches tax rate information for a product.
Dependencies
PrestaShop Context: Utilizes Context::getContext() for accessing cart, language, and product data.
Database Access: Uses Db::getInstance() for executing SQL queries.
Smarty Integration: Assigns data for rendering templates and real-time updates.
Customization
Modify the switch block in the initContent() method to handle additional AJAX actions.
Extend helper methods or add new ones to include more database operations.
Adapt JSON responses to suit specific client-side requirements.
Notes
Ensure the database tables are correctly structured and contain required fields.
Use debugging tools to validate AJAX responses during development.
Test extensively in a staging environment before deploying to production.



