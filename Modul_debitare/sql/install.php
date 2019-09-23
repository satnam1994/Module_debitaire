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
$sql = array();

$sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'cutting_edges_orders_records` ( `id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`), `order_id` int(11) NOT NULL, `product_id` int(11) NOT NULL, `product_name` varchar(100) NOT NULL, `product_quantity` int(11) NOT NULL, `id_customer` int(11) NOT NULL, `id_cart` int(11) NOT NULL, `product_price` TEXT, `Cookie` BLOB) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8';

$sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'Modul_debitare` (
    `id_Modul_debitare` int(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY  (`id_Modul_debitare`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;';

$sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'depozite_records` ( `id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`), `Titlu` varchar(100) NOT NULL, `Nr_piese_pret_extra` int(11) NOT NULL, `Procent_pret_extra` int(11) NOT NULL, `Dimensiune_disc_taiere` DECIMAL( 10, 2 ) NOT NULL, `Margine_taiere` DECIMAL( 10, 2 ) NOT NULL ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8';

$sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'cutting_edges_depozite_records` ( `id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`), `category_id` int(11) NOT NULL, `warehouse_id` int(11) NOT NULL, `warehouse_name` varchar(100) NOT NULL, `Pret_taiere` DECIMAL( 10, 2 ), `Pret_cantuire` DECIMAL( 10, 2 )) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8';

$sql[] = 'ALTER TABLE ' . _DB_PREFIX_ . 'category ADD (`Permite_personalizare` VARCHAR (255) NOT NULL, `Foloseste_la_cantur` VARCHAR (255) NOT NULL)';

foreach ($sql as $query) {
    if (Db::getInstance()->execute($query) == false) {
        return false;
    }
}
