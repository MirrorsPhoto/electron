module.exports = {
  auth: {
    login: {
      name: 'Login',
      required: 'Login is require'
    },
    password: {
      name: 'Password',
      required: 'Password is require'
    },
    invalid_login_or_pass: 'Invalid login or password',
    empty_login_or_pass: 'Please fill all field'
  },
  user: {
    roles: {
      admin: 'Admin',
      staff: 'Staff'
    }
  },
  menu: {
    dashboard: {
      name: 'Dashboard',
      check: {
        table: {
          head: {
            title: 'Title',
            count: 'Count',
            price: 'Price'
          },
          total: 'Amount: %total%₽'
        },
        send_button: 'Pay'
      },
      counts: {
        no_connection: 'No connection...',
        cash_today: 'Cash today'
      },
      widget_photo: {
        size_field_label: 'Size',
        count_field_label: 'Count',
        photoshop_connection: {
          yes: 'Photoshop is connected',
          no: 'Photoshop is disconnected'
        }
      },
      widget_good: {
        field_label: 'Barcode or query',
        errors: {
          empty_field: 'Please enter good name or barcode',
          invalid_length: 'Barcode must be 13 char',
          not_found: 'Good not found...',
          good_expired: 'Good has expired...'
        }
      },
      widget_lamin: {
        field_label: 'Size'
      },
      widget_copy: {
        field_label: 'Size'
      }
    },
    storehouse: {
      name: 'Good'
    },
    statistic: {
      name: 'Statistic'
    },
    settings: {
      name: 'Settings'
    },
    logout_button: 'Logout'
  },
  units: {
    count: 'pcs.',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    clients: ['client', 'clients', 'clients']
  },
  ui: {
    select_not_found: 'Not found...',
    update_modal: {
      title: 'New app version!',
      confirm_button: 'Download and update',
      cancel_button: 'Later',
      version: 'Version %version%'
    }
  },
  services: {
    photo: 'Photo',
    good: 'Good',
    copy: 'Copy',
    lamin: 'Lamination'
  }
}
