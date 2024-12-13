import React from 'react';
import { motion } from 'framer-motion';

// Components
import SSCScholars from './ssc-scholars';
import ThePerpetualArchives from './the-perpetual-archives';
import PresidentialBoardDirectors from './presidential-board-director-scholar';
import CollegeCouncilPresident from './college-council-president';

// CSS
import '../../../../assets/css/view.css';

const ViewApplication = ({ application, onClose }) => {
  if (!application) return null;

  const renderFormTypeComponent = () => {
    switch (application.type) {
      case 'SSC Scholars':
        return <SSCScholars application={application} onClose={onClose} />;
      case 'The Perpetual Archives':
        return <ThePerpetualArchives application={application} onClose={onClose} />;
      case 'Presidential/Board Director Scholars':
        return <PresidentialBoardDirectors application={application} onClose={onClose} />;
      case 'College Council President':
        return <CollegeCouncilPresident application={application} onClose={onClose} />;
      default:
        return <div>Form type not recognized.</div>;
    }
  };

  return (
    <div className="view-application">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {renderFormTypeComponent()}
      </motion.div>
    </div>
  );
};

export default ViewApplication;