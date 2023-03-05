export const adminMenu = [
    { //quan li nguoi dung
        name: 'menu.admin.manage-user', 
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage'},
            { name: 'menu.admin.crud-redux', link: '/system/user-redux'},
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'},
            { name: 'menu.admin.manage-admin', link: '/system/user-admin'},
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'},
        ]
    },
    { //quan li phong kham
        name: 'menu.admin.clinic', 
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manange-clinic'},
        ]
    },
    { //quan li chuyen khoa
        name: 'menu.admin.specialty', 
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manange-specialty'},
        ]
    },
];

export const doctorMenu = [
    { //quan li kế hoach bác sĩ
        name: 'menu.admin.manage-user', 
        menus: [
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'},
        ]
    },
];