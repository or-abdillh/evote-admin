import {
  mdiAccountCircle,
  mdiAccountGroup,
  mdiPlus,
  mdiDesktopMac,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiMonitorShimmer,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive
} from '@mdi/js'

export default [
  'Admin',
  [
    {
      to: '/',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Pemilih',
  [
	{
      to: '/DPT',
      icon: mdiAccountGroup,
      label: 'DPT'
    },
  	{
      to: '/',
      icon: mdiPlus,
      label: 'Tambah Pemilih'
    }
  ],
  'Kandidat',
  [
  	{
      to: '/',
      icon: mdiAccountGroup,
      label: 'Pasangan Calon'
    },
    {
      to: '/',
      icon: mdiPlus,
      label: 'Tambah Paslon'
    }
  ],
  'Acara',
  [
  	{
      to: '/',
      icon: mdiPlus,
      label: 'Kelola Acara'
    }
  ],
  'Examples',
  [
    {
      to: '/ui',
      label: 'UI',
      icon: mdiTelevisionGuide
    },
    {
      to: '/responsive',
      label: 'Responsive',
      icon: mdiResponsive
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: mdiAccountCircle
    },
    {
      to: '/login',
      label: 'Login',
      icon: mdiLock
    },
    {
      to: '/error',
      label: 'Error',
      icon: mdiAlertCircle
    },
    {
      label: 'Submenus',
      subLabel: 'Submenus Example',
      icon: mdiViewList,
      menu: [
        {
          label: 'Sub-item One'
        },
        {
          label: 'Sub-item Two'
        }
      ]
    }
  ]
]
