import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

const Navdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);

    //services
    const [isServices, setIsServices] = useState(false);

    //customers
    const [isCustomers, setIsCustomers] = useState(false);
    //Employee
     const [isEmployees, setIsEmployees] = useState(false);



    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const [isLogout, setIsLogout] = useState(false);



    const [isLanding, setIsLanding] = useState(false);


    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Services') {
            setIsServices(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Customers') {
            setIsCustomers(false);
        }
        if (iscurrentState !== 'Employees') {
            setIsEmployees(false);
        }

        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState === 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isServices,
        isMultiLevel,
        isCustomers,
        isEmployees
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dasboard",
            label: "Dashboards",
            icon: <FeatherIcon icon="home" className="icon-dual" />,
            link: "/dashboard",
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Widgets');
            }
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: <FeatherIcon icon="home" className="icon-dual" />,
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            subItems: [



                {
                    id: "projects",
                    label: "Projects",
                    link: "/dashboard-projects",
                    parentId: "dashboard",
                },


            ],
        },
        {
            id: "apps",
            label: "Apps",
            icon: <FeatherIcon icon="grid" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [




                {
                    id: "invoices",
                    label: "Invoices",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsInvoices(!isInvoices);
                    },
                    parentId: "apps",
                    stateVariables: isInvoices,
                    childItems: [
                        { id: 1, label: "List View", link: "/apps-invoices-list" },
                        { id: 2, label: "Details", link: "/apps-invoices-details" },
                        { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
                    ]
                },
                {
                    id: "supportTickets",
                    label: "Support Tickets",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsSupportTickets(!isSupportTickets);
                    },
                    parentId: "apps",
                    stateVariables: isSupportTickets,
                    childItems: [
                        { id: 1, label: "List View", link: "/apps-tickets-list" },
                        { id: 2, label: "Ticket Details", link: "/apps-tickets-details" },
                    ]
                },

            ],
        },
        {
            label: "Cari",
            isHeader: true,
        },
        {
            id: "customer",
            label: "Müşteri",
            icon: <FeatherIcon icon="home" className="icon-dual" />,
            link: "/#",
            stateVariables: isCustomers,
            click: function (e) {
                e.preventDefault();
                setIsCustomers(!isCustomers);
                setIscurrentState('Customers');
                updateIconSidebar(e);
            },
            subItems: [

                {
                    id: "companyList",
                    label: "Firma Listesi",
                    link: "/company-list",
                    parentId: "customer",
                },
                {
                    id: "companyAdd",
                    label: "Firma Ekle",
                    link: "/company-Add",
                    parentId: "customer",
                },

                {
                    id: "customerList",
                    label: "Müşteri Listesi",
                    link: "/customer-list",
                    parentId: "customer",
                },
                {
                    id: "customerAdd",
                    label: "Müşteri Ekle",
                    link: "/customer-Add",
                    parentId: "customer",
                },
            ],
        },

        {
            label: "Çalışan",
            isHeader: true,
        },
        {
            id: "employee",
            label: "Çalışan",
            icon: <FeatherIcon icon="home" className="icon-dual" />,
            link: "/#",
            stateVariables: isEmployees,
            click: function (e) {
                e.preventDefault();
                setIsEmployees(!isEmployees);
                setIscurrentState('Employees');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "employeeList",
                    label: "Çalışan Listesi",
                    link: "/employee-list",
                    parentId: "employee",
                },
                {
                    id: "employeeAdd",
                    label: "Çalışan Ekle",
                    link: "/employee-add",
                    parentId: "employee",
                },
            ],
        },
        {
            label: "Servis",
            isHeader: true,
        },
        {
            id: "services",
            label: "Servis İşlemleri",
            icon: <FeatherIcon icon="home" className="icon-dual" />,
            link: "/#",
            stateVariables: isServices,
            click: function (e) {
                e.preventDefault();
                setIsServices(!isServices);
                setIscurrentState('Services');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "createServiceForm",
                    label: "Servis Formu Oluştur",
                    link: "/service-form-add",
                    parentId: "services",
                },
                {
                    id: "servicesList",
                    label: "Servis Listesi",
                    link: "/service-List",
                    parentId: "services",
                },
                {
                    id: "servicesDetail",
                    label: "Servis detay",
                    link: "/service-detail-form",
                    parentId: "services",
                },
            ],
        },
        {
            label: "pages",
            isHeader: true,
        },
        {
            id: "authentication",
            label: "Authentication",
            icon: <FeatherIcon icon="users" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIscurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                {
                    id: "signIn",
                    label: "Sign In",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsSignIn(!isSignIn);
                    },
                    parentId: "authentication",
                    stateVariables: isSignIn,
                    childItems: [
                        { id: 1, label: "Basic", link: "/auth-signin-basic" },

                    ]
                },
                {
                    id: "signUp",
                    label: "Sign Up",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsSignUp(!isSignUp);
                    },
                    parentId: "authentication",
                    stateVariables: isSignUp,
                    childItems: [
                        { id: 1, label: "Basic", link: "/auth-signup-basic" },

                    ]
                },
                {
                    id: "passwordReset",
                    label: "Password Reset",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsPasswordReset(!isPasswordReset);
                    },
                    parentId: "authentication",
                    stateVariables: isPasswordReset,
                    childItems: [
                        { id: 1, label: "Basic", link: "/auth-pass-reset-basic" },

                    ]
                },


                {
                    id: "logout",
                    label: "Logout",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsLogout(!isLogout);
                    },
                    parentId: "authentication",
                    stateVariables: isLogout,
                    childItems: [
                        { id: 1, label: "Basic", link: "/auth-logout-basic" },
                        { id: 2, label: "Cover", link: "/auth-logout-cover" },
                    ]
                },


            ],
        },
        {
            id: "pages",
            label: "Pages",
            icon: <FeatherIcon icon="command" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsPages(!isPages);
                setIscurrentState('Pages');
                updateIconSidebar(e);
            },
            stateVariables: isPages,
            subItems: [
                {
                    id: "starter",
                    label: "Starter",
                    link: "/pages-starter",
                    parentId: "pages",
                },


            ],
        },


        {
            id: "baseUi",
            label: "Base UI",
            icon: <FeatherIcon icon="package" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsBaseUi(!isBaseUi);
                setIscurrentState('BaseUi');
                updateIconSidebar(e);
            },
            stateVariables: isBaseUi,
            subItems: [
                { id: "alerts", label: "Alerts", link: "/ui-alerts", parentId: "baseUi" },
                { id: "badges", label: "Badges", link: "/ui-badges", parentId: "baseUi" },
                { id: "buttons", label: "Buttons", link: "/ui-buttons", parentId: "baseUi" },
                { id: "colors", label: "Colors", link: "/ui-colors", parentId: "baseUi" },
                { id: "cards", label: "Cards", link: "/ui-cards", parentId: "baseUi" },
                { id: "carousel", label: "Carousel", link: "/ui-carousel", parentId: "baseUi" },
                { id: "dropdowns", label: "Dropdowns", link: "/ui-dropdowns", parentId: "baseUi" },
                { id: "grid", label: "Grid", link: "/ui-grid", parentId: "baseUi" },
                { id: "images", label: "Images", link: "/ui-images", parentId: "baseUi" },
                { id: "tabs", label: "Tabs", link: "/ui-tabs", parentId: "baseUi" },
                { id: "accordions", label: "Accordion & Collapse", link: "/ui-accordions", parentId: "baseUi" },
                { id: "modals", label: "Modals", link: "/ui-modals", parentId: "baseUi" },
                { id: "offcanvas", label: "Offcanvas", link: "/ui-offcanvas", parentId: "baseUi" },
                { id: "placeholders", label: "Placeholders", link: "/ui-placeholders", parentId: "baseUi" },
                { id: "progress", label: "Progress", link: "/ui-progress", parentId: "baseUi" },
                { id: "notifications", label: "Notifications", link: "/ui-notifications", parentId: "baseUi" },
                { id: "media", label: "Media object", link: "/ui-media", parentId: "baseUi" },
                { id: "embedvideo", label: "Embed Video", link: "/ui-embed-video", parentId: "baseUi" },
                { id: "typography", label: "Typography", link: "/ui-typography", parentId: "baseUi" },
                { id: "lists", label: "Lists", link: "/ui-lists", parentId: "baseUi" },
                { id: "general", label: "General", link: "/ui-general", parentId: "baseUi" },
                { id: "ribbons", label: "Ribbons", link: "/ui-ribbons", parentId: "baseUi" },
                { id: "utilities", label: "Utilities", link: "/ui-utilities", parentId: "baseUi" },
            ],
        },
        {
            id: "advanceUi",
            label: "Advance UI",
            icon: <FeatherIcon icon="layers" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAdvanceUi(!isAdvanceUi);
                setIscurrentState('AdvanceUi');
                updateIconSidebar(e);
            },
            stateVariables: isAdvanceUi,
            subItems: [
                { id: "nestablelist", label: "Nestable List", link: "/advance-ui-nestable", parentId: "advanceUi" },
                { id: "scrollbar", label: "Scrollbar", link: "/advance-ui-scrollbar", parentId: "advanceUi" },
                { id: "animation", label: "Animation", link: "/advance-ui-animation", parentId: "advanceUi" },
                { id: "tour", label: "Tour", link: "/advance-ui-tour", parentId: "advanceUi" },
                { id: "swiperslider", label: "Swiper Slider", link: "/advance-ui-swiper", parentId: "advanceUi" },
                { id: "ratings", label: "Ratings", link: "/advance-ui-ratings", parentId: "advanceUi" },
                { id: "highlight", label: "Highlight", link: "/advance-ui-highlight", parentId: "advanceUi" },
            ],
        },




        {
            id: "multilevel",
            label: "Multi Level",
            icon: <FeatherIcon icon="share-2" className="icon-dual" />,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsMultiLevel(!isMultiLevel);
                setIscurrentState('MuliLevel');
                updateIconSidebar(e);
            },
            stateVariables: isMultiLevel,
            subItems: [
                { id: "level1.1", label: "Level 1.1", link: "/#", parentId: "multilevel" },
                {
                    id: "level1.2",
                    label: "Level 1.2",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsLevel1(!isLevel1);
                    },
                    stateVariables: isLevel1,
                    childItems: [
                        { id: 1, label: "Level 2.1", link: "/#" },
                        {
                            id: "level2.2",
                            label: "Level 2.2",
                            link: "/#",
                            isChildItem: true,
                            click: function (e) {
                                e.preventDefault();
                                setIsLevel2(!isLevel2);
                            },
                            stateVariables: isLevel2,
                            childItems: [
                                { id: 1, label: "Level 3.1", link: "/#" },
                                { id: 2, label: "Level 3.2", link: "/#" },
                            ]
                        },
                    ]
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;