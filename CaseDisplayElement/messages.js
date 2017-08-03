import { defineMessages } from 'react-intl';

const formattedMessages = defineMessages({
  title: {
    id: 'components.CaseDisplayElement.title',
    defaultMessage: '#{caseId}',
  },
  complaintTitle: {
    id: 'components.CaseDisplayElement.Complaint.title',
    defaultMessage: 'Complaint',
  },
  downtime: {
    id: 'components.CaseDisplayElement.CaseInfo.downtime',
    defaultMessage: 'Downtime',
  },
  estimate: {
    id: 'components.CaseDisplayElement.CaseInfo.estimate',
    defaultMessage: 'Estimate',
  },
  etr: {
    id: 'components.CaseDisplayElement.CaseInfo.etr',
    defaultMessage: 'ETR',
  },
  status: {
    id: 'components.CaseDisplayElement.CaseInfo.status',
    defaultMessage: 'Status',
  },
  undefinedComplaint: {
    id: 'components.CaseDisplayElement.Complaint.undefined.complaint',
    defaultMessage: 'Complaint',
  },
  undefinedComplaintSubTitle: {
    id: 'components.CaseDisplayElement.Complaint.undefined.complaintSubTitle',
    defaultMessage: 'Code - Description',
  },
  undefinedServiceProvider: {
    id: 'components.CaseDisplayElement.undefined.serviceProvider',
    defaultMessage: 'Service Provider',
  },
  unit: {
    id: 'components.CaseDisplayElement.AssetInfo.unit',
    defaultMessage: 'Unit',
  },
  vin: {
    id: 'components.CaseDisplayElement.AssetInfo.vin',
    defaultMessage: 'VIN',
  },
});

export default formattedMessages;
