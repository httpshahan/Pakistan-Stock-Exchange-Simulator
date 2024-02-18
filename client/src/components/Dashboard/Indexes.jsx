import React from 'react'
import Data from './Data'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'

const Indexes = () => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
        <div className='text-3xl font-semibold mb-4'>Indexes</div>
        <TabGroup>
          <TabList>
            <Tab>KSE100</Tab>
            <Tab>AllSHR</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div>
                <Data symbol={'KSE100'} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Data symbol={'ALLSHR'} />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        
    </div>
  )
}

export default Indexes