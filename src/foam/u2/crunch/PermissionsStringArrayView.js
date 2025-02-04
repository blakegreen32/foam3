/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'PermissionRow',
  extends: 'foam.nanos.auth.Permission',

  tableColumns: [ 'granted', 'id', 'description' ],

  properties: [
    {
      class: 'Boolean',
      name: 'granted',
      tableWidth: 70,
      tableCellFormatter: function(value, obj) {
        var cb = foam.u2.CheckBox.create({data: value}, this);
        this.onDetach(cb.data$.sub (()=> {
          if ( cb.data == value ) return;
          obj.granted = cb.data;
          if ( cb.data ) {
            this.__context__.addPermission(obj.id);
          } else {
            this.__context__.removePermission(obj.id);
          }
        }));
        this.add(cb);
      }
    }
  ]
});


foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'PermissionsStringArrayView',
  extends: 'foam.u2.View',

/*
  classes: [
    {
      name: 'PermissionRow',
      extends: 'foam.nanos.auth.Permission',

      properties: [
        {
          class: 'Boolean',
          name: 'granted',
          tableWidth: 70,
          tableCellFormatter: function(value, _, projection) {
            var id = projection[0];
            var slot = foam.core.SimpleSlot.create({value: value});
            slot.sub(() => {
              if ( slot.get() ) {
                this.__context__.addPermission(id);
              } else {
                this.__context__.removePermission(id);
              }
            });
            this.add(foam.u2.CheckBox.create({data$: slot}));
          }
        }
      ]
    }
  ],
  */

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'permissionDAO'
  ],

  exports: [
    'addPermission',
    'removePermission'
  ],

  requires: [
    'foam.u2.crunch.PermissionRow',

    'foam.dao.MDAO',
    'foam.nanos.auth.Permission',
    'foam.u2.crunch.PermissionSelection',
    'foam.u2.TextField'
  ],

  css: `
    .foam-u2-crunch-PermissionsStringArrayView-padding {
      padding-top: 8px;
    }
    ^ .property-filteredPermissions .foam-u2-view-ScrollTableView {
      height: 374px;
    }
  `,

  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'permissions',
      factory: function() { return this.MDAO.create({of: this.PermissionRow}); }
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'filteredPermissions',
      expression: function(search, permissions, mode) {
        var dao = permissions.where(this.CONTAINS(this.Permission.ID, search));
        if ( mode == foam.u2.DisplayMode.RO ) dao = dao.where(this.EQ(this.PermissionRow.GRANTED, true));
        return dao.orderBy(this.PermissionRow.ID);
      },
      view: { class: 'foam.u2.view.ScrollTableView', editColumnsEnabled: false, pageSize: 10, dblClickListenerAction: function(){} }
    },
    {
      class: 'String',
      name: 'search',
      view: {
        class: 'foam.u2.TextField',
        type: 'search',
        placeholder: 'capability search',
        onKey: true
      },
      readVisibility: foam.u2.DisplayMode.RW
    },
    {
      class: 'String',
      name: 'customPermission',
      view: {
        class: 'foam.u2.TextField',
        placeholder: 'custom permission',
        onKey: true
      }
    },
    {
      name: 'pMap',
      factory: function() { return {}; }
    }
  ],

  methods: [
    function initE() {
      this.SUPER();
      var self = this;

      this.data.forEach(p => {
        if ( p == 'undefined' ) return;
        this.pMap[p] = true;
        this.permissions.put(this.PermissionRow.create({id: p, description: 'custom permission', granted: true}));
      });

      this.permissionDAO.select(p => {
        if ( p.id == 'undefined' ) return;
        this.permissions.put(this.PermissionRow.create({id: p.id, description: p.description, granted: this.pMap[p.id]}));
      });

      this.start()
        .addClass(this.myClass())
        .startContext({ data: this })
          .start()
            .add(this.SEARCH, ' ', this.CUSTOM_PERMISSION)
            .callIf(this.mode == foam.u2.DisplayMode.RW, function() {this.add(' ', self.ADD_CUSTOM); })
          .end()
          .start()
            .add(this.FILTERED_PERMISSIONS)
          .end()
        .endContext()
      .end();
    },

    function onSelectFunction(permission, isSelected) {
      var newArr =[];
      if ( isSelected ) {
        this.data.forEach(p => newArr.push(p));
        newArr.push(permission);
      } else {
        this.data.forEach(p => { if ( p !== permission ) newArr.push(p); });
      }
      this.data = newArr;
    },

    function addPermission(id) {
      if ( ! this.data.includes(id) ) {
        var data = foam.util.clone(this.data);
        data.push(id);
        data.sort();
        this.data = data;
        this.permissions.put(this.PermissionRow.create({id: id, description: 'custom permission', granted: true}));
      }
      // ???: What is this next block for?
      this.permissions.find(id).then(row => {
        if ( row ) {
          row.granted = true;
          this.permissions.put(row);
        } else {
          this.permissions.put(this.PermissionRow.create({id: id, description: 'custom permission', granted: true}));
        }
      });
    },

    function removePermission(id) {
      this.data = this.data.filter(p => p != id);
      this.permissions.find(id).then(row => {
        if ( row ) {
          row.granted = false;
          this.permissions.put(row);
        }
      });
    },

    function onSearchChanged() {
      this.show = ! this.search || this.search.length === 0 || this.permission.toLowerCase().includes(this.search.toLowerCase() );
    },

    function onSearchChangedSelectAll() {
      this.stopOnSelect = true;
      this.isSelected = this.isSelectedPermissionsContainThisPermission(this.permission);
    }
  ],

  actions: [
    {
      name: 'addCustom',
      label: 'Add',
      isEnabled: function(customPermission) { return customPermission.trim(); },
      code: function() {
        this.addPermission(this.customPermission);
        this.customPermission = '';
      }
    }
  ]
});
