foam.CLASS({
  package: 'foam.nanos.column',
  name: 'TableColumnOutputter',

  documentation: 'Class for returning 2d-array ( ie table ) for array of values ',

  methods: [
    {
      name: 'returnStringForProperties',
      type: 'String',
      documentation: 'Method that converts value to string',
      code: async function(prop, val) {
        if ( val ) {
          if ( foam.core.UnitValue.isInstance(prop) ) {
            return ( val / 100 ).toString() + ' ' + prop.destinationCurrency;
          } else if ( foam.core.Date.isInstance(prop) ) {
            return val.toISOString().substring(0, 10);
          } else if ( foam.core.DateTime.isInstance(prop) ) {
            return val.toString().substring(0, 24);
          } else if ( foam.core.Time.isInstance(prop) ) {
            return val.toString().substring(0, 8);
          }
          else if ( val.toSummary ) {
            if ( val.toSummary() instanceof Promise )
              return await val.toSummary();
            else
              return val.toSummary();
          } else
            return val.toString();            
        }
        else
          return '';
      }
    },
    {
      name: 'returnStringArrayForArrayOfValues',
      code: async function(props, values) {
        var stringValues = [];
        for ( var value of values ) {
          var stringArrayForValue = [];
          for ( var i = 0 ; i < value.length ; i++ ) {
            stringArrayForValue.push(await this.returnStringForProperties(props[i], value[i]));
          }
          stringValues.push(stringArrayForValue);
        }
        return stringValues;
      }
    },
    {
      name: 'objectToTable',
      code: async function(x, of, propNames, obj) {
        var columnConfig = x.columnConfigToPropertyConverter;
        var props = await columnConfig.filterExportedProps(x, of, propNames);
        var table = [ props.map( p => p.label ) ];
        var values = await columnConfig.returnStringArrayForArrayOfValues(props, columnConfig.returnValueForArrayOfPropertyNames(x, of, propNames, obj));
        table = table.concat(values);
        return table;
      }
    },
    {
      name: 'returnTable',
      code: async function(x, of, propNames, values) {
        var columnConfig = x.columnConfigToPropertyConverter;
        var props = await columnConfig.filterExportedProps(x, of, propNames);
        var table =  [ props.map( p => p.label ) ];
        var values = await this.returnStringArrayForArrayOfValues(props, values);
        table = table.concat(values);
        return table;
      }
    }
  ]
});