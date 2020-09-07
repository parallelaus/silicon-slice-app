const schema: Import.OutputSchema = {
  facilityId: {
    name: 'Facility ID',
    type: 'number'
  },
  facilityName: {
    name: 'Facility',
    type: 'string'
  },
  address: {
    name: 'Address',
    type: 'string'
  },
  city: {
    name: 'City',
    type: 'string'
  },
  state: {
    name: 'State',
    type: 'string'
  },
  code: {
    name: 'Code',
    type: 'string'
  },
  rate: {
    name: 'Rate',
    type: 'number'
  },
  description: {
    name: 'Description',
    type: 'string'
  },
  start: {
    name: 'Start Date',
    type: 'date'
  },
  end: {
    name: 'End Date',
    type: 'date'
  }
}

export default schema
