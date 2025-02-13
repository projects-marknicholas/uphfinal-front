import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableReferrals from "./components/tables/referral";
import ValidateCoordinator from "../../validations/validate-coordinator";

const CoordinatorReferral = () => {
  useEffect(() => {
    document.title = 'Referrals - Adviser';
  }, []);

  return (
    <>
      <ValidateCoordinator/>
      <div className="main-section">
        <Sidebar active='applications' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            You Referred
          </div>

          <TableReferrals/>
        </div>
      </div>
    </>
  );
};

export default CoordinatorReferral;
