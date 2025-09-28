import React from "react";
import {Routes, Route ,Navigate} from "react-router-dom";
import styles from "./Components/styles/App.module.css";

import { ThemeProvider } from "./Components/context/ThemeContext";
//layouts
import Header from "./Components/layout/Header";
import Sidebar from "./Components/layout/Sidebar";
import TopNav from "./Components/layout/TopNav";
import Footer from "./Components/layout/Footer";

//sidebar pages
import BarcodeForm from "./Components/pages/BarcodeForm";
import Promotions from "./Components/pages/Promotions";
import Reorder from "./Components/pages/Reorder";
import SwitchDashboard from "./Components/pages/Swichdashboard";
import ProfitLossStatement from "./Components/pages/ProfitLossStatement";
import DownloadReportsPage from "./Components/pages/DownloadReport";
import Tax from "./Components/pages/TaxSummaryPage";
import Year from "./Components/pages/YearlyComparisonPage";

//topnav pages
//entities pages
import Item from './pages/entities/Items'; 
import Employee from './pages/entities/EmployeePage'; 
import Suppliers from './pages/entities/Supliers'; 
import Customer from './pages/entities/Customers'; 
import User from './pages/entities/User';
//stocks pages
import StockFinder from './pages/stocks/Finder';
import StockAddition from './pages/stocks/Addition';
import StockTransfer from './pages/stocks/Transfer';
import StockDeduction from './pages/stocks/Deduction';
import StockValuation from './pages/stocks/Valuation';

import CustomerOrders from './pages/Sales/CustomerOrder';
import SalesInvoicePage from './pages/Sales/SalesInvoicePage';

import PurchaseOrder from './pages/tradings/PurchaseOrder';
import Sorder from './pages/Order/Sorder';
import OrderTable from "./pages/Order/OrderTable";
import Rorder from './pages/Order/ReorderSuggestions';
import UploadInvoice from "./pages/Order/InvoiceUpload";
import SalesReturnPage from "./pages/Sales/SalesReturnPage";

import WarrantyPage from './pages/warranty/WarrantyPage';
import WarrantyClaim from './pages/warranty/WarrantyClaim';

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        
          <Header />
          <div className={styles.dashboardLayout}>
            <Sidebar />
            <div className={styles.mainContent}>
              <TopNav />
              <Routes>
                <Route path="/" element={<Reorder/>}/>
                <Route path="/barcodes" element={<BarcodeForm />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/reorder-Alert" element={<Reorder />} />
                <Route path="/switch-dashboard" element={<SwitchDashboard />} />

                <Route path="/profit-loss-statement" element={<ProfitLossStatement />} />
                <Route path="/download-reports" element={<DownloadReportsPage />} />
                <Route path="/tax-summary" element={<Tax />} />
                <Route path="/yearly-comparison" element={<Year />} />
                


  <Route path="/entities/customer" element={<Customer />} />
  <Route path="/entities/item-details" element={<Item />} />
  <Route path="/entities/employees" element={<Employee />} />
  <Route path="/entities/suppliers" element={<Suppliers />} />
  <Route path="/entities/user" element={<User/>} />
  
  <Route path="/stocks/stock-finder" element={<StockFinder />} />
  <Route path="/stocks/stock-addition" element={<StockAddition />} />
  <Route path="/stocks/stock-transfer" element={<StockTransfer />} />
  <Route path="/stocks/stock-deduction" element={<StockDeduction />} />
  <Route path="/stocks/stock-valuation" element={<StockValuation />} />
  
  <Route path="/tradings/purchase-order" element={<PurchaseOrder />} />

  <Route path="/sales/customer-orders" element={<CustomerOrders />} />
  <Route path="/sales/sales-invoice" element={<SalesInvoicePage />} />
  <Route path="/sales/sales-return" element={<SalesReturnPage />} />
  
  {/* Order Management */}

  <Route path="/order/create-order" element={<Sorder />} />
  <Route path="/order/check-order" element={<OrderTable />} />
  <Route path="/order/reorder-suggestions" element={<Rorder />} />
  <Route path="/order/upload-invoice" element={<UploadInvoice />} />
  {/* Add all other pages here... */}

  <Route path="/warranty/warranty-details" element={<WarrantyPage />} />
  <Route path="/warranty/warranty-claims" element={<WarrantyClaim />} />

              </Routes>
              <Footer /> 
            </div>
          </div>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
