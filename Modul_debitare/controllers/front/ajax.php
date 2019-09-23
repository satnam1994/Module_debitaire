<?php
class Modul_debitareAjaxModuleFrontController extends ModuleFrontController
{
	public function init()
    {
        parent::init();
    }
	
    public function initContent()
    {
        $response = array('status' => false);
		
		$context = Context::getContext();
		$cart = $context->cart;
		$products = $cart->getProducts(true);
		$id_lang = $this->context->language->id;
		
		if (Tools::isSubmit('action')) {
			

			switch (Tools::getValue('action')) {

				case 'GetProductData':
					$warehouse_all = $this->Get_warehouse_all();
					$warehouse_all = json_decode(json_encode($warehouse_all,true), true);
					$product_id = Tools::getValue('product_id');
					
					$productsCatIds = json_decode(json_encode($products,true), true);
					$productsCatIds = array_column($productsCatIds, 'id_category_default', 'id_product');
					foreach($productsCatIds as $product_id_val=>$cat_id){
						$getdebitare_select = $this->getdebitare_select($cat_id);
						if($getdebitare_select['Permite_personalizare'] == 'Da'){
							$all_product[] = $product_id_val;
							$product = new Product($product_id_val);
						}
					}
					$getOrderTotal = $cart->getOrderTotal(true);
					//$cart['totals']['total.amount'] = 100;
					$this->context->smarty->assign(array('total_price' => (float)("100.20")));
					
					$response = array('status' => true, 'product_id' => $product_id, 'products' => $products, 'warehouse_all' => $warehouse_all, 'cutting_products' => $all_product, 'getOrderTotal' => $getOrderTotal);

					break;
					
				case 'GetAllProductData':
					$warehouse_all = $this->Get_warehouse_all();
					$warehouse_all = json_decode(json_encode($warehouse_all,true), true);
					$productsCatIds = json_decode(json_encode($products,true), true);
					$productsCatIds = array_column($productsCatIds, 'id_category_default', 'id_product');
					foreach($productsCatIds as $product_id_val=>$cat_id){
						$getdebitare_select = $this->getdebitare_select($cat_id);
						if($getdebitare_select['Permite_personalizare'] == 'Da'){
							$all_product[] = $product_id_val;
						}
					}
					
					$response = array('status' => true, 'products' => $products, 'warehouse_all' => $warehouse_all, 'cutting_products' => $all_product);

					break;
				case 'GetSingleProductData':
					$product_id = Tools::getValue('product_id');
					$warehouse_all = $this->Get_warehouse_all();
					$productData = new Product($product_id, false, $id_lang);
					
					//Get tax rule values form database
					$id_tax = $productData->id_tax_rules_group;
					$Taxrow = $this->Get_product_vat($id_tax);
					$taxRate = $Taxrow['rate'];
					$taxPrice = ($productData->price / 100) * $taxRate;
					$totalPrice = $productData->price + $taxPrice;
					$response = array('status' => true, 'productData' => $productData, 'warehouse_all' => $warehouse_all, 'totalPrice' => $totalPrice);
					break;
				case 'GetAllEdgingCategories':
					$cats = Category::getCategories( (int)($id_lang), true, false  ) ;
					$response = array('status' => true, 'GetAllEdgingCategories' => $cats);
					break;
				case 'GetProAssoc':
					$Product_id = Tools::getValue('Product_id');
					$getAccessoriesLight = Product::getAccessoriesLight(intval($cookie->id_lang), $Product_id);
					foreach ($getAccessoriesLight as $key => $value) {
						# code...
						$productValData[] = new Product($value['id_product'], false, $id_lang);
					}
					$response = array('status' => true, 'getAccessoriesLight' => $productValData);
					break;
				case 'GetWareHousePrices':
					$warehouse_id = Tools::getValue('warehouse_id');
					$Product_id = Tools::getValue('Product_id');
					$productValues = new Product($Product_id);
					$id_category_default = $productValues->id_category_default;
					$WareHousePrices = $this->GetWareHousePrices($warehouse_id, $id_category_default);
					$productsCart = json_decode(json_encode($products,true), true);
					$productsCart = array_column($productsCart, 'cart_quantity', 'id_product');
					$prodQty = $productsCart[$Product_id];
					$response = array('status' => true, 'WareHousePrices' => $WareHousePrices, 'prodQty' => $prodQty);
					break;
				case 'GetWareHousePricesByCategory':
					$warehouse_id = Tools::getValue('warehouse_id');
					$categoryId = Tools::getValue('categoryId');
					$WareHousePrices = $this->GetWareHousePrices($warehouse_id, $categoryId);
					$response = array('status' => true, 'WareHousePrices' => $WareHousePrices);
					break;
				case 'GetCategoryProducts':
					$root_category_id = Context::getContext()->shop->getCategory();
					$categoryId = Tools::getValue('categoryId');
					$category = new Category($categoryId, (int)$id_lang);
					$products_cat[] = $category->getProducts($id_lang, 0, 1000);
					$response = array('status' => true, 'Catproducts' => $products_cat);
					break;
				case 'GetProductsValues':
					$P_id = Tools::getValue('Product_id');
					$productDataValues = new Product($P_id);
					$response = array('status' => true, 'productDataValues' => $productDataValues);
					break;
				case 'GetProductsQtyFromCart':
					$P_id = Tools::getValue('Product_id');
					$productDataValues = new Product($P_id);
					$productsCart = json_decode(json_encode($products,true), true);
					$productsCart = array_column($productsCart, 'cart_quantity', 'id_product');
					$prodQty = $productsCart[$P_id];
					if($prodQty != null){
						$response = array('status' => true, 'prodQty' => $prodQty);
					}
					break;
				case 'UpdateEdgingCuttingPrice':
					$Total_cutting_price_cal = Tools::getValue('Total_cutting_price_cal');
					$Total_edging_price_cal = Tools::getValue('Total_edging_price_cal');

					//Cutiing Product Update Price
					$product_cutting = new Product(36407);
					$product_cutting->price = $Total_cutting_price_cal;
					$product_cutting->save();
					//Edging Product Update Price
					$product_edging = new Product(36408);
					$product_edging->price = $Total_edging_price_cal;
					$product_edging->save();

					$productsCart = json_decode(json_encode($products,true), true);
					$productsCart = array_column($productsCart, 'cart_quantity', 'id_product');
					$cuttingProdQty = $productsCart[36407];
					$edgingProdQty = $productsCart[36408];

					$response = array('status' => true, 'cuttingProdQty' => $cuttingProdQty, 'edgingProdQty' => $edgingProdQty);
					break;	
				default:
					break;

			}
		}
		
			
		// Classic json response
		$json = Tools::jsonEncode($response);
		$this->ajaxDie($json);
    }

	public function getdebitare_select($id_category)
    {
		$sql = 'SELECT * FROM '._DB_PREFIX_.'category
				WHERE id_category = '. (int)$id_category;
        if ($row = Db::getInstance()->getRow($sql))
         
         return $row;
    }
	
	
	public function Get_warehouse_all()
    {
        
        $sql = 'SELECT id,Titlu FROM `' . _DB_PREFIX_ . 'depozite_records`';
        $rows = Db::getInstance()->ExecuteS($sql);

        return $rows;
    }
	public function GetWareHousePrices($warehouse_id, $id_category_default)
    {
        
		$sql = 'SELECT * FROM '. _DB_PREFIX_ . 'depozite_records WHERE id = '.(int)$warehouse_id; 
		$sql2 = 'SELECT * FROM '. _DB_PREFIX_ . 'cutting_edges_depozite_records WHERE warehouse_id = '.(int)$warehouse_id.' and category_id = '.(int)$id_category_default; 
		$results['depozite_records'] = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);
		$cutting_edges = Db::getInstance()->ExecuteS($sql2);

		$results['cutting_edges'] = $cutting_edges[0];
        return $results;
    }
	
	public function Get_product_vat($id_tax)
    {
        
        $sql = 'SELECT * FROM '._DB_PREFIX_.'tax
				WHERE id_tax = '. (int)$id_tax;
        if ($row = Db::getInstance()->getRow($sql))
         
        return $row;
    }
}

?>