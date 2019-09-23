<?php
/**
* 2007-2019 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2019 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class Modul_debitare extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'Modul_debitare';
        $this->tab = 'administration';
        $this->version = '2.0.0';
        $this->author = 'Prologue';
        $this->need_instance = 1;

        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Modul debitare');
        $this->description = $this->l('Modulul pentru zona de
personalizare si debitare');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall my module?');

        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        Configuration::updateValue('MODUL_DEBITARE_LIVE_MODE', false);

        include(dirname(__FILE__).'/sql/install.php');

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook('actionAdminStoresControllerSaveAfter') &&
            $this->registerHook('actionCartListOverride') &&
            $this->registerHook('actionCategoryAdd') &&
            $this->registerHook('actionCategoryDelete') &&
            $this->registerHook('actionCategoryUpdate') &&
            $this->registerHook('actionModuleInstallBefore') &&
            $this->registerHook('displayBackOfficeCategory') &&
            $this->registerHook('categoryAddition') &&
			$this->registerHook('displayProductButtons') &&
			$this->registerHook('displayCartExtraProductActions') &&
            $this->registerHook('displayShoppingCartFooter') &&
            $this->registerHook('displayCheckoutSubtotalDetails') &&
            $this->registerHook('displayOrderConfirmation') &&
            $this->registerHook('actionEmailAddAfterContent') &&
            $this->registerHook('displayAdminOrder') &&
            $this->installTab('DepoziteModule', 'Depozite', 'CONFIGURE') &&
            $this->registerHook('displayProductTabContent');
    }

    public function uninstall()
    {
        Configuration::deleteByName('MODUL_DEBITARE_LIVE_MODE');

        $id_tab = Tab::getIdFromClassName($this->tabClassName);
        if ($id_tab) {
            $tab = new Tab($id_tab);
            $tab->delete();
        }
        
        include(dirname(__FILE__).'/sql/uninstall.php');

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitModul_debitareModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitModul_debitareModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('Settings'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => 'MODUL_DEBITARE_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Use this module in live mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'col' => 3,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-envelope"></i>',
                        'desc' => $this->l('Enter a valid email address'),
                        'name' => 'MODUL_DEBITARE_ACCOUNT_EMAIL',
                        'label' => $this->l('Email'),
                    ),
                    array(
                        'type' => 'password',
                        'name' => 'MODUL_DEBITARE_ACCOUNT_PASSWORD',
                        'label' => $this->l('Password'),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        return array(
            'MODUL_DEBITARE_LIVE_MODE' => Configuration::get('MODUL_DEBITARE_LIVE_MODE', true),
            'MODUL_DEBITARE_ACCOUNT_EMAIL' => Configuration::get('MODUL_DEBITARE_ACCOUNT_EMAIL', ''),
            'MODUL_DEBITARE_ACCOUNT_PASSWORD' => Configuration::get('MODUL_DEBITARE_ACCOUNT_PASSWORD', null),
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
    * Add the CSS & JavaScript files you want to be loaded in the BO.
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }

    public function hookActionAdminStoresControllerSaveAfter()
    {
        /* Place your code here. */
    }

    public function hookActionCartListOverride()
    {
        /* Place your code here. */
    }

    public function hookActionCategoryAdd()
    {
        /* Place your code here. */
    }

    public function hookActionCategoryDelete()
    {
        /* Place your code here. */
    }

    

    public function hookActionModuleInstallBefore()
    {
        /* Place your code here. */
    }

    public function hookdisplayAdminOrder($param)
    {
        $id_order = $param['id_order'];
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'cutting_edges_orders_records` where `order_id` ='.$id_order;
        $getOrderRes = Db::getInstance()->ExecuteS($sql);
        if(!empty($getOrderRes)){
            $this->context->smarty->assign(array(
                'product_pieces'=> $getOrderRes,
            ));

            return $this->display(__FILE__, 'displayOrderConfirmationCsvButton.tpl');
        }

    }

    public function hookactionEmailAddAfterContent($param)
    {
       if($param['template'] == "bankwire" || $param['template'] == "outofstock"){
        
            $context = Context::getContext();
            $cart = $context->cart;
            $products = $cart->getProducts(true);
            $cookiesData = array();
            foreach ($products as $key => $value) {
               $id_product =  $value['id_product'];
               if(isset($_COOKIE["product_".$id_product])) {
                    $cookiesData[] = $_COOKIE["product_".$id_product];
               }            
            }

           /* echo "<pre>";
            print_r($cookiesData);
            echo "<pre>";

            die();*/
        }
    }
    public function hookdisplayOrderConfirmation($param)
    {
        $order_id = $param['order']->id;
        $getOrderRes =  $this->check_order_id_exist($order_id);
        if(empty($getOrderRes)){
            $id_cart = $param['order']->id_cart;
            $id_customer = $param['order']->id_customer;
            $order_details = new Order($order_id);
            $products = $order_details->getProducts();
            $products_array = '';
            $products_qty = count($products);
            $count = 1;
            $process_complete = false;
            foreach ($products as $key => $value) {
                $products_array = '';
                if(!isset($_COOKIE["product_".$value['product_id']])) {
                    $products_array = array("product_quantity" => $value['product_quantity'], "order_id" => $order_id, "id_cart" => $id_cart, "id_customer" => $id_customer, "product_id" => $value['product_id'], "product_name" => $value['product_name'], "product_price" => $value['product_price']);
                    $this->cutting_edging_orders_add($products_array);
                } else {
                    $Cookie_values = $_COOKIE["product_".$value['product_id']];
                    $products_array = array("product_quantity" => $value['product_quantity'], "Cookie" => $Cookie_values, "order_id" => $order_id, "id_cart" => $id_cart, "id_customer" => $id_customer, "product_id" => $value['product_id'], "product_name" => $value['product_name'], "product_price" => $value['product_price']);
                    $this->cutting_edging_orders_add($products_array);
                }
                if($count ==  $products_qty){
                    $process_complete = true;
                }

                $count++;
            }
            if($process_complete == true){
                $getOrderRes =  $this->check_order_id_exist($order_id);
                $this->ClearAllCookieData();
            }

        }else{

            $this->ClearAllCookieData();
        }

        if(!empty($getOrderRes) || ($process_complete == true && !empty($getOrderRes))){
            $this->context->smarty->assign(array(
                'product_pieces'=> $getOrderRes,
            ));

            return $this->display(__FILE__, 'displayOrderConfirmation.tpl');
        }
    }
	
    public function hookdisplayCheckoutSubtotalDetails()
    {
        return $this->display(__FILE__, 'warehouse_price_list.tpl');
    }
    public function hookdisplayShoppingCartFooter()
	{
		$GetButtonPath = $this->GetButtonPath();
		$this->context->smarty->assign(array(
            'debitare_white_img_url'=> $GetButtonPath['debitare_white_img_url'],
        ));
		return $this->display(__FILE__, 'bottomproductcartpagebutton.tpl');
	}
	  
    public function GetButtonPath(){
		
		return 
		
		array ('debitare_blue_img_url'=> 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgxNEI2QkE1OTczODExRTk4N0EwQjY0ODJDM0UxRkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgxNEI2QkE2OTczODExRTk4N0EwQjY0ODJDM0UxRkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODE0QjZCQTM5NzM4MTFFOTg3QTBCNjQ4MkMzRTFGQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODE0QjZCQTQ5NzM4MTFFOTg3QTBCNjQ4MkMzRTFGQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7PX+fwAAACq0lEQVR42ryWa2jNYRzH/8eZoWG1vXBZGkZKbrnlUu5LxDrKpWzSeSu3F0pRvEBZLK8k5DJDkRIi5GxeUGzUbEUWNbMlzYRs2czl86vvqdO/538uS3716fn/z/Ps+f5uz/NfqHDRYS9NGwtf4DNMhgpY3Vyzu3v04vISnu/y3JPORv289G0vvIIoXIdiqESwkvEGbIgv5Lek+2alENoMk+ChNrXNzsJPqIJN8As6YBditnaNHHvcV9FpsNM21Ps8mAudcBJa4RZMhRNKewhGJds05KhpGFbIIRMbAdtgBlyCOXAbvtpi6mjpzOExAjH4ALUqxTvm96cTqaXrlMTMnkAdbIQ3iuRqYg3ZuFMOmQMNDMNgFlzJpJEeQRuMgS0SLZWg2aeg1OGApXqK1ramI2o1PAILoQB64TwUar4R1sGOFL0wHn6ruVogmky0RHVsUTrXymuz+zAbrskZL0m0zxmGwx011ctkohblezWT1WO9frealcEPyIejcqKCKPIDtC3S+fBMjRUougwGKz3jEhZbi7er8WJKbx5sh2qE+wccRxOcaRGzpsAlaoI3YaA6r0ln1Jw4qDVLdCbLtFmp0r/UkeKPuiS+6Xw7RR/APhgE5ZCdkNq45Wp86xuH+kUVve1pZ3g5TtQGpfccfFfxQ46UVWv+IuzR2bT3GkekdlWeUX8sCKqpTV5WOo9Bt0O0Qx1uURzSGEGg3RFpjub/2FreJ7hEB8A9bXwBjgd0pUVVpLQVIRgLWLdVvWApns661y7RLnlfrPemFBdAV4r5Kh2bpwg2proGV2lcCQeUgYyMVJ5meKH9o7yH/V+ZZt/fDFEHZ6vOvV7mFtaHw45Lj78/snSv1vmvKmyk/kXpq1lX1/t+m2h3QPzT1uZYUO/9e8tNFI2I/2J/BRgAl326vCjZkz8AAAAASUVORK5CYII=',
		
		'debitare_white_img_url' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhGODZFMzBDOTczODExRTk5Q0M1QzI0QjBEMTFCMTBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGODZFMzBEOTczODExRTk5Q0M1QzI0QjBEMTFCMTBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEY4NkUzMEE5NzM4MTFFOTlDQzVDMjRCMEQxMUIxMEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEY4NkUzMEI5NzM4MTFFOTlDQzVDMjRCMEQxMUIxMEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4QDoGbAAACZUlEQVR42rzVz0sWQRzH8X0eHx9TyaiIyJTAQ0UgGWK/L1H0u+gQRYcI/4DIQxhU2MGTVNAlIqJDUVTnkEjsElGQIY8dKiLBwgrhITQfg0zb3lOfh8Zpdh8fiwZe7O7sd+a7OzszG4RhGExTHebpvB5dKNP1XqSn21dQRNKrGEIz3oS/ym1c0/lhKzb5N0mP4Cx2IYcvSjCO6zqfQBZ96MBrbIjrNxXElwa04Liu12MdxnAZg7iLlbiEeiRQG9dp4ufrTi0l2IGUki3CUTTiJtaiEyNWm0rswwN8xFO8xFuc+SNrxBB8CH+XJ1iAG/iuujsxw2eGeUCxt4oZ3kcayo2Yix4sse5nY0bPDHWVRmLQG+E8RYMmzpDeqEZPni/PsR+pAhOwEZNq804zPnL2timwB4fQYiW8j1lFLDHzSTrVdk1c0nI9Wa/W2mM1yqkTEzMf57Q5nNe1L6mpH9YLJOKS7sEnjGIpLijpad03w5rBNzzT0Qx/qSfpQnSr/T0s9iXdogCzASy36iut862KOajrA7reHvG2tRiR1fn6pDWnutGGcnQgrfoxK2aOjv3OscozR0vVp1nD27R2vbO3RkPba23m7ncy91/hpI6j1vd2tWokWqO+aQkeejZv1yb0K84cN0fEmc9ySpuE+fbLfEkrFJRVhxcLLImKAvdPqJ8u/Qpj/zKrFHysiDXpU60Not29l/RMgN067kQ7yoLiyxX0wfTfrJ/IlL/MgNNgtmZwWsETM0hq2k3iM8bx1U0aakN/4TSsRl0w85JDxqlbgab8X+a9JyAT/Pti1nlT/k3/a/khwACY1AKAw9O4CAAAAABJRU5ErkJggg==');
	}
	
    public function hookdisplayCartExtraProductActions($params)
	{
		
		// Use In live server
		$product = json_decode(json_encode($params['product'], true), true);
		$id_product = $product['id'];

		$id_lang = $this->context->language->id;
		$productData = '';
		if (isset($id_product) && (int)$id_product) {
			$productData = new Product($id_product, false, $id_lang);
			$id_category_default = $productData->id_category_default;
        }

		$GetButtonPath = $this->GetButtonPath();

		$getdebitare_select = $this->getdebitare_select($id_category_default);
		
		//Add direct $id_category_default when work on local server and comment previous line code.
		
		if($getdebitare_select['Permite_personalizare'] == 'Da'){
			
			$this->context->smarty->assign(array(
				'debitare_blue_img_url'=> $GetButtonPath['debitare_blue_img_url'],
				'product_id'=> $id_product,
			));
			
			return $this->display(__FILE__, 'productcartpagebutton.tpl');
		}
	}

    public function hookDisplayProductButtons($params)
    {
		$id_product = (int)$params['product']->id_product;
		$id_lang = $this->context->language->id;
		if (isset($id_product) && (int)$id_product) {
			$product = new Product($id_product,false,$id_lang);
			$id_category_default = $product->id_category_default;
        }
		$GetButtonPath = $this->GetButtonPath();
		$this->context->smarty->assign(array(
            'debitare_white_img_url'=> $GetButtonPath['debitare_white_img_url'],
			'product_id'=> $id_product,
        ));
		
		$getdebitare_select = $this->getdebitare_select($id_category_default);
		
		if($getdebitare_select['Permite_personalizare'] == 'Da'){
			
			return $this->display(__FILE__, 'productpagebutton.tpl');
		}
		
    }

    public function hookDisplayProductTab()
    {
        /* Place your code here. */
		
    }

    public function hookDisplayProductTabContent()
    {
        /* Place your code here. */
    }
	
	public function getdebitare_select($id_category)
    {
		
		$sql = 'SELECT * FROM '._DB_PREFIX_.'category
				WHERE id_category = '. (int)$id_category;
        if ($row = Db::getInstance()->getRow($sql))
         
         return $row;
    }

    public function cutting_edging_orders_add($insert_Data)
    {
        if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->insert('cutting_edges_orders_records', $insert_Data))
            return false;
    }
     public function check_order_id_exist($order_id)
    {
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'cutting_edges_orders_records` where `order_id` ='.$order_id;
        $rows = Db::getInstance()->ExecuteS($sql);
        return $rows;
    }
    public function ClearAllCookieData()
    {
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time()-1000);
                setcookie($name, '', time()-1000, '/');
            }
        }
    }
    public function Get_warehouse_all()
    {
        
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'depozite_records`';
        $rows = Db::getInstance()->ExecuteS($sql);

        return $rows;
    }
	
    public function hookDisplayBackOfficeCategory($params)
    {
        // we need an actual id, otherwise if we are just adding the category this field can be left empty
        if(Tools::getValue('id_category'))
            $ResponseData = $this->getdebitare_select(Tools::getValue('id_category'));
        else $ResponseData = '';
        $this->context->smarty->assign(array(
            'Permite_personalizare'=> $ResponseData['Permite_personalizare'],
            'Foloseste_la_cantur'=> $ResponseData['Foloseste_la_cantur'],
        ));
     
        return $this->display(__FILE__, 'backoffice.tpl');
    }

    public function hookCategoryAddition($params)
    {  
        Db::getInstance()->update('category', array('Permite_personalizare' => pSQL(Tools::getValue('Permite_personalizare')), 'Foloseste_la_cantur' => pSQL(Tools::getValue('Foloseste_la_cantur'))), 'id_category = ' . $params['category']->id);
    }

    public function hookActionCategoryUpdate($params)
    {
         $this->hookCategoryAddition($params);
    }

    public function installTab($className, $tabName, $tabParentName = false)
    {
        $tab = new Tab();
        $tab->active = 1;
        $tab->class_name = $className;
        $tab->name = array();

        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $tabName;
        }
        if ($tabParentName) {
            $tab->id_parent = (int) Tab::getIdFromClassName($tabParentName);
        } else {
            $tab->id_parent = 0;
        }
        $tab->module = $this->name;
        return $tab->add();
    }

}
