import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

function buildCaseList(cases) {
  return cases.map((c) => {
    const caseId = c.get('id');
    return (
      <li key={caseId}>
        <Link to={`/cases/${caseId}`}>
          {`Case ID: ${caseId}`}
        </Link>
      </li>
    );
  });
}

function CasesMapView({
  cases,
}) {
  return (
    <div style={{ padding: '0.5rem' }}>
      <h2>TODO: Build MAP view</h2>
      <ul>
        {buildCaseList(cases)}
      </ul>
    </div>
  );
}

CasesMapView.propTypes = {
  cases: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.string,
    }),
  ).isRequired,
};

export default CasesMapView;
