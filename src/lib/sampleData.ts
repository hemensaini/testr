export const sampleData = {
  bar: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Sales 2025',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1
      }
    ]
  },
  horizontalBar: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Sales 2025',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1
      }
    ]
  },
  line: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Website Traffic',
        data: [4500, 5000, 5500, 6000, 6500, 7500],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4
      }
    ]
  },
  pie: {
    labels: ['Marketing', 'Development', 'Sales', 'Customer Support', 'Operations'],
    datasets: [
      {
        data: [25, 30, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  },
  usaChoropleth: {
  labels: [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  datasets: [
    {
      label: 'Index Value by State',
      data: [
        92, 67, 88, 105, 78, 63, 80, 73, 65, 99, 102, 70,
        86, 120, 58, 69, 59, 60, 84, 76, 60, 54, 85, 93, 61,
        110, 72, 75, 53, 79, 62, 90, 97, 66, 55, 68, 87, 77,
        81, 74, 64, 91, 50, 98, 107, 58, 83, 108, 89, 71, 95, 100
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
},
afghanistanChoropleth: {
  labels: [
    'Badakhshan', 'Badghis', 'Baghlan', 'Balkh', 'Bamyan', 'Daykundi', 'Farah',
    'Faryab', 'Ghazni', 'Ghor', 'Helmand', 'Herat', 'Jowzjan', 'Kabul', 'Kandahar',
    'Kapisa', 'Khost', 'Kunar', 'Kunduz', 'Laghman', 'Logar', 'Nangarhar', 'Nimroz',
    'Nuristan', 'Paktia', 'Paktika', 'Panjshir', 'Parwan', 'Samangan', 'Sar-e-Pol',
    'Takhar', 'Urozgan', 'Wardak', 'Zabul'
  ],
  datasets: [
    {
      label: 'Index Value by Province',
      data: [
        75, 68, 80, 85, 70, 66, 64, 72, 74, 69, 61, 77, 73, 90, 78,
        67, 76, 63, 71, 65, 70, 82, 60, 59, 66, 58, 62, 69, 68, 71,
        74, 64, 67, 60
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
},
  albaniaChoropleth: {
  labels: [
    'Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër',
    'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tiranë', 'Vlorë'
  ],
  datasets: [
    {
      label: 'Index Value by County',
      data: [72, 65, 80, 74, 77, 69, 73, 64, 70, 78, 85, 76],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
},
  indonesiaChoropleth: {
  labels: [
    'Aceh', 'Bali', 'Banten', 'Bengkulu', 'Central Java', 'Central Kalimantan',
    'Central Sulawesi', 'East Java', 'East Kalimantan', 'East Nusa Tenggara',
    'Gorontalo', 'Jakarta', 'Jambi', 'Lampung', 'Maluku', 'North Kalimantan',
    'North Maluku', 'North Sulawesi', 'North Sumatra', 'Papua', 'Riau',
    'Riau Islands', 'Southeast Sulawesi', 'South Kalimantan', 'South Sulawesi',
    'South Sumatra', 'West Java', 'West Kalimantan', 'West Nusa Tenggara',
    'West Papua', 'West Sulawesi', 'West Sumatra', 'Yogyakarta'
  ],
  datasets: [
    {
      label: 'Index Value by Province',
      data: [
        85, 78, 72, 66, 88, 70,
        65, 90, 73, 60,
        62, 95, 68, 69, 63, 55,
        58, 64, 80, 50, 76,
        61, 67, 71, 74,
        77, 91, 69, 59,
        52, 60, 75, 86
      ],
      backgroundColor: 'rgba(16, 185, 129, 0.6)', // teal-500 with opacity
      borderColor: 'rgb(16, 185, 129)', // teal-500
      borderWidth: 1
    }
  ]
},
indiaChoropleth: {
  labels: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ],
  datasets: [
    {
      label: 'Index Value by State/UT',
      data: [
        92, 67, 88, 105, 78, 63, 80, 73, 65, 99, 102, 70,
        86, 120, 58, 69, 59, 60, 84, 76, 60, 54, 85, 93, 61,
        110, 72, 75, 53, 79, 62, 90, 97, 66, 55, 68
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
},
delhiChoropleth: {
  labels: [
    'North Delhi', 'North West Delhi', 'West Delhi', 'South West Delhi',
    'South Delhi', 'South East Delhi', 'Central Delhi', 'New Delhi',
    'North East Delhi', 'East Delhi', 'Shahdara'
  ],
  datasets: [
    {
      label: 'Index Value by District',
      data: [80, 95, 88, 90, 93, 85, 78, 76, 82, 79, 77],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }
  ]
},
donut: {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: 'Donut Distribution',
        data: [30, 20, 25, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      }
    ]
  },
  gantt: {
    labels: ['Task A', 'Task B', 'Task C'],
    datasets: [
      {
        label: 'Project Timeline',
        data: [
          { x: '2024-01-01', x2: '2024-01-10', y: 'Task A' },
          { x: '2024-01-05', x2: '2024-01-20', y: 'Task B' },
          { x: '2024-01-15', x2: '2024-02-01', y: 'Task C' }
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)'
      }
    ]
  },
  groupedBar: {
    labels: ['2019', '2020', '2021'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 40, 50],
        backgroundColor: 'rgba(59, 130, 246, 0.5)'
      },
      {
        label: 'Product B',
        data: [20, 30, 40],
        backgroundColor: 'rgba(139, 92, 246, 0.5)'
      }
    ]
  }
};
