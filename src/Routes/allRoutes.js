import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard

import Dashboard from "../pages/Dashboard";


//services
 
//Invoices
import InvoiceList from "../pages/Invoices/InvoiceList";
import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// Support Tickets
import ListView from '../pages/SupportTickets/ListView';
import TicketsDetails from '../pages/SupportTickets/TicketsDetails';



// Base Ui
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiModals from "../pages/BaseUi/UiModals/UiModals";
import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";




//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';
//pages

import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';

//login
import Login from "../pages/Authentication/Login";

import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";




import CustomerAdd from "../pages/Customer/Customer-Add";
import EmployeeAdd from "../pages/Employee/EmployeeAdd";
import EmployeeList from "../pages/Employee/EmployeeList";
import CompanyAdd from "../pages/Company/company-add";
import CompanyList from "../pages/Company/company-list";
import CustomerList from "../pages/Customer/customer-list";
import ServiceFormAdd from "../pages/Services/service-form-add";
import ServiceList from "../pages/Services/service-list";
import ServiceDetailsForm from "../pages/Services/service-form-print";
 



const authProtectedRoutes = [
  //Dashboard
  { path: "/dashboard", component: Dashboard },
  //Services
  { path: "/service-form-add", component: ServiceFormAdd },
  { path: "/service-list", component: ServiceList },
{ path: "/service-detail-form", component: ServiceDetailsForm },

  //Customers
  { path: "/customer-list", component: CustomerList },
  { path: "/customer-add", component: CustomerAdd },

  //company
  { path: "/company-list", component: CompanyList },
  { path: "/company-add", component: CompanyAdd },


  //employee
  { path: "/employee-add", component: EmployeeAdd },
  { path: "/employee-list", component: EmployeeList },


  //Invoices
  { path: "/apps-invoices-list", component: InvoiceList },
  { path: "/apps-invoices-details", component: InvoiceDetails },
  { path: "/apps-invoices-create", component: InvoiceCreate },

  //Supports Tickets
  { path: "/apps-tickets-list", component: ListView },
  { path: "/apps-tickets-details", component: TicketsDetails },



  // Base Ui
  { path: "/ui-alerts", component: UiAlerts },
  { path: "/ui-badges", component: UiBadges },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-dropdowns", component: UiDropdowns },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-tabs", component: UiTabs },
  { path: "/ui-accordions", component: UiAccordions },
  { path: "/ui-modals", component: UiModals },
  { path: "/ui-offcanvas", component: UiOffcanvas },
  { path: "/ui-placeholders", component: UiPlaceholders },
  { path: "/ui-progress", component: UiProgress },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-media", component: UiMediaobject },
  { path: "/ui-embed-video", component: UiEmbedVideo },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-lists", component: UiList },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-ribbons", component: UiRibbons },
  { path: "/ui-utilities", component: UiUtilities },

  // Advance Ui
  { path: "/advance-ui-nestable", component: UiNestableList },
  { path: "/advance-ui-scrollbar", component: UiScrollbar },
  { path: "/advance-ui-animation", component: UiAnimation },
  { path: "/advance-ui-tour", component: UiTour },
  { path: "/advance-ui-swiper", component: UiSwiperSlider },
  { path: "/advance-ui-ratings", component: UiRatings },
  { path: "/advance-ui-highlight", component: UiHighlight },







  // //Pages
  // { path: "/pages-starter", component: Starter },

  //User Profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: BasicSignIn },
  { path: "/auth-signup-basic", component: BasicSignUp },
  { path: "/auth-pass-reset-basic", component: BasicPasswReset },

  { path: "/auth-logout-basic", component: BasicLogout },

  { path: "/auth-404-basic", component: Basic404 },




];

export { authProtectedRoutes, publicRoutes };