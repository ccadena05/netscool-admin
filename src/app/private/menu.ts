export const menu = [
    {
        id:'SE01',
        label: "Servicios escolares",
        icon:'edit_note',
        menu: [
          {
             item: "Alumnos",
             icon:'face',
             link:'/m/alumnos',
             action: 'index'
          },
          {
            item: "Egresados",
            icon:'school',
            link:'/m/egresados',
            action: 'index'
          },
          {
            item: "Contactos",
            icon:'contacts',
            link:'/m/contactos',
            action: 'index'
          },
          {
            item: "Programas académicos",
            icon:'import_contacts',
            link:'/m/programa_academico',
            action: 'index'
          },
          {
            item: "Maestros",
            icon:'supervisor_account',
            link:'/m/maestros',
            action: 'index'
          },
          {
            item: "Materias",
            icon:'menu_book',
            link:'/m/materias',
            action: 'index'
          },
          {
            item: "Horarios",
            icon:'schedule',
            link:'/m/horarios',
            action: 'index'
          },
          {
            item: "Fechas de inscripciones",
            icon:'calendar_today',
            link:'/m/fecha_inscripcion',
            action: 'index'
          },
       ]
    },
    {
        id:'CRM01',
        label: "CRM",
        icon:'web',
        menu: [
          {
            item: "Prospectos",
            icon:'location_searching',
            link:'/m/prospectos',
            action: 'index'
          },
          {
            item: "Eventos de prospección",
            icon:'event_note',
            link:'/m/evento_pre_registro',
            action: 'index'
          },
          {
            item: "Documentos",
            icon:'article',
            link:'/m/documento_nombre',
            action: 'index'
          },
          {
            item: "Metas",
            icon:'flag',
            link:'/m/meta_preregistro',
            action: 'index'
          },
          {
            item: "Escuelas de procedencia",
            icon:'location_city',
            link:'/m/escuela_procedencia',
            action: 'index'
          },
          {
            item: "Registros de ferias",
            icon:'app_registration',
            link:'/m/registro_feria',
            action: 'index'
          },
          {
            item: "Admisión de pagos",
            icon:'payments',
            link:'/m/admision_pagos',
            action: 'index_admision_pagos'
          },
          {
            item: "Periodos de prospección ",
            icon:'date_range',
            link:'/m/periodo_pre_registro',
            action: 'index'
          },
          {
            item: "Medios de registro ",
            icon:'cloud',
            link:'/m/redes_sociales',
            action: 'index'
          },
       ]
    },
    {
      id:'FI01',
      label: "Finanzas",
      icon:'attach_money',
      menu: [
        {
          item: "Conciliacion",
          icon:'face',
          link:'/perfil',
          action: 'index'
        },
        {
          item: "Pagos",
          icon:'paid',
          link:'/demo',
          action: 'index'
        },
        {
          item: "Bancos",
          icon:'account_balance',
          link:'/m/banco',
          action: 'index'
        },
        {
         item: "Costo Aranceles",
         icon:'attach_money',
         link:'/costo_aranceles',
         action: 'index'
       },
       {
         item: "Aranceles",
         icon:'request_quote',
         link:'/m/pagos_aranceles',
         action: 'index'
       },
       {
         item: "Promociones",
         icon:'savings',
         link:'/m/promocion',
         action: 'index'
       },
     ]
  },
  {
    id:'ME01',
    label: "Mercadotecnia",
    icon:'campaign',
    menu: [
      {
        item: "Eventos",
        icon:'event',
        link:'/eventos',
        action: 'index'
      },
      {
        item: "Banners",
        icon:'ad_units',
        link:'/m/banners',
        action: 'index'
      },
      {
        item: "Vida estudiantil",
        icon:'travel_explore',
        link:'/m/comunidad',
        action: 'index'
      },
      {
         item: "Promociones",
         icon:'sell',
         link:'/promociones',
         action: 'index'
       },
   ]
}
 ];
