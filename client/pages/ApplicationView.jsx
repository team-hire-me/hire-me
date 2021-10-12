import React from 'react';

import ApplicationsTree from '../components/ApplicationsTree.jsx';
import ApplicationPreview from '../components/ApplicationPreview.jsx';
import ProgressTracker from '../components/ProgressTracker.jsx';

const ApplicationView = props => {
  return <div id="application-view">
    <ApplicationsTree />
    <ApplicationPreview />
    <ProgressTracker />
  </div>
}

export default ApplicationView;
