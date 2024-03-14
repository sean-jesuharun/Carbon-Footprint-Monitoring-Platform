// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// export default function TabComponent() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const tabStyles = {
//     backgroundColor: '#f0f0f0', // Background color
//     justifyContent: 'center', // Center alignment
//     margin:'1rem',
//   };

//   const hoverStyle = {
//     '&:hover': {
//       backgroundColor: '#4C9B73 !important', // Green hover effect
//     },
//   };

//   const tabMargin = {
//     margin: '0 10px', // Add margin
//   };

//   const activeTabStyle = {
//     backgroundColor: '#5DB58A !important', // Dark green for active tab
//     color: 'black !important', // Text color for active tab
//     fontWeight: 'bold',
//     // border: '2px solid #388e3c !important', // Dark green bottom border
//     borderBottomColor: 'darkgreen !important', // Override default bottom border color
//   };

//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       <Tabs value={value} onChange={handleChange} centered style={tabStyles}>
//         <Tab label="Supplier" sx={{ ...hoverStyle, ...(value === 0 && activeTabStyle), ...tabMargin }} />
//         <Tab label="Transport" sx={{ ...hoverStyle, ...(value === 1 && activeTabStyle), ...tabMargin }} />
//         <Tab label="WareHouse Activity" sx={{ ...hoverStyle, ...(value === 2 && activeTabStyle), ...tabMargin }} />
//       </Tabs>
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TabComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = {
    backgroundColor: '#f0f0f0', // Background color
    margin: '1rem',
    minWidth: '320px', // Minimum width for the tab component
  };

  const hoverStyle = {
    '&:hover': {
      backgroundColor: '#4C9B73 !important', // Green hover effect
    },
  };

  const tabMargin = {
    margin: '0 5px', // Add margin
  };

  const activeTabStyle = {
    backgroundColor: '#5DB58A !important', // Dark green for active tab
    color: 'black !important', // Text color for active tab
    fontWeight: 'bold',
    borderBottomColor: 'darkgreen !important', // Override default bottom border color
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', overflowX: 'auto' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        style={tabStyles}
        sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
          '@media (max-width: 320px)': {
            '& .MuiTab-root': {
              width: '100%',
            },
          },
        }}
      >
        <Tab label="Supplier" sx={{ ...hoverStyle, ...(value === 0 && activeTabStyle), ...tabMargin }} />
        <Tab label="Transport" sx={{ ...hoverStyle, ...(value === 1 && activeTabStyle), ...tabMargin }} />
        <Tab
          label="WareHouse Activity"
          sx={{ ...hoverStyle, ...(value === 2 && activeTabStyle), ...tabMargin }}
        />
      </Tabs>
    </Box>
  );
}
